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
    const [chatId, setChatId] = useState(0)
    const [adminId,setAdminId] = useState(0)
    const [adminname, setAdminName] = useState('')
    const [event, setEvent] = useState("connection")
    const navigate = useNavigate();

    const [userState, setUserState] = useState("wait")
    const [connected, setConnected] = useState(false)
    const {user} = useContext(Context)
    const socket = useRef()

    useEffect(() =>
    {
        connect();

    },[])

    useBeforeunload((event) => 
    {
        event.preventDefault();

        setAdminName('');
        setAdminId(0);
        setUserState('wait');
        let message;
        const result = window.confirm("Разорвать соединение?");
        if(result)
        {
            message = {
                id: chatId,
                userId: user.user.id ,
                username: props.username,
                message: "Клиент отключён",
                adminId: null,
                adminname: null,
                event: 'close',
                state: "closed",
                from: "client",
                to: "server"
            }  
                socket.current.send(JSON.stringify(message))
        }
        else
        {
            navigate(SHOP_ROUTE)
        }
      });


    function connect() 
    {
        socket.current = new WebSocket('ws://localhost:5001')
        let message;
        socket.current.onopen = () => 
        {
        setConnected(true)
        message = {
            id: null,
            userId: user.user.id ,
            username: props.username,
            adminId: adminId,
            adminname: adminname,
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
                setAdminName(message.adminname);
                setAdminId(message.adminId);
                setUserState(message.state)
            }
            else if(message.event === 'close' && message.from === 'admin')
            {
                setAdminName('');
                setAdminId(0);
                setUserState('wait');
                const result = window.confirm("Администратор ответил на интересующие вас вопросы?");
                if(result)
                {
                    message = {
                        id: chatId,
                        userId: user.user.id ,
                        message: "Администратор отключён",
                        username: props.username,
                        adminId: null,
                        adminname: null,
                        event: 'close',
                        state: "closed",
                        from: "client",
                        to: "server"
                    }  
                        socket.current.send(JSON.stringify(message))
                        navigate(SHOP_ROUTE);
                }
                else
                {

                }
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
            date:  Date.now(),
            userId: user? user.user.id : null,
            username: props.username,
            adminId: adminId ? adminId : null,
            adminname: adminname !== ''? adminname : null,
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

  return (
    <Card className="p-4 w-100 h-100 ">
        <Card.Title> Чат технической поддержки. Администратор: {adminname? adminname: `(ожидание администратора...)`}</Card.Title>
        <Card.Body className="m-0 pt-0 h-100 pb-1">     
        <Container className="h-75  h-md-50  flex-column-reverse overflow-auto align-items-end d-flex m-3 mx-0 rounded-25 shadow">
                {messages.map((mess,index) =>
                <Box 
                    style= {mess.from === 'client'? {borderRadius:'50px', backgroundColor: 'rgb(170, 255, 128)'} : {borderRadius:'50px', backgroundColor: 'rgb(179, 217, 255)'}} 
                    key={index
                    } className={mess.from === 'client'? "align-self-end neo mb-2 p-2 px-5" :  "mb-2 p-2 px-5  neo  align-self-start"}>
                    <Row className={"text-muted"}>
                        {mess.from === 'client'? `${mess.username}` : `${mess.adminname}`} 
                    </Row>
                    <Row style={{maxWidth:'500px'}}>
                        {mess.event === "connection" ?
                        `Пользователь ${mess.username} подключился`:
                        (mess.event === "adminEnter"?
                        `Администратор ${mess.adminname} подключился`:
                        mess.message)}
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
                    disabled={userState === "wait" ? true : false}
                />
        
            </Row>
            <Row className="d-flex justify-content-end my-3 pl-3 pr-3">
            <Button
                    variant={"outline-success"}
                    onClick={sendMessage}
                    className="w-25"
                    disabled = {userState === "wait" ? true : false}
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