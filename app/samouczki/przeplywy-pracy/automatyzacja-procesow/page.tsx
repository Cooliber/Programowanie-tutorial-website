"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Zap, Cog, Database, Cloud } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function AutomatyzacjaProcesowPage() {
  const demoSteps = [
    {
      title: "Identyfikacja procesu do automatyzacji",
      description: "Znajdź powtarzalne procesy biznesowe, które można zautomatyzować.",
      code: `# Analiza procesu ręcznego przetwarzania faktur
PROCES OBECNY:
1. Otrzymanie faktury email/em (ręcznie)
2. Weryfikacja danych (ręcznie)
3. Zapisanie w systemie księgowym (ręcznie)
4. Zatwierdzenie przez przełożonego (ręcznie)
5. Przelanie środków (ręcznie)

PROBLEMY:
- Czas przetwarzania: 2-3 dni
- Błędy ludzkie: 5-10%
- Koszty: 50 zł/fakturę
- Szczytowe obciążenie: trudne do obsłużenia

POTENCJAŁ AUTOMATYZACJI:
- Czas: < 30 minut
- Błędy: < 1%
- Koszty: 5 zł/fakturę
- Skalowalność: nielimitowana`,
      result: "✅ Zidentyfikowano proces z wysokim potencjałem automatyzacji."
    },
    {
      title: "Projektowanie automatyzacji",
      description: "Zaprojektuj zautomatyzowany przepływ z integracją systemów.",
      code: `# Architektura zautomatyzowanego systemu faktur
ŹRÓDŁA DANYCH:
- Email (IMAP/SMTP)
- API dostawców
- Skanery dokumentów
- Systemy ERP

KOMPONENTY:
1. Ingestion Service → Pobieranie i ekstrakcja danych
2. Validation Engine → Walidacja danych biznesowych
3. Integration Layer → Łączenie z systemami zewnętrznymi
4. Approval Workflow → Automatyczne zatwierdzanie
5. Payment Processor → Przetwarzanie płatności

INTEGRACJE:
- ERP System (SAP/Oracle)
- Bank API
- Email Gateway
- Document Storage (S3/Azure Blob)

MONITORING:
- Logi wszystkich operacji
- Metryki wydajności
- Alerty błędów
- Dashboard statusu`,
      result: "✅ Zaprojektowano kompletną architekturę automatyzacji."
    },
    {
      title: "Implementacja i uruchomienie",
      description: "Zaimplementuj rozwiązanie i przetestuj w środowisku produkcyjnym.",
      code: `# Implementacja automatyzacji faktur w Python
import asyncio
from typing import Dict, Any, List
from dataclasses import dataclass
from datetime import datetime
import aiohttp
import aiomysql

@dataclass
class Invoice:
    id: str
    vendor_id: str
    amount: float
    due_date: datetime
    status: str = "received"

class InvoiceAutomationService:
    def __init__(self, db_config: Dict[str, Any], api_keys: Dict[str, str]):
        self.db_config = db_config
        self.api_keys = api_keys
        self.http_client = aiohttp.ClientSession()

    async def process_invoice(self, invoice: Invoice) -> Dict[str, Any]:
        """Główny proces automatyzacji faktury"""
        try:
            # Krok 1: Walidacja danych
            validation_result = await self.validate_invoice(invoice)
            if not validation_result['valid']:
                return {'status': 'rejected', 'reason': validation_result['errors']}

            # Krok 2: Sprawdzenie w systemie ERP
            erp_check = await self.check_erp_system(invoice)
            if not erp_check['approved']:
                return {'status': 'pending_approval', 'reason': 'Requires manual review'}

            # Krok 3: Automatyczne zatwierdzenie
            approval_result = await self.auto_approve(invoice)
            if approval_result['approved']:
                # Krok 4: Przetwarzanie płatności
                payment_result = await self.process_payment(invoice)
                return {
                    'status': 'completed',
                    'payment_id': payment_result['id'],
                    'processed_at': datetime.now().isoformat()
                }
            else:
                return {'status': 'pending_approval', 'reason': approval_result['reason']}

        except Exception as e:
            await self.log_error(invoice.id, str(e))
            return {'status': 'error', 'error': str(e)}

    async def validate_invoice(self, invoice: Invoice) -> Dict[str, Any]:
        """Walidacja danych faktury"""
        errors = []

        if invoice.amount <= 0:
            errors.append("Invalid amount")

        if invoice.due_date < datetime.now():
            errors.append("Due date in the past")

        # Sprawdź dostawcę w bazie danych
        vendor_valid = await self.validate_vendor(invoice.vendor_id)
        if not vendor_valid:
            errors.append("Unknown vendor")

        return {
            'valid': len(errors) == 0,
            'errors': errors
        }

    async def check_erp_system(self, invoice: Invoice) -> Dict[str, Any]:
        """Sprawdzenie w systemie ERP"""
        async with self.http_client.get(
            f"{self.api_keys['erp_api']}/vendors/{invoice.vendor_id}/status"
        ) as response:
            if response.status == 200:
                data = await response.json()
                return {
                    'approved': data.get('active', False),
                    'vendor_info': data
                }
            return {'approved': False, 'error': 'ERP system unavailable'}

    async def auto_approve(self, invoice: Invoice) -> Dict[str, Any]:
        """Automatyczne zatwierdzenie na podstawie reguł"""
        # Reguły automatycznego zatwierdzenia
        if invoice.amount < 1000:  # Małe faktury - autozatwierdzenie
            return {'approved': True}
        elif invoice.amount < 10000 and invoice.vendor_id in self.trusted_vendors:
            return {'approved': True}
        else:
            return {'approved': False, 'reason': 'Amount too high or untrusted vendor'}

    async def process_payment(self, invoice: Invoice) -> Dict[str, Any]:
        """Przetwarzanie płatności przez API bankowe"""
        payment_data = {
            'amount': invoice.amount,
            'vendor_account': await self.get_vendor_account(invoice.vendor_id),
            'description': f"Invoice {invoice.id}",
            'due_date': invoice.due_date.isoformat()
        }

        async with self.http_client.post(
            f"{self.api_keys['bank_api']}/payments",
            json=payment_data,
            headers={'Authorization': f"Bearer {self.api_keys['bank_token']}"}
        ) as response:
            result = await response.json()
            return {
                'id': result['payment_id'],
                'status': result['status'],
                'scheduled_date': result.get('scheduled_date')
            }

    async def log_error(self, invoice_id: str, error: str):
        """Logowanie błędów do systemu monitoringu"""
        async with aiomysql.connect(**self.db_config) as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("""
                    INSERT INTO automation_errors (invoice_id, error_message, timestamp)
                    VALUES (%s, %s, %s)
                """, (invoice_id, error, datetime.now()))
                await conn.commit()

# Uruchomienie usługi
async def main():
    service = InvoiceAutomationService(db_config, api_keys)

    # Przetwarzanie kolejki faktur
    while True:
        invoices = await get_pending_invoices()
        for invoice in invoices:
            result = await service.process_invoice(invoice)
            print(f"Processed invoice {invoice.id}: {result['status']}")

        await asyncio.sleep(60)  # Sprawdź co minutę

if __name__ == "__main__":
    asyncio.run(main())`,
      result: "✅ Automatyzacja została zaimplementowana i przetestowana pomyślnie."
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
            <span>16 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Automatyzacja Procesów
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Dowiedz się, jak automatyzować złożone procesy biznesowe. Naucz się integrować systemy,
          optymalizować wydajność operacyjną i budować skalowalne rozwiązania automatyzacji.
        </p>
      </motion.div>

      <ProgressIndicator
        current={2}
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
            <Zap className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Efektywność Operacyjna
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Automatyzacja procesów znacząco poprawia wydajność, zmniejsza koszty i eliminuje błędy ludzkie.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Cog className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Integracja Systemów
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Łącz różne systemy i aplikacje w spójne, zautomatyzowane przepływy pracy.
            </p>
          </div>
        </div>

        <h2>Dlaczego Automatyzować Procesy?</h2>
        <p>
          Automatyzacja procesów biznesowych to kluczowy element transformacji cyfrowej.
          Pozwala na znaczące zwiększenie efektywności, zmniejszenie kosztów operacyjnych
          i poprawę jakości usług. Dobrze zautomatyzowane procesy działają 24/7,
          są skalowalne i odporne na błędy ludzkie.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Kluczowe Korzyści
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Automatyzacja może zmniejszyć koszty operacyjne o 30-70%, poprawić czas reakcji
            z dni na minuty i zwiększyć dokładność przetwarzania z 95% do 99.9%.
          </p>
        </div>

        <h2>Kandydaci do Automatyzacji</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Powtarzalne Zadania</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Procesy wykonywane regularnie z przewidywalnym przebiegiem.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Duże Wolumeny</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Procesy przetwarzające duże ilości danych lub transakcji.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Reguły Biznesowe</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Procesy oparte na jasno zdefiniowanych regułach decyzyjnych.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Wysoki Ryzyko Błędów</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Procesy, gdzie błędy ludzkie mają poważne konsekwencje.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Automatyzację Procesu w Działaniu"
          steps={demoSteps}
        />

        <h2>Architektura Automatyzacji</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-semibold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Warstwa Ingestion</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pobieranie danych z różnych źródeł (API, pliki, wiadomości).
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-semibold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Warstwa Przetwarzania</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Walidacja, transformacja i przetwarzanie danych biznesowych.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-semibold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Warstwa Integracji</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Łączenie z systemami zewnętrznymi i wykonywanie akcji.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`# Przykład automatyzacji onboarding'u klienta
import asyncio
from typing import Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
import aiohttp
import aioredis
import aiosmtplib
from email.message import EmailMessage

@dataclass
class Customer:
    id: str
    email: str
    name: str
    company: str
    status: str = "new"

class CustomerOnboardingAutomation:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.redis = aioredis.from_url(config['redis_url'])
        self.http_client = aiohttp.ClientSession()
        self.email_client = aiosmtplib.SMTP(
            hostname=config['smtp_host'],
            port=config['smtp_port'],
            username=config['smtp_user'],
            password=config['smtp_pass']
        )

    async def start_onboarding(self, customer: Customer) -> Dict[str, Any]:
        """Rozpocznij automatyczny proces onboarding'u"""
        try:
            # Krok 1: Walidacja danych klienta
            validation = await self.validate_customer_data(customer)
            if not validation['valid']:
                return {'status': 'failed', 'errors': validation['errors']}

            # Krok 2: Utworzenie konta w systemie
            account_result = await self.create_system_account(customer)
            if not account_result['success']:
                return {'status': 'failed', 'error': 'Account creation failed'}

            # Krok 3: Konfiguracja dostępu
            access_result = await self.setup_access_permissions(customer)
            if not access_result['success']:
                return {'status': 'failed', 'error': 'Access setup failed'}

            # Krok 4: Wysłanie materiałów powitalnych
            welcome_result = await self.send_welcome_package(customer)
            if not welcome_result['success']:
                # Nie krytyczne - loguj ale kontynuuj
                await self.log_warning(f"Welcome package failed for {customer.id}")

            # Krok 5: Harmonogram follow-up
            await self.schedule_followup(customer)

            # Krok 6: Aktualizacja statusu
            customer.status = "onboarded"
            await self.update_customer_status(customer)

            return {
                'status': 'completed',
                'account_id': account_result['account_id'],
                'access_credentials': access_result['credentials'],
                'completed_at': datetime.now().isoformat()
            }

        except Exception as e:
            await self.log_error(customer.id, str(e))
            # Próba rollback w przypadku błędu
            await self.rollback_onboarding(customer)
            return {'status': 'error', 'error': str(e)}

    async def validate_customer_data(self, customer: Customer) -> Dict[str, Any]:
        """Walidacja danych klienta"""
        errors = []

        # Sprawdź format email
        if '@' not in customer.email:
            errors.append("Invalid email format")

        # Sprawdź czy email nie jest już zarejestrowany
        existing = await self.check_existing_customer(customer.email)
        if existing:
            errors.append("Email already registered")

        # Walidacja nazwy firmy
        if len(customer.company.strip()) < 2:
            errors.append("Company name too short")

        return {'valid': len(errors) == 0, 'errors': errors}

    async def create_system_account(self, customer: Customer) -> Dict[str, Any]:
        """Utworzenie konta w głównym systemie"""
        account_data = {
            'customer_id': customer.id,
            'email': customer.email,
            'name': customer.name,
            'company': customer.company,
            'created_at': datetime.now().isoformat()
        }

        async with self.http_client.post(
            f"{self.config['api_base']}/accounts",
            json=account_data,
            headers={'Authorization': f"Bearer {self.config['api_token']}"}
        ) as response:
            if response.status == 201:
                result = await response.json()
                return {'success': True, 'account_id': result['id']}
            else:
                error = await response.text()
                return {'success': False, 'error': error}

    async def setup_access_permissions(self, customer: Customer) -> Dict[str, Any]:
        """Konfiguracja uprawnień dostępu"""
        permissions = {
            'customer_id': customer.id,
            'roles': ['customer_basic', 'dashboard_access'],
            'features': ['reports', 'support_ticket']
        }

        async with self.http_client.post(
            f"{self.config['api_base']}/permissions",
            json=permissions,
            headers={'Authorization': f"Bearer {self.config['api_token']}"}
        ) as response:
            if response.status == 201:
                result = await response.json()
                return {
                    'success': True,
                    'credentials': {
                        'login_url': result['login_url'],
                        'temp_password': result['temp_password']
                    }
                }
            else:
                return {'success': False, 'error': await response.text()}

    async def send_welcome_package(self, customer: Customer) -> Dict[str, Any]:
        """Wysłanie pakietu powitalnego"""
        try:
            message = EmailMessage()
            message['From'] = self.config['smtp_user']
            message['To'] = customer.email
            message['Subject'] = f"Witamy w systemie, {customer.name}!"

            message.set_content(f"""
Witamy w naszej platformie!

Dziękujemy za dołączenie do {customer.company}.

Twój proces onboarding'u został pomyślnie zakończony.
Możesz teraz zalogować się do systemu używając tymczasowego hasła.

Link do logowania: {self.config['login_url']}

Pozdrawienia,
Zespół Support
            """)

            async with self.email_client:
                await self.email_client.send_message(message)

            return {'success': True}

        except Exception as e:
            return {'success': False, 'error': str(e)}

    async def schedule_followup(self, customer: Customer):
        """Zaplanuj follow-up po 7 dniach"""
        followup_data = {
            'customer_id': customer.id,
            'type': 'followup_check',
            'scheduled_for': (datetime.now().replace(hour=10, minute=0) + timedelta(days=7)).isoformat(),
            'message': 'Sprawdź jak idzie onboarding'
        }

        await self.redis.lpush('scheduled_tasks', str(followup_data))

    async def check_existing_customer(self, email: str) -> bool:
        """Sprawdź czy klient już istnieje"""
        async with self.http_client.get(
            f"{self.config['api_base']}/customers/check",
            params={'email': email},
            headers={'Authorization': f"Bearer {self.config['api_token']}"}
        ) as response:
            if response.status == 200:
                result = await response.json()
                return result.get('exists', False)
            return False

    async def log_error(self, customer_id: str, error: str):
        """Logowanie błędów"""
        error_data = {
            'customer_id': customer_id,
            'error': error,
            'timestamp': datetime.now().isoformat(),
            'component': 'onboarding_automation'
        }
        await self.redis.lpush('error_logs', str(error_data))

    async def log_warning(self, message: str):
        """Logowanie ostrzeżeń"""
        warning_data = {
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'level': 'warning'
        }
        await self.redis.lpush('system_logs', str(warning_data))

    async def rollback_onboarding(self, customer: Customer):
        """Cofnięcie zmian w przypadku błędu"""
        try:
            # Usuń utworzone konto jeśli istnieje
            async with self.http_client.delete(
                f"{self.config['api_base']}/accounts/{customer.id}",
                headers={'Authorization': f"Bearer {self.config['api_token']}"}
            ) as response:
                pass  # Ignoruj wynik - konto może nie istnieć

            customer.status = "failed"
            await self.update_customer_status(customer)

        except Exception as e:
            await self.log_error(customer.id, f"Rollback failed: {e}")

    async def update_customer_status(self, customer: Customer):
        """Aktualizacja statusu klienta"""
        update_data = {'status': customer.status}

        async with self.http_client.patch(
            f"{self.config['api_base']}/customers/{customer.id}",
            json=update_data,
            headers={'Authorization': f"Bearer {self.config['api_token']}"}
        ) as response:
            pass  # Status update nie powinien blokować procesu`}
          language="python"
          title="Kompletny przykład automatyzacji onboarding'u klienta"
        />

        <h2>Narzędzia i Technologie</h2>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Cloud className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Chmura Publiczna</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AWS Lambda, Google Cloud Functions, Azure Functions dla serverless automation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Workflow Engines</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Apache Airflow, Prefect, Temporal dla złożonych przepływów pracy.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Integration Platforms</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zapier, Microsoft Power Automate, MuleSoft dla integracji bez kodu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Cog className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Custom Solutions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Python asyncio, Node.js, Go dla niestandardowych rozwiązań automatyzacji.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Wskazówki</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Zacznij od małych procesów:</strong> Automatyzuj proste zadania przed złożonymi</li>
            <li>• <strong>Implementuj monitoring:</strong> Śledź wydajność i błędy wszystkich automatyzacji</li>
            <li>• <strong>Planuj rollback:</strong> Przygotuj strategie cofania zmian w przypadku problemów</li>
            <li>• <strong>Testuj thoroughly:</strong> Automatyzacje muszą być przetestowane w środowisku podobnym do produkcyjnego</li>
            <li>• <strong>Dokumentuj wszystko:</strong> Szczegółowa dokumentacja jest kluczowa dla utrzymania</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Automatyzacja procesów biznesowych to inwestycja, która zwraca się wielokrotnie.
          Poprzez eliminację zadań powtarzalnych, zmniejszenie błędów i zwiększenie skalowalności,
          automatyzacja pozwala firmom skupić się na tym, co naprawdę ważne - rozwoju biznesu
          i obsłudze klientów. Pamiętaj, że kluczem do sukcesu jest stopniowe podejście
          i ciągłe monitorowanie oraz optymalizacja zautomatyzowanych procesów.
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
          href="/samouczki/przeplywy-pracy/projektowanie-przeplywow"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ← Poprzedni Tutorial: Projektowanie Przepływów
        </Link>
        <Link
          href="/samouczki/przeplywy-pracy/monitorowanie-i-logowanie"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Monitorowanie i Logowanie →
        </Link>
      </motion.div>
    </div>
  );
}