"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = "javascript",
  title,
  showLineNumbers = true
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const lines = code.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6"
    >
      {title && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </span>
        </div>
      )}
      <div className="relative bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-700 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm text-gray-400">{language}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Skopiowane!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Kopiuj
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className={`language-${language} text-gray-100`}>
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="inline-block w-8 text-right text-gray-500 select-none mr-4">
                    {index + 1}
                  </span>
                  <span className="flex-1">{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}