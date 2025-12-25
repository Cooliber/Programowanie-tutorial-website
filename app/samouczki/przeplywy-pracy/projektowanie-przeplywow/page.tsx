"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Workflow, Target, Layers, GitBranch } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function ProjektowaniePrzeplywowPage() {
  const demoSteps = [
    {
      title: "Analiza wymagań biznesowych",
      description: "Rozpocznij od zrozumienia celów biznesowych i wymagań użytkowników.",
      code: `# Analiza wymagań dla systemu przetwarzania zamówień
CEL BIZNESOWY: Automatyzacja przetwarzania zamówień e-commerce

WYMAGANIA FUNKCJONALNE:
- Walidacja zamówienia
- Sprawdzenie dostępności produktów
- Przetwarzanie płatności
- Wysyłka potwierdzenia
- Aktualizacja stanu magazynowego

WYMAGANIA NIETFUNKCJONALNE:
- Czas przetwarzania: < 30 sekund
- Dostępność: 99.9%
- Skalowalność: do 1000 zamówień/minutę`,
      result: "✅ Zdefiniowano wymagania biznesowe i techniczne dla systemu workflow."
    },
    {
      title: "Projektowanie architektury przepływu",
      description: "Zaprojektuj strukturę przepływu z uwzględnieniem zależności między zadaniami.",
      code: `# Architektura przepływu przetwarzania zamówień
START → Walidacja → Dostępność → Płatność → Wysyłka → Magazyn → KONIEC

WARUNKI BIZNESOWE:
- Jeśli walidacja nie powiedzie się → Anuluj zamówienie
- Jeśli produkt niedostępny → Zaoferuj alternatywę
- Jeśli płatność odrzucona → Zwróć środki

PUNKTY KONTROLI:
- Loguj każdy krok
- Wysyłaj powiadomienia o statusie
- Obsługuj błędy gracefully`,
      result: "✅ Zaprojektowano architekturę przepływu z obsługą błędów i warunkami biznesowymi."
    },
    {
      title: "Implementacja i testowanie",
      description: "Zaimplementuj przepływ i przetestuj wszystkie ścieżki wykonania.",
      code: `# Implementacja przepływu w Python z użyciem workflow framework
from workflow_engine import Workflow, Task, Condition

# Definicja zadań
validate_order = Task("validate_order", validate_order_function)
check_inventory = Task("check_inventory", check_inventory_function)
process_payment = Task("process_payment", process_payment_function)
send_confirmation = Task("send_confirmation", send_confirmation_function)
update_inventory = Task("update_inventory", update_inventory_function)

# Definicja warunków
payment_successful = Condition(lambda ctx: ctx.payment_status == "approved")
inventory_available = Condition(lambda ctx: ctx.inventory_status == "available")

# Budowa przepływu
workflow = Workflow("order_processing")
workflow.add_task(validate_order)
workflow.add_conditional_task(check_inventory, inventory_available)
workflow.add_conditional_task(process_payment, payment_successful)
workflow.add_task(send_confirmation)
workflow.add_task(update_inventory)

# Uruchomienie
result = workflow.execute(order_data)`,
      result: "✅ Przepływ został zaimplementowany i przetestowany pomyślnie."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/samouczki/przeplywy-pracy"
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
          <span>Przepływy Pracy</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>18 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projektowanie Przepływów
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się projektować efektywne i skalowalne przepływy pracy. Poznaj zasady architektury,
          najlepsze praktyki i wzorce projektowe dla systemów workflow.
        </p>
      </motion.div>

      <ProgressIndicator
        current={1}
        total={5}
        labels={["Projektowanie", "Automatyzacja", "Monitorowanie", "Błędy", "Skalowanie"]}
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
            <Workflow className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Architektura Przepływów
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Projektuj przepływy pracy z uwzględnieniem skalowalności, niezawodności i łatwości utrzymania.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Target className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Cele Biznesowe
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Przepływy pracy muszą wspierać cele biznesowe i dostarczać wymierną wartość użytkownikom.
            </p>
          </div>
        </div>

        <h2>Podstawy Projektowania Przepływów</h2>
        <p>
          Projektowanie przepływów pracy to proces tworzenia zorganizowanych sekwencji zadań,
          które efektywnie realizują cele biznesowe. Dobrze zaprojektowany przepływ jest skalowalny,
          niezawodny i łatwy w utrzymaniu oraz modyfikacji.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Kluczowa Zasada
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Przepływ pracy powinien być zaprojektowany od końca - zacznij od rezultatu, jaki chcesz osiągnąć,
            a następnie zaprojektuj kroki potrzebne do jego realizacji.
          </p>
        </div>

        <h2>Fazy Projektowania Przepływu</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Analiza Wymagań</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zrozum cele biznesowe, wymagania użytkowników i ograniczenia techniczne.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Modelowanie Procesu</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Stwórz diagram przepływu pokazujący wszystkie kroki i zależności.
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
                <h4 className="font-semibold text-gray-900 dark:text-white">Definicja Zadań</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Określ poszczególne zadania, ich wejścia, wyjścia i warunki wykonania.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Testowanie i Optymalizacja</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Przetestuj przepływ i zoptymalizuj pod kątem wydajności i niezawodności.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Projektowanie Przepływu w Działaniu"
          steps={demoSteps}
        />

        <h2>Wzorce Projektowe Przepływów</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-semibold">→</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sekwencyjny</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Zadania wykonywane jedno po drugim w ustalonej kolejności.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GitBranch className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Równoległy</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wielokrotne zadania wykonywane jednocześnie dla optymalizacji czasu.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-semibold">?</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Warunkowy</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ścieżka wykonania zależy od warunków biznesowych lub wyników poprzednich zadań.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`# Przykład dobrze zaprojektowanego przepływu w Python
from typing import Dict, Any, List
from dataclasses import dataclass
from enum import Enum

class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class WorkflowContext:
    order_id: str
    customer_id: str
    items: List[Dict[str, Any]]
    total_amount: float
    payment_status: str = "pending"
    inventory_status: str = "pending"
    shipping_status: str = "pending"

class WorkflowTask:
    def __init__(self, name: str, function, dependencies: List[str] = None):
        self.name = name
        self.function = function
        self.dependencies = dependencies or []
        self.status = TaskStatus.PENDING

    async def execute(self, context: WorkflowContext) -> Dict[str, Any]:
        try:
            self.status = TaskStatus.RUNNING
            result = await self.function(context)
            self.status = TaskStatus.COMPLETED
            return result
        except Exception as e:
            self.status = TaskStatus.FAILED
            raise e

class OrderProcessingWorkflow:
    def __init__(self):
        self.tasks = {}
        self.context = None

    def add_task(self, task: WorkflowTask):
        self.tasks[task.name] = task

    def validate_dependencies(self) -> bool:
        """Sprawdź czy wszystkie zależności są spełnione"""
        for task in self.tasks.values():
            for dep in task.dependencies:
                if dep not in self.tasks or self.tasks[dep].status != TaskStatus.COMPLETED:
                    return False
        return True

    async def execute(self, initial_context: WorkflowContext) -> WorkflowContext:
        self.context = initial_context

        # Kolejność wykonania oparta na zależnościach
        execution_order = [
            "validate_order",
            "check_inventory",
            "process_payment",
            "send_confirmation",
            "update_inventory"
        ]

        for task_name in execution_order:
            if task_name in self.tasks:
                task = self.tasks[task_name]

                # Sprawdź warunki biznesowe
                if task_name == "process_payment" and self.context.inventory_status != "available":
                    continue  # Pomiń płatność jeśli towar niedostępny

                try:
                    result = await task.execute(self.context)
                    # Aktualizuj kontekst na podstawie wyniku
                    if task_name == "check_inventory":
                        self.context.inventory_status = result.get("status", "unknown")
                    elif task_name == "process_payment":
                        self.context.payment_status = result.get("status", "unknown")

                except Exception as e:
                    # Loguj błąd i kontynuuj lub przerwij w zależności od strategii
                    print(f"Task {task_name} failed: {e}")
                    if task_name in ["validate_order"]:  # Krytyczne zadania
                        raise e

        return self.context`}
          language="python"
          title="Przykład implementacji workflow engine w Python"
        />

        <h2>Najczęstsze Błędy w Projektowaniu</h2>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Zbyt złożone przepływy</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                Przepływy z setkami zadań są trudne do zrozumienia i utrzymania.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Brak obsługi błędów</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                Przepływy bez mechanizmów obsługi błędów są zawodne w środowisku produkcyjnym.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Ignorowanie skalowalności</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                Przepływy zaprojektowane bez uwzględnienia przyszłego wzrostu mogą stać się wąskim gardłem.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Najlepsze Praktyki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Modułowość:</strong> Dzieli duże przepływy na mniejsze, niezależne komponenty</li>
            <li>• <strong>Idempotentność:</strong> Zapewnij, że zadania można bezpiecznie powtarzać</li>
            <li>• <strong>Monitorowanie:</strong> Implementuj logging i metryki dla wszystkich zadań</li>
            <li>• <strong>Testowalność:</strong> Projektuj przepływy tak, aby były łatwe do testowania</li>
            <li>• <strong>Dokumentacja:</strong> Dokładnie dokumentuj każdy krok i warunki biznesowe</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Projektowanie przepływów pracy to sztuka łączenia wymagań biznesowych z możliwościami technologicznymi.
          Dobrze zaprojektowany przepływ jest fundamentem efektywnego systemu automatyzacji. Pamiętaj,
          że przepływ pracy powinien ewoluować wraz z potrzebami biznesowymi - regularnie przeglądaj
          i optymalizuj swoje przepływy.
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
          href="/samouczki/przeplywy-pracy/automatyzacja-procesow"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Automatyzacja Procesów →
        </Link>
      </motion.div>
    </div>
  );
}