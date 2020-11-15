import React, { useState } from 'react'
import { ThemeContext } from './ThemeContext'

const ThemeProvider = ({children}) => {

    const lightTheme = {
        type: 'LIGHT',
        primaryColor: '#dae3e5',
        backgroundColor: '#fff',
        secondaryColor: '',
        acentColor: '#525252',
        textColor: '#525252',
    }

    const darkTheme = {
        type: 'DARK',
        primaryColor: '#2c2c2c',
        secondaryColor: '',
        backgroundColor: '#000',
        acentColor: '',
        textColor: '#f3f3f3',
    }

    const [ theme, setTheme ] = useState(lightTheme)

    const toggleTheme = () => {
        if( theme.type === 'LIGHT' ) {
            setTheme(darkTheme)
        } else {
            setTheme(lightTheme)
        }
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider