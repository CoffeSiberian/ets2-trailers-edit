import './index.css';
// theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// core
import 'primereact/resources/primereact.min.css';
// icons
import 'primeicons/primeicons.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
