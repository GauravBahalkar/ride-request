export const SkeletonLoader = ({ count = 1 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-48 w-full"></div>
      ))}
    </>
  );
};
