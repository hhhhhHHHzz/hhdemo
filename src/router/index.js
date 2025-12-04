import { createBrowserRouter } from 'react-router-dom';
import Index from '../page/index/index';
import Login from '../page/login/index';
import Layout from '../page/Layout';
import Boosk from '../page/Books';
import Mine from '../page/Mine';
import MessagePage from '../page/Message';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        // path: '/index',
        element: <Index />,
      },
      {
        path: '/books',
        element: <Boosk />,
      },
      {
        path: '/login/:id?',
        element: <Login />,
      },
      {
        path: '/mine',
        element: <Mine />,
      },
      {
        path: '/message',
        element: <MessagePage />,
      },
    ],
  },
]);
export default router;
