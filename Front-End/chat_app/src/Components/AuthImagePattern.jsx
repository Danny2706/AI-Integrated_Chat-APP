import React from "react";
import { Cpu, Brain, Sparkles } from "lucide-react";

function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden lg:flex items-center justify-center p-12 relative z-10">
      <div className="max-w-md text-center bg-black/70 backdrop-blur-md border border-gray-800 rounded-3xl p-10 shadow-2xl shadow-purple-900/20">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-3 gap-4 mb-10 relative">
          {[...Array(9)].map((_, i) => {
            const colors = [
              "bg-blue-900/40",
              "bg-purple-900/40",
              "bg-cyan-900/40",
              "bg-blue-800/40",
              "bg-purple-800/40",
              "bg-cyan-800/40",
              "bg-blue-700/40",
              "bg-purple-700/40",
              "bg-cyan-700/40",
            ];

            const animationDelays = [
              "animate-pulse",
              "animate-pulse animation-delay-1000",
              "animate-pulse animation-delay-2000",
              "animate-pulse animation-delay-3000",
              "animate-pulse animation-delay-4000",
              "animate-pulse animation-delay-5000",
              "animate-pulse animation-delay-6000",
              "animate-pulse animation-delay-7000",
              "animate-pulse animation-delay-8000",
            ];

            return (
              <div
                key={i}
                className={`aspect-square rounded-2xl ${colors[i]} ${animationDelays[i]} 
                transform hover:scale-105 transition-transform duration-300 border border-gray-800`}
              />
            );
          })}

          {/* Floating AI icon in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-br from-blue-700 to-purple-700 p-4 rounded-2xl shadow-lg animate-float">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>

        <div className="mt-8 flex justify-center space-x-6">
          <div className="flex items-center text-sm text-blue-500">
            <Cpu className="w-4 h-4 mr-1" /> AI-Powered
          </div>
          <div className="flex items-center text-sm text-purple-500">
            <Brain className="w-4 h-4 mr-1" /> Intelligent
          </div>
          <div className="flex items-center text-sm text-cyan-500">
            <Sparkles className="w-4 h-4 mr-1" /> Innovative
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthImagePattern;
