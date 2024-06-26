import { useEffect, useState } from 'react'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom"

import Login from '@/pages/Login.jsx'
import AdminUser from '@/pages/AdminUsers.jsx'
import NewContribuyente from './pages/NewContribuyente'
import Contribuyente from './pages/Contribuyente'
import NewPatenteDeVehiculos from './pages/NewPatenteDeVehiculos'
import { UserProvider } from '@/store/useUser'

import useStore from '@/store'

function PrivateRoutes() {
  console.log('going through a private route')

  const user = useStore((state) => state.user)

  if(!user) {
    return <Navigate to="/signin"/>;
  }

  return (
    <Outlet/>
  )
}

// create it outside the react tree to avoid something... 
// I don't know, check the createBrowserRouter doc.
const router = createBrowserRouter([
  {
    path: '/user',
    element: <PrivateRoutes/>,
    children: [
      {
        path: "",
        element: <AdminUser/>
      },
      {
        path: "contribuyentes/new",
        element: <NewContribuyente/>
      },
      {
        path: "contribuyentes/:id",
        element: <Contribuyente/>
      },
      // path contribuyente/:id/edit
      {
        path: "contribuyentes/:ContribuyenteId/patentes/new",
        element: <NewPatenteDeVehiculos/>
      }
      
    ]
  },
  {
    path: '/signin',
    element: <Login/>
  },
])

function App() { 

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  )
}

export default App