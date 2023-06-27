import React from 'react'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FiEdit3 } from "react-icons/fi"
import { getShippingDetails, updateShippingDetails } from '../../Api/UserApi/UserApi';
import { USER_INFO } from '../../utils/constants';
import Cookie from 'js-cookie';
import {toast} from "react-toastify"
const ShippingDetailForm = () => {

  const [shippingDetails, setShippingDetails] = React.useState()
  const [email, setEmail] = React.useState()


  React.useEffect(() => {
    // api call for getting shipping details
    const data = JSON.parse(Cookie.get(USER_INFO))
    if (data) {
      const email = data.email
      setEmail(email)
      getShippingDetails(email, setShippingDetails)
    }
  }, [])

  const [editCity, setEditCity] = React.useState(true)
  const [editAddress, setEditAddress] = React.useState(true)
  const [editPostalCode, setEditPostalCode] = React.useState(true)
  const [editState, setEditState] = React.useState(true)
  const [editCountry, setEditCountry] = React.useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target

    setShippingDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(shippingDetails)
    shippingDetails.email = email
    if(!shippingDetails?.address ||
      !shippingDetails?.country ||
      !shippingDetails?.postalCode ||
      !shippingDetails?.state ||
      !shippingDetails?.city){
        toast.warning("Fields are empty")
        return
    }
    updateShippingDetails(shippingDetails)
  }
  return (
    <div className='shippingDetails'>
      <h5 className="title">Shipping Details</h5>
      <Form className="shipping-form" onSubmit={handleSubmit}>
        <Container fluid>
          <Row>
            <Col xs={12} md={6} className='column'>
              <Form.Group className='input-field'>
                <div className='input-header'>
                  <FiEdit3
                    className='edit-btn'
                    onClick={() => setEditCity(prev => !prev)}
                  />
                  <Form.Label>City</Form.Label>
                </div>
                <Form.Control
                  type="text"
                  placeholder='Enter City'
                  required
                  name="city"
                  value={shippingDetails?.city}
                  disabled={editCity}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className='column'>
              <Form.Group className='input-field'>
                <div className='input-header'>
                  <FiEdit3
                    className='edit-btn'
                    onClick={() => setEditState(prev => !prev)}
                  />
                  <Form.Label>State</Form.Label>
                </div>
                <Form.Control
                  type="text"
                  placeholder='Enter State'
                  required
                  name="state"
                  value={shippingDetails?.state}
                  disabled={editState}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} className='column'>
              <Form.Group className='input-field'>
                <div className='input-header'>
                  <FiEdit3
                    className='edit-btn'
                    onClick={() => setEditPostalCode(prev => !prev)}
                  />
                  <Form.Label>PostalCode</Form.Label>
                </div>
                <Form.Control
                  type="number"
                  placeholder='Enter PostalCode'
                  required
                  name="postalCode"
                  value={shippingDetails?.postalCode}
                  disabled={editPostalCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className='column'>
              <Form.Group className='input-field'>
                <div className='input-header'>
                  <FiEdit3
                    className='edit-btn'
                    onClick={() => setEditCountry(prev => !prev)}
                  />
                  <Form.Label>Country</Form.Label>
                </div>
                <Form.Control
                  type="text"
                  placeholder='Enter Country'
                  required
                  name="country"
                  value={shippingDetails?.country}
                  disabled={editCountry}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="column">
              <Form.Group className='input-field'>
                <div className='input-header'>
                  <FiEdit3
                    className='edit-btn'
                    onClick={() => setEditAddress(prev => !prev)}
                  />
                  <Form.Label>Address</Form.Label>
                </div>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder='Enter Address'
                  required
                  name="address"
                  value={shippingDetails?.address}
                  disabled={editAddress}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Button
          type="submit"
          className="add-to-cart"
        

        >Submit</Button>
      </Form>
    </div>
  )
}

export default ShippingDetailForm