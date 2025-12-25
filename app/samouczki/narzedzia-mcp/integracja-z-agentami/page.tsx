"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Bot, Link2, Zap, Settings } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function IntegracjaZAgentamiPage() {
  const demoSteps = [
    {
      title: "Konfiguracja agenta z MCP",
      description: "Skonfiguruj agenta AI do używania narzędzi MCP.",
      code: `// agent-config.json
{
  "name": "CustomerServiceAgent",
  "version": "1.0.0",
  "mcpServers": [
    {
      "name": "database-server",
      "command": "node",
      "args": ["/path/to/database-server.js"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/customers"
      }
    },
    {
      "name": "email-server",
      "command": "python",
      "args": ["/path/to/email-server.py"],
      "env": {
        "SMTP_HOST": "smtp.company.com",
        "SMTP_PORT": "587"
      }
    }
  ],
  "tools": [
    "query_customers",
    "send_email",
    "create_support_ticket"
  ]
}`,
      result: "✅ Agent został skonfigurowany z dwoma serwerami MCP i trzema narzędziami."
    },
    {
      title: "Automatyczne wykrywanie narzędzi",
      description: "Agent automatycznie wykrywa dostępne narzędzia podczas uruchamiania.",
      code: `// Agent initialization
const agent = new MCPAgent(config);

await agent.initialize();

// Agent automatycznie:
// 1. Uruchamia serwery MCP
// 2. Pobiera listę narzędzi z każdego serwera
// 3. Rejestruje narzędzia w swoim systemie
// 4. Przygotowuje się do obsługi zapytań

console.log('Available tools:', agent.getAvailableTools());`,
      result: "✅ Agent wykrył 5 narzędzi: query_customers, get_customer_details, send_email, create_support_ticket, schedule_followup."
    },
    {
      title: "Wykonywanie zadań z użyciem narzędzi",
      description: "Zobacz, jak agent używa narzędzi MCP do wykonania złożonego zadania.",
      code: `// Zadanie: "Znajdź klienta Kowalski i wyślij mu email z potwierdzeniem"
const task = "Znajdź klienta Kowalski i wyślij mu email z potwierdzeniem zamówienia";

const result = await agent.executeTask(task);

// Agent automatycznie:
// 1. Analizuje zadanie
// 2. Wybiera odpowiednie narzędzia (query_customers, send_email)
// 3. Wykonuje narzędzia w odpowiedniej kolejności
// 4. Łączy wyniki w coherentną odpowiedź

console.log(result);`,
      result: "✅ Zadanie wykonane pomyślnie. Klient Jan Kowalski otrzymał email z potwierdzeniem zamówienia #12345."
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
            <span>15 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Integracja Narzędzi MCP z Agentami
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Dowiedz się, jak łączyć serwery MCP z agentami AI, umożliwiając im wykonywanie
          rzeczywistych zadań w systemach zewnętrznych.
        </p>
      </motion.div>

      <ProgressIndicator
        current={3}
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
            <Bot className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Dynamiczne Łączenie
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Agenci mogą dynamicznie łączyć się z serwerami MCP w czasie wykonania.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Link2 className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Bezpieczna Komunikacja
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Protokół MCP zapewnia bezpieczne wykonywanie narzędzi w izolowanym środowisku.
            </p>
          </div>
        </div>

        <h2>Architektura Integracji</h2>
        <p>
          Integracja MCP z agentami AI opiera się na architekturze klient-serwer, gdzie agent
          działa jako klient MCP, a serwery dostarczają narzędzi. Kluczowe elementy to:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Komponenty integracji:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">🔌 MCP Client</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Zarządza połączeniami z serwerami</li>
                <li>• Rejestruje dostępne narzędzia</li>
                <li>• Obsługuje wywołania narzędzi</li>
                <li>• Zarządza stanem sesji</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">🤖 Agent Framework</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Integruje narzędzia MCP w logikę agenta</li>
                <li>• Planuje sekwencje wywołań narzędzi</li>
                <li>• Interpretuje rezultaty</li>
                <li>• Zarządza kontekstem wykonania</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Konfiguracja Agenta</h2>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Kluczowa Konfiguracja
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Agent musi wiedzieć, które serwery MCP uruchomić i jak się z nimi połączyć.
            Konfiguracja określa również dostępne narzędzia i ich parametry.
          </p>
        </div>

        <InteractiveDemo
          title="Zobacz Integrację MCP w Działaniu"
          steps={demoSteps}
        />

        <h2>Implementacja Klienta MCP</h2>

        <CodeBlock
          code={`// MCP Client dla agentów AI
class MCPClient {
  constructor() {
    this.servers = new Map();
    this.tools = new Map();
    this.transport = new StdioClientTransport();
  }

  async connectToServer(serverConfig) {
    const { name, command, args, env } = serverConfig;

    try {
      // Uruchom proces serwera
      const serverProcess = spawn(command, args, {
        env: { ...process.env, ...env },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Nawiąż połączenie MCP
      const connection = await this.transport.connect(serverProcess);

      // Zarejestruj serwer
      this.servers.set(name, {
        process: serverProcess,
        connection,
        config: serverConfig
      });

      // Pobierz dostępne narzędzia
      await this.discoverTools(name);

      console.log(\`Połączono z serwerem MCP: \${name}\`);
    } catch (error) {
      console.error(\`Błąd łączenia z serwerem \${name}:\`, error);
      throw error;
    }
  }

  async discoverTools(serverName) {
    const server = this.servers.get(serverName);
    if (!server) throw new Error(\`Serwer \${serverName} nie istnieje\`);

    try {
      // Wyślij żądanie listy narzędzi
      const response = await server.connection.sendRequest({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/list',
        params: {}
      });

      // Zarejestruj narzędzia
      for (const tool of response.result.tools) {
        const toolId = \`\${serverName}::\${tool.name}\`;
        this.tools.set(toolId, {
          ...tool,
          server: serverName,
          execute: (args) => this.callTool(serverName, tool.name, args)
        });
      }
    } catch (error) {
      console.error(\`Błąd odkrywania narzędzi dla \${serverName}:\`, error);
      throw error;
    }
  }

  async callTool(serverName, toolName, args) {
    const server = this.servers.get(serverName);
    if (!server) throw new Error(\`Serwer \${serverName} nie istnieje\`);

    try {
      const response = await server.connection.sendRequest({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: toolName,
          arguments: args
        }
      });

      return response.result;
    } catch (error) {
      console.error(\`Błąd wywołania narzędzia \${toolName}:\`, error);
      throw error;
    }
  }

  getAvailableTools() {
    return Array.from(this.tools.keys());
  }

  async disconnect() {
    for (const [name, server] of this.servers) {
      try {
        server.process.kill();
        console.log(\`Rozłączono serwer: \${name}\`);
      } catch (error) {
        console.error(\`Błąd rozłączania serwera \${name}:\`, error);
      }
    }

    this.servers.clear();
    this.tools.clear();
  }
}`}
          language="javascript"
          title="Implementacja klienta MCP dla agentów AI"
        />

        <h2>Integracja z Frameworkami Agentów</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Inicjalizacja</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Agent uruchamia i łączy się z serwerami MCP podczas startu
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Odkrywanie narzędzi</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Agent automatycznie wykrywa dostępne narzędzia z wszystkich serwerów
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
                <h4 className="font-semibold text-gray-900 dark:text-white">Planowanie zadań</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Agent planuje sekwencje wywołań narzędzi do wykonania zadań
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Wykonywanie</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Agent wykonuje narzędzia w odpowiedniej kolejności i interpretuje rezultaty
                </p>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Integracja z agentem opartym na LangChain
import { MCPClient } from './mcp-client';
import { AgentExecutor, initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from 'langchain/chat_models/openai';

class MCPIntegratedAgent {
  constructor(config) {
    this.config = config;
    this.mcpClient = new MCPClient();
    this.llm = new ChatOpenAI({
      temperature: 0,
      modelName: 'gpt-4'
    });
  }

  async initialize() {
    // Uruchom serwery MCP
    for (const serverConfig of this.config.mcpServers) {
      await this.mcpClient.connectToServer(serverConfig);
    }

    // Pobierz dostępne narzędzia
    const availableTools = this.mcpClient.getAvailableTools();

    // Konwertuj narzędzia MCP na narzędzia LangChain
    const langchainTools = availableTools.map(toolId => ({
      name: toolId,
      description: this.mcpClient.tools.get(toolId).description,
      func: async (args) => {
        const result = await this.mcpClient.tools.get(toolId).execute(args);
        return JSON.stringify(result);
      }
    }));

    // Inicjalizuj executor agenta
    this.executor = await initializeAgentExecutorWithOptions(
      langchainTools,
      this.llm,
      {
        agentType: 'chat-conversational-react-description',
        verbose: true,
        maxIterations: 5
      }
    );
  }

  async executeTask(task) {
    try {
      const result = await this.executor.call({
        input: task
      });

      return {
        success: true,
        output: result.output,
        intermediateSteps: result.intermediateSteps
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async cleanup() {
    await this.mcpClient.disconnect();
  }
}

// Przykład użycia
const agent = new MCPIntegratedAgent({
  mcpServers: [
    {
      name: 'customer-db',
      command: 'node',
      args: ['./servers/customer-db-server.js']
    }
  ]
});

await agent.initialize();

const result = await agent.executeTask(
  'Znajdź wszystkich klientów z Warszawy i wyślij im email z promocją'
);

console.log(result);`}
          language="javascript"
          title="Integracja MCP z agentem opartym na LangChain"
        />

        <h2>Zarządzanie Stanem i Kontekstem</h2>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">💾</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Stan sesji</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                Agent utrzymuje stan między wywołaniami narzędzi, umożliwiając złożone operacje wieloetapowe
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">🔄</span>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">Kontekst wykonania</h4>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Wyniki poprzednich wywołań narzędzi są dostępne dla kolejnych operacji
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">🎯</span>
            </div>
            <div>
              <h4 className="font-medium text-purple-900 dark:text-purple-100">Inteligentne planowanie</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                Agent może planować złożone sekwencje operacji na podstawie dostępnych narzędzi
              </p>
            </div>
          </div>
        </div>

        <h2>Bezpieczeństwo i Izolacja</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
          <h3 className="text-red-800 dark:text-red-200 font-medium mb-2">⚠️ Ważne Zagadnienia Bezpieczeństwa</h3>
          <ul className="text-red-700 dark:text-red-300 space-y-1 text-sm">
            <li>• <strong>Izolacja procesów:</strong> Serwery MCP działają w osobnych procesach</li>
            <li>• <strong>Walidacja wejścia:</strong> Wszystkie parametry są walidowane przed wykonaniem</li>
            <li>• <strong>Ograniczenia zasobów:</strong> Timeouty i limity zapobiegają nadużyciom</li>
            <li>• <strong>Audyt operacji:</strong> Wszystkie wywołania narzędzi są logowane</li>
            <li>• <strong>Kontrola dostępu:</strong> Agenci mają tylko dostęp do autoryzowanych narzędzi</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Przykład bezpiecznej integracji z kontrolą dostępu
class SecureMCPAgent {
  constructor(permissions) {
    this.permissions = permissions; // Mapa uprawnień agent -> narzędzia
    this.mcpClient = new MCPClient();
    this.auditLog = [];
  }

  async initialize() {
    // Inicjalizacja z kontrolą dostępu
    await this.mcpClient.connectToServer(this.config.server);

    // Filtrowanie narzędzi na podstawie uprawnień
    const allTools = this.mcpClient.getAvailableTools();
    this.allowedTools = allTools.filter(toolId =>
      this.hasPermission(toolId)
    );

    console.log(\`Agent ma dostęp do \${this.allowedTools.length} narzędzi\`);
  }

  hasPermission(toolId) {
    const agentPermissions = this.permissions[this.config.agentId] || [];
    return agentPermissions.includes(toolId) || agentPermissions.includes('*');
  }

  async executeTool(toolId, args) {
    // Sprawdź uprawnienia
    if (!this.hasPermission(toolId)) {
      throw new Error(\`Brak uprawnień do narzędzia: \${toolId}\`);
    }

    // Loguj operację
    this.auditLog.push({
      timestamp: new Date(),
      agent: this.config.agentId,
      tool: toolId,
      args: this.sanitizeArgs(args) // Usuń wrażliwe dane z logów
    });

    // Wykonaj narzędzie z timeoutem
    const timeout = this.config.toolTimeout || 30000; // 30 sekund

    return Promise.race([
      this.mcpClient.callTool(toolId, args),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ]);
  }

  sanitizeArgs(args) {
    // Usuń wrażliwe dane jak hasła, klucze API itp.
    const sanitized = { ...args };
    const sensitiveFields = ['password', 'apiKey', 'secret', 'token'];

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  getAuditLog() {
    return this.auditLog;
  }
}`}
          language="javascript"
          title="Bezpieczna integracja MCP z kontrolą dostępu i audytem"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Najlepsze Praktyki Integracji</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Łączenie stopniowe:</strong> Testuj integrację z jednym serwerem na raz</li>
            <li>• <strong>Obsługa błędów:</strong> Implementuj retry logic dla zawodnych połączeń</li>
            <li>• <strong>Monitorowanie:</strong> Śledź wydajność i dostępność serwerów MCP</li>
            <li>• <strong>Cache'owanie:</strong> Buforuj wyniki narzędzi, gdy to możliwe</li>
            <li>• <strong>Wersjonowanie:</strong> Używaj wersjonowanych API narzędzi</li>
            <li>• <strong>Testowanie:</strong> Pokryj integrację kompleksowymi testami</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Integracja narzędzi MCP z agentami AI otwiera nowe możliwości automatyzacji i rozszerzania
          funkcjonalności agentów. Kluczowe aspekty to: bezpieczna komunikacja, zarządzanie stanem,
          kontrola dostępu oraz kompleksowa obsługa błędów.
        </p>

        <p>
          W następnym tutorialu poznasz zaawansowane funkcje MCP, takie jak zarządzanie zasobami,
          autoryzacja i monitorowanie wydajności.
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
          href="/samouczki/narzedzia-mcp/budowanie-serwera-mcp"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Poprzedni Tutorial: Budowanie Serwera MCP
        </Link>
        <Link
          href="/samouczki/narzedzia-mcp/zaawansowane-funkcje"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Zaawansowane Funkcje →
        </Link>
      </motion.div>
    </div>
  );
}