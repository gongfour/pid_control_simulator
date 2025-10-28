import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "filled" | "outlined";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "outlined", ...props }, ref) => {
    const baseStyles =
      "flex h-14 rounded-sm border transition-all duration-200 px-4 py-3 text-body-lg font-normal placeholder:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-40";

    const variants = {
      // Outlined (기본)
      outlined:
        "border-2 border-neutral-50 bg-white text-neutral-10 focus-visible:ring-blue-600 focus-visible:border-blue-600 dark:border-neutral-variant-40 dark:bg-neutral-10 dark:text-neutral-95",

      // Filled
      filled:
        "border-b-2 border-neutral-40 bg-neutral-95 text-neutral-10 focus-visible:ring-blue-600 focus-visible:border-blue-600 dark:border-neutral-variant-50 dark:bg-neutral-20 dark:text-neutral-95",
    };

    return (
      <input
        type={type}
        className={`${baseStyles} ${variants[variant]} ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
