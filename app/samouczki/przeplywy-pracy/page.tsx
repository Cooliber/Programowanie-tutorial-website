"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const tutorials = [
  {
    title: "Projektowanie Przepływów",
    description: "Zasady projektowania efektywnych przepływów pracy. Architektura systemów workflow. Najlepsze praktyki i wzorce projektowe.",
    href: "/samouczki/przeplywy-pracy/projektowanie-przeplywow",
    readTime: "18 min"
  },
  {
    title: "Automatyzacja Procesów",
    description: "Automatyzacja złożonych procesów biznesowych. Integracja z systemami zewnętrznymi. Optymalizacja wydajności operacyjnej.",
    href: "/samouczki/przeplywy-pracy/automatyzacja-procesow",
    readTime: "16 min"
  },
  {
    title: "Monitorowanie i Logowanie",
    description: "Systemy monitorowania przepływów pracy. Implementacja logowania. Analiza wydajności i diagnostyka problemów.",
    href: "/samouczki/przeplywy-pracy/monitorowanie-i-logowanie",
    readTime: "15 min"
  },
  {
    title: "Obsługa Błędów",
    description: "Strategie obsługi błędów w przepływach pracy. Mechanizmy retry i fallback. Zarządzanie wyjątkami i recovery.",
    href: "/samouczki/przeplywy-pracy/obsluga-bledow",
    readTime: "14 min"
  },
  {
    title: "Skalowanie Systemów",
    description: "Skalowanie poziome i pionowe. Load balancing. Optymalizacja zasobów i zarządzanie wydajnością w dużych systemach.",
    href: "/samouczki/przeplywy-pracy/skalowanie-systemow",
    readTime: "17 min"
  },
];

export default function PrzeplywyPracyPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/samouczki"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót do kategorii
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Przepływy Pracy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się projektować i implementować złożone przepływy pracy dla agentów AI.
          Te tutoriale pokażą Ci, jak orkiestrować zadania, zarządzać współbieżnością i budować niezawodne systemy automatyzacji.
        </p>
      </div>

      <div className="grid gap-6">
        {tutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link
              href={tutorial.href}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {tutorial.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {tutorial.readTime}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {tutorial.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}