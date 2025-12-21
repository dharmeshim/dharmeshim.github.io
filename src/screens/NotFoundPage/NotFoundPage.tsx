import { motion } from 'framer-motion';
import { Home, Terminal } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const NotFoundPage = (): JSX.Element => {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
            <motion.div
                className="max-w-2xl w-full text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Terminal-style 404 */}
                <motion.div
                    className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-green-400/20 p-8 mb-8 font-mono text-left shadow-lg"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <Terminal className="w-4 h-4" />
                        <span>terminal</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <motion.span
                                className="text-green-500 dark:text-green-400"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                $
                            </motion.span>
                            <span className="text-gray-700 dark:text-gray-300">
                                cd {window.location.pathname}
                            </span>
                        </div>

                        <motion.div
                            className="pl-4 text-red-600 dark:text-red-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            bash: cd: {window.location.pathname}: No such file or directory
                        </motion.div>

                        <motion.div
                            className="pl-4 text-yellow-600 dark:text-yellow-400 text-sm mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
              // Error 404: Page not found
                        </motion.div>
                    </div>
                </motion.div>

                {/* Friendly message */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-green-400 font-mono">
                        404
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Oops! This page seems to have wandered off...
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 max-w-md mx-auto">
                        The page you're looking for doesn't exist. Maybe it was moved, deleted, or never existed in the first place.
                    </p>

                    {/* Navigation suggestions */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <Button
                            onClick={handleGoHome}
                            className="flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </Button>

                        <button
                            onClick={() => window.history.back()}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors font-mono text-sm"
                        >
                            ← Go back
                        </button>
                    </motion.div>

                    {/* Fun fact */}
                    <motion.div
                        className="mt-12 text-xs text-gray-400 dark:text-gray-600 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <p>💡 Fun fact: HTTP 404 was named after room 404 at CERN where the World Wide Web was created.</p>
                        <p className="mt-1">(Actually, that's a myth, but it's a fun story!)</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};
