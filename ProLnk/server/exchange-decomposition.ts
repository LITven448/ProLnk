/**
 * Exchange multi-trade decomposition engine.
 *
 * A large multi-trade project (kitchen remodel, whole-house renovation, etc.) is
 * broken into individual trade components, each posted as its own FIXED-price offer
 * and routed to the best-matched pro for that trade through the existing matching /
 * offer / cascade system (see server/routers/matching.ts).
 *
 * The LLM is asked for a structured list of components. Parsing is defensive: if the
 * model is unavailable or returns junk, we fall back to a single "General Contractor"
 * component covering the full value so the rest of the pipeline never crashes.
 */
import { invokeLLM } from "./_core/llm";

export interface TradeComponent {
  trade: string;
  description: string;
  estimatedValue: number;
  sequenceOrder: number;
}

export interface DecomposeProjectInput {
  scope: string;
  totalValue: number;
  propertyZip?: string;
  address?: string;
}

export interface DecomposeProjectResult {
  components: TradeComponent[];
  /** True when the LLM produced a usable breakdown; false when we used the fallback. */
  decomposed: boolean;
}

const KNOWN_TRADES = [
  "Demolition", "Plumbing", "Electrical", "HVAC", "Framing", "Drywall",
  "Insulation", "Roofing", "Flooring", "Painting", "Tile", "Cabinetry",
  "Countertops", "Concrete", "Landscaping", "Windows", "Doors", "Finish Carpentry",
  "General",
];

function singleComponentFallback(input: DecomposeProjectInput): TradeComponent[] {
  return [
    {
      trade: "General",
      description:
        `General contractor to manage and complete the full scope: ${input.scope}`.slice(0, 1000),
      estimatedValue: roundCents(input.totalValue),
      sequenceOrder: 1,
    },
  ];
}

function roundCents(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Reconcile the component values so their sum equals the posted total exactly.
 * Scales proportionally, then absorbs any rounding remainder into the last component.
 */
function reconcileToTotal(components: TradeComponent[], total: number): TradeComponent[] {
  const positives = components.map((c) => ({
    ...c,
    estimatedValue: Number.isFinite(c.estimatedValue) && c.estimatedValue > 0 ? c.estimatedValue : 0,
  }));
  const sum = positives.reduce((acc, c) => acc + c.estimatedValue, 0);
  if (sum <= 0) {
    const even = roundCents(total / positives.length);
    positives.forEach((c, i) => {
      c.estimatedValue = i === positives.length - 1 ? roundCents(total - even * (positives.length - 1)) : even;
    });
    return positives;
  }
  const scale = total / sum;
  let running = 0;
  positives.forEach((c, i) => {
    if (i === positives.length - 1) {
      c.estimatedValue = roundCents(total - running);
    } else {
      c.estimatedValue = roundCents(c.estimatedValue * scale);
      running += c.estimatedValue;
    }
  });
  return positives;
}

function parseComponents(raw: unknown): TradeComponent[] | null {
  let data: any = raw;
  if (typeof raw === "string") {
    const text = raw.trim();
    const start = text.indexOf("[");
    const objStart = text.indexOf("{");
    const sliceFrom = start >= 0 && (objStart < 0 || start < objStart) ? start : objStart;
    if (sliceFrom < 0) return null;
    const lastBracket = Math.max(text.lastIndexOf("]"), text.lastIndexOf("}"));
    const candidate = text.slice(sliceFrom, lastBracket >= 0 ? lastBracket + 1 : undefined);
    try {
      data = JSON.parse(candidate);
    } catch {
      return null;
    }
  }
  const arr = Array.isArray(data) ? data : Array.isArray(data?.components) ? data.components : null;
  if (!arr || arr.length === 0) return null;

  const components: TradeComponent[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== "object") continue;
    const trade = typeof item.trade === "string" && item.trade.trim() ? item.trade.trim() : null;
    const value = Number(item.estimatedValue ?? item.value ?? item.cost);
    if (!trade) continue;
    components.push({
      trade,
      description:
        typeof item.description === "string" && item.description.trim()
          ? item.description.trim().slice(0, 1000)
          : `${trade} work`,
      estimatedValue: Number.isFinite(value) && value > 0 ? value : 0,
      sequenceOrder:
        Number.isFinite(Number(item.sequenceOrder)) && Number(item.sequenceOrder) > 0
          ? Math.floor(Number(item.sequenceOrder))
          : i + 1,
    });
  }
  if (components.length === 0) return null;
  components.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
  components.forEach((c, i) => (c.sequenceOrder = i + 1));
  return components;
}

const SYSTEM_PROMPT =
  `You are a senior general contractor estimating a multi-trade home project. ` +
  `Break the project into the individual trade components needed to complete it, in the ` +
  `correct construction sequence. Common trades: ${KNOWN_TRADES.join(", ")}. ` +
  `Respond with ONLY a JSON array, no prose. Each element: ` +
  `{"trade": string, "description": string, "estimatedValue": number, "sequenceOrder": number}. ` +
  `The estimatedValue figures should be realistic relative shares that SUM to the project's ` +
  `total approved value. Use 2-8 components.`;

export async function decomposeProject(
  input: DecomposeProjectInput
): Promise<DecomposeProjectResult> {
  const total = Number.isFinite(input.totalValue) && input.totalValue > 0 ? input.totalValue : 0;
  if (total <= 0) {
    return { components: singleComponentFallback({ ...input, totalValue: 0 }), decomposed: false };
  }

  try {
    const res = await invokeLLM({
      provider: "anthropic",
      maxTokens: 1500,
      thinking: false,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content:
            `Project scope: ${input.scope}\n` +
            `Total approved value: $${total}\n` +
            (input.propertyZip ? `Location ZIP: ${input.propertyZip}\n` : "") +
            (input.address ? `Address: ${input.address}\n` : "") +
            `Return the JSON array of trade components now.`,
        },
      ],
    });

    const content = res?.choices?.[0]?.message?.content;
    const text = typeof content === "string" ? content : (content as any[])?.[0]?.text ?? "";
    const parsed = parseComponents(text);
    if (parsed) {
      return { components: reconcileToTotal(parsed, total), decomposed: true };
    }
  } catch (err) {
    console.warn("[exchange-decomposition] LLM decomposition failed, using fallback:", err);
  }

  return { components: singleComponentFallback({ ...input, totalValue: total }), decomposed: false };
}
