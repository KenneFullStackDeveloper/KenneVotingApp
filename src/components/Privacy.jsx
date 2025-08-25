import React, { useRef, useEffect, useState } from "react";
import { FaPrint, FaArrowUp, FaShieldAlt, FaUserLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { FiLock, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const headerRef = useRef(null);
  const backToTopButtonRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      const button = backToTopButtonRef.current;
      if (button) {
        button.style.display = scrollY > 300 ? "block" : "none";
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
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
        .bg-gray-100 {
          background-color: #f7f7f7 !important;
        }
      }
    `;
    document.head.appendChild(printStyles);
    window.print();
    setTimeout(() => {
      document.head.removeChild(printStyles);
    }, 1000);
  };

  // Fonction pour naviguer vers une section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Adjust for header height
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 font-sans">
      {/* Header - caché lors de l'impression */}
      <header
        ref={headerRef}
        className={`no-print flex flex-wrap items-center justify-between px-4 sm:px-6 py-4 shadow-md sticky top-0 z-50 gap-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-white text-blue-800 shadow-lg" 
            : "bg-gradient-to-r from-blue-700 to-purple-700 text-white"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-2 text-sm hover:underline whitespace-nowrap ${
              isScrolled ? "text-blue-600" : "text-blue-100"
            }`}
            aria-label="Retour accueil"
          >
            <FiArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center">
            <FiLock className={`h-6 w-6 ${isScrolled ? "text-blue-600" : "text-blue-300"}`} />
            <h1 className="ml-2 text-xl md:text-2xl font-bold select-none whitespace-nowrap">
              Vote<span className={isScrolled ? "text-blue-600" : "text-blue-300"}>Secure</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handlePrint}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition whitespace-nowrap ${
              isScrolled 
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            aria-label="Imprimer"
          >
            <FaPrint className="text-sm" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>

          <Link
            to="/login"
            className={`px-3 py-2 rounded text-sm font-medium transition whitespace-nowrap ${
              isScrolled 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
          >
            Se connecter
          </Link>
        </div>
      </header>

      {/* Table des matières flottante */}
      <aside className="no-print hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-md z-40">
        <h3 className="font-semibold text-blue-800 mb-3 text-sm">Table des matières</h3>
        <ul className="space-y-2 text-xs">
          {[
            { id: 'introduction', label: 'Introduction' },
            { id: 'donnees-collectees', label: 'Données Collectées' },
            { id: 'utilisation-donnees', label: 'Utilisation des Données' },
            { id: 'partage-donnees', label: 'Partage des Données' },
            { id: 'droits-rgpd', label: 'Vos Droits RGPD' },
            { id: 'securite', label: 'Sécurité' },
            { id: 'conservation', label: 'Conservation' },
            { id: 'modifications', label: 'Modifications' }
          ].map((item, index) => (
            <li key={item.id}>
              <button 
                onClick={() => scrollToSection(item.id)}
                className="text-blue-600 hover:text-blue-800 hover:underline text-left"
              >
                {index + 1}. {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content - visible à l'impression */}
      <main className="print-content flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* En-tête pour l'impression */}
        <div className="no-print print-header hidden">
          <h1 className="text-2xl font-bold">Politique de Confidentialité VoteSecure</h1>
        </div>

        <div className="mb-8 print-section bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <FaShieldAlt className="text-4xl text-blue-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 print:text-black">
            Politique de Confidentialité
          </h2>
          <p className="italic text-sm text-gray-500 print:text-gray-700">
            Dernière mise à jour : 14 juin 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Section Introduction */}
          <section id="introduction" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4 leading-relaxed text-justify">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Introduction</h3>
            </div>
            
            <p className="text-sm sm:text-base">
              Chez VoteSecure, nous accordons une importance primordiale à la protection de vos données personnelles et au respect de votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre service de vote électronique sécurisé.
            </p>
            <p className="text-sm sm:text-base">
              VoteSecure SAS s'engage à respecter le Règlement Général sur la Protection des Données (RGPD) et la législation française en matière de protection des données. En utilisant notre service, vous acceptez les pratiques décrites dans cette politique.
            </p>
          </section>

          {/* Section 1 */}
          <section id="donnees-collectees" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">1. Données Collectées</h3>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" />
                1.1 Données utilisateurs
              </h4>
              <p className="text-sm sm:text-base">
                Nous collectons les informations nécessaires au bon fonctionnement du service :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Informations de compte (nom, email, organisation)</li>
                <li>Rôles et permissions dans le système</li>
                <li>Historique des votes et activités</li>
                <li>Préférences de notification</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" />
                1.2 Données techniques
              </h4>
              <p className="text-sm sm:text-base">
                Pour assurer la sécurité et le bon fonctionnement du service :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Adresse IP et logs d'accès</li>
                <li>Cookies de session sécurisés</li>
                <li>Métriques d'utilisation du système</li>
                <li>Informations sur le navigateur et l'appareil</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="utilisation-donnees" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">2. Utilisation des Données</h3>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" />
                2.1 Finalités principales
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                    <FaUserLock className="mr-2 text-blue-600" />
                    Service de vote
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Fournir un service de vote sécurisé</li>
                    <li>Authentification forte des utilisateurs</li>
                    <li>Audit et traçabilité des scrutins</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                    <FaUserLock className="mr-2 text-blue-600" />
                    Bases légales
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Exécution du contrat</li>
                    <li>Consentement explicite</li>
                    <li>Obligation légale</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" />
                2.2 Finalités secondaires
              </h4>
              <p className="text-sm sm:text-base">
                Avec votre consentement, nous pouvons utiliser vos données pour :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Améliorer nos services et fonctionnalités</li>
                <li>Vous envoyer des communications marketing</li>
                <li>Effectuer des analyses statistiques anonymisées</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="partage-donnees" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">3. Partage des Données</h3>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" />
                3.1 Prestataires de services
              </h4>
              <p className="text-sm sm:text-base">
                Nous partageons vos données avec des prestataires techniques qui nous aident à fournir le service :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Prestataires d'hébergement certifiés</li>
                <li>Services d'authentification et de sécurité</li>
                <li>Services de support technique</li>
              </ul>
              <p className="text-sm sm:text-base mt-2">
                Tous nos prestataires sont soumis à des obligations contractuelles strictes de confidentialité et de sécurité.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" />
                3.2 Obligations légales
              </h4>
              <p className="text-sm sm:text-base">
                Nous pouvons être amenés à partager vos données :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Aux autorités compétentes (pour les scrutins réglementés)</li>
                <li>À des auditeurs indépendants (sur demande)</li>
                <li>En réponse à une injonction légale ou une procédure judiciaire</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section id="droits-rgpd" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">4. Vos Droits RGPD</h3>
            </div>
            
            <p className="text-sm sm:text-base">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {[
                { title: "Droit d'accès", desc: "Obtenir une copie de vos données" },
                { title: "Droit de rectification", desc: "Corriger des informations inexactes" },
                { title: "Droit à l'effacement", desc: "Supprimer vos données sous conditions" },
                { title: "Droit à la portabilité", desc: "Récupérer vos données dans un format structuré" },
                { title: "Droit d'opposition", desc: "Vous opposer au traitement pour motifs légitimes" },
                { title: "Droit à la limitation", desc: "Restreindre temporairement le traitement" },
              ].map((right, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 text-sm sm:text-base">{right.title}</h4>
                  <p className="text-xs sm:text-sm mt-1">{right.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm sm:text-base">
                Pour exercer vos droits, contactez notre Délégué à la Protection des Données (DPO) à l'adresse :{" "}
                <a href="mailto:dpo@votesecure.com" className="text-blue-600 font-medium hover:underline">
                  dpo@votesecure.com
                </a>
              </p>
              <p className="text-xs sm:text-sm mt-2">
                Nous nous engageons à répondre à toute demande dans un délai d'un mois.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="securite" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">5. Sécurité</h3>
            </div>
            
            <p className="text-sm sm:text-base">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles de haut niveau pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-base sm:text-lg mb-2">Mesures techniques</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                  <li>Chiffrement AES-256 des données en transit et au repos</li>
                  <li>Authentification à deux facteurs (2FA)</li>
                  <li>Journalisation complète des activités</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-base sm:text-lg mb-2">Mesures organisationnelles</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                  <li>Accès restreint aux données sur besoin de connaître</li>
                  <li>Formation du personnel à la protection des données</li>
                  <li>Audits de sécurité réguliers</li>
                  <li>Procédures d'urgence en cas de violation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="conservation" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">6. Conservation des Données</h3>
            </div>
            
            <p className="text-sm sm:text-base">
              Nous conservons vos données personnelles seulement aussi longtemps que nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations légales.
            </p>
            
            <div className="mt-4 space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">Durées de conservation principales</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>
                  <span className="font-medium">Données de vote :</span> 10 ans (conformément aux obligations légales pour les scrutins officiels)
                </li>
                <li>
                  <span className="font-medium">Données de compte utilisateur :</span> 3 ans après la dernière activité
                </li>
                <li>
                  <span className="font-medium">Logs techniques :</span> 1 an
                </li>
                <li>
                  <span className="font-medium">Données de prospect :</span> 3 ans après le dernier contact
                </li>
              </ul>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm sm:text-base">
                À l'expiration des délais de conservation, vos données sont soit anonymisées pour des besoins statistiques, soit définitivement supprimées.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="modifications" className="print-section bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">7. Modifications</h3>
            </div>
            
            <p className="text-sm sm:text-base">
              Nous pouvons mettre à jour cette Politique de Confidentialité pour refléter l'évolution de nos pratiques ou pour nous conformer à de nouvelles obligations légales. Les modifications significatives seront notifiées par email 30 jours avant leur application.
            </p>
            
            <p className="text-sm sm:text-base mt-3">
              Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière dont nous protégeons vos informations.
            </p>
          </section>

          {/* Informations de contact */}
          <div className="print-section bg-white rounded-xl p-6 shadow-sm text-sm border-t pt-6 mt-6 space-y-4 print:text-black">
            <h3 className="font-semibold text-lg text-blue-800">Informations légales et contacts</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-medium text-base mb-2">VoteSecure SAS</h4>
                <p>Siège social : Paris, France</p>
                <p>RCS Paris : 123 456 789</p>
                <p>TVA intracommunautaire : FR 12 123456789</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-600" />
                  <a href="tel:+33123456789" className="text-blue-600 hover:underline print:text-black">
                    +33 1 23 45 67 89
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600" />
                  <a href="mailto:contact@votesecure.com" className="text-blue-600 hover:underline print:text-black">
                    contact@votesecure.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600" />
                  <a href="mailto:dpo@votesecure.com" className="text-blue-600 hover:underline print:text-black">
                    dpo@votesecure.com (DPO)
                  </a>
                </div>
              </div>
            </div>
            
            <p className="mt-4 border-t pt-4 text-xs">
              Conformément au RGPD, tout litige relatif aux données personnelles sera de la compétence de la Commission Nationale de l'Informatique et des Libertés (CNIL) et des tribunaux français.
            </p>
          </div>
        </div>
      </main>

      {/* Bouton retour en haut - caché à l'impression */}
      <button
        ref={backToTopButtonRef}
        onClick={handleBackToTop}
        title="Retour en haut"
        className="no-print fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md text-sm hidden z-50 transition transform hover:scale-110"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}