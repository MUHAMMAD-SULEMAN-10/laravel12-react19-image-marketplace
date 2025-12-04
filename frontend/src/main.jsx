import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { persistor, store } from './redux/store/index.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <div className="container">
        <App />
        <ToastContainer />
      </div>
    </Provider>
  </PersistGate>
)
