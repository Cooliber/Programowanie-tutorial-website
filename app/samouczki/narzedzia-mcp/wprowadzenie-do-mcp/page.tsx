"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Cpu, Zap, Shield, Network } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function WprowadzenieDoMcpPage() {
  const demoSteps = [
    {
      title: "Podstawowa komunikacja klient-serwer",
      description: "Zobacz, jak klient MCP komunikuje się z serwerem narzędzi.",
      code: `// Klient wysyła żądanie
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "Warszawa"
    }
  }
}

// Serwer odpowiada
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "temperature": 15,
    "condition": "zachmurzenie",
    "humidity": 65
  }
}`,
      result: "✅ Połączenie nawiązane pomyślnie. Serwer zwrócił dane pogodowe dla Warszawy."
    },
    {
      title: "Rejestracja narzędzi",
      description: "Serwer MCP rejestruje dostępne narzędzia podczas inicjalizacji.",
      code: `// Serwer rejestruje narzędzia
{
  "jsonrpc": "2.0",
  "method": "tools/register",
  "params": {
    "tools": [
      {
        "name": "get_weather",
        "description": "Pobiera aktualne warunki pogodowe",
        "inputSchema": {
          "type": "object",
          "properties": {
            "location": {"type": "string"}
          },
          "required": ["location"]
        }
      }
    ]
  }
}`,
      result: "✅ Narzędzie 'get_weather' zostało zarejestrowane w systemie MCP."
    },
    {
      title: "Obsługa błędów",
      description: "Zobacz, jak MCP obsługuje błędy w sposób standardowy.",
      code: `// Klient wysyła nieprawidłowe żądanie
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {}
  }
}

// Serwer zwraca błąd
{
  "jsonrpc": "2.0",
  "id": 2,
  "error": {
    "code": -32602,
    "message": "Invalid params: missing required 'location' parameter"
  }
}`,
      result: "❌ Błąd walidacji: brakuje wymaganego parametru 'location'."
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
            <span>12 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Wprowadzenie do Protokołu Kontekstu Modelu (MCP)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Zrozum, czym jest Model Context Protocol - otwarty standard umożliwiający bezpieczną
          komunikację między agentami AI a zewnętrznymi narzędziami i usługami.
        </p>
      </motion.div>

      <ProgressIndicator
        current={1}
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
            <Network className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Standard Komunikacji
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              MCP definiuje standardowy sposób, w jaki aplikacje AI komunikują się z narzędziami zewnętrznymi.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Shield className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Bezpieczeństwo i Izolacja
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Protokół zapewnia bezpieczne wykonywanie narzędzi w izolowanym środowisku.
            </p>
          </div>
        </div>

        <h2>Co to jest Model Context Protocol?</h2>
        <p>
          Model Context Protocol (MCP) to otwarty standard protokołu, który umożliwia aplikacjom AI
          bezpieczne łączenie się z zewnętrznymi narzędziami, usługami i źródłami danych. MCP działa
          na zasadzie architektury klient-serwer, gdzie:
        </p>

        <ul>
          <li><strong>Klient MCP</strong> - aplikacja AI (np. Claude, agent AI)</li>
          <li><strong>Serwer MCP</strong> - usługa udostępniająca narzędzia i zasoby</li>
          <li><strong>Protokół komunikacyjny</strong> - standard JSON-RPC 2.0</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Kluczowa Innowacja
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            MCP pozwala agentom AI na wykonywanie rzeczywistych działań w świecie zewnętrznym -
            od wysyłania emaili po wykonywanie zapytań do baz danych - w bezpieczny i kontrolowany sposób.
          </p>
        </div>

        <h2>Architektura MCP</h2>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Komponenty systemu MCP:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">🔌 Transport Layer</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Stdio (procesy lokalne)</li>
                <li>• HTTP/WebSocket (sieciowe)</li>
                <li>• SSE (Server-Sent Events)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">🛠️ Typy Narzędzi</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Funkcje wykonywalne</li>
                <li>• Zapytania do API</li>
                <li>• Operacje na danych</li>
                <li>• Integracje z usługami</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Dlaczego MCP jest ważne?</h2>
        <p>
          Przed MCP, integracja agentów AI z zewnętrznymi systemami była chaotyczna i niebezpieczna.
          Każdy dostawca implementował własne rozwiązania, co prowadziło do:
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✗</span>
            </div>
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Problemy przed MCP</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                Brak standardów, niestabilne integracje, problemy bezpieczeństwa
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">Korzyści MCP</h4>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Standardyzacja, bezpieczeństwo, łatwość integracji
              </p>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz MCP w Działaniu"
          steps={demoSteps}
        />

        <h2>Podstawowe Koncepcje MCP</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-semibold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rejestracja Narzędzi</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Serwery rejestrują dostępne narzędzia podczas połączenia
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-semibold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bezpieczne Wykonywanie</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Narzędzia są wykonywane w izolowanym środowisku
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-semibold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Strukturalne Odpowiedzi</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wszystkie odpowiedzi mają ustandaryzowany format JSON-RPC
            </p>
          </div>
        </div>

        <CodeBlock
          code={`// Przykład prostego serwera MCP w Node.js
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/stdio');

class WeatherServer extends Server {
  constructor() {
    super({
      name: 'weather-server',
      version: '1.0.0'
    });

    // Rejestracja narzędzi
    this.setRequestHandler('tools/list', async () => {
      return {
        tools: [{
          name: 'get_weather',
          description: 'Pobiera warunki pogodowe dla podanej lokalizacji',
          inputSchema: {
            type: 'object',
            properties: {
              location: { type: 'string' }
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
        // Symulacja wywołania API pogodowego
        return {
          temperature: 15,
          condition: 'zachmurzenie',
          location: args.location
        };
      }
    });
  }
}

// Uruchomienie serwera
const server = new WeatherServer();
const transport = new StdioServerTransport();
server.connect(transport);`}
          language="javascript"
          title="Prosty serwer MCP dla danych pogodowych"
        />

        <h2>Zastosowania MCP</h2>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Automatyzacja</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Agenci mogą wykonywać rzeczywiste zadania w systemach korporacyjnych
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Network className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Integracje API</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Łatwe łączenie z zewnętrznymi usługami i bazami danych
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Bezpieczeństwo</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Izolacja wykonania zapobiega nieautoryzowanym operacjom
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Cpu className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Rozszerzalność</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Łatwe dodawanie nowych narzędzi bez zmiany klienta
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Wskazówki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Walidacja wejścia:</strong> Zawsze sprawdzaj parametry przed wykonaniem narzędzi</li>
            <li>• <strong>Obsługa błędów:</strong> Implementuj odpowiednie mechanizmy obsługi błędów</li>
            <li>• <strong>Logowanie:</strong> Rejestruj wszystkie operacje dla celów audytu</li>
            <li>• <strong>Izolacja:</strong> Wykonywuj narzędzia w bezpiecznym, izolowanym środowisku</li>
            <li>• <strong>Dokumentacja:</strong> Dokładnie dokumentuj schematy wejścia i wyjścia narzędzi</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Model Context Protocol rewolucjonizuje sposób, w jaki agenci AI współdziałają ze światem zewnętrznym.
          Poprzez standaryzację komunikacji, MCP umożliwia bezpieczne i niezawodne rozszerzanie możliwości
          agentów AI o rzeczywiste narzędzia i usługi. W kolejnych tutorialach zagłębimy się w praktyczne
          aspekty budowania i integrowania serwerów MCP.
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
          href="/samouczki/narzedzia-mcp/budowanie-serwera-mcp"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Budowanie Serwera MCP →
        </Link>
      </motion.div>
    </div>
  );
}