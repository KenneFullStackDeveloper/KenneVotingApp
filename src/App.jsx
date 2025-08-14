import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import Sign from './components/Home/Sign';
import VotingApp from "./components/Home/VotingApp";
import ResultVote from "./components/Home/ResultVote";
import VotingTest from "./components/Home/VotingTest";
import Election from './components/Home/CreateElection';
import ContactSection from './components/ContactSection'; 
import ErrorPage from './components/ErrorPage';
import ConditionsUtilisation from './components/ConditionsUtilisation';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp"
import ResetPassword from "./components/auth/ResetPassword";
import Privacy from "./components/Privacy";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Sign />,
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


