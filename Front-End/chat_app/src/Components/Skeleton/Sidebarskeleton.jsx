import React from "react";
import { User } from "lucide-react";

function Sidebarskeleton() {
  const skeletonContacts = Array(5).fill(null);

  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r border-gray-800 flex flex-col transition-all duration-200 bg-black/50 backdrop-blur-sm">
        {/* Header */}
        <div className="border-b border-gray-800 p-5">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-blue-400" />
            <span className="font-medium hidden lg:block text-white bg-gray-700/50 h-6 w-20 rounded animate-pulse"></span>
          </div>

          {/* Filter Skeleton */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-700/50 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse"></div>
            <div className="h-4 w-8 bg-gray-700/50 rounded animate-pulse ml-2"></div>
          </div>
        </div>

        {/* Contact Skeleton */}
        <div className="overflow-y-auto w-full py-3">
          {skeletonContacts.map((_, index) => (
            <div
              key={index}
              className="w-full p-3 flex items-center gap-3 animate-pulse"
            >
              {/* Avatar Skeleton */}
              <div className="relative mx-auto lg:mx-0">
                <div className="w-12 h-12 bg-gray-700/50 rounded-full" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-700/50 rounded-full ring-2 ring-black" />
              </div>

              {/* Text Skeleton - Only visible on larger screens */}
              <div className="hidden lg:flex flex-col gap-2 flex-1">
                <div className="h-4 w-32 bg-gray-700/50 rounded" />
                <div className="h-3 w-20 bg-gray-700/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebarskeleton;
