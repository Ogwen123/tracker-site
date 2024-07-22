import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/home/Home.tsx'
import Login from './components/login/Login.tsx'
import NotFound from './components/NotFound.tsx'
import Error from './components/Error.tsx'
import Register from './components/register/Register.tsx'
import Tasks from './components/tasks/Tasks.tsx'
import Dashboard from './dashboard/Dashboard.tsx'

export const navBarExempt = ["/login", "/register"]
export const publicPaths = ["/login", "/register", "/", ""]
export const disabledWhenLoggedIn = ["/login", "/register"]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
