import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CommentBlockProps {
    children: ReactNode;
    style?: 'block' | 'line' | 'hash';
    className?: string;
}

export const CommentBlock = ({
    children,
    style = 'block',
    className = '',
}: CommentBlockProps): JSX.Element => {
    const getCommentStyle = () => {
        switch (style) {
            case 'block':
                return {
                    prefix: '/*',
                    suffix: '*/',
                    linePrefix: ' * ',
                };
            case 'line':
                return {
                    prefix: '//',
                    suffix: '',
                    linePrefix: '// ',
                };
            case 'hash':
                return {
                    prefix: '#',
                    suffix: '',
                    linePrefix: '# ',
                };
        }
    };

    const commentStyle = getCommentStyle();

    return (
        <motion.div
            className={`font-mono text-sm text-gray-500 dark:text-gray-400 ${className}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {commentStyle.prefix && (
                <div className="mb-1">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {commentStyle.prefix}
                    </motion.span>
                </div>
            )}
            <div className="pl-2">{children}</div>
            {commentStyle.suffix && (
                <div className="mt-1">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {commentStyle.suffix}
                    </motion.span>
                </div>
            )}
        </motion.div>
    );
};
