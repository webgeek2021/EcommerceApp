
import React from 'react'
import userImage from "../../assets/Icons/user.jpg";
import ProfileHeader from './ProfileHeader';
import { Image, Form } from "react-bootstrap";
import { FiEdit3 } from "react-icons/fi";
const ProfilePage = () => {

    const [user, setUser] = React.useState({
        "name": "Harshang",
        "email": "crce.9207.cs@gmail.com",
        "profileImage": userImage,
        "address": "",
        "pincode": "",
        "dob": "",
    })

    const [editName , setEditName]  = React.useState(false)
    const handleChange = () => {

    }
    return (
        <div className=' profile-page'>
            <div className='my-container profile-page-container'>
                <ProfileHeader
                    name={user.name}
                />
                <Form className='d-flex profile-form'>
                    <div className='left'>
                        <Image src={user.profileImage} alt="" className="user-image" />
                        <h2 className='user-name'>{user.name}</h2>
                        <p className='user-email'>{user.email}</p>
                    </div>
                    <div className='right'>
                        <Form.Group>
                            <div className='input-header'>
                                <FiEdit3 className='edit-btn' />
                                <Form.Label>Name</Form.Label>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder='Enter Name'
                                required
                                value={user.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <div className='input-header'>
                                <FiEdit3 className='edit-btn' />
                                <Form.Label>Email</Form.Label>
                            </div>
                            <Form.Control
                                type="email"
                                placeholder='Enter Email'
                                required
                                value={user.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <div className='input-header'>
                                <FiEdit3 className='edit-btn' />
                                <Form.Label>Date Of Birth</Form.Label>
                            </div>
                            <Form.Control
                                type="Date"
                                placeholder='Enter Date Of Birth'
                                required
                                value={user.dob}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <div className='input-header'>
                                <FiEdit3 className='edit-btn' />
                                <Form.Label>Address</Form.Label>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder='Enter Address'
                                required
                                value={user.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <div className='input-header'>
                                <FiEdit3 className='edit-btn' />
                                <Form.Label>Pincode</Form.Label>
                            </div>
                            <Form.Control
                                type="number"
                                placeholder='Enter PinCode'
                                required
                                value={user.pincode}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </Form>
            </div>


        </div>
    )
}

export default ProfilePage