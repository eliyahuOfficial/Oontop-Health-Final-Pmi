///DarkModeToggle.tsx
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from "../../hooks/useTheme";

const DarkModeToggle = () => {
    const { theme, toggle } = useTheme();


    return (
        <button className='icon '
            onClick={toggle}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    );

}

export default DarkModeToggle