import { PrimeReactProvider } from 'primereact/api';
import RoutesPage from 'renderer/routes/Router';

const App = () => {
  return (
    <div className={`flex flex-col min-h-screen`}>
      <PrimeReactProvider>
        <RoutesPage />
      </PrimeReactProvider>
    </div>
  );
};

export default App;
