import './styles/bootstrap.scss'
import './styles/index.scss'

import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';

import Quordle from './Quordle'
import React from 'react'
import ReactDOM from 'react-dom'
import Wordle from './Wordle'
import reportWebVitals from './reportWebVitals'

const router = createHashRouter([
  {
    path: '/',
    element: <Wordle />,
  },
  {
    path: '/quordle',
    element: <Quordle />,
  },
  {
    path: '*',
    element: <Wordle />,
  },
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
