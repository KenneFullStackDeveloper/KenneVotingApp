import React, { useRef, useEffect } from "react";
import { FaPrint, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

export default function ConditionsUtilisation() {
  const headerRef = useRef(null);
  const backToTopButtonRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const button = backToTopButtonRef.current;
      if (button) {
        button.style.display = window.scrollY > 300 ? "block" : "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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

  const handleBackToTop = () => scrollTo(headerRef);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      {/* Header - caché lors de l'impression */}
      <header
        ref={headerRef}
        className="no-print bg-blue-800 text-white flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 shadow-md sticky top-0 z-50 gap-4"
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm hover:underline text-blue-200 whitespace-nowrap"
            aria-label="Retour accueil"
          >
            ← Retour
          </Link>
          <div className="flex items-center">
            <FiLock className="h-6 w-6 text-blue-300" />
            <h1 className="ml-2 text-xl md:text-2xl font-bold select-none whitespace-nowrap">
              Vote<span className="text-blue-300">Secure</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 sm:gap-2 bg-white text-blue-800 hover:bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-semibold transition whitespace-nowrap"
            aria-label="Imprimer"
          >
            <FaPrint className="text-sm" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>

          <Link
            to="/auth"
            className="bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap"
          >
            Se connecter
          </Link>
        </div>
      </header>

      {/* Main content - visible à l'impression */}
      <main 
        ref={contentRef}
        className="print-content flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
      >
        {/* En-tête pour l'impression */}
        <div className="no-print print-header hidden">
          <h1 className="text-2xl font-bold">Conditions d'Utilisation VoteSecure</h1>
        </div>

        <div className="mb-8 print-section">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2 print:text-black">
            Conditions d'utilisation
          </h2>
          <p className="italic text-xs sm:text-sm text-gray-500 print:text-gray-700">
            Dernière mise à jour : 10 juillet 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Section Introduction */}
          <section className="print-section space-y-4 leading-relaxed text-justify">
            <p className="text-sm sm:text-base">
              VoteSecure offre une plateforme de vote électronique sécurisée permettant aux organisations d'organiser des élections et consultations en ligne avec un haut niveau de sécurité (« Service VoteSecure »). Le service est accessible via Internet sur différents appareils compatibles (« Appareils Compatibles »).
            </p>
            <p className="text-sm sm:text-base">
              Le Service VoteSecure est fourni par VoteSecure SAS. Ces Conditions d'utilisation régissent votre utilisation de notre service. L'expression « Service VoteSecure » désigne l'ensemble des fonctionnalités, interfaces utilisateur, contenus et logiciels associés à notre plateforme.
            </p>
          </section>

          {/* Section 1 */}
          <section className="print-section border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">1. Compte Utilisateur</h3>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">1.1 Création de compte</h4>
              <p className="text-sm sm:text-base">
                Pour utiliser le Service VoteSecure, les organisations doivent créer un compte administrateur en fournissant des informations exactes et à jour. Les administrateurs sont responsables de la confidentialité de leurs identifiants et de toutes les activités sur leur compte.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">1.2 Gestion des électeurs</h4>
              <p className="text-sm sm:text-base">
                L'organisation est responsable de la gestion de sa liste d'électeurs et doit s'assurer que seules les personnes autorisées ont accès au processus de vote.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="print-section border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">2. Utilisation du Service</h3>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">2.1 Élections</h4>
              <p className="text-sm sm:text-base">
                VoteSecure fournit les outils techniques pour organiser des élections mais n'intervient pas dans les aspects légaux ou réglementaires des scrutins organisés. L'organisation est seule responsable de la conformité de ses élections avec les lois applicables.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">2.2 Comportement</h4>
              <p className="text-sm sm:text-base">
                Vous vous engagez à ne pas utiliser le service pour :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Organiser des élections frauduleuses ou illégales</li>
                <li>Porter atteinte à la confidentialité des votes</li>
                <li>Tenter de compromettre la sécurité du système</li>
                <li>Contourner les mécanismes d'authentification</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="print-section border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">3. Abonnement</h3>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">3.1 Fonctionnalités</h4>
              <p className="text-sm sm:text-base">
                L'abonnement premium offre des fonctionnalités supplémentaires :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Nombre illimité d'élections simultanées</li>
                <li>Nombre illimité d'électeurs</li>
                <li>Audit complet et traçabilité avancée</li>
                <li>Support prioritaire</li>
                <li>Intégrations personnalisées</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">3.2 Paiement et résiliation</h4>
              <p className="text-sm sm:text-base">
                Les abonnements sont facturés mensuellement ou annuellement. Vous pouvez résilier à tout moment, sans remboursement des montants déjà payés. L'accès aux fonctionnalités premium sera maintenu jusqu'à la fin de la période payée.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="print-section border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">4. Sécurité et Données</h3>
            <p className="text-sm sm:text-base">
              Nous mettons en œuvre des mesures de sécurité de haut niveau conformes aux standards industriels. Les données sont chiffrées de bout en bout. Nous collectons et traitons vos données conformément à notre Politique de Confidentialité et au RGPD.
            </p>
          </section>

          {/* Section 5 */}
          <section className="print-section border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">5. Limitations de Responsabilité</h3>
            <p className="text-sm sm:text-base">
              VoteSecure décline toute responsabilité concernant :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              <li>Les problèmes liés à la connexion internet des utilisateurs</li>
              <li>Les erreurs dans la configuration des élections par l'organisation</li>
              <li>Les fraudes ou manipulations externes au système VoteSecure</li>
              <li>Les dommages indirects résultant de l'utilisation du service</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="print-section border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">6. Modifications</h3>
            <p className="text-sm sm:text-base">
              Nous nous réservons le droit de modifier ces conditions. Les utilisateurs seront informés des changements majeurs par email ou via une notification dans l'interface.
            </p>
          </section>

          {/* Infos légales */}
          <div className="print-section text-xs sm:text-sm text-gray-500 border-t pt-6 mt-6 space-y-2 print:text-black">
            <p>VoteSecure est une société enregistrée en France, dont le siège social est situé à Paris.</p>
            <p>
              Pour toute question concernant ces Conditions d'utilisation, veuillez nous contacter :
              <br />
              Téléphone : <a href="tel:+33123456789" className="text-blue-600 hover:underline print:text-black">+33 1 23 45 67 89</a>
              <br />
              Email : <a href="mailto:contact@votesecure.com" className="text-blue-600 hover:underline print:text-black">contact@votesecure.com</a>
            </p>
            <p className="mt-2">
              Ces conditions sont régies par le droit français. Tout litige relatif à leur interprétation ou exécution sera de la compétence exclusive des tribunaux français.
            </p>
          </div>
        </div>
      </main>

      {/* Bouton retour en haut - caché à l'impression */}
      <button
        ref={backToTopButtonRef}
        onClick={handleBackToTop}
        title="Retour en haut"
        className="no-print fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md text-sm hidden z-50 transition"
      >
        <FaArrowUp />
      </button>

    </div>
  );
}