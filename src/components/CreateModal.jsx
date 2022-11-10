import React, {useState} from 'react'
import { Modal, Checkbox, Form, Input, Button } from 'antd';


const CreateModal = ({handleSubmit,setFormCreateEmail,setFormCreateFname,setFormCreateLname}) => {
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
        setFormCreateEmail(e.target.value)
    }
    function fnameChange (e) {
        setFormCreateFname(e.target.value)
    }
    function lnameChange (e) {
        setFormCreateLname(e.target.value)
    }
   

  return (
    <>
    <Button type="primary" onClick={showModal}>
       <span className=''>Add User</span> 
    </Button>
      <Modal title="Create User" open={isModalOpen}  footer={null} onOk={handleOk} onCancel={handleCancel}>
      <form onSubmit={(e) => e.preventDefault()} className="poppins">
            <div className="row mx-3">
                <input type="email"   onChange={emailChange} className=' form-control shadow-none' placeholder='user@gmail.com' />
            </div>
                <div className="d-flex gap-2 my-3 mx-3">
                    <input type="text"  onChange={fnameChange}  className=' form-control shadow-none'  placeholder='First name' />
                    <input type="text"  onChange={lnameChange} className=' form-control shadow-none'  placeholder='Last name' />
                </div>
                    <div className='d-flex text-center gap-1 mx-3'>
                        <Button type='submit' className='mt-3' onClick={handleSubmit} color="primary">
                            <span>Submit</span> 
                        </Button>
                    </div>
       </form>
      </Modal>
    </>
  )
}

export default CreateModal