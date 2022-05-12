import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../../index";
import {createDevice, fetchAllBrands, fetchDevices, fetchAllTypes, fetchOneDevice,updateOneDevice} from "../../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";
import { validateDevice } from '../../../utils/validation';

const UpdateDevice = observer((props) => {
    const {device,errorResult,successResult} = useContext(Context)



    const addInfo = () => {
        device.setUpdateInfo([...device.updateInfo, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        device.setUpdateInfo(device.updateInfo.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        device.setUpdateInfo(device.updateInfo.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    const updateDevice = () => {
        let validation = validateDevice(device.selectedType.id,
            device.selectedBrand.id,
            device.updateName,
            device.updatePrice,
            "",
            device.updateInfo);
        if(validation.status)
        {
            errorResult.setMessage(validation.message)
        }
        else
        {
        const formData = new FormData()
        formData.append('name', device.updateName)
        formData.append('price', `${device.updatePrice}`)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(device.updateInfo))
        updateOneDevice(formData,device.updateId).then(data => props.onHide())
        successResult.setMessage("Товар успешно обновлён")

        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Row md={12}>
                        <Col>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="rounded-0 w-100" variant={"outline-dark"}>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Array.isArray(device.types) ? 
                            device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                    selected={device.updatet}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )
                            :
                            ""}
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                    <Col>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="rounded-0 w-100" variant={"outline-dark"}>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            { Array.isArray(device.brands)  ? device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )
                            :
                            ""}
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                    </Row>
                    <Form.Control
                        value={device.updateName}
                        onChange={e => device.setUpdateName(e.target.value)}
                        className="mt-3 rounded-0 w-100"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={device.updatePrice}
                        onChange={e => device.setUpdatePrice(Number(e.target.value))}
                        className="mt-3 rounded-0 w-100"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <hr/>
                    <Button
                        className="rounded-0 w-100"
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {Array.isArray(device.updateInfo) ? device.updateInfo.map(i =>
                        <Row className="mt-4" md={12} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    className="rounded-0 w-100"
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    className="rounded-0 w-100"
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    className="rounded-0 w-100"
                                    color="error"variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )
                    : 
                    ""}
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button color="error" onClick={props.onHide}>Закрыть</Button>
                <Button color="success" onClick={updateDevice}>Изменить</Button>
            </Modal.Footer>

        </Modal>
    );
});

export default UpdateDevice;