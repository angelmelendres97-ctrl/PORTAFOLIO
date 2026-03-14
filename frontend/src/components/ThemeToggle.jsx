import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext.jsx';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 transition hover:bg-slate-800 dark:hover:bg-slate-700"
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? (
        <FaSun className="text-lg text-yellow-400" />
      ) : (
        <FaMoon className="text-lg text-slate-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
