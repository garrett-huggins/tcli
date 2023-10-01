import Image from "next/image";
import ToggleTheme from "@/components/toggleTheme";

export default function Home() {
  return (
    <main>
      <nav className="flex items-center justify-between p-4 bg-muted">
        <p>Next.js + Shadcn</p>
        <ToggleTheme />
      </nav>
      <div className="container">
        <h1>Hello World!</h1>
      </div>
    </main>
  );
}
