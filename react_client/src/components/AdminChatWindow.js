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
    const [value, setValue] = useState('');
    const [chatId, setChatId] = useState(0)
    const [username, setUserName] = useState('')
    const [userId, setUserId] = useState(0)
    const [event, setEvent] = useState("connection")
    const navigate = useNavigate();
    const [userState, setUserState] = useState("wait")
    const {user} = useContext(Context)
    const socket = useRef()
    useEffect(() =>
    {
        connect();
        window.onpopstate = async ()=> {
            let message;
            window.alert("Клиент ожидает нового администратора")
            await beforeExit();
            setUserName('');
            setUserId(0);
            setUserState('wait')
            navigate(ADMIN_ROUTE)

            }
    },[])

    // useEffect(()=>
    // {

    // },[chatId,event,username,value,userState])

    useBeforeunload(async (event) => 
    {
        event.preventDefault()
       
        event.returnValue ="Клиент ожидает нового администратора";
        await beforeExit();
        setUserName('');
        setUserId(0);
        setUserState('wait');
        navigate(ADMIN_ROUTE)

    });

    const beforeExit = () => 
    {
        let message;
            message = {
                id: chatId,
                userId: null,
                username: null,
                adminId: user.user.id ,
                adminname: props.adminId,
                event: 'close',
                state: "closed",
                from: "admin",
                to: "server"
            }  
        socket.current.send(JSON.stringify(message));
    }

   
    function connect() 
    {
        socket.current = new WebSocket('ws://localhost:5001')
        let message;
        socket.current.onopen = () => 
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
                sendBySender:new Date(Date.now()).toUTCString()
            }  
                socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => 
        {
            
            const message = JSON.parse(event.data);
            if(message.event === 'adminEnter')
            {
                setUserName(message.username);
                setUserId(message.userId);
                setUserState("answering");
                setChatId(message.id);
            }
            else if(message.event === 'close' && message.from === 'user')
            {
                window.alert("Пользователь отключился от чата.");
                let messageOut = {
                    id: null,
                    userId: userId,
                    message: "Клиент отключён",
                    username: username,
                    adminId: user.user.id,
                    adminname: props.adminname,
                    event: 'close',
                    state: "closed",
                    from: "admin",
                    to: "server",
                    sendBySender:new Date(Date.now()).toUTCString()
                }  
                    socket.current.send(JSON.stringify(messageOut))
                navigate(ADMIN_ROUTE);
            }
           
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose= () => 
        {
            console.log('Socket закрыт')
        }

        socket.current.onerror = () => 
        {
            console.log('Socket произошла ошибка')
        }

    }

    const sendMessage = async () => {

        let message = {
            id: chatId,
            message: value,
            userId: userId,
            username: username,
            adminId: user.user.id,
            adminname: props.adminname,
            event: 'message',
            state: userState,
            from: 'admin',
            to: 'server',
            sendBySender:new Date(Date.now()).toUTCString()
        }

        if(userState === "answering")
            message.to = 'client'
         

        socket.current.send(JSON.stringify(message));
        setValue('')
    }

  return (
    <Card className="p-4 w-100 h-100 ">
        <Card.Title> Чат технической поддержки. Клиент: {username}</Card.Title>
        <Card.Body className="m-0 pt-0 h-100 pb-1">     
        <Container className="h-75  h-md-50  flex-column-reverse overflow-auto align-items-end d-flex m-3 mx-0 rounded-50 neo">
                {messages.map((mess,index) =>
                <Box 
                style= {mess.from === 'admin'? {borderRadius:'50px', backgroundColor: 'rgb(170, 255, 128)'} : {borderRadius:'50px', backgroundColor: 'rgb(179, 217, 255)'}}
                key={index} 
                className={mess.from === 'admin'? " align-self-end neo mb-2 p-2 px-5" :  "mb-2 p-2 px-5 neo  align-self-start"}>
                    <Row className="text-muted">
                        {mess.from === 'client'? `${mess.username }` : `${mess.adminname}`} 
                    </Row>
                    <Row style={{maxWidth:'500px'}}>
                        {mess.event === "adminEnter" ?
                        `Администратор ${mess.adminname} подключился`:
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