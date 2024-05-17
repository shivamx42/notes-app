import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import PrivateRoute from "./Components/PrivateRoute"
import SearchNotes from "./Components/SearchNotes"
import Navbar from "./Components/Navbar"
import { useSelector } from "react-redux"
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
    {
      path:"/search",
      element:<PrivateRoute/>,
      children:[
        {path: "/search",element: <SearchNotes/>}
      ]
    }
  ])

  const {currentUser}=useSelector(state=>state.user);


  return (
    <>
        <div className="bg-slate-200 dark:bg-slate-800">
        <Navbar title={currentUser?`${currentUser.name}'s Notes`:"Notes App"}/>
        <RouterProvider router={router}/>
      
      </div>
    </>
    
  )
}

export default App