"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Filter, Database, TrendingUp } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function WybieranieKontekstuPage() {
  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/samouczki/inzynieria-kontekstu"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót do kategorii
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-4">
          <span>Inżynieria Kontekstu</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>12 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Wybieranie Kontekstu
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się efektywnie filtrować i priorytetyzować informacje w kontekście,
          maksymalizując wykorzystanie ograniczonego okna kontekstu modeli AI.
        </p>
      </motion.div>

      <ProgressIndicator
        current={3}
        total={6}
        labels={["Wprowadzenie", "Pisanie", "Wybieranie", "Kompresja", "Izolacja", "Praktyka"]}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg text-center">
            <Filter className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Filtrowanie</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Wybór relewantnych danych</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg text-center">
            <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900 dark:text-green-100">Priorytety</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Hierarchia informacji</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">Optymalizacja</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Maksymalizacja efektywności</p>
          </div>
        </div>

        <h2>Strategie Wybierania Kontekstu</h2>
        <p>
          Efektywne zarządzanie oknem kontekstu wymaga strategicznego podejścia do selekcji informacji.
          Kluczowe jest zrozumienie, które dane są najbardziej wartościowe dla danego zadania.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6">
          <h3 className="text-blue-900 dark:text-blue-100 font-semibold mb-4">
            Metody Filtrowania Informacji
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">RFI - Recency, Frequency, Importance</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li><strong>Recency:</strong> Najnowsze informacje mają wyższy priorytet</li>
                <li><strong>Frequency:</strong> Często używane dane są ważniejsze</li>
                <li><strong>Importance:</strong> Krytyczne informacje dla zadania</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Metoda PIR - Problem, Information, Relevance</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li><strong>Problem:</strong> Jakie jest główne zadanie?</li>
                <li><strong>Information:</strong> Jakie dane są dostępne?</li>
                <li><strong>Relevance:</strong> Które dane rozwiązują problem?</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Techniki Priorytetyzacji</h2>

        <div className="space-y-6 my-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              1. Analiza Zależności Zadania
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Zidentyfikuj, które informacje są bezpośrednio potrzebne do rozwiązania zadania,
              a które mogą być dodane później w razie potrzeby.
            </p>
            <CodeBlock
              code={`// Przykład: Budowanie API dla e-commerce

KONTEKST PRIORYTETOWY:
1. Schemat bazy danych produktów (krytyczny)
2. Wymagania biznesowe (wysoki priorytet)
3. Przykłady użycia (średni priorytet)
4. Szczegóły implementacji UI (niski priorytet - dodać później)

OPTYMALNY PROMPT:
"Zaimplementuj REST API dla produktów e-commerce.
Schemat: {product: {id, name, price, category}}
Endpointy: GET /products, POST /products, PUT /products/:id
Walidacja: price > 0, name.length > 0"`}
              language="typescript"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              2. Hierarchia Informacji
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Organizuj informacje w hierarchii od najbardziej ogólnych do najbardziej specyficznych.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded text-sm">
              <div className="space-y-2">
                <div><strong>Poziom 1 (Kontekst Biznesowy):</strong> "System zarządzania użytkownikami dla aplikacji SaaS"</div>
                <div><strong>Poziom 2 (Wymagania Funkcjonalne):</strong> "CRUD operations, authentication, role-based access"</div>
                <div><strong>Poziom 3 (Szczegóły Techniczne):</strong> "PostgreSQL, JWT tokens, bcrypt hashing"</div>
                <div><strong>Poziom 4 (Implementacja):</strong> "Express.js middleware, Sequelize ORM, input validation"</div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              3. Filtrowanie na Podstawie Czasu
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dla zadań ewoluujących w czasie, priorytetyzuj informacje na podstawie ich aktualności.
            </p>
            <CodeBlock
              code={`// Przykład: Debugowanie błędu produkcyjnego

KONTEKST CZASOWY:
1. Najnowsze logi błędów (ostatnie 24h) - NAJWYŻSZY PRIORYTET
2. Stack trace z momentu błędu - WYSOKI PRIORYTET  
3. Kod funkcji gdzie wystąpił błąd - ŚREDNI PRIORYTET
4. Historia zmian w tym obszarze (ostatnie 2 tygodnie) - NISKI PRIORYTET
5. Dokumentacja API (ogólna) - NAJNIŻSZY PRIORYTET

DLACZEGO? Bo błąd wystąpił niedawno, więc najnowsze informacje
są najbardziej relewantne do diagnozy.`}
              language="text"
            />
          </div>
        </div>

        <h2>Narzędzia do Zarządzania Kontekstem</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-green-900 dark:text-green-100 font-semibold mb-3">
              Context Chunking
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              Podziel duży kontekst na mniejsze, logiczne fragmenty.
            </p>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Grupuj powiązane informacje</li>
              <li>• Używaj nagłówków do separacji</li>
              <li>• Ładuj kontekst progresywnie</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h3 className="text-purple-900 dark:text-purple-100 font-semibold mb-3">
              Context Summarization
            </h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-3">
              Twórz podsumowania kluczowych informacji.
            </p>
            <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
              <li>• Wyciągnij kluczowe fakty</li>
              <li>• Zachowaj ważne relacje</li>
              <li>• Użyj struktur danych</li>
            </ul>
          </div>
        </div>

        <h2>Praktyczne Strategie Optymalizacji</h2>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-semibold mb-4">
            Checklist Wybierania Kontekstu
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</div>
              <div>
                <strong>Zdefiniuj zadanie:</strong> Jasno opisz, co ma zostać wykonane
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</div>
              <div>
                <strong>Identyfikuj wymagania:</strong> Jakie informacje są absolutnie niezbędne?
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</div>
              <div>
                <strong>Oceń dostępność:</strong> Które informacje są łatwo dostępne?
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">4</div>
              <div>
                <strong>Priorytetyzuj:</strong> Ułóż informacje w hierarchii ważności
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">5</div>
              <div>
                <strong>Optymalizuj:</strong> Usuń redundancje i skompresuj gdzie to możliwe
              </div>
            </div>
          </div>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Wybieranie kontekstu to sztuka znajdowania równowagi między ilością a jakością informacji.
          Strategiczne filtrowanie i priorytetyzacja pozwalają maksymalnie wykorzystać ograniczone
          okno kontekstu, prowadząc do lepszych rezultatów przy niższych kosztach.
        </p>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <Link
          href="/samouczki/inzynieria-kontekstu/pisanie-kontekstu"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Poprzedni Tutorial
        </Link>
        <Link
          href="/samouczki/inzynieria-kontekstu/kompresja-kontekstu"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Kompresja Kontekstu →
        </Link>
      </motion.div>
    </div>
  );
}