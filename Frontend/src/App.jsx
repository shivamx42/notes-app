import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import PrivateRoute from "./Components/PrivateRoute"
function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<PrivateRoute/>,
      children:[
        {path: "/",element: <Home/>}
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
  ])

  return (
    <>
      <div className="bg-slate-200 dark:bg-slate-800">

        <RouterProvider router={router}/>
      
      </div>
    </>
    
  )
}

export default App