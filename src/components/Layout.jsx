import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();

  // Liste des chemins où le header doit être caché
  const hideHeaderPaths = ['/terms','/privacy']; // Ajoutez d'autres paths si nécessaire

  // Scroll vers le haut à chaque changement de page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Afficher le header seulement si le path n'est pas dans hideHeaderPaths */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      
      
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* On garde toujours le footer, mais vous pouvez appliquer la même logique si besoin */}
      <Footer />
    </div>
  );
}