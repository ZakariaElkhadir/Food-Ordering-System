import './App.css'
import Body from './Body/Body'
import Dashboard from './Dashboard/Dashboard';
import Products from './Products/Products';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body/>, 
    },
    {
      path: "/home",
      element: <Body/>, 
    },
    {
      path: "/products",
      element: <Products/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
  ]);
  return (
    <div className='app'>
       <RouterProvider router={router} />
    </div>
    
  )
}

export default App
