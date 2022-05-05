import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import UserChatWindow from '../components/UserChatWindow';
import { observer } from 'mobx-react-lite';
import AdminChatWindow from '../components/AdminChatWindow'
import { useParams } from 'react-router-dom';
const UserChat = observer(() => 
{
   
    const [connected, setConnected] = useState(false);
    const [userName, setUsername] = useState('')
    const [adminName, setAdminName] = useState('')
    const {id} = useParams();
    const {user} = useContext(Context);

    
    if (!connected) 
    {
        return( <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 500}} className="p-4 pb-0">
                <Card.Title> Чат технической поддержки</Card.Title>
                <Card.Body className="m-0  pb-1">
                <Form className="d-flex flex-column m-0">
                    <Row>
                        {
                            user.user.role === 'USER' ?
                        <Form.Control
                            className="mt-1"
                            value={userName}
                                onChange={e => setUsername(e.target.value)}
                                type="text"
                                placeholder="Войти в чат под именем..."
                        />
                        :
                        <Form.Control
                        className="mt-1"
                        value={adminName}
                            onChange={e => setAdminName(e.target.value)}
                            type="text"
                            placeholder="Войти в чат под именем..."
                    />
                        }
                   
                   
                    </Row>
                    <Row className="d-flex justify-content-end my-3 pl-3 pr-3">
                    <Button
                            variant={"outline-success"}
                            onClick={() => setConnected(true)}
                            className="w-25"
                        >
                           Войти
                    </Button>
                    </Row>
                </Form>
                </Card.Body>
               
            </Card>
        </Container>
          
        )
    }


    return (
        <Container
         
            className="d-flex my-3  justify-content-center align-items-center"
            style={{height: window.innerHeight -100, width: window.innertWidth}}
        >
            {
                user.user.role === "USER" ?
                <UserChatWindow username={userName}/>
                :
                <AdminChatWindow adminname={adminName} id={id}/>

            }
        </Container>

    );
})

export default UserChat;