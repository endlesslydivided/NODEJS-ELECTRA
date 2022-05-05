import React,{useContext, useEffect, useRef, useState} from 'react'
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Box } from '@mui/system';
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { useBeforeunload } from 'react-beforeunload';


const UserChatWindow = observer((props) => {

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const [adminname, setAdminName] = useState('')
    const navigate = useNavigate();

    const [connected, setConnected] = useState(false)
    const {user} = useContext(Context)
    let socket = useRef(
        {
            socket: null,
            chatId: 0,
            adminId: 0,
            userState:"wait"
        }
    )

    useEffect(() =>
    {
        connect();
        window.onpopstate =  ( )=> 
        {
             beforeExit();
            setAdminName('');
            socket.current.adminId =0;
            socket.current.userState ='wait';
            navigate(SHOP_ROUTE);

            }
        window.onbeforeunload =  ()=>
        {

            beforeExit();
            setAdminName('');
            socket.current.adminId =0;
            socket.current.userState ='wait';
            navigate(SHOP_ROUTE)
            
        }

    },[])

    const beforeExit = () => 
    {
        let message;
        message = {
            id: socket.current.chatId,
            userId: user.user.id ,
            username: props.username,
            message: "Клиент отключён",
            adminId: null,
            adminname: null,
            event: 'close',
            state: "closed",
            from: "client",
            to: "server",
            sendBySender:Date.now()
        }  
            socket.current.socket.send(JSON.stringify(message));
    }

 


    function connect() 
    {
        socket.current.socket = new WebSocket('ws://localhost:5000/websockets')
        let message;
        socket.current.socket.onopen = () => 
        {
        setConnected(true)
        message = {
            id: null,
            userId: user.user.id ,
            username: props.username,
            adminId: socket.current.adminId,
            adminname: adminname,
            event: 'connection',
            state: socket.current.userState,
            from: "client",
            to: "server",
            sendBySender:Date.now()
        }  
        socket.current.socket.send(JSON.stringify(message))
        }

        socket.current.socket.onmessage = (event) => 
        {
            
            const message = JSON.parse(event.data)
            if(message.event === 'connection')
            {
                socket.current.chatId = message.id;
                socket.current.adminId =0;
                socket.current.userState ='wait';
            }
            else if(message.event === 'adminEnter')
            {
                setAdminName(message.adminname);
                socket.current.adminId =message.adminId;
                socket.current.userState =message.state;

            }
            else if(message.event === 'close' && message.from === 'admin')
            {
                socket.current.chatId = message.id;
                socket.current.adminId =0;
                socket.current.userState ='wait';
                setAdminName(null);
                let messageOut;
                const result = window.confirm("Администратор ответил на интересующие вас вопросы?");
                if(result)
                {
                    messageOut = {
                        id: socket.current.chatId,
                        userId: user.user.id ,
                        message: "Клиент отключён",
                        username: props.username,
                        adminId: socket.current.adminId,
                        adminname: socket.current.adminName,
                        event: 'close',
                        state: "closed",
                        from: "client",
                        to: "server",
                        sendBySender:Date.now()
                    }  
                        socket.current.socket.send(JSON.stringify(messageOut))
                        navigate(SHOP_ROUTE);
                }
                
            }
           
            setMessages(prev => [message, ...prev])
        }

        socket.current.socket.onclose= (event) => 
        {
            const message = JSON.parse(event.data)

            if(message.event === 'timerClosed')
            {
                window.alert("Чат был закрыт сервером по причине простоя");
                navigate(SHOP_ROUTE);
            }

        }

        socket.current.socket.onerror = () => 
        {
            window.confirm("Ошибка чата");
            navigate(SHOP_ROUTE);
        }

    }

    const sendMessage = async () => {

        let message = {
            id: socket.current.chatId,
            message: value,
            date:  Date.now(),
            userId: user? user.user.id : null,
            username: props.username,
            adminId: socket.current.adminId ? socket.current.adminId : null,
            adminname: socket.current.adminname !== ''? socket.current.adminname : null,
            event: 'message',
            state: socket.current.userState,
            from: 'client',
            to: 'server'
        }

        if(socket.current.userState === "answering")
            message.to = 'admin'
         

            socket.current.socket.send(JSON.stringify(message));
        setValue('')
    }

  return (
    <Card className="p-4 w-100 h-100  ">
        <Card.Title> Чат технической поддержки. Администратор: {adminname? adminname: `(ожидание администратора...)`}</Card.Title>
        <Card.Body className="m-0 pt-0 h-100 pb-1">     
        <Container className="h-75  h-md-50  flex-column-reverse overflow-auto align-items-end d-flex m-3 mx-0 rounded-25 shadow">
                {messages.map((mess,index) =>
                <Box 
                    style= {mess.from === 'client'? {borderRadius:'50px', backgroundColor: 'rgb(170, 255, 128)'} : {borderRadius:'50px', backgroundColor: 'rgb(179, 217, 255)'}} 
                    key={index
                    } className={mess.from === 'client'? "align-self-end neo mb-2 p-2 px-5" :  "mb-2 p-2 px-5  neo  align-self-start"}>
                    <Box className={"text-muted"}>
                        {mess.from === 'client'? `${mess.username}` : (mess.event === 'close' ? 'Сервер ':`${mess.adminname}`)} 
                    </Box>
                    <Box style={{maxWidth:'500px'}}>
                        {mess.event === "connection" ?
                        `Пользователь ${mess.username} подключился`:
                        (mess.event === "adminEnter"?
                        `Администратор ${mess.adminname} подключился`:
                        (mess.event === 'close' ?
                        `Администратор отключился`:
                        mess.message))}
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
                    disabled={socket.current.userState === "wait" ? true : false}
                />
        
            </Row>
            <Row className="d-flex justify-content-end my-3 pl-3 pr-3">
            <Button
                    variant={"outline-success"}
                    onClick={sendMessage}
                    className="w-25"
                    disabled = {socket.current.userState === "wait" ? true : false}
                >
                    Отправить
            </Button>
            </Row>
        </Form>
        </Card.Body>
    </Card>
  )
})

export default UserChatWindow