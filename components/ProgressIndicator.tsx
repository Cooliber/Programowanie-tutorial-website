"use client";

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  current: number;
  total: number;
  labels?: string[];
}

export default function ProgressIndicator({
  current,
  total,
  labels = []
}: ProgressIndicatorProps) {
  const progress = (current / total) * 100;

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Postęp tutorialu
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {current} z {total}
        </span>
      </div>

      <div className="relative">
        <svg className="w-full h-3" viewBox="0 0 100 6" preserveAspectRatio="none">
          {/* Background path */}
          <path
            d="M0,3 L100,3"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-200 dark:text-gray-700"
            strokeLinecap="round"
          />
          {/* Progress path */}
          <motion.path
            d="M0,3 L100,3"
            stroke="currentColor"
            strokeWidth="4"
            className="text-blue-600"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* Animated dots */}
          <motion.circle
            cx={progress}
            cy="3"
            r="2"
            fill="currentColor"
            className="text-blue-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
        </svg>

        {labels.length > 0 && (
          <div className="flex justify-between mt-4">
            {labels.map((label, index) => {
              const isCompleted = index <= current - 1;
              const isCurrent = index === current - 1;

              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <motion.div className="relative mb-1">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      {/* Outer ring */}
                      <motion.circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={isCompleted ? 'text-blue-600' : 'text-gray-300 dark:text-gray-600'}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                      {/* Inner circle for completed steps */}
                      {isCompleted && (
                        <motion.circle
                          cx="10"
                          cy="10"
                          r="6"
                          fill="currentColor"
                          className="text-blue-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        />
                      )}
                      {/* Check mark for completed steps */}
                      {isCompleted && (
                        <motion.path
                          d="M6,10 L9,13 L14,7"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                        />
                      )}
                      {/* Pulsing effect for current step */}
                      {isCurrent && (
                        <motion.circle
                          cx="10"
                          cy="10"
                          r="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-blue-600"
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </svg>
                  </motion.div>
                  <motion.span
                    className={`text-xs text-center max-w-20 truncate ${
                      isCompleted ? 'text-blue-600 font-medium' : 'text-gray-400'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  >
                    {label}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}