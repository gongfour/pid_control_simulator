import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800",
      secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-500 dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-600",
      ghost: "text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-500 dark:text-slate-50 dark:hover:bg-slate-800",
      outline: "border-2 border-slate-300 text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-500 dark:border-slate-600 dark:text-slate-50 dark:hover:bg-slate-900"
    }

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg"
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
