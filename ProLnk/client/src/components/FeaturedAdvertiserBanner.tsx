import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { ExternalLink, Star, Megaphone } from "lucide-react";

interface Props {
  placement: "dashboard" | "scanResults";
  zipCode?: string;
  className?: string;
}

export default function FeaturedAdvertiserBanner({ placement, zipCode, className = "" }: Props) {
  const { data: banners = [] } = trpc.featuredAdvertisers.getActiveBanners.useQuery(
    { placement, zipCode },
    { staleTime: 5 * 60 * 1000 }
  );

  const trackEvent = trpc.featuredAdvertisers.trackEvent.useMutation();
  const impressionTracked = useRef(false);

  const banner = banners?.[0] as any;

  useEffect(() => {
    if (banner?.id && !impressionTracked.current) {
      impressionTracked.current = true;
      trackEvent.mutate({ id: banner.id, event: "impression" });
    }
  }, [banner?.id]);

  const handleClick = () => {
    trackEvent.mutate({ id: banner.id, event: "click" });
    if (banner.bannerCtaUrl) {
      window.open(banner.bannerCtaUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div className={`rounded-xl border border-[#00B5B8]/20 bg-gradient-to-r from-[#00B5B8]/5 to-white overflow-hidden ${className}`}>
      <div className="px-4 py-2 border-b border-[#00B5B8]/10 flex items-center gap-1.5">
        <Megaphone className="w-3 h-3 text-[#00B5B8]" />
        <span className="text-[10px] font-semibold text-[#00B5B8] uppercase tracking-wider">Featured Partner</span>
        <span className="ml-auto text-[10px] text-gray-400">{banner.category}</span>
      </div>
      <div className="p-4 flex items-center gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {banner.bannerLogoUrl ? (
            <img
              src={banner.bannerLogoUrl}
              alt={banner.businessName}
              className="w-12 h-12 rounded-lg object-cover border border-gray-100"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-[#00B5B8]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#00B5B8]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {banner.bannerTitle ?? banner.businessName}
          </p>
          {banner.bannerSubtitle && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{banner.bannerSubtitle}</p>
          )}
        </div>

        {/* CTA */}
        {banner.bannerCtaUrl && (
          <button
            onClick={handleClick}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#00B5B8] hover:bg-[#009a9d] transition-colors"
          >
            {banner.bannerCtaText ?? "Learn More"}
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
