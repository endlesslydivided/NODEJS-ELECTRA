import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import DeviceTable from '../components/adminTables/DeviceTable';
import BrandTable from '../components/adminTables/BrandTable';
import TypeTable from '../components/adminTables/TypeTable';
import './css/common.css' 
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {observer} from "mobx-react-lite";

const AdminPanel = observer(() => {

  return (
    <Container className="d-flex flex-column mt-3 w-100 " >
      <Tabs defaultActiveKey="deviceTable" className="mt-3 rounded-0"    id="uncontrolled-tab-example">
        <Tab eventKey="deviceTable" className="rounded-0"  title="DeviceTable">
          <DeviceTable />
        </Tab>
        <Tab eventKey="brandsTable" className="rounded-0" title="BrandTable">
          <BrandTable /> 
        </Tab> 
        <Tab eventKey="typesTable" className="rounded-0" title="TypesTable">
          <TypeTable />
        </Tab> 
        <Tab eventKey="typeBrandsTable" title="TypeBrandsTable">
          {/* <DeviceTable /> */}
        </Tab> 

    </Tabs>
      {/* <Button
          variant={"outline-dark"}
          className="mt-3 p-2"
          onclick={()=> setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
          variant={"outline-dark"}
          className="mt-3 p-2"
          onclick={()=> setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
          variant={"outline-dark"}
          className="mt-3 p-2"
          onclick={()=> setDeviceVisible(true)}
      >
        Добавить устройство
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/> */}
    </Container>
  )
});

export default AdminPanel