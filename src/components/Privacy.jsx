import { useRef, useEffect } from 'react';
import { FaPrint, FaShieldAlt, FaUserLock, FaArrowUp} from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const headerRef = useRef(null);
  const backToTopRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backToTopRef.current) {
        backToTopRef.current.style.display = window.scrollY > 300 ? 'block' : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @page {
        size: auto;
        margin: 15mm 15mm;
      }
      @media print {
        body * {
          visibility: hidden;
        }
        .print-content, .print-content * {
          visibility: visible;
        }
        .print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 0;
          margin: 0;
        }
        .no-print {
          display: none !important;
        }
        .print-section {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        a[href]::after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          font-weight: normal;
        }
        .print-header {
          display: flex !important;
          justify-content: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
        }
        .text-blue-600 {
          color: #000 !important;
        }
      }
    `;
    document.head.appendChild(printStyles);
    window.print();
    setTimeout(() => {
      document.head.removeChild(printStyles);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Header */}
      <header
        ref={headerRef}
        className="no-print bg-blue-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 shadow-md sticky top-0 z-50 gap-3"
      >
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <Link
            to="/"
            className="text-sm hover:underline text-blue-200 whitespace-nowrap"
            aria-label="Retour accueil"
          >
            ← Retour
          </Link>
          <div className="flex items-center">
            <FiLock className="h-6 w-6 text-blue-300" />
            <h1 className="ml-2 text-xl sm:text-2xl font-bold select-none whitespace-nowrap">
              Vote<span className="text-blue-300">Secure</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 sm:gap-2 bg-white text-blue-800 hover:bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-semibold transition whitespace-nowrap"
            aria-label="Imprimer"
          >
            <FaPrint className="text-sm" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap"
          >
            Se connecter
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main ref={contentRef} className="print-content flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="no-print print-header hidden">
          <h1 className="text-2xl font-bold">Politique de Confidentialité VoteSecure</h1>
        </div>

        <div className="mb-8 sm:mb-10 text-center print-section">
          <div className="flex justify-center mb-3 sm:mb-4">
            <FaShieldAlt className="text-3xl sm:text-4xl text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Politique de Confidentialité
          </h1>
          <p className="text-gray-500 italic text-sm sm:text-base">
            Dernière mise à jour : 14 juin 2025
          </p>
        </div>

        {/* Section 1 */}
        <section className="print-section mb-8 sm:mb-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">1. Données collectées</h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">1.1 Données utilisateurs</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Informations de compte (nom, email, organisation)</li>
                <li>Rôles et permissions dans le système</li>
                <li>Historique des votes et activités</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">1.2 Données techniques</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Adresse IP et logs d'accès</li>
                <li>Cookies de session sécurisés</li>
                <li>Métriques d'utilisation du système</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="print-section mb-8 sm:mb-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">2. Utilisation des données</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 flex items-center">
                <FaUserLock className="mr-2 text-blue-600 text-sm sm:text-base" />
                Finalités principales
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Fournir un service de vote sécurisé</li>
                <li>Authentification forte des utilisateurs</li>
                <li>Audit et traçabilité des scrutins</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 flex items-center">
                <FaUserLock className="mr-2 text-blue-600 text-sm sm:text-base" />
                Bases légales
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Exécution du contrat</li>
                <li>Consentement explicite</li>
                <li>Obligation légale (pour les scrutins officiels)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="print-section mb-8 sm:mb-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">3. Partage des données</h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base">
              Nous ne partageons vos données qu'avec :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              <li>Prestataires d'hébergement certifiés</li>
              <li>Autorités compétentes (pour les scrutins réglementés)</li>
              <li>Auditeurs indépendants (sur demande)</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="print-section mb-8 sm:mb-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">4. Vos droits RGPD</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: "Accès", desc: "Obtenir une copie de vos données" },
              { title: "Rectification", desc: "Corriger des informations" },
              { title: "Suppression", desc: "Effacer vos données" },
              { title: "Portabilité", desc: "Exporter vos données" },
              { title: "Opposition", desc: "S'opposer au traitement" },
              { title: "Limitation", desc: "Restreindre le traitement" },
            ].map((right, index) => (
              <div key={index} className="bg-gray-50 p-2 sm:p-3 rounded">
                <h3 className="font-medium text-blue-600 text-sm sm:text-base">{right.title}</h3>
                <p className="text-xs sm:text-sm">{right.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            Pour exercer vos droits : <a href="mailto:dpo@votesecure.com" className="text-blue-600 hover:underline">dpo@votesecure.com</a>
          </p>
        </section>

        {/* Section 5 */}
        <section className="print-section mb-8 sm:mb-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">5. Sécurité</h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base">
              Mesures de sécurité mises en œuvre :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              <li>Chiffrement AES-256 des données</li>
              <li>Authentification à deux facteurs</li>
              <li>Journalisation complète des activités</li>
              <li>Audits de sécurité réguliers</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section className="print-section mb-8 sm:mb-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">6. Conservation</h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base">
              Durées de conservation des données :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              <li>Données de vote : 10 ans (obligation légale)</li>
              <li>Données utilisateur : 3 ans après dernière activité</li>
              <li>Logs techniques : 1 an</li>
            </ul>
          </div>
        </section>

        {/* Section 7 */}
        <section className="print-section mb-8 sm:mb-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">7. Modifications</h2>
          <p className="text-sm sm:text-base">
            Toute modification sera notifiée par email 30 jours avant application.
          </p>
        </section>

        {/* Footer */}
        <div className="print-section border-t border-gray-200 pt-6 sm:pt-8 text-xs sm:text-sm text-gray-600">
          <p className="font-medium">VoteSecure SAS</p>
          <p>Siège social : Paris, France</p>
          <p>Contact : <a href="mailto:contact@votesecure.com" className="text-blue-600 hover:underline">contact@votesecure.com</a></p>
          <p className="mt-2 text-xs">
            Conformément au RGPD, tout litige relatif aux données personnelles sera de la compétence des autorités françaises.
          </p>
        </div>
      </main>

      {/* Bouton retour en haut */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="no-print fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg hidden"
        aria-label="Retour en haut"
      >
        <FaArrowUp className="text-sm sm:text-base" />
      </button>
    </div>
  );
}