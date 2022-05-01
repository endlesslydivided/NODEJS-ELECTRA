import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {MAIN_ROUTE,LOGIN_ROUTE} from '../utils/consts'
const ErrorPage = (props) => {

    const navigate = useNavigate();

    const codeStyle =
    {
      fontSize: '150px'
    }
    const { errorCode, errorMessage } = props;
    return (
    <Container className="w-100 text-center d-flex flex-column align-items-center justify-content-center  h-75 ">
      <Row className=' w-100 '>
        <h1 className='display-1 fw-bold' style={codeStyle}>
          {errorCode ?? 404}
        </h1>
      </Row>
      <Row  className='w-100 my-2 '>
      <h1>
          {
            errorMessage ??
            'Ресурс не существует либо он был удалён...'            
          }
      </h1>
      </Row>
      <Row  className='my-2 w-25 justify-content-center'>
          {(!errorCode || errorCode === 404 || errorCode === 401)  ?
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
    </Container>
  )
}

export default ErrorPage