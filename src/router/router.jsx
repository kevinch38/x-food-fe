import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

const setupRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <>Error...</>,
      children: [
        {
          path: 'tes',
          element: <>Testing</>
        }
      ],
    },
  ]);

export default setupRouter;
