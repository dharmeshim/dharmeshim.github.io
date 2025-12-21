import { useEffect } from 'react';

interface KeyboardShortcut {
    key: string;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    callback: () => void;
    description: string;
}

const shortcuts: KeyboardShortcut[] = [
    {
        key: 'k',
        ctrlKey: true,
        metaKey: true,
        callback: () => {
            // Quick navigation - will implement modal later
            console.log('Quick navigation triggered');
        },
        description: 'Quick navigation',
    },
    {
        key: '/',
        ctrlKey: true,
        metaKey: true,
        callback: () => {
            // Show shortcuts - will implement modal later
            console.log('Show shortcuts triggered');
        },
        description: 'Show keyboard shortcuts',
    },
    {
        key: '1',
        callback: () => scrollToSection('home'),
        description: 'Jump to Home',
    },
    {
        key: '2',
        callback: () => scrollToSection('experience'),
        description: 'Jump to Experience',
    },
    {
        key: '3',
        callback: () => scrollToSection('projects'),
        description: 'Jump to Projects',
    },
    {
        key: '4',
        callback: () => scrollToSection('education'),
        description: 'Jump to Education',
    },
    {
        key: '5',
        callback: () => scrollToSection('knowledge'),
        description: 'Jump to Knowledge',
    },
    {
        key: '6',
        callback: () => scrollToSection('techStack'),
        description: 'Jump to Tech Stack',
    },
    {
        key: '7',
        callback: () => scrollToSection('certifications'),
        description: 'Jump to Certifications',
    },
    {
        key: '8',
        callback: () => scrollToSection('contact'),
        description: 'Jump to Contact',
    },
];

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const useKeyboardShortcuts = (): void => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in inputs
            const target = event.target as HTMLElement;
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            ) {
                return;
            }

            shortcuts.forEach((shortcut) => {
                const ctrlOrMeta = event.ctrlKey || event.metaKey;
                const matchesModifiers =
                    (!shortcut.ctrlKey && !shortcut.metaKey) ||
                    (shortcut.ctrlKey && ctrlOrMeta) ||
                    (shortcut.metaKey && ctrlOrMeta);

                const matchesShift = shortcut.shiftKey
                    ? event.shiftKey
                    : !event.shiftKey;

                if (
                    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
                    matchesModifiers &&
                    matchesShift
                ) {
                    event.preventDefault();
                    shortcut.callback();
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
};

export const getKeyboardShortcuts = (): KeyboardShortcut[] => shortcuts;
