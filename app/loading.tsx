"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center">
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto">
            {/* Outer rotating ring */}
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-200 dark:text-blue-800"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Inner rotating ring */}
            <motion.circle
              cx="24"
              cy="24"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-400 dark:text-blue-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            />

            {/* Center spinning element */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="24"
                cy="24"
                r="6"
                fill="currentColor"
                className="text-blue-600"
              />
              <path
                d="M24 12 L28 20 L32 12 L24 16 L16 12 L20 20 L24 16 Z"
                fill="currentColor"
                className="text-blue-600"
              />
            </motion.g>

            {/* Pulsing dots */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={24 + Math.cos((i * 120 * Math.PI) / 180) * 14}
                cy={24 + Math.sin((i * 120 * Math.PI) / 180) * 14}
                r="2"
                fill="currentColor"
                className="text-blue-500"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </motion.div>

        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Ładowanie...
        </motion.p>

        {/* Animated progress bar */}
        <motion.div
          className="mt-4 w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}