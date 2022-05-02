import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import Footer from './components/Footer';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import options from './assets/config.json'
import {AxiosInterceptor} from './http/index'
import { MAIN_ROUTE } from './utils/consts';
const  App = observer(() =>
{
  const {user,errorResult,successResult} = useContext(Context)
  const [loading,setLoading] = useState(true)
  const [openWarning, setOpenWarning] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);


  const alertStyle =
  {
    top: '91%',
    left : '1%',
    zIndex: '2'
  }

  useEffect(()=>
  {
    check().then(data =>
      {
        user.setUser(data)
        user.setIsAuth(true)

      })
      .catch(error =>
        {
          if(error.response.status === 505)
          errorResult.setMessage('Ошибка сервера!')
          if(error.response.status !== 401)
          {
            user.setUser({})
            user.setIsAuth(false)
          }
         
        }
      ).finally(() => setLoading(false))
  },[])
  
  useEffect(() =>
  {
    if(errorResult.message)
    {
      setOpenWarning(true);
    }
  },[errorResult.message])

  useEffect(() =>
  {
    if(successResult.message)
    {
      setOpenSuccess(true);
    }
  },[successResult.message])
  
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };
    

  if(loading)
  { 
      return (
      <div className=" d-flex align-items-center h-100 justify-content-center">
        <Spinner  variant="light" animation={"border"}/>
      </div>)
  }

  return (
    <BrowserRouter>
        <AxiosInterceptor>

      <Particles id="tsparticles" options={options} init={particlesInit}/>

      <Collapse className='position-fixed' style={alertStyle} in={openWarning}>
        <Alert
          
          severity="warning"
          action=
          {
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenWarning(false);errorResult.setMessage(null)}}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorResult && errorResult.message ? errorResult.message : ''}
        </Alert>
      </Collapse>

      <Collapse className='position-fixed' style={alertStyle} in={openSuccess}>
        <Alert
          severity="success"
          action=
          {
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenSuccess(false);successResult.setMessage(null)}}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {successResult && successResult.message ? successResult.message : ''}
        </Alert>
      </Collapse>


      <Header/>
      <AppRouter/>

      <Footer/>


      </AxiosInterceptor>

    </BrowserRouter>
  );
});

export default App;
