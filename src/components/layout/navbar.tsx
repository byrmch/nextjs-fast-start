import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/20 bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          nextjs-fast-start
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground" />
      </div>
    </header>
  );
}
