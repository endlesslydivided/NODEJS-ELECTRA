import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import Card from "react-bootstrap/Card";
import {Button} from "@mui/material";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {validateAuth} from "../utils/validation"
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
const Auth = observer(() => {
    const {user,errorResult} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate ()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordState, setPasswordState] = useState('password')
   

    const click = async () => {
     
            let data;
            let validation = validateAuth(email,password);
            if(validation.status)
            {
                errorResult.setMessage(validation.message)
            }
            else
            {
                if (isLogin) 
                {
                    data = await login(email, password);
                } 
                else {
                    data = await registration(email, password);
                }
                user.setUser(data)
                user.setIsAuth(true)
                navigate(SHOP_ROUTE)
            }
           
    
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5   shadow-sm">
                <h2 className="m-auto mb-3 mt-0">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form  className="d-flex flex-column">
                    <Form.Control
                        className="mt-3 glass-dark  border-0 neo"
                        placeholder="Введите ваш email..."
                        
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputGroup className="mt-3 glass-dark neo">
                        <Form.Control
                            className="glass-dark-input border-0 "
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={passwordState}
                        />
                        <Button disableFocusRipple="true"  disableRipple="true" onClick={() => setPasswordState(passwordState === 'password'? 'text' : 'password')}>
                            {
                                passwordState === 'password'?
                                <VisibilityOffOutlinedIcon color="secondary" />:
                                <VisibilityOutlinedIcon color="secondary"/>
                            }
                                   
                        </Button>
                                    
                                

                    </InputGroup>
                    
                    <Row className="d-flex justify-content-between mt-2 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            color={"secondary"}
                            variant="contained"
                            onClick={click}
                            className="mt-2 neo "
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;