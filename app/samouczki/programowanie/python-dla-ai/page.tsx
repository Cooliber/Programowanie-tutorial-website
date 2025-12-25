"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Code, Database, Brain, Zap } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function PythonDlaAIPage() {
  const demoSteps = [
    {
      title: "NumPy Arrays",
      description: "Agent używa NumPy do efektywnego przetwarzania danych numerycznych.",
      code: `import numpy as np

# Agent analizuje dane sprzedaży
sales_data = np.array([
    [100, 150, 200, 120, 180],  # Produkt A
    [80, 120, 160, 90, 140],    # Produkt B
    [60, 90, 110, 70, 100]      # Produkt C
])

# Obliczenia statystyczne
total_sales = np.sum(sales_data, axis=1)
average_sales = np.mean(sales_data, axis=1)
growth_rate = np.diff(sales_data, axis=1) / sales_data[:, :-1] * 100

print("Suma sprzedaży:", total_sales)
print("Średnia sprzedaż:", average_sales)
print("Tempo wzrostu (%):", growth_rate)`,
      result: "✅ Agent obliczył statystyki sprzedaży: Produkt A - suma 750, średnia 150; Produkt B - suma 590, średnia 118."
    },
    {
      title: "Pandas DataFrames",
      description: "Agent używa Pandas do analizy danych strukturalnych.",
      code: `import pandas as pd

# Agent przetwarza dane klientów
customers_df = pd.DataFrame({
    'customer_id': ['C001', 'C002', 'C003', 'C004'],
    'name': ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Maria Zielińska'],
    'total_orders': [5, 12, 3, 8],
    'total_spent': [1250.50, 3200.75, 450.00, 1800.25],
    'last_order': pd.to_datetime(['2024-01-15', '2024-01-20', '2024-01-10', '2024-01-18'])
})

# Analiza RFM (Recency, Frequency, Monetary)
today = pd.Timestamp('2024-01-25')
customers_df['recency'] = (today - customers_df['last_order']).dt.days
customers_df['frequency_score'] = pd.qcut(customers_df['total_orders'], 4, labels=[1, 2, 3, 4])
customers_df['monetary_score'] = pd.qcut(customers_df['total_spent'], 4, labels=[1, 2, 3, 4])

# Segmentacja klientów
customers_df['rfm_score'] = customers_df['frequency_score'].astype(str) + customers_df['monetary_score'].astype(str)

print(customers_df[['name', 'rfm_score', 'recency']])`,
      result: "✅ Agent przeanalizował klientów: Anna Nowak (najlepszy klient), Jan Kowalski (regularny), itp."
    },
    {
      title: "Scikit-learn ML",
      description: "Agent używa scikit-learn do uczenia maszynowego.",
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd

# Agent klasyfikuje klientów
customer_data = pd.DataFrame({
    'orders_count': [1, 5, 12, 3, 8, 2, 15, 6],
    'total_spent': [100, 500, 1200, 300, 800, 200, 1500, 600],
    'days_since_last_order': [30, 5, 2, 45, 10, 60, 1, 15],
    'is_vip': [0, 0, 1, 0, 0, 0, 1, 0]  # target
})

X = customer_data[['orders_count', 'total_spent', 'days_since_last_order']]
y = customer_data['is_vip']

# Podział na zbiór treningowy i testowy
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Trenowanie modelu
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predykcja
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"Dokładność modelu: {accuracy:.2f}")
print("Predykcje dla nowych klientów:", model.predict([[10, 1000, 7]]))`,
      result: "✅ Model osiągnął 85% dokładności w klasyfikacji klientów VIP."
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
            <span>18 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Python dla AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Odkryj moc Pythona w tworzeniu agentów AI. Naucz się używać NumPy, Pandas,
          scikit-learn i innych bibliotek do analizy danych i uczenia maszynowego.
        </p>
      </motion.div>

      <ProgressIndicator
        current={3}
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
            <Database className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              NumPy & SciPy
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Zaawansowane obliczenia numeryczne i analiza naukowa.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Brain className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Scikit-learn
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Maszyna uczenia się dla klasyfikacji, regresji i klasteryzacji.
            </p>
          </div>
        </div>

        <h2>Dlaczego Python dla Agentów AI?</h2>
        <p>
          Python stał się językiem numer jeden w AI i data science z kilku kluczowych powodów:
        </p>

        <ul>
          <li><strong>Bogaty ekosystem:</strong> Numpy, Pandas, Scikit-learn, TensorFlow, PyTorch</li>
          <li><strong>Czytelność:</strong> Prosta, elegancka składnia podobna do języka angielskiego</li>
          <li><strong>Duża społeczność:</strong> Miliony programistów i ogromna baza wiedzy</li>
          <li><strong>Integracja:</strong> Łatwe łączenie z C/C++, Java, R</li>
          <li><strong>Produkcyjna gotowość:</strong> Flask, Django, FastAPI dla API</li>
        </ul>

        <InteractiveDemo
          title="Python w Analizie Danych dla Agentów"
          steps={demoSteps}
        />

        <h2>NumPy - Obliczenia Numeryczne</h2>

        <CodeBlock
          code={`import numpy as np

class DataAnalysisAgent:
    def __init__(self):
        self.data_cache = {}

    def analyze_sensor_data(self, sensor_readings):
        """
        Agent analizuje dane z sensorów IoT
        """
        data = np.array(sensor_readings)

        # Statystyki podstawowe
        stats = {
            'mean': np.mean(data),
            'std': np.std(data),
            'min': np.min(data),
            'max': np.max(data),
            'median': np.median(data)
        }

        # Wykrywanie anomalii (wartości odstające)
        z_scores = np.abs((data - stats['mean']) / stats['std'])
        anomalies = data[z_scores > 3]  # 3 sigma rule

        # Analiza trendów
        if len(data) > 1:
            # Prosta regresja liniowa
            x = np.arange(len(data))
            slope, intercept = np.polyfit(x, data, 1)
            trend = "rosnący" if slope > 0 else "malejący"

            # Predykcja następnej wartości
            next_value = slope * len(data) + intercept
        else:
            trend = "niewystarczające dane"
            next_value = None

        return {
            'statistics': stats,
            'anomalies': anomalies.tolist(),
            'trend': trend,
            'next_prediction': next_value,
            'data_quality': self.assess_data_quality(data)
        }

    def assess_data_quality(self, data):
        """
        Ocena jakości danych
        """
        if len(data) == 0:
            return "no_data"

        # Sprawdź kompletność
        null_count = np.isnan(data).sum()
        completeness = (len(data) - null_count) / len(data)

        # Sprawdź zakres wartości
        if np.all(data == data[0]):
            variability = "constant"
        elif np.std(data) < np.mean(data) * 0.1:
            variability = "low"
        else:
            variability = "good"

        # Sprawdź czy dane są w oczekiwanym zakresie
        reasonable_range = (-1000, 1000)  # Przykład dla sensorów
        in_range = np.all((data >= reasonable_range[0]) & (data <= reasonable_range[1]))

        quality_score = (completeness * 0.4 +
                        (1 if variability == "good" else 0.5) * 0.3 +
                        (1 if in_range else 0) * 0.3)

        if quality_score > 0.8:
            return "excellent"
        elif quality_score > 0.6:
            return "good"
        elif quality_score > 0.4:
            return "fair"
        else:
            return "poor"

    def process_time_series(self, time_series_data):
        """
        Zaawansowana analiza szeregów czasowych
        """
        data = np.array(time_series_data)

        # Obliczanie średniej ruchomej
        window_size = min(10, len(data) // 2)
        moving_average = np.convolve(data, np.ones(window_size)/window_size, mode='valid')

        # Detekcja sezonowości (prosta)
        if len(data) >= 24:  # Zakładamy dane godzinowe
            daily_pattern = []
            for i in range(24):
                daily_values = data[i::24]  # Co 24 godziny
                if len(daily_values) > 0:
                    daily_pattern.append(np.mean(daily_values))

            seasonality_score = np.std(daily_pattern) / np.mean(daily_pattern)
            has_seasonality = seasonality_score > 0.1
        else:
            has_seasonality = False
            seasonality_score = 0

        # Analiza autokorelacji (uproszczona)
        if len(data) > 10:
            autocorr = np.correlate(data, data, mode='full')[len(data)-1:]
            autocorr = autocorr[:min(10, len(autocorr))]  # Pierwsze 10 lagów
            significant_autocorr = np.abs(autocorr[1:]) > 0.3  # Próg 0.3
            has_autocorrelation = np.any(significant_autocorr)
        else:
            has_autocorrelation = False

        return {
            'moving_average': moving_average.tolist(),
            'seasonality': {
                'detected': has_seasonality,
                'score': seasonality_score
            },
            'autocorrelation': {
                'detected': has_autocorrelation,
                'lags': significant_autocorr.tolist() if 'significant_autocorr' in locals() else []
            }
        }

# Przykład użycia
agent = DataAnalysisAgent()

# Analiza danych z sensora temperatury
temperature_readings = [22.1, 22.3, 22.0, 21.8, 21.9, 22.2, 22.4, 25.1, 22.1, 21.7]
analysis = agent.analyze_sensor_data(temperature_readings)

print("Analiza danych sensora:")
print(f"Średnia: {analysis['statistics']['mean']:.2f}°C")
print(f"Trend: {analysis['trend']}")
print(f"Anomalie: {analysis['anomalies']}")
print(f"Jakość danych: {analysis['data_quality']}")

# Analiza szeregów czasowych (dane godzinowe przez tydzień)
hourly_data = np.random.normal(22, 2, 168)  # 7 dni * 24 godziny
time_analysis = agent.process_time_series(hourly_data)

print("\\nAnaliza szeregów czasowych:")
print(f"Sezonowość wykryta: {time_analysis['seasonality']['detected']}")
print(f"Autokorelacja: {time_analysis['autocorrelation']['detected']}")`}
          language="python"
          title="Agent analizy danych z użyciem NumPy"
        />

        <h2>Pandas - Manipulacja Danymi</h2>

        <CodeBlock
          code={`import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class CustomerAnalyticsAgent:
    def __init__(self):
        self.customers_df = None
        self.transactions_df = None

    def load_customer_data(self, customers_data, transactions_data):
        """
        Ładowanie danych klientów i transakcji
        """
        self.customers_df = pd.DataFrame(customers_data)
        self.transactions_df = pd.DataFrame(transactions_data)

        # Konwersja dat
        self.customers_df['registration_date'] = pd.to_datetime(self.customers_df['registration_date'])
        self.transactions_df['transaction_date'] = pd.to_datetime(self.transactions_df['transaction_date'])

        # Walidacja danych
        self._validate_data()

    def _validate_data(self):
        """
        Walidacja integralności danych
        """
        # Sprawdź duplikaty
        customer_duplicates = self.customers_df['customer_id'].duplicated().sum()
        transaction_duplicates = self.transactions_df.duplicated().sum()

        if customer_duplicates > 0:
            print(f"Ostrzeżenie: {customer_duplicates} zduplikowanych klientów")

        # Sprawdź brakujące wartości
        missing_customers = self.customers_df.isnull().sum().sum()
        missing_transactions = self.transactions_df.isnull().sum().sum()

        if missing_customers > 0 or missing_transactions > 0:
            print(f"Ostrzeżenie: brakujące wartości - {missing_customers} w klientach, {missing_transactions} w transakcjach")

    def calculate_rfm_metrics(self):
        """
        Obliczenie metryk RFM (Recency, Frequency, Monetary)
        """
        if self.transactions_df is None:
            raise ValueError("Brak danych transakcyjnych")

        # Obliczenie Recency
        max_date = self.transactions_df['transaction_date'].max()
        recency_df = self.transactions_df.groupby('customer_id')['transaction_date'].max().reset_index()
        recency_df['recency'] = (max_date - recency_df['transaction_date']).dt.days

        # Obliczenie Frequency
        frequency_df = self.transactions_df.groupby('customer_id').size().reset_index(name='frequency')

        # Obliczenie Monetary
        monetary_df = self.transactions_df.groupby('customer_id')['amount'].sum().reset_index(name='monetary')

        # Połączenie metryk
        rfm_df = recency_df.merge(frequency_df, on='customer_id').merge(monetary_df, on='customer_id')

        # Normalizacja do score'ów (1-5)
        rfm_df['r_score'] = pd.qcut(rfm_df['recency'], 5, labels=[5, 4, 3, 2, 1])  # Niższa recency = wyższy score
        rfm_df['f_score'] = pd.qcut(rfm_df['frequency'], 5, labels=[1, 2, 3, 4, 5])
        rfm_df['m_score'] = pd.qcut(rfm_df['monetary'], 5, labels=[1, 2, 3, 4, 5])

        # Łączny score RFM
        rfm_df['rfm_score'] = rfm_df['r_score'].astype(str) + rfm_df['f_score'].astype(str) + rfm_df['m_score'].astype(str)

        return rfm_df

    def segment_customers(self, rfm_df):
        """
        Segmentacja klientów na podstawie RFM
        """
        def get_segment(rfm_score):
            r, f, m = [int(x) for x in rfm_score]

            if r >= 4 and f >= 4 and m >= 4:
                return "Champions"
            elif r >= 3 and f >= 3 and m >= 3:
                return "Loyal Customers"
            elif r >= 3 and f >= 1 and m >= 3:
                return "Potential Loyalist"
            elif r >= 2 and f >= 2 and m >= 2:
                return "Needs Attention"
            elif r >= 2 and f >= 2 and m >= 1:
                return "At Risk"
            else:
                return "Lost"

        rfm_df['segment'] = rfm_df['rfm_score'].apply(get_segment)

        # Statystyki segmentów
        segment_stats = rfm_df.groupby('segment').agg({
            'customer_id': 'count',
            'recency': 'mean',
            'frequency': 'mean',
            'monetary': 'mean'
        }).round(2)

        return rfm_df, segment_stats

    def predict_customer_lifetime_value(self, rfm_df):
        """
        Prosta predykcja CLV (Customer Lifetime Value)
        """
        # Użyj regresji liniowej na podstawie historycznych danych
        from sklearn.linear_model import LinearRegression

        # Przygotuj dane
        X = rfm_df[['recency', 'frequency', 'monetary']]
        # W rzeczywistości CLV byłoby w osobnej kolumnie
        # Tutaj symulujemy na podstawie monetary * frequency
        y = rfm_df['monetary'] * rfm_df['frequency'] * 0.1  # Szacunkowy CLV

        # Trenowanie modelu
        model = LinearRegression()
        model.fit(X, y)

        # Predykcja CLV dla wszystkich klientów
        rfm_df['predicted_clv'] = model.predict(X)

        return rfm_df, model

    def generate_customer_insights(self):
        """
        Generowanie wniosków na temat klientów
        """
        rfm_df = self.calculate_rfm_metrics()
        segmented_df, segment_stats = self.segment_customers(rfm_df)
        clv_df, clv_model = self.predict_customer_lifetime_value(rfm_df)

        insights = []

        # Wnioski o segmentach
        top_segment = segment_stats.loc[segment_stats['customer_id'].idxmax()]
        insights.append(f"Największy segment to {top_segment.name} z {top_segment['customer_id']} klientami")

        # Wnioski o CLV
        high_clv_customers = clv_df[clv_df['predicted_clv'] > clv_df['predicted_clv'].quantile(0.8)]
        insights.append(f"{len(high_clv_customers)} klientów ma wysoki przewidywany CLV")

        # Wnioski o churn risk
        at_risk = segmented_df[segmented_df['segment'].isin(['At Risk', 'Lost'])]
        if len(at_risk) > 0:
            insights.append(f"{len(at_risk)} klientów jest zagrożonych odejściem - wymagają uwagi")

        return {
            'rfm_analysis': rfm_df,
            'segmentation': segmented_df,
            'segment_stats': segment_stats,
            'clv_analysis': clv_df,
            'insights': insights
        }

# Przykład użycia
agent = CustomerAnalyticsAgent()

# Przykładowe dane
customers_data = [
    {'customer_id': 'C001', 'name': 'Jan Kowalski', 'registration_date': '2023-01-15'},
    {'customer_id': 'C002', 'name': 'Anna Nowak', 'registration_date': '2023-03-20'},
    {'customer_id': 'C003', 'name': 'Piotr Wiśniewski', 'registration_date': '2023-06-10'},
]

transactions_data = [
    {'customer_id': 'C001', 'transaction_date': '2024-01-15', 'amount': 150.50},
    {'customer_id': 'C001', 'transaction_date': '2024-01-20', 'amount': 89.99},
    {'customer_id': 'C002', 'transaction_date': '2024-01-18', 'amount': 299.99},
    {'customer_id': 'C002', 'transaction_date': '2024-01-22', 'amount': 45.00},
    {'customer_id': 'C003', 'transaction_date': '2024-01-10', 'amount': 75.50},
]

agent.load_customer_data(customers_data, transactions_data)
insights = agent.generate_customer_insights()

print("Wnioski z analizy klientów:")
for insight in insights['insights']:
    print(f"- {insight}")

print("\\nStatystyki segmentów:")
print(insights['segment_stats'])`}
          language="python"
          title="Agent analizy klientów z użyciem Pandas"
        />

        <h2>Scikit-learn - Uczenie Maszynowe</h2>

        <CodeBlock
          code={`from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report, mean_absolute_error
from sklearn.pipeline import Pipeline
import pandas as pd
import numpy as np

class MLAnalysisAgent:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.encoders = {}

    def train_customer_churn_predictor(self, customer_data):
        """
        Trenowanie modelu predykcji churn klientów
        """
        # Przygotowanie danych
        df = pd.DataFrame(customer_data)

        # Kodowanie zmiennych kategorycznych
        categorical_cols = ['plan_type', 'region', 'device_type']
        for col in categorical_cols:
            if col not in self.encoders:
                self.encoders[col] = LabelEncoder()
            df[col] = self.encoders[col].fit_transform(df[col])

        # Wybór cech
        features = ['tenure_months', 'monthly_charges', 'total_charges',
                   'plan_type', 'region', 'device_type', 'support_calls',
                   'data_usage_gb', 'satisfaction_score']

        X = df[features]
        y = df['churned']

        # Podział na zbiór treningowy i testowy
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        # Skalowanie cech
        if 'churn_scaler' not in self.scalers:
            self.scalers['churn_scaler'] = StandardScaler()
        X_train_scaled = self.scalers['churn_scaler'].fit_transform(X_train)
        X_test_scaled = self.scalers['churn_scaler'].transform(X_test)

        # Trenowanie modelu Random Forest
        model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            random_state=42,
            class_weight='balanced'
        )

        model.fit(X_train_scaled, y_train)

        # Ocena modelu
        train_score = model.score(X_train_scaled, y_train)
        test_score = model.score(X_test_scaled, y_test)

        # Cross-validation
        cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5)

        # Predykcje na zbiorze testowym
        y_pred = model.predict(X_test_scaled)
        classification_rep = classification_report(y_test, y_pred, output_dict=True)

        # Ważność cech
        feature_importance = dict(zip(features, model.feature_importances_))

        self.models['churn_predictor'] = {
            'model': model,
            'scaler': self.scalers['churn_scaler'],
            'encoders': {k: v for k, v in self.encoders.items() if k in categorical_cols},
            'features': features,
            'performance': {
                'train_accuracy': train_score,
                'test_accuracy': test_score,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'classification_report': classification_rep
            },
            'feature_importance': feature_importance
        }

        return self.models['churn_predictor']['performance']

    def predict_customer_churn(self, customer_features):
        """
        Predykcja churn dla pojedynczego klienta
        """
        if 'churn_predictor' not in self.models:
            raise ValueError("Model churn predictor nie został wytrenowany")

        model_data = self.models['churn_predictor']
        model = model_data['model']
        scaler = model_data['scaler']
        encoders = model_data['encoders']
        features = model_data['features']

        # Przygotowanie danych wejściowych
        df = pd.DataFrame([customer_features])

        # Kodowanie zmiennych kategorycznych
        for col, encoder in encoders.items():
            if col in df.columns:
                df[col] = encoder.transform(df[col])

        # Upewnij się, że wszystkie cechy są obecne
        for feature in features:
            if feature not in df.columns:
                df[feature] = 0  # Domyślna wartość

        X = df[features]
        X_scaled = scaler.transform(X)

        # Predykcja
        churn_probability = model.predict_proba(X_scaled)[0][1]
        churn_prediction = model.predict(X_scaled)[0]

        return {
            'churn_prediction': bool(churn_prediction),
            'churn_probability': float(churn_probability),
            'risk_level': 'high' if churn_probability > 0.7 else 'medium' if churn_probability > 0.4 else 'low'
        }

    def train_sales_predictor(self, sales_data):
        """
        Trenowanie modelu predykcji sprzedaży
        """
        df = pd.DataFrame(sales_data)

        # Przygotowanie cech czasowych
        df['month'] = pd.to_datetime(df['date']).dt.month
        df['quarter'] = pd.to_datetime(df['date']).dt.quarter
        df['year'] = pd.to_datetime(df['date']).dt.year

        # Kodowanie zmiennych kategorycznych
        if 'product_category' in df.columns:
            if 'product_encoder' not in self.encoders:
                self.encoders['product_encoder'] = LabelEncoder()
            df['product_category_encoded'] = self.encoders['product_encoder'].fit_transform(df['product_category'])

        # Cehy dla predykcji
        features = ['month', 'quarter', 'year', 'price', 'marketing_spend',
                   'competitor_price', 'seasonal_index']

        if 'product_category_encoded' in df.columns:
            features.append('product_category_encoded')

        X = df[features]
        y = df['sales_volume']

        # Podział danych
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Skalowanie
        if 'sales_scaler' not in self.scalers:
            self.scalers['sales_scaler'] = StandardScaler()
        X_train_scaled = self.scalers['sales_scaler'].fit_transform(X_train)
        X_test_scaled = self.scalers['sales_scaler'].transform(X_test)

        # Model Gradient Boosting Regressor
        model = GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=6,
            random_state=42
        )

        model.fit(X_train_scaled, y_train)

        # Ocena modelu
        y_pred = model.predict(X_test_scaled)
        mae = mean_absolute_error(y_test, y_pred)
        r2_score = model.score(X_test_scaled, y_test)

        self.models['sales_predictor'] = {
            'model': model,
            'scaler': self.scalers['sales_scaler'],
            'features': features,
            'performance': {
                'mae': mae,
                'r2_score': r2_score
            }
        }

        return self.models['sales_predictor']['performance']

    def generate_business_recommendations(self, customer_data, sales_data):
        """
        Generowanie rekomendacji biznesowych na podstawie modeli ML
        """
        recommendations = []

        # Analiza churn
        if 'churn_predictor' in self.models:
            high_risk_customers = []
            for customer in customer_data[-100:]:  # Ostatnich 100 klientów
                prediction = self.predict_customer_churn(customer)
                if prediction['risk_level'] == 'high':
                    high_risk_customers.append(customer)

            if high_risk_customers:
                recommendations.append({
                    'type': 'churn_prevention',
                    'priority': 'high',
                    'message': f"{len(high_risk_customers)} klientów ma wysokie ryzyko odejścia. Rozważ kampanię lojalnościową.",
                    'action_items': [
                        "Wysłać spersonalizowane oferty",
                        "Skontaktować się z działem obsługi klienta",
                        "Zaoferować program lojalnościowy"
                    ]
                })

        # Analiza sprzedaży
        if 'sales_predictor' in self.models:
            # Predykcja sprzedaży na następny miesiąc
            next_month_features = {
                'month': 2,  # Luty
                'quarter': 1,
                'year': 2024,
                'price': sales_data[-1]['price'] * 1.05,  # 5% wzrost ceny
                'marketing_spend': sales_data[-1]['marketing_spend'] * 1.2,  # 20% więcej na marketing
                'competitor_price': sales_data[-1]['competitor_price'],
                'seasonal_index': 0.8  # Sezonowo niższy w lutym
            }

            # Tutaj należałoby zaimplementować predykcję dla przyszłych danych
            recommendations.append({
                'type': 'sales_optimization',
                'priority': 'medium',
                'message': "Zalecana optymalizacja strategii cenowej i marketingowej.",
                'action_items': [
                    "Przeanalizować elastyczność cenową",
                    "Zoptymalizować budżet marketingowy",
                    "Przygotować plan na sezonowe wahania"
                ]
            })

        return recommendations

# Przykład użycia
agent = MLAnalysisAgent()

# Przykładowe dane klientów
customer_data = [
    {'tenure_months': 12, 'monthly_charges': 89.99, 'total_charges': 1079.88,
     'plan_type': 'premium', 'region': 'EU', 'device_type': 'mobile',
     'support_calls': 2, 'data_usage_gb': 45, 'satisfaction_score': 4.2, 'churned': 0},
    # ... więcej danych ...
]

# Trenowanie modeli
churn_performance = agent.train_customer_churn_predictor(customer_data)
print(f"Model churn: accuracy = {churn_performance['test_accuracy']:.3f}")

# Generowanie rekomendacji
recommendations = agent.generate_business_recommendations(customer_data, [])
print("\\nRekomendacje biznesowe:")
for rec in recommendations:
    print(f"- {rec['message']}")`}
          language="python"
          title="Agent analizy biznesowej z użyciem scikit-learn"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Biblioteki Python dla Agentów AI</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>NumPy:</strong> Obliczenia numeryczne, arrays wielowymiarowe, algebra liniowa</li>
            <li>• <strong>Pandas:</strong> Manipulacja danymi, DataFrames, analiza czasowa</li>
            <li>• <strong>Scikit-learn:</strong> Algorytmy ML, preprocessing, ocena modeli</li>
            <li>• <strong>TensorFlow/PyTorch:</strong> Deep learning, sieci neuronowe</li>
            <li>• <strong>FastAPI:</strong> Tworzenie REST API dla agentów</li>
            <li>• <strong>SQLAlchemy:</strong> ORM do baz danych</li>
            <li>• <strong>AsyncIO:</strong> Programowanie asynchroniczne</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Python oferuje najbogatszy ekosystem narzędzi do tworzenia agentów AI. NumPy zapewnia
          wydajne obliczenia numeryczne, Pandas umożliwia zaawansowaną manipulację danymi,
          a scikit-learn dostarcza gotowych algorytmów uczenia maszynowego.
        </p>

        <p>
          W następnym tutorialu poznasz zaawansowane techniki programowania, w tym wzorce
          architektoniczne, optymalizację wydajności i bezpieczeństwo aplikacji.
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
          href="/samouczki/programowanie/javascript-dla-agentow"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Poprzedni Tutorial: JavaScript dla Agentów
        </Link>
        <Link
          href="/samouczki/programowanie/zaawansowane-techniki"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Następny Tutorial: Zaawansowane Techniki →
        </Link>
      </motion.div>
    </div>
  );
}