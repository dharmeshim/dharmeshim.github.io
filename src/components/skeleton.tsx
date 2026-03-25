import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { shimmer } from "../lib/animations";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    animated?: boolean;
}

function Skeleton({ className, animated = true, ...props }: SkeletonProps) {
    if (animated) {
        return (
            <motion.div
                initial="initial"
                animate="animate"
                variants={shimmer}
                className={cn(
                    "rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800",
                    "bg-[length:200%_100%]",
                    className
                )}
                style={{
                    backgroundSize: '200% 100%'
                }}
                {...props}
            />
        );
    }

    return (
        <div
            className={cn("animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800", className)}
            {...props}
        />
    );
}

// Preset skeleton components
const SkeletonText = ({ className, ...props }: SkeletonProps) => (
    <Skeleton className={cn("h-4 w-full", className)} {...props} />
);

const SkeletonHeading = ({ className, ...props }: SkeletonProps) => (
    <Skeleton className={cn("h-8 w-3/4", className)} {...props} />
);

const SkeletonCircle = ({ className, ...props }: SkeletonProps) => (
    <Skeleton className={cn("h-12 w-12 rounded-full", className)} {...props} />
);

const SkeletonCard = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("space-y-3 p-6 rounded-2xl border border-gray-200 dark:border-gray-800", className)} {...props}>
        <SkeletonHeading />
        <SkeletonText />
        <SkeletonText className="w-5/6" />
        <SkeletonText className="w-4/6" />
    </div>
);

export { Skeleton, SkeletonText, SkeletonHeading, SkeletonCircle, SkeletonCard };
