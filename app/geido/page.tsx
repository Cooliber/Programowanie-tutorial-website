"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Target, BookOpen, Users, Award, TrendingUp, Lightbulb, Star, Zap } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function GeidoPage() {
  const masteryJourneySteps = [
    {
      title: "Początek Podróży - Shoshin (Początkujący Umysł)",
      description: "Rozpoczęcie nauki z otwartością i ciekawością świata.",
      code: `// Stan początkujący - otwarty na naukę
class BeginnerMind {
  constructor() {
    this.knowledge = new Map();
    this.questions = [];
    this.curiosity = 1.0; // Pełna otwartość
    this.ego = 0.1; // Niski poziom ego
  }

  learn(concept, teacher) {
    console.log(\`Uczeń pyta: "Czemu \${concept} działa w ten sposób?"\`);

    // Zadaj pytania, nie zakładaj, że wiesz
    this.questions.push(\`Dlaczego \${concept}?\`);
    this.questions.push(\`Jak to się łączy z innymi koncepcjami?\`);

    // Naucz się podstaw
    this.knowledge.set(concept, {
      level: 'beginner',
      understanding: 0.3,
      questions: this.questions
    });

    return \`Rozumiem podstawy \${concept}, ale mam wiele pytań...\`;
  }

  reflect() {
    return {
      insight: "Wszystko jest nowe i fascynujące",
      motivation: "Chcę zrozumieć głębiej",
      nextStep: "Zadawać więcej pytań"
    };
  }
}`,
      result: "✅ Uczeń rozpoczyna podróż z czystym umysłem i nieskończoną ciekawością."
    },
    {
      title: "Głębokie Zanurzenie - Kugyo (Surowa Praktyka)",
      description: "Intensywna praktyka i powtarzanie podstawowych umiejętności.",
      code: `// Faza intensywnej praktyki
class IntensivePractice {
  constructor() {
    this.practiceHours = 0;
    this.failures = [];
    this.improvements = [];
    this.consistency = 0.8;
  }

  dailyPractice(skill) {
    this.practiceHours += 4; // 4 godziny dziennie

    // Symulacja błędów i nauki z nich
    const mistakes = this.simulatePractice(skill);
    this.failures.push(...mistakes);

    // Analiza błędów i poprawa
    const lessons = this.analyzeFailures(mistakes);
    this.improvements.push(...lessons);

    // Zwiększ poziom umiejętności
    this.refineSkill(skill, lessons);

    return {
      hoursPracticed: this.practiceHours,
      lessonsLearned: lessons.length,
      skillLevel: this.calculateSkillLevel()
    };
  }

  simulatePractice(skill) {
    // Symulacja naturalnych błędów podczas praktyki
    return [
      \`\${skill}: nieprawidłowa technika\`,
      \`\${skill}: brak koncentracji\`,
      \`\${skill}: pośpiech w wykonaniu\`
    ];
  }

  analyzeFailures(mistakes) {
    return mistakes.map(mistake => ({
      mistake,
      rootCause: this.findRootCause(mistake),
      correction: this.findCorrection(mistake),
      prevention: this.createPreventionStrategy(mistake)
    }));
  }

  findRootCause(mistake) {
    // Analiza przyczyny błędu
    if (mistake.includes('technika')) return 'niewłaściwe podstawy';
    if (mistake.includes('koncentracja')) return 'brak skupienia';
    if (mistake.includes('pośpiech')) return 'niecierpliwość';
    return 'nieznana przyczyna';
  }

  findCorrection(mistake) {
    // Strategia korekty
    return \`Powtórz z uwagą na: \${this.findRootCause(mistake)}\`;
  }

  createPreventionStrategy(mistake) {
    return \`Ćwicz wolniej, skupiaj się na każdym ruchu\`;
  }

  refineSkill(skill, lessons) {
    // Poprawa umiejętności na podstawie lekcji
    console.log(\`Refining \${skill} based on \${lessons.length} lessons\`);
  }

  calculateSkillLevel() {
    const experience = Math.min(this.practiceHours / 1000, 1); // Max po 1000h
    const wisdom = this.improvements.length / 100; // Mądrość z błędów
    return (experience + wisdom) / 2;
  }
}`,
      result: "✅ Po 6 miesiącach intensywnej praktyki: 720h treningu, 45 lekcji z błędów, poziom umiejętności: 0.65."
    },
    {
      title: "Przełom - Satori (Oświecenie)",
      description: "Nagły moment zrozumienia, gdy wszystko zaczyna mieć sens.",
      code: `// Moment oświecenia
class Enlightenment {
  constructor() {
    this.insights = [];
    this.connections = new Map();
    this.perspective = 'limited';
  }

  experienceBreakthrough(skill, context) {
    console.log(\`Podczas praktyki \${skill} w kontekście \${context}...\`);

    // Nagły moment zrozumienia
    const insight = this.generateInsight(skill, context);

    // Wszystko nagle staje się jasne
    this.perspective = 'expanded';
    this.insights.push(insight);

    // Połącz niepowiązane wcześniej koncepcje
    this.connectConcepts(skill, context);

    return {
      insight,
      newUnderstanding: this.perspective,
      connectionsMade: Array.from(this.connections.keys()).length
    };
  }

  generateInsight(skill, context) {
    return \`\${skill} i \${context} to nie oddzielne rzeczy - to jeden płynny ruch życia!\`;
  }

  connectConcepts(skill, context) {
    // Znajdź powiązania między różnymi dziedzinami
    this.connections.set(\`\${skill}-\${context}\`, {
      relationship: 'jedność',
      depth: 'głęboka',
      applications: ['życie codzienne', 'inne umiejętności', 'nauczanie']
    });

    // Rozszerz na inne obszary
    this.connections.set(\`\${skill}-życie\`, {
      relationship: 'integralna część',
      depth: 'całościowa',
      applications: ['decyzje', 'relacje', 'twórczość']
    });
  }

  applyInsight(newSituation) {
    // Zastosuj oświecenie w nowej sytuacji
    const relevantConnections = this.findRelevantConnections(newSituation);

    return relevantConnections.map(conn => ({
      situation: newSituation,
      insight: conn.relationship,
      application: conn.applications[0]
    }));
  }

  findRelevantConnections(situation) {
    return Array.from(this.connections.values()).filter(conn =>
      conn.applications.some(app => situation.includes(app))
    );
  }
}`,
      result: "✅ Oświecenie! Wszystko staje się jasne - programowanie to nie kod, to sposób myślenia o problemach."
    },
    {
      title: "Mistrzostwo - Geidō (Droga Mistrza)",
      description: "Ciągła praktyka z głębokim zrozumieniem i umiejętnością przekazywania wiedzy.",
      code: `// Stan mistrzowski - ciągła ewolucja
class Mastery {
  constructor() {
    this.wisdom = new Map();
    this.teaching = [];
    this.innovation = [];
    this.legacy = {
      students: [],
      contributions: [],
      influence: 0
    };
  }

  embodyGeido() {
    // Mistrz nigdy nie przestaje się uczyć
    this.continuousLearning();

    // Dzieli się wiedzą
    this.teachOthers();

    // Innowuje i tworzy nowe ścieżki
    this.innovate();

    // Buduje dziedzictwo
    this.buildLegacy();

    return {
      wisdom: this.wisdom.size,
      students: this.legacy.students.length,
      innovations: this.innovation.length,
      influence: this.legacy.influence
    };
  }

  continuousLearning() {
    // Nawet mistrzowie znajdują nowe pytania
    this.wisdom.set('nowe-paradygmaty', {
      question: 'Jak AI zmieni sposób naszego myślenia?',
      exploration: 'badanie wpływu technologii na świadomość',
      depth: 'filozoficzna'
    });
  }

  teachOthers() {
    // Przekazywanie wiedzy z pokorą
    this.teaching.push({
      method: 'prowadzenie przez przykład',
      principle: 'każdy może osiągnąć mistrzostwo',
      impact: 'inspirowanie następnego pokolenia'
    });

    this.legacy.students.push({
      name: 'następca',
      potential: 'nieograniczony',
      journey: 'rozpoczęty'
    });
  }

  innovate() {
    // Mistrzowie tworzą nowe ścieżki
    this.innovation.push({
      idea: 'integracja AI z ludzką kreatywnością',
      impact: 'nowa era współtworzenia',
      legacy: 'zmiana paradygmatu'
    });
  }

  buildLegacy() {
    // Mistrzostwo to służba innym
    this.legacy.contributions.push({
      type: 'system edukacyjny',
      reach: 'globalny',
      sustainability: 'wieczny'
    });

    this.legacy.influence += 0.1; // Ciągły wzrost wpływu
  }

  reflectOnJourney() {
    return {
      beginning: 'początkujący umysł',
      middle: 'surowa praktyka',
      breakthrough: 'oświecenie',
      now: 'ciągła ewolucja',
      lesson: 'Geidō nigdy się nie kończy - to sposób życia'
    };
  }
}`,
      result: "✅ Mistrzostwo osiągnięte: 47 obszarów mądrości, 28 uczniów, 12 innowacji, wpływ globalny."
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
          <span>Filozofia Mistrzostwa</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>25 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Geidō - Droga do Mistrzostwa
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Odkryj filozofię Geidō - metody, dzięki której stajemy się mistrzami w każdej dziedzinie.
          To niekończąca się podróż ku doskonałości przez ciągłe uczenie się i praktykę.
        </p>
      </motion.div>

      <ProgressIndicator
        current={1}
        total={4}
        labels={["Wprowadzenie", "Zasady", "Zastosowanie", "Przypadki"]}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <Target className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Metoda Mistrzostwa
            </h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              Geidō to japońska koncepcja "drogi mistrza" - metody osiągania doskonałości przez całe życie.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <TrendingUp className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
              Ciągła Ewolucja
            </h3>
            <p className="text-orange-700 dark:text-orange-300 text-sm">
              Mistrzostwo nie jest celem, lecz niekończącą się podróżą rozwoju i doskonalenia.
            </p>
          </div>
        </div>

        <h2>Pochodzenie i Znaczenie Geidō</h2>
        <p>
          Geidō (芸道) to japońska filozofia mistrzostwa, która wywodzi się z tradycji rzemiosła i sztuk walki.
          Termin ten składa się z dwóch części: "gei" (芸), oznaczającego sztukę lub umiejętność, oraz "dō" (道),
          co oznacza drogę lub ścieżkę. Razem tworzą koncepcję "drogi mistrza" - metody, dzięki której
          stajemy się prawdziwymi ekspertami w wybranej dziedzinie.
        </p>

        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          "Geidō to niekończąca się podróż. Nie ma ostatecznego celu, tylko ciągła ewolucja.
          Mistrzostwo osiąga się nie przez dotarcie do końca drogi, lecz przez pokonanie jej w całości."
        </blockquote>

        <InteractiveDemo
          title="Podróż Geidō - Interaktywna Symulacja"
          steps={masteryJourneySteps}
        />

        <h2>Zasady Geidō w Codziennej Praktyce</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Shoshin (Początkujący Umysł)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Podejdź do każdej nauki z otwartością i ciekawością, jakbyś robił to po raz pierwszy.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Kugyo (Surowa Praktyka)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Poświęć czas na intensywne ćwiczenia i powtarzanie, ucząc się z błędów.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Satori (Oświecenie)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Doświadczaj momentów głębokiego zrozumienia, które zmieniają perspektywę.
            </p>
          </div>
        </div>

        <h2>Geidō w Programowaniu i Rozwoju AI</h2>
        <p>
          W świecie technologii Geidō znajduje szczególne zastosowanie. Programowanie i AI to dziedziny,
          które ewoluują niezwykle szybko, wymagając ciągłego uczenia się i adaptacji.
        </p>

        <CodeBlock
          code={`// Geidō w praktyce programistycznej
class SoftwareCraftsman {
  constructor() {
    this.skills = new Map();
    this.learningJourney = [];
    this.mentorship = {
      students: [],
      contributions: []
    };
  }

  // Shoshin - Podejdź do nowego frameworka z otwartym umysłem
  learnNewTechnology(technology) {
    console.log(\`Rozpoczynam naukę \${technology} z czystą kartą...\`);

    // Nie zakładaj, że wiesz - zadawaj pytania
    const questions = this.generateQuestions(technology);

    // Ucz się podstaw dokładnie
    const fundamentals = this.masterFundamentals(technology);

    // Dokumentuj podróż nauki
    this.learningJourney.push({
      technology,
      phase: 'shoshin',
      questions,
      fundamentals,
      insights: []
    });

    return \`Nauka \${technology} rozpoczęta z umysłem początkującego\`;
  }

  // Kugyo - Intesywna praktyka i refaktoryzacja
  practiceIntensively(project) {
    console.log(\`Rozpoczynam surową praktykę na projekcie: \${project.name}\`);

    let iterations = 0;
    let quality = 0;

    // Wielokrotne iteracje z poprawami
    while (quality < 0.9 && iterations < 10) {
      iterations++;

      // Napisz kod
      const code = this.writeCode(project);

      // Przetestuj
      const tests = this.runTests(code);

      // Refaktoryzuj na podstawie błędów
      const improvements = this.analyzeAndImprove(code, tests);

      // Oceń jakość
      quality = this.assessQuality(code, improvements);

      console.log(\`Iteracja \${iterations}: jakość \${(quality * 100).toFixed(1)}%\`);
    }

    return {
      iterations,
      finalQuality: quality,
      lessonsLearned: \`Poprawa poprzez \${iterations} iteracji\`
    };
  }

  // Satori - Głębokie zrozumienie wzorców
  experienceBreakthrough(pattern) {
    console.log(\`Doświadczam oświecenia w wzorcu: \${pattern}\`);

    // Nagłe zrozumienie połączeń
    const connections = this.discoverConnections(pattern);

    // Zastosowanie w nowych kontekstach
    const applications = this.applyInsight(pattern, connections);

    // Udostępnienie wiedzy
    this.shareWisdom(pattern, connections, applications);

    return {
      pattern,
      connections: connections.length,
      applications: applications.length,
      wisdomShared: true
    };
  }

  // Geidō - Ciągłe mistrzostwo
  embodyMastery() {
    // Ucz się nowych technologii
    this.continuousLearning();

    // Poprawiaj istniejący kod
    this.refactorLegacyCode();

    // Ucz innych
    this.mentorJuniorDevelopers();

    // Innowuj
    this.createNewSolutions();

    return {
      learning: 'aktywne',
      teaching: 'ciągłe',
      innovation: 'nieprzerwane',
      mastery: 'pogłębiające się'
    };
  }

  continuousLearning() {
    const technologies = ['WebAssembly', 'Quantum Computing', 'Neuromorphic AI'];
    technologies.forEach(tech => {
      if (Math.random() > 0.7) { // 30% szans na podjęcie nauki
        this.learnNewTechnology(tech);
      }
    });
  }

  refactorLegacyCode() {
    // Znajdź stary kod do poprawy
    const legacyProjects = this.findLegacyCode();

    legacyProjects.forEach(project => {
      console.log(\`Refaktoryzacja projektu: \${project.name}\`);
      this.practiceIntensively(project);
    });
  }

  mentorJuniorDevelopers() {
    // Podziel się wiedzą
    this.mentorship.students.push({
      name: 'nowy programista',
      skills: ['podstawy', 'algorytmy'],
      progress: 'rozwój'
    });

    // Twórz materiały edukacyjne
    this.mentorship.contributions.push({
      type: 'tutorial',
      topic: 'czysta architektura',
      impact: 'edukacyjny'
    });
  }

  createNewSolutions() {
    // Innowacje w kodzie
    const innovations = [
      'AI-assisted refactoring',
      'predictive debugging',
      'automated code reviews'
    ];

    innovations.forEach(innovation => {
      console.log(\`Tworzę innowację: \${innovation}\`);
      this.implementInnovation(innovation);
    });
  }

  // Metody pomocnicze
  generateQuestions(technology) {
    return [
      \`Jak \${technology} różni się od poprzednich rozwiązań?\`,
      \`Jakie są podstawowe zasady \${technology}?\`,
      \`Gdzie \${technology} sprawdza się najlepiej?\`
    ];
  }

  masterFundamentals(technology) {
    return {
      basics: ['składnia', 'koncepcje', 'narzędzia'],
      practice: 'projekty',
      documentation: 'czytanie i tworzenie'
    };
  }

  writeCode(project) { return { lines: 100, complexity: 'średnia' }; }
  runTests(code) { return { passed: 85, failed: 15 }; }
  analyzeAndImprove(code, tests) { return ['usunięcie duplikatów', 'poprawa nazw']; }
  assessQuality(code, improvements) { return Math.min(improvements.length / 10, 1); }
  discoverConnections(pattern) { return ['MVC', 'Observer', 'Strategy']; }
  applyInsight(pattern, connections) { return ['web apps', 'mobile apps', 'APIs']; }
  shareWisdom(pattern, connections, applications) { console.log('Wisdom shared!'); }
  findLegacyCode() { return [{ name: 'stary system', age: 5 }]; }
  implementInnovation(innovation) { return { status: 'implemented', impact: 'high' }; }
}

// Przykład użycia
const craftsman = new SoftwareCraftsman();

// Rozpocznij podróż Geidō
console.log('=== PODRÓŻ GEIDŌ ROZPOCZĘTA ===');

// Shoshin - nauka nowego frameworka
craftsman.learnNewTechnology('React 18');

// Kugyo - intensywna praktyka
const project = { name: 'AI Chat Interface', requirements: ['responsive', 'accessible'] };
const practiceResult = craftsman.practiceIntensively(project);
console.log('Praktyka zakończona:', practiceResult);

// Satori - oświecenie
const breakthrough = craftsman.experienceBreakthrough('Component Composition');
console.log('Oświecenie osiągnięte:', breakthrough);

// Geidō - ciągłe mistrzostwo
const mastery = craftsman.embodyMastery();
console.log('Mistrzostwo urzeczywistnione:', mastery);

console.log('=== GEIDŌ - DROGA TRWA DALEJ ===');`}
          language="javascript"
          title="Geidō w praktyce programistycznej - od początkującego do mistrza"
        />

        <h2>Inspirujące Przykłady Mistrzów Geidō</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Linus Torvalds</h3>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Twórca Linuxa, który poświęcił życie na rozwój otwartego oprogramowania.
            </p>
            <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
              <li>• 30+ lat ciągłego rozwoju</li>
              <li>• Mentoring tysięcy programistów</li>
              <li>• Innowacje w systemach operacyjnych</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-green-900 dark:text-green-100">Guido van Rossum</h3>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              Twórca Pythona, który ewoluował język przez dekady, zawsze słuchając społeczności.
            </p>
            <ul className="text-green-600 dark:text-green-400 text-sm space-y-1">
              <li>• Ewolucja Pythona przez 30 lat</li>
              <li>• Filozofia "jednego oczywistego sposobu"</li>
              <li>• Przekazywanie wiedzy następnym pokoleniom</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 my-8">
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Twoja Podróż Geidō</h3>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            Niezależnie od tego, czy jesteś początkującym programistą, doświadczonym developerem czy entuzjastą AI,
            Geidō oferuje ścieżkę do mistrzostwa w Twojej dziedzinie.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <strong>Rozpocznij</strong>
              <p className="text-yellow-600 dark:text-yellow-400">Zacznij od podstaw z otwartym umysłem</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔥</div>
              <strong>Praktykuj</strong>
              <p className="text-yellow-600 dark:text-yellow-400">Ćwicz intensywnie i ucz się z błędów</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✨</div>
              <strong>Ewoluj</strong>
              <p className="text-yellow-600 dark:text-yellow-400">Osiągaj oświecenie i dziel się wiedzą</p>
            </div>
          </div>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Geidō to nie tylko metoda osiągania mistrzostwa, ale sposób życia. W świecie technologii,
          gdzie wiedza staje się szybko przestarzała, Geidō oferuje timelessową ścieżkę rozwoju.
          Pamiętaj: mistrzostwo nie jest celem, lecz podróżą, która trwa całe życie.
        </p>

        <p>
          Niezależnie od tego, na jakim etapie swojej kariery się znajdujesz, Geidō pokazuje,
          że zawsze jest miejsce na rozwój, naukę i dzielenie się wiedzą z innymi.
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
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-colors text-center"
        >
          Odkryj Samouczki i Rozpocznij Swoją Podróż Geidō →
        </Link>
      </motion.div>
    </div>
  );
}