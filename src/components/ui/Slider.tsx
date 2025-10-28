import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={`relative flex w-full touch-none select-none items-center py-2 ${className || ""}`}
    {...props}
  >
    {/* Track Background */}
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-neutral-variant-40 dark:bg-neutral-variant-40">
      {/* Track Fill */}
      <SliderPrimitive.Range className="absolute h-full bg-blue-600 dark:bg-blue-400 transition-all" />
    </SliderPrimitive.Track>

    {/* Thumb (Handle) */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-0 bg-blue-600 shadow-1 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 dark:bg-blue-400 dark:focus-visible:ring-offset-neutral-10 cursor-pointer transition-all duration-150 active:scale-110 hover:scale-110" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
