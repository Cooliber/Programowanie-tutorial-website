export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Strona nie została znaleziona</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Przepraszamy, strona której szukasz nie istnieje.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Wróć do strony głównej
        </a>
      </div>
    </div>
  );
}