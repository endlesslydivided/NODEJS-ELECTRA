import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Context } from '..';
import { Box } from '@mui/system';

const UserChat = () => 
{
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [chatId, setChatId] = useState(0)
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [adminId, setAdminId] = useState(0);
    const [adminName, setAdminName] = useState("");
    const [userState, setUserState] = useState("");

    const [userName, setUsername] = useState('')
    const {user} = useContext(Context);


    const handleKeyPress = (event) => {
        event.preventDefault();
        if(event.key === 'Enter'){
            sendMessage();
        }
      }

    function connect() 
    {
        socket.current = new WebSocket('ws://localhost:5001')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                id: null,
                userId: user? user.user.id : null,
                userName: userName,
                adminId: null,
                adminName: null,
                event: 'connection',
                state: "wait",
                from: "client",
                to: "server"
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => 
        {
            
            const message = JSON.parse(event.data)
            if(message.event === 'connection')
            {
                setChatId(message.id);
            }
            else if(message.event === 'adminEnter')
            {
                setAdminId(message.adminId)
                setAdminName(message.adminName)
                setUserState("answering")
            }
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {

        let message = {
            id: chatId,
            message: value,
            date:  Date.now(),
            userId: user? user.user.id : null,
            userName: userName,
            adminId: adminId !== 0? adminId : null,
            adminName: adminName !== ''? adminName : null,
            event: 'message',
            state: userState,
            from: 'client',
            to: 'server'
        }

        if(userState === "answering")
            message.to = 'admin'
         

        socket.current.send(JSON.stringify(message));
        setValue('')
    }


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
                        <Form.Control
                            className="mt-1"
                            value={userName}
                                onChange={e => setUsername(e.target.value)}
                                type="text"
                                placeholder="Войти в чат под именем..."
                        />
                   
                   
                    </Row>
                    <Row className="d-flex justify-content-end my-3 pl-3 pr-3">
                    <Button
                            variant={"outline-success"}
                            onClick={connect}
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
         
            className="d-flex mt-4  justify-content-center align-items-center"
            style={{height: window.innerHeight -100, width: window.innertWidth}}
        >
            <Card className="p-4 w-100 h-100 ">
                <Card.Title> Чат технической поддержки</Card.Title>
                <Card.Body className="m-0  pb-1">     
                <Container className="h-75 flex-column-reverse  align-items-end d-flex m-3 mx-0 rounded-50 shadow-sm">
                     {messages.map(mess =>
                        <Box style={{borderRadius:'50px'}} key={mess.id} className={mess.from === 'client'? "shadow-sm justife-self-right mb-2 p-2 px-4" :  "mt-1 p-2 px-4 shadow justife-self-right"}>
                            <Row className="text-muted">
                               {mess.from === 'client'? `${mess.userName}` : `${mess.adminName}`} ({(new Date(Date.now())).toUTCString()})
                            </Row>
                            <Row >
                                {mess.event === "connection" ?
                                `Пользователь ${mess.userName} подключился`:
                                mess.message}
                            </Row>
                        </Box>
                        
                       
                     )}
                </Container>               
                    <Form className="d-flex flex-column m-0">
                    <Row>
                        <Form.Control
                            className="mt-1"
                            value={value} 
                            onChange={e => setValue(e.target.value)} 
                            type="text"
                            placeholder="Введите сообщение"
                        />
                
                    </Row>
                    <Row className="d-flex justify-content-end my-3 pl-3 pr-3">
                    <Button
                            variant={"outline-success"}
                            onClick={sendMessage}
                            onKeyPress={handleKeyPress}
                            className="w-25"

                        >
                           Отправить
                    </Button>
                    </Row>
                </Form>
                </Card.Body>
            </Card>
        </Container>
        // <div className="center">
        //     <div>
        //         <div className="form">
        //             <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
        //             <button onClick={sendMessage}>Отправить</button>
        //         </div>
        //         <div className="messages">
        //             {messages.map(mess =>
        //                 <div key={mess.id}>
        //                     {mess.event === 'connection'
        //                         ? <div className="connection_message">
        //                             Пользователь {mess.userName} подключился
        //                         </div>
        //                         : <div className="message">
        //                             {mess.userName}. {mess.message}
        //                         </div>
        //                     }
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        // </div>
    );
};

export default UserChat;