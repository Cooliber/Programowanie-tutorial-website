"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Shield, Database, Activity, Lock } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function ZaawansowaneFunkcjePage() {
  const demoSteps = [
    {
      title: "Zarządzanie zasobami",
      description: "Zobacz, jak serwer MCP zarządza zasobami i ich cyklami życia.",
      code: `// Rejestracja zasobu w serwerze MCP
{
  "jsonrpc": "2.0",
  "method": "resources/register",
  "params": {
    "resources": [
      {
        "uri": "file:///data/customers.db",
        "name": "Baza danych klientów",
        "description": "SQLite baza danych z informacjami o klientach",
        "mimeType": "application/x-sqlite3"
      }
    ]
  }
}

// Klient żąda dostępu do zasobu
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "resources/read",
  "params": {
    "uri": "file:///data/customers.db"
  }
}`,
      result: "✅ Zasób został zarejestrowany. Klient może teraz bezpiecznie uzyskać dostęp do bazy danych."
    },
    {
      title: "Autoryzacja i uwierzytelnianie",
      description: "Implementacja mechanizmów bezpieczeństwa dla dostępu do narzędzi.",
      code: `// Serwer sprawdza uprawnienia przed wykonaniem narzędzia
async function authorizeToolCall(agentId, toolName, args) {
  // Sprawdź czy agent ma uprawnienia do narzędzia
  const permissions = await getAgentPermissions(agentId);

  if (!permissions.includes(toolName)) {
    throw new Error(\`Agent \${agentId} nie ma uprawnień do \${toolName}\`);
  }

  // Sprawdź parametry wywołania
  if (toolName === 'delete_customer' && !permissions.includes('admin')) {
    throw new Error('Tylko administratorzy mogą usuwać klientów');
  }

  // Loguj operację dla audytu
  await logOperation(agentId, toolName, args);

  return true;
}`,
      result: "✅ Autoryzacja zakończona pomyślnie. Operacja została zalogowana."
    },
    {
      title: "Monitorowanie wydajności",
      description: "Śledzenie metryk wydajności i dostępności serwera MCP.",
      code: `// Metryki wydajności serwera
const metrics = {
  requestsTotal: 1250,
  requestsPerSecond: 12.5,
  averageResponseTime: 245, // ms
  errorRate: 0.02, // 2%
  activeConnections: 8,
  memoryUsage: '45MB',
  uptime: '99.9%'
};

// Alerty i automatyczne skalowanie
if (metrics.requestsPerSecond > 50) {
  console.warn('Wysokie obciążenie - rozważ skalowanie');
  await scaleServer('up');
}

if (metrics.errorRate > 0.05) {
  console.error('Wysoki współczynnik błędów - sprawdź serwery');
  await triggerAlert('high_error_rate');
}`,
      result: "✅ Metryki zebrane. Wydajność serwera jest optymalna."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/samouczki/narzedzia-mcp"
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
          <span>Narzędzia MCP</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>16 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Zaawansowane Funkcje MCP
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Poznaj zaawansowane możliwości protokołu MCP: zarządzanie zasobami, bezpieczeństwo,
          autoryzacja, monitorowanie i optymalizacja wydajności.
        </p>
      </motion.div>

      <ProgressIndicator
        current={4}
        total={5}
        labels={["Wprowadzenie", "Serwer MCP", "Integracja", "Zaawansowane", "Praktyka"]}
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
            <Shield className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Zaawansowane Bezpieczeństwo
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Autoryzacja, uwierzytelnianie i kontrola dostępu na poziomie narzędzi.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Activity className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Monitorowanie i Obserwowalność
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Metryki wydajności, logowanie i alerty dla systemów MCP.
            </p>
          </div>
        </div>

        <h2>Zarządzanie Zasobami</h2>
        <p>
          Zaawansowane serwery MCP mogą zarządzać zasobami - plikami, bazami danych,
          połączeniami sieciowymi itp. Zasoby mają URI i mogą być udostępniane klientom
          w bezpieczny sposób.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Typy zasobów MCP:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">📁 Pliki i katalogi</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Dostęp do plików systemowych</li>
                <li>• Operacje na katalogach</li>
                <li>• Zarządzanie uprawnieniami</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">🗄️ Bazy danych</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Połączenia do baz danych</li>
                <li>• Zarządzanie transakcjami</li>
                <li>• Optymalizacja zapytań</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">🌐 Usługi sieciowe</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• API endpoints</li>
                <li>• Webhooks</li>
                <li>• Mikrousługi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">⚙️ Urządzenia</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Sprzęt IoT</li>
                <li>• Urządzenia peryferyjne</li>
                <li>• Sensory i aktuary</li>
              </ul>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Zaawansowane Funkcje MCP"
          steps={demoSteps}
        />

        <h2>Bezpieczeństwo i Autoryzacja</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
          <h3 className="text-red-800 dark:text-red-200 font-medium mb-2 flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Bezpieczeństwo w Systemach MCP
          </h3>
          <p className="text-red-700 dark:text-red-300">
            Bezpieczeństwo jest krytyczne w systemach MCP. Wszystkie serwery powinny implementować
            wielopoziomową ochronę: uwierzytelnianie, autoryzację, szyfrowanie i audyt.
          </p>
        </div>

        <CodeBlock
          code={`// Zaawansowany serwer MCP z bezpieczeństwem
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class SecureMCPServer extends Server {
  constructor(config) {
    super(config);
    this.authTokens = new Map();
    this.permissions = config.permissions || {};
    this.rateLimits = new Map();
    this.auditLog = [];
  }

  // Uwierzytelnianie agentów
  async authenticate(agentCredentials) {
    const { agentId, secret } = agentCredentials;

    // Sprawdź credentials w bazie danych
    const agent = await this.getAgentById(agentId);
    if (!agent) {
      throw new Error('Nieznany agent');
    }

    // Weryfikuj sekret/hasło
    const isValidSecret = await bcrypt.compare(secret, agent.hashedSecret);
    if (!isValidSecret) {
      throw new Error('Nieprawidłowe credentials');
    }

    // Generuj JWT token
    const token = jwt.sign(
      { agentId, permissions: agent.permissions },
      this.config.jwtSecret,
      { expiresIn: '1h' }
    );

    this.authTokens.set(agentId, {
      token,
      expiresAt: Date.now() + 3600000 // 1 godzina
    });

    return { token, permissions: agent.permissions };
  }

  // Autoryzacja dostępu do narzędzi
  async authorizeRequest(agentId, method, params) {
    // Sprawdź rate limiting
    if (this.isRateLimited(agentId)) {
      throw new Error('Przekroczono limit zapytań');
    }

    // Sprawdź token JWT
    const auth = this.authTokens.get(agentId);
    if (!auth || auth.expiresAt < Date.now()) {
      throw new Error('Token wygasł lub nie istnieje');
    }

    // Dekoduj token i sprawdź uprawnienia
    try {
      const decoded = jwt.verify(auth.token, this.config.jwtSecret);

      if (method === 'tools/call') {
        const toolName = params.name;
        if (!decoded.permissions.includes(toolName) &&
            !decoded.permissions.includes('*')) {
          throw new Error(\`Brak uprawnień do narzędzia: \${toolName}\`);
        }
      }

      // Loguj operację
      this.auditLog.push({
        timestamp: new Date(),
        agentId,
        method,
        params: this.sanitizeParams(params)
      });

    } catch (error) {
      throw new Error(\`Błąd autoryzacji: \${error.message}\`);
    }
  }

  // Rate limiting
  isRateLimited(agentId) {
    const now = Date.now();
    const windowMs = 60000; // 1 minuta
    const maxRequests = 100; // 100 zapytań na minutę

    if (!this.rateLimits.has(agentId)) {
      this.rateLimits.set(agentId, []);
    }

    const requests = this.rateLimits.get(agentId);

    // Usuń stare żądania poza oknem
    const validRequests = requests.filter(time => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return true;
    }

    validRequests.push(now);
    this.rateLimits.set(agentId, validRequests);
    return false;
  }

  // Szyfrowanie wrażliwych danych w logach
  sanitizeParams(params) {
    const sanitized = { ...params };

    // Lista pól do usunięcia/zamaskowania
    const sensitiveFields = ['password', 'secret', 'apiKey', 'token'];

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  // Pobierz logi audytu
  getAuditLog(hours = 24) {
    const cutoff = Date.now() - (hours * 3600000);
    return this.auditLog.filter(entry => entry.timestamp > cutoff);
  }
}`}
          language="javascript"
          title="Zaawansowany serwer MCP z kompleksowym bezpieczeństwem"
        />

        <h2>Monitorowanie i Obserwowalność</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-semibold text-lg">📊</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Metryki</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Czas odpowiedzi, współczynnik błędów, wykorzystanie zasobów
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-semibold text-lg">📝</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Logowanie</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Szczegółowe logi operacji, błędów i zdarzeń bezpieczeństwa
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-semibold text-lg">🚨</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Alerty</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatyczne powiadomienia o problemach i anomaliiach
            </p>
          </div>
        </div>

        <CodeBlock
          code={`// System monitorowania dla serwera MCP
const promClient = require('prom-client');
const { collectDefaultMetrics } = promClient;

class MonitoredMCPServer extends SecureMCPServer {
  constructor(config) {
    super(config);

    // Inicjalizuj metryki Prometheus
    this.initMetrics();

    // Zbieraj domyślne metryki systemowe
    collectDefaultMetrics({ prefix: 'mcp_' });

    // Własne metryki
    this.requestCount = new promClient.Counter({
      name: 'mcp_requests_total',
      help: 'Łączna liczba żądań',
      labelNames: ['method', 'agent']
    });

    this.requestDuration = new promClient.Histogram({
      name: 'mcp_request_duration_seconds',
      help: 'Czas trwania żądań',
      labelNames: ['method'],
      buckets: [0.1, 0.5, 1, 2, 5, 10]
    });

    this.activeConnections = new promClient.Gauge({
      name: 'mcp_active_connections',
      help: 'Liczba aktywnych połączeń'
    });

    this.errorCount = new promClient.Counter({
      name: 'mcp_errors_total',
      help: 'Łączna liczba błędów',
      labelNames: ['type', 'agent']
    });
  }

  async handleRequest(request) {
    const startTime = Date.now();
    const agentId = this.getAgentFromRequest(request);

    try {
      // Inkrementuj licznik żądań
      this.requestCount.inc({
        method: request.method,
        agent: agentId || 'unknown'
      });

      // Zwiększ liczbę aktywnych połączeń
      this.activeConnections.inc();

      // Wykonaj żądanie
      const result = await super.handleRequest(request);

      // Zmierz czas wykonania
      const duration = (Date.now() - startTime) / 1000;
      this.requestDuration
        .labels(request.method)
        .observe(duration);

      return result;

    } catch (error) {
      // Zlicz błąd
      this.errorCount.inc({
        type: error.name || 'UnknownError',
        agent: agentId || 'unknown'
      });

      throw error;

    } finally {
      // Zmniejsz liczbę aktywnych połączeń
      this.activeConnections.dec();
    }
  }

  // Endpoint metryk dla Prometheus
  getMetrics() {
    return promClient.register.metrics();
  }

  // Health check endpoint
  async healthCheck() {
    const metrics = {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    };

    // Sprawdź krytyczne zależności
    try {
      await this.checkDatabaseConnection();
      await this.checkExternalServices();
    } catch (error) {
      metrics.status = 'unhealthy';
      metrics.error = error.message;
    }

    return metrics;
  }

  // Alerting - sprawdź warunki alarmowe
  checkAlerts() {
    const alerts = [];

    // Sprawdź współczynnik błędów
    const errorRate = this.getErrorRateLastHour();
    if (errorRate > 0.05) { // 5%
      alerts.push({
        severity: 'warning',
        message: \`Wysoki współczynnik błędów: \${(errorRate * 100).toFixed(2)}%\`
      });
    }

    // Sprawdź wykorzystanie pamięci
    const memUsage = process.memoryUsage();
    const memPercent = memUsage.heapUsed / memUsage.heapTotal;
    if (memPercent > 0.9) { // 90%
      alerts.push({
        severity: 'critical',
        message: \`Wysokie wykorzystanie pamięci: \${(memPercent * 100).toFixed(2)}%\`
      });
    }

    return alerts;
  }
}

// Express server dla metryk i health check
const express = require('express');
const app = express();

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(server.getMetrics());
});

app.get('/health', async (req, res) => {
  const health = await server.healthCheck();
  res.json(health);
});

app.listen(9090, () => {
  console.log('Monitoring server listening on port 9090');
});`}
          language="javascript"
          title="System monitorowania i obserwowalności dla serwera MCP"
        />

        <h2>Optymalizacja Wydajności</h2>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">⚡</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Cache'owanie</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                Buforuj wyniki kosztownych operacji i często używane dane
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">🔄</span>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">Pool połączeń</h4>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Zarządzaj pulami połączeń do baz danych i usług zewnętrznych
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">📈</span>
            </div>
            <div>
              <h4 className="font-medium text-purple-900 dark:text-purple-100">Skalowanie</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                Automatyczne skalowanie serwerów w zależności od obciążenia
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Optymalizacja wydajności serwera MCP
const Redis = require('ioredis');
const genericPool = require('generic-pool');

class OptimizedMCPServer extends MonitoredMCPServer {
  constructor(config) {
    super(config);

    // Inicjalizuj Redis dla cache
    this.redis = new Redis(config.redisUrl);

    // Pool połączeń do bazy danych
    this.dbPool = this.createDatabasePool(config.databaseUrl);

    // Cache dla wyników narzędzi
    this.toolCache = new Map();

    // Strategie cache'owania dla różnych narzędzi
    this.cacheStrategies = {
      'get_weather': { ttl: 300 }, // 5 minut
      'query_customers': { ttl: 60 }, // 1 minuta
      'get_customer_details': { ttl: 600 }, // 10 minut
      'calculate_stats': { ttl: 3600 } // 1 godzina
    };
  }

  createDatabasePool(databaseUrl) {
    const factory = {
      create: async () => {
        const client = new pg.Client(databaseUrl);
        await client.connect();
        return client;
      },
      destroy: async (client) => {
        await client.end();
      }
    };

    return genericPool.createPool(factory, {
      max: 10, // Maksymalnie 10 połączeń
      min: 2,  // Minimalnie 2 połączenia
      acquireTimeoutMillis: 60000,
      destroyTimeoutMillis: 30000,
      idleTimeoutMillis: 300000,
      reapIntervalMillis: 1000,
      testOnBorrow: true
    });
  }

  async callTool(toolName, args) {
    const cacheKey = this.generateCacheKey(toolName, args);
    const strategy = this.cacheStrategies[toolName];

    // Sprawdź cache jeśli strategia istnieje
    if (strategy) {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        console.log(\`Cache hit for \${toolName}\`);
        return JSON.parse(cached);
      }
    }

    // Wykonaj narzędzie
    const result = await super.callTool(toolName, args);

    // Zapisz w cache jeśli strategia istnieje
    if (strategy) {
      await this.redis.setex(cacheKey, strategy.ttl, JSON.stringify(result));
    }

    return result;
  }

  generateCacheKey(toolName, args) {
    // Utwórz deterministyczny klucz cache
    const sortedArgs = Object.keys(args)
      .sort()
      .reduce((result, key) => {
        result[key] = args[key];
        return result;
      }, {});

    return \`mcp:\${toolName}:\${JSON.stringify(sortedArgs)}\`;
  }

  async executeQuery(query, params = []) {
    const client = await this.dbPool.acquire();

    try {
      const result = await client.query(query, params);
      return result;
    } finally {
      // Zwróć połączenie do pool
      this.dbPool.release(client);
    }
  }

  // Automatyczne skalowanie na podstawie obciążenia
  async checkScaling() {
    const metrics = await this.getCurrentMetrics();

    if (metrics.requestsPerSecond > 100) {
      console.log('Wysokie obciążenie - skalowanie w górę');
      await this.scaleUp();
    } else if (metrics.requestsPerSecond < 20) {
      console.log('Niskie obciążenie - skalowanie w dół');
      await this.scaleDown();
    }
  }

  async scaleUp() {
    // Zwiększ liczbę instancji serwera
    // W środowisku Kubernetes to może być zmiana liczby replik
    console.log('Skalowanie serwera w górę...');
  }

  async scaleDown() {
    // Zmniejsz liczbę instancji serwera
    console.log('Skalowanie serwera w dół...');
  }

  async cleanup() {
    await this.redis.quit();
    await this.dbPool.drain();
    await this.dbPool.clear();
  }
}`}
          language="javascript"
          title="Optymalizacja wydajności serwera MCP z cache'owaniem i pool połączeń"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Zaawansowane Wskazówki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Segmentacja bezpieczeństwa:</strong> Implementuj defense in depth z wieloma warstwami ochrony</li>
            <li>• <strong>Obserwowalność:</strong> Używaj rozproszonego śledzenia dla złożonych operacji</li>
            <li>• <strong>Optymalizacja kosztów:</strong> Monitoruj koszty infrastruktury i optymalizuj alokację zasobów</li>
            <li>• <strong>Disaster recovery:</strong> Planuj na wypadek awarii z automatycznym failover</li>
            <li>• <strong>Compliance:</strong> Zapewnij zgodność z regulacjami (GDPR, HIPAA, etc.)</li>
            <li>• <strong>Ciągła optymalizacja:</strong> Regularnie analizuj metryki i optymalizuj wydajność</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Zaawansowane funkcje MCP obejmują kompleksowe bezpieczeństwo, monitorowanie,
          optymalizację wydajności i zarządzanie zasobami. Te możliwości czynią MCP
          gotowym do zastosowań produkcyjnych w złożonych systemach korporacyjnych.
        </p>

        <p>
          W ostatnim tutorialu tej serii zobaczysz praktyczne przykłady implementacji
          agentów MCP w rzeczywistych scenariuszach biznesowych.
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
          href="/samouczki/narzedzia-mcp/integracja-z-agentami"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Poprzedni Tutorial: Integracja z Agentami
        </Link>
        <Link
          href="/samouczki/narzedzia-mcp/praktyczne-tutoriale"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Praktyczne Tutoriale →
        </Link>
      </motion.div>
    </div>
  );
}