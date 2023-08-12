// theme
import 'primereact/resources/themes/viva-dark/theme.css';
// core
import 'primereact/resources/primereact.min.css';
// icons
import 'primeicons/primeicons.css';

import './index.css';
// font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';
import { DarkMode } from './hooks/DarkModeContex';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <DarkMode>
    <App />
  </DarkMode>
);
