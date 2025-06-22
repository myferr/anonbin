"use client";
import { Dot } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";

export default function HomePage() {
  const [pastes, setPastes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return document.getElementById("layout")?.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "light";
  });
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    const layout = document.getElementById("layout");
    if (layout) {
      layout.classList.remove(theme);
      layout.classList.add(newTheme);
    }
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme); // triggers re-render
  };

  useEffect(() => {
    fetch("/api/public")
      .then((res) => res.json())
      .then((data) => setPastes(data))
      .catch(() => setPastes([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <main className="p-6 min-h-screen justify-center flex flex-col gap-4">
        <div className="flex gap-8 text-muted-foreground/50">
          <Link
            href={"/privacy"}
            className="hover:underline hover:text-muted-foreground"
          >
            Privacy Policy
          </Link>
          <Dot />
          <Link
            href={"/terms"}
            className="hover:underline hover:text-muted-foreground"
          >
            Terms of Service
          </Link>
        </div>
        <h1 className="text-lg text-muted-foreground/50 mb-4 mt-6 pointer-events-none">
          Welcome to anonbin!
        </h1>
        <h1 className="text-3xl">
          <pre>
            {`
                          _     _       
                         | |   (_)      
   __ _ _ __   ___  _ __ | |__  _ _ __  
  / _\` | '_ \\ / _ \\| '_ \\| '_ \\| | '_ \\
 | (_| | | | | (_) | | | | |_) | | | | |
  \\__,_|_| |_|\___/|_| |_|_.__/|_|_|_|_|_|
                                        
                                        
            `}
          </pre>
        </h1>
        <p>An anonymous pastebin {":3"}</p>
        <h1 className="text-lg text-muted-foreground/50 mb-4 mt-6 pointer-events-none">
          $ ls ~/pastes
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : pastes.length === 0 ? (
          <p>No public pastes yet.</p>
        ) : (
          <ul className="space-y-2">
            {pastes.map((p) => (
              <li key={p.id}>
                <Link href={`/view/${p.id}`} className="hover:underline">
                  {p.id}
                </Link>{" "}
                <small className="text-xs">({p.created})</small>{" "}
                <span className="text-muted-foreground/50">\n</span>
              </li>
            ))}
          </ul>
        )}

        <h1 className="text-lg text-muted-foreground/50 mb-4 mt-6 pointer-events-none">
          $ cat ~/uploadAPaste.md
        </h1>
        <p>
          Go to{" "}
          <Link
            href={"/upload"}
            className="border text-muted-foreground/50 p-2 mr-2"
          >
            /upload
          </Link>
          to upload your paste(s).
          <span className="text-muted-foreground/50">\n</span>
          <span className="text-muted-foreground/50">\n</span>
          <br />
          <br />
          Pretty cool right?
        </p>
        <h1 className="text-lg text-muted-foreground/50 mb-4 mt-6 pointer-events-none">
          $ echo ~/links.md
        </h1>
        <p>
          <Link
            href="https://github.com/myferr/anonbin"
            className="font-bold hover:underline"
          >
            [github](https://github.com/myferr/anonbin)
          </Link>
        </p>
        <h1 className="text-lg text-muted-foreground/50 mb-4 mt-6 pointer-events-none">
          $ echo ~/components/ThemeToggle.tsx
        </h1>
        <button
          onClick={toggleTheme}
          className="text-neutral-500 hover:cursor-pointer dark:hover:text-white hover:text-neutral-800 transition-colors"
        >
          {theme === "dark" ? <Fa.FaMoon /> : <Fa.FaSun />}
        </button>
      </main>
    </div>
  );
}
