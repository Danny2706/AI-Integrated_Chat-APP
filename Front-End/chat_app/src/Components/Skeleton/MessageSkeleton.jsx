import React from "react";

function MessageSkeleton() {
  const skeletonMessages = Array(6).fill(null);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/30">
        {skeletonMessages.map((_, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                isEven ? "justify-start" : "justify-end"
              }`}
            >
              {/* Profile Pic Skeleton - Only show for received messages */}
              {isEven && (
                <div className="w-10 h-10 rounded-full bg-gray-700/50 animate-pulse" />
              )}

              {/* Message Bubble Skeleton */}
              <div
                className={`flex flex-col ${
                  isEven ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`h-3 w-20 bg-gray-700/50 rounded mb-2 animate-pulse ${
                    isEven ? "" : "self-end"
                  }`}
                />
                <div
                  className={`w-48 h-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl animate-pulse ${
                    isEven ? "rounded-tl-none" : "rounded-tr-none"
                  }`}
                />
              </div>

              {/* Profile Pic Skeleton - Only show for sent messages */}
              {!isEven && (
                <div className="w-10 h-10 rounded-full bg-gray-700/50 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MessageSkeleton;
