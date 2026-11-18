import { Link } from "react-router-dom";
import { Map } from "lucide-react";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={className ?? "flex items-center gap-2"}>
      <div className="w-8 h-8 bg-ocean-100 text-ocean-700 rounded-full flex items-center justify-center shadow-sm">
        <Map size={16} />
      </div>
      <span className="font-serif font-bold text-ocean-900 text-sm whitespace-nowrap tracking-tight">
        ML Overview
      </span>
    </Link>
  );
}
