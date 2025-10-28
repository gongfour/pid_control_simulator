/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ============================================================
      // Material Design 3 색상 시스템
      // ============================================================
      colors: {
        // Primary (Blue) - PID 제어의 주요 색상
        primary: {
          0: "#ffffff",
          10: "#fffbfe",
          20: "#fef7ff",
          25: "#fdf5ff",
          30: "#fce7ff",
          35: "#f9e0ff",
          40: "#f5ddff",
          50: "#ede4ff",
          60: "#e0c3ff",
          70: "#d0a9ff",
          80: "#c29dff",
          90: "#eaddff",
          95: "#f6edff",
          99: "#fffbfe",
          100: "#ffffff",
        },

        // Secondary (Light Blue) - 보조 강조
        secondary: {
          0: "#000000",
          10: "#0d1f2d",
          20: "#1a3a47",
          25: "#205563",
          30: "#265470",
          35: "#2d6d7d",
          40: "#33868b",
          50: "#4fa9b0",
          60: "#6cc4ca",
          70: "#84dee6",
          80: "#9df8ff",
          90: "#b3f9ff",
          95: "#cfffff",
          99: "#f1ffff",
          100: "#ffffff",
        },

        // Tertiary (Teal) - 데이터 시각화용
        tertiary: {
          0: "#000000",
          10: "#1a3730",
          20: "#2d5047",
          25: "#375a53",
          30: "#42655f",
          35: "#4d706b",
          40: "#587b77",
          50: "#6f9995",
          60: "#88b4b0",
          70: "#a2cfca",
          80: "#bceae6",
          90: "#d6f6f1",
          95: "#e0fdf9",
          99: "#f1fffb",
          100: "#ffffff",
        },

        // Neutral (Gray) - 배경, 텍스트
        neutral: {
          0: "#000000",
          4: "#0f0f0f",
          6: "#121212",
          10: "#1a1a1a",
          12: "#1f1f1f",
          17: "#2b2b2b",
          20: "#323232",
          22: "#383838",
          24: "#3d3d3d",
          25: "#3f3f3f",
          30: "#4d4d4d",
          35: "#59595a",
          40: "#646464",
          50: "#7e7e7e",
          60: "#989898",
          70: "#b3b3b3",
          80: "#cdcdcd",
          90: "#e8e8e8",
          95: "#f3f3f3",
          99: "#fffbfe",
          100: "#ffffff",
        },

        // Neutral Variant - 중성 변형
        "neutral-variant": {
          0: "#000000",
          10: "#1a1d1f",
          20: "#2e3133",
          25: "#393c3f",
          30: "#44474a",
          35: "#4f5255",
          40: "#5a5d60",
          50: "#74777f",
          60: "#8f9297",
          70: "#aab1b8",
          80: "#c5ccd4",
          90: "#e1e7f0",
          95: "#f0f6ff",
          99: "#fffbfe",
          100: "#ffffff",
        },

        // Error (Red)
        error: {
          0: "#000000",
          10: "#410e0b",
          20: "#601410",
          25: "#74201a",
          30: "#8c1d17",
          35: "#a4281d",
          40: "#b3261e",
          50: "#de3730",
          60: "#e46962",
          70: "#ec928e",
          80: "#f2b8b5",
          90: "#f9dedc",
          95: "#fceeee",
          99: "#fffbf9",
          100: "#ffffff",
        },

        // Orange (for Ki - Integral coefficient)
        orange: {
          0: "#000000",
          10: "#3a1f00",
          20: "#5d2e0f",
          25: "#743b1b",
          30: "#8d4926",
          35: "#a45830",
          40: "#ba663a",
          50: "#d67c3a",
          60: "#f0934d",
          70: "#ffb396",
          80: "#ffd4ad",
          90: "#ffebd9",
          95: "#fff8f2",
          99: "#fffbfe",
          100: "#ffffff",
        },

        // Purple (for Kd - Derivative coefficient)
        purple: {
          0: "#000000",
          10: "#2d0052",
          20: "#46096a",
          25: "#52137a",
          30: "#5d1d8b",
          35: "#6a259a",
          40: "#7730b2",
          50: "#8e4cc7",
          60: "#a878d8",
          70: "#c5a3e8",
          80: "#e3c9f8",
          90: "#f5e6ff",
          95: "#faf7ff",
          99: "#fffbfe",
          100: "#ffffff",
        },
      },

      // ============================================================
      // Material Design 3 타이포그래피
      // ============================================================
      fontSize: {
        // Display
        "display-lg": [
          "3.5625rem",
          {
            lineHeight: "4rem",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "display-md": [
          "2.8125rem",
          {
            lineHeight: "3.25rem",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "display-sm": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],

        // Headline
        "headline-lg": [
          "2rem",
          {
            lineHeight: "2.5rem",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "headline-md": [
          "1.75rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "headline-sm": [
          "1.5rem",
          {
            lineHeight: "2rem",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],

        // Title
        "title-lg": [
          "1.375rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "500",
            letterSpacing: "0.0125em",
          },
        ],
        "title-md": [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "500",
            letterSpacing: "0.015em",
          },
        ],
        "title-sm": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "500",
            letterSpacing: "0.0125em",
          },
        ],

        // Body
        "body-lg": [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
            letterSpacing: "0.03125em",
          },
        ],
        "body-md": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "400",
            letterSpacing: "0.025em",
          },
        ],
        "body-sm": [
          "0.75rem",
          {
            lineHeight: "1rem",
            fontWeight: "400",
            letterSpacing: "0.0375em",
          },
        ],

        // Label
        "label-lg": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "500",
            letterSpacing: "0.0125em",
          },
        ],
        "label-md": [
          "0.75rem",
          {
            lineHeight: "1rem",
            fontWeight: "500",
            letterSpacing: "0.03125em",
          },
        ],
        "label-sm": [
          "0.6875rem",
          {
            lineHeight: "1rem",
            fontWeight: "500",
            letterSpacing: "0.03125em",
          },
        ],
      },

      // ============================================================
      // Material Design 3 간격 (4px 기반)
      // ============================================================
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        20: "80px",
        24: "96px",
      },

      // ============================================================
      // Material Design 3 Border Radius (Shape)
      // ============================================================
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "28px",
        full: "9999px",
      },

      // ============================================================
      // Material Design 3 그림자 (Elevation)
      // ============================================================
      boxShadow: {
        // Level 0
        0: "none",
        // Level 1
        1: "0px 2px 4px rgba(0, 0, 0, 0.04), 0px 4px 6px rgba(0, 0, 0, 0.08)",
        // Level 2
        2: "0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 14px rgba(0, 0, 0, 0.2)",
        // Level 3
        3: "0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)",
        // Level 4
        4: "0px 8px 12px rgba(0, 0, 0, 0.14), 0px 4px 18px rgba(0, 0, 0, 0.12)",
        // Level 5
        5: "0px 12px 16px rgba(0, 0, 0, 0.14), 0px 4px 22px rgba(0, 0, 0, 0.12)",
      },

      // ============================================================
      // 추가 설정
      // ============================================================
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
