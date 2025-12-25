"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Settings, Code, Database, Globe } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function BudowanieSerweraMcpPage() {
  const demoSteps = [
    {
      title: "Inicjalizacja projektu",
      description: "Utwórz nowy projekt Node.js dla serwera MCP.",
      code: `mkdir weather-mcp-server
cd weather-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod`,
      result: "✅ Projekt został zainicjalizowany. Zainstalowano wymagane zależności MCP SDK i Zod do walidacji."
    },
    {
      title: "Konfiguracja serwera",
      description: "Skonfiguruj podstawowy serwer MCP z obsługą narzędzi.",
      code: `// server.js
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/stdio');

class WeatherServer extends Server {
  constructor() {
    super({
      name: 'weather-server',
      version: '1.0.0'
    });

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // Lista dostępnych narzędzi
    this.setRequestHandler('tools/list', async () => {
      return {
        tools: [{
          name: 'get_weather',
          description: 'Pobiera aktualne warunki pogodowe',
          inputSchema: {
            type: 'object',
            properties: {
              location: { type: 'string', description: 'Miasto lub kod pocztowy' }
            },
            required: ['location']
          }
        }]
      };
    });

    // Obsługa wywołań narzędzi
    this.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      if (name === 'get_weather') {
        return await this.getWeatherData(args.location);
      }

      throw new Error(\`Unknown tool: \${name}\`);
    });
  }

  async getWeatherData(location) {
    // Symulacja wywołania API pogodowego
    const mockData = {
      warszawa: { temp: 15, condition: 'zachmurzenie', humidity: 65 },
      krakow: { temp: 18, condition: 'słonecznie', humidity: 45 },
      gdansk: { temp: 12, condition: 'deszcz', humidity: 80 }
    };

    const data = mockData[location.toLowerCase()] || mockData['warszawa'];

    return {
      location: location,
      temperature: data.temp,
      condition: data.condition,
      humidity: data.humidity,
      timestamp: new Date().toISOString()
    };
  }
}

const server = new WeatherServer();
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);`,
      result: "✅ Serwer MCP został skonfigurowany z narzędziem get_weather."
    },
    {
      title: "Testowanie serwera",
      description: "Przetestuj serwer MCP używając narzędzia do debugowania.",
      code: `node server.js`,
      result: "✅ Serwer uruchomiony pomyślnie. Oczekuje na połączenia klientów MCP."
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
            <span>18 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Budowanie Serwera MCP
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się tworzyć własne serwery MCP - od konfiguracji środowiska po implementację
          narzędzi i bezpieczne wdrażanie usług.
        </p>
      </motion.div>

      <ProgressIndicator
        current={2}
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
            <Settings className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Konfiguracja Środowiska
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Przygotuj środowisko programistyczne do tworzenia serwerów MCP.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Code className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Implementacja Narzędzi
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Twórz funkcjonalne narzędzia, które agenci AI mogą wywoływać.
            </p>
          </div>
        </div>

        <h2>Wymagania wstępne</h2>
        <p>
          Przed rozpoczęciem budowy serwera MCP, upewnij się, że masz zainstalowane odpowiednie narzędzia:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Wymagane narzędzia:</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Node.js:</strong> wersja 16 lub nowsza</li>
            <li><strong>npm:</strong> menedżer pakietów Node.js</li>
            <li><strong>MCP SDK:</strong> oficjalne SDK dla protokołu MCP</li>
            <li><strong>TypeScript:</strong> opcjonalnie, dla lepszego typowania</li>
          </ul>
        </div>

        <h2>Struktura Serwera MCP</h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6">
          <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-4 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Kluczowe Komponenty
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Klasa Server</h4>
              <p className="text-blue-700 dark:text-blue-300">
                Główna klasa serwera MCP, obsługuje komunikację i rejestrację narzędzi
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Transport Layer</h4>
              <p className="text-blue-700 dark:text-blue-300">
                Obsługuje komunikację między klientem a serwerem (stdio, HTTP, WebSocket)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Tool Handlers</h4>
              <p className="text-blue-700 dark:text-blue-300">
                Funkcje obsługujące wywołania narzędzi przez klientów
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Validation</h4>
              <p className="text-blue-700 dark:text-blue-300">
                Walidacja parametrów wejściowych i struktur danych
              </p>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Krok po Kroku: Budowa Serwera MCP"
          steps={demoSteps}
        />

        <h2>Implementacja Narzędzi</h2>
        <p>
          Narzędzia MCP to funkcje, które klienci mogą wywoływać. Każde narzędzie musi mieć:
        </p>

        <ul>
          <li><strong>Nazwę:</strong> unikalny identyfikator narzędzia</li>
          <li><strong>Opis:</strong> dokumentacja wyjaśniająca przeznaczenie</li>
          <li><strong>Schemat wejścia:</strong> definicja oczekiwanych parametrów</li>
          <li><strong>Implementację:</strong> kod wykonujący zadanie</li>
        </ul>

        <CodeBlock
          code={`// Przykład narzędzia do wyszukiwania w bazie danych
class DatabaseServer extends Server {
  constructor(dbConnection) {
    super({
      name: 'database-server',
      version: '1.0.0'
    });
    this.db = dbConnection;
    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'query_customers',
            description: 'Wyszukuje klientów w bazie danych',
            inputSchema: {
              type: 'object',
              properties: {
                searchTerm: {
                  type: 'string',
                  description: 'Fraza wyszukiwania'
                },
                limit: {
                  type: 'number',
                  description: 'Maksymalna liczba wyników',
                  default: 10,
                  minimum: 1,
                  maximum: 100
                }
              },
              required: ['searchTerm']
            }
          },
          {
            name: 'get_customer_details',
            description: 'Pobiera szczegółowe informacje o kliencie',
            inputSchema: {
              type: 'object',
              properties: {
                customerId: {
                  type: 'string',
                  description: 'ID klienta'
                }
              },
              required: ['customerId']
            }
          }
        ]
      };
    });

    this.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'query_customers':
          return await this.queryCustomers(args);
        case 'get_customer_details':
          return await this.getCustomerDetails(args);
        default:
          throw new Error(\`Unknown tool: \${name}\`);
      }
    });
  }

  async queryCustomers({ searchTerm, limit = 10 }) {
    const query = \`
      SELECT id, name, email, phone
      FROM customers
      WHERE name ILIKE $1 OR email ILIKE $1
      LIMIT $2
    \`;

    const result = await this.db.query(query, [\`%\${searchTerm}%\`, limit]);
    return {
      customers: result.rows,
      count: result.rows.length
    };
  }

  async getCustomerDetails({ customerId }) {
    const query = \`
      SELECT c.*, COUNT(o.id) as order_count
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      WHERE c.id = $1
      GROUP BY c.id
    \`;

    const result = await this.db.query(query, [customerId]);

    if (result.rows.length === 0) {
      throw new Error('Customer not found');
    }

    return result.rows[0];
  }
}`}
          language="javascript"
          title="Serwer MCP z narzędziami do obsługi bazy danych klientów"
        />

        <h2>Obsługa Błędów i Walidacja</h2>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Brak walidacji</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                Bez sprawdzania parametrów wejściowych serwer jest podatny na błędy
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">Kompleksowa walidacja</h4>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Sprawdzaj typy danych, zakresy wartości i wymagane parametry
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Przykład walidacji z użyciem Zod
const { z } = require('zod');

class ValidatedServer extends Server {
  constructor() {
    super({
      name: 'validated-server',
      version: '1.0.0'
    });

    // Schematy walidacji dla narzędzi
    this.schemas = {
      sendEmail: z.object({
        to: z.string().email(),
        subject: z.string().min(1).max(200),
        body: z.string().min(1).max(10000),
        priority: z.enum(['low', 'normal', 'high']).optional()
      }),

      createTask: z.object({
        title: z.string().min(1).max(100),
        description: z.string().max(1000).optional(),
        assignee: z.string().email().optional(),
        dueDate: z.string().datetime().optional()
      })
    };

    this.setupToolHandlers();
  }

  async validateAndExecute(toolName, args) {
    const schema = this.schemas[toolName];

    if (!schema) {
      throw new Error(\`Unknown tool schema: \${toolName}\`);
    }

    try {
      // Walidacja parametrów
      const validatedArgs = schema.parse(args);

      // Wykonanie narzędzia z walidowanymi danymi
      return await this.executeTool(toolName, validatedArgs);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Szczegółowe błędy walidacji
        throw new Error(\`Validation failed: \${error.errors.map(e => e.message).join(', ')}\`);
      }
      throw error;
    }
  }

  async executeTool(toolName, args) {
    switch (toolName) {
      case 'sendEmail':
        return await this.sendEmail(args);
      case 'createTask':
        return await this.createTask(args);
      default:
        throw new Error(\`Unknown tool: \${toolName}\`);
    }
  }

  async sendEmail({ to, subject, body, priority = 'normal' }) {
    // Implementacja wysyłania email
    console.log(\`Sending email to \${to} with priority \${priority}\`);

    return {
      messageId: 'msg_' + Date.now(),
      status: 'sent',
      timestamp: new Date().toISOString()
    };
  }

  async createTask({ title, description, assignee, dueDate }) {
    // Implementacja tworzenia zadania
    const taskId = 'task_' + Date.now();

    return {
      taskId,
      title,
      status: 'created',
      createdAt: new Date().toISOString()
    };
  }
}`}
          language="javascript"
          title="Serwer MCP z walidacją parametrów przy użyciu Zod"
        />

        <h2>Transport i Wdrażanie</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-semibold text-lg">📡</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Stdio Transport</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dla lokalnych procesów - najprostszy i najbezpieczniejszy
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-semibold text-lg">🌐</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">HTTP Transport</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dla usług sieciowych - wymaga dodatkowej konfiguracji bezpieczeństwa
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-semibold text-lg">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">WebSocket Transport</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dla aplikacji czasu rzeczywistego - dwukierunkowa komunikacja
            </p>
          </div>
        </div>

        <CodeBlock
          code={`// package.json dla serwera MCP
{
  "name": "weather-mcp-server",
  "version": "1.0.0",
  "description": "Serwer MCP dostarczający dane pogodowe",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.4.0",
    "zod": "^3.22.4",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}

// Dockerfile dla konteneryzacji
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]`}
          language="json"
          title="Konfiguracja projektu i konteneryzacja serwera MCP"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Najlepsze Praktyki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Walidacja wejścia:</strong> Zawsze sprawdzaj i waliduj parametry przed wykonaniem</li>
            <li>• <strong>Obsługa błędów:</strong> Implementuj kompleksową obsługę błędów z informatywnymi komunikatami</li>
            <li>• <strong>Logowanie:</strong> Rejestruj wszystkie operacje dla celów debugowania i audytu</li>
            <li>• <strong>Testowanie:</strong> Pokryj kod testami jednostkowymi i integracyjnymi</li>
            <li>• <strong>Bezpieczeństwo:</strong> Używaj bezpiecznych praktyk programistycznych</li>
            <li>• <strong>Dokumentacja:</strong> Dokumentuj narzędzia i ich parametry</li>
            <li>• <strong>Wersjonowanie:</strong> Używaj semantycznego wersjonowania dla API</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Budowanie serwera MCP wymaga zrozumienia architektury protokołu, implementacji narzędzi
          oraz zapewnienia bezpieczeństwa i niezawodności. Kluczowe elementy to: właściwa struktura klasy Server,
          walidacja parametrów, obsługa błędów oraz wybór odpowiedniego transportu.
        </p>

        <p>
          W następnym tutorialu dowiesz się, jak integrować serwery MCP z agentami AI,
          umożliwiając im wykonywanie rzeczywistych zadań w systemach zewnętrznych.
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
          href="/samouczki/narzedzia-mcp/wprowadzenie-do-mcp"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Poprzedni Tutorial: Wprowadzenie do MCP
        </Link>
        <Link
          href="/samouczki/narzedzia-mcp/integracja-z-agentami"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Integracja z Agentami →
        </Link>
      </motion.div>
    </div>
  );
}