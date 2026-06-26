"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-bold">页面出错了</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {error.message || "未知错误"}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded text-sm"
      >
        重试
      </button>
    </main>
  );
}
