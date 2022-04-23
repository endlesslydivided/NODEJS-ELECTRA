import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBar from "../components/FilterBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Pages from "../components/Pages";
import {fetchAllBrands, fetchDevices, fetchAllTypes} from "../http/deviceAPI";
import "./css/common.css"


const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() =>
  {
    fetchAllTypes().then(data =>
      device.setTypes(data))
    fetchAllBrands().then(data =>
      device.setBrands(data))
    fetchDevices(null, null,device.selectedRate, 1, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
  })

  },[])

  useEffect(() =>
  {
      fetchDevices(device.selectedType.id, device.selectedBrand.id,device.selectedRate, device.page, device.limit).then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand,device.selectedRate,])

 

  return (
    <Container className="mt-4 p-2 px-4 glass-light shadow">
      <Row className="my-1 ">
        <Col md={3}>
          <FilterBar/>
        </Col>
        <Col md={9} >
          <DeviceList/>
          <Pages
                    className="bg-light p-2"
                    totalCount={device.totalCount}
                    limit={device.limit}
                    pageO={device.page}
                    updateData ={(event, value) => device.setPage(value)}
                />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop;