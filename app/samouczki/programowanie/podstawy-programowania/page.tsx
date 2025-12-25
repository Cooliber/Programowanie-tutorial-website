"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Code, Brain, Zap, Database } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function PodstawyProgramowaniaPage() {
  const demoSteps = [
    {
      title: "Zmienne i typy danych",
      description: "Zobacz, jak agent AI rozumie i przetwarza różne typy danych.",
      code: `// Agent analizuje dane wejściowe
const userInput = "Zamów 3 sztuki produktu X dla klienta Y";

// Agent rozpoznaje:
const order = {
  product: "X",
  quantity: 3,        // number
  customer: "Y",      // string
  urgent: false       // boolean
};

// Agent przetwarza dane
if (order.quantity > 0 && order.quantity <= 100) {
  console.log("Zamówienie jest prawidłowe");
} else {
  console.log("Nieprawidłowa ilość");
}`,
      result: "✅ Agent poprawnie rozpoznał zamówienie: produkt X, ilość 3, klient Y."
    },
    {
      title: "Struktury kontrolne",
      description: "Agent używa warunków i pętli do podejmowania decyzji.",
      code: `// Agent sprawdza dostępność produktów
const products = [
  { id: "A", stock: 50, price: 100 },
  { id: "B", stock: 0, price: 200 },
  { id: "C", stock: 25, price: 150 }
];

const order = { productId: "B", quantity: 2 };

// Agent sprawdza dostępność
const product = products.find(p => p.id === order.productId);

if (!product) {
  console.log("Produkt nie istnieje");
} else if (product.stock < order.quantity) {
  console.log("Niewystarczająca ilość w magazynie");
} else {
  const totalPrice = product.price * order.quantity;
  console.log(\`Zamówienie możliwe. Cena całkowita: \${totalPrice}\`);
}`,
      result: "❌ Produkt B jest niedostępny - brak wystarczającej ilości w magazynie."
    },
    {
      title: "Funkcje i moduły",
      description: "Agent organizuje kod w funkcje wielokrotnego użytku.",
      code: `// Agent definiuje funkcje pomocnicze
function validateOrder(order) {
  if (!order.productId || !order.quantity) {
    return { valid: false, error: "Brak wymaganych pól" };
  }
  if (order.quantity <= 0 || order.quantity > 1000) {
    return { valid: false, error: "Nieprawidłowa ilość" };
  }
  return { valid: true };
}

function calculateTotal(order, products) {
  const product = products.find(p => p.id === order.productId);
  if (!product) return null;

  const subtotal = product.price * order.quantity;
  const tax = subtotal * 0.23; // 23% VAT
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

// Agent przetwarza zamówienie
const order = { productId: "A", quantity: 3 };
const validation = validateOrder(order);

if (validation.valid) {
  const pricing = calculateTotal(order, products);
  console.log(\`Zamówienie prawidłowe. Razem: \${pricing.total} PLN\`);
} else {
  console.log(\`Błąd: \${validation.error}\`);
}`,
      result: "✅ Zamówienie prawidłowe. Cena netto: 300 PLN, VAT: 69 PLN, Razem: 369 PLN."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/samouczki/programowanie"
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
          <span>Programowanie</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>14 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Podstawy Programowania dla Agentów AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Zrozum podstawowe koncepcje programowania niezbędne do tworzenia inteligentnych agentów AI.
          Naucz się myśleć algorytmicznie i rozwiązywać problemy programistycznie.
        </p>
      </motion.div>

      <ProgressIndicator
        current={1}
        total={5}
        labels={["Podstawy", "JavaScript", "Python", "Zaawansowane", "Projekty"]}
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
              Algorytmiczne Myślenie
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Naucz się rozkładać problemy na mniejsze części i rozwiązywać je systematycznie.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Code className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Struktury Danych
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Zrozum, jak organizować i przetwarzać dane w efektywny sposób.
            </p>
          </div>
        </div>

        <h2>Dlaczego Programowanie jest Ważne dla Agentów AI?</h2>
        <p>
          Agenci AI to nie tylko modele językowe - to kompletne programy komputerowe, które potrafią:
        </p>

        <ul>
          <li><strong>Przetwarzać dane:</strong> Czytać, analizować i transformować informacje</li>
          <li><strong>Podejmować decyzje:</strong> Używać logiki do wyboru odpowiednich działań</li>
          <li><strong>Komunikować się:</strong> Interagować z użytkownikami i innymi systemami</li>
          <li><strong>Uczyć się:</strong> Adaptować swoje zachowanie na podstawie doświadczenia</li>
          <li><strong>Automatyzować zadania:</strong> Wykonywać złożone sekwencje operacji</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Kluczowa Różnica
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Podczas gdy tradycyjne programowanie koncentruje się na tworzeniu aplikacji,
            programowanie agentów AI skupia się na tworzeniu <em>inteligentnego zachowania</em> -
            systemów, które potrafią rozumieć kontekst i adaptować się do zmieniających się warunków.
          </p>
        </div>

        <h2>Podstawowe Koncepcje Programowania</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Zmienne i Typy Danych</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Przechowywanie i manipulacja informacjami w różnych formatach.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Struktury Kontrolne</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Warunki i pętle do kontrolowania przepływu wykonania.
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
                <h4 className="font-semibold text-gray-900 dark:text-white">Funkcje</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Modularne bloki kodu wielokrotnego użytku.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Struktury Danych</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Organizowanie danych dla efektywnego dostępu.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Programowanie w Działaniu"
          steps={demoSteps}
        />

        <h2>Typy Danych w Programowaniu Agentów</h2>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Podstawowe typy danych:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">🔢 Typy Proste</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>string:</strong> "tekst", "nazwa produktu"</li>
                <li><strong>number:</strong> 42, 3.14, -10</li>
                <li><strong>boolean:</strong> true, false</li>
                <li><strong>null/undefined:</strong> brak wartości</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">📦 Typy Złożone</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>array:</strong> [1, 2, 3], ["a", "b", "c"]</li>
                <li><strong>object:</strong> {`{name: "Jan", age: 30}`}</li>
                <li><strong>function:</strong> blok kodu do wykonania</li>
                <li><strong>date:</strong> reprezentacja czasu</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Przykład pracy z różnymi typami danych w agencie AI
class CustomerServiceAgent {
  constructor() {
    this.customers = new Map(); // Map do przechowywania klientów
    this.orders = []; // Array do przechowywania zamówień
  }

  // Przetwarzanie danych tekstowych (string)
  processCustomerMessage(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("zamówienie")) {
      return "Chciałbym pomóc z zamówieniem. Proszę podać numer zamówienia.";
    } else if (lowerMessage.includes("zwrot")) {
      return "Rozpocznę procedurę zwrotu. Jakie produkty chcesz zwrócić?";
    } else {
      return "Jak mogę pomóc w sprawie obsługi klienta?";
    }
  }

  // Praca z liczbami i obliczeniami
  calculateOrderTotal(items) {
    let subtotal = 0;

    for (const item of items) {
      // Sprawdzamy czy ilość jest prawidłowa (number validation)
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new Error(\`Nieprawidłowa ilość dla produktu \${item.name}\`);
      }

      // Sprawdzamy czy cena jest prawidłowa
      if (typeof item.price !== 'number' || item.price <= 0) {
        throw new Error(\`Nieprawidłowa cena dla produktu \${item.name}\`);
      }

      subtotal += item.quantity * item.price;
    }

    const tax = subtotal * 0.23; // 23% VAT
    const total = subtotal + tax;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }

  // Praca z datami
  scheduleFollowUp(customerId, daysFromNow = 7) {
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + daysFromNow);

    const customer = this.customers.get(customerId);
    if (!customer) {
      throw new Error('Klient nie znaleziony');
    }

    // Dodajemy zadanie follow-up
    this.followUps.push({
      customerId,
      customerName: customer.name,
      followUpDate,
      reason: 'Sprawdzenie satysfakcji z zamówienia',
      completed: false
    });

    return \`Zaplanowano follow-up na \${followUpDate.toLocaleDateString('pl-PL')}\`;
  }

  // Praca z wartościami logicznymi (boolean)
  checkOrderStatus(orderId) {
    const order = this.orders.find(o => o.id === orderId);

    if (!order) {
      return { exists: false, status: null };
    }

    const isDelivered = order.status === 'delivered';
    const isPaid = order.paymentStatus === 'paid';
    const needsFollowUp = !order.followUpCompleted && order.orderDate < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    return {
      exists: true,
      status: order.status,
      isDelivered,
      isPaid,
      needsFollowUp
    };
  }

  // Praca z obiektami złożonymi
  createCustomerProfile(customerData) {
    // Walidacja danych wejściowych
    if (!customerData.name || typeof customerData.name !== 'string') {
      throw new Error('Imię i nazwisko jest wymagane');
    }

    if (!customerData.email || !customerData.email.includes('@')) {
      throw new Error('Prawidłowy adres email jest wymagany');
    }

    // Tworzymy profil klienta
    const profile = {
      id: 'cust_' + Date.now(),
      name: customerData.name.trim(),
      email: customerData.email.toLowerCase(),
      phone: customerData.phone || null,
      address: customerData.address || {},
      preferences: {
        newsletter: customerData.newsletter !== false, // domyślnie true
        smsNotifications: customerData.smsNotifications || false,
        language: customerData.language || 'pl'
      },
      stats: {
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: null,
        vipStatus: false
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Zapisujemy profil
    this.customers.set(profile.id, profile);

    return profile;
  }
}

// Przykład użycia agenta
const agent = new CustomerServiceAgent();

// Przetwarzanie wiadomości
const response1 = agent.processCustomerMessage("Chcę złożyć zamówienie");
console.log(response1); // "Chciałbym pomóc z zamówieniem..."

// Obliczanie wartości zamówienia
const orderItems = [
  { name: "Laptop", quantity: 1, price: 3500 },
  { name: "Myszka", quantity: 2, price: 150 }
];
const total = agent.calculateOrderTotal(orderItems);
console.log(total); // { subtotal: 3800, tax: 874, total: 4674 }

// Tworzenie profilu klienta
const customerProfile = agent.createCustomerProfile({
  name: "Jan Kowalski",
  email: "jan.kowalski@example.com",
  phone: "+48 123 456 789",
  newsletter: true
});
console.log(customerProfile.id); // "cust_1640995200000"`}
          language="javascript"
          title="Praktyczny przykład pracy z typami danych w agencie obsługi klienta"
        />

        <h2>Algorytmy i Logika Decyzyjna</h2>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">🧠</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Algorytmy Decyzyjne</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                Systematyczne podejście do rozwiązywania problemów poprzez sekwencje kroków.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">🔀</span>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">Struktury Kontrolne</h4>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Warunki if/else, pętle for/while, instrukcje switch do kontrolowania przepływu.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">📊</span>
            </div>
            <div>
              <h4 className="font-medium text-purple-900 dark:text-purple-100">Przetwarzanie Danych</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                Filtrowanie, sortowanie, grupowanie i agregacja danych dla podejmowania decyzji.
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Algorytmy decyzyjne w agentach AI
class DecisionMakingAgent {
  constructor() {
    this.rules = this.loadDecisionRules();
  }

  // Algorytm kwalifikacji leadów sprzedażowych
  qualifyLead(leadData) {
    let score = 0;
    const reasons = [];

    // Kryteria kwalifikacji
    if (leadData.companySize > 100) {
      score += 30;
      reasons.push("Duża firma - wysoki potencjał");
    } else if (leadData.companySize > 20) {
      score += 20;
      reasons.push("Średnia firma");
    } else {
      score += 5;
      reasons.push("Mała firma");
    }

    if (leadData.budget > 50000) {
      score += 25;
      reasons.push("Wysoki budżet");
    } else if (leadData.budget > 10000) {
      score += 15;
      reasons.push("Średni budżet");
    }

    if (leadData.urgency === "high") {
      score += 20;
      reasons.push("Pilne zapotrzebowanie");
    } else if (leadData.urgency === "medium") {
      score += 10;
      reasons.push("Średnie zapotrzebowanie");
    }

    // Decyzja końcowa
    let qualification;
    if (score >= 50) {
      qualification = "hot";
    } else if (score >= 25) {
      qualification = "warm";
    } else {
      qualification = "cold";
    }

    return {
      score,
      qualification,
      reasons,
      recommendedAction: this.getRecommendedAction(qualification)
    };
  }

  // Algorytm rekomendacji produktów
  recommendProducts(customerHistory, availableProducts) {
    const recommendations = [];
    const customerPreferences = this.analyzeCustomerPreferences(customerHistory);

    for (const product of availableProducts) {
      let score = 0;

      // Sprawdź zgodność z preferencjami
      if (customerPreferences.categories.includes(product.category)) {
        score += 20;
      }

      // Sprawdź zakres cenowy
      const priceDiff = Math.abs(product.price - customerPreferences.avgSpent);
      if (priceDiff < customerPreferences.avgSpent * 0.3) {
        score += 15;
      }

      // Sprawdź popularność wśród podobnych klientów
      if (product.popularity > 0.7) {
        score += 10;
      }

      // Sprawdź czy klient już kupował podobne produkty
      const similarPurchases = customerHistory.filter(p =>
        p.category === product.category
      ).length;

      if (similarPurchases > 0) {
        score += similarPurchases * 5;
      }

      if (score > 25) {
        recommendations.push({
          product,
          score,
          reasons: this.generateRecommendationReasons(product, customerPreferences, score)
        });
      }
    }

    // Sortuj rekomendacje według punktacji
    return recommendations.sort((a, b) => b.score - a.score);
  }

  // Algorytm optymalizacji harmonogramu
  optimizeSchedule(tasks, resources, timeConstraints) {
    // Algorytm planowania zadań z uwzględnieniem zasobów i czasu

    const schedule = [];
    const availableResources = { ...resources };

    // Sortuj zadania według priorytetu i terminów
    const sortedTasks = tasks.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority; // Wyższy priorytet pierwszy
      }
      return new Date(a.deadline) - new Date(b.deadline); // Wcześniejszy termin pierwszy
    });

    for (const task of sortedTasks) {
      // Znajdź dostępne okno czasowe
      const timeSlot = this.findAvailableTimeSlot(
        task.duration,
        task.preferredTime,
        timeConstraints
      );

      if (timeSlot) {
        // Sprawdź dostępność zasobów
        const requiredResources = this.checkResourceAvailability(
          task.resources,
          availableResources,
          timeSlot
        );

        if (requiredResources.available) {
          // Zaplanuj zadanie
          schedule.push({
            task: task.id,
            startTime: timeSlot.start,
            endTime: timeSlot.end,
            resources: requiredResources.allocated
          });

          // Zaktualizuj dostępne zasoby
          this.allocateResources(availableResources, requiredResources.allocated, timeSlot);
        } else {
          // Zadanie nie może być zaplanowane
          schedule.push({
            task: task.id,
            status: "delayed",
            reason: "Niewystarczające zasoby",
            nextAvailable: requiredResources.nextAvailable
          });
        }
      } else {
        schedule.push({
          task: task.id,
          status: "delayed",
          reason: "Brak dostępnego czasu"
        });
      }
    }

    return schedule;
  }

  // Algorytm analizy sentymentu (uproszczony)
  analyzeSentiment(text) {
    const positiveWords = ["dobry", "świetny", "wspaniały", "fantastyczny", "doskonale"];
    const negativeWords = ["źle", "problemy", "awaria", "nie działa", "rozczarowany"];

    const words = text.toLowerCase().split(/\\s+/);
    let positiveScore = 0;
    let negativeScore = 0;

    for (const word of words) {
      if (positiveWords.some(pw => word.includes(pw))) {
        positiveScore++;
      }
      if (negativeWords.some(nw => word.includes(nw))) {
        negativeScore++;
      }
    }

    const totalScore = positiveScore - negativeScore;
    let sentiment;

    if (totalScore > 0) {
      sentiment = "positive";
    } else if (totalScore < 0) {
      sentiment = "negative";
    } else {
      sentiment = "neutral";
    }

    return {
      sentiment,
      score: totalScore,
      confidence: Math.min(Math.abs(totalScore) / words.length, 1),
      details: { positiveWords: positiveScore, negativeWords: negativeScore }
    };
  }

  // Metody pomocnicze
  loadDecisionRules() {
    return {
      leadQualification: {
        companySize: { small: 5, medium: 20, large: 30 },
        budget: { low: 0, medium: 15, high: 25 },
        urgency: { low: 0, medium: 10, high: 20 }
      }
    };
  }

  getRecommendedAction(qualification) {
    const actions = {
      hot: "Natychmiastowy kontakt sprzedażowy",
      warm: "Zaplanuj demonstrację w ciągu 3 dni",
      cold: "Dodaj do nurturującej kampanii email"
    };
    return actions[qualification];
  }

  analyzeCustomerPreferences(history) {
    const categories = history.map(h => h.category);
    const prices = history.map(h => h.price);

    return {
      categories: [...new Set(categories)],
      avgSpent: prices.reduce((sum, p) => sum + p, 0) / prices.length,
      preferredPriceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices)
      }
    };
  }

  generateRecommendationReasons(product, preferences, score) {
    const reasons = [];

    if (preferences.categories.includes(product.category)) {
      reasons.push("Pasuje do Twoich preferencji");
    }

    if (score > 40) {
      reasons.push("Bardzo wysoka zgodność");
    }

    return reasons;
  }

  findAvailableTimeSlot(duration, preferredTime, constraints) {
    // Uproszczona implementacja - w rzeczywistości używałaby kalendarza
    return {
      start: preferredTime || new Date(),
      end: new Date(Date.now() + duration * 60 * 1000)
    };
  }

  checkResourceAvailability(required, available, timeSlot) {
    // Sprawdź czy wszystkie wymagane zasoby są dostępne
    for (const [resource, amount] of Object.entries(required)) {
      if (!available[resource] || available[resource] < amount) {
        return {
          available: false,
          nextAvailable: "2024-01-15T10:00:00Z" // Przykład
        };
      }
    }

    return {
      available: true,
      allocated: required
    };
  }

  allocateResources(available, allocated, timeSlot) {
    for (const [resource, amount] of Object.entries(allocated)) {
      available[resource] -= amount;
    }
  }
}

// Przykład użycia algorytmów decyzyjnych
const agent = new DecisionMakingAgent();

// Kwalifikacja leada
const leadResult = agent.qualifyLead({
  companySize: 150,
  budget: 75000,
  urgency: "high"
});
console.log(leadResult);
// { score: 75, qualification: "hot", reasons: [...], recommendedAction: "..." }

// Analiza sentymentu
const sentiment = agent.analyzeSentiment("Produkt jest fantastyczny, ale mam małe problemy z instalacją");
console.log(sentiment);
// { sentiment: "positive", score: 1, confidence: 0.125, details: {...} }`}
          language="javascript"
          title="Algorytmy decyzyjne i logika w agentach AI"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Wskazówki dla Początkujących</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Rozkładaj problemy:</strong> Dziel duże zadania na mniejsze, manageable części</li>
            <li>• <strong>Testuj często:</strong> Sprawdzaj swój kod po każdym niewielkim zmianie</li>
            <li>• <strong>Używaj nazw opisowych:</strong> Zmienne i funkcje powinny wyjaśniać swoje przeznaczenie</li>
            <li>• <strong>Obsługuj błędy:</strong> Zawsze przewiduj sytuacje wyjątkowe i błędy</li>
            <li>• <strong>Komentuj kod:</strong> Wyjaśniaj skomplikowaną logikę komentarzami</li>
            <li>• <strong>Ucz się na błędach:</strong> Analizuj dlaczego coś nie działa i jak to naprawić</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Podstawy programowania dla agentów AI obejmują zrozumienie typów danych, struktur kontrolnych,
          funkcji oraz podstawowych algorytmów. Te koncepcje są fundamentem dla wszystkich bardziej
          zaawansowanych technik programowania agentów.
        </p>

        <p>
          W kolejnych tutorialach zagłębimy się w konkretne języki programowania - JavaScript i Python -
          oraz nauczymy się stosować te podstawy w praktycznych scenariuszach tworzenia agentów AI.
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
          href="/samouczki/programowanie/javascript-dla-agentow"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: JavaScript dla Agentów →
        </Link>
      </motion.div>
    </div>
  );
}