import { PrimeReactProvider } from 'primereact/api';
import { useDarkMode } from './hooks/DarkModeContex';
import RoutesPage from 'renderer/routes/Router';

const App = () => {
  const { themeTatailwind } = useDarkMode();

  return (
    <div
      className={`flex flex-col min-h-screen ${themeTatailwind.primary.main}`}
    >
      <PrimeReactProvider>
        <RoutesPage />
      </PrimeReactProvider>
    </div>
  );
};

export default App;
