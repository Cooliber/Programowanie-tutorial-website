"use client";

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">TutorialAI</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Kompleksowa platforma tutorialowa poświęcona inżynierii kontekstu, narzędziom MCP,
              programowaniu oraz użyciu agentów AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              <li>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm relative">
                    Strona Główna
                    <motion.div
                      className="absolute -left-2 top-1/2 w-1 h-1 bg-current rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/samouczki" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm relative">
                    Samouczki
                    <motion.div
                      className="absolute -left-2 top-1/2 w-1 h-1 bg-current rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/o-nas" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm relative">
                    O Nas
                    <motion.div
                      className="absolute -left-2 top-1/2 w-1 h-1 bg-current rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Kontakt</h4>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  whileHover={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </motion.svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  whileHover={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </motion.svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  whileHover={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </motion.svg>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 TutorialAI. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}