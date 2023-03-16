
import './App.css';

import { createBrowserRouter, RouterProvider, useLocation, useParams } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import DrinkDetails from './pages/DrinkDetails';
import Drinks from './pages/Drinks';



const router = createBrowserRouter([
  {
    path: '/', element: <Root />, id: 'root', errorElement: <ErrorPage />,

    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/:categoryName',
            id: 'category_select',
            element: <Drinks />,
            loader:
              async () => {
                const res = await
                  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`);
                const data = await res.json();

                return data.drinks;
              },
            children: [
              { path: '/:categoryName?:searchParam', element: <DrinkDetails /> }
            ]

          },
          {
            path: '/:categoryName/:drinkName', id: 'drink_select', element: <DrinkDetails />
          }
        ]
      },
    ]
  },
]);




function App() {
  return (
    <>
      <h1 style={{ backgroundColor: 'grey', margin: '0px', padding: '15px' }}>Cocktails</h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;










      // { path: '/drinks/:drinkId', element: <DrinkDetails /> },
      // {
      //   path: '/category/:categoryName'
      //   , element: <DrinkDetails />,
      //   id: 'root2',
      //   loader: async () => {
      // //     const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=
      // // ${this.props.match.params.drinkId.replace('/', '%2F')}`);
      // //     const data = await resp.json();
      // //     return data;
      //   }
      // }


          // loader: async () => {
    //   const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=
    //   ${this.props.match.params.drinkId.replace('/', '%2F')}`);
    //   const data = await resp.json();
    //   return data;
    // },

    // const resp = await fetch('https://jsonplaceholder.typicode.com/albums');
    // const data = await resp.json();

    // return data;