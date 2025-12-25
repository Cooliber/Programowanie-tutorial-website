"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, AlertTriangle, RefreshCw, Shield, Zap } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function ObslugaBledowPage() {
  const demoSteps = [
    {
      title: "Implementacja podstawowych strategii obsługi błędów",
      description: "Skonfiguruj podstawowe mechanizmy obsługi błędów z różnymi strategiami retry.",
      code: `# Implementacja strategii obsługi błędów
import asyncio
import random
import time
from typing import Dict, Any, Callable, Optional, Union
from dataclasses import dataclass
from enum import Enum
import structlog

logger = structlog.get_logger('workflow.errors')

class RetryStrategy(Enum):
    IMMEDIATE = "immediate"
    LINEAR_BACKOFF = "linear_backoff"
    EXPONENTIAL_BACKOFF = "exponential_backoff"
    CUSTOM = "custom"

class ErrorType(Enum):
    NETWORK_ERROR = "network_error"
    VALIDATION_ERROR = "validation_error"
    BUSINESS_LOGIC_ERROR = "business_logic_error"
    EXTERNAL_SERVICE_ERROR = "external_service_error"
    SYSTEM_ERROR = "system_error"

@dataclass
class RetryConfig:
    max_attempts: int = 3
    strategy: RetryStrategy = RetryStrategy.EXPONENTIAL_BACKOFF
    base_delay: float = 1.0
    max_delay: float = 60.0
    jitter: bool = True
    retryable_errors: tuple = (Exception,)

@dataclass
class ErrorContext:
    error_type: ErrorType
    error_message: str
    attempt: int
    max_attempts: int
    task_name: str
    workflow_id: str
    timestamp: float

class ErrorHandler:
    def __init__(self, config: RetryConfig):
        self.config = config
        self.logger = logger

    def calculate_delay(self, attempt: int) -> float:
        """Oblicz opóźnienie dla danego podejścia"""
        if self.config.strategy == RetryStrategy.IMMEDIATE:
            return 0.0
        elif self.config.strategy == RetryStrategy.LINEAR_BACKOFF:
            delay = self.config.base_delay * attempt
        elif self.config.strategy == RetryStrategy.EXPONENTIAL_BACKOFF:
            delay = self.config.base_delay * (2 ** (attempt - 1))
        else:
            delay = self.config.base_delay

        # Ogranicz maksymalne opóźnienie
        delay = min(delay, self.config.max_delay)

        # Dodaj jitter aby uniknąć thundering herd
        if self.config.jitter:
            delay = delay * (0.5 + random.random() * 0.5)

        return delay

    def is_retryable_error(self, error: Exception) -> bool:
        """Sprawdź czy błąd można ponowić"""
        return isinstance(error, self.config.retryable_errors)

    def should_retry(self, error: Exception, attempt: int) -> bool:
        """Zdecyduj czy ponowić próbę"""
        if attempt >= self.config.max_attempts:
            return False

        if not self.is_retryable_error(error):
            return False

        # Specyficzne reguły dla różnych typów błędów
        if isinstance(error, ConnectionError):
            return True  # Zawsze ponawiaj błędy połączenia
        elif isinstance(error, TimeoutError):
            return attempt < 2  # Maksymalnie 2 próby dla timeout
        elif isinstance(error, ValueError):
            return False  # Błędy walidacji nie są retryable

        return True

    async def execute_with_retry(self, func: Callable, *args, **kwargs) -> Any:
        """Wykonaj funkcję z obsługą retry"""
        attempt = 0
        last_error = None

        while attempt < self.config.max_attempts:
            attempt += 1

            try:
                result = await func(*args, **kwargs)
                if attempt > 1:
                    self.logger.info(
                        "Task succeeded after retry",
                        attempt=attempt,
                        task_name=getattr(func, '__name__', 'unknown')
                    )
                return result

            except Exception as e:
                last_error = e
                error_context = ErrorContext(
                    error_type=self._classify_error(e),
                    error_message=str(e),
                    attempt=attempt,
                    max_attempts=self.config.max_attempts,
                    task_name=getattr(func, '__name__', 'unknown'),
                    workflow_id="workflow_123",  # W rzeczywistości z kontekstu
                    timestamp=time.time()
                )

                self.logger.warning(
                    "Task failed, considering retry",
                    error=str(e),
                    error_type=error_context.error_type.value,
                    attempt=attempt,
                    max_attempts=self.config.max_attempts
                )

                if not self.should_retry(e, attempt):
                    break

                delay = self.calculate_delay(attempt)
                self.logger.info(
                    "Retrying task after delay",
                    delay=delay,
                    attempt=attempt
                )

                await asyncio.sleep(delay)

        # Wszystkie próby wyczerpane
        self.logger.error(
            "Task failed permanently after all retries",
            final_error=str(last_error),
            total_attempts=attempt
        )
        raise last_error

    def _classify_error(self, error: Exception) -> ErrorType:
        """Klasyfikuj błąd do odpowiedniej kategorii"""
        if isinstance(error, (ConnectionError, TimeoutError)):
            return ErrorType.NETWORK_ERROR
        elif isinstance(error, ValueError):
            return ErrorType.VALIDATION_ERROR
        elif isinstance(error, RuntimeError):
            return ErrorType.BUSINESS_LOGIC_ERROR
        else:
            return ErrorType.SYSTEM_ERROR

# Konfiguracja różnych strategii retry
default_config = RetryConfig(
    max_attempts=3,
    strategy=RetryStrategy.EXPONENTIAL_BACKOFF,
    base_delay=1.0,
    max_delay=30.0
)

aggressive_config = RetryConfig(
    max_attempts=5,
    strategy=RetryStrategy.LINEAR_BACKOFF,
    base_delay=0.5,
    max_delay=10.0
)

conservative_config = RetryConfig(
    max_attempts=2,
    strategy=RetryStrategy.IMMEDIATE,
    base_delay=0.0
)

# Przykład użycia
async def unreliable_api_call(url: str) -> Dict[str, Any]:
    """Symulacja zawodnego wywołania API"""
    if random.random() < 0.7:  # 70% szans na błąd
        if random.random() < 0.5:
            raise ConnectionError("Network timeout")
        else:
            raise TimeoutError("Request timeout")

    return {"status": "success", "data": {"result": "ok"}}

async def main():
    handler = ErrorHandler(default_config)

    print("Testing error handling with different scenarios...")

    # Test 1: Funkcja kończy się sukcesem po kilku próbach
    try:
        result = await handler.execute_with_retry(unreliable_api_call, "https://api.example.com")
        print(f"✅ Success: {result}")
    except Exception as e:
        print(f"❌ Failed: {e}")

    # Test 2: Funkcja zawsze kończy się błędem
    async def always_fails():
        raise ValueError("This always fails")

    try:
        result = await handler.execute_with_retry(always_fails)
        print(f"✅ Success: {result}")
    except Exception as e:
        print(f"❌ Failed as expected: {e}")

if __name__ == "__main__":
    asyncio.run(main())`,
      result: "✅ Zaimplementowano podstawowe strategie obsługi błędów z mechanizmami retry."
    },
    {
      title: "Implementacja circuit breaker i fallback",
      description: "Dodaj circuit breaker do ochrony przed kaskadowymi błędami i mechanizmy fallback.",
      code: `# Implementacja Circuit Breaker i Fallback
import asyncio
import time
from typing import Dict, Any, Callable, Optional, Union
from dataclasses import dataclass
from enum import Enum
import structlog

logger = structlog.get_logger('workflow.circuit_breaker')

class CircuitState(Enum):
    CLOSED = "closed"      # Normalna operacja
    OPEN = "open"         # Circuit otwarty - wszystkie wywołania kończą się błędem
    HALF_OPEN = "half_open"  # Testowanie czy usługa wróciła do życia

@dataclass
class CircuitBreakerConfig:
    failure_threshold: int = 5      # Liczba błędów przed otwarciem
    recovery_timeout: float = 60.0  # Czas przed próbą odzyskania
    success_threshold: int = 3      # Liczba sukcesów potrzebnych do zamknięcia
    timeout: float = 10.0           # Timeout dla pojedynczego wywołania

@dataclass
class CircuitMetrics:
    total_calls: int = 0
    successful_calls: int = 0
    failed_calls: int = 0
    consecutive_failures: int = 0
    consecutive_successes: int = 0
    last_failure_time: Optional[float] = None
    last_success_time: Optional[float] = None

class CircuitBreaker:
    def __init__(self, name: str, config: CircuitBreakerConfig):
        self.name = name
        self.config = config
        self.state = CircuitState.CLOSED
        self.metrics = CircuitMetrics()
        self.logger = logger.bind(circuit_breaker=name)

    def _should_attempt_reset(self) -> bool:
        """Sprawdź czy należy spróbować resetować circuit"""
        if self.state != CircuitState.OPEN:
            return False

        if self.metrics.last_failure_time is None:
            return True

        return time.time() - self.metrics.last_failure_time >= self.config.recovery_timeout

    def _record_success(self):
        """Zarejestruj udane wywołanie"""
        self.metrics.total_calls += 1
        self.metrics.successful_calls += 1
        self.metrics.consecutive_failures = 0
        self.metrics.consecutive_successes += 1
        self.metrics.last_success_time = time.time()

        # Jeśli jesteśmy w HALF_OPEN i mamy wystarczająco dużo sukcesów, zamknij circuit
        if self.state == CircuitState.HALF_OPEN and self.metrics.consecutive_successes >= self.config.success_threshold:
            self.state = CircuitState.CLOSED
            self.logger.info("Circuit breaker closed - service recovered")

    def _record_failure(self):
        """Zarejestruj nieudane wywołanie"""
        self.metrics.total_calls += 1
        self.metrics.failed_calls += 1
        self.metrics.consecutive_failures += 1
        self.metrics.consecutive_successes = 0
        self.metrics.last_failure_time = time.time()

        # Jeśli mamy wystarczająco dużo kolejnych błędów, otwórz circuit
        if self.state == CircuitState.CLOSED and self.metrics.consecutive_failures >= self.config.failure_threshold:
            self.state = CircuitState.OPEN
            self.logger.warning(
                "Circuit breaker opened",
                consecutive_failures=self.metrics.consecutive_failures
            )

    async def call(self, func: Callable, *args, **kwargs) -> Any:
        """Wywołaj funkcję przez circuit breaker"""
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
                self.logger.info("Circuit breaker attempting reset")
            else:
                raise CircuitBreakerOpenException(
                    f"Circuit breaker '{self.name}' is OPEN - service unavailable"
                )

        try:
            # Wykonaj wywołanie z timeout
            result = await asyncio.wait_for(
                func(*args, **kwargs),
                timeout=self.config.timeout
            )
            self._record_success()
            return result

        except Exception as e:
            self._record_failure()

            # Jeśli jesteśmy w HALF_OPEN, wróć do OPEN przy pierwszym błędzie
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.OPEN
                self.logger.warning("Circuit breaker reset failed, returning to OPEN")

            raise e

    def get_status(self) -> Dict[str, Any]:
        """Pobierz status circuit breaker"""
        return {
            'name': self.name,
            'state': self.state.value,
            'metrics': {
                'total_calls': self.metrics.total_calls,
                'successful_calls': self.metrics.successful_calls,
                'failed_calls': self.metrics.failed_calls,
                'success_rate': self.metrics.successful_calls / max(self.metrics.total_calls, 1),
                'consecutive_failures': self.metrics.consecutive_failures,
                'consecutive_successes': self.metrics.consecutive_successes,
            }
        }

class CircuitBreakerOpenException(Exception):
    """Wyjątek rzucany gdy circuit breaker jest otwarty"""
    pass

class FallbackHandler:
    def __init__(self, circuit_breaker: CircuitBreaker):
        self.circuit_breaker = circuit_breaker
        self.fallbacks: Dict[str, Callable] = {}

    def register_fallback(self, service_name: str, fallback_func: Callable):
        """Zarejestruj funkcję fallback dla usługi"""
        self.fallbacks[service_name] = fallback_func

    async def call_with_fallback(self, service_name: str, func: Callable, *args, **kwargs) -> Any:
        """Wywołaj funkcję z fallback w przypadku błędu"""
        try:
            return await self.circuit_breaker.call(func, *args, **kwargs)
        except Exception as e:
            if service_name in self.fallbacks:
                self.logger.warning(
                    "Using fallback due to error",
                    service=service_name,
                    error=str(e)
                )
                return await self.fallbacks[service_name](*args, **kwargs)
            else:
                raise e

# Implementacja fallback functions
async def payment_service_fallback(amount: float, card_details: Dict[str, Any]) -> Dict[str, Any]:
    """Fallback dla płatności - zapis do kolejki do ręcznego przetworzenia"""
    logger.warning("Payment failed, queuing for manual processing", amount=amount)
    # Zapisz do bazy danych do ręcznego przetworzenia
    return {
        'status': 'queued',
        'message': 'Payment queued for manual processing',
        'manual_review_required': True
    }

async def email_service_fallback(recipient: str, subject: str, body: str) -> Dict[str, Any]:
    """Fallback dla email - zapis do pliku log"""
    logger.warning("Email service failed, logging message", recipient=recipient)
    # Zapisz email do pliku do późniejszego wysłania
    with open(f'pending_emails_{int(time.time())}.txt', 'w') as f:
        f.write(f"To: {recipient}\nSubject: {subject}\n\n{body}")
    return {'status': 'logged', 'message': 'Email logged for later sending'}

async def inventory_service_fallback(product_id: str, quantity: int) -> Dict[str, Any]:
    """Fallback dla inwentarza - przyjmij zamówienie z ostrzeżeniem"""
    logger.warning("Inventory check failed, proceeding with warning", product_id=product_id)
    return {
        'status': 'proceed_with_warning',
        'message': 'Inventory status unknown, order accepted with manual verification required',
        'manual_verification_required': True
    }

# Konfiguracja circuit breakers dla różnych usług
payment_circuit = CircuitBreaker("payment_service", CircuitBreakerConfig(
    failure_threshold=3,
    recovery_timeout=30.0,
    timeout=5.0
))

email_circuit = CircuitBreaker("email_service", CircuitBreakerConfig(
    failure_threshold=5,
    recovery_timeout=60.0,
    timeout=3.0
))

inventory_circuit = CircuitBreaker("inventory_service", CircuitBreakerConfig(
    failure_threshold=2,
    recovery_timeout=15.0,
    timeout=2.0
))

# Konfiguracja fallback handler
fallback_handler = FallbackHandler(payment_circuit)
fallback_handler.register_fallback('payment', payment_service_fallback)
fallback_handler.register_fallback('email', email_service_fallback)
fallback_handler.register_fallback('inventory', inventory_service_fallback)

# Przykład użycia w workflow zamówienia
async def process_order_with_resilience(order_data: Dict[str, Any]) -> Dict[str, Any]:
    """Przetwórz zamówienie z pełną odpornością na błędy"""
    logger.info("Starting resilient order processing", order_id=order_data['id'])

    # Krok 1: Sprawdź dostępność (z fallback)
    inventory_result = await fallback_handler.call_with_fallback(
        'inventory',
        check_inventory,
        order_data['product_id'],
        order_data['quantity']
    )

    # Krok 2: Przetwórz płatność (z fallback)
    payment_result = await fallback_handler.call_with_fallback(
        'payment',
        process_payment,
        order_data['amount'],
        order_data['card_details']
    )

    # Krok 3: Wyślij potwierdzenie (z fallback)
    email_result = await fallback_handler.call_with_fallback(
        'email',
        send_confirmation_email,
        order_data['customer_email'],
        f"Order {order_data['id']} Confirmed",
        f"Your order has been processed. Payment status: {payment_result['status']}"
    )

    return {
        'order_id': order_data['id'],
        'status': 'processed',
        'inventory': inventory_result,
        'payment': payment_result,
        'email': email_result
    }

# Symulacja usług (mogą kończyć się błędem)
async def check_inventory(product_id: str, quantity: int) -> Dict[str, Any]:
    await asyncio.sleep(0.1)
    if random.random() < 0.2:  # 20% szans na błąd
        raise ConnectionError("Inventory service unavailable")
    return {'status': 'available', 'product_id': product_id}

async def process_payment(amount: float, card_details: Dict[str, Any]) -> Dict[str, Any]:
    await asyncio.sleep(0.2)
    if random.random() < 0.3:  # 30% szans na błąd
        raise TimeoutError("Payment gateway timeout")
    return {'status': 'approved', 'transaction_id': f'txn_{random.randint(1000,9999)}'}

async def send_confirmation_email(recipient: str, subject: str, body: str) -> Dict[str, Any]:
    await asyncio.sleep(0.05)
    if random.random() < 0.1:  # 10% szans na błąd
        raise Exception("SMTP server error")
    return {'status': 'sent', 'recipient': recipient}

async def main():
    # Testuj przetwarzanie zamówienia z różnymi scenariuszami błędów
    order_data = {
        'id': 'order_123',
        'product_id': 'prod_456',
        'quantity': 2,
        'amount': 99.99,
        'card_details': {'number': '4111111111111111', 'expiry': '12/25'},
        'customer_email': 'customer@example.com'
    }

    try:
        result = await process_order_with_resilience(order_data)
        print(f"✅ Order processed successfully: {result}")
    except Exception as e:
        print(f"❌ Order processing failed: {e}")

    # Wyświetl status circuit breakers
    print("\\nCircuit Breaker Status:")
    for cb in [payment_circuit, email_circuit, inventory_circuit]:
        status = cb.get_status()
        print(f"{status['name']}: {status['state']} "
              f"(success rate: {status['metrics']['success_rate']:.2%})")

if __name__ == "__main__":
    asyncio.run(main())`,
      result: "✅ Zaimplementowano circuit breaker i mechanizmy fallback dla odporności na błędy."
    },
    {
      title: "Implementacja kompleksowej strategii recovery",
      description: "Stwórz kompleksowy system recovery z kompensacją, saga pattern i monitoringiem.",
      code: `# Kompleksowa strategia recovery z Saga Pattern
import asyncio
import json
from typing import Dict, Any, List, Callable, Optional, Union
from dataclasses import dataclass
from enum import Enum
import structlog

logger = structlog.get_logger('workflow.saga')

class SagaState(Enum):
    STARTED = "started"
    COMPENSATING = "compensating"
    COMPLETED = "completed"
    FAILED = "failed"

class SagaStepStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    COMPENSATING = "compensating"
    COMPENSATED = "compensated"
    FAILED = "failed"

@dataclass
class SagaStep:
    name: str
    execute_func: Callable
    compensate_func: Optional[Callable] = None
    status: SagaStepStatus = SagaStepStatus.PENDING
    result: Optional[Any] = None
    error: Optional[Exception] = None
    compensation_result: Optional[Any] = None

@dataclass
class SagaContext:
    saga_id: str
    steps: List[SagaStep]
    state: SagaState = SagaState.STARTED
    current_step: int = 0
    start_time: float = 0.0
    end_time: Optional[float] = None

class SagaOrchestrator:
    def __init__(self, saga_id: str):
        self.context = SagaContext(
            saga_id=saga_id,
            steps=[],
            start_time=time.time()
        )
        self.logger = logger.bind(saga_id=saga_id)

    def add_step(self, name: str, execute_func: Callable, compensate_func: Optional[Callable] = None):
        """Dodaj krok do sagi"""
        step = SagaStep(
            name=name,
            execute_func=execute_func,
            compensate_func=compensate_func
        )
        self.context.steps.append(step)

    async def execute(self) -> Dict[str, Any]:
        """Wykonaj sagę"""
        self.logger.info("Starting saga execution", step_count=len(self.context.steps))

        try:
            # Faza wykonania
            for i, step in enumerate(self.context.steps):
                self.context.current_step = i
                step.status = SagaStepStatus.RUNNING

                self.logger.info("Executing saga step", step_name=step.name, step_index=i)

                try:
                    step.result = await step.execute_func()
                    step.status = SagaStepStatus.COMPLETED
                    self.logger.info("Saga step completed", step_name=step.name, result=step.result)

                except Exception as e:
                    step.error = e
                    step.status = SagaStepStatus.FAILED
                    self.logger.error("Saga step failed", step_name=step.name, error=str(e))

                    # Rozpocznij kompensację
                    await self._compensate()
                    self.context.state = SagaState.FAILED
                    self.context.end_time = time.time()
                    return self._get_result()

            # Wszystkie kroki zakończone sukcesem
            self.context.state = SagaState.COMPLETED
            self.context.end_time = time.time()
            self.logger.info("Saga completed successfully")
            return self._get_result()

        except Exception as e:
            self.logger.error("Saga execution failed with unexpected error", error=str(e))
            await self._compensate()
            self.context.state = SagaState.FAILED
            self.context.end_time = time.time()
            return self._get_result()

    async def _compensate(self):
        """Wykonaj kompensację dla wszystkich zakończonych kroków"""
        self.context.state = SagaState.COMPENSATING
        self.logger.info("Starting saga compensation")

        # Kompensuj w odwrotnej kolejności
        for step in reversed(self.context.steps):
            if step.status == SagaStepStatus.COMPLETED and step.compensate_func:
                step.status = SagaStepStatus.COMPENSATING
                self.logger.info("Compensating saga step", step_name=step.name)

                try:
                    step.compensation_result = await step.compensate_func(step.result)
                    step.status = SagaStepStatus.COMPENSATED
                    self.logger.info("Saga step compensation completed", step_name=step.name)

                except Exception as e:
                    step.status = SagaStepStatus.FAILED
                    self.logger.error("Saga step compensation failed", step_name=step.name, error=str(e))
                    # Kontynuuj kompensację nawet jeśli jedna się nie powiedzie

        self.logger.info("Saga compensation completed")

    def _get_result(self) -> Dict[str, Any]:
        """Pobierz wynik wykonania sagi"""
        return {
            'saga_id': self.context.saga_id,
            'state': self.context.state.value,
            'duration': (self.context.end_time or time.time()) - self.context.start_time,
            'steps': [
                {
                    'name': step.name,
                    'status': step.status.value,
                    'result': step.result,
                    'error': str(step.error) if step.error else None,
                    'compensation_result': step.compensation_result
                }
                for step in self.context.steps
            ]
        }

# Implementacja przykładowej sagi zamówienia
class OrderSaga:
    def __init__(self, order_data: Dict[str, Any]):
        self.order_data = order_data
        self.saga_id = f"order_saga_{order_data['id']}"

    async def create_saga(self) -> SagaOrchestrator:
        """Utwórz sagę dla przetwarzania zamówienia"""
        saga = SagaOrchestrator(self.saga_id)

        # Krok 1: Rezerwacja produktów w magazynie
        saga.add_step(
            "reserve_inventory",
            lambda: self.reserve_inventory(),
            lambda result: self.release_inventory(result)
        )

        # Krok 2: Autoryzacja płatności
        saga.add_step(
            "authorize_payment",
            lambda: self.authorize_payment(),
            lambda result: self.cancel_payment_authorization(result)
        )

        # Krok 3: Utworzenie zamówienia
        saga.add_step(
            "create_order",
            lambda: self.create_order(),
            lambda result: self.cancel_order(result)
        )

        # Krok 4: Wysyłka potwierdzenia
        saga.add_step(
            "send_confirmation",
            lambda: self.send_confirmation(),
            None  # Brak kompensacji - email nie wymaga cofania
        )

        return saga

    async def reserve_inventory(self) -> Dict[str, Any]:
        """Zarezerwuj produkty w magazynie"""
        # Symulacja wywołania API magazynu
        await asyncio.sleep(0.1)
        if random.random() < 0.1:  # 10% szans na błąd
            raise Exception("Inventory reservation failed - insufficient stock")

        reservation_id = f"res_{random.randint(1000,9999)}"
        self.logger.info("Inventory reserved", reservation_id=reservation_id)
        return {'reservation_id': reservation_id}

    async def release_inventory(self, reservation_result: Dict[str, Any]):
        """Zwolnij rezerwację magazynu"""
        reservation_id = reservation_result['reservation_id']
        # Symulacja zwolnienia rezerwacji
        await asyncio.sleep(0.05)
        self.logger.info("Inventory reservation released", reservation_id=reservation_id)
        return {'status': 'released'}

    async def authorize_payment(self) -> Dict[str, Any]:
        """Autoryzuj płatność"""
        await asyncio.sleep(0.2)
        if random.random() < 0.15:  # 15% szans na błąd
            raise Exception("Payment authorization failed - card declined")

        auth_id = f"auth_{random.randint(1000,9999)}"
        self.logger.info("Payment authorized", auth_id=auth_id)
        return {'authorization_id': auth_id}

    async def cancel_payment_authorization(self, auth_result: Dict[str, Any]):
        """Anuluj autoryzację płatności"""
        auth_id = auth_result['authorization_id']
        await asyncio.sleep(0.1)
        self.logger.info("Payment authorization cancelled", auth_id=auth_id)
        return {'status': 'cancelled'}

    async def create_order(self) -> Dict[str, Any]:
        """Utwórz zamówienie"""
        await asyncio.sleep(0.1)
        if random.random() < 0.05:  # 5% szans na błąd
            raise Exception("Order creation failed - database error")

        order_id = f"order_{random.randint(1000,9999)}"
        self.logger.info("Order created", order_id=order_id)
        return {'order_id': order_id}

    async def cancel_order(self, order_result: Dict[str, Any]):
        """Anuluj zamówienie"""
        order_id = order_result['order_id']
        await asyncio.sleep(0.05)
        self.logger.info("Order cancelled", order_id=order_id)
        return {'status': 'cancelled'}

    async def send_confirmation(self) -> Dict[str, Any]:
        """Wyślij potwierdzenie"""
        await asyncio.sleep(0.05)
        if random.random() < 0.08:  # 8% szans na błąd
            raise Exception("Email sending failed - SMTP error")

        self.logger.info("Confirmation email sent", email=self.order_data['customer_email'])
        return {'status': 'sent'}

# Klasa do zarządzania wieloma sagami
class SagaManager:
    def __init__(self):
        self.active_sagas: Dict[str, SagaOrchestrator] = {}
        self.completed_sagas: Dict[str, Dict[str, Any]] = {}

    async def execute_order_saga(self, order_data: Dict[str, Any]) -> Dict[str, Any]:
        """Wykonaj sagę zamówienia"""
        order_saga = OrderSaga(order_data)
        saga_orchestrator = await order_saga.create_saga()

        saga_id = saga_orchestrator.context.saga_id
        self.active_sagas[saga_id] = saga_orchestrator

        try:
            result = await saga_orchestrator.execute()
            self.completed_sagas[saga_id] = result
            del self.active_sagas[saga_id]
            return result
        except Exception as e:
            self.logger.error("Saga execution failed", saga_id=saga_id, error=str(e))
            if saga_id in self.active_sagas:
                del self.active_sagas[saga_id]
            raise e

    def get_saga_status(self, saga_id: str) -> Optional[Dict[str, Any]]:
        """Pobierz status sagi"""
        if saga_id in self.active_sagas:
            return self.active_sagas[saga_id]._get_result()
        elif saga_id in self.completed_sagas:
            return self.completed_sagas[saga_id]
        return None

# Przykład użycia
async def main():
    manager = SagaManager()

    # Testuj różne scenariusze zamówień
    test_orders = [
        {
            'id': 'order_001',
            'customer_email': 'customer1@example.com',
            'items': [{'product_id': 'prod_1', 'quantity': 2}]
        },
        {
            'id': 'order_002',
            'customer_email': 'customer2@example.com',
            'items': [{'product_id': 'prod_2', 'quantity': 1}]
        }
    ]

    for order_data in test_orders:
        print(f"\\nProcessing order: {order_data['id']}")

        try:
            result = await manager.execute_order_saga(order_data)
            print(f"✅ Saga result: {result['state']}")

            # Wyświetl szczegóły kroków
            for step in result['steps']:
                status_icon = "✅" if step['status'] == 'completed' else "❌" if step['status'] == 'failed' else "🔄"
                print(f"  {status_icon} {step['name']}: {step['status']}")

        except Exception as e:
            print(f"❌ Saga failed: {e}")

    print("\\nSaga execution completed.")

if __name__ == "__main__":
    asyncio.run(main())`,
      result: "✅ Zaimplementowano kompleksową strategię recovery z Saga Pattern i kompensacją."
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
            <span>14 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Obsługa Błędów
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się implementować kompleksowe strategie obsługi błędów w przepływach pracy.
          Dowiedz się, jak tworzyć odporne systemy z mechanizmami retry, circuit breaker i recovery.
        </p>
      </motion.div>

      <ProgressIndicator
        current={4}
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
            <RefreshCw className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Strategie Retry
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Inteligentne ponawianie operacji w przypadku przejściowych błędów.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Shield className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Odporność Systemu
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Mechanizmy chroniące system przed kaskadowymi awariami i utratą danych.
            </p>
          </div>
        </div>

        <h2>Dlaczego Obsługa Błędów jest Krytyczna?</h2>
        <p>
          W złożonych systemach workflow błędy są nieuniknione. Mogą wynikać z problemów z siecią,
          awarii usług zewnętrznych, błędów w danych lub problemów infrastrukturalnych. Bez odpowiedniej
          obsługi błędów, pojedynczy błąd może spowodować kaskadowe awarie całego systemu.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Koszty Błędów
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Niewłaściwa obsługa błędów może kosztować firmy miliony dolarów w postaci utraconych transakcji,
            uszkodzonej reputacji i kosztów naprawy. Dobrze zaprojektowana obsługa błędów może zmniejszyć
            wpływ awarii o 90%.
          </p>
        </div>

        <h2>Strategie Obsługi Błędów</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Retry z Backoff</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatyczne ponawianie operacji z rosnącymi odstępami czasu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Circuit Breaker</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ochrona przed kaskadowymi błędami poprzez tymczasowe zatrzymanie wywołań.
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
                <h4 className="font-semibold text-gray-900 dark:text-white">Fallback</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alternatywne ścieżki wykonania gdy podstawowa operacja zawiedzie.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Saga Pattern</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zarządzanie transakcjami rozproszonymi z kompensacją.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Implementację Obsługi Błędów w Działaniu"
          steps={demoSteps}
        />

        <h2>Implementacja Retry Strategies</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-semibold">→</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Immediate</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Natychmiastowe ponawianie bez opóźnienia.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-semibold">↗</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Linear Backoff</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stały wzrost opóźnienia między próbami.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-semibold">↗↗</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Exponential Backoff</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wykładniczy wzrost opóźnienia dla uniknięcia przeciążenia.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`# Klasyfikacja błędów i strategie obsługi
from typing import Dict, Type, Callable, Any
import asyncio
import random

class ErrorClassifier:
    \"\"\"Klasyfikuje błędy i określa strategie obsługi\"\"\"

    def __init__(self):
        self.error_strategies: Dict[Type[Exception], Dict[str, Any]] = {
            ConnectionError: {
                'category': 'network',
                'retryable': True,
                'max_attempts': 5,
                'backoff_strategy': 'exponential',
                'base_delay': 1.0,
                'circuit_breaker': True
            },
            TimeoutError: {
                'category': 'network',
                'retryable': True,
                'max_attempts': 3,
                'backoff_strategy': 'linear',
                'base_delay': 2.0,
                'circuit_breaker': True
            },
            ValueError: {
                'category': 'validation',
                'retryable': False,
                'max_attempts': 1,
                'fallback': 'manual_review'
            },
            RuntimeError: {
                'category': 'business_logic',
                'retryable': False,
                'max_attempts': 1,
                'compensate': True
            },
            Exception: {  # Default
                'category': 'unknown',
                'retryable': True,
                'max_attempts': 2,
                'backoff_strategy': 'immediate',
                'circuit_breaker': False
            }
        }

    def get_strategy(self, error: Exception) -> Dict[str, Any]:
        \"\"\"Pobierz strategię dla danego błędu\"\"\"
        error_type = type(error)

        # Znajdź najbardziej specyficzną strategię
        for exception_type, strategy in self.error_strategies.items():
            if isinstance(error, exception_type):
                return strategy.copy()

        # Fallback do domyślnej strategii
        return self.error_strategies[Exception].copy()

class AdaptiveErrorHandler:
    \"\"\"Adaptacyjny handler błędów uczący się z historii\"\"\"

    def __init__(self, error_classifier: ErrorClassifier):
        self.classifier = error_classifier
        self.error_history: Dict[str, Dict[str, Any]] = {}
        self.success_patterns: Dict[str, float] = {}

    async def handle_error(self, error: Exception, context: Dict[str, Any]) -> Dict[str, Any]:
        \"\"\"Inteligentnie obsłuż błąd na podstawie kontekstu i historii\"\"\"

        error_signature = self._get_error_signature(error, context)
        strategy = self.classifier.get_strategy(error)

        # Dostosuj strategię na podstawie historii
        if error_signature in self.error_history:
            historical_data = self.error_history[error_signature]

            # Jeśli błąd często kończy się sukcesem po retry, zwiększ max_attempts
            if historical_data.get('retry_success_rate', 0) > 0.8:
                strategy['max_attempts'] = min(strategy['max_attempts'] + 1, 10)

            # Jeśli błąd zawsze kończy się niepowodzeniem, zmniejsz max_attempts
            elif historical_data.get('retry_success_rate', 0) < 0.1:
                strategy['max_attempts'] = max(strategy['max_attempts'] - 1, 1)

        # Sprawdź warunki środowiskowe
        if self._is_system_overloaded():
            strategy['max_attempts'] = 1  # Minimal retry podczas przeciążenia
            strategy['backoff_strategy'] = 'exponential'
            strategy['base_delay'] = 5.0  # Dłuższe opóźnienia

        if context.get('urgent', False):
            strategy['max_attempts'] = min(strategy['max_attempts'], 2)  # Szybsze zakończenie dla pilnych zadań

        return strategy

    def _get_error_signature(self, error: Exception, context: Dict[str, Any]) -> str:
        \"\"\"Utwórz sygnaturę błędu dla celów analitycznych\"\"\"
        return f\"{type(error).__name__}:{context.get('operation', 'unknown')}:{context.get('service', 'unknown')}\"

    def _is_system_overloaded(self) -> bool:
        \"\"\"Sprawdź czy system jest przeciążony\"\"\"
        # Implementacja sprawdzenia obciążenia systemu
        # np. sprawdzenie długości kolejek, wykorzystania CPU itp.
        return False  # Placeholder

    def record_outcome(self, error_signature: str, success: bool, attempts: int):
        \"\"\"Zapisz wynik obsługi błędu do historii\"\"\"

        if error_signature not in self.error_history:
            self.error_history[error_signature] = {
                'total_occurrences': 0,
                'successful_retries': 0,
                'total_attempts': 0
            }

        history = self.error_history[error_signature]
        history['total_occurrences'] += 1
        history['total_attempts'] += attempts

        if success:
            history['successful_retries'] += 1

        # Oblicz współczynnik sukcesu
        history['retry_success_rate'] = history['successful_retries'] / history['total_occurrences']

# Implementacja graceful degradation
class GracefulDegradationManager:
    \"\"\"Manager stopniowego pogarszania funkcjonalności\"\"\"

    def __init__(self):
        self.degradation_levels = {
            'normal': {
                'features': ['full_search', 'real_time_updates', 'advanced_analytics'],
                'performance_target': 0.95
            },
            'degraded_1': {
                'features': ['basic_search', 'real_time_updates'],
                'performance_target': 0.90
            },
            'degraded_2': {
                'features': ['basic_search'],
                'performance_target': 0.80
            },
            'emergency': {
                'features': ['minimal_functionality'],
                'performance_target': 0.50
            }
        }
        self.current_level = 'normal'

    def assess_system_health(self, metrics: Dict[str, Any]) -> str:
        \"\"\"Oceń zdrowie systemu i zaproponuj poziom degradacji\"\"\"

        error_rate = metrics.get('error_rate', 0)
        response_time = metrics.get('avg_response_time', 0)
        queue_size = metrics.get('queue_size', 0)

        if error_rate > 0.5 or response_time > 30 or queue_size > 10000:
            return 'emergency'
        elif error_rate > 0.2 or response_time > 10 or queue_size > 5000:
            return 'degraded_2'
        elif error_rate > 0.1 or response_time > 5 or queue_size > 1000:
            return 'degraded_1'
        else:
            return 'normal'

    def apply_degradation_level(self, level: str):
        \"\"\"Zastosuj poziom degradacji\"\"\"

        if level == self.current_level:
            return

        old_level = self.current_level
        self.current_level = level

        config = self.degradation_levels[level]

        # Wyłącz niekrytyczne funkcjonalności
        disabled_features = []
        for feature_level, level_config in self.degradation_levels.items():
            if feature_level != level:
                for feature in level_config['features']:
                    if feature not in config['features']:
                        disabled_features.append(feature)

        logger.warning(
            "Applied graceful degradation",
            from_level=old_level,
            to_level=level,
            disabled_features=disabled_features,
            performance_target=config['performance_target']
        )

        # Tutaj można dodać kod do faktycznego wyłączania funkcjonalności
        # np. wyłączenie cache, uproszczenie algorytmów itp.

# Przykład użycia kompleksowej obsługi błędów
async def resilient_workflow_operation(operation_data: Dict[str, Any]) -> Dict[str, Any]:
    \"\"\"Przykład operacji workflow z pełną odpornością na błędy\"\"\"

    classifier = ErrorClassifier()
    adaptive_handler = AdaptiveErrorHandler(classifier)
    degradation_manager = GracefulDegradationManager()

    context = {
        'operation': operation_data.get('type', 'unknown'),
        'service': operation_data.get('service', 'unknown'),
        'urgent': operation_data.get('urgent', False)
    }

    try:
        # Sprawdź poziom degradacji systemu
        system_metrics = await get_system_metrics()
        degradation_level = degradation_manager.assess_system_health(system_metrics)
        degradation_manager.apply_degradation_level(degradation_level)

        # Wykonaj operację z adaptacyjną obsługą błędów
        result = await execute_with_adaptive_error_handling(
            operation_data,
            adaptive_handler,
            context
        )

        return result

    except Exception as e:
        # Fallback - zapisz do kolejki do ręcznego przetworzenia
        await queue_for_manual_processing(operation_data, str(e))

        return {
            'status': 'queued_for_manual',
            'error': str(e),
            'queued_at': time.time()
        }

async def get_system_metrics() -> Dict[str, Any]:
    \"\"\"Pobierz metryki systemu (placeholder)\"\"\"
    return {
        'error_rate': random.uniform(0, 0.3),
        'avg_response_time': random.uniform(1, 15),
        'queue_size': random.randint(100, 5000)
    }

async def execute_with_adaptive_error_handling(data: Dict[str, Any],
                                             handler: AdaptiveErrorHandler,
                                             context: Dict[str, Any]) -> Dict[str, Any]:
    \"\"\"Wykonaj operację z adaptacyjną obsługą błędów (placeholder)\"\"\"

    # Symulacja operacji z możliwym błędem
    if random.random() < 0.3:  # 30% szans na błąd
        error_type = random.choice([ConnectionError, TimeoutError, ValueError])
        raise error_type("Simulated error")

    return {'status': 'success', 'result': 'operation completed'}

async def queue_for_manual_processing(data: Dict[str, Any], error: str):
    \"\"\"Zapisz do kolejki ręcznego przetwarzania (placeholder)\"\"\"
    print(f"Queued for manual processing: {data}, Error: {error}")

async def main():
    # Testuj różne scenariusze
    test_operations = [
        {'type': 'payment', 'service': 'stripe', 'urgent': True},
        {'type': 'email', 'service': 'smtp', 'urgent': False},
        {'type': 'validation', 'service': 'internal', 'urgent': False}
    ]

    for op in test_operations:
        print(f"\\nTesting operation: {op}")
        result = await resilient_workflow_operation(op)
        print(f"Result: {result}")

if __name__ == "__main__":
    asyncio.run(main())`}
          language="python"
          title="Kompleksowa implementacja obsługi błędów z klasyfikacją i adaptacją"
        />

        <h2>Circuit Breaker Pattern</h2>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Stan Zamknięty</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Normalna operacja - wszystkie wywołania są wykonywane.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Stan Otwarty</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Usługa niedostępna - wywołania kończą się natychmiastowym błędem.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Stan Półotwarty</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Testowanie odzyskania - część wywołań jest przepuszczana.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Ochrona Systemu</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zapobiega kaskadowym awariom i przyspiesza odzyskanie.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Wskazówki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Klasyfikuj błędy:</strong> Nie wszystkie błędy powinny być ponawiane - niektóre wymagają innej obsługi</li>
            <li>• <strong>Używaj circuit breaker:</strong> Chroń system przed przeciążeniem podczas awarii usług zewnętrznych</li>
            <li>• <strong>Implementuj fallback:</strong> Zawsze miej plan B dla krytycznych operacji</li>
            <li>• <strong>Monitoruj i ucz się:</strong> Analizuj wzorce błędów i dostosowuj strategie obsługi</li>
            <li>• <strong>Testuj scenariusze błędów:</strong> Regularnie testuj jak system zachowuje się podczas awarii</li>
            <li>• <strong>Dokumentuj strategie:</strong> Wszystkie mechanizmy obsługi błędów powinny być udokumentowane</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Kompleksowa obsługa błędów to podstawa niezawodności systemów workflow. Strategie retry,
          circuit breaker, fallback i saga pattern pozwalają na tworzenie systemów, które są odporne
          na awarie i potrafią się automatycznie odzyskać. Pamiętaj, że dobry system obsługi błędów
          nie tylko reaguje na problemy, ale także zapobiega im i uczy się z doświadczenia.
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
          href="/samouczki/przeplywy-pracy/monitorowanie-i-logowanie"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ← Poprzedni Tutorial: Monitorowanie i Logowanie
        </Link>
        <Link
          href="/samouczki/przeplywy-pracy/skalowanie-systemow"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Skalowanie Systemów →
        </Link>
      </motion.div>
    </div>
  );
}