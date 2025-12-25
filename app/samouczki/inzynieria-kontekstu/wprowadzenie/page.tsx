"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Brain, Zap, Target, Layers } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function WprowadzeniePage() {
  const demoSteps = [
    {
      title: "Podstawowy prompt bez kontekstu",
      description: "Zobacz, jak model odpowiada na proste pytanie bez dodatkowego kontekstu.",
      code: "Opisz, jak działa algorytm sortowania.",
      result: "Algorytm sortowania to metoda porządkowania elementów w określonej kolejności. Istnieje wiele rodzajów algorytmów sortowania, takich jak sortowanie bąbelkowe, sortowanie przez wstawianie, sortowanie szybkie (quicksort) itp. Każdy z nich ma swoje zalety i wady pod względem wydajności i złożoności."
    },
    {
      title: "Prompt z kontekstem technicznym",
      description: "Dodajmy kontekst, aby uzyskać bardziej precyzyjną odpowiedź.",
      code: "Jako doświadczony inżynier oprogramowania, wyjaśnij algorytm quicksort krok po kroku, włączając analizę złożoności czasowej i przestrzennej. Podaj przykład implementacji w pseudokodzie.",
      result: "Quicksort to efektywny algorytm sortowania oparty na strategii 'dziel i zwyciężaj'. Działa poprzez wybór elementu pivot, podział tablicy na dwie części (elementy mniejsze i większe od pivota), a następnie rekursywne sortowanie obu części..."
    },
    {
      title: "Prompt z kontekstem biznesowym",
      description: "Zobacz, jak kontekst biznesowy zmienia perspektywę odpowiedzi.",
      code: "Jako CTO startupu technologicznego, oceń, czy powinniśmy zaimplementować algorytm quicksort w naszym systemie rekomendacji produktów. Rozważ: wydajność, koszty utrzymania, skalowalność i alternatywy.",
      result: "Z perspektywy CTO startupu, wybór algorytmu sortowania zależy od konkretnego przypadku użycia. Quicksort jest doskonały dla większości zastosowań ze względu na średnią złożoność O(n log n), ale należy rozważyć..."
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
            <span>10 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Wprowadzenie do Inżynierii Kontekstu
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Zrozum, czym jest inżynieria kontekstu i dlaczego jest fundamentalna dla efektywnego
          wykorzystania modeli językowych w agentach AI.
        </p>
      </motion.div>

      <ProgressIndicator
        current={1}
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
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <Brain className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Inteligencja Kontekstowa
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Modele AI potrzebują odpowiedniego kontekstu, aby rozumieć zadania i dostarczać trafne odpowiedzi.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Zap className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Efektywność Operacyjna
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Dobrze skonstruowany kontekst zmniejsza koszty API i poprawia jakość odpowiedzi.
            </p>
          </div>
        </div>

        <h2>Co to jest Inżynieria Kontekstu?</h2>
        <p>
          Inżynieria kontekstu to sztuka i nauka optymalizacji sposobu dostarczania informacji do modeli AI,
          aby uzyskać lepsze, bardziej spójne i przydatne odpowiedzi. To nie tylko o tym, <em>co</em> mówisz,
          ale <em>jak</em> to mówisz - uwzględniając perspektywę, poziom szczegółowości i strukturę informacji.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Kluczowa Różnica
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Podczas gdy tradycyjne programowanie polega na pisaniu kodu, inżynieria kontekstu polega na
            "programowaniu" modeli AI poprzez starannie skonstruowane instrukcje i przykłady.
          </p>
        </div>

        <h2>Dlaczego Kontekst jest Tak Ważny?</h2>
        <p>
          Modele językowe, takie jak GPT, mają ograniczone "okno kontekstu" - maksymalną ilość tekstu,
          którą mogą przetworzyć jednocześnie. To okno jest zwykle mierzone w tokenach (słowa lub części słów).
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Przykład ograniczeń kontekstu:</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>GPT-3.5:</strong> ~4,000 tokenów (około 3,000 słów)</li>
            <li><strong>GPT-4:</strong> ~8,000-32,000 tokenów (6,000-24,000 słów)</li>
            <li><strong>GPT-4 Turbo:</strong> ~128,000 tokenów (96,000 słów)</li>
          </ul>
        </div>

        <h2>Podstawowe Koncepcje Inżynierii Kontekstu</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Prompt Engineering</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sztuka tworzenia efektywnych instrukcji, które kierują modelem AI do pożądanych odpowiedzi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Context Window Management</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Efektywne wykorzystanie ograniczonego okna kontekstu poprzez priorytetyzację informacji.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Token Optimization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Minimalizacja kosztów poprzez zmniejszanie długości promptów bez utraty jakości.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Context Compression</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Techniki zmniejszania objętości kontekstu przy zachowaniu kluczowych informacji.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Moc Kontekstu w Działaniu"
          steps={demoSteps}
        />

        <h2>Struktura Dobrego Kontekstu</h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6">
          <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Składowe Efektywnego Promptu
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Rola (Role)</h4>
              <p className="text-blue-700 dark:text-blue-300">
                Zdefiniuj perspektywę: "Jako doświadczony programista...", "Jako analityk biznesowy..."
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Zadanie (Task)</h4>
              <p className="text-blue-700 dark:text-blue-300">
                Jasno opisz, co ma zostać wykonane: "Napisz funkcję...", "Przeanalizuj dane..."
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Kontekst (Context)</h4>
              <p className="text-blue-700 dark:text-blue-300">
                Podaj niezbędne informacje: dane, ograniczenia, format wyjściowy.
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Przykład efektywnego promptu z pełnym kontekstem

Jako senior full-stack developer w firmie fintech, stwórz bezpieczny endpoint API dla transferów pieniężnych.

WYMAGANIA:
- Użyj Node.js z Express
- Implementuj walidację danych wejściowych
- Dodaj autoryzację JWT
- Obsłuż błędy gracefully
- Zaloguj wszystkie transakcje

DANE WEJŚCIOWE:
- amount: number (wymagane, min: 0.01)
- fromAccount: string (wymagane, format: IBAN)
- toAccount: string (wymagane, format: IBAN)
- description: string (opcjonalne, max 255 znaków)

FORMAT WYJŚCIOWY:
Zwróć JSON z polami: transactionId, status, timestamp, fee`}
          language="javascript"
          title="Przykład dobrze skonstruowanego promptu"
        />

        <h2>Najczęstsze Błędy w Inżynierii Kontekstu</h2>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Zbyt ogólne instrukcje</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                "Napisz kod" zamiast "Napisz funkcję React do filtrowania listy użytkowników"
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Brak specyfikacji formatu</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                Nieokreślenie oczekiwanego formatu wyjściowego prowadzi do niespójnych odpowiedzi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Ignorowanie kosztów tokenów</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                Długie, rozwlekłe prompty zwiększają koszty bez proporcjonalnej poprawy jakości
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Wskazówki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Bądź specyficzny:</strong> Im bardziej precyzyjne instrukcje, tym lepsze rezultaty</li>
            <li>• <strong>Podawaj przykłady:</strong> Few-shot learning znacząco poprawia jakość odpowiedzi</li>
            <li>• <strong>Strukturyzuj informacje:</strong> Używaj nagłówków, list i formatowania dla lepszej czytelności</li>
            <li>• <strong>Testuj iteracyjnie:</strong> Eksperymentuj z różnymi podejściami i mierz rezultaty</li>
            <li>• <strong>Optymalizuj koszty:</strong> Krótsze prompty często dają równie dobre rezultaty</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Inżynieria kontekstu to fundament efektywnego wykorzystania modeli AI. Poprzez zrozumienie,
          jak modelem "myśleć" i komunikować się z nimi, możemy osiągnąć znacznie lepsze rezultaty
          przy niższych kosztach. W kolejnych tutorialach zagłębimy się w konkretne techniki
          tworzenia, zarządzania i optymalizacji kontekstu.
        </p>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <div></div>
        <Link
          href="/samouczki/inzynieria-kontekstu/pisanie-kontekstu"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Pisanie Kontekstu →
        </Link>
      </motion.div>
    </div>
  );
}