"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BarChart3, AlertTriangle, Search, TrendingUp } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function MonitorowanieLogowaniePage() {
  const demoSteps = [
    {
      title: "Implementacja strukturalnego logowania",
      description: "Skonfiguruj system logowania z odpowiednią strukturą i poziomami.",
      code: `# Konfiguracja strukturalnego logowania w Python
import logging
import json
import sys
from datetime import datetime
from typing import Dict, Any, Optional
import structlog

# Konfiguracja structlog dla JSON logging
shared_processors = [
    structlog.stdlib.filter_by_level,
    structlog.stdlib.add_logger_name,
    structlog.stdlib.add_log_level,
    structlog.stdlib.PositionalArgumentsFormatter(),
    structlog.processors.TimeStamper(fmt="iso"),
    structlog.processors.StackInfoRenderer(),
    structlog.processors.format_exc_info,
    structlog.processors.UnicodeDecoder(),
]

# Formatter dla development (console)
console_formatter = structlog.WriteLoggerFactory()
console_processors = shared_processors + [
    structlog.processors.ExceptionPrettyPrinter(),
    structlog.processors.KeyValueRenderer(key_order=['timestamp', 'level', 'logger', 'event'])
]

# Formatter dla production (JSON)
json_formatter = structlog.WriteLoggerFactory()
json_processors = shared_processors + [
    structlog.processors.JSONRenderer()
]

# Konfiguracja root logger
logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            '()': structlog.stdlib.ProcessorFormatter,
            'processor': structlog.processors.JSONRenderer(),
            'foreign_pre_chain': console_processors,
        },
        'json': {
            '()': structlog.stdlib.ProcessorFormatter,
            'processor': structlog.processors.JSONRenderer(),
            'foreign_pre_chain': json_processors,
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console',
            'stream': sys.stdout,
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'workflow.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
            'formatter': 'json',
        }
    },
    'loggers': {
        'workflow': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        }
    }
})

# Utworzenie logger'a
logger = structlog.get_logger('workflow')`,
      result: "✅ Skonfigurowano strukturalne logowanie z obsługą JSON i rotacją plików."
    },
    {
      title: "Implementacja metryk i monitoringu",
      description: "Dodaj metryki wydajności i monitoring zdrowia systemu.",
      code: `# Implementacja metryk z Prometheus i monitoring
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time
import psutil
from typing import Dict, Any
import asyncio

class WorkflowMetrics:
    def __init__(self):
        # Liczniki zdarzeń
        self.tasks_started = Counter(
            'workflow_tasks_started_total',
            'Total number of tasks started',
            ['workflow_type', 'task_name']
        )

        self.tasks_completed = Counter(
            'workflow_tasks_completed_total',
            'Total number of tasks completed',
            ['workflow_type', 'task_name', 'status']
        )

        self.tasks_failed = Counter(
            'workflow_tasks_failed_total',
            'Total number of tasks failed',
            ['workflow_type', 'task_name', 'error_type']
        )

        # Histogramy czasu wykonania
        self.task_duration = Histogram(
            'workflow_task_duration_seconds',
            'Time spent executing tasks',
            ['workflow_type', 'task_name'],
            buckets=(0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0, 60.0, 300.0)
        )

        # Gauges dla stanu systemu
        self.active_tasks = Gauge(
            'workflow_active_tasks',
            'Number of currently active tasks',
            ['workflow_type']
        )

        self.queue_size = Gauge(
            'workflow_queue_size',
            'Current queue size',
            ['queue_name']
        )

        self.system_cpu = Gauge(
            'workflow_system_cpu_percent',
            'System CPU usage percentage'
        )

        self.system_memory = Gauge(
            'workflow_system_memory_percent',
            'System memory usage percentage'
        )

    def record_task_start(self, workflow_type: str, task_name: str):
        """Zarejestruj rozpoczęcie zadania"""
        self.tasks_started.labels(workflow_type, task_name).inc()
        self.active_tasks.labels(workflow_type).inc()

    def record_task_completion(self, workflow_type: str, task_name: str,
                             status: str, duration: float):
        """Zarejestruj zakończenie zadania"""
        self.tasks_completed.labels(workflow_type, task_name, status).inc()
        self.task_duration.labels(workflow_type, task_name).observe(duration)
        self.active_tasks.labels(workflow_type).dec()

    def record_task_failure(self, workflow_type: str, task_name: str,
                          error_type: str, duration: float):
        """Zarejestruj błąd zadania"""
        self.tasks_failed.labels(workflow_type, task_name, error_type).inc()
        self.task_duration.labels(workflow_type, task_name).observe(duration)
        self.active_tasks.labels(workflow_type).dec()

    def update_system_metrics(self):
        """Aktualizuj metryki systemowe"""
        self.system_cpu.set(psutil.cpu_percent())
        self.system_memory.set(psutil.virtual_memory().percent)

    def set_queue_size(self, queue_name: str, size: int):
        """Ustaw rozmiar kolejki"""
        self.queue_size.labels(queue_name).set(size)

class WorkflowMonitor:
    def __init__(self, metrics: WorkflowMetrics):
        self.metrics = metrics
        self.logger = structlog.get_logger('workflow.monitor')

    async def start_monitoring(self, port: int = 8000):
        """Uruchom serwer metryk Prometheus"""
        start_http_server(port)
        self.logger.info("Monitoring server started", port=port)

        # Uruchom zadanie aktualizacji metryk systemowych
        asyncio.create_task(self._system_metrics_updater())

    async def _system_metrics_updater(self):
        """Aktualizuj metryki systemowe co 30 sekund"""
        while True:
            try:
                self.metrics.update_system_metrics()
                await asyncio.sleep(30)
            except Exception as e:
                self.logger.error("Failed to update system metrics", error=str(e))

    async def monitor_task_execution(self, workflow_type: str, task_name: str):
        """Dekorator do monitorowania wykonania zadania"""
        def decorator(func):
            async def wrapper(*args, **kwargs):
                start_time = time.time()
                self.metrics.record_task_start(workflow_type, task_name)

                try:
                    result = await func(*args, **kwargs)
                    duration = time.time() - start_time
                    self.metrics.record_task_completion(
                        workflow_type, task_name, 'success', duration
                    )

                    self.logger.info(
                        "Task completed successfully",
                        workflow_type=workflow_type,
                        task_name=task_name,
                        duration=duration
                    )

                    return result

                except Exception as e:
                    duration = time.time() - start_time
                    error_type = type(e).__name__

                    self.metrics.record_task_failure(
                        workflow_type, task_name, error_type, duration
                    )

                    self.logger.error(
                        "Task failed",
                        workflow_type=workflow_type,
                        task_name=task_name,
                        error=str(e),
                        error_type=error_type,
                        duration=duration
                    )

                    raise e

            return wrapper
        return decorator

# Inicjalizacja monitoringu
metrics = WorkflowMetrics()
monitor = WorkflowMonitor(metrics)

# Przykład użycia
@monitor.monitor_task_execution('order_processing', 'validate_order')
async def validate_order(order_data: Dict[str, Any]) -> Dict[str, Any]:
    # Symulacja walidacji zamówienia
    await asyncio.sleep(0.1)  # Symulacja pracy

    if not order_data.get('customer_id'):
        raise ValueError("Missing customer_id")

    return {'status': 'valid', 'order_id': order_data['id']}

# Uruchomienie monitoringu
async def main():
    await monitor.start_monitoring()

    # Test wykonania zadania
    order_data = {'id': '123', 'customer_id': '456', 'amount': 100}
    result = await validate_order(order_data)
    print(f"Validation result: {result}")

if __name__ == "__main__":
    asyncio.run(main())`,
      result: "✅ Zaimplementowano kompleksowy system monitoringu z metrykami Prometheus."
    },
    {
      title: "Konfiguracja alertów i dashboard",
      description: "Skonfiguruj alerty i dashboard do monitorowania systemu w czasie rzeczywistym.",
      code: `# Konfiguracja alertów Prometheus i dashboard Grafana
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'workflow-service'
    static_configs:
      - targets: ['localhost:8000']

# alert_rules.yml
groups:
  - name: workflow_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(workflow_tasks_failed_total[5m]) / rate(workflow_tasks_started_total[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High task failure rate detected"
          description: "Task failure rate is {{ $value }}% over last 5 minutes"

      - alert: HighQueueSize
        expr: workflow_queue_size > 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Large queue size detected"
          description: "Queue size is {{ $value }} items"

      - alert: HighSystemCPU
        expr: workflow_system_cpu_percent > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"
          description: "System CPU usage is {{ $value }}%"

      - alert: SlowTaskExecution
        expr: histogram_quantile(0.95, rate(workflow_task_duration_seconds_bucket[5m])) > 30
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Slow task execution detected"
          description: "95th percentile task duration is {{ $value }}s"

# Dashboard JSON dla Grafana (fragment)
{
  "dashboard": {
    "title": "Workflow Monitoring Dashboard",
    "tags": ["workflow", "monitoring"],
    "timezone": "browser",
    "panels": [
      {
        "title": "Task Success Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "(1 - (rate(workflow_tasks_failed_total[1h]) / rate(workflow_tasks_started_total[1h]))) * 100",
            "legendFormat": "Success Rate %"
          }
        ]
      },
      {
        "title": "Active Tasks",
        "type": "gauge",
        "targets": [
          {
            "expr": "sum(workflow_active_tasks)",
            "legendFormat": "Active Tasks"
          }
        ]
      },
      {
        "title": "Task Duration Percentiles",
        "type": "heatmap",
        "targets": [
          {
            "expr": "rate(workflow_task_duration_seconds_bucket[5m])",
            "legendFormat": "{{ le }}"
          }
        ]
      },
      {
        "title": "System Resources",
        "type": "graph",
        "targets": [
          {
            "expr": "workflow_system_cpu_percent",
            "legendFormat": "CPU %"
          },
          {
            "expr": "workflow_system_memory_percent",
            "legendFormat": "Memory %"
          }
        ]
      },
      {
        "title": "Error Rate Over Time",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(workflow_tasks_failed_total[5m])",
            "legendFormat": "Errors/min"
          }
        ]
      }
    ]
  }
}`,
      result: "✅ Skonfigurowano alerty Prometheus i dashboard Grafana dla kompleksowego monitoringu."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/samouczki/przeplywy-pracy"
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
          <span>Przepływy Pracy</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>15 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Monitorowanie i Logowanie
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się implementować kompleksowe systemy monitorowania i logowania dla przepływów pracy.
          Dowiedz się, jak śledzić wydajność, wykrywać problemy i reagować na incydenty.
        </p>
      </motion.div>

      <ProgressIndicator
        current={3}
        total={5}
        labels={["Projektowanie", "Automatyzacja", "Monitorowanie", "Błędy", "Skalowanie"]}
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
            <BarChart3 className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Metryki Wydajności
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Śledź kluczowe wskaźniki wydajności przepływów pracy w czasie rzeczywistym.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <AlertTriangle className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Wykrywanie Problemów
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Wczesne wykrywanie i reagowanie na problemy w systemie workflow.
            </p>
          </div>
        </div>

        <h2>Dlaczego Monitorowanie jest Krytyczne?</h2>
        <p>
          W złożonych systemach workflow, problemy mogą występować w najmniej oczekiwanych miejscach.
          Bez odpowiedniego monitorowania, awarie mogą pozostać niewykryte przez godziny lub dni,
          powodując poważne konsekwencje biznesowe. Dobre monitorowanie pozwala na:
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Kluczowe Korzyści
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Monitorowanie zmniejsza czas wykrywania problemów (MTTD) o 80% i czas rozwiązywania
            problemów (MTTR) o 60%, znacząco poprawiając dostępność systemu.
          </p>
        </div>

        <h2>Poziomy Monitoringu</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Logowanie Aplikacyjne</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Szczegółowe logi z aplikacji, zawierające kontekst wykonania i błędy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Metryki Wydajności</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Czas wykonania, throughput, wykorzystanie zasobów, wskaźniki błędów.
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
                <h4 className="font-semibold text-gray-900 dark:text-white">Monitorowanie Infrastruktury</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zdrowie serwerów, baz danych, sieci i usług zewnętrznych.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Biznesowe KPI</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Metryki biznesowe jak konwersja, satysfakcja klientów, efektywność procesów.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Implementację Monitoringu w Działaniu"
          steps={demoSteps}
        />

        <h2>Strukturalne Logowanie</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-semibold">JSON</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Format Strukturalny</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Logi w formacie JSON umożliwiają łatwe przeszukiwanie i analizę.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-semibold">INFO</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Poziomy Logowania</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              DEBUG, INFO, WARNING, ERROR, CRITICAL - odpowiedni poziom dla każdej sytuacji.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Kontekst i Korelacja</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ID żądań i korelacji umożliwiają śledzenie przepływu przez cały system.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`# Zaawansowany system logowania z korelacją
import logging
import uuid
import contextvars
from typing import Dict, Any, Optional
import structlog

# Context variables dla korelacji
request_id: contextvars.ContextVar[Optional[str]] = contextvars.ContextVar('request_id', default=None)
workflow_id: contextvars.ContextVar[Optional[str]] = contextvars.ContextVar('workflow_id', default=None)
task_id: contextvars.ContextVar[Optional[str]] = contextvars.ContextVar('task_id', default=None)

class CorrelationFilter(logging.Filter):
    """Filtr dodający ID korelacji do wszystkich logów"""

    def filter(self, record):
        record.request_id = request_id.get()
        record.workflow_id = workflow_id.get()
        record.task_id = task_id.get()
        return True

class WorkflowLogger:
    def __init__(self, name: str):
        self.name = name
        self.logger = structlog.get_logger(name)

    def _get_correlation_data(self) -> Dict[str, Any]:
        """Pobierz dane korelacji z context variables"""
        return {
            'request_id': request_id.get(),
            'workflow_id': workflow_id.get(),
            'task_id': task_id.get(),
        }

    def info(self, event: str, **kwargs):
        """Loguj zdarzenie informacyjne"""
        correlation_data = self._get_correlation_data()
        self.logger.info(event, **correlation_data, **kwargs)

    def error(self, event: str, error: Exception = None, **kwargs):
        """Loguj błąd z pełnym kontekstem"""
        correlation_data = self._get_correlation_data()

        log_data = {
            **correlation_data,
            **kwargs,
            'error_type': type(error).__name__ if error else None,
            'error_message': str(error) if error else None,
        }

        if error:
            # Dodaj stack trace dla błędów
            import traceback
            log_data['stack_trace'] = traceback.format_exc()

        self.logger.error(event, **log_data)

    def performance(self, operation: str, duration_ms: float, **kwargs):
        """Loguj metryki wydajności"""
        correlation_data = self._get_correlation_data()
        self.logger.info(
            f"Performance: {operation}",
            **correlation_data,
            **kwargs,
            operation=operation,
            duration_ms=duration_ms,
            performance_metric=True
        )

class WorkflowContextManager:
    """Manager kontekstu dla workflow"""

    def __init__(self, workflow_type: str, initial_request_id: str = None):
        self.workflow_type = workflow_type
        self.request_id = initial_request_id or str(uuid.uuid4())
        self.workflow_id = str(uuid.uuid4())
        self.logger = WorkflowLogger(f'workflow.{workflow_type}')

    async def __aenter__(self):
        # Ustaw context variables
        request_id_token = request_id.set(self.request_id)
        workflow_id_token = workflow_id.set(self.workflow_id)

        self.logger.info(
            "Workflow started",
            workflow_type=self.workflow_type,
            event_type="workflow_start"
        )

        # Zwróć tuple z tokenami do cleanup
        return (request_id_token, workflow_id_token)

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.logger.error(
                "Workflow failed",
                error=exc_val,
                workflow_type=self.workflow_type,
                event_type="workflow_error"
            )
        else:
            self.logger.info(
                "Workflow completed",
                workflow_type=self.workflow_type,
                event_type="workflow_complete"
            )

        # Context variables są automatycznie czyszczone przy wyjściu z kontekstu

class TaskContextManager:
    """Manager kontekstu dla pojedynczych zadań"""

    def __init__(self, task_name: str, logger: WorkflowLogger):
        self.task_name = task_name
        self.logger = logger
        self.task_id = str(uuid.uuid4())
        self.start_time = None

    async def __aenter__(self):
        self.start_time = time.time()
        task_id_token = task_id.set(self.task_id)

        self.logger.info(
            f"Task started: {self.task_name}",
            task_name=self.task_name,
            event_type="task_start"
        )

        return task_id_token

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        duration = time.time() - self.start_time

        if exc_type:
            self.logger.error(
                f"Task failed: {self.task_name}",
                error=exc_val,
                task_name=self.task_name,
                duration_ms=duration * 1000,
                event_type="task_error"
            )
        else:
            self.logger.performance(
                f"task_execution.{self.task_name}",
                duration * 1000,
                task_name=self.task_name,
                event_type="task_complete"
            )

# Przykład użycia
async def process_order(order_data: Dict[str, Any]) -> Dict[str, Any]:
    async with WorkflowContextManager("order_processing") as workflow_ctx:
        logger = WorkflowLogger("order_processing")

        # Zadanie 1: Walidacja
        async with TaskContextManager("validate_order", logger):
            # Symulacja walidacji
            await asyncio.sleep(0.1)
            if not order_data.get('customer_id'):
                raise ValueError("Missing customer_id")

        # Zadanie 2: Przetwarzanie płatności
        async with TaskContextManager("process_payment", logger):
            # Symulacja przetwarzania płatności
            await asyncio.sleep(0.2)
            payment_result = {'status': 'approved', 'transaction_id': 'txn_123'}

        # Zadanie 3: Wysyłka potwierdzenia
        async with TaskContextManager("send_confirmation", logger):
            # Symulacja wysyłki email
            await asyncio.sleep(0.05)

        return {
            'status': 'completed',
            'order_id': order_data['id'],
            'payment': payment_result
        }

# Uruchomienie z przykładowymi danymi
async def main():
    order_data = {
        'id': 'order_456',
        'customer_id': 'cust_789',
        'amount': 99.99,
        'items': ['item1', 'item2']
    }

    try:
        result = await process_order(order_data)
        print(f"Order processed: {result}")
    except Exception as e:
        print(f"Order processing failed: {e}")

if __name__ == "__main__":
    asyncio.run(main())`}
          language="python"
          title="Zaawansowany system logowania z korelacją i kontekstem"
        />

        <h2>Metryki i Alerty</h2>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Metryki Techniczne</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Czas odpowiedzi, throughput, wykorzystanie CPU/pamięci, błędy na minutę.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Metryki Biznesowe</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Liczba przetworzonych zamówień, wartość transakcji, satysfakcja klientów.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Alerty Krytyczne</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wysoki współczynnik błędów, niedostępność usług, przekroczenie progów.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Search className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Analiza Trendów</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Identyfikacja wzorców, predykcja problemów, optymalizacja wydajności.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Najlepsze Praktyki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Loguj wszystko:</strong> Każdy krok workflow powinien być zalogowany z pełnym kontekstem</li>
            <li>• <strong>Używaj ID korelacji:</strong> Umożliwia śledzenie przepływu przez cały system rozproszony</li>
            <li>• <strong>Implementuj metryki proaktywnie:</strong> Dodawaj metryki podczas developmentu, nie po wystąpieniu problemów</li>
            <li>• <strong>Konfiguruj alerty mądre:</strong> Unikaj fałszywych alarmów, ale nie przegap krytycznych problemów</li>
            <li>• <strong>Monitoruj trendy:</strong> Analizuj dane historyczne aby przewidywać i zapobiegać problemom</li>
            <li>• <strong>Przechowuj logi długo:</strong> Zachowaj możliwość analizy problemów z ostatnich miesięcy</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Kompleksowe monitorowanie i logowanie to podstawa niezawodności systemów workflow.
          Dobrze zaprojektowany system monitoringu pozwala nie tylko na szybkie wykrywanie problemów,
          ale także na optymalizację wydajności i lepsze zrozumienie zachowania systemu.
          Pamiętaj, że monitoring to inwestycja, która wielokrotnie się zwraca poprzez
          zmniejszenie downtime'u i poprawę doświadczenia użytkowników.
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
          href="/samouczki/przeplywy-pracy/automatyzacja-procesow"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ← Poprzedni Tutorial: Automatyzacja Procesów
        </Link>
        <Link
          href="/samouczki/przeplywy-pracy/obsluga-bledow"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Obsługa Błędów →
        </Link>
      </motion.div>
    </div>
  );
}