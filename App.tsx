
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
const CalculatorPage = React.lazy(() => import('./pages/CalculatorPage'));
const GuidePage = React.lazy(() => import('./pages/GuidePage'));


const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 1. Regular Import */}
          <Route index element={<HomePage />} />
          
          {/* 2. Lazy Imports wrapped in Suspense */}
          <Route 
            path="calculateur" 
            element={
              <Suspense fallback={<div className="text-center justify-center">Chargement du Calculateur...</div>}>
                <CalculatorPage />
              </Suspense>
            } 
          />
          <Route 
            path="guide" 
            element={
              <Suspense fallback={<div>Chargement du Guide...</div>}>
                <GuidePage />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
