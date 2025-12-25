"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const tutorials = [
  {
    title: "Wprowadzenie do Agentów AI",
    description: "Definicja i typy agentów. Architektura agentów. Zastosowania w praktyce.",
    href: "/samouczki/uzycie-agentow/wprowadzenie-do-agentow",
    readTime: "13 min"
  },
  {
    title: "Budowanie Prostego Agenta",
    description: "Wybór frameworka. Konfiguracja środowiska. Implementacja podstawowej logiki.",
    href: "/samouczki/uzycie-agentow/budowanie-prostego-agenta",
    readTime: "17 min"
  },
  {
    title: "Zaawansowane Funkcje Agentów",
    description: "Pamięć i stan. Uczucie się i adaptacja. Wieloagentowe systemy.",
    href: "/samouczki/uzycie-agentow/zaawansowane-funkcje",
    readTime: "19 min"
  },
  {
    title: "Integracja Agentów z Systemami Zewnętrznymi",
    description: "API i webhooks. Bazy danych. Usługi chmurowe.",
    href: "/samouczki/uzycie-agentow/integracja-z-systemami",
    readTime: "16 min"
  },
  {
    title: "Studia Przypadków",
    description: "Agent do analizy danych. Agent czatbot. Agent do automatyzacji zadań.",
    href: "/samouczki/uzycie-agentow/studia-przypadkow",
    readTime: "21 min"
  },
];

export default function UzycieAgentowPage() {
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
          Użycie Agentów
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Dowiedz się, jak projektować, budować i wdrażać agentów AI w rzeczywistych aplikacjach.
          Te tutoriale obejmują wszystko od podstaw po zaawansowane techniki wieloagentowych systemów.
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