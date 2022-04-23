import React, {useContext} from 'react'
import{Routes,Route,Navigate} from 'react-router-dom'
import {auhtRoutes,publicRoutes} from '../routes'
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Shop from "../pages/Shop";

const AppRouter = observer(() => {

  const {user} = useContext(Context);
  return (
    <Routes>

      {
        user.isAuth && auhtRoutes.map(
          ({path,Component}) =>      
          <Route key={path} path={path} element={<Component/>} exact/>
        )
      }
      {
        publicRoutes.map(({path,Component}) =>      
          <Route key={path} path={path} element={<Component/>} exact/>
        )
      }

    </Routes>
  )
});

export default AppRouter