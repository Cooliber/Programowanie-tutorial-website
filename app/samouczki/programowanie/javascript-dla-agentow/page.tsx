"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Code, Zap, Database, Globe } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function JavaScriptDlaAgentowPage() {
  const demoSteps = [
    {
      title: "Asynchroniczne API Calls",
      description: "Agent wykonuje wywołania API w sposób asynchroniczny.",
      code: `// Agent pobiera dane pogodowe asynchronicznie
async function getWeatherData(city) {
  try {
    const response = await fetch(\`https://api.weather.com/\${city}\`);
    const data = await response.json();

    return {
      temperature: data.temp,
      condition: data.condition,
      city: city
    };
  } catch (error) {
    console.error('Błąd pobierania danych pogodowych:', error);
    return null;
  }
}

// Agent używa async/await
async function processWeatherRequest(city) {
  console.log(\`Sprawdzam pogodę dla \${city}...\`);

  const weather = await getWeatherData(city);

  if (weather) {
    console.log(\`W \${weather.city} jest \${weather.temperature}°C i \${weather.condition}\`);
  } else {
    console.log('Nie udało się pobrać danych pogodowych');
  }
}`,
      result: "✅ Agent asynchronicznie pobrał dane pogodowe dla Warszawy: 15°C, zachmurzenie."
    },
    {
      title: "Event-Driven Programming",
      description: "Agent reaguje na zdarzenia w czasie rzeczywistym.",
      code: `// Agent obsługuje zdarzenia w czasie rzeczywistym
class RealTimeAgent {
  constructor() {
    this.eventListeners = new Map();
    this.setupEventHandlers();
  }

  // Rejestracja obsługi zdarzeń
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  // Emitowanie zdarzeń
  emit(event, data) {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(callback => callback(data));
  }

  setupEventHandlers() {
    // Obsługa nowych zamówień
    this.on('newOrder', (order) => {
      console.log(\`Nowe zamówienie: \${order.id}\`);
      this.processOrder(order);
    });

    // Obsługa aktualizacji statusu
    this.on('orderStatusUpdate', (update) => {
      console.log(\`Status zamówienia \${update.orderId}: \${update.status}\`);
      this.notifyCustomer(update);
    });

    // Obsługa wiadomości klientów
    this.on('customerMessage', (message) => {
      console.log(\`Wiadomość od \${message.customer}: \${message.text}\`);
      this.generateResponse(message);
    });
  }

  // Symulacja zdarzeń
  simulateEvents() {
    setTimeout(() => {
      this.emit('newOrder', { id: 'ORD-001', customer: 'Jan Kowalski' });
    }, 1000);

    setTimeout(() => {
      this.emit('customerMessage', {
        customer: 'Anna Nowak',
        text: 'Kiedy będzie moje zamówienie?'
      });
    }, 2000);
  }
}

const agent = new RealTimeAgent();
agent.simulateEvents();`,
      result: "✅ Agent zarejestrował obsługę zdarzeń i reaguje na nowe zamówienia oraz wiadomości."
    },
    {
      title: "Modular Programming",
      description: "Agent używa modułów do organizacji kodu.",
      code: `// Moduł obsługi zamówień
const OrderModule = {
  validateOrder(order) {
    const errors = [];

    if (!order.customerId) errors.push('Brak ID klienta');
    if (!order.items || order.items.length === 0) errors.push('Brak produktów');
    if (order.total <= 0) errors.push('Nieprawidłowa wartość zamówienia');

    return {
      valid: errors.length === 0,
      errors
    };
  },

  calculateTotal(items) {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  },

  async saveOrder(order) {
    // Symulacja zapisu do bazy danych
    const orderId = 'ORD-' + Date.now();
    console.log(\`Zapisano zamówienie \${orderId}\`);

    return {
      id: orderId,
      ...order,
      status: 'confirmed',
      createdAt: new Date()
    };
  }
};

// Moduł obsługi klientów
const CustomerModule = {
  async findCustomer(customerId) {
    // Symulacja wyszukiwania klienta
    const customers = {
      'CUST-001': { id: 'CUST-001', name: 'Jan Kowalski', email: 'jan@example.com' },
      'CUST-002': { id: 'CUST-002', name: 'Anna Nowak', email: 'anna@example.com' }
    };

    return customers[customerId] || null;
  },

  async sendNotification(customer, message) {
    console.log(\`Wysyłanie powiadomienia do \${customer.email}: \${message}\`);
    return true;
  }
};

// Główny agent używający modułów
class OrderProcessingAgent {
  async processNewOrder(orderData) {
    // Walidacja zamówienia
    const validation = OrderModule.validateOrder(orderData);
    if (!validation.valid) {
      throw new Error(\`Błąd walidacji: \${validation.errors.join(', ')}\`);
    }

    // Znajdź klienta
    const customer = await CustomerModule.findCustomer(orderData.customerId);
    if (!customer) {
      throw new Error('Klient nie znaleziony');
    }

    // Oblicz wartość
    const total = OrderModule.calculateTotal(orderData.items);
    const orderWithTotal = { ...orderData, total };

    // Zapisz zamówienie
    const savedOrder = await OrderModule.saveOrder(orderWithTotal);

    // Powiadom klienta
    await CustomerModule.sendNotification(
      customer,
      \`Twoje zamówienie \${savedOrder.id} zostało potwierdzone. Wartość: \${total} PLN\`
    );

    return savedOrder;
  }
}

const agent = new OrderProcessingAgent();
agent.processNewOrder({
  customerId: 'CUST-001',
  items: [
    { name: 'Laptop', price: 3000, quantity: 1 },
    { name: 'Myszka', price: 100, quantity: 2 }
  ]
});`,
      result: "✅ Agent przetworzył zamówienie używając modularnego kodu: walidacja, zapis, powiadomienie."
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
            <span>16 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          JavaScript dla Agentów AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Opanuj JavaScript - język idealny do tworzenia agentów AI. Naucz się programowania
          asynchronicznego, obsługi zdarzeń i tworzenia modularnych aplikacji.
        </p>
      </motion.div>

      <ProgressIndicator
        current={2}
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
            <Zap className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Asynchroniczne Programowanie
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Obsługa operacji wejścia/wyjścia bez blokowania wykonania.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Code className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Event-Driven Architecture
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Reagowanie na zdarzenia w czasie rzeczywistym.
            </p>
          </div>
        </div>

        <h2>Dlaczego JavaScript dla Agentów AI?</h2>
        <p>
          JavaScript jest idealnym językiem do tworzenia agentów AI z kilku powodów:
        </p>

        <ul>
          <li><strong>Uniwersalność:</strong> Działa na serwerze (Node.js) i w przeglądarce</li>
          <li><strong>Asynchroniczność:</strong> Wbudowana obsługa operacji asynchronicznych</li>
          <li><strong>Bogaty ekosystem:</strong> Miliony bibliotek i narzędzi</li>
          <li><strong>JSON jako obywatel pierwszej klasy:</strong> Idealny do API</li>
          <li><strong>Event-driven:</strong> Doskonale nadaje się do reaktywnych aplikacji</li>
        </ul>

        <InteractiveDemo
          title="JavaScript w Praktyce dla Agentów"
          steps={demoSteps}
        />

        <h2>Asynchroniczne Programowanie z Promises i Async/Await</h2>

        <CodeBlock
          code={`// Agent obsługujący wiele API jednocześnie
class DataAggregationAgent {
  constructor() {
    this.sources = {
      weather: 'https://api.weather.com',
      news: 'https://api.news.com',
      stocks: 'https://api.stocks.com'
    };
  }

  // Pobieranie danych z wielu źródeł równocześnie
  async aggregateData(query) {
    console.log(\`Agregowanie danych dla zapytania: "\${query}"\`);

    try {
      // Wykonaj wszystkie żądania równocześnie
      const [weatherData, newsData, stocksData] = await Promise.all([
        this.fetchWeather(query),
        this.fetchNews(query),
        this.fetchStocks(query)
      ]);

      // Połącz wyniki
      return {
        query,
        timestamp: new Date(),
        data: {
          weather: weatherData,
          news: newsData,
          stocks: stocksData
        },
        summary: this.generateSummary(weatherData, newsData, stocksData)
      };

    } catch (error) {
      console.error('Błąd podczas agregacji danych:', error);

      // Fallback - spróbuj pobrać dane z cache lub alternatywnych źródeł
      return await this.fallbackAggregation(query);
    }
  }

  async fetchWeather(location) {
    // Symulacja wywołania API
    await this.delay(500); // Symulacja opóźnienia sieci
    return {
      location,
      temperature: Math.floor(Math.random() * 30) + 5,
      condition: ['słonecznie', 'zachmurzenie', 'deszcz'][Math.floor(Math.random() * 3)]
    };
  }

  async fetchNews(topic) {
    await this.delay(300);
    const mockNews = [
      \`Nowe trendy w \${topic}\`,
      \`Eksperci przewidują zmiany w \${topic}\`,
      \`Najnowsze wiadomości o \${topic}\`
    ];
    return mockNews.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  async fetchStocks(symbol) {
    await this.delay(400);
    return {
      symbol: symbol.toUpperCase(),
      price: Math.floor(Math.random() * 1000) + 100,
      change: (Math.random() - 0.5) * 10,
      volume: Math.floor(Math.random() * 1000000)
    };
  }

  generateSummary(weather, news, stocks) {
    return \`Warunki pogodowe: \${weather.temperature}°C, \${weather.condition}. \${news.length} wiadomości. Akcje \${stocks.symbol}: \${stocks.price} USD (\${stocks.change > 0 ? '+' : ''}\${stocks.change.toFixed(2)}).\`;
  }

  async fallbackAggregation(query) {
    // Prosta fallback strategia
    return {
      query,
      timestamp: new Date(),
      data: { error: 'Nie udało się pobrać pełnych danych' },
      summary: 'Dane niedostępne - spróbuj ponownie później'
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Przykład użycia
const agent = new DataAggregationAgent();

// Agent może obsługiwać wiele zapytań równocześnie
const queries = ['Warszawa', 'AI', 'AAPL'];

Promise.all(queries.map(query => agent.aggregateData(query)))
  .then(results => {
    results.forEach(result => {
      console.log(\`Wyniki dla "\${result.query}":\`);
      console.log(result.summary);
      console.log('---');
    });
  });`}
          language="javascript"
          title="Asynchroniczne programowanie w agentach AI"
        />

        <h2>Moduły i Organizacja Kodu</h2>

        <CodeBlock
          code={`// agent-core.js - Główna logika agenta
export class AgentCore {
  constructor(config) {
    this.config = config;
    this.modules = new Map();
    this.eventBus = new EventEmitter();
    this.initialize();
  }

  async initialize() {
    // Ładowanie modułów
    await this.loadModules();

    // Inicjalizacja modułów
    for (const [name, module] of this.modules) {
      if (module.initialize) {
        await module.initialize(this);
      }
    }

    // Rejestracja obsługi zdarzeń
    this.setupEventHandlers();

    console.log('Agent zainicjalizowany z modułami:', Array.from(this.modules.keys()));
  }

  async loadModules() {
    // Dynamiczne ładowanie modułów
    const moduleNames = ['communication', 'decision-making', 'data-processing'];

    for (const moduleName of moduleNames) {
      try {
        const module = await import(\`./modules/\${moduleName}.js\`);
        this.modules.set(moduleName, module.default || module);
      } catch (error) {
        console.error(\`Błąd ładowania modułu \${moduleName}:\`, error);
      }
    }
  }

  setupEventHandlers() {
    // Obsługa przychodzących wiadomości
    this.eventBus.on('message', async (message) => {
      const response = await this.processMessage(message);
      this.sendResponse(message.from, response);
    });

    // Obsługa decyzji
    this.eventBus.on('decision-made', (decision) => {
      console.log('Podjęto decyzję:', decision);
      this.executeDecision(decision);
    });
  }

  async processMessage(message) {
    // Użyj modułu przetwarzania danych
    const dataModule = this.modules.get('data-processing');
    const processedData = await dataModule.process(message.content);

    // Użyj modułu podejmowania decyzji
    const decisionModule = this.modules.get('decision-making');
    const decision = await decisionModule.decide(processedData);

    return decision.response;
  }

  sendResponse(recipient, response) {
    const commModule = this.modules.get('communication');
    commModule.send(recipient, response);
  }

  executeDecision(decision) {
    // Wykonaj akcje na podstawie decyzji
    if (decision.actions) {
      decision.actions.forEach(action => this.executeAction(action));
    }
  }

  executeAction(action) {
    console.log(\`Wykonywanie akcji: \${action.type}\`, action.params);
    // Implementacja wykonania akcji
  }
}

// modules/communication.js
export default class CommunicationModule {
  constructor() {
    this.channels = new Map();
  }

  async initialize(agent) {
    // Inicjalizacja kanałów komunikacji
    this.agent = agent;
    await this.setupChannels();
  }

  async setupChannels() {
    // Konfiguracja różnych kanałów (email, chat, API, etc.)
    this.channels.set('email', new EmailChannel());
    this.channels.set('chat', new ChatChannel());
    this.channels.set('api', new APIChannel());
  }

  async send(recipient, message) {
    // Wybierz odpowiedni kanał na podstawie typu odbiorcy
    const channel = this.selectChannel(recipient);
    if (channel) {
      await channel.send(recipient, message);
    }
  }

  selectChannel(recipient) {
    if (recipient.includes('@')) {
      return this.channels.get('email');
    } else if (recipient.startsWith('+')) {
      return this.channels.get('sms');
    } else {
      return this.channels.get('chat');
    }
  }
}

// modules/decision-making.js
export default class DecisionMakingModule {
  constructor() {
    this.rules = new Map();
  }

  async initialize(agent) {
    this.agent = agent;
    this.loadDecisionRules();
  }

  loadDecisionRules() {
    // Reguły decyzyjne
    this.rules.set('greeting', {
      patterns: ['cześć', 'witaj', 'hello', 'hi'],
      response: 'Cześć! Jak mogę Ci pomóc?',
      confidence: 0.9
    });

    this.rules.set('order_inquiry', {
      patterns: ['zamówienie', 'status', 'gdzie jest'],
      response: 'Sprawdzę status Twojego zamówienia.',
      action: 'check_order_status',
      confidence: 0.8
    });
  }

  async decide(processedData) {
    // Dopasuj dane do reguł
    for (const [ruleName, rule] of this.rules) {
      if (this.matchesRule(processedData, rule)) {
        return {
          rule: ruleName,
          response: rule.response,
          actions: rule.action ? [rule.action] : [],
          confidence: rule.confidence
        };
      }
    }

    // Fallback - nieznane zapytanie
    return {
      rule: 'unknown',
      response: 'Nie rozumiem Twojego zapytania. Czy możesz je inaczej sformułować?',
      actions: [],
      confidence: 0.1
    };
  }

  matchesRule(data, rule) {
    // Prosta logika dopasowania
    const text = data.text?.toLowerCase() || '';
    return rule.patterns.some(pattern => text.includes(pattern));
  }
}

// Użycie agenta
import { AgentCore } from './agent-core.js';

const agent = new AgentCore({
  name: 'CustomerServiceAgent',
  modules: ['communication', 'decision-making', 'data-processing']
});

// Agent jest gotowy do obsługi wiadomości
agent.eventBus.emit('message', {
  from: 'customer@example.com',
  content: 'Cześć, jaki jest status mojego zamówienia?'
});`}
          language="javascript"
          title="Modularna architektura agenta AI w JavaScript"
        />

        <h2>Obsługa Błędów i Debugowanie</h2>

        <CodeBlock
          code={`// Zaawansowana obsługa błędów w agentach AI
class ResilientAgent {
  constructor() {
    this.retryConfig = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      backoffFactor: 2
    };

    this.circuitBreaker = {
      failures: 0,
      lastFailureTime: null,
      threshold: 5,
      timeout: 60000, // 1 minuta
      state: 'closed' // closed, open, half-open
    };
  }

  async executeWithRetry(operation, context = {}) {
    let lastError;

    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        // Sprawdź circuit breaker
        if (this.isCircuitOpen()) {
          throw new Error('Circuit breaker is open - service unavailable');
        }

        const result = await operation();

        // Reset circuit breaker na sukces
        this.resetCircuitBreaker();

        return result;

      } catch (error) {
        lastError = error;
        console.warn(\`Próba \${attempt + 1} nieudana:\`, error.message);

        // Zaktualizuj circuit breaker
        this.recordFailure();

        // Sprawdź czy warto retry
        if (!this.shouldRetry(error, attempt)) {
          break;
        }

        // Czekaj przed następną próbą
        if (attempt < this.retryConfig.maxRetries) {
          const delay = this.calculateDelay(attempt);
          await this.delay(delay);
        }
      }
    }

    // Wszystkie próby nieudane
    throw new Error(\`Operacja nieudana po \${this.retryConfig.maxRetries + 1} próbach. Ostatni błąd: \${lastError.message}\`);
  }

  isCircuitOpen() {
    if (this.circuitBreaker.state === 'open') {
      // Sprawdź czy timeout minął
      if (Date.now() - this.circuitBreaker.lastFailureTime > this.circuitBreaker.timeout) {
        this.circuitBreaker.state = 'half-open';
        return false;
      }
      return true;
    }
    return false;
  }

  recordFailure() {
    this.circuitBreaker.failures++;
    this.circuitBreaker.lastFailureTime = Date.now();

    if (this.circuitBreaker.failures >= this.circuitBreaker.threshold) {
      this.circuitBreaker.state = 'open';
      console.warn('Circuit breaker opened due to too many failures');
    }
  }

  resetCircuitBreaker() {
    this.circuitBreaker.failures = 0;
    this.circuitBreaker.state = 'closed';
  }

  shouldRetry(error, attempt) {
    // Nie retry dla błędów klienta (4xx)
    if (error.statusCode >= 400 && error.statusCode < 500) {
      return false;
    }

    // Nie retry dla błędów autoryzacji
    if (error.message.includes('Unauthorized') || error.message.includes('Forbidden')) {
      return false;
    }

    // Retry dla błędów serwera (5xx) i problemów sieci
    return attempt < this.retryConfig.maxRetries;
  }

  calculateDelay(attempt) {
    // Exponential backoff z jitter
    const exponentialDelay = this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffFactor, attempt);
    const jitter = Math.random() * 0.1 * exponentialDelay; // 10% jitter
    const delay = Math.min(exponentialDelay + jitter, this.retryConfig.maxDelay);

    return delay;
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Metoda do bezpiecznego wykonywania operacji API
  async safeApiCall(apiFunction, context = {}) {
    return this.executeWithRetry(async () => {
      const startTime = Date.now();

      try {
        const result = await apiFunction();

        // Log sukcesu
        const duration = Date.now() - startTime;
        console.log(\`API call successful in \${duration}ms\`, context);

        return result;

      } catch (error) {
        // Log błędu z kontekstem
        const duration = Date.now() - startTime;
        console.error(\`API call failed after \${duration}ms:\`, error.message, context);

        throw error;
      }
    }, context);
  }
}

// Agent z obsługą błędów
class FaultTolerantAgent extends ResilientAgent {
  async processUserRequest(request) {
    try {
      // Walidacja wejścia
      this.validateRequest(request);

      // Bezpieczne wywołanie API
      const apiResult = await this.safeApiCall(
        () => this.callExternalAPI(request),
        { requestId: request.id, userId: request.userId }
      );

      // Przetwórz wynik
      const processedResult = await this.processApiResult(apiResult);

      return {
        success: true,
        data: processedResult
      };

    } catch (error) {
      // Klasyfikuj błąd
      const errorType = this.classifyError(error);

      // Loguj błąd z kontekstem
      console.error('Request processing failed:', {
        error: error.message,
        type: errorType,
        requestId: request.id,
        userId: request.userId,
        stack: error.stack
      });

      // Zwróć odpowiednią odpowiedź błędu
      return {
        success: false,
        error: {
          type: errorType,
          message: this.getUserFriendlyMessage(errorType),
          retryable: this.isRetryableError(error)
        }
      };
    }
  }

  validateRequest(request) {
    if (!request || typeof request !== 'object') {
      throw new Error('Invalid request format');
    }

    if (!request.id || !request.userId) {
      throw new Error('Missing required fields: id, userId');
    }

    if (!request.content || request.content.trim().length === 0) {
      throw new Error('Request content cannot be empty');
    }
  }

  async callExternalAPI(request) {
    // Symulacja wywołania zewnętrznego API
    if (Math.random() < 0.3) { // 30% szans na błąd
      throw new Error('External API temporarily unavailable');
    }

    await this.delay(500); // Symulacja opóźnienia

    return {
      id: request.id,
      result: \`Processed: \${request.content}\`,
      timestamp: new Date()
    };
  }

  async processApiResult(apiResult) {
    // Dodatkowe przetwarzanie wyniku
    return {
      ...apiResult,
      processedAt: new Date(),
      confidence: Math.random()
    };
  }

  classifyError(error) {
    if (error.message.includes('Invalid request')) {
      return 'validation_error';
    } else if (error.message.includes('API temporarily unavailable')) {
      return 'service_unavailable';
    } else if (error.message.includes('timeout')) {
      return 'timeout_error';
    } else {
      return 'unknown_error';
    }
  }

  getUserFriendlyMessage(errorType) {
    const messages = {
      validation_error: 'Wprowadzono nieprawidłowe dane. Sprawdź swoje żądanie.',
      service_unavailable: 'Usługa jest tymczasowo niedostępna. Spróbuj ponownie za chwilę.',
      timeout_error: 'Żądanie przekroczyło limit czasu. Spróbuj ponownie.',
      unknown_error: 'Wystąpił nieoczekiwany błąd. Skontaktuj się z obsługą.'
    };

    return messages[errorType] || messages.unknown_error;
  }

  isRetryableError(error) {
    const retryableTypes = ['service_unavailable', 'timeout_error'];
    const errorType = this.classifyError(error);
    return retryableTypes.includes(errorType);
  }
}

// Przykład użycia odpornego agenta
const agent = new FaultTolerantAgent();

// Testuj z różnymi scenariuszami
const testRequests = [
  { id: 'req1', userId: 'user1', content: 'Przetwórz to żądanie' },
  { id: 'req2', userId: 'user2', content: '' }, // Błąd walidacji
  { id: 'req3', userId: 'user3', content: 'Inne żądanie' } // Może się nie udać
];

testRequests.forEach(async (request) => {
  const result = await agent.processUserRequest(request);
  console.log(\`Wynik dla \${request.id}:\`, result);
});`}
          language="javascript"
          title="Zaawansowana obsługa błędów i odporność na awarie w agentach AI"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Koncepcje JavaScript dla Agentów</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Promises i async/await:</strong> Dla obsługi operacji asynchronicznych</li>
            <li>• <strong>EventEmitter:</strong> Do tworzenia reaktywnych, event-driven agentów</li>
            <li>• <strong>Moduły ES6:</strong> Do organizacji kodu w małe, wielokrotnego użytku komponenty</li>
            <li>• <strong>Try/catch:</strong> Do obsługi błędów i tworzenia odpornych aplikacji</li>
            <li>• <strong>Map/Set:</strong> Efektywne struktury danych dla zarządzania stanem</li>
            <li>• <strong>Arrow functions:</strong> Dla zwięzłego kodu i prawidłowego this binding</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          JavaScript oferuje doskonałe narzędzia do tworzenia agentów AI: asynchroniczne programowanie,
          event-driven architektura, modularność i bogaty ekosystem. Te cechy czynią go idealnym
          wyborem dla tworzenia inteligentnych, responsywnych agentów.
        </p>

        <p>
          W następnym tutorialu poznasz Python - inny kluczowy język dla AI, który oferuje
          specjalistyczne biblioteki do uczenia maszynowego i analizy danych.
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
          href="/samouczki/programowanie/podstawy-programowania"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Poprzedni Tutorial: Podstawy Programowania
        </Link>
        <Link
          href="/samouczki/programowanie/python-dla-ai"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Python dla AI →
        </Link>
      </motion.div>
    </div>
  );
}