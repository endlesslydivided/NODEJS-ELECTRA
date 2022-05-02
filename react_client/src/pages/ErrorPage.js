import React, { useEffect, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {MAIN_ROUTE,LOGIN_ROUTE} from '../utils/consts'
const ErrorPage = (props) => {

    const navigate = useNavigate();
    const [errorString,setErrorString] = useState(`░▄▬`);
    const symbols = '☺☻♥•○◙♪☼►◄▬§→∟░▒▓╡┬╚█▄▌▐▀';
    let interval;
    const getRandomInt = (max) => 
    {
      return Math.floor(Math.random() * max);
    } 

    useEffect(()=>{
      {
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
    const { errorCode, errorMessage } = props;
    return (
    <div className="w-100 container-fluid text-center px-0 d-flex flex-column align-items-center justify-content-center  h-75 ">
      <Row className=' w-100 px-0'>
      {errorCode ?
      <h1 className='display-1 fw-bold' style={codeStyle}>
        {errorCode}
      </h1>
      :
      <h1 className='px-0   w-100 text-nowrap' style={codeStyle}>
        
        {errorString}
      </h1>

      }
      
        
      </Row>
      <Row  className='w-100 my-2 '>
      <h1>
          {
            errorMessage ??
            'Самая большая ошибка - боязнь совершать ошибки...'            
          }
      </h1>
      </Row>
      <Row  className='my-2 w-25 justify-content-center'>
          {(!errorCode || errorCode === 404 || errorCode === 403)  ?
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