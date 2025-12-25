"use client";


import { motion } from "framer-motion";

export default function ONasPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          O Nas
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Jesteśmy platformą dedykowaną edukacji w zakresie nowoczesnych technologii AI,
          skupiającą się na praktycznych umiejętnościach inżynierii kontekstu i rozwoju agentów.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg dark:prose-invert max-w-4xl mx-auto"
      >
        <h2>Nasza Misja</h2>
        <p>
          TutorialAI powstała z myślą o osobach pragnących zgłębić tajniki sztucznej inteligencji
          i nauczyć się tworzyć inteligentne systemy. Nasze tutoriale łączą teorię z praktyką,
          umożliwiając szybkie przyswojenie wiedzy i umiejętności.
        </p>

        <h2>Czego się Nauczysz</h2>
        <ul>
          <li>Inżynierii kontekstu - efektywnego zarządzania informacjami w systemach AI</li>
          <li>Protokołu MCP - nowoczesnego standardu integracji narzędzi z agentami</li>
          <li>Programowania agentów AI w JavaScript i Python</li>
          <li>Projektowania złożonych przepływów pracy</li>
          <li>Praktycznych zastosowań agentów w rzeczywistych scenariuszach</li>
        </ul>

        <h2>Dlaczego Wybrać TutorialAI</h2>
        <p>
          Nasze materiały są tworzone przez ekspertów z wieloletnim doświadczeniem w branży AI.
          Skupiamy się na praktycznych przykładach, które można natychmiast zastosować w projektach.
          Wszystkie tutoriale są dostępne bezpłatnie i regularnie aktualizowane.
        </p>
      </motion.div>
    </div>
  );
}