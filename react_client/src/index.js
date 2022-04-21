import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BrandStore from './store/BrandStore';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';
import TypeStore from './store/TypeStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user : new UserStore(),
    device: new DeviceStore(),
    brand: new BrandStore(),
    type: new TypeStore()

  }}>
    <App />
  </Context.Provider>
)

