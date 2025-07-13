import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404 – Страница не найдена</h1>
      <p className="mt-4">
        <Link href="/" className="underline">
          Вернуться на главную
        </Link>
      </p>
    </main>
  );
}
