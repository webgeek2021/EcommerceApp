import React from 'react'
import userImage from "../../assets/Icons/user.jpg";
import { Image, Form, Row, Col, Container, Button } from "react-bootstrap";
import { FiEdit3 } from "react-icons/fi";
import { getUser, updateUserProfile } from '../../Api/UserApi/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import Cookie from "js-cookie";
import { USER_INFO } from '../../utils/constants';
const ProfileForm = () => {

    const email = JSON.parse(Cookie.get(USER_INFO)).email

    const [user, setUser] = React.useState()
    const [newUser, setNewUser] = React.useState({
        "name" : user?.name || "",
        "email" : email || "",
        "profilePicture" : user?.profileImage || ""
    })
    const [editName, setEditName] = React.useState(true)
    const [editEmail, setEditEmail] = React.useState(true)
    const [editImage, setEditImage] = React.useState(true)
    const [previewImage , setPreviewImage] = React.useState()

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        setNewUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileUpload = (ev) => {
        console.log(ev)
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            console.log(reader.result)
            setPreviewImage(reader.result)
            setNewUser((prev) => ({
                ...prev,
                ["profilePicture"]: file
            }))
        }
    }
    React.useEffect(() => {

        const user = JSON.parse(Cookie.get(USER_INFO))

        if (user) {
            setNewUser(user)
            setUser(user)
            setPreviewImage(user.profileImage)
        }

    }, [])

    const handleSubmit = () => {
        if (newUser) {
            const formData = {}
            formData.name = newUser.name
            formData.email = newUser.email
            formData.profilePicture = newUser.profilePicture
            console.log(formData)
            updateUserProfile(formData)
        }
    }
    return (
        <>

            {user ?
                <Form className='d-flex profile-form'>
                    <Container fluid>
                        <Row>
                            <Col xs={12} lg={3} className='left'>
                                <Form.Group className="input-field">
                                    <Image src={previewImage || userImage} alt="" className="user-image" />
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        name="profilePicture"
                                        onChange={handleFileUpload}
                                        className="preview-image-holder"
                                    />
                                </Form.Group >
                                <h2 className='user-name'>{user?.name}</h2>
                                <p className='user-email'>{user?.email}</p>
                            </Col>
                            <Col xs={12} lg={9} className='right'>
                                <Row>
                                    <Col xs={12} md={6} className='column'>
                                        <Form.Group className='input-field'>
                                            <div className='input-header'>
                                                <FiEdit3
                                                    className='edit-btn'
                                                    onClick={() => setEditName(prev => !prev)}
                                                />
                                                <Form.Label>Name</Form.Label>
                                            </div>
                                            <Form.Control
                                                type="text"
                                                placeholder='Enter Name'
                                                required
                                                name="name"
                                                value={newUser.name}
                                                disabled={editName}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} className='column' >
                                        <Form.Group className='input-field'>
                                            <div className='input-header'>
                                                <FiEdit3
                                                    className='edit-btn'
                                                    onClick={() => setEditEmail(prev => !prev)}
                                                />
                                                <Form.Label>Email</Form.Label>
                                            </div>
                                            <Form.Control
                                                type="email"
                                                placeholder='Enter Email'
                                                required
                                                name="email"
                                                value={newUser.email}
                                                onChange={handleChange}
                                                disabled={editEmail}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>


                                <Row className='text-center btn-row'>
                                    <Button className='submit-btn' onClick={handleSubmit}>Submit</Button>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Form >
                :
                <h1>Loading</h1>}
        </>
    )
}

export default ProfileForm