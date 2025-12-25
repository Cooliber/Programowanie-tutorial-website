"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Archive, Zap } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function KompresjaKontekstuPage() {
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
            <span>14 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Kompresja Kontekstu</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Techniki zmniejszania objętości kontekstu przy zachowaniu kluczowych informacji i poprawie efektywności.
        </p>
      </motion.div>

      <ProgressIndicator current={4} total={6} labels={["Wprowadzenie", "Pisanie", "Wybieranie", "Kompresja", "Izolacja", "Praktyka"]} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-lg dark:prose-invert max-w-none">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <Archive className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">Redukcja Objętości</h3>
            <p className="text-orange-700 dark:text-orange-300 text-sm">Zmniejszanie ilości tokenów bez utraty znaczenia</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <Zap className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Optymalizacja Wydajności</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">Lepsze wykorzystanie okna kontekstu</p>
          </div>
        </div>

        <h2>Dlaczego Kompresja jest Ważna?</h2>
        <p>Modele AI mają ograniczone okno kontekstu. Kompresja pozwala:</p>
        <ul>
          <li>Zmniejszyć koszty API (mniej tokenów = niższe koszty)</li>
          <li>Zwiększyć efektywność (więcej informacji w tym samym oknie)</li>
          <li>Poprawić jakość odpowiedzi (mniej "szumu", więcej sygnału)</li>
          <li>Przyspieszyć przetwarzanie (krótszy kontekst = szybsze odpowiedzi)</li>
        </ul>

        <h2>Techniki Kompresji</h2>

        <div className="space-y-6 my-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">1. Abstrakcja i Podsumowanie</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Zastąp szczegółowe opisy ich esencją.</p>
            <CodeBlock
              code={`// ZAMIENIAJ TO:
"System zarządzania użytkownikami musi obsługiwać rejestrację, logowanie, resetowanie hasła, weryfikację email, dwuskładnikową autoryzację, zarządzanie rolami użytkowników, logowanie aktywności, audyt zmian, eksport danych użytkowników w formacie CSV i JSON, import użytkowników z pliku Excel, synchronizację z Active Directory, integrację z LDAP, obsługę OAuth 2.0 i OpenID Connect, oraz automatyczne usuwanie nieaktywnych kont po 2 latach bezczynności."

// NA TO:
"System user management: auth (register/login/reset/2FA), roles, audit logs, data export/import (CSV/JSON/Excel), directory sync (AD/LDAP/OAuth), auto cleanup inactive accounts."`}
              language="text"
              title="Przykład kompresji opisu funkcjonalności"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2. Normalizacja Danych</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Użyj standardowych formatów i konwencji.</p>
            <CodeBlock
              code={`// ZAMIENIAJ TO:
Jan Kowalski, urodzony 15 marca 1985, mieszka w Warszawie przy ulicy Marszałkowskiej 123, pracuje jako programista w firmie TechCorp od 2010 roku.

// NA TO:
User: {name: "Jan Kowalski", birth: "1985-03-15", address: "Warszawa, ul. Marszałkowska 123", job: "Software Developer", company: "TechCorp", since: 2010}`}
              language="json"
              title="Normalizacja danych osobowych"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">3. Usuwanie Redundancji</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Eliminuj powtarzające się informacje.</p>
            <CodeBlock
              code={`// ZAMIENIAJ TO:
"API powinno zwracać dane w formacie JSON. Odpowiedź powinna być w formacie JSON. Wszystkie endpointy zwracają JSON. Format odpowiedzi to JSON."

// NA TO:
"API returns data in JSON format for all endpoints."`}
              language="text"
              title="Usuwanie redundancji"
            />
          </div>
        </div>

        <h2>Narzędzia Kompresji</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-green-900 dark:text-green-100 font-semibold mb-3">Strukturyzacja</h3>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Tabele zamiast akapitów</li>
              <li>• Listy zamiast zdań</li>
              <li>• Hierarchie zamiast płaskiego tekstu</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h3 className="text-purple-900 dark:text-purple-100 font-semibold mb-3">Standaryzacja</h3>
            <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
              <li>• Jednolite nazewnictwo</li>
              <li>• Standardowe formaty dat/czasu</li>
              <li>• Spójne jednostki miar</li>
            </ul>
          </div>
        </div>

        <h2>Strategie Kompresji dla Różnych Typów Zawartości</h2>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Kod źródłowy:</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">Zachowaj strukturę, usuń komentarze, użyj minifikacji</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100">Dokumentacja:</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">Wyciągnij kluczowe punkty, użyj bullet points</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 dark:text-purple-100">Dane strukturalne:</h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm">Konwertuj na JSON/CSV, normalizuj format</p>
          </div>
        </div>

        <h2>Podsumowanie</h2>
        <p>Kompresja kontekstu to kluczowa umiejętność pozwalająca efektywnie wykorzystywać ograniczone zasoby modeli AI. Strategiczne zmniejszanie objętości informacji przy zachowaniu ich wartości prowadzi do lepszych rezultatów i niższych kosztów.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link href="/samouczki/inzynieria-kontekstu/wybieranie-kontekstu" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          ← Poprzedni Tutorial
        </Link>
        <Link href="/samouczki/inzynieria-kontekstu/izolacja-kontekstu" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Następny Tutorial: Izolacja Kontekstu →
        </Link>
      </motion.div>
    </div>
  );
}