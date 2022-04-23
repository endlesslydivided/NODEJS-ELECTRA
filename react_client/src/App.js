import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
const  App = observer(() =>
{
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)

  useEffect(()=>
  {
    check().then(data =>
      {
        user.setUser(data)
        user.setIsAuth(true)

      })
      .catch(error =>
        {
          alert(error.response.message)
          user.setUser({})
          user.setIsAuth(false)
        }
      ).finally(() => setLoading(false))
  })

  if(loading)
  {
      return (
      <div className=" d-flex align-content-center justify-content-center">
        <Spinner  animation={"border"}/>
      </div>)
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
