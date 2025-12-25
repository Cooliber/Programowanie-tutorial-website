"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const tutorials = [
  {
    title: "Podstawy Programowania dla Agentów AI",
    description: "Wprowadzenie do języków programowania. Struktury danych i algorytmy. Paradygmaty programowania.",
    href: "/samouczki/programowanie/podstawy-programowania",
    readTime: "14 min"
  },
  {
    title: "JavaScript dla Agentów",
    description: "Podstawy składni. Asynchroniczne programowanie. Integracja z API.",
    href: "/samouczki/programowanie/javascript-dla-agentow",
    readTime: "16 min"
  },
  {
    title: "Python dla AI",
    description: "Biblioteki dla uczenia maszynowego. Praca z danymi. Budowanie agentów w Pythonie.",
    href: "/samouczki/programowanie/python-dla-ai",
    readTime: "18 min"
  },
  {
    title: "Zaawansowane Techniki Programowania",
    description: "Optymalizacja wydajności. Bezpieczeństwo kodu. Testowanie i debugowanie.",
    href: "/samouczki/programowanie/zaawansowane-techniki",
    readTime: "20 min"
  },
  {
    title: "Praktyczne Projekty",
    description: "Budowanie prostego agenta. Integracja z bazami danych. Tworzenie interfejsów użytkownika.",
    href: "/samouczki/programowanie/praktyczne-projekty",
    readTime: "22 min"
  },
];

export default function ProgramowaniePage() {
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
          Programowanie
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Opanuj języki programowania niezbędne do tworzenia agentów AI. Te tutoriale pokażą Ci,
          jak pisać efektywny kod, integrować API i budować skalowalne aplikacje.
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