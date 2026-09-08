/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          dark: "#1E3A8A",
          light: "#3B82F6",
          50: "#EFF6FF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F8FAFC",
          blue: "#EFF6FF",
        },
        ink: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          muted: "#64748B",
        },
        border: {
          DEFAULT: "#E2E8F0",
        },
        status: {
          success: "#16A34A",
          successBg: "#F0FDF4",
          warning: "#F59E0B",
          warningBg: "#FFFBEB",
          error: "#DC2626",
          errorBg: "#FEF2F2",
          info: "#0EA5E9",
          infoBg: "#F0F9FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "page-title": ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        "section-heading": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "card-heading": ["0.9375rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        body: ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }],
        helper: ["0.75rem", { lineHeight: "1.125rem", fontWeight: "400" }],
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "12px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)",
        elevated: "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
