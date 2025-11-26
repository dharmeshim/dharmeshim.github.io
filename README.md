# Dhamesh Prasad - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing software engineering skills, projects, and experience.

## 🚀 Live Demo

Visit the live portfolio at: [https://dharmeshim.github.io](https://dharmeshim.github.io)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **UI Components**: Radix UI, Lucide React Icons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── sections/       # Page sections (Home, About, Projects, etc.)
│   ├── shared/         # Shared components (Navigation, Header, etc.)
│   └── ui/            # Base UI components (Button, Card, etc.)
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and navigation
└── screens/            # Main page components
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dharmeshim/dharmeshim.github.io.git
   cd dharmeshim.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 🌐 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at `https://dharmeshim.github.io`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
npm run deploy
```

## 🔧 Configuration

- **Vite Config**: `vite.config.ts` - Build and development settings
- **Tailwind Config**: `tailwind.config.js` - CSS framework configuration
- **Profile Data**: `src/config/Profile.json` - Personal information and content

## 📱 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Automatic theme switching based on system preference
- **Smooth Scrolling**: Enhanced navigation experience
- **TypeScript**: Full type safety and better development experience
- **Performance**: Optimized with Vite for fast builds and hot reloading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhamesh Prasad** - Software Engineer & Full-Stack Developer

- GitHub: [@dharmeshim](https://github.com/dharmeshim)
- Portfolio: [https://dharmeshim.github.io](https://dharmeshim.github.io)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
