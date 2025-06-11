/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          primary: "#0d9488",
          secondary: "#14b8a6",
        },

        // Text colors with dark mode variants
        text: {
          primary: "#111827",
          secondary: "#374151",
          muted: "#6b7280",
          placeholder: "#9ca3af",
          inverse: "#ffffff",
          brand: "#0d9488",
        },

        // Dark mode text colors
        "text-dark": {
          primary: "#f3f4f6",
          secondary: "#d1d5db",
          muted: "#9ca3af",
          placeholder: "#6b7280",
          inverse: "#111827",
          brand: "#14b8a6",
        },

        // Surface/Background colors
        surface: {
          primary: "#ffffff",
          secondary: "#f9fafb",
          tertiary: "#f3f4f6",
          overlay: "rgba(0, 0, 0, 0.5)",
        },

        // Dark mode surface colors
        "surface-dark": {
          primary: "#18181b",
          secondary: "#23272f",
          tertiary: "#27272a",
          overlay: "rgba(0, 0, 0, 0.7)",
        },

        // Border colors
        border: {
          light: "#f3f4f6",
          DEFAULT: "#e5e7eb",
          brand: "#0d9488",
          focus: "#14b8a6",
        },

        // Dark mode border colors
        "border-dark": {
          light: "#374151",
          DEFAULT: "#d1d5db",
          brand: "#0d9488",
          focus: "#14b8a6",
        },

        // Button colors
        button: {
          primary: "#14b8a6",
          secondary: "#f9fafb",
          outline: "transparent",
          disabled: "#d1d5db",
        },

        // Dark mode button colors
        "button-dark": {
          primary: "#0d9488",
          secondary: "#1f2937",
          outline: "transparent",
          disabled: "#374151",
        },

        // FODMAP level colors (consistent across themes)
        fodmap: {
          low: "#10b981",
          moderate: "#f59e0b",
          high: "#ef4444",
        },

        // Symptom severity colors
        symptom: {
          1: "#10b981",
          2: "#84cc16",
          3: "#f59e0b",
          4: "#f97316",
          5: "#ef4444",
        },

        // Status colors
        success: {
          50: "#f0fdf4",
          500: "#10b981",
          DEFAULT: "#10b981",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          DEFAULT: "#f59e0b",
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          DEFAULT: "#ef4444",
        },
        info: {
          50: "#eff6ff",
          500: "#3b82f6",
          DEFAULT: "#3b82f6",
        },

        // Dark mode status colors
        "success-dark": {
          50: "#052e16",
          500: "#22d3ee",
          DEFAULT: "#22d3ee",
        },
        "warning-dark": {
          50: "#78350f",
          500: "#fde68a",
          DEFAULT: "#fde68a",
        },
        "error-dark": {
          50: "#7f1d1d",
          500: "#fca5a5",
          DEFAULT: "#fca5a5",
        },
        "info-dark": {
          50: "#1e3a8a",
          500: "#93c5fd",
          DEFAULT: "#93c5fd",
        },
      },

      // Spacing scale
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        safe: "44px",
      },

      // Box shadows
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        "card-lg": "0 4px 12px rgba(0, 0, 0, 0.1)",
        button: "0 4px 12px rgba(20, 184, 166, 0.3)",
        focus: "0 0 0 3px rgba(20, 184, 166, 0.1)",
      },

      // Border radius scale
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Card components
        ".card": {
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "16px",
          borderWidth: "1px",
          borderColor: "#e5e7eb",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        },

        ".card-lg": {
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "24px",
          borderWidth: "1px",
          borderColor: "#e5e7eb",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        },

        // Button components
        ".btn-primary": {
          backgroundColor: "#14b8a6",
          borderRadius: "12px",
          paddingVertical: 12,
          paddingHorizontal: 24,
          shadowColor: "#14b8a6",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        },

        ".btn-secondary": {
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderWidth: "1px",
          borderColor: "#e5e7eb",
        },

        ".btn-disabled": {
          backgroundColor: "#d1d5db",
          borderRadius: "12px",
          paddingVertical: 12,
          paddingHorizontal: 24,
          opacity: 0.6,
        },

        // Input components
        ".input": {
          borderWidth: "1px",
          borderColor: "#e5e7eb",
          borderRadius: "12px",
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          backgroundColor: "#ffffff",
          color: "#111827",
        },

        ".input-focus": {
          borderColor: "#14b8a6",
          shadowColor: "#14b8a6",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },

        ".input-error": {
          borderColor: "#ef4444",
          shadowColor: "#ef4444",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },

        // FODMAP badges
        ".badge-low": {
          backgroundColor: "#10b981",
          color: "#ffffff",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
          fontSize: 12,
          fontWeight: "500",
        },

        ".badge-moderate": {
          backgroundColor: "#f59e0b",
          color: "#ffffff",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
          fontSize: 12,
          fontWeight: "500",
        },

        ".badge-high": {
          backgroundColor: "#ef4444",
          color: "#ffffff",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
          fontSize: 12,
          fontWeight: "500",
        },

        // Status alerts
        ".alert-success": {
          backgroundColor: "#f0fdf4",
          borderColor: "#10b981",
          borderWidth: "1px",
          borderRadius: "12px",
          padding: 16,
        },

        ".alert-warning": {
          backgroundColor: "#fffbeb",
          borderColor: "#f59e0b",
          borderWidth: "1px",
          borderRadius: "12px",
          padding: 16,
        },

        ".alert-error": {
          backgroundColor: "#fef2f2",
          borderColor: "#ef4444",
          borderWidth: "1px",
          borderRadius: "12px",
          padding: 16,
        },

        ".alert-info": {
          backgroundColor: "#eff6ff",
          borderColor: "#3b82f6",
          borderWidth: "1px",
          borderRadius: "12px",
          padding: 16,
        },

        // Layout helpers
        ".screen-padding": {
          paddingHorizontal: 16,
          paddingVertical: 24,
        },

        ".section-spacing": {
          marginBottom: 24,
        },

        ".safe-area-top": {
          paddingTop: 44,
        },

        // Dark mode variants
        ".dark\\:card": {
          backgroundColor: "#18181b",
          borderColor: "#23272f",
        },

        ".dark\\:card-lg": {
          backgroundColor: "#18181b",
          borderColor: "#23272f",
        },

        ".dark\\:btn-primary": {
          backgroundColor: "#0d9488",
        },

        ".dark\\:btn-secondary": {
          backgroundColor: "#23272f",
          borderColor: "#374151",
        },

        ".dark\\:btn-disabled": {
          backgroundColor: "#374151",
        },

        ".dark\\:input": {
          backgroundColor: "#23272f",
          color: "#f3f4f6",
          borderColor: "#374151",
        },

        ".dark\\:alert-success": {
          backgroundColor: "#052e16",
          borderColor: "#22d3ee",
        },

        ".dark\\:alert-warning": {
          backgroundColor: "#78350f",
          borderColor: "#fde68a",
        },

        ".dark\\:alert-error": {
          backgroundColor: "#7f1d1d",
          borderColor: "#fca5a5",
        },

        ".dark\\:alert-info": {
          backgroundColor: "#1e3a8a",
          borderColor: "#93c5fd",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
