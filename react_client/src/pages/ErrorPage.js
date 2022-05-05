import React, { useEffect, useState,useParams } from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import {Button} from '@mui/material'
import {useNavigate,useLocation} from 'react-router-dom'
import {MAIN_ROUTE,LOGIN_ROUTE} from '../utils/consts'
const ErrorPage = (props) => {

    const navigate = useNavigate();
    const [errorString,setErrorString] = useState(`░▄▬`);
    const location =useLocation();
    const [isLocation,setIsLocation] = useState((location.state !== null))

    
    const symbols = '☺☻♥•○◙♪☼►◄▬§→∟░▒▓╡┬╚█▄▌▐▀';
    let interval;
    const getRandomInt = (max) => 
    {
      return Math.floor(Math.random() * max);
    } 

    useEffect(()=>{
      {
        if(location.state === null && props.errorCode !== undefined)
        {
          location.state = {errorCode: props.errorCode}
          setIsLocation(true);
        }
        if(interval != null)
        {   
          clearInterval();
        }
        const leghth = symbols.length;
        interval =setInterval(() =>
        {
          setErrorString(symbols[getRandomInt(leghth)] + symbols[getRandomInt(leghth)] +symbols[getRandomInt(leghth)])
        }
        ,700)
        
      }
    },[])

    const codeStyle =
    {
      fontSize: '150px'
    }
    return (
    <div className="w-100 p-5 h-100  my-5 container-fluid text-center px-0 d-flex flex-column align-items-center justify-content-center  h-75 ">
      <Row className=' w-100 px-0'>
      {isLocation ?
      <h1 className='display-1 fw-bold' style={codeStyle}>
        {location.state.errorCode}
      </h1>
      :
      <h1 className='px-0   w-100 text-nowrap' style={codeStyle}>
        
        {errorString}
      </h1>

      }
      
        
      </Row>
      <Row  className='w-100 my-2 '>
      {isLocation ?

      <h1 class="display-5">
          {
            {
              401 : "Неавторизованный доступ к ресурсу. Зарегистрируйтесь или войдите в свой аккаунт.",
              404 : "Ресурс не существует либо он был удалён.",
              403 : "У вас недостаточно прав для доступа к данному ресурсу!"

            }[location.state.errorCode]
          }
      </h1>
      :
      <blockquote class="blockquote">
      <p class="display-5">"Самая большая ошибка - боязнь совершать ошибки..."</p>
      <footer class="px-5 mx-5  text-end"><em>- Элберт Грин Хаббард</em></footer>
      </blockquote>
      }
      
      </Row>
      <Row  className='my-2 w-25 justify-content-center'>
          {(!isLocation || location.state.errorCode === 404 || location.state.errorCode === 403)  ?
            <Button                            
            variant="contained"
            color="secondary"
            className="neo w-100 "
            onClick={() => navigate(MAIN_ROUTE)}
            >
                <span className={"fw-bold "}>Главная страница</span>
            </Button>
            :
            <Button                            
            variant="contained"
            color="secondary"
            className="rounded-0 w-100 neo"
            onClick={() => navigate(LOGIN_ROUTE)}
            >
                <span className={"fw-bold "}>Авторизация</span>
            </Button>
            
          }
      </Row>
    </div>
  )
}

export default ErrorPage