"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "inzynieria-kontekstu",
    title: "Inżynieria Kontekstu",
    description: "Naucz się efektywnie zarządzać kontekstem w systemach AI",
    tutorialCount: 6,
    href: "/samouczki/inzynieria-kontekstu",
    color: "bg-blue-500"
  },
  {
    id: "narzedzia-mcp",
    title: "Narzędzia MCP",
    description: "Poznaj protokół MCP i narzędzia do integracji agentów",
    tutorialCount: 5,
    href: "/samouczki/narzedzia-mcp",
    color: "bg-green-500"
  },
  {
    id: "programowanie",
    title: "Programowanie",
    description: "Programowanie dla agentów AI w JavaScript i Python",
    tutorialCount: 5,
    href: "/samouczki/programowanie",
    color: "bg-purple-500"
  },
  {
    id: "uzycie-agentow",
    title: "Użycie Agentów",
    description: "Budowanie i wdrażanie inteligentnych agentów AI",
    tutorialCount: 5,
    href: "/samouczki/uzycie-agentow",
    color: "bg-orange-500"
  },
  {
    id: "przeplywy-pracy",
    title: "Przepływy Pracy",
    description: "Projektowanie efektywnych przepływów pracy dla AI",
    tutorialCount: 6,
    href: "/samouczki/przeplywy-pracy",
    color: "bg-red-500"
  },
];

export default function SamouczkiPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Samouczki
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Odkryj kompleksowe tutoriale na temat inżynierii kontekstu, narzędzi MCP,
          programowania oraz wykorzystania agentów AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link
              href={category.href}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className={`w-12 h-12 ${category.color} rounded-lg mb-4 flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">
                  {category.tutorialCount}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                {category.tutorialCount} tutoriali
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}