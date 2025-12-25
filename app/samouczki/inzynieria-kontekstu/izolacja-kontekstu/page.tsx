"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Shield, Layers } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function IzolacjaKontekstuPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/samouczki/inzynieria-kontekstu" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Powrót do kategorii
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="border-b border-gray-200 dark:border-gray-700 pb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-4">
          <span>Inżynieria Kontekstu</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>11 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Izolacja Kontekstu</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Techniki oddzielania kontekstów dla różnych zadań i zapobiegania zanieczyszczeniu informacji.
        </p>
      </motion.div>

      <ProgressIndicator current={5} total={6} labels={["Wprowadzenie", "Pisanie", "Wybieranie", "Kompresja", "Izolacja", "Praktyka"]} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-lg dark:prose-invert max-w-none">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
            <Shield className="h-8 w-8 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Zapobieganie Zanieczyszczeniu</h3>
            <p className="text-red-700 dark:text-red-300 text-sm">Oddzielanie sprzecznych informacji</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <Layers className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Wielokontekstowe Podejścia</h3>
            <p className="text-indigo-700 dark:text-indigo-300 text-sm">Zarządzanie wieloma kontekstami</p>
          </div>
        </div>

        <h2>Dlaczego Izolacja jest Potrzebna?</h2>
        <p>Bez odpowiedniej izolacji kontekstu mogą wystąpić problemy:</p>
        <ul>
          <li><strong>Konflikty informacji:</strong> Sprzeczne dane w tym samym kontekście</li>
          <li><strong>Zanieczyszczenie:</strong> Irrelewantne informacje wpływające na odpowiedzi</li>
          <li><strong>Zakłócenia semantyczne:</strong> Mieszanie kontekstów z różnych domen</li>
          <li><strong>Utrata precyzji:</strong> Ogólne odpowiedzi zamiast specyficznych</li>
        </ul>

        <h2>Strategie Izolacji Kontekstu</h2>

        <div className="space-y-6 my-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">1. Kontekstowe Separatory</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Użyj jasnych separatorów między różnymi kontekstami.</p>
            <CodeBlock
              code={`=== KONTEKST BIZNESOWY ===
Firma: TechCorp Sp. z. o.o.
Branża: Rozwiązania SaaS
Klient: Firma produkcyjna 500+ pracowników

=== KONTEKST TECHNICZNY ===
Technologia: React + Node.js
Baza danych: PostgreSQL
Hosting: AWS

=== KONTEKST UŻYTKOWNIKA ===
Rola: Administrator systemu
Doświadczenie: Zaawansowane
Preferencje: Interfejs webowy`}
              language="text"
              title="Separatory kontekstu dla różnych domen"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2. Izolowane Sesje</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Używaj osobnych sesji dla różnych zadań.</p>
            <CodeBlock
              code={`// Sesja 1: Projektowanie API
"Projektuj REST API dla systemu e-commerce.
Wymagania: produkty, zamówienia, użytkownicy.
Technologie: Express.js, MongoDB."

// Sesja 2: Implementacja uwierzytelniania  
"Implementuj JWT authentication dla API.
Biblioteki: jsonwebtoken, bcrypt.
Endpointy: /login, /register, /verify."

// Sesja 3: Testowanie
"Pisz testy jednostkowe dla endpointów API.
Framework: Jest, supertest."`}
              language="javascript"
              title="Izolowane sesje dla różnych faz projektu"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">3. Kontekstowe Prefiksy</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Oznaczaj informacje ich kontekstem źródłowym.</p>
            <CodeBlock
              code={`[BIZNES] Priorytet: Wysoka dostępność systemu
[TECH] Stack: React 18, TypeScript, Node.js 20
[BEZPIECZEŃSTWO] Wymagania: OWASP Top 10, GDPR compliance
[WYDZIAŁ IT] Preferencje: Linux, Docker, Kubernetes
[KLIENT] Oczekiwania: Responsywny design, PWA support`}
              language="text"
              title="Prefiksy kontekstu dla różnych stakeholderów"
            />
          </div>
        </div>

        <h2>Techniki Wielokontekstowego Podejścia</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-blue-900 dark:text-blue-100 font-semibold mb-3">Kontekst Warstwowy</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Warstwa biznesowa</li>
              <li>• Warstwa techniczna</li>
              <li>• Warstwa operacyjna</li>
              <li>• Warstwa bezpieczeństwa</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-green-900 dark:text-green-100 font-semibold mb-3">Kontekst Czasowy</h3>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Kontekst historyczny</li>
              <li>• Kontekst aktualny</li>
              <li>• Kontekst przyszły</li>
              <li>• Kontekst ewolucyjny</li>
            </ul>
          </div>
        </div>

        <h2>Podsumowanie</h2>
        <p>Izolacja kontekstu zapewnia czystość i precyzję interakcji z modelami AI. Odpowiednie oddzielanie informacji pozwala uniknąć konfliktów i zanieczyszczeń, prowadząc do bardziej niezawodnych i spójnych odpowiedzi.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link href="/samouczki/inzynieria-kontekstu/kompresja-kontekstu" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          ← Poprzedni Tutorial
        </Link>
        <Link href="/samouczki/inzynieria-kontekstu/praktyczne-przyklady" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Następny Tutorial: Praktyczne Przykłady →
        </Link>
      </motion.div>
    </div>
  );
}