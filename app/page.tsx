"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          TutorialAI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
        >
          Kompleksowa platforma tutorialowa poświęcona inżynierii kontekstu, narzędziom MCP,
          programowaniu oraz użyciu agentów AI. Naucz się tworzyć inteligentne systemy przyszłości.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/samouczki"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Rozpocznij Naukę
          </Link>
          <Link
            href="/o-nas"
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Dowiedz się Więcej
          </Link>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Kategorie Tutoriali
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Inżynieria Kontekstu",
              description: "Naucz się efektywnie zarządzać kontekstem w systemach AI",
              href: "/samouczki/inzynieria-kontekstu",
              color: "bg-blue-500"
            },
            {
              title: "Narzędzia MCP",
              description: "Poznaj protokół MCP i narzędzia do integracji agentów",
              href: "/samouczki/narzedzia-mcp",
              color: "bg-green-500"
            },
            {
              title: "Programowanie",
              description: "Programowanie dla agentów AI w JavaScript i Python",
              href: "/samouczki/programowanie",
              color: "bg-purple-500"
            },
            {
              title: "Użycie Agentów",
              description: "Budowanie i wdrażanie inteligentnych agentów AI",
              href: "/samouczki/uzycie-agentow",
              color: "bg-orange-500"
            },
            {
              title: "Przepływy Pracy",
              description: "Projektowanie efektywnych przepływów pracy dla AI",
              href: "/samouczki/przeplywy-pracy",
              color: "bg-red-500"
            },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg mb-4`}></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
