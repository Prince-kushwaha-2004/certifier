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
        <Route path='home' element={<Home />} />
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