# Architektura i Specyfikacja Witryny Tutorialowej

## 1. Ogólna Struktura Witryny i Nawigacja

Witryna tutorialowa poświęcona inżynierii kontekstu, narzędziom MCP, programowaniu, użyciu agentów oraz różnym typom przepływów pracy zostanie zbudowana jako nowoczesna aplikacja React z responsywnym designem. Główna nawigacja będzie oparta na hierarchii kategorii z bocznym menu dla łatwego dostępu do tutoriali.

### Struktura Główna:
- **Strona Główna**: Wprowadzenie, wyróżnione tutoriale, przegląd kategorii
- **Sekcja Tutoriali**: Główna kategoria stron i indywidualne tutoriale
- **O Nas**: Informacje o witrynie
- **Szukaj**: Funkcjonalność wyszukiwania

### Nawigacja:
- **Górny Header**: Logo, menu główne (Strona Główna, Tutoriale, O Nas), pole wyszukiwania
- **Boczne Menu**: Drzewo kategorii dla tutoriali, rozwijalne na urządzeniach mobilnych
- **Footer**: Linki do mediów społecznościowych, informacje kontaktowe, mapa witryny

## 2. Hierarchia Stron i Routing

Routing zostanie zaimplementowany przy użyciu React Router z zagnieżdżonymi trasami dla kategorii i tutoriali.

```
/ (Strona Główna)
/samouczki (Lista kategorii)
/samouczki/inzynieria-kontekstu (Strona kategorii)
/samouczki/inzynieria-kontekstu/wprowadzenie (Indywidualny tutorial)
/samouczki/narzedzia-mcp
/samouczki/narzedzia-mcp/podstawy-mcp
/samouczki/programowanie
/samouczki/programowanie/podstawy-javascript
/samouczki/uzycie-agentow
/samouczki/uzycie-agentow/budowanie-agenta
/samouczki/przeplywy-pracy
/samouczki/przeplywy-pracy/przeplyw-sekwencyjny
/o-nas
/szukaj
```

## 3. Specyfikacje Komponentów dla Każdej Sekcji

### Komponenty Główne:
- **Layout**: Kontener główny z Header, Footer i Main
- **Header**: Stały header z nawigacją
- **Sidebar**: Boczne menu z kategoriami, ukrywane na mobilnych
- **Footer**: Stopka z linkami
- **TutorialCard**: Karta tutorialu z tytułem, opisem, czasem czytania
- **TutorialList**: Lista kart tutoriali dla kategorii
- **TutorialPage**: Strona tutorialu z treścią, blokami kodu, przykładami
- **CodeBlock**: Składnik do wyświetlania kodu z syntax highlighting
- **InteractiveDemo**: Opcjonalny komponent dla interaktywnych przykładów
- **SearchBar**: Pole wyszukiwania z sugestiami
- **Breadcrumb**: Nawigacja okruszkowa

### Komponenty Specyficzne dla Sekcji:
- **CategoryOverview**: Przegląd kategorii z listą tutoriali
- **ProgressIndicator**: Wskaźnik postępu dla długich tutoriali
- **RelatedTutorials**: Sugestie powiązanych tutoriali

## 4. Zarys Treści dla Każdego Tematu Tutorialu z Podsekcjami

### Inżynieria Kontekstu (Context Engineering)
- **Wprowadzenie do Inżynierii Kontekstu**
  - Co to jest inżynieria kontekstu?
  - Dlaczego jest ważna dla agentów AI?
  - Podstawowe koncepcje
- **Pisanie Kontekstu**
  - Techniki tworzenia efektywnych promptów
  - Strukturyzacja instrukcji
  - Przykłady praktyczne
- **Wybieranie Kontekstu**
  - Metody filtrowania informacji
  - Zarządzanie oknem kontekstu
  - Optymalizacja selekcji danych
- **Kompresja Kontekstu**
  - Techniki zmniejszania objętości kontekstu
  - Utrata vs. zachowanie informacji
  - Narzędzia do kompresji
- **Izolacja Kontekstu**
  - Oddzielanie kontekstów dla różnych zadań
  - Zapobieganie zanieczyszczeniu kontekstu
  - Wielokontekstowe podejścia
- **Praktyczne Przykłady i Studia Przypadków**
  - Budowanie trwałego agenta AI
  - Rozwiązywanie problemów z kontekstem
  - Narzędzia i biblioteki

### Narzędzia MCP (MCP Tools)
- **Wprowadzenie do Protokołu Kontekstu Modelu (MCP)**
  - Co to jest MCP?
  - Architektura klient-serwer
  - Korzyści dla agentów AI
- **Budowanie Serwera MCP**
  - Konfiguracja środowiska
  - Definiowanie narzędzi i promptów
  - Implementacja transportu lokalnego
- **Integracja Narzędzi MCP z Agentami**
  - Łączenie zewnętrznych systemów
  - Dynamiczne wywoływanie narzędzi
  - Przykłady integracji
- **Zaawansowane Funkcje MCP**
  - Zarządzanie zasobami
  - Bezpieczeństwo i autoryzacja
  - Monitorowanie wydajności
- **Praktyczne Tutoriale**
  - Budowanie agenta YouTube z MCP
  - Łączenie z bazami danych
  - Integracja z API zewnętrznymi

### Programowanie (Programming)
- **Podstawy Programowania dla Agentów AI**
  - Wprowadzenie do języków programowania
  - Struktury danych i algorytmy
  - Paradygmaty programowania
- **JavaScript dla Agentów**
  - Podstawy składni
  - Asynchroniczne programowanie
  - Integracja z API
- **Python dla AI**
  - Biblioteki dla uczenia maszynowego
  - Praca z danymi
  - Budowanie agentów w Pythonie
- **Zaawansowane Techniki Programowania**
  - Optymalizacja wydajności
  - Bezpieczeństwo kodu
  - Testowanie i debugowanie
- **Praktyczne Projekty**
  - Budowanie prostego agenta
  - Integracja z bazami danych
  - Tworzenie interfejsów użytkownika

### Użycie Agentów (Usage of Agents)
- **Wprowadzenie do Agentów AI**
  - Definicja i typy agentów
  - Architektura agentów
  - Zastosowania w praktyce
- **Budowanie Prostego Agenta**
  - Wybór frameworka
  - Konfiguracja środowiska
  - Implementacja podstawowej logiki
- **Zaawansowane Funkcje Agentów**
  - Pamięć i stan
  - Uczucie się i adaptacja
  - Wieloagentowe systemy
- **Integracja Agentów z Systemami Zewnętrznymi**
  - API i webhooks
  - Bazy danych
  - Usługi chmurowe
- **Studia Przypadków**
  - Agent do analizy danych
  - Agent czatbot
  - Agent do automatyzacji zadań

### Przepływy Pracy (Workflows)
- **Wprowadzenie do Przepływów Pracy**
  - Typy przepływów: sekwencyjne, równoległe, agregacyjne
  - Narzędzia do orkiestracji
  - Projektowanie efektywnych przepływów
- **Przepływ Sekwencyjny**
  - Definicja i zastosowania
  - Implementacja krok po kroku
  - Zarządzanie błędami
- **Przepływ Równoległy**
  - Wykonywanie zadań współbieżnie
  - Synchronizacja i koordynacja
  - Optymalizacja wydajności
- **Przepływ Agregacyjny**
  - Zbieranie wyników z wielu źródeł
  - Techniki agregacji danych
  - Obsługa konfliktów
- **Zaawansowane Przepływy**
  - Przepływy warunkowe
  - Pętle i iteracje
  - Zagnieżdżone przepływy
- **Narzędzia i Frameworki**
  - LangChain dla przepływów
  - Apache Airflow
  - Niestandardowe rozwiązania

## 5. Uwagi Dotyczące UI/UX z Wykorzystaniem Zainstalowanych Bibliotek

### Animacje i Przejścia:
- **Framer Motion**: Używany do płynnych przejść między stronami, animacji kart tutoriali przy ładowaniu, interaktywnych efektów hover
- **React Spring**: Dla zaawansowanych animacji fizycznych, takich jak sprężyste przejścia w menu bocznym, animacje ładowania treści

### Komponenty UI:
- **Radix UI**: Dla dostępnych i nowoczesnych komponentów podstawowych (dialogi, dropdowny, tooltipy, accordion dla sekcji tutoriali)
- **Responsywność**: Animowane przejścia między layoutami mobilnymi i desktopowymi

### Doświadczenie Użytkownika:
- Ładowanie progresywne treści
- Dark mode toggle
- Zapisywanie postępu czytania
- Interaktywne przykłady kodu z kopiowaniem do schowka
- Sugestie powiązanych tutoriali na podstawie historii przeglądania

## 6. Specyfikacje Layoutu dla Responsywnego Designu

### Breakpointy:
- **Mobile**: < 768px - pojedyncza kolumna, ukryte menu boczne, hamburger menu
- **Tablet**: 768px - 1024px - dwie kolumny, zwinięte menu boczne
- **Desktop**: > 1024px - pełny layout z bocznym menu

### Layout Główny:
- **Header**: Wysokość 64px, stała pozycja
- **Sidebar**: Szerokość 280px na desktopie, ukryta na mobilnych
- **Main Content**: Max-width 1200px, centrowany, padding 24px
- **Footer**: Wysokość 200px, informacje kontaktowe

### Grid System:
- Użycie CSS Grid dla responsywnych kart tutoriali (1 kolumna mobile, 2 tablet, 3 desktop)
- Flexbox dla nawigacji i layoutu strony

### Dostępność:
- Kontrast kolorów zgodny z WCAG 2.1
- Nawigacja klawiszowa
- Czytniki ekranowe wsparcie przez Radix UI

Ta specyfikacja zapewnia kompleksową podstawę dla budowy nowoczesnej, responsywnej witryny tutorialowej z naciskiem na jakość treści i doświadczenie użytkownika.