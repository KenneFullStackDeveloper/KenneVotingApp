import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, 
  FiBarChart2,
  FiChevronRight,
  FiChevronDown,
  FiLock,
  FiCheckCircle,
  FiAward,
  FiCalendar,
  FiShield,
  FiPlus,
  FiMinus
} from 'react-icons/fi';
import { FaQuoteLeft, FaVoteYea } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-blue-700/50 backdrop-blur-md px-4 py-2 rounded-full flex items-center"
              >
                <FaVoteYea className="mr-2 text-blue-300" />
                <span className="text-sm font-medium text-blue-100">Plateforme de vote sécurisée</span>
              </motion.div>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Organisez des élections</span>
              <span className="block text-blue-200">en toute confiance</span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto lg:mx-0">
              Une solution complète pour créer, gérer et superviser vos élections en ligne avec une sécurité de niveau bancaire.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/auth"
                  className="flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300"
                >
                  Commencer maintenant
                  <FiChevronRight className="ml-2 animate-pulse" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/demo"
                  className="flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Voir la démo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block absolute right-0 bottom-0 w-1/2 h-full"
        >
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Voting illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Sécurité garantie" },
              { value: "500+", label: "Organisations" },
              { value: "1M+", label: "Votes traités" },
              { value: "24/7", label: "Support disponible" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl"
              >
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Fonctionnalités
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Une solution <span className="text-blue-600">complète</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez comment notre plateforme révolutionne la gestion des élections en ligne
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCalendar className="h-8 w-8" />,
                title: "Gestion simplifiée",
                description: "Créez et planifiez vos élections en quelques clics avec notre interface intuitive",
                features: ["Calendrier intégré", "Modèles prédéfinis", "Notifications automatisées"]
              },
              {
                icon: <FiUsers className="h-8 w-8" />,
                title: "Gestion des électeurs",
                description: "Importez et gérez facilement vos listes d'électeurs",
                features: ["Import CSV/Excel", "Groupes personnalisés", "Vérification automatique"]
              },
              {
                icon: <FiBarChart2 className="h-8 w-8" />,
                title: "Résultats temps réel",
                description: "Visualisation intuitive des résultats avec analyses avancées",
                features: ["Tableaux de bord", "Export PDF/Excel", "Graphiques interactifs"]
              },
              {
                icon: <FiShield className="h-8 w-8" />,
                title: "Sécurité maximale",
                description: "Protection des données et des votes avec chiffrement de pointe",
                features: ["Chiffrement AES-256", "2FA obligatoire", "Protection DDoS"]
              },
              {
                icon: <FiCheckCircle className="h-8 w-8" />,
                title: "Audit complet",
                description: "Traçabilité de toutes les actions pour une transparence totale",
                features: ["Journal des activités", "Preuves cryptographiques", "Certificats d'intégrité"]
              },
              {
                icon: <FiAward className="h-8 w-8" />,
                title: "Certifications",
                description: "Normes de sécurité internationales les plus strictes",
                features: ["ISO 27001", "RGPD conforme", "Hébergement certifié"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center rounded-lg p-3 mb-4 ${feature.color || 'text-blue-500 bg-blue-50'}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative py-20 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                Sécurité
              </span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Protection des données</span>
                <span className="block text-blue-200">de niveau militaire</span>
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Notre plateforme utilise les dernières technologies de chiffrement pour garantir l'intégrité absolue de vos élections.
              </p>
              
              <div className="mt-8 space-y-6">
                {[
                  "Chiffrement AES-256 des données en transit et au repos",
                  "Authentification à deux facteurs obligatoire",
                  "Journal d'audit complet avec horodatage certifié",
                  "Certification ISO 27001 et conformité RGPD"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500 rounded-full p-1 mt-0.5">
                      <FiCheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="ml-3 text-lg text-white">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 lg:mt-0"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="space-y-8">
                  {[
                    {
                      icon: <FiLock className="h-6 w-6" />,
                      title: "Chiffrement de bout en bout",
                      description: "Toutes les données sont chiffrées dès la saisie jusqu'au stockage"
                    },
                    {
                      icon: <FiShield className="h-6 w-6" />,
                      title: "Protection contre les fraudes",
                      description: "Système résistant aux attaques avec détection d'anomalies"
                    },
                    {
                      icon: <FiAward className="h-6 w-6" />,
                      title: "Certifications indépendantes",
                      description: "Audits réguliers par des organismes de certification reconnus"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 bg-blue-600 rounded-lg p-3 text-white">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <p className="mt-1 text-blue-100">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Processus
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Comment ça <span className="text-blue-600">fonctionne</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Mettez en place votre élection en seulement 4 étapes simples
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12 lg:space-y-0">
              {[
                {
                  step: "1",
                  title: "Configuration",
                  description: "Créez votre élection en définissant les paramètres (dates, électeurs, options de vote)",
                  icon: <FiCalendar className="h-8 w-8" />
                },
                {
                  step: "2",
                  title: "Invitation",
                  description: "Envoyez les invitations aux électeurs par email ou importez votre liste",
                  icon: <FiUsers className="h-8 w-8" />
                },
                {
                  step: "3",
                  title: "Vote",
                  description: "Les électeurs votent de manière sécurisée pendant la période définie",
                  icon: <FaVoteYea className="h-8 w-8" />
                },
                {
                  step: "4",
                  title: "Résultats",
                  description: "Consultez et partagez les résultats avec des rapports détaillés",
                  icon: <FiBarChart2 className="h-8 w-8" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative lg:flex lg:items-center lg:justify-between lg:odd:flex-row-reverse"
                >
                  <div className="lg:w-5/12 lg:px-8">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold mb-4 mx-auto lg:mx-0">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-center lg:text-left text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-center lg:text-left">{item.description}</p>
                  </div>
                  
                  <div className="hidden lg:block lg:w-2/12 lg:px-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-lg border border-blue-200 text-blue-600 mx-auto">
                      {item.icon}
                    </div>
                  </div>
                  
                  <div className="lg:w-5/12 mt-6 lg:mt-0">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                      <img
                        src={`https://source.unsplash.com/random/600x400/?voting,${index}`}
                        alt={`Step ${item.step}`}
                        className="w-full h-auto rounded"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Questions <span className="text-blue-600">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Trouvez des réponses aux questions les plus posées sur notre plateforme
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Comment garantir l'anonymat des votes ?",
                answer: "Notre système utilise un chiffrement de bout en bout qui dissocie complètement l'identité de l'électeur de son vote. Les bulletins sont chiffrés individuellement et seul le résultat agrégé est accessible. Nous utilisons des protocoles cryptographiques avancés qui empêchent toute corrélation entre un électeur et son vote, même par les administrateurs du système."
              },
              {
                question: "Puis-je importer ma liste d'électeurs ?",
                answer: "Absolument. Notre plateforme supporte l'import depuis plusieurs formats (CSV, Excel, JSON) et peut également se connecter à vos systèmes existants via API. Nous fournissons des modèles pré-formatés et une assistance pour vous aider à structurer vos données. Après import, vous pouvez vérifier et éditer la liste avant de lancer l'élection."
              },
              {
                question: "Quels types d'élections puis-je organiser ?",
                answer: "VoteSecure supporte tous les types de scrutins : votes uniques, votes multiples, votes pondérés, élections avec candidats, votes à choix multiples, votes à préférences classées, etc. Vous pouvez configurer des règles complexes de validation, des quotas, des seuils et des conditions particulières. Notre équipe peut vous aider à configurer des scénarios spécifiques si nécessaire."
              },
              {
                question: "Y a-t-il une application mobile ?",
                answer: "Notre plateforme est entièrement responsive et fonctionne parfaitement sur tous les appareils mobiles via navigateur. Une application native dédiée est en cours de développement et sera disponible prochainement. Elle offrira des fonctionnalités supplémentaires comme les notifications push et une expérience encore plus fluide."
              },
              {
                question: "Comment sont stockées les données ?",
                answer: "Les données sont hébergées en France dans des centres de données certifiés ISO 27001 avec réplication pour la redondance. Nous utilisons un chiffrement AES-256 pour toutes les données au repos et TLS 1.3 pour les données en transit. Des sauvegardes journalières sont effectuées et stockées séparément. Conformément au RGPD, vous pouvez demander la suppression complète de vos données à tout moment."
              },
              {
                question: "Quelle est la durée de conservation des données ?",
                answer: "Les résultats des élections sont conservés 10 ans pour répondre aux obligations légales, mais peuvent être supprimés plus tôt sur demande. Les données personnelles des électeurs sont anonymisées 6 mois après la fin de l'élection, sauf configuration contraire. Les logs d'activité sont conservés 1 an à des fins de sécurité. Vous pouvez configurer ces durées selon vos besoins spécifiques."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-bold text-gray-900">{item.question}</h3>
                  <div className="ml-4 flex-shrink-0">
                    {activeFaq === index ? (
                      <FiMinus className="h-5 w-5 text-blue-600" />
                    ) : (
                      <FiPlus className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeFaq === index ? 'auto' : 0,
                    opacity: activeFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 text-gray-600">
                    {item.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Contactez notre équipe
              <RiCustomerService2Fill className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
            
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Témoignages
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ils nous <span className="text-blue-600">font confiance</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez ce que nos clients disent de leur expérience avec VoteSecure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "VoteSecure a révolutionné notre processus électoral. La plateforme est intuitive, sécurisée et fiable. Nous avons réduit nos coûts de 40% tout en améliorant la participation de 25%.",
                author: "Dr. Michael Weber",
                role: "Directeur d'université",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "En tant qu'organisation internationale, nous avions besoin d'une solution fiable pour nos élections. VoteSecure a dépassé toutes nos attentes en termes de sécurité et d'utilisabilité.",
                author: "Sophie Müller",
                role: "Présidente d'ONG",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "La transparence et l'auditabilité du système nous ont convaincus. Nos membres ont enfin pleinement confiance dans nos élections en ligne.",
                author: "Jean Dupont",
                role: "Président d'association",
                avatar: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center mb-6">
                  <img className="w-12 h-12 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.author} />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative flex-grow">
                  <FaQuoteLeft className="text-blue-200 text-2xl absolute -top-2 -left-1" />
                  <blockquote className="pl-8 text-gray-600 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
              <span className="block">Prêt à transformer</span>
              <span className="block">vos processus électoraux ?</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Rejoignez des centaines d'organisations qui nous font confiance pour leurs élections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-xl hover:bg-blue-50 transition-all duration-300"
                >
                  Commencer gratuitement
                  <FiChevronRight className="ml-2 animate-pulse" />
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Demander une démo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}