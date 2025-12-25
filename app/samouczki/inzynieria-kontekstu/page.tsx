"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const tutorials = [
  {
    title: "Wprowadzenie do Inżynierii Kontekstu",
    description: "Co to jest inżynieria kontekstu? Dlaczego jest ważna dla agentów AI? Podstawowe koncepcje.",
    href: "/samouczki/inzynieria-kontekstu/wprowadzenie",
    readTime: "10 min"
  },
  {
    title: "Pisanie Kontekstu",
    description: "Techniki tworzenia efektywnych promptów. Strukturyzacja instrukcji. Przykłady praktyczne.",
    href: "/samouczki/inzynieria-kontekstu/pisanie-kontekstu",
    readTime: "15 min"
  },
  {
    title: "Wybieranie Kontekstu",
    description: "Metody filtrowania informacji. Zarządzanie oknem kontekstu. Optymalizacja selekcji danych.",
    href: "/samouczki/inzynieria-kontekstu/wybieranie-kontekstu",
    readTime: "12 min"
  },
  {
    title: "Kompresja Kontekstu",
    description: "Techniki zmniejszania objętości kontekstu. Utrata vs. zachowanie informacji. Narzędzia do kompresji.",
    href: "/samouczki/inzynieria-kontekstu/kompresja-kontekstu",
    readTime: "14 min"
  },
  {
    title: "Izolacja Kontekstu",
    description: "Oddzielanie kontekstów dla różnych zadań. Zapobieganie zanieczyszczeniu kontekstu. Wielokontekstowe podejścia.",
    href: "/samouczki/inzynieria-kontekstu/izolacja-kontekstu",
    readTime: "11 min"
  },
  {
    title: "Praktyczne Przykłady i Studia Przypadków",
    description: "Budowanie trwałego agenta AI. Rozwiązywanie problemów z kontekstem. Narzędzia i biblioteki.",
    href: "/samouczki/inzynieria-kontekstu/praktyczne-przyklady",
    readTime: "20 min"
  },
];

export default function InzynieriaKontekstuPage() {
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
          Inżynieria Kontekstu
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się efektywnie zarządzać kontekstem w systemach AI. Te tutoriale pokażą Ci,
          jak optymalizować komunikację z modelami językowymi i poprawiać jakość odpowiedzi.
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