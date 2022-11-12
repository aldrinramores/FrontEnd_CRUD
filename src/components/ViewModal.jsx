import React, {useState} from 'react'
import { Modal, Checkbox, Form, Input, Button } from 'antd';
import defaultImage from '../assets/defaultImage.jpg'


const ViewModal = ({userAvatar, userEmail, userFName, userLName,className}) => {
  // TOGGLE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
      setIsModalOpen(true)
  }
  const handleCancel = () => {
      setIsModalOpen(false)
  }


  return (
    <>
    <Button className={`${className}`}  type="green" onClick={showModal}>
       View
    </Button>
      <Modal title="View Profile" footer={null} open={isModalOpen} onCancel={handleCancel}>
      <div className='d-flex flex-column justify-content-center text-center gap-1  modal_description'>
          <img src={userAvatar || defaultImage}/>
            <p> Email: {userEmail || "no information provided"}</p>
              <p>First Name: {userFName || "no information provided"}</p>
                <p>Last Name: {userLName || "no information provided"}</p>
      </div>
      </Modal>
    </>
  )
}

export default ViewModal