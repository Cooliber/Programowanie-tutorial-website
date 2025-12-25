"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Play, RotateCcw } from "lucide-react";

interface DemoStep {
  title: string;
  description: string;
  code?: string;
  result?: string;
  interactive?: boolean;
}

interface InteractiveDemoProps {
  title: string;
  steps: DemoStep[];
  initialCode?: string;
}

export default function InteractiveDemo({
  title,
  steps,
  initialCode = ""
}: InteractiveDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userCode, setUserCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);

  const runDemo = async () => {
    setIsRunning(true);
    // Simulate running the code
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRunning(false);
  };

  const resetDemo = () => {
    setUserCode(initialCode);
    setCurrentStep(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
    >
      <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🎮 {title}
        </h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Interaktywny przykład - wykonaj poszczególne kroki, aby zobaczyć, jak działa kod.
        </p>
      </div>

      <div className="p-6">
        <Accordion.Root type="single" collapsible className="space-y-4">
          {steps.map((step, index) => (
            <Accordion.Item
              key={index}
              value={`step-${index}`}
              className="border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <motion.circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={
                            index <= currentStep
                              ? 'text-green-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                        {index <= currentStep && (
                          <motion.circle
                            cx="12"
                            cy="12"
                            r="8"
                            fill="currentColor"
                            className="text-green-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          />
                        )}
                        {index === currentStep && (
                          <motion.circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-blue-500"
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
                        <text
                          x="12"
                          y="16"
                          textAnchor="middle"
                          className={`text-sm font-medium ${
                            index <= currentStep ? 'fill-white' : 'fill-current'
                          }`}
                        >
                          {index + 1}
                        </text>
                      </svg>
                    </motion.div>
                    <motion.span
                      className="font-medium text-gray-900 dark:text-white"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      {step.title}
                    </motion.span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {step.description}
                </p>

                {step.code && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kod do wykonania:
                    </h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                )}

                {step.interactive && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Edytuj kod:
                      </label>
                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-32 p-3 bg-gray-900 text-gray-100 rounded font-mono text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Wpisz swój kod tutaj..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        onClick={runDemo}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded transition-colors"
                        whileHover={!isRunning ? { scale: 1.05 } : {}}
                        whileTap={!isRunning ? { scale: 0.95 } : {}}
                      >
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={isRunning ? { rotate: 360 } : {}}
                          transition={isRunning ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                        >
                          <polygon points="5,3 19,12 5,21 5,3" />
                        </motion.svg>
                        {isRunning ? 'Wykonywanie...' : 'Uruchom'}
                      </motion.button>
                      <motion.button
                        onClick={resetDemo}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                          <path d="M3 21v-5h5" />
                        </motion.svg>
                        Reset
                      </motion.button>
                    </div>
                  </div>
                )}

                {step.result && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rezultat:
                    </h4>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
                      <pre className="text-green-800 dark:text-green-200 text-sm whitespace-pre-wrap">
                        {step.result}
                      </pre>
                    </div>
                  </div>
                )}

                {index < steps.length - 1 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setCurrentStep(index + 1)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      Następny krok →
                    </button>
                  </div>
                )}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </motion.div>
  );
}