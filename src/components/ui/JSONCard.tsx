import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface JSONCardProps {
    data: Record<string, any>;
    title?: string;
    className?: string;
}

export const JSONCard = ({ data, title, className = '' }: JSONCardProps): JSX.Element => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderValue = (value: any, indent: number = 0): ReactNode => {
        const indentSpaces = '  '.repeat(indent);

        if (value === null) {
            return <span className="text-gray-400 dark:text-gray-500">null</span>;
        }

        if (typeof value === 'string') {
            return <span className="text-green-600 dark:text-green-400">"{value}"</span>;
        }

        if (typeof value === 'number') {
            return <span className="text-blue-600 dark:text-cyan-400">{value}</span>;
        }

        if (typeof value === 'boolean') {
            return <span className="text-purple-600 dark:text-purple-400">{value.toString()}</span>;
        }

        if (Array.isArray(value)) {
            return (
                <span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-700 dark:text-gray-300"
                    >
                        [
                    </motion.span>
                    {value.length > 0 && (
                        <>
                            {'\n'}
                            {value.map((item, index) => (
                                <span key={index}>
                                    {indentSpaces}  {renderValue(item, indent + 1)}
                                    {index < value.length - 1 ? ',' : ''}
                                    {'\n'}
                                </span>
                            ))}
                            {indentSpaces}
                        </>
                    )}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-700 dark:text-gray-300"
                    >
                        ]
                    </motion.span>
                </span>
            );
        }

        if (typeof value === 'object') {
            const entries = Object.entries(value);
            return (
                <span>
                    <motion.span
                        animate={{ rotateY: isHovered ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 dark:text-gray-300 inline-block"
                    >
                        {'{'}
                    </motion.span>
                    {entries.length > 0 && (
                        <>
                            {'\n'}
                            {entries.map(([key, val], index) => (
                                <span key={key}>
                                    {indentSpaces}  <span className="text-red-600 dark:text-red-400">"{key}"</span>
                                    <span className="text-gray-700 dark:text-gray-300">: </span>
                                    {renderValue(val, indent + 1)}
                                    {index < entries.length - 1 ? ',' : ''}
                                    {'\n'}
                                </span>
                            ))}
                            {indentSpaces}
                        </>
                    )}
                    <motion.span
                        animate={{ rotateY: isHovered ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 dark:text-gray-300 inline-block"
                    >
                        {'}'}
                    </motion.span>
                </span>
            );
        }

        return String(value);
    };

    return (
        <motion.div
            className={`relative bg-white dark:bg-neutral-900/80 rounded-lg border border-gray-200 dark:border-green-400/20 p-6 font-mono text-sm overflow-x-auto ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {title && (
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-xs">// {title}</span>
                    <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        aria-label="Copy JSON"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            )}
            <pre className="whitespace-pre-wrap break-words">
                <code>{renderValue(data)}</code>
            </pre>
        </motion.div>
    );
};
