import { Link, useLocation } from "react-router-dom";
import { regions, type MathRegionId } from "../../content/maths";
import { cn } from "../../lib/utils";

const pureOrder = ["foundations", "structures", "spaces", "changes"] as const;

function region(id: MathRegionId) {
  const found = regions.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown maths region: ${id}`);
  }
  return found;
}

/**
 * The six high-level regions of the map. `active` highlights the region
 * the reader is in, including when they are on a page nested under it.
 */
export function TerritoryMap({ active }: { active?: MathRegionId }) {
  const { pathname } = useLocation();
  const pure = pureOrder.map((id) => region(id));

  return (
    <div className="grid gap-3 md:grid-cols-5">
      <RegionLink
        id="origins"
        active={active === "origins"}
        current={pathname === region("origins").path}
        className="md:col-span-5"
      />

      <div className="md:col-span-3 rounded-2xl border border-violet-200 bg-violet-50/70 p-3">
        <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-violet-500">
          Pure mathematics
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pure.map((item) => (
            <RegionLink
              key={item.id}
              id={item.id}
              active={active === item.id}
              current={pathname === item.path}
            />
          ))}
        </div>
      </div>

      <RegionLink
        id="applied"
        active={active === "applied"}
        current={pathname === region("applied").path}
        className="md:col-span-2"
      />
    </div>
  );
}

function RegionLink({
  id,
  active,
  current,
  className,
}: {
  id: MathRegionId;
  active: boolean;
  current: boolean;
  className?: string;
}) {
  const item = region(id);

  return (
    <Link
      to={item.path}
      aria-current={current ? "page" : undefined}
      className={cn(
        "block h-full rounded-xl border p-4 transition-colors",
        item.tone,
        active
          ? "border-ocean-400 ring-2 ring-ocean-200"
          : "hover:border-ocean-300",
        className,
      )}
    >
      <span className="block font-serif font-bold text-ocean-900">
        {item.label}
      </span>
      <span className="mt-1 block text-sm leading-snug text-slate-500">
        {item.blurb}
      </span>
    </Link>
  );
}
