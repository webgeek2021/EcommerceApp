
import React from 'react'
import userImage from "../../assets/Icons/user.jpg";
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import { USER_INFO } from '../../utils/constants';
import Cookie from 'js-cookie';
import ProfileSidebar from './ProfileSidebar';
import { Outlet } from 'react-router-dom';
const ProfilePage = () => {

    const user = JSON.parse(Cookie.get(USER_INFO))
    return (
        <div className=' profile-page'>
            <div className='my-container profile-page-container'>

                <ProfileHeader
                    name={user?.name }
                />

                <div className='d-flex justify-content-between form-container'>
                <ProfileSidebar/>
                <Outlet/>
                </div>
            </div >
        </div >
    )
}

export default ProfilePage