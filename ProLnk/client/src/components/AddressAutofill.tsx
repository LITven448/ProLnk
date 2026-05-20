import { useState, useRef, useEffect, useCallback, type ChangeEvent } from "react";
import { trpc } from "@/lib/trpc";
import { MapPin, CheckCircle, Loader2, Pencil } from "lucide-react";

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
  context?: { id: string; text: string }[];
  text: string;
  address?: string;
}

interface PropertyData {
  squareFeet: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string | null;
  stories?: number | null;
  garage?: string | null;
  garageSpaces?: number | null;
  pool?: boolean | null;
  lotSizeAcres?: number | null;
  lotSizeSqFt?: number | null;
  hasFireplace?: boolean | null;
  fireplaceCount?: number | null;
  hasPool?: boolean | null;
  roofMaterial?: string | null;
  foundationType?: string | null;
  coolingType?: string | null;
  heatingType?: string | null;
  subdivision?: string | null;
  majorRenovationYear?: number | null;
}

interface SelectedAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  propertyData: PropertyData | null;
}

export interface AddressAutofillProps {
  onAddressSelect: (address: SelectedAddress) => void;
  value?: string;
  className?: string;
}

function parseMapboxFeature(feature: MapboxFeature): { street: string; city: string; state: string; zip: string } {
  const ctx = feature.context || [];
  const city = ctx.find(c => c.id.startsWith("place"))?.text || "";
  const state = ctx.find(c => c.id.startsWith("region"))?.text || "";
  const zip = ctx.find(c => c.id.startsWith("postcode"))?.text || "";
  const streetNum = feature.address || "";
  const street = streetNum ? `${streetNum} ${feature.text}` : feature.text;
  return { street, city, state, zip };
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white";

export function AddressAutofill({ onAddressSelect, value, className }: AddressAutofillProps) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState<SelectedAddress | null>(null);
  const [loadingEnrich, setLoadingEnrich] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [enrichInput, setEnrichInput] = useState<{
    address: string; city?: string; state?: string; zip?: string;
  } | null>(null);
  const pendingAddressRef = useRef<Omit<SelectedAddress, "propertyData"> | null>(null);

  // Use the new property.lookupByAddress endpoint (ATTOM-backed, working)
  const enrichQuery = trpc.property.lookupByAddress.useQuery(
    {
      address: enrichInput?.address ?? "",
      city: enrichInput?.city ?? "",
      state: (enrichInput?.state ?? "").toUpperCase().slice(0, 2),
      zipCode: enrichInput?.zip ?? "",
    },
    {
      enabled: !!enrichInput && !!enrichInput.address && !!enrichInput.city && !!enrichInput.state && !!enrichInput.zip,
      retry: false,
    }
  );

  useEffect(() => {
    if (!enrichInput) return;
    if (enrichQuery.isLoading) {
      setLoadingEnrich(true);
      return;
    }
    setLoadingEnrich(false);
    const base = pendingAddressRef.current;
    if (base && enrichQuery.data !== undefined) {
      // Map the property.lookupByAddress response to PropertyData shape
      const raw = enrichQuery.data;
      const propertyData: PropertyData | null = (raw && raw.found) ? {
        squareFeet: typeof raw.squareFootage === "number" ? raw.squareFootage : null,
        yearBuilt: typeof raw.yearBuilt === "number" ? raw.yearBuilt : null,
        bedrooms: typeof raw.bedrooms === "number" ? raw.bedrooms : null,
        bathrooms: typeof raw.bathrooms === "number" ? raw.bathrooms : null,
        propertyType: raw.propertyType ?? raw.homeType ?? null,
        stories: typeof raw.stories === "number" ? raw.stories : null,
        garage: raw.garageType ?? (raw.garageSpaces ? `${raw.garageSpaces}-car attached` : null),
        garageSpaces: typeof raw.garageSpaces === "number" ? raw.garageSpaces : null,
        pool: typeof raw.hasPool === "boolean" ? raw.hasPool : null,
        hasPool: typeof raw.hasPool === "boolean" ? raw.hasPool : null,
        lotSizeAcres: typeof raw.lotSizeAcres === "number" ? raw.lotSizeAcres : null,
        lotSizeSqFt: typeof raw.lotSizeSqFt === "number" ? raw.lotSizeSqFt : null,
        hasFireplace: typeof raw.hasFireplace === "boolean" ? raw.hasFireplace : null,
        fireplaceCount: typeof raw.fireplaceCount === "number" ? raw.fireplaceCount : null,
        roofMaterial: raw.roofMaterial ?? null,
        foundationType: raw.foundationType ?? null,
        coolingType: raw.coolingType ?? null,
        heatingType: raw.heatingType ?? null,
        subdivision: raw.subdivision ?? null,
        majorRenovationYear: typeof raw.majorRenovationYear === "number" ? raw.majorRenovationYear : null,
      } : null;
      const enriched: SelectedAddress = {
        ...base,
        propertyData,
      };
      setSelected(enriched);
      onAddressSelect(enriched);
    }
  }, [enrichQuery.isLoading, enrichQuery.data]);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (!MAPBOX_TOKEN || q.length < 3) { setSuggestions([]); return; }
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?country=US&types=address&access_token=${MAPBOX_TOKEN}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json() as { features: MapboxFeature[] };
      setSuggestions(data.features || []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    setSelected(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(v), 300);
  };

  const handleSelect = (feature: MapboxFeature) => {
    const parsed = parseMapboxFeature(feature);
    setQuery(feature.place_name);
    setSuggestions([]);
    setShowSuggestions(false);

    const addr: SelectedAddress = { ...parsed, propertyData: null };
    setSelected(addr);
    onAddressSelect(addr);

    pendingAddressRef.current = parsed;
    setEnrichInput({
      address: parsed.street,
      city: parsed.city,
      state: parsed.state,
      zip: parsed.zip,
    });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const updatePropField = (field: keyof PropertyData, val: string) => {
    if (!selected) return;
    const pd = { ...(selected.propertyData || { squareFeet: null, yearBuilt: null, bedrooms: null, bathrooms: null, propertyType: null }) } as PropertyData;
    if (field === "squareFeet" || field === "yearBuilt" || field === "bedrooms" || field === "stories" || field === "garageSpaces" || field === "lotSizeSqFt") {
      (pd as Record<string, unknown>)[field] = val ? Number(val) : null;
    } else if (field === "bathrooms") {
      pd.bathrooms = val ? Number(val) : null;
    } else if (field === "stories" || field === "garageSpaces" || field === "lotSizeSqFt") {
      (pd as any)[field] = val ? Number(val) : null;
    } else {
      (pd as Record<string, unknown>)[field] = val || null;
    }
    const updated = { ...selected, propertyData: pd };
    setSelected(updated);
    onAddressSelect(updated);
  };

  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      <div className="relative">
        <MapPin size={15} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Start typing your street address..."
          value={query}
          onChange={handleInput}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className={`${inp} pl-8`}
          autoComplete="off"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map(f => (
            <button
              key={f.id}
              type="button"
              onMouseDown={() => handleSelect(f)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 flex items-start gap-2 border-b border-gray-50 last:border-b-0"
            >
              <MapPin size={13} className="text-indigo-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 leading-snug">{f.place_name}</span>
            </button>
          ))}
        </div>
      )}

      {loadingEnrich && (
        <div className="mt-2 flex items-center gap-2 text-sm text-indigo-600">
          <Loader2 size={14} className="animate-spin" />
          Looking up your home details...
        </div>
      )}

      {selected && !loadingEnrich && selected.propertyData && (
        <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-800">We found your home</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <PropertyFieldRow
              label="Bedrooms"
              value={selected.propertyData.bedrooms?.toString() || ""}
              field="bedrooms"
              type="number"
              editing={editingField === "bedrooms"}
              onEdit={() => setEditingField("bedrooms")}
              onDone={() => setEditingField(null)}
              onChange={v => updatePropField("bedrooms", v)}
            />
            <PropertyFieldRow
              label="Bathrooms"
              value={selected.propertyData.bathrooms?.toString() || ""}
              field="bathrooms"
              type="number"
              editing={editingField === "bathrooms"}
              onEdit={() => setEditingField("bathrooms")}
              onDone={() => setEditingField(null)}
              onChange={v => updatePropField("bathrooms", v)}
            />
            <PropertyFieldRow
              label="Sq Footage"
              value={selected.propertyData.squareFeet?.toString() || ""}
              field="squareFeet"
              type="number"
              editing={editingField === "squareFeet"}
              onEdit={() => setEditingField("squareFeet")}
              onDone={() => setEditingField(null)}
              onChange={v => updatePropField("squareFeet", v)}
            />
            <PropertyFieldRow
              label="Year Built"
              value={selected.propertyData.yearBuilt?.toString() || ""}
              field="yearBuilt"
              type="number"
              editing={editingField === "yearBuilt"}
              onEdit={() => setEditingField("yearBuilt")}
              onDone={() => setEditingField(null)}
              onChange={v => updatePropField("yearBuilt", v)}
            />
            {selected.propertyData.stories != null && (
              <PropertyFieldRow
                label="Stories"
                value={selected.propertyData.stories?.toString() || ""}
                field="stories"
                type="number"
                editing={editingField === "stories"}
                onEdit={() => setEditingField("stories")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("stories", v)}
              />
            )}
            {selected.propertyData.garageSpaces != null && (
              <PropertyFieldRow
                label="Garage Spaces"
                value={selected.propertyData.garageSpaces?.toString() || ""}
                field="garageSpaces"
                type="number"
                editing={editingField === "garageSpaces"}
                onEdit={() => setEditingField("garageSpaces")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("garageSpaces", v)}
              />
            )}
            {selected.propertyData.lotSizeSqFt != null && (
              <PropertyFieldRow
                label="Lot Size (sqft)"
                value={selected.propertyData.lotSizeSqFt?.toString() || ""}
                field="lotSizeSqFt"
                type="number"
                editing={editingField === "lotSizeSqFt"}
                onEdit={() => setEditingField("lotSizeSqFt")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("lotSizeSqFt", v)}
              />
            )}
            {selected.propertyData.propertyType && (
              <PropertyFieldRow
                label="Property Type"
                value={selected.propertyData.propertyType}
                field="propertyType"
                type="text"
                editing={editingField === "propertyType"}
                onEdit={() => setEditingField("propertyType")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("propertyType", v)}
              />
            )}
            {selected.propertyData.roofMaterial && (
              <PropertyFieldRow
                label="Roof"
                value={selected.propertyData.roofMaterial}
                field="roofMaterial"
                type="text"
                editing={editingField === "roofMaterial"}
                onEdit={() => setEditingField("roofMaterial")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("roofMaterial", v)}
              />
            )}
            {selected.propertyData.heatingType && (
              <PropertyFieldRow
                label="Heating"
                value={selected.propertyData.heatingType}
                field="heatingType"
                type="text"
                editing={editingField === "heatingType"}
                onEdit={() => setEditingField("heatingType")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("heatingType", v)}
              />
            )}
            {selected.propertyData.coolingType && (
              <PropertyFieldRow
                label="Cooling"
                value={selected.propertyData.coolingType}
                field="coolingType"
                type="text"
                editing={editingField === "coolingType"}
                onEdit={() => setEditingField("coolingType")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("coolingType", v)}
              />
            )}
            {selected.propertyData.foundationType && (
              <PropertyFieldRow
                label="Foundation"
                value={selected.propertyData.foundationType}
                field="foundationType"
                type="text"
                editing={editingField === "foundationType"}
                onEdit={() => setEditingField("foundationType")}
                onDone={() => setEditingField(null)}
                onChange={v => updatePropField("foundationType", v)}
              />
            )}
          </div>

          {/* Feature pills row */}
          {(selected.propertyData.hasPool || selected.propertyData.hasFireplace || selected.propertyData.subdivision) && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {selected.propertyData.hasPool && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">Pool</span>
              )}
              {selected.propertyData.hasFireplace && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                  {selected.propertyData.fireplaceCount && selected.propertyData.fireplaceCount > 1 ? selected.propertyData.fireplaceCount : ""}Fireplace{selected.propertyData.fireplaceCount && selected.propertyData.fireplaceCount > 1 ? "s" : ""}
                </span>
              )}
              {selected.propertyData.subdivision && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{selected.propertyData.subdivision}</span>
              )}
            </div>
          )}
        </div>
      )}

      {selected && !loadingEnrich && selected.propertyData === null && enrichInput && !enrichQuery.isLoading && (
        <p className="mt-2 text-xs text-gray-400">
          Address confirmed. Fill in property details below.
        </p>
      )}
    </div>
  );
}

function PropertyFieldRow({
  label, value, type, editing, onEdit, onDone, onChange,
}: {
  label: string;
  value: string;
  field: string;
  type: "text" | "number";
  editing: boolean;
  onEdit: () => void;
  onDone: () => void;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg px-3 py-2 border border-green-100 flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        {editing ? (
          <input
            autoFocus
            type={type}
            defaultValue={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onDone}
            onKeyDown={e => e.key === "Enter" && onDone()}
            className="w-full text-sm font-semibold text-gray-800 outline-none border-b border-indigo-300 bg-transparent"
          />
        ) : (
          <p className="text-sm font-semibold text-gray-800 truncate">{value || "—"}</p>
        )}
      </div>
      {!editing && (
        <button type="button" onClick={onEdit} className="text-gray-400 hover:text-indigo-600 flex-shrink-0">
          <Pencil size={12} />
        </button>
      )}
    </div>
  );
}
