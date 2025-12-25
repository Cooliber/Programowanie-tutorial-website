"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Youtube, Database, Mail, Search } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function PraktyczneTutorialePage() {
  const demoSteps = [
    {
      title: "Agent YouTube z MCP",
      description: "Budowa agenta, który może wyszukiwać i analizować filmy na YouTube.",
      code: `// Agent YouTube - wyszukiwanie filmów
const youtubeAgent = new MCPAgent({
  name: 'YouTube Assistant',
  mcpServers: [{
    name: 'youtube-api',
    command: 'node',
    args: ['./servers/youtube-server.js'],
    env: {
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
    }
  }]
});

await youtubeAgent.initialize();

// Zadanie: "Znajdź najnowsze filmy o AI i podsumuj ich zawartość"
const task = "Znajdź najnowsze filmy o AI i podsumuj ich zawartość";
const result = await youtubeAgent.executeTask(task);`,
      result: "✅ Agent znalazł 10 najnowszych filmów o AI, przeanalizował ich opisy i stworzył podsumowanie trendów."
    },
    {
      title: "Integracja z bazą danych",
      description: "Agent łączący się z bazą danych do analizy danych biznesowych.",
      code: `// Agent analityczny z dostępem do bazy danych
const analyticsAgent = new MCPAgent({
  name: 'Business Analytics Agent',
  mcpServers: [{
    name: 'postgres-db',
    command: 'node',
    args: ['./servers/database-server.js'],
    env: {
      DATABASE_URL: process.env.DATABASE_URL
    }
  }]
});

// Zadanie: "Przeanalizuj sprzedaż z ostatniego miesiąca i znajdź trendy"
const analysis = await analyticsAgent.executeTask(
  "Przeanalizuj sprzedaż z ostatniego miesiąca i znajdź trendy"
);`,
      result: "✅ Agent przeanalizował dane sprzedaży, zidentyfikował trendy sezonowe i przygotował rekomendacje."
    },
    {
      title: "Agent do automatyzacji email",
      description: "Agent obsługujący automatyczne wysyłanie i zarządzanie emailami.",
      code: `// Agent do obsługi email marketingu
const emailAgent = new MCPAgent({
  name: 'Email Marketing Agent',
  mcpServers: [{
    name: 'email-server',
    command: 'node',
    args: ['./servers/email-server.js'],
    env: {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS
    }
  }]
});

// Zadanie: "Wyślij spersonalizowane oferty do klientów VIP"
const campaign = await emailAgent.executeTask(
  "Wyślij spersonalizowane oferty do klientów VIP na podstawie ich historii zakupów"
);`,
      result: "✅ Agent wysłał 500 spersonalizowanych emaili z unikalnymi ofertami, osiągając współczynnik otwarć 45%."
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
            <span>25 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Praktyczne Tutoriale MCP
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Kompletne przykłady implementacji agentów MCP w rzeczywistych scenariuszach:
          od analizy YouTube po automatyzację biznesową i integrację z API.
        </p>
      </motion.div>

      <ProgressIndicator
        current={5}
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
            <Youtube className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Agent YouTube
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Analiza treści wideo, wyszukiwanie filmów i generowanie podsumowań.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Database className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Integracja z Bazami Danych
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Analiza danych biznesowych i generowanie raportów automatycznie.
            </p>
          </div>
        </div>

        <h2>Agent YouTube z MCP</h2>
        <p>
          Pierwszy praktyczny przykład pokazuje, jak zbudować agenta AI, który może
          wyszukiwać filmy na YouTube, analizować ich zawartość i generować podsumowania.
          Agent wykorzystuje YouTube Data API v3 poprzez serwer MCP.
        </p>

        <InteractiveDemo
          title="Praktyczne Przykłady Agentów MCP"
          steps={demoSteps}
        />

        <CodeBlock
          code={`// Kompletny serwer MCP dla YouTube API
const { google } = require('googleapis');
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/stdio');

class YouTubeServer extends Server {
  constructor(apiKey) {
    super({
      name: 'youtube-server',
      version: '1.0.0'
    });

    this.youtube = google.youtube({
      version: 'v3',
      auth: apiKey
    });

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'search_videos',
            description: 'Wyszukuje filmy na YouTube',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string', description: 'Fraza wyszukiwania' },
                maxResults: { type: 'number', description: 'Maksymalna liczba wyników', default: 10, minimum: 1, maximum: 50 }
              },
              required: ['query']
            }
          },
          {
            name: 'get_video_details',
            description: 'Pobiera szczegółowe informacje o filmie',
            inputSchema: {
              type: 'object',
              properties: {
                videoId: { type: 'string', description: 'ID filmu YouTube' }
              },
              required: ['videoId']
            }
          },
          {
            name: 'analyze_channel',
            description: 'Analizuje kanał YouTube i jego filmy',
            inputSchema: {
              type: 'object',
              properties: {
                channelId: { type: 'string', description: 'ID kanału YouTube' },
                maxVideos: { type: 'number', description: 'Maksymalna liczba filmów do analizy', default: 20 }
              },
              required: ['channelId']
            }
          }
        ]
      };
    });

    this.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'search_videos':
          return await this.searchVideos(args);
        case 'get_video_details':
          return await this.getVideoDetails(args);
        case 'analyze_channel':
          return await this.analyzeChannel(args);
        default:
          throw new Error(\`Unknown tool: \${name}\`);
      }
    });
  }

  async searchVideos({ query, maxResults = 10 }) {
    try {
      const response = await this.youtube.search.list({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults,
        order: 'relevance'
      });

      const videos = response.data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails.default.url
      }));

      return {
        query,
        totalResults: response.data.pageInfo.totalResults,
        videos
      };
    } catch (error) {
      throw new Error(\`YouTube search failed: \${error.message}\`);
    }
  }

  async getVideoDetails({ videoId }) {
    try {
      const response = await this.youtube.videos.list({
        part: 'snippet,statistics,contentDetails',
        id: videoId
      });

      if (response.data.items.length === 0) {
        throw new Error('Video not found');
      }

      const video = response.data.items[0];
      return {
        videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails.duration,
        viewCount: parseInt(video.statistics.viewCount || 0),
        likeCount: parseInt(video.statistics.likeCount || 0),
        commentCount: parseInt(video.statistics.commentCount || 0),
        tags: video.snippet.tags || []
      };
    } catch (error) {
      throw new Error(\`Failed to get video details: \${error.message}\`);
    }
  }

  async analyzeChannel({ channelId, maxVideos = 20 }) {
    try {
      // Pobierz informacje o kanale
      const channelResponse = await this.youtube.channels.list({
        part: 'snippet,statistics',
        id: channelId
      });

      if (channelResponse.data.items.length === 0) {
        throw new Error('Channel not found');
      }

      const channel = channelResponse.data.items[0];

      // Pobierz najnowsze filmy kanału
      const videosResponse = await this.youtube.search.list({
        part: 'snippet',
        channelId,
        type: 'video',
        maxResults,
        order: 'date'
      });

      const videos = videosResponse.data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt
      }));

      // Analiza trendów
      const analysis = this.analyzeVideoTrends(videos);

      return {
        channel: {
          channelId,
          title: channel.snippet.title,
          description: channel.snippet.description,
          subscriberCount: parseInt(channel.statistics.subscriberCount || 0),
          videoCount: parseInt(channel.statistics.videoCount || 0)
        },
        recentVideos: videos,
        analysis
      };
    } catch (error) {
      throw new Error(\`Failed to analyze channel: \${error.message}\`);
    }
  }

  analyzeVideoTrends(videos) {
    // Prosta analiza trendów w tytułach filmów
    const titles = videos.map(v => v.title.toLowerCase());

    const trends = {
      totalVideos: videos.length,
      averageTitleLength: titles.reduce((sum, title) => sum + title.length, 0) / titles.length,
      commonWords: this.findCommonWords(titles),
      postingFrequency: this.calculatePostingFrequency(videos)
    };

    return trends;
  }

  findCommonWords(titles) {
    const words = titles.flatMap(title =>
      title.split(/\\s+/).filter(word => word.length > 3)
    );

    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }

  calculatePostingFrequency(videos) {
    if (videos.length < 2) return 'Niewystarczająca ilość danych';

    const dates = videos.map(v => new Date(v.publishedAt)).sort((a, b) => a - b);
    const intervals = [];

    for (let i = 1; i < dates.length; i++) {
      intervals.push(dates[i] - dates[i-1]);
    }

    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const avgDays = avgInterval / (1000 * 60 * 60 * 24);

    if (avgDays < 1) return 'Codziennie';
    if (avgDays < 7) return \`\${Math.round(avgDays)} razy w tygodniu\`;
    if (avgDays < 30) return \`\${Math.round(avgDays / 7)} razy w miesiącu\`;
    return \`\${Math.round(avgDays / 30)} razy w roku\`;
  }
}

// Uruchomienie serwera
const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  console.error('YOUTUBE_API_KEY environment variable is required');
  process.exit(1);
}

const server = new YouTubeServer(apiKey);
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);`}
          language="javascript"
          title="Kompletny serwer MCP dla integracji z YouTube API"
        />

        <h2>Integracja z Bazami Danych</h2>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Agent Analityczny dla Biznesu
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Agent potrafi wykonywać złożone zapytania SQL, analizować trendy,
            generować raporty i wizualizacje danych biznesowych.
          </p>
        </div>

        <CodeBlock
          code={`// Serwer MCP dla PostgreSQL z analizą biznesową
const { Pool } = require('pg');
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/stdio');

class BusinessAnalyticsServer extends Server {
  constructor(databaseUrl) {
    super({
      name: 'business-analytics-server',
      version: '1.0.0'
    });

    this.pool = new Pool({ connectionString: databaseUrl });
    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'execute_query',
            description: 'Wykonuje bezpieczne zapytanie SQL',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string', description: 'Zapytanie SQL' },
                params: { type: 'array', description: 'Parametry zapytania', items: { type: 'string' } }
              },
              required: ['query']
            }
          },
          {
            name: 'analyze_sales_trends',
            description: 'Analizuje trendy sprzedaży w określonym okresie',
            inputSchema: {
              type: 'object',
              properties: {
                startDate: { type: 'string', description: 'Data początkowa (YYYY-MM-DD)' },
                endDate: { type: 'string', description: 'Data końcowa (YYYY-MM-DD)' },
                groupBy: { type: 'string', enum: ['day', 'week', 'month'], default: 'month' }
              },
              required: ['startDate', 'endDate']
            }
          },
          {
            name: 'customer_segmentation',
            description: 'Segmentuje klientów na podstawie ich zachowań zakupowych',
            inputSchema: {
              type: 'object',
              properties: {
                minOrders: { type: 'number', description: 'Minimalna liczba zamówień', default: 1 },
                vipThreshold: { type: 'number', description: 'Próg dla klientów VIP (wartość zamówienia)', default: 1000 }
              }
            }
          },
          {
            name: 'generate_business_report',
            description: 'Generuje kompleksowy raport biznesowy',
            inputSchema: {
              type: 'object',
              properties: {
                reportType: {
                  type: 'string',
                  enum: ['sales', 'customers', 'inventory', 'full'],
                  default: 'full'
                },
                period: {
                  type: 'string',
                  enum: ['week', 'month', 'quarter', 'year'],
                  default: 'month'
                }
              }
            }
          }
        ]
      };
    });

    this.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'execute_query':
          return await this.executeQuery(args);
        case 'analyze_sales_trends':
          return await this.analyzeSalesTrends(args);
        case 'customer_segmentation':
          return await this.customerSegmentation(args);
        case 'generate_business_report':
          return await this.generateBusinessReport(args);
        default:
          throw new Error(\`Unknown tool: \${name}\`);
      }
    });
  }

  async executeQuery({ query, params = [] }) {
    // Walidacja bezpieczeństwa - tylko dozwolone zapytania SELECT
    if (!query.trim().toUpperCase().startsWith('SELECT')) {
      throw new Error('Only SELECT queries are allowed for security reasons');
    }

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return {
        columns: result.fields.map(f => f.name),
        rows: result.rows,
        rowCount: result.rowCount
      };
    } finally {
      client.release();
    }
  }

  async analyzeSalesTrends({ startDate, endDate, groupBy = 'month' }) {
    const groupSql = {
      day: "DATE_TRUNC('day', order_date)",
      week: "DATE_TRUNC('week', order_date)",
      month: "DATE_TRUNC('month', order_date)"
    }[groupBy];

    const query = \`
      SELECT
        \${groupSql} as period,
        COUNT(*) as order_count,
        SUM(total_amount) as total_sales,
        AVG(total_amount) as avg_order_value,
        COUNT(DISTINCT customer_id) as unique_customers
      FROM orders
      WHERE order_date BETWEEN $1 AND $2
      GROUP BY period
      ORDER BY period
    \`;

    const result = await this.executeQuery({
      query,
      params: [startDate, endDate]
    });

    // Dodaj analizę trendów
    const trends = this.calculateTrends(result.rows);

    return {
      period: \`\${startDate} to \${endDate}\`,
      groupBy,
      data: result.rows,
      trends
    };
  }

  calculateTrends(data) {
    if (data.length < 2) return { trend: 'insufficient_data' };

    const sales = data.map(row => parseFloat(row.total_sales));
    const growth = [];

    for (let i = 1; i < sales.length; i++) {
      const change = ((sales[i] - sales[i-1]) / sales[i-1]) * 100;
      growth.push(change);
    }

    const avgGrowth = growth.reduce((sum, g) => sum + g, 0) / growth.length;

    return {
      averageGrowthPercent: avgGrowth,
      trend: avgGrowth > 5 ? 'growing' : avgGrowth < -5 ? 'declining' : 'stable',
      volatility: this.calculateVolatility(growth)
    };
  }

  calculateVolatility(growthRates) {
    if (growthRates.length < 2) return 0;

    const mean = growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
    const variance = growthRates.reduce((sum, rate) => sum + Math.pow(rate - mean, 2), 0) / growthRates.length;

    return Math.sqrt(variance);
  }

  async customerSegmentation({ minOrders = 1, vipThreshold = 1000 }) {
    const query = \`
      WITH customer_stats AS (
        SELECT
          c.customer_id,
          c.name,
          c.email,
          COUNT(o.order_id) as order_count,
          SUM(o.total_amount) as total_spent,
          AVG(o.total_amount) as avg_order_value,
          MAX(o.order_date) as last_order_date,
          MIN(o.order_date) as first_order_date
        FROM customers c
        LEFT JOIN orders o ON c.customer_id = o.customer_id
        GROUP BY c.customer_id, c.name, c.email
        HAVING COUNT(o.order_id) >= $1
      )
      SELECT
        *,
        CASE
          WHEN total_spent >= $2 THEN 'VIP'
          WHEN order_count >= 5 THEN 'Regular'
          WHEN order_count >= 2 THEN 'Occasional'
          ELSE 'New'
        END as segment
      FROM customer_stats
      ORDER BY total_spent DESC
    \`;

    const result = await this.executeQuery({
      query,
      params: [minOrders, vipThreshold]
    });

    // Podsumowanie segmentów
    const segments = {};
    result.rows.forEach(customer => {
      const segment = customer.segment;
      if (!segments[segment]) {
        segments[segment] = { count: 0, totalSpent: 0 };
      }
      segments[segment].count++;
      segments[segment].totalSpent += parseFloat(customer.total_spent);
    });

    return {
      customers: result.rows,
      segments: Object.entries(segments).map(([name, data]) => ({
        name,
        count: data.count,
        totalSpent: data.totalSpent,
        averageSpent: data.totalSpent / data.count
      }))
    };
  }

  async generateBusinessReport({ reportType = 'full', period = 'month' }) {
    const periods = {
      week: 7,
      month: 30,
      quarter: 90,
      year: 365
    };

    const days = periods[period];
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));

    const report = {
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        type: period
      },
      generatedAt: new Date().toISOString()
    };

    if (reportType === 'sales' || reportType === 'full') {
      report.sales = await this.analyzeSalesTrends({
        startDate: report.period.startDate,
        endDate: report.period.endDate
      });
    }

    if (reportType === 'customers' || reportType === 'full') {
      report.customers = await this.customerSegmentation({});
    }

    if (reportType === 'inventory' || reportType === 'full') {
      // Dodaj analizę inwentarza jeśli dostępna
      report.inventory = await this.getInventoryStatus();
    }

    // Generuj wnioski i rekomendacje
    report.insights = this.generateInsights(report);

    return report;
  }

  async getInventoryStatus() {
    // Placeholder - w rzeczywistej implementacji łączyłoby się z tabelą inventory
    return {
      status: 'not_implemented',
      message: 'Inventory analysis requires inventory table'
    };
  }

  generateInsights(report) {
    const insights = [];

    if (report.sales?.trends) {
      const trend = report.sales.trends.trend;
      if (trend === 'growing') {
        insights.push('Sprzedaż rośnie - rozważ zwiększenie zapasów');
      } else if (trend === 'declining') {
        insights.push('Sprzedaż spada - sprawdź przyczyny i zastosuj strategie marketingowe');
      }
    }

    if (report.customers?.segments) {
      const vipCount = report.customers.segments.find(s => s.name === 'VIP')?.count || 0;
      if (vipCount > 0) {
        insights.push(\`Masz \${vipCount} klientów VIP - skup się na ich utrzymaniu\`);
      }
    }

    return insights;
  }

  async cleanup() {
    await this.pool.end();
  }
}

// Uruchomienie serwera
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const server = new BusinessAnalyticsServer(databaseUrl);
const transport = new StdioServerTransport();

process.on('SIGINT', async () => {
  await server.cleanup();
  process.exit(0);
});

server.connect(transport).catch(console.error);`}
          language="javascript"
          title="Serwer MCP dla analizy biznesowej z PostgreSQL"
        />

        <h2>Automatyzacja Email Marketingu</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Spersonalizowane Kampanie</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatyczne tworzenie kampanii email na podstawie danych klientów
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Search className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Segmentacja Odbiorców</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Inteligentne grupowanie klientów na podstawie zachowań zakupowych
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-purple-500 rounded mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">A/B Testing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatyczne testowanie różnych wersji emaili
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-orange-500 rounded mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Analiza Wydajności</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Śledzenie otwarć, kliknięć i konwersji w czasie rzeczywistym
                </p>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Serwer MCP dla automatyzacji email marketingu
const nodemailer = require('nodemailer');
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/stdio');

class EmailMarketingServer extends Server {
  constructor(smtpConfig) {
    super({
      name: 'email-marketing-server',
      version: '1.0.0'
    });

    this.transporter = nodemailer.createTransporter({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
      }
    });

    this.campaigns = new Map(); // Przechowywanie kampanii
    this.templates = new Map(); // Szablony email

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'send_personalized_email',
            description: 'Wysyła spersonalizowany email do pojedynczego odbiorcy',
            inputSchema: {
              type: 'object',
              properties: {
                to: { type: 'string', format: 'email' },
                subject: { type: 'string' },
                template: { type: 'string', description: 'Nazwa szablonu' },
                personalization: { type: 'object', description: 'Dane do personalizacji' }
              },
              required: ['to', 'subject', 'template']
            }
          },
          {
            name: 'create_campaign',
            description: 'Tworzy kampanię email marketingową',
            inputSchema: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Nazwa kampanii' },
                subject: { type: 'string', description: 'Temat emaila' },
                template: { type: 'string', description: 'Nazwa szablonu' },
                recipients: { type: 'array', items: { type: 'string', format: 'email' } },
                personalizationData: { type: 'object', description: 'Dane personalizacji dla każdego odbiorcy' }
              },
              required: ['name', 'subject', 'template', 'recipients']
            }
          },
          {
            name: 'send_campaign',
            description: 'Wysyła przygotowaną kampanię email',
            inputSchema: {
              type: 'object',
              properties: {
                campaignId: { type: 'string', description: 'ID kampanii' },
                batchSize: { type: 'number', description: 'Rozmiar partii', default: 50 }
              },
              required: ['campaignId']
            }
          },
          {
            name: 'analyze_campaign_performance',
            description: 'Analizuje wydajność kampanii email',
            inputSchema: {
              type: 'object',
              properties: {
                campaignId: { type: 'string', description: 'ID kampanii' }
              },
              required: ['campaignId']
            }
          }
        ]
      };
    });

    this.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'send_personalized_email':
          return await this.sendPersonalizedEmail(args);
        case 'create_campaign':
          return await this.createCampaign(args);
        case 'send_campaign':
          return await this.sendCampaign(args);
        case 'analyze_campaign_performance':
          return await this.analyzeCampaignPerformance(args);
        default:
          throw new Error(\`Unknown tool: \${name}\`);
      }
    });
  }

  async sendPersonalizedEmail({ to, subject, template, personalization = {} }) {
    const html = this.renderTemplate(template, personalization);

    const mailOptions = {
      from: this.smtpConfig.user,
      to,
      subject,
      html
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);

      // Loguj wysłanie
      this.logEmailSend({
        to,
        subject,
        template,
        messageId: result.messageId,
        timestamp: new Date()
      });

      return {
        success: true,
        messageId: result.messageId,
        recipient: to
      };
    } catch (error) {
      throw new Error(\`Failed to send email: \${error.message}\`);
    }
  }

  async createCampaign({ name, subject, template, recipients, personalizationData = {} }) {
    const campaignId = \`campaign_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;

    const campaign = {
      id: campaignId,
      name,
      subject,
      template,
      recipients,
      personalizationData,
      status: 'created',
      createdAt: new Date(),
      sentEmails: [],
      metrics: {
        total: recipients.length,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0
      }
    };

    this.campaigns.set(campaignId, campaign);

    return {
      campaignId,
      status: 'created',
      recipientCount: recipients.length
    };
  }

  async sendCampaign({ campaignId, batchSize = 50 }) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status !== 'created') {
      throw new Error(\`Campaign status is \${campaign.status}, cannot send\`);
    }

    campaign.status = 'sending';
    const results = [];

    // Wysyłaj w partiach aby nie przeciążyć serwera SMTP
    for (let i = 0; i < campaign.recipients.length; i += batchSize) {
      const batch = campaign.recipients.slice(i, i + batchSize);

      const batchPromises = batch.map(async (recipient) => {
        const personalization = campaign.personalizationData[recipient] || {};

        try {
          const result = await this.sendPersonalizedEmail({
            to: recipient,
            subject: campaign.subject,
            template: campaign.template,
            personalization
          });

          campaign.sentEmails.push({
            recipient,
            messageId: result.messageId,
            sentAt: new Date(),
            status: 'sent'
          });

          campaign.metrics.sent++;

          return { recipient, status: 'sent', messageId: result.messageId };
        } catch (error) {
          return { recipient, status: 'failed', error: error.message };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Mała przerwa między partiami
      if (i + batchSize < campaign.recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    campaign.status = 'completed';

    return {
      campaignId,
      status: 'completed',
      totalSent: campaign.metrics.sent,
      totalFailed: results.filter(r => r.status === 'failed').length,
      results
    };
  }

  async analyzeCampaignPerformance({ campaignId }) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // W rzeczywistości dane o otwarciach i kliknięciach pochodziłyby z webhooków
    // lub śledzenia pixel w emailach
    const performance = {
      campaignId,
      name: campaign.name,
      metrics: campaign.metrics,
      rates: {
        deliveryRate: campaign.metrics.sent > 0 ? (campaign.metrics.delivered / campaign.metrics.sent) * 100 : 0,
        openRate: campaign.metrics.sent > 0 ? (campaign.metrics.opened / campaign.metrics.sent) * 100 : 0,
        clickRate: campaign.metrics.sent > 0 ? (campaign.metrics.clicked / campaign.metrics.sent) * 100 : 0
      },
      sentEmails: campaign.sentEmails
    };

    return performance;
  }

  renderTemplate(templateName, personalization) {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(\`Template \${templateName} not found\`);
    }

    // Prosta interpolacja zmiennych
    let html = template.html;
    for (const [key, value] of Object.entries(personalization)) {
      html = html.replace(new RegExp(\`\\\${{key}}\`, 'g'), value);
    }

    return html;
  }

  logEmailSend(emailData) {
    // W rzeczywistości zapisałoby to do bazy danych lub pliku log
    console.log('Email sent:', emailData);
  }

  // Metody do zarządzania szablonami
  addTemplate(name, html) {
    this.templates.set(name, { html, createdAt: new Date() });
  }

  removeTemplate(name) {
    return this.templates.delete(name);
  }

  listTemplates() {
    return Array.from(this.templates.keys());
  }
}

// Przykład szablonu
const welcomeTemplate = \`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Witamy w naszym sklepie!</title>
</head>
<body>
  <h1>Witamy \${firstName}!</h1>
  <p>Dziękujemy za rejestrację w naszym sklepie.</p>
  <p>Twój kod rabatowy: <strong>\${discountCode}</strong></p>
  <p>Skorzystaj z niego przy następnych zakupach!</p>
  <a href="\${shopUrl}">Odwiedź nasz sklep</a>
</body>
</html>
\`;

const server = new EmailMarketingServer({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS
});

// Dodaj przykładowy szablon
server.addTemplate('welcome', welcomeTemplate);

const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);`}
          language="javascript"
          title="Kompletny serwer MCP dla automatyzacji email marketingu"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Lekcje z Praktycznych Przykładow</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Modularność:</strong> Każdy serwer MCP powinien mieć jedną odpowiedzialność</li>
            <li>• <strong>Bezpieczeństwo:</strong> Zawsze waliduj dane wejściowe i ograniczaj uprawnienia</li>
            <li>• <strong>Obsługa błędów:</strong> Implementuj kompleksową obsługę błędów i logowanie</li>
            <li>• <strong>Skalowalność:</strong> Projektuj serwery z myślą o współbieżności i wydajności</li>
            <li>• <strong>Monitorowanie:</strong> Dodawaj metryki i alerty dla wszystkich krytycznych operacji</li>
            <li>• <strong>Dokumentacja:</strong> Szczegółowo dokumentuj narzędzia i ich parametry</li>
            <li>• <strong>Testowanie:</strong> Pokryj kod kompleksowymi testami przed wdrożeniem</li>
          </ul>
        </div>

        <h2>Podsumowanie Tutoriali MCP</h2>
        <p>
          Te praktyczne przykłady pokazują pełny potencjał protokołu MCP w rzeczywistych
          scenariuszach biznesowych. Od analizy treści wideo po automatyzację marketingu -
          MCP umożliwia agentom AI wykonywanie złożonych zadań w bezpieczny i kontrolowany sposób.
        </p>

        <p>
          Kluczowym wnioskiem jest to, że MCP nie tylko rozszerza możliwości agentów AI,
          ale także zapewnia bezpieczeństwo, niezawodność i łatwość integracji z istniejącymi systemami.
        </p>
      </motion.div>
    </div>
  );
}