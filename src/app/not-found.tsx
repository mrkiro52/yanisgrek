export default function GlobalNotFound() {
    return (
      <main className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">404 – Страница не найдена</h1>
        <p className="mt-4">
          <a href="/" className="underline">
            Вернуться на главную
          </a>
        </p>
      </main>
    );
  }
  