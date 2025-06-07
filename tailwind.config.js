/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Main colors
        primary: "#14b8a6",
        secondary: "#6b7280",

        // Text colors
        text: {
          primary: "#111827",
          secondary: "#374151",
          muted: "#6b7280",
          placeholder: "#9ca3af",
          inverse: "#ffffff",
        },

        // Border colors
        border: {
          light: "#f3f4f6",
          DEFAULT: "#e5e7eb",
          dark: "#d1d5db",
        },

        // Button colors
        button: {
          primary: "#14b8a6",
          secondary: "#f9fafb",
          disabled: "#d1d5db",
        },

        // Focus states
        focus: {
          ring: "#14b8a6",
          border: "#14b8a6",
        },

        // FODMAP levels
        fodmap: {
          low: "#10b981",
          moderate: "#f59e0b",
          high: "#ef4444",
        },

        symptom: {
          1: "#10b981", 
          2: "#84cc16", 
          3: "#f59e0b", 
          4: "#f97316", 
          5: "#ef4444", 
        },

        // Surface colors
        surface: {
          primary: "#ffffff",
          secondary: "#f9fafb",
          tertiary: "#f3f4f6",
          overlay: "rgba(0, 0, 0, 0.5)",
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
      },

      // Spacing
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

      // Border radius
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
        // Common component styles
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
      };

      addUtilities(newUtilities);
    },
  ],
};
