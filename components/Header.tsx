"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useState } from "react";
import { useLayout } from "./LayoutProvider";
import { motion } from "framer-motion";

export default function Header() {
  const { toggleSidebar } = useLayout();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          TutorialAI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Główna nawigacja">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded relative">
              Strona Główna
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-0.5"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/samouczki" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded relative">
              Samouczki
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-0.5"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/kaizen" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded relative">
              Kaizen
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-0.5"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/geido" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded relative">
              Geidō
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-0.5"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/o-nas" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded relative">
              O Nas
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-0.5"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </Link>
          </motion.div>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Szukaj..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Wyszukiwarka tutoriali"
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            onClick={toggleSidebar}
            aria-label="Otwórz menu nawigacyjne"
            aria-expanded={false} // You might need to manage this state
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}