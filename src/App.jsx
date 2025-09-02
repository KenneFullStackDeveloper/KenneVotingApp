import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import LandingPage from './components/Home/LandingPage';
import VotingApp from "./components/Home/VotingApp";
import ResultVote from "./components/Home/ResultVote";
import VotingTest from "./components/Home/VotingTest";
import ContactSection from './components/ContactSection'; 
import ErrorPage from './components/ErrorPage';
import ConditionsUtilisation from './components/ConditionsUtilisation';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ResetPassword from "./components/auth/ResetPassword";
import Privacy from "./components/Privacy";
import Election from "./components/createElection";
import OAuthLogin from "./components/auth/OAuthLogin";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },

       {
        path: "/oauthlogon",
        element: <OAuthLogin />,
      },

      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
       {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/voting-app',
        element: <VotingApp />,
      },
      {
        path: '/results',
        element: <ResultVote />,
      },
      {
        path: '/test',
        element: <VotingTest />,
      },
      {
        path: '/elections',
        element: <Election />,
      },
      {
        path: '/login', // Nouvelle route pour la connexion
        element: <SignIn />,
      },
      {
        path: '/register', // Nouvelle route pour l'inscription
        element: <SignUp />,
      },
     
      {
         path: '/terms',
         element: <ConditionsUtilisation />
      },
      {
        path: '/privacy',
        element: <Privacy />
      },
      {
        path: '/contact',
        element: <ContactSection />, 
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}


