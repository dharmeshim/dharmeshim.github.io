import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
    animated?: boolean;
    gradient?: boolean;
}

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    SeparatorProps
>(
    (
        { className, orientation = "horizontal", decorative = true, animated = false, gradient = false, ...props },
        ref
    ) => {
        const separatorClasses = cn(
            "shrink-0",
            gradient
                ? orientation === "horizontal"
                    ? "h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
                    : "w-px h-full bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"
                : orientation === "horizontal"
                    ? "h-px w-full bg-gray-200 dark:bg-gray-800"
                    : "w-px h-full bg-gray-200 dark:bg-gray-800",
            className
        );

        if (animated) {
            return (
                <SeparatorPrimitive.Root
                    ref={ref}
                    decorative={decorative}
                    orientation={orientation}
                    asChild
                    {...props}
                >
                    <motion.div
                        initial={{ scaleX: orientation === "horizontal" ? 0 : 1, scaleY: orientation === "vertical" ? 0 : 1 }}
                        animate={{ scaleX: 1, scaleY: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={separatorClasses}
                    />
                </SeparatorPrimitive.Root>
            );
        }

        return (
            <SeparatorPrimitive.Root
                ref={ref}
                decorative={decorative}
                orientation={orientation}
                className={separatorClasses}
                {...props}
            />
        );
    }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
