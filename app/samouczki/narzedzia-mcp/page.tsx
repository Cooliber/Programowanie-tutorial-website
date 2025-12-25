"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const tutorials = [
  {
    title: "Wprowadzenie do Protokołu Kontekstu Modelu (MCP)",
    description: "Co to jest MCP? Architektura klient-serwer. Korzyści dla agentów AI.",
    href: "/samouczki/narzedzia-mcp/wprowadzenie-do-mcp",
    readTime: "12 min"
  },
  {
    title: "Budowanie Serwera MCP",
    description: "Konfiguracja środowiska. Definiowanie narzędzi i promptów. Implementacja transportu lokalnego.",
    href: "/samouczki/narzedzia-mcp/budowanie-serwera-mcp",
    readTime: "18 min"
  },
  {
    title: "Integracja Narzędzi MCP z Agentami",
    description: "Łączenie zewnętrznych systemów. Dynamiczne wywoływanie narzędzi. Przykłady integracji.",
    href: "/samouczki/narzedzia-mcp/integracja-z-agentami",
    readTime: "15 min"
  },
  {
    title: "Zaawansowane Funkcje MCP",
    description: "Zarządzanie zasobami. Bezpieczeństwo i autoryzacja. Monitorowanie wydajności.",
    href: "/samouczki/narzedzia-mcp/zaawansowane-funkcje",
    readTime: "16 min"
  },
  {
    title: "Praktyczne Tutoriale",
    description: "Budowanie agenta YouTube z MCP. Łączenie z bazami danych. Integracja z API zewnętrznymi.",
    href: "/samouczki/narzedzia-mcp/praktyczne-tutoriale",
    readTime: "25 min"
  },
];

export default function NarzedziaMcpPage() {
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
          Narzędzia MCP
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Poznaj Model Context Protocol - standard komunikacji między agentami AI a zewnętrznymi narzędziami.
          Te tutoriale nauczą Cię, jak budować i integrować serwery MCP dla rozszerzania możliwości agentów.
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