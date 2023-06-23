import React from 'react'
import {BsQuestionCircleFill} from "react-icons/bs"

const NoDataFound = () => {
  return (
    <div className='w-100 d-flex justify-content-center align-items-center no-data-found-container'>
        <div className='d-flex flex-column align-items-center justify-content-center no-data-found-div'>
            <BsQuestionCircleFill className='c-red icon'/>
            <h4 className='c-red'>No Data Found</h4>
        </div>
    </div>
  )
}

export default NoDataFound