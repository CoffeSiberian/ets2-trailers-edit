import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [dir, setdir] = useState('');

  window.electron.pathDocsDir.getDocsDir('pathDocsDir').then((res) => {
    setdir(res);
  });

  return (
    <div>
      <p>cafe cafe</p>
      <p>{dir}</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
