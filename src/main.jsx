import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import CreateCertificate from './createCertificate/CreateCertificate.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import Home from './drive/dashboard/Home.jsx'
import MyDrive from './drive/MyDrive/MyDrive.jsx'
import Downloads from './drive/pages/Downloads.jsx'
import Recent from './drive/pages/Recent.jsx'
import Stared from './drive/pages/Stared.jsx'
import Trash from './drive/pages/Trash.jsx'
import PageNotFound from './error/PageNotFound.jsx'
import './index.css'
import Login from './loginPage/Login.jsx'
import { AuthenticatedRoute } from './protectRoute/ProtectedRoute.jsx'
import Root from './Root.jsx'
import store from "./store.js"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route element={<AuthenticatedRoute />}>
        <Route path='home' element={<Home />} >
          <Route index element={<MyDrive />} />
          <Route path='Downloads' element={<Downloads />} />
          <Route path='Recent' element={<Recent />} />
          <Route path='Stared' element={<Stared />} />
          <Route path='Trash' element={<Trash />} />
        </Route>
        <Route path="generateCertificate" element={<CreateCertificate />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);