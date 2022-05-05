import React,{useEffect,useContext, useState} from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cashPerspecitve from '../assets/cash.png'
import basket from '../assets/basket.png'
import message from '../assets/message.png'
import {useNavigate} from 'react-router-dom'
import { Box } from '@mui/system';
import { Container,Image } from 'react-bootstrap';
import { Dropdown} from "react-bootstrap";
import {Context} from '../index'
import {observer} from "mobx-react-lite";
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import {Button} from "@mui/material";


const MainPage = () => {

    const sectionStyle =
    {
        minHeight: "550px"
    };

    const {user} = useContext(Context);
    const navigate = useNavigate();
    return (
        <div className={"mx-auto  container-fluid p-0 overflow-hidden"}>
            <section style={sectionStyle} className={"d-flex  justify-content-center bg-light py-5 "}>
                <Row className=' align-items-center justify-content-center'>
                    <Col md={5} lg={5} className="px-4">
                        <h1 className={"display-4 fw-bold  px-4"}>
                            Оплачивай покупки наличными или картой!
                        </h1>
                        <h2 className={"fw-light mt-2 px-4"}>
                            Добавляй продукты в корзину и выбирай удобный способ оплаты.
                        </h2>
                        <div className="px-4 mt-3">
                            <Button
                            
                            variant="outlined"
                            color="secondary"
                            className="rounded-0"
                            >
                                <span className={"fw-bold "}>Перейти в корзину</span>
                            </Button>
                        </div>
                    </Col>
                    <Col md={5} lg={5}  className=" up-down text-center">
                        <Image className=" w-75 "  src={cashPerspecitve}/>
                    </Col>
                </Row>
            </section>
            <section style={sectionStyle} className={"d-flex justify-content-center py-5"}>
                <Row className='flex-row-reverse align-items-center justify-content-center'>
                    <Col md={5} lg={5} className="px-4">
                        <h1 className={"display-4 fw-bold  px-4"}>
                            Получай заказы на дом!
                        </h1>
                        <h2 className={"fw-light mt-2 px-4"}>
                            Выбирай адрес доставки или пункта приёма заказов.
                        </h2>
                        <div className="px-4 mt-3">
                            <Button
                            
                            variant="contained"
                            color="secondary"
                            className="rounded-0 neo"
                            >
                                <span className={"fw-bold "}>Перейти в магазин</span>
                            </Button>
                        </div>
                    </Col>
                    <Col md={5} lg={5} className="  up-down text-center">
                        <Image className=" w-75 "  src={basket}/>
                    </Col>
                </Row>
            </section>
            <section style={sectionStyle} className={" d-flex justify-content-center py-5 bg-light"}>
                <Row className='align-items-center justify-content-center'>
                    <Col md={5} lg={5} className="px-4">
                        <h1 className={"display-4 fw-bold  px-4"}>
                            Техподдержка клиентов 24/7!
                        </h1>
                        <h2 className={"fw-light mt-2 px-4"}>
                            Задавай нам интересующие тебя вопросы и получай быстрые ответы.
                        </h2>
                        <div className="px-4 mt-3">
                            <Button
                            
                            variant="outlined"
                            color="secondary"
                            className="rounded-0 "
                            >
                                <span className={"fw-bold "}>Техподдержка</span>
                            </Button>
                        </div>
                    </Col>
                    <Col md={5} lg={5} className=" text-center up-down">
                        <Image className=" w-75 "  src={message}/>
                    </Col>
                </Row>
            </section>
        </div>
    )
}

export default MainPage