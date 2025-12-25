"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Target, TrendingUp, RefreshCw, Zap, Users, Code, Lightbulb, Award, CheckCircle, ArrowRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";

export default function KaizenPage() {
  const improvementCycleSteps = [
    {
      title: "Identyfikacja Problemu",
      description: "Znajdź obszary wymagające poprawy w procesie lub systemie.",
      code: `// Przykład identyfikacji problemów w kodzie
function analyzeCodeQuality(codebase) {
  const issues = {
    complexity: 0,
    duplication: 0,
    testCoverage: 0,
    performance: 0
  };

  // Analiza złożoności cyklomatycznej
  codebase.functions.forEach(func => {
    if (func.complexity > 10) {
      issues.complexity++;
      console.log(\`Funkcja \${func.name} ma zbyt wysoką złożoność: \${func.complexity}\`);
    }
  });

  // Sprawdzenie duplikacji kodu
  const duplicates = findCodeDuplicates(codebase);
  issues.duplication = duplicates.length;

  // Ocena pokrycia testami
  issues.testCoverage = calculateTestCoverage(codebase);

  // Analiza wydajności
  issues.performance = analyzePerformance(codebase);

  return {
    issues,
    priority: calculatePriority(issues),
    recommendations: generateRecommendations(issues)
  };
}`,
      result: "✅ Zidentyfikowano 3 główne problemy: wysoka złożoność, duplikacja kodu, niska pokrycie testami."
    },
    {
      title: "Planowanie Poprawy",
      description: "Opracuj konkretny plan działania z mierzalnymi celami.",
      code: `// Planowanie iteracyjnych poprawek
class KaizenPlanner {
  constructor(currentState, targetState) {
    this.currentState = currentState;
    this.targetState = targetState;
    this.plan = [];
  }

  createImprovementPlan() {
    // Podziel duże problemy na mniejsze zadania
    const tasks = this.breakDownProblems();

    // Ustal priorytety na podstawie wpływu
    const prioritizedTasks = this.prioritizeTasks(tasks);

    // Stwórz harmonogram iteracyjny
    this.plan = this.createIterativeSchedule(prioritizedTasks);

    return this.plan;
  }

  breakDownProblems() {
    return [
      {
        id: 'reduce-complexity',
        title: 'Refaktoryzacja funkcji o wysokiej złożoności',
        effort: 'medium',
        impact: 'high',
        subtasks: [
          'Rozdziel funkcję calculateMetrics na mniejsze funkcje',
          'Wprowadź wczesne return dla prostych przypadków',
          'Dodaj komentarze wyjaśniające logikę'
        ]
      },
      {
        id: 'eliminate-duplication',
        title: 'Usunięcie duplikacji kodu',
        effort: 'low',
        impact: 'medium',
        subtasks: [
          'Wyciągnij wspólną logikę do utility functions',
          'Użyj dziedziczenia lub kompozycji zamiast duplikacji'
        ]
      },
      {
        id: 'improve-tests',
        title: 'Zwiększenie pokrycia testami',
        effort: 'high',
        impact: 'high',
        subtasks: [
          'Dodaj unit testy dla krytycznych funkcji',
          'Zaimplementuj integration tests',
          'Skonfiguruj CI/CD z automatycznymi testami'
        ]
      }
    ];
  }

  prioritizeTasks(tasks) {
    return tasks.sort((a, b) => {
      const scoreA = this.calculatePriorityScore(a);
      const scoreB = this.calculatePriorityScore(b);
      return scoreB - scoreA; // Wyższy score = wyższy priorytet
    });
  }

  calculatePriorityScore(task) {
    const effortWeights = { low: 3, medium: 2, high: 1 };
    const impactWeights = { low: 1, medium: 2, high: 3 };

    return effortWeights[task.effort] * impactWeights[task.impact];
  }

  createIterativeSchedule(tasks) {
    const iterations = [];
    const iterationSize = 2; // Maksymalnie 2 zadania na iterację

    for (let i = 0; i < tasks.length; i += iterationSize) {
      iterations.push({
        number: Math.floor(i / iterationSize) + 1,
        tasks: tasks.slice(i, i + iterationSize),
        duration: '1 tydzień',
        goals: this.defineIterationGoals(tasks.slice(i, i + iterationSize))
      });
    }

    return iterations;
  }

  defineIterationGoals(tasks) {
    return tasks.map(task => \`Zakończ zadanie: \${task.title}\`);
  }
}

// Przykład użycia
const planner = new KaizenPlanner(
  { complexity: 15, duplication: 30, testCoverage: 45 },
  { complexity: 8, duplication: 5, testCoverage: 85 }
);

const improvementPlan = planner.createImprovementPlan();
console.log('Plan poprawy:', improvementPlan);`,
      result: "✅ Utworzono plan 2 iteracji z 3 zadaniami, priorytetyzowanymi według wpływu i wysiłku."
    },
    {
      title: "Implementacja",
      description: "Wprowadź zmiany stopniowo, testując każdy krok.",
      code: `// Implementacja z ciągłym testowaniem
class KaizenImplementation {
  constructor(plan) {
    this.plan = plan;
    this.currentIteration = 0;
    this.metrics = new Map();
  }

  async executeIteration(iterationNumber) {
    const iteration = this.plan.find(iter => iter.number === iterationNumber);

    if (!iteration) {
      throw new Error(\`Iteracja \${iterationNumber} nie istnieje\`);
    }

    console.log(\`Rozpoczynam iterację \${iterationNumber}: \${iteration.goals.join(', ')}\`);

    // Wykonaj zadania iteracji
    for (const task of iteration.tasks) {
      await this.executeTask(task);
    }

    // Zmierz wyniki
    const results = await this.measureResults(iteration);

    // Oceń postęp
    const assessment = this.assessProgress(results);

    return {
      iteration: iterationNumber,
      completed: true,
      results,
      assessment,
      nextSteps: this.planNextSteps(assessment)
    };
  }

  async executeTask(task) {
    console.log(\`Wykonywanie zadania: \${task.title}\`);

    // Symulacja wykonania zadania
    for (const subtask of task.subtasks) {
      console.log(\`  ✓ \${subtask}\`);
      await this.delay(500); // Symulacja czasu wykonania
    }

    // Automatyczne testy
    const testsPassed = await this.runTests(task);
    if (!testsPassed) {
      throw new Error(\`Testy nie przeszły dla zadania: \${task.title}\`);
    }
  }

  async runTests(task) {
    // Symulacja uruchamiania testów
    console.log(\`Uruchamianie testów dla: \${task.title}\`);

    const testResults = {
      unitTests: Math.random() > 0.1, // 90% sukces
      integrationTests: Math.random() > 0.2, // 80% sukces
      performanceTests: Math.random() > 0.15 // 85% sukces
    };

    const allPassed = Object.values(testResults).every(result => result);

    if (allPassed) {
      console.log('✅ Wszystkie testy przeszły');
    } else {
      console.log('❌ Niektóre testy nie przeszły:', testResults);
    }

    return allPassed;
  }

  async measureResults(iteration) {
    // Zmierz metryki przed i po iteracji
    const beforeMetrics = this.metrics.get(\`iteration-\${iteration.number - 1}\`) || {
      complexity: 15, duplication: 30, testCoverage: 45
    };

    const afterMetrics = {
      complexity: Math.max(8, beforeMetrics.complexity - Math.random() * 3),
      duplication: Math.max(5, beforeMetrics.duplication - Math.random() * 10),
      testCoverage: Math.min(85, beforeMetrics.testCoverage + Math.random() * 15)
    };

    this.metrics.set(\`iteration-\${iteration.number}\`, afterMetrics);

    return {
      before: beforeMetrics,
      after: afterMetrics,
      improvement: {
        complexity: beforeMetrics.complexity - afterMetrics.complexity,
        duplication: beforeMetrics.duplication - afterMetrics.duplication,
        testCoverage: afterMetrics.testCoverage - beforeMetrics.testCoverage
      }
    };
  }

  assessProgress(results) {
    const { improvement } = results;

    let assessment = 'neutral';
    let confidence = 0;

    if (improvement.complexity > 0 && improvement.testCoverage > 0) {
      assessment = 'positive';
      confidence = 0.8;
    } else if (improvement.duplication > 0) {
      assessment = 'moderate';
      confidence = 0.6;
    } else {
      assessment = 'needs_review';
      confidence = 0.3;
    }

    return { assessment, confidence, details: improvement };
  }

  planNextSteps(assessment) {
    if (assessment.assessment === 'positive') {
      return ['Kontynuuj następną iterację', 'Udokumentuj nauczone lekcje'];
    } else if (assessment.assessment === 'moderate') {
      return ['Przejrzyj podejście do następnego zadania', 'Skonsultuj z zespołem'];
    } else {
      return ['Przejrzyj strategię poprawy', 'Zbierz więcej danych', 'Rozważ zmianę podejścia'];
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Przykład wykonania iteracji
const implementation = new KaizenImplementation(improvementPlan);
implementation.executeIteration(1).then(result => {
  console.log('Wyniki iteracji 1:', result);
});`,
      result: "✅ Wykonano iterację z poprawą złożoności o 2.1, zwiększeniem pokrycia testami o 12%."
    },
    {
      title: "Ocena i Następna Iteracja",
      description: "Zmierz wyniki, ucz się z doświadczeń i planuj następne ulepszenia.",
      code: `// System oceny i uczenia się z Kaizen
class KaizenLearningSystem {
  constructor() {
    this.iterations = [];
    this.lessonsLearned = [];
    this.metricsHistory = [];
  }

  recordIterationResults(iterationResults) {
    this.iterations.push(iterationResults);
    this.metricsHistory.push(iterationResults.results.after);

    // Wyciągnij lekcje
    const lessons = this.extractLessons(iterationResults);
    this.lessonsLearned.push(...lessons);

    // Wygeneruj rekomendacje na przyszłość
    return this.generateRecommendations();
  }

  extractLessons(iteration) {
    const lessons = [];

    // Analiza tego, co działało dobrze
    if (iteration.assessment.confidence > 0.7) {
      lessons.push({
        type: 'success',
        lesson: 'Małe, iteracyjne zmiany przynoszą lepsze rezultaty',
        evidence: \`Poprawa złożoności: \${iteration.results.improvement.complexity}\`
      });
    }

    // Analiza problemów
    if (iteration.assessment.assessment === 'needs_review') {
      lessons.push({
        type: 'challenge',
        lesson: 'Testy automatyczne są kluczowe przed wprowadzeniem zmian',
        evidence: 'Niektóre testy nie przeszły po implementacji'
      });
    }

    // Analiza czasu wykonania
    const avgTaskTime = this.calculateAverageTaskTime();
    if (avgTaskTime < 2) { // godziny
      lessons.push({
        type: 'efficiency',
        lesson: 'Krótkie iteracje pozwalają na szybsze zbieranie feedbacku',
        evidence: \`Średni czas zadania: \${avgTaskTime} godz.\`
      });
    }

    return lessons;
  }

  calculateAverageTaskTime() {
    // Symulacja - w rzeczywistości pochodziłoby z danych
    return 1.5 + Math.random() * 2; // 1.5-3.5 godziny
  }

  generateRecommendations() {
    const recentIterations = this.iterations.slice(-3);
    const avgConfidence = recentIterations.reduce((sum, iter) =>
      sum + iter.assessment.confidence, 0) / recentIterations.length;

    const recommendations = [];

    if (avgConfidence > 0.8) {
      recommendations.push({
        priority: 'high',
        action: 'Zwiększ zakres iteracji',
        reason: 'Dobre rezultaty wskazują na możliwość szybszego tempa'
      });
    }

    if (this.metricsHistory.length > 2) {
      const trend = this.calculateTrend('testCoverage');
      if (trend > 0) {
        recommendations.push({
          priority: 'medium',
          action: 'Rozszerz praktyki testowania na inne obszary',
          reason: 'Pokrycie testami systematycznie rośnie'
        });
      }
    }

    const commonChallenges = this.findCommonChallenges();
    if (commonChallenges.includes('testing')) {
      recommendations.push({
        priority: 'high',
        action: 'Zainwestuj w lepsze narzędzia testowe',
        reason: 'Testowanie jest częstym wąskim gardłem'
      });
    }

    return recommendations;
  }

  calculateTrend(metricName) {
    if (this.metricsHistory.length < 2) return 0;

    const recent = this.metricsHistory.slice(-3);
    const values = recent.map(m => m[metricName]);

    // Prosta regresja liniowa
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    const n = values.length;

    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += values[i];
      sumXY += i * values[i];
      sumXX += i * i;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  }

  findCommonChallenges() {
    const challenges = [];

    const testFailures = this.iterations.filter(iter =>
      iter.assessment.details && iter.assessment.details.testFailures > 0
    ).length;

    if (testFailures > this.iterations.length * 0.3) {
      challenges.push('testing');
    }

    const complexityIssues = this.iterations.filter(iter =>
      iter.results.improvement.complexity < 0.5
    ).length;

    if (complexityIssues > this.iterations.length * 0.4) {
      challenges.push('complexity');
    }

    return challenges;
  }

  generateReport() {
    const totalIterations = this.iterations.length;
    const successfulIterations = this.iterations.filter(iter =>
      iter.assessment.confidence > 0.6
    ).length;

    const avgImprovement = this.calculateAverageImprovement();

    return {
      summary: {
        totalIterations,
        successRate: successfulIterations / totalIterations,
        avgImprovement
      },
      lessonsLearned: this.lessonsLearned,
      recommendations: this.generateRecommendations(),
      trends: {
        complexity: this.calculateTrend('complexity'),
        testCoverage: this.calculateTrend('testCoverage'),
        duplication: this.calculateTrend('duplication')
      }
    };
  }

  calculateAverageImprovement() {
    if (this.iterations.length === 0) return {};

    const improvements = this.iterations.map(iter => iter.results.improvement);

    return {
      complexity: improvements.reduce((sum, imp) => sum + imp.complexity, 0) / improvements.length,
      duplication: improvements.reduce((sum, imp) => sum + imp.duplication, 0) / improvements.length,
      testCoverage: improvements.reduce((sum, imp) => sum + imp.testCoverage, 0) / improvements.length
    };
  }
}

// Przykład systemu uczenia się
const learningSystem = new KaizenLearningSystem();

// Symulacja kilku iteracji
const mockIterations = [
  {
    results: { before: { complexity: 15, duplication: 30, testCoverage: 45 }, after: { complexity: 13, duplication: 25, testCoverage: 55 }, improvement: { complexity: 2, duplication: 5, testCoverage: 10 } },
    assessment: { assessment: 'positive', confidence: 0.8 }
  },
  {
    results: { before: { complexity: 13, duplication: 25, testCoverage: 55 }, after: { complexity: 11, duplication: 20, testCoverage: 65 }, improvement: { complexity: 2, duplication: 5, testCoverage: 10 } },
    assessment: { assessment: 'positive', confidence: 0.85 }
  }
];

mockIterations.forEach(iteration => {
  learningSystem.recordIterationResults(iteration);
});

const report = learningSystem.generateReport();
console.log('Raport Kaizen:', report);`,
      result: "✅ Wygenerowano raport z 67% skutecznością iteracji, średnią poprawą złożoności o 2.0."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót do strony głównej
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
          <span>Filozofia Ciągłego Udoskonalania</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>20 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Kaizen: Droga do Doskonałości
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Odkryj filozofię ciągłego doskonalenia, która odmieniła japońskie производство
          i może zrewolucjonizować rozwój oprogramowania oraz systemy AI.
        </p>
      </motion.div>

      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <Target className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Ciągłe Doskonalenie
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Kaizen oznacza "zmianę na lepsze" - filozofię małych, stopniowych ulepszeń.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Pochodzenie z Japonii
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Narodził się w powojennej Japonii jako klucz do odbudowy przemysłu.
            </p>
          </div>
        </div>

        <h2>Początki Kaizen w Japońskim Przemyśle</h2>
        <p>
          Kaizen narodził się w Japonii po II wojnie światowej, kiedy kraj stał w obliczu zniszczeń
          gospodarczych i przemysłowych. Słowo "kaizen" pochodzi od japońskich słów "kai" (zmiana)
          i "zen" (dobry, na lepsze). Ta filozofia stała się fundamentem odrodzenia japońskiego przemysłu.
        </p>

        <p>
          Toyota jako pierwsza firma na szeroką skalę zaimplementowała Kaizen, tworząc Toyota Production System (TPS).
          W przeciwieństwie do zachodniego podejścia "big bang" zmian, Kaizen promuje ideę małych,
          stopniowych ulepszeń wprowadzanych codziennie przez wszystkich pracowników.
        </p>

        <InteractiveDemo
          title="Cykl Kaizen w Praktyce"
          steps={improvementCycleSteps}
        />

        <h2>Zasady Kaizen</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <RefreshCw className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ciągłość
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Doskonalenie nigdy się nie kończy. Zawsze jest miejsce na poprawę.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <Users className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Zaangażowanie Wszystkich
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Każdy pracownik, od pracownika liniowego po CEO, może wnieść wkład.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <Lightbulb className="h-8 w-8 text-yellow-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Małe Kroki
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Skup się na małych, osiągalnych ulepszeniach zamiast rewolucyjnych zmian.
            </p>
          </motion.div>
        </div>

        <h2>Kaizen w Rozwoju Oprogramowania</h2>
        <p>
          W świecie oprogramowania Kaizen znajduje zastosowanie w metodykach takich jak:
        </p>

        <ul>
          <li><strong>Agile:</strong> Iteracyjne cykle rozwoju z ciągłym feedbackiem</li>
          <li><strong>Continuous Integration/Continuous Deployment (CI/CD):</strong> Ciągłe dostarczanie małych zmian</li>
          <li><strong>Test-Driven Development (TDD):</strong> Ciągłe doskonalenie poprzez testy</li>
          <li><strong>Refactoring:</strong> Stopniowe ulepszanie kodu bez zmiany funkcjonalności</li>
        </ul>

        <CodeBlock
          code={`// Przykład refaktoryzacji w duchu Kaizen
// PRZED: Duża, złożona funkcja
function processUserData(rawData) {
  // Walidacja
  if (!rawData || !rawData.name || !rawData.email) {
    throw new Error('Invalid user data');
  }

  // Przetwarzanie
  const processedData = {
    name: rawData.name.trim(),
    email: rawData.email.toLowerCase(),
    age: rawData.age || null,
    createdAt: new Date()
  };

  // Zapis do bazy danych
  const userId = database.save('users', processedData);

  // Wysyłanie powiadomienia
  emailService.sendWelcomeEmail(processedData.email, processedData.name);

  return { userId, ...processedData };
}

// PO: Podzielona na mniejsze funkcje (Kaizen iteration 1)
function validateUserData(data) {
  if (!data || !data.name || !data.email) {
    throw new Error('Invalid user data');
  }
}

function normalizeUserData(rawData) {
  return {
    name: rawData.name.trim(),
    email: rawData.email.toLowerCase(),
    age: rawData.age || null,
    createdAt: new Date()
  };
}

function saveUserToDatabase(userData) {
  return database.save('users', userData);
}

function sendWelcomeNotification(email, name) {
  return emailService.sendWelcomeEmail(email, name);
}

function processUserData(rawData) {
  validateUserData(rawData);
  const processedData = normalizeUserData(rawData);
  const userId = saveUserToDatabase(processedData);
  sendWelcomeNotification(processedData.email, processedData.name);

  return { userId, ...processedData };
}

// Następna iteracja: Dodanie testów (Kaizen iteration 2)
describe('processUserData', () => {
  it('should process valid user data', () => {
    const input = { name: ' Jan Kowalski ', email: 'JAN@EXAMPLE.COM', age: 30 };
    const result = processUserData(input);

    expect(result.name).toBe('Jan Kowalski');
    expect(result.email).toBe('jan@example.com');
    expect(result.age).toBe(30);
    expect(result.userId).toBeDefined();
  });

  it('should throw error for invalid data', () => {
    expect(() => processUserData({})).toThrow('Invalid user data');
  });
});`}
          language="javascript"
          title="Ewolucja kodu poprzez Kaizen - od jednej dużej funkcji do modularnego, przetestowanego kodu"
        />

        <h2>Kaizen w Systemach AI</h2>
        <p>
          W systemach sztucznej inteligencji Kaizen znajduje zastosowanie w:
        </p>

        <ul>
          <li><strong>Ciągłe uczenie się:</strong> Modele AI są regularnie retrenowane na nowych danych</li>
          <li><strong>A/B testing:</strong> Stopniowe testowanie ulepszeń w środowisku produkcyjnym</li>
          <li><strong>Monitoring i alerting:</strong> Ciągłe śledzenie wydajności i jakości</li>
          <li><strong>Human-in-the-loop:</strong> Ludzki feedback do ciągłego doskonalenia</li>
        </ul>

        <CodeBlock
          code={`// Przykład Kaizen w systemie rekomendacji AI
class KaizenRecommendationSystem {
  constructor() {
    this.modelVersion = 'v1.0';
    this.performanceMetrics = new Map();
    this.improvementPipeline = [];
  }

  // Ciągłe monitorowanie wydajności
  async monitorPerformance() {
    const metrics = await this.collectMetrics();

    // Sprawdź czy wydajność spada
    if (metrics.accuracy < this.getBaselineAccuracy() - 0.05) {
      console.log('Wykryto spadek wydajności - planowanie poprawy');
      await this.planImprovement(metrics);
    }

    this.performanceMetrics.set(new Date(), metrics);
  }

  // Planowanie małych ulepszeń
  async planImprovement(currentMetrics) {
    const improvements = [];

    // Analiza problemów
    if (currentMetrics.latency > 200) {
      improvements.push({
        type: 'optimization',
        description: 'Optymalizacja czasu odpowiedzi',
        effort: 'medium',
        expectedImpact: 'high'
      });
    }

    if (currentMetrics.accuracy < 0.85) {
      improvements.push({
        type: 'retraining',
        description: 'Retrening modelu na nowych danych',
        effort: 'high',
        expectedImpact: 'high'
      });
    }

    // Priorytetyzacja
    improvements.sort((a, b) => {
      const effortWeight = { low: 3, medium: 2, high: 1 };
      const impactWeight = { low: 1, medium: 2, high: 3 };

      const scoreA = effortWeight[a.effort] * impactWeight[a.expectedImpact];
      const scoreB = effortWeight[b.effort] * impactWeight[b.expectedImpact];

      return scoreB - scoreA;
    });

    this.improvementPipeline = improvements;
  }

  // Iteracyjne wdrażanie poprawek
  async executeNextImprovement() {
    if (this.improvementPipeline.length === 0) {
      return { status: 'no_improvements_pending' };
    }

    const improvement = this.improvementPipeline.shift();

    console.log(\`Wdrażanie poprawy: \${improvement.description}\`);

    try {
      // Wdrażanie w małych krokach
      await this.implementImprovement(improvement);

      // Testowanie
      const testResults = await this.testImprovement(improvement);

      if (testResults.success) {
        // Mierzenie wpływu
        const impact = await this.measureImpact(improvement);

        return {
          status: 'success',
          improvement,
          impact,
          nextImprovement: this.improvementPipeline[0]
        };
      } else {
        // Rollback jeśli testy nie przeszły
        await this.rollbackImprovement(improvement);

        return {
          status: 'failed',
          improvement,
          reason: testResults.reason
        };
      }

    } catch (error) {
      console.error(\`Błąd podczas wdrażania poprawy: \${error.message}\`);
      return { status: 'error', improvement, error: error.message };
    }
  }

  async implementImprovement(improvement) {
    switch (improvement.type) {
      case 'optimization':
        await this.optimizeLatency();
        break;
      case 'retraining':
        await this.retrainModel();
        break;
      default:
        throw new Error(\`Nieznany typ poprawy: \${improvement.type}\`);
    }
  }

  async testImprovement(improvement) {
    // Uruchom testy A/B
    const testGroup = await this.createTestGroup();
    const baselineGroup = await this.createBaselineGroup();

    // Porównaj wyniki przez 1 godzinę
    await this.delay(3600000);

    const testResults = await this.compareGroups(testGroup, baselineGroup);

    return {
      success: testResults.confidence > 0.95 && testResults.improvement > 0,
      reason: testResults.improvement <= 0 ? 'Brak poprawy' : 'Niska pewność wyników'
    };
  }

  async measureImpact(improvement) {
    const beforeMetrics = this.getRecentMetrics(24); // ostatnie 24 godziny
    const afterMetrics = await this.collectMetrics();

    return {
      accuracy: afterMetrics.accuracy - beforeMetrics.accuracy,
      latency: beforeMetrics.latency - afterMetrics.latency,
      userSatisfaction: afterMetrics.satisfaction - beforeMetrics.satisfaction
    };
  }

  getBaselineAccuracy() {
    // Rolling average z ostatnich 30 dni
    const recentMetrics = Array.from(this.performanceMetrics.values()).slice(-30);
    return recentMetrics.reduce((sum, m) => sum + m.accuracy, 0) / recentMetrics.length;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Przykład użycia
const aiSystem = new KaizenRecommendationSystem();

// Ciągłe monitorowanie
setInterval(() => aiSystem.monitorPerformance(), 3600000); // co godzinę

// Ręczne wykonanie poprawy
aiSystem.executeNextImprovement().then(result => {
  console.log('Wynik poprawy:', result);
});`}
          language="javascript"
          title="System rekomendacji AI z wbudowanym Kaizen - ciągłe doskonalenie przez monitoring i iteracyjne poprawki"
        />

        <h2>Przykłady z Rzeczywistego Świata</h2>

        <div className="grid md:grid-cols-2 gap-8 my-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Award className="h-8 w-8 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Toyota - Ojciec Kaizen
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Toyota wprowadziła Kaizen w latach 50. XX wieku, co doprowadziło do stworzenia
              Toyota Production System. Pracownicy na wszystkich poziomach są zachęcani do
              zgłaszania pomysłów na ulepszenia.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>Andon system:</strong> Natychmiastowe zatrzymywanie linii produkcyjnej</li>
              <li>• <strong>Kanban:</strong> System just-in-time dostaw</li>
              <li>• <strong>5S:</strong> Metoda organizacji miejsca pracy</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Zap className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Google - Kaizen w Inżynierii
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Google stosuje Kaizen poprzez praktyki DevOps i ciągłe dostarczanie.
              Ich podejście "10% time" pozwala inżynierom poświęcać czas na eksperymenty.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>Continuous Deployment:</strong> Tysiące deploymentów dziennie</li>
              <li>• <strong>Site Reliability Engineering (SRE):</strong> Ciągłe doskonalenie niezawodności</li>
              <li>• <strong>Post-mortem culture:</strong> Uczymy się z incydentów</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-8">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Kluczowe Lekcje z Kaizen
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-green-700 dark:text-green-300 space-y-2 text-sm">
              <li><strong>Małe zmiany sumują się:</strong> 1% poprawa dziennie = 37x lepszy wynik w rok</li>
              <li><strong>Kultura otwartości:</strong> Każdy głos się liczy, od stażysty po CEO</li>
              <li><strong>Systematyczne podejście:</strong> PDCA (Plan-Do-Check-Act) cykl</li>
              <li><strong>Ciągłe uczenie się:</strong> Każda iteracja to okazja do nauki</li>
            </ul>
            <ul className="text-green-700 dark:text-green-300 space-y-2 text-sm">
              <li><strong>Mierzenie postępów:</strong> Co nie jest mierzone, nie może być poprawione</li>
              <li><strong>Eliminacja marnotrawstwa:</strong> Usuwanie niepotrzebnych procesów</li>
              <li><strong>Zaangażowanie zespołu:</strong> Kaizen działa tylko z udziałem wszystkich</li>
              <li><strong>Długoterminowa wizja:</strong> Doskonalenie to podróż, nie cel</li>
            </ul>
          </div>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Kaizen to nie tylko metodologia, ale sposób myślenia. To przekonanie, że doskonałość
          nie jest stanem końcowym, ale ciągłym procesem. W świecie oprogramowania i AI,
          gdzie zmiany zachodzą błyskawicznie, Kaizen oferuje sprawdzony framework do
          adaptacji i ciągłego doskonalenia.
        </p>

        <p>
          Niech Kaizen stanie się częścią Twojej codziennej praktyki - zaczynając od małych,
          osiągalnych ulepszeń, które z czasem przekształcą sposób, w jaki budujesz i utrzymujesz
          systemy.
        </p>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <Link
          href="/samouczki"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Odkryj Samouczki Programowania
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}