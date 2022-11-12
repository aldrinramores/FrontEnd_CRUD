import React, {useState} from 'react'
import { Modal, Button } from 'antd';

const UpdateModal = ({supplyId,setFormUpdEmail,setFormUpdFname,setFormUpdLname,emailValue,fnameValue,lnameValue,className}) => {

  // TOGGLE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
      setIsModalOpen(true)
  }
  const handleOk = () => {
      setIsModalOpen(false)
  }
  const handleCancel = () => {
      setIsModalOpen(false)
  }

  // EXPORT FORMS VALUE
  function emailChange (e) {
      setFormUpdEmail(e.target.value)
  }
  function fnameChange (e) {
      setFormUpdFname(e.target.value)
  }
  function lnameChange (e) {
      setFormUpdLname(e.target.value)
  }


  return (
    <>
    <Button className={`${className}`}  type="primary" onClick={showModal}>
       Edit
    </Button>
      <Modal title="Edit User" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <form onSubmit={(e) => {setIsModalOpen(false); e.preventDefault()}} className="poppins">
            <div className="row mx-3">
                <input type="email" value={emailValue} onChange={emailChange} className='form-control shadow-none' placeholder='user@gmail.com' />
            </div>
            <div className="d-flex gap-2 my-3 mx-3">
                <input type="text" value={fnameValue} onChange={fnameChange}  className='form-control shadow-none'  placeholder='First name' />
                <input type="text" value={lnameValue} onChange={lnameChange} className='form-control shadow-none'  placeholder='Last name' />
            </div>
            <div className='d-flex flex-end gap-3 mx-3'>
                <button type='Submit' className='buttonSubmit' onClick={supplyId} on color="primary">
                Submit
                </button>          
            </div>
        </form>
      </Modal>
    </>
  )
}

export default UpdateModal