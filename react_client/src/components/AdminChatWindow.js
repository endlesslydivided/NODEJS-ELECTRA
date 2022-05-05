import React,{useContext, useEffect, useRef, useState} from 'react'
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Box } from '@mui/system';
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import { useNavigate, browserr } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import { ADMIN_ROUTE } from '../utils/consts';


const AdminChatWindow = observer((props) => {

    const [messages, setMessages] = useState([]);
    const [value,setValue] = useState('');
    
    const navigate = useNavigate();
   
    const {user} = useContext(Context)
    let socket = useRef(
        {
            socket: null,
            chatId: 0,
            username: '',
            userId: 0,
            event: "connection",
            userState:"wait"
        }
    )

    useEffect(() =>
    {
        connect();
        window.onpopstate =  (event)=> 
        {
             beforeExit();
            socket.current.username = '';
            socket.current.userId = 0;
            socket.current.userState = 'wait';
            navigate(ADMIN_ROUTE)
            }

        window.onbeforeunload =  (event)=>
        {
             beforeExit();
            socket.current.username = '';
            socket.current.userId = 0;
            socket.current.userState = 'wait';
            navigate(ADMIN_ROUTE)
    
        }
    },[])





    const beforeExit = () => 
    {
        let message;
            message = {
                id: socket.current.chatId,
                userId: null,
                username: null,
                adminId: user.user.id ,
                adminname: props.adminId,
                event: 'close',
                state: "closed",
                from: "admin",
                to: "server"
            }  
        socket.current.socket.send(JSON.stringify(message));
    }

   
    function connect() 
    {
        socket.current.socket = new WebSocket('ws://localhost:5000/websockets')
        let message;
        socket.current.socket.onopen = () => 
        {
            message = 
            {
                id: props.id,
                userId: null,
                username: null,
                adminId: user.user.id,
                adminname: props.adminname,
                event: 'adminEnter',
                state: "answering",
                from: "admin",
                to: "server",
                sendBySender:Date.now()
            }  
                socket.current.socket.send(JSON.stringify(message))
        }

        socket.current.socket.onmessage = (event) => 
        {
            
            const message = JSON.parse(event.data);
            if(message.event === 'adminEnter')
            {
                socket.current.username = message.username;
                socket.current.userId = message.userId;
                socket.current.userState = "answering";
                socket.current.chatId = message.id

            }
            else if(message.event === 'close' && message.from === 'client')
            {
                window.alert("Пользователь отключился от чата.");
                let messageOut = {
                    id: null,
                    userId: socket.current.userId,
                    message: "Клиент отключён",
                    username: socket.current.username,
                    adminId: user.user.id,
                    adminname: props.adminname,
                    event: 'close',
                    state: "closed",
                    from: "admin",
                    to: "server",
                    sendBySender:Date.now()
                }  
                    socket.current.socket.send(JSON.stringify(messageOut))
                navigate(ADMIN_ROUTE);
            }
           
            setMessages(prev => [message, ...prev])
        }

        socket.current.socket.onclose= (event) => 
        {
            const message = JSON.parse(event.data)

            if(message.event === 'timerClosed')
            {
                window.alert("Чат был закрыт сервером по причине простоя");
                navigate(ADMIN_ROUTE);
            }        
        }

        socket.current.socket.onerror = () => 
        {
            window.alert("Ошибка чата");
            navigate(ADMIN_ROUTE);
        }

    }

    const sendMessage = async () => {

        let message = {
            id: socket.current.chatId,
            message: value,
            userId: socket.current.userId,
            username: socket.current.username,
            adminId: user.user.id,
            adminname: props.adminname,
            event: 'message',
            state: socket.current.userState,
            from: 'admin',
            to: 'server',
            sendBySender:Date.now()
        }

        if(socket.current.userState === "answering")
            message.to = 'client'
         

        socket.current.socket.send(JSON.stringify(message));
        setValue('')
    }

  return (
    <Card className="p-4 w-100 h-100 ">
        <Card.Title> Чат технической поддержки. Клиент: {socket.current.username}</Card.Title>
        <Card.Body className="m-0 pt-0 h-100 pb-1">     
        <Container className="h-75  h-md-50  flex-column-reverse overflow-auto align-items-end d-flex m-3 mx-0 rounded-50 neo">
                {messages.map((mess,index) =>
                <Box 
                style= {mess.from === 'admin'? {borderRadius:'50px', backgroundColor: 'rgb(170, 255, 128)'} : {borderRadius:'50px', backgroundColor: 'rgb(179, 217, 255)'}}
                key={index} 
                className={mess.from === 'admin'? " align-self-end neo mb-2 p-2 px-5" :  "mb-2 p-2 px-5 neo  align-self-start"}>
                    <Box className="text-muted">
                        {mess.from === 'client'? `${mess.username }` : `${mess.adminname}`} 
                    </Box>
                    <Box style={{maxWidth:'500px'}}>
                        {mess.event === "adminEnter" ?
                        `Администратор ${mess.adminname} подключился`:
                        mess.message}
                    </Box>
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
                    className="w-25"
                >
                    Отправить
            </Button>
            </Row>
        </Form>
        </Card.Body>
      
    </Card>
  )
})

export default AdminChatWindow