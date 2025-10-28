import * as React from "react";

// Material Design 3 Card variants
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "filled" | "outlined" | "elevated";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "outlined", ...props }, ref) => {
    const baseStyles = "rounded-lg transition-all duration-300";

    const variants = {
      // Outlined - 강한 테두리로 구분감 강화
      outlined:
        "border-2 border-neutral-variant-40 bg-white dark:border-neutral-variant-30 dark:bg-neutral-10 hover:shadow-2 hover:border-neutral-variant-50 dark:hover:border-neutral-variant-40",

      // Filled - 배경 그라데이션으로 깊이감 표현
      filled:
        "border-0 bg-gradient-to-br from-neutral-97 to-neutral-93 dark:from-neutral-18 dark:to-neutral-12 shadow-1",

      // Elevated - 강한 그림자로 띄워내기
      elevated:
        "border-0 bg-white shadow-3 dark:bg-neutral-10 dark:shadow-3 hover:shadow-5",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className || ""}`}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col gap-2 border-b-2 border-neutral-variant-30 px-7 py-5 dark:border-neutral-variant-25 ${
      className || ""
    }`}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-headline-md font-medium text-neutral-10 dark:text-neutral-99 ${
      className || ""
    }`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`px-7 py-6 ${className || ""}`} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
