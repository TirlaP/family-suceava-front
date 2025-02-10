import { HeroSkeleton, GridSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div>
      <HeroSkeleton />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded-md mx-auto" />
            <div className="h-4 w-96 bg-gray-200 rounded-md mx-auto" />
          </div>
          
          <GridSkeleton items={3} />
        </div>
      </div>
    </div>
  );
}