import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <Skeleton aria-hidden="true" className="min-h-[200px] md:min-h-[300px] w-full rounded-lg" />
        <Skeleton aria-hidden="true" className="min-h-[200px] md:min-h-[300px] w-full rounded-lg" />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          <Skeleton aria-hidden="true" className="min-h-[200px] md:min-h-[300px] w-full rounded-lg" />
          <Skeleton aria-hidden="true" className="min-h-[200px] md:min-h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;