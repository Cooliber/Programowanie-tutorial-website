"use client";

import { Aurora, LiquidChrome } from "@appletosolutions/reactbits";

export default function ReactBitsShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          ReactBits Components Showcase
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Demonstrating various animated components from the ReactBits library
        </p>
      </div>

      {/* Aurora Background Effect */}
      <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <Aurora
          colorStops={["#3b82f6", "#8b5cf6", "#06b6d4"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-semibold">Aurora Effect</h3>
        </div>
      </div>

      {/* Liquid Chrome Effect */}
      <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-900">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.5}
          amplitude={0.6}
          interactive={true}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-semibold">Liquid Chrome</h3>
        </div>
      </div>

    </div>
  );
}