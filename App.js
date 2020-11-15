import React from 'react';
import MainPage from './src/pages/MainPage'
import ThemeProvider from './src/context/ThemeProvider'
import './src/components/i18n/i18n'

export default function App() {
  return (
    <ThemeProvider>
      <MainPage />
    </ThemeProvider>
  )
};
