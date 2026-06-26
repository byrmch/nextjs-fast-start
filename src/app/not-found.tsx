import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">页面不存在</p>
      <Link
        href="/"
        className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded text-sm"
      >
        返回首页
      </Link>
    </main>
  );
}
