import { useForm } from "react-hook-form";
import { FaCheckCircle, FaTimesCircle, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8081/api/contact", {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        sujet: data.sujet,
        message: data.message
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Réponse de l'API:", response.data);
      
      setSubmitStatus({
        success: true,
        message: "Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
      });
      reset();
    } catch (error) {
      console.error("Erreur:", error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 
                         error.response?.statusText || 
                         "Une erreur est survenue lors de l'envoi.";
        
        setSubmitStatus({
          success: false,
          message: errorMessage,
        });
      } else {
        setSubmitStatus({
          success: false,
          message: "Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.",
        });
      }
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+49\d+/;

  return (
    <section className="px-4 py-20 md:py-28 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez <span className="text-blue-600">notre équipe</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Un souci technique, une demande ou un simple message ? Nous sommes à votre écoute.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Formulaire */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prénom */}
              <div>
                <label htmlFor="prenom" className="block mb-2 text-gray-800 font-medium">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  id="prenom"
                  {...register("prenom", { required: "Le prénom est obligatoire" })}
                  placeholder="Max"
                  aria-invalid={!!errors.prenom}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${
                    errors.prenom
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-200 focus:ring-blue-400 focus:border-blue-400"
                  }`}
                />
                {errors.prenom && (
                  <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                    <FaTimesCircle className="flex-shrink-0" /> {errors.prenom.message}
                  </p>
                )}
              </div>

              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block mb-2 text-gray-800 font-medium">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  id="nom"
                  {...register("nom", { required: "Le nom est obligatoire" })}
                  placeholder="Müller"
                  aria-invalid={!!errors.nom}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${
                    errors.nom
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-200 focus:ring-blue-400 focus:border-blue-400"
                  }`}
                />
                {errors.nom && (
                  <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                    <FaTimesCircle className="flex-shrink-0" /> {errors.nom.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-800 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "L'email est obligatoire",
                    pattern: {
                      value: emailRegex,
                      message: "Format d'email invalide",
                    },
                  })}
                  placeholder="max@example.com"
                  aria-invalid={!!errors.email}
                  className={`w-full border rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-200 focus:ring-blue-400 focus:border-blue-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FaTimesCircle className="flex-shrink-0" /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="telephone" className="block mb-2 text-gray-800 font-medium">
                Téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img 
                    src="https://flagcdn.com/w20/de.png" 
                    alt="Drapeau Allemagne" 
                    className="w-4 h-3 object-cover"
                  />
                </div>
                <input
                  id="telephone"
                  type="tel"
                  {...register("telephone", {
                    pattern: {
                      value: phoneRegex,
                      message: "Numéro invalide (doit commencer par +49)",
                    },
                  })}
                  placeholder="+49 XXXX XXXX XXX (facultatif)" 
                  aria-invalid={!!errors.telephone}
                  className={`w-full border rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 transition ${
                    errors.telephone
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-200 focus:ring-blue-400 focus:border-blue-400"
                  }`}
                />
              </div>
              {errors.telephone && (
                <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FaTimesCircle className="flex-shrink-0" /> {errors.telephone.message}
                </p>
              )}
            </div>

            {/* Sujet */}
            <div>
              <label htmlFor="sujet" className="block mb-2 text-gray-800 font-medium">
                Sujet <span className="text-red-500">*</span>
              </label>
              <input
                id="sujet"
                type="text"
                {...register("sujet", { 
                  required: "Le sujet est obligatoire",
                  minLength: {
                    value: 5,
                    message: "Le sujet doit contenir au moins 5 caractères"
                  }
                })}
                placeholder="Objet de votre message"
                aria-invalid={!!errors.sujet}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${
                  errors.sujet
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-200 focus:ring-blue-400 focus:border-blue-400"
                }`}
              />
              {errors.sujet && (
                <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FaTimesCircle className="flex-shrink-0" /> {errors.sujet.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-2 text-gray-800 font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                {...register("message", { 
                  required: "Le message est obligatoire",
                  minLength: {
                    value: 20,
                    message: "Le message doit contenir au moins 20 caractères"
                  }
                })}
                rows={5}
                placeholder="Décrivez votre demande en détail..."
                aria-invalid={!!errors.message}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${
                  errors.message
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-200 focus:ring-blue-400 focus:border-blue-400"
                }`}
              />
              {errors.message && (
                <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FaTimesCircle className="flex-shrink-0" /> {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </button>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg flex items-center gap-3 mt-4 ${
                  submitStatus.success
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {submitStatus.success ? (
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-xl flex-shrink-0" />
                )}
                <div>
                  <p className="font-semibold">
                    {submitStatus.success ? "Succès !" : "Erreur"}
                  </p>
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              </motion.div>
            )}
          </motion.form>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>Nos coordonnées</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Email</h4>
                    <a href="mailto:contact@voteapp.com" className="text-gray-600 hover:text-blue-600 transition">
                      contact@voteapp.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Téléphone</h4>
                    <a href="tel:+4915112345678" className="text-gray-600 hover:text-blue-600 transition">
                      +49 1573 0771362
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Adresse</h4>
                    <p className="text-gray-600">Maximilianstraße 28, 80539 München, Bayern</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Temps de réponse
              </h3>
              <p className="text-blue-100 mb-4">
                Nous nous engageons à répondre à tous les messages dans les plus brefs délais.
              </p>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-semibold">Délai moyen : 24-48h</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;