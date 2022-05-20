import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row,Col,Container} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import Box from '@mui/material/Box'
import Zoom from '@mui/material/Zoom'
import Skeleton from '@mui/material/Skeleton';

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className={device.devices.length != 0? "d-flex" : "d-flex mx-1 h-75"}>
            {device.devices.length != 0 ? device.devices.map(
                device =>
                                   
                    <DeviceItem key={device.id} device={device}/>
                                 
                )   
                :
                <div  style={{borderRadius: '25px'}} className="d-flex mt-3   justify-content-center bg-light">
                    <p className="m-0 align-self-center text-muted">
                        Ничего не найдено
                    </p>
                </div>
            }
        </Row>
)
})

export default DeviceList