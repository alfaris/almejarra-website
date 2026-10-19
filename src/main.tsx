import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css'
import '@fontsource-variable/reem-kufi'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/inter'
import './index.css'

import App from './App'
import { I18nProvider } from './lib/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
