import React, {useContext} from 'react'
import{Routes,Route,Navigate} from 'react-router-dom'
import {auhtRoutes,publicRoutes,auhtAdminRoutes} from '../routes'
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Shop from "../pages/Shop";
import ErrorPage from '../pages/ErrorPage';
import Auth from '../pages/Auth';

const AppRouter = observer(() => {

  const {user} = useContext(Context);
  return (
    <Routes>

      
      {
        user.isAuth && user.user.role === 'ADMIN' && auhtAdminRoutes.map(
          ({path,Component}) =>      
          <Route key={path} path={path} element={<Component/>} exact/>
        )
       
      }

      {
        user.isAuth && user.user.role === 'USER' && auhtRoutes.map(
          ({path,Component}) =>      
          <Route key={path} path={path} element={<Component/>} exact/>
        )
      }

      {
        publicRoutes.map(({path,Component}) =>     

          <Route key={path} path={path} element={<Component/>} exact/>
        )
      }

      {
        !user.isAuth  && auhtRoutes.map(
          ({path,Component}) =>      
          <Route key={path} path={path} element={<Auth/>} exact/>
        ) &&
        auhtAdminRoutes.map(
          ({path,Component}) =>      
          <Route key={path} path={path} element={<ErrorPage errorCode={403} errorMessage={"У вас недостаточно прав для доступа к данному ресурсу!"}/>} exact/>
        )
      }

      {
        user.isAuth && user.user.role !== 'ADMIN'  && auhtRoutes.map(
          ({path}) =>      
          <Route key={path} path={path} element={<ErrorPage errorCode={403} errorMessage={"У вас недостаточно прав для доступа к данному ресурсу!"}/>} exact/>
        )
      }
      <Route path="*"  element={<ErrorPage/>} />
    </Routes>
  )
});

export default AppRouter