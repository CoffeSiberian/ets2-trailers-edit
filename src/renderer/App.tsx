import { PrimeReactProvider } from 'primereact/api';

import RoutesPage from 'renderer/routes/Router';

const App = () => {
  return (
    <PrimeReactProvider>
      <RoutesPage />
    </PrimeReactProvider>
  );
};

export default App;
