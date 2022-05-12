import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import {createType} from "../../../http/deviceAPI";
import {Button} from "@mui/material";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const {errorResult,successResult} = useContext(Context);
    const addType = () => 
    {
        if(value === "")
        {
        errorResult.setMessage("Заполните поле - тип")
        return;
        }
        createType({name: value}).then(data => {
            setValue('')
            onHide()
        successResult.setMessage("Тип успешно добавлен")

        })

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    className="rounded-0 w-100"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
                <Button color="error" onClick={onHide}>Закрыть</Button>
                <Button color="success" onClick={addType}>Добавить</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default CreateType;