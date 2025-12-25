"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, FileText, Users, Settings, CheckCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function PisanieKontekstuPage() {
  const demoSteps = [
    {
      title: "Słaby prompt - zbyt ogólny",
      description: "Zobacz, jak nieprecyzyjny prompt prowadzi do niejednoznacznych odpowiedzi.",
      code: "Napisz kod do sortowania listy.",
      result: "Oto przykładowa implementacja sortowania listy w Pythonie:\n\ndef sort_list(arr):\n    return sorted(arr)\n\n# Przykład użycia\nmy_list = [3, 1, 4, 1, 5]\nprint(sort_list(my_list))"
    },
    {
      title: "Lepszy prompt - dodajemy kontekst",
      description: "Dodajemy język programowania, algorytm i wymagania.",
      code: "Napisz funkcję w JavaScript implementującą algorytm quicksort. Funkcja powinna przyjmować tablicę liczb i zwracać posortowaną tablicę. Dołącz komentarze wyjaśniające każdy krok.",
      result: "function quicksort(arr) {\n    if (arr.length <= 1) {\n        return arr;\n    }\n    \n    const pivot = arr[0];\n    const left = [];\n    const right = [];\n    \n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] < pivot) {\n            left.push(arr[i]);\n        } else {\n            right.push(arr[i]);\n        }\n    }\n    \n    return [...quicksort(left), pivot, ...quicksort(right)];\n}"
    },
    {
      title: "Doskonały prompt - kompletny kontekst",
      description: "Dodajemy rolę, format wyjściowy, edge cases i przykłady.",
      code: `Jako senior software engineer, zaimplementuj algorytm quicksort w TypeScript z pełną typizacją.

WYMAGANIA:
- Funkcja powinna przyjmować Array<number> i zwracać Array<number>
- Implementacja rekursywna z pivotem jako pierwszym elementem
- Obsłużyć edge cases: pusta tablica, tablica z jednym elementem
- Dodać JSDoc komentarze
- Zoptymalizować pod kątem czytelności

PRZYKŁAD UŻYCIA:
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quicksort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

FORMAT WYJŚCIOWY:
Zwróć kompletną funkcję gotową do użycia.`,
      result: `/**
 * Sortuje tablicę liczb używając algorytmu quicksort
 * @param arr - Tablica liczb do posortowania
 * @returns Posortowana tablica w porządku rosnącym
 */
function quicksort(arr: number[]): number[] {
    // Edge case: pusta tablica lub tablica z jednym elementem
    if (arr.length <= 1) {
        return arr;
    }

    // Wybór pivota (pierwszy element)
    const pivot = arr[0];
    const left: number[] = [];
    const right: number[] = [];

    // Podział na elementy mniejsze i większe od pivota
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Rekursywne sortowanie i łączenie wyników
    return [...quicksort(left), pivot, ...quicksort(right)];
}

// Przykład użycia
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quicksort(numbers)); // [11, 12, 22, 25, 34, 64, 90]`
    }
  ];

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
            <span>15 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pisanie Kontekstu
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się tworzyć efektywne prompty poprzez strukturyzację instrukcji,
          dostarczanie odpowiedniego kontekstu i optymalizację komunikacji z modelami AI.
        </p>
      </motion.div>

      <ProgressIndicator
        current={2}
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
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Jasność</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Precyzyjne instrukcje</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900 dark:text-green-100">Kontekst</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Odpowiednie informacje</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg text-center">
            <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">Struktura</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Logiczna organizacja</p>
          </div>
        </div>

        <h2>Techniki Tworzenia Efektywnych Promptów</h2>
        <p>
          Dobry prompt to połączenie jasnych instrukcji, odpowiedniego kontekstu i struktury,
          która pomaga modelowi AI zrozumieć zadanie i dostarczyć oczekiwane rezultaty.
        </p>

        <InteractiveDemo
          title="Ewolucja Promptu - Od Prostego do Zaawansowanego"
          steps={demoSteps}
        />

        <h2>Struktura Efektywnego Promptu</h2>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Framework PEACE dla Tworzenia Promptów
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                P
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Persona (Rola)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Zdefiniuj rolę, którą ma przyjąć AI: "Jako doświadczony programista...", "Jako analityk danych..."
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                E
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Expectation (Oczekiwania)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Jasno opisz, co ma zostać wykonane i jakich rezultatów oczekujesz.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                A
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Assets (Zasoby)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Podaj wszystkie niezbędne dane, kontekst i materiały źródłowe.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                C
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Constraints (Ograniczenia)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Określ ograniczenia: format wyjściowy, długość, język, standardy kodowania itp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                E
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Examples (Przykłady)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Podaj przykłady wejścia i oczekiwanego wyjścia (few-shot learning).
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2>Praktyczne Wzorce Promptów</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Zadania Kodowania
            </h3>
            <CodeBlock
              code={`Jako senior full-stack developer, stwórz komponent React do zarządzania listą zadań.

WYMAGANIA FUNKCJONALNE:
- Dodawanie nowych zadań
- Oznaczanie jako ukończone
- Usuwanie zadań
- Filtrowanie (wszystkie/aktywne/ukończone)

WYMAGANIA TECHNICZNE:
- TypeScript z pełną typizacją
- Hook useState do zarządzania stanem
- Tailwind CSS do stylowania
- Responsywny design

STRUKTURA KOMPONENTU:
- TaskItem: pojedyncze zadanie
- TaskList: lista zadań z filtrowaniem
- TaskForm: formularz dodawania
- TaskFilters: kontrolki filtrowania

PRZYKŁAD UŻYCIA:
<TaskManager initialTasks={[]} />`}
              language="typescript"
              title="Wzór promptu dla zadań programistycznych"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Zadania Analityczne
            </h3>
            <CodeBlock
              code={`Jako doświadczony analityk biznesowy, przeanalizuj poniższe dane sprzedażowe i przygotuj rekomendacje.

DANE WEJŚCIOWE:
- Sprzedaż Q1 2024: $2.3M (wzrost 15% vs Q1 2023)
- Sprzedaż Q2 2024: $2.1M (spadek 8% vs Q1 2024)
- Główny produkt: Software A (60% sprzedaży)
- Region: Nord America (45% sprzedaży)

ANALIZA DO PRZEPROWADZENIA:
1. Identyfikacja trendów i anomalii
2. Analiza przyczyn spadku w Q2
3. Ocena wpływu na prognozy roczne
4. Rekomendacje strategiczne

FORMAT RAPORTU:
- Wykresy i tabele (ASCII art)
- Kluczowe wnioski (3-5 punktów)
- Rekomendacje z priorytetami
- Następne kroki z terminami`}
              language="text"
              title="Wzór promptu dla zadań analitycznych"
            />
          </div>
        </div>

        <h2>Techniki Usprawniające Prompty</h2>

        <div className="space-y-6 my-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-blue-900 dark:text-blue-100 font-semibold mb-3">
              1. Few-Shot Learning (Uczenie na Przykładach)
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Podaj modelowi przykłady, jak ma rozwiązywać podobne zadania.
            </p>
            <CodeBlock
              code={`Przetwórz dane użytkowników na format JSON.

PRZYKŁAD 1:
Wejście: Jan Kowalski, 30 lat, Warszawa
Wyjście: {"name": "Jan Kowalski", "age": 30, "city": "Warszawa"}

PRZYKŁAD 2:
Wejście: Anna Nowak, 25 lat, Kraków
Wyjście: {"name": "Anna Nowak", "age": 25, "city": "Kraków"}

Teraz przetwórz:
Wejście: Piotr Wiśniewski, 35 lat, Gdańsk`}
              language="json"
            />
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-green-900 dark:text-green-100 font-semibold mb-3">
              2. Chain of Thought (Łańcuch Myślenia)
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              Poproś model o pokazanie procesu myślenia krok po kroku.
            </p>
            <CodeBlock
              code={`Rozwiąż problem: Firma ma 3 projekty, każdy wymagający 2 programistów przez 3 miesiące.

Pomyśl krok po kroku:
1. Oblicz całkowity nakład pracy
2. Określ dostępne zasoby
3. Zidentyfikuj wąskie gardło
4. Zaproponuj rozwiązanie

Następnie podaj rekomendację dla kierownictwa projektu.`}
              language="text"
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h3 className="text-purple-900 dark:text-purple-100 font-semibold mb-3">
              3. Role-Playing (Odtwarzanie Ról)
            </h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-3">
              Nadaj modelowi specyficzną rolę dla lepszego kontekstu.
            </p>
            <CodeBlock
              code={`Jako architekt oprogramowania z 15-letnim doświadczeniem w systemach enterprise, oceń proponowaną architekturę mikrousług.

Z perspektywy skalowalności, utrzymania i kosztów operacyjnych, jakie są główne zalety i wady tego podejścia?

Podaj konkretne rekomendacje dotyczące:
- Podziału na domeny biznesowe
- Strategii komunikacji między usługami
- Obsługi błędów i rezyliencji
- Monitorowania i logowania`}
              language="text"
            />
          </div>
        </div>

        <h2>Optymalizacja Promptów pod kątem Kosztów</h2>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-semibold mb-3">
            Strategie Redukcji Długości Promptów
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Usuń redundancje</h4>
              <p className="text-amber-700 dark:text-amber-300">
                Unikaj powtarzania tych samych informacji w różnych częściach promptu.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Użyj skrótów</h4>
              <p className="text-amber-700 dark:text-amber-300">
                Dla dobrze znanych terminów: API zamiast Application Programming Interface.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Strukturyzuj dane</h4>
              <p className="text-amber-700 dark:text-amber-300">
                Używaj tabel, list i formatowania zamiast długich akapitów.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Podziel na etapy</h4>
              <p className="text-amber-700 dark:text-amber-300">
                Dla złożonych zadań, używaj sekwencji krótszych promptów.
              </p>
            </div>
          </div>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Efektywne pisanie kontekstu wymaga połączenia jasności, struktury i odpowiedniego poziomu szczegółowości.
          Framework PEACE oraz techniki few-shot learning, chain of thought i role-playing to sprawdzone metody
          poprawy jakości odpowiedzi modeli AI. Pamiętaj o ciągłym testowaniu i optymalizacji promptów pod kątem
          zarówno jakości, jak i kosztów.
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
          href="/samouczki/inzynieria-kontekstu/wprowadzenie"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Poprzedni Tutorial
        </Link>
        <Link
          href="/samouczki/inzynieria-kontekstu/wybieranie-kontekstu"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Wybieranie Kontekstu →
        </Link>
      </motion.div>
    </div>
  );
}