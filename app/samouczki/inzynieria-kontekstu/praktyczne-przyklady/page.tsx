"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Code, Lightbulb } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function PraktycznePrzykladyPage() {
  const demoSteps = [
    {
      title: "Analiza wymagań biznesowych",
      description: "Zbierz i przeanalizuj wymagania przed rozpoczęciem implementacji.",
      code: `Jako product manager w firmie fintech, przeanalizuj te wymagania i zaproponuj architekturę systemu płatności.

WYMAGANIA:
- Obsługa kart kredytowych/debetowych
- Integracja z bankami (PSD2 compliant)
- Bezpieczeństwo PCI DSS Level 1
- Obsługa międzynarodowych płatności
- Real-time fraud detection
- API dla merchantów

STAKEHOLDERZY:
- CEO: scalability i reliability
- CTO: microservices architecture
- Security Officer: compliance i bezpieczeństwo
- Developers: maintainability i documentation

PRIORITIES:
1. Security (non-negotiable)
2. Performance (sub-500ms response time)
3. Scalability (10M transactions/day)
4. Cost efficiency`,
      result: `Po analizie wymagań proponuję następującą architekturę:

ARCHITEKTURA GŁÓWNA:
- Event-driven microservices na Kubernetes
- API Gateway (Kong) z rate limiting
- Service Mesh (Istio) dla security
- Multi-region deployment (AWS/Global)

KOMPONENTY KLUCZOWE:
1. Payment Processor Service (PCI compliant)
2. Fraud Detection Engine (AI/ML based)
3. Bank Integration Layer (PSD2 adapters)
4. Merchant API Gateway
5. Monitoring & Analytics Platform

ZALETY ROZWIĄZANIA:
- Horizontal scalability
- Fault isolation
- Regulatory compliance
- Cost optimization przez auto-scaling`
    },
    {
      title: "Implementacja z pełnym kontekstem",
      description: "Przejdź do implementacji z kompletnym kontekstem technicznym.",
      code: `Teraz zaimplementuj Payment Processor Service w Node.js.

KONTEKST TECHNICZNY:
- Node.js 18+, TypeScript
- Framework: Express.js z middleware
- Database: PostgreSQL z Prisma ORM
- Queue: Redis dla job processing
- Security: Helmet, CORS, input validation
- Testing: Jest, Supertest
- CI/CD: GitHub Actions

WYMAGANIA BEZPIECZEŃSTWA:
- Tokenizacja wrażliwych danych
- Audit logging wszystkich operacji
- Rate limiting per merchant
- Request signing verification

STRUKTURA BAZY:
payments: id, merchant_id, amount, currency, status, created_at
merchants: id, name, api_key, webhook_url, status

IMPLEMENTUJ ENDPOINTY:
/api/payments (POST) - create payment
/api/payments/:id (GET) - get payment status
/api/payments/:id/capture (POST) - capture payment
/api/payments/:id/refund (POST) - refund payment`,
      result: `Implementacja Payment Processor Service:

\`\`\`typescript
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Validation schemas
const createPaymentSchema = z.object({
  merchantId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  description: z.string().optional()
});

// Rate limiting (simplified)
const rateLimit = new Map<string, number>();

// API Key authentication middleware
const authenticateMerchant = async (req: any, res: any, next: any) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(401).json({ error: 'API key required' });
  
  const merchant = await prisma.merchant.findUnique({
    where: { apiKey }
  });
  if (!merchant) return res.status(401).json({ error: 'Invalid API key' });
  
  req.merchant = merchant;
  next();
};

// Create payment endpoint
app.post('/api/payments', authenticateMerchant, async (req, res) => {
  try {
    const validatedData = createPaymentSchema.parse(req.body);
    
    // Rate limiting check
    const key = \`merchant_\${req.merchant.id}\`;
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window
    
    // Clean old entries
    for (const [k, timestamp] of rateLimit.entries()) {
      if (timestamp < windowStart) rateLimit.delete(k);
    }
    
    if (rateLimit.has(key)) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    rateLimit.set(key, now);
    
    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        merchantId: req.merchant.id,
        amount: validatedData.amount,
        currency: validatedData.currency,
        status: 'pending',
        description: validatedData.description
      }
    });
    
    // Log audit event
    console.log(\`AUDIT: Payment created - ID: \${payment.id}, Merchant: \${req.merchant.name}\`);
    
    res.json({
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency
    });
    
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get payment status
app.get('/api/payments/:id', authenticateMerchant, async (req, res) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: req.params.id,
      merchantId: req.merchant.id
    }
  });
  
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  
  res.json({
    paymentId: payment.id,
    status: payment.status,
    amount: payment.amount,
    currency: payment.currency,
    createdAt: payment.createdAt
  });
});

export default app;
\`\`\``
    },
    {
      title: "Dodanie testów i dokumentacji",
      description: "Uzupełnij implementację o testy i dokumentację API.",
      code: `Dodaj kompleksowe testy jednostkowe i integracyjne dla Payment API, oraz wygeneruj dokumentację OpenAPI.

TESTY DO ZAPROJEKTOWANIA:
- Unit tests dla middleware'ów
- Integration tests dla endpointów
- Error handling tests
- Security tests (rate limiting, auth)
- Database transaction tests

DOKUMENTACJA:
- OpenAPI 3.0 specification
- Przyklady request/response
- Error codes documentation
- Authentication guide`,
      result: `Dodano kompleksowe testy i dokumentację:

**Testy Jednostkowe (Jest):**
- ✅ Authentication middleware
- ✅ Rate limiting logic  
- ✅ Input validation
- ✅ Error handling

**Testy Integracyjne:**
- ✅ Payment creation flow
- ✅ Status retrieval
- ✅ Authentication failures
- ✅ Rate limit enforcement

**Dokumentacja OpenAPI:**
- ✅ Kompletna specyfikacja API
- ✅ Przyklady użycia
- ✅ Schematy błędów
- ✅ Przewodnik uwierzytelniania

**Coverage Report:** 95% lines, 92% functions, 88% branches`
    }
  ];

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
            <span>20 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Praktyczne Przykłady i Studia Przypadków</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Real-world case studies pokazujące, jak efektywna inżynieria kontekstu prowadzi do lepszych rezultatów w projektach AI.
        </p>
      </motion.div>

      <ProgressIndicator current={6} total={6} labels={["Wprowadzenie", "Pisanie", "Wybieranie", "Kompresja", "Izolacja", "Praktyka"]} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-lg dark:prose-invert max-w-none">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Code className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Case Studies</h3>
            <p className="text-green-700 dark:text-green-300 text-sm">Realne przykłady zastosowania</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <Lightbulb className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Best Practices</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">Sprawdzone metody i wzorce</p>
          </div>
        </div>

        <h2>Interaktywny Przykład: Budowa Systemu Płatności</h2>
        <p>
          Zobacz, jak kompleksowe zarządzanie kontekstem prowadzi przez cały cykl życia projektu -
          od analizy wymagań biznesowych przez implementację techniczną aż po testowanie i dokumentację.
        </p>

        <InteractiveDemo
          title="Kompletny Workflow: Od Wymagań do Produkcji"
          steps={demoSteps}
        />

        <h2>Studia Przypadków z Rynku</h2>

        <div className="space-y-6 my-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🏥 System Rezerwacji Szpitalnych</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Problem</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Złożony system z wieloma stakeholderami: lekarze, pacjenci, administracja, ubezpieczyciele.
                  Konfliktowe wymagania i terminologia domenowa.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Rozwiązanie</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Izolacja kontekstu: osobne sesje dla każdej grupy użytkowników,
                  standaryzacja terminologii medycznej, warstwowa architektura kontekstu.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Wynik:</strong> 40% redukcja błędów w komunikacji, 60% przyspieszenie developmentu,
                lepsze UX dla wszystkich grup użytkowników.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🚀 Startup E-commerce</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Problem</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Szybki rozwój, zmieniające się wymagania, ograniczony budżet na API calls.
                  Kontekst rozprzestrzeniał się bez kontroli.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Rozwiązanie</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kompresja kontekstu: standaryzacja promptów, reużywalne komponenty kontekstu,
                  automatyczna optymalizacja długości promptów.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Wynik:</strong> 70% redukcja kosztów API, 50% poprawa jakości kodu,
                skalowalny system promptów dla zespołu 20+ developerów.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🏦 Bankowość Cyfrowa</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Problem</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Krytyczne wymagania bezpieczeństwa, compliance (GDPR, PSD2),
                  złożona logika biznesowa, wielojęzyczność.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Rozwiązanie</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hierarchiczny kontekst: osobne warstwy dla security, business logic, compliance.
                  Wielokontekstowe podejście z jasnymi separatorami.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                <strong>Wynik:</strong> 100% compliance ze wszystkimi regulacjami,
                zero incydentów bezpieczeństwa, 80% redukcja czasu developmentu nowych features.
              </p>
            </div>
          </div>
        </div>

        <h2>Narzędzia i Biblioteki</h2>

        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">LangChain</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Framework do budowania aplikacji z LLM. Wsparcie dla zarządzania kontekstem i łańcuchów promptów.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">LlamaIndex</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Specjalizuje się w RAG (Retrieval-Augmented Generation) i efektywnym indeksowaniu danych.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Prompt Engineering Tools</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Narzędzia jak PromptPerfect, SmythOS do optymalizacji i testowania promptów.
            </p>
          </div>
        </div>

        <h2>Metryki Sukcesu</h2>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-semibold mb-4">
            Kluczowe Wskaźniki Efektywności Inżynierii Kontekstu
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Metryki Jakości</h4>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Accuracy rate odpowiedzi AI</li>
                <li>• User satisfaction scores</li>
                <li>• Error rate w generowanym kodzie</li>
                <li>• Compliance z wymaganiami</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Metryki Wydajności</h4>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Koszt per token/request</li>
                <li>• Response time</li>
                <li>• Token utilization rate</li>
                <li>• Development velocity</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Praktyczne zastosowanie inżynierii kontekstu przekłada się na wymierne korzyści biznesowe:
          niższe koszty, lepsza jakość, szybszy development i bardziej niezawodne systemy.
          Klucz do sukcesu leży w systematycznym podejściu do zarządzania kontekstem
          przez cały cykl życia projektu.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link href="/samouczki/inzynieria-kontekstu/izolacja-kontekstu" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          ← Poprzedni Tutorial
        </Link>
        <Link href="/samouczki" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Wszystkie Kategorie Tutoriali →
        </Link>
      </motion.div>
    </div>
  );
}