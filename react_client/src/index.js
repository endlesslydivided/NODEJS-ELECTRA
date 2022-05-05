import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';  
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BrandStore from './store/BrandStore';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';
import TypeStore from './store/TypeStore';
import RatingStore from './store/RatingStore';
import BasketDeviceStore from './store/BasketDeviceStore'; 
import ResultStore from './store/ResultStore'; 
import "./pages/css/index.css"
import ChatRoomsStore from './store/ChatRoomsStore';
import {AxiosInterceptor} from './http/index'
import {BrowserRouter} from "react-router-dom";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Context.Provider value={{
    user : new UserStore(),
    device: new DeviceStore(),
    brand: new BrandStore(),
    type: new TypeStore(),
    rating: new RatingStore(),
    basketDevice: new BasketDeviceStore(),
    chatRoom: new ChatRoomsStore(),
    errorResult: new ResultStore(),
    successResult: new ResultStore(),

  }}>
        <BrowserRouter>

          <AxiosInterceptor>
            <App className="gradientBackground"/>
          </AxiosInterceptor>
        </BrowserRouter>

  </Context.Provider>

)

