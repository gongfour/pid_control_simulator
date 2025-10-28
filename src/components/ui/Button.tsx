import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "filled-tonal" | "outlined" | "text" | "elevated";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "filled", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95";

    // Material Design 3 버튼 변형
    const variants = {
      // Filled (Primary)
      filled:
        "bg-blue-600 text-white hover:shadow-1 active:shadow-0 focus-visible:ring-blue-500 dark:bg-blue-400 dark:text-blue-950 dark:hover:shadow-1",

      // Filled Tonal (Secondary)
      "filled-tonal":
        "bg-blue-200 text-blue-900 hover:shadow-1 active:shadow-0 focus-visible:ring-blue-400 dark:bg-blue-700 dark:text-blue-200 dark:hover:shadow-1",

      // Outlined
      outlined:
        "border-2 border-blue-600 text-blue-600 hover:shadow-0 active:shadow-0 focus-visible:ring-blue-500 dark:border-blue-400 dark:text-blue-400",

      // Text (Ghost)
      text: "text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-950 dark:active:bg-blue-900",

      // Elevated
      elevated:
        "bg-blue-50 text-blue-600 shadow-1 hover:shadow-2 active:shadow-0 focus-visible:ring-blue-500 dark:bg-blue-900 dark:text-blue-200 dark:hover:shadow-2",
    };

    // Material Design 3 사이즈
    const sizes = {
      sm: "h-10 px-3 text-label-md", // 40px
      md: "h-12 px-6 text-label-lg", // 48px
      lg: "h-14 px-8 text-title-sm", // 56px
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
          className || ""
        }`}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
