///ThemeContext.tsx
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
    theme: "light",
    toggle: () => { },
});

export const ThemeProvider = ({ children }) => {

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme") ?? "light";
        setTheme(currentTheme);
        if (currentTheme === "dark") {
            document.body.classList.add("dark");
        }
    }, []);


    const [theme, setTheme] = useState("light");

    const toggle = () => {
        const newValue = theme == "light" ? "dark" : "light";
        if (newValue === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }


        setTheme(newValue);
    };




    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};