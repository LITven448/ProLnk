import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, ExternalLink } from "lucide-react";

const RETAILER_LABELS: Record<string, string> = {
  amazon: "Amazon",
  wayfair: "Wayfair",
  homedepot: "Home Depot",
  nfm: "Nebraska Furniture Mart",
};

function formatPrice(price: string | null): string | null {
  if (price == null) return null;
  const n = Number(price);
  if (!Number.isFinite(n)) return null;
  return `$${Math.round(n)}`;
}

/**
 * "Shop this look" — surfaces purchasable products under an AI room rendering.
 * Phase 1 affiliate rail. Clicking a card records a click (conversion
 * instrumentation) then opens the affiliate URL in a new tab.
 */
export default function ShopThisLook({ renderingId }: { renderingId: number }) {
  const suggestionsQuery = trpc.commerce.getProductSuggestions.useQuery(
    { renderingId },
    { enabled: renderingId > 0, refetchOnWindowFocus: false },
  );
  const trackClick = trpc.commerce.trackProductClick.useMutation();

  const handleClick = async (productSuggestionId: number, affiliateUrl: string) => {
    // Open synchronously so the click isn't blocked by the popup blocker, then
    // navigate it once the tracking call resolves with the canonical URL.
    const win = window.open("", "_blank", "noopener,noreferrer");
    try {
      const res = await trackClick.mutateAsync({ productSuggestionId });
      const url = res?.affiliateUrl ?? affiliateUrl;
      if (win) win.location.href = url;
      else window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      if (win) win.location.href = affiliateUrl;
      else window.open(affiliateUrl, "_blank", "noopener,noreferrer");
    }
  };

  const products = suggestionsQuery.data ?? [];

  return (
    <Card className="border-indigo-100">
      <CardContent className="py-5">
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-lg text-gray-900">Shop This Look</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Curated finds to bring this design to life. Affiliate links — prices are estimates.
        </p>

        {suggestionsQuery.isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-gray-400">No product suggestions available yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {products.map((p) => {
              const price = formatPrice(p.price);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleClick(p.id, p.affiliateUrl)}
                  className="group text-left rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition bg-white overflow-hidden flex flex-col"
                >
                  <div className="aspect-square bg-indigo-50 flex items-center justify-center overflow-hidden">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <ShoppingBag className="w-8 h-8 text-indigo-300" />
                    )}
                  </div>
                  <div className="p-2.5 flex flex-col gap-1 flex-1">
                    <Badge variant="outline" className="w-fit text-[10px] capitalize border-indigo-200 text-indigo-700">
                      {p.category.replace(/_/g, " ")}
                    </Badge>
                    <span className="text-xs font-medium text-gray-900 line-clamp-2">
                      {p.productName}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-1">
                      <span className="text-sm font-bold text-gray-900">{price ?? ""}</span>
                      <span className="flex items-center gap-0.5 text-[10px] text-gray-400 group-hover:text-indigo-600">
                        {RETAILER_LABELS[p.retailer] ?? p.retailer}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
