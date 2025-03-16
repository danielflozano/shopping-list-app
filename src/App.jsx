import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { useAuth } from './contexts/AuthContext';

export const App = () => {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-editColor-3'></div>
      </div>
    )
  }

  return(
    <RouterProvider router={routes}/>
  )
}