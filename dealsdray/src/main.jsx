import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.module.css'
import {Provider} from 'react-redux'
import rootReducer from './rootReducer.jsx'
import {thunk} from 'redux-thunk'
import { createStore,applyMiddleware } from 'redux'
import '@fortawesome/fontawesome-free/css/all.min.css';


const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
