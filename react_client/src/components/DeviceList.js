import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row,Col,Container} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
  return (
    <Row className="d-flex">
        {device.devices.length != 0 ? device.devices.map(
            device =>
            <DeviceItem key={device.id} device={device}/>
            )   
            :
            <Container style={{borderRadius: '25px'}} className="mt-3 text-center align-content-center bg-light">
                <p >
                    Ничего не найдено
                </p>
            </Container>
        }
    </Row>
)
})

export default DeviceList