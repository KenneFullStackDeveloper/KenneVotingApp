import { useRouteError, Link } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oups !</h1>
      <p className="text-xl mb-2">Une erreur est survenue :</p>
      <p className="text-lg italic mb-8">{error.statusText || error.message}</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}