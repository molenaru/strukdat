import { useState } from "react";
// import "./App.css";

function Navbar() {
  const [theme, setTheme] = useState((window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Update CSS variables sesuai tema
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.style.setProperty("--text", "#9ca3af");
      root.style.setProperty("--text-h", "#f3f4f6");
      root.style.setProperty("--bg", "#16171d");
      root.style.setProperty("--border", "#2e303a");
      root.style.setProperty("--code-bg", "#1f2028");
      root.style.setProperty("--accent", "#c084fc");
      root.style.setProperty("--accent-bg", "rgba(192, 132, 252, 0.15)");
      root.style.setProperty("--accent-border", "rgba(192, 132, 252, 0.5)");
      root.style.setProperty("--social-bg", "rgba(47, 48, 58, 0.5)");
    } else {
      root.style.setProperty("--text", "#6b6375");
      root.style.setProperty("--text-h", "#08060d");
      root.style.setProperty("--bg", "#fff");
      root.style.setProperty("--border", "#e5e4e7");
      root.style.setProperty("--code-bg", "#f4f3ec");
      root.style.setProperty("--accent", "#aa3bff");
      root.style.setProperty("--accent-bg", "rgba(170, 59, 255, 0.1)");
      root.style.setProperty("--accent-border", "rgba(170, 59, 255, 0.5)");
      root.style.setProperty("--social-bg", "rgba(244, 243, 236, 0.5)");
    }
  };

  return (
    // Navbar
    <nav className="relative bg-[var(--bg)] text-[var(--text)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <img src="/logo.png" className="h-32"  alt="" />

        {/* Tombol toggle tema */}
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 hover:bg-[var(--accent-bg)]"
        >
          {theme === "light" ? (
            // Ikon matahari
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6 text-yellow-500"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            // Ikon bulan
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6 text-indigo-400"
            >
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>

  );
}

export default Navbar;
