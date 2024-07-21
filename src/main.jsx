import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import {Provider} from 'react-redux'
import Store from './store/store.js'
import {BrowserRouter} from 'react-router-dom'
import Pages from './Pages.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId= {`${import.meta.env.VITE_CLIENT_ID}`}>
      <BrowserRouter>
        <Provider store={Store}>
          <Pages/>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
