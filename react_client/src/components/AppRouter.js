import React, {useContext} from 'react'
import{Routes,Route,Navigate} from 'react-router-dom'
import {auhtRoutes,publicRoutes,auhtAdminRoutes} from '../routes'
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Shop from "../pages/Shop";
import ErrorPage from '../pages/ErrorPage';
import Auth from '../pages/Auth';
import { Box } from '@mui/material';

const AppRouter = observer(() => {

  const {user} = useContext(Context);
  return (
    <Box  className="position-relative" style={{zIndex:1}} >
    <Routes   >

      
      {
        user.isAuth && user.user.role === 'ADMIN' && auhtAdminRoutes.map(
          ({path,Component}) =>      
          <Route key={path} path={path} element={<Component/>} exact/>
          
        )
        
       
      }

      {
        user.isAuth && user.user.role === 'ADMIN' && auhtRoutes.map(
          ({path,Component}) =>      
          <Route key={path + `${Component}`} path={path} element={<ErrorPage errorCode={403}/>}/>
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
          <Route key={path + `${Component}`} path={path} element={<Auth/>} exact/>
        )
      }

      {
         !user.isAuth  && 
         auhtAdminRoutes.map(
           ({path,Component}) =>      
           <Route key={path + `${Component}`} path={path} element={<ErrorPage errorCode={403}/>} exact/>
         )
      }

      {
        user.isAuth && user.user.role !== 'ADMIN'  && auhtRoutes.map(
          ({path,Component}) =>      
          <Route key={path + `${Component}`} path={path} element={<ErrorPage errorCode={403} />} exact/>
        )
      }
      <Route key={'defaultError'} path="*"  element={<ErrorPage errorCode={404} />} />
    </Routes>
    </Box>
  )
});

export default AppRouter