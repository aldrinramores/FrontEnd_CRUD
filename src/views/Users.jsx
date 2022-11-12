import React, {useState, useEffect} from 'react';
import { Table, Button, Alert } from 'antd';
import defaultImage from '../assets/defaultImage.jpg'
import 'antd/dist/antd.css';
import API_URI from '../app/Request'
import ViewModal from '../components/ViewModal';
import UpdateModal from '../components/UpdateModal';
import CreateModal from '../components/CreateModal';

const { Column } = Table;

const Users = () => {

     // Get Form Value from Create User
    const [formCreateEmail, setFormCreateEmail] = useState("")   
    const [formCreateFname, setFormCreateFname] = useState("")   
    const [formCreateLname, setFormCreateLname] = useState("")  
 
    // Get Form Value from UPD User
    const [formUpdEmail, setFormUpdEmail] = useState("")   
    const [formUpdFname, setFormUpdFname] = useState("")   
    const [formUpdLname, setFormUpdLname] = useState("")  

    //  Show Update Error Alert 
    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Correct Id input
    function userId () {
     return usersData.length + 1 
    }

    // Fetching Data
    const [usersData, setUsersData] = useState([])
    useEffect(() => {
        function fetchData () {
           fetch(API_URI.requestUsers)
           .then((res) => res.json())
           .then((json) => {
               setUsersData(json.data)
           })
       }
       fetchData()
       console.log(usersData)
    },[])

    // Create New User
    async function createUser () {

        let data = {id: userId() ,avatar:"",email:formCreateEmail ,first_name:formCreateFname, last_name:formCreateLname}

        // Clear Form Create Values
         function clearValues () {
            setFormCreateEmail('')
            setFormCreateFname('')
            setFormCreateLname('')
        }

        if (!formCreateEmail || !formCreateFname || !formCreateLname) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
            clearValues()
        } else {
            await fetch(API_URI.requestUsers, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        })
                .then((response) => response.json())
                .then((data) => {
                setUsersData([...usersData].concat(data))
                console.log('Success:', data);
        
                })
                .catch((error) => {
                console.error('Error:', error);
                });
                setShowSuccess(true)
                setTimeout(() => {
                    setShowSuccess(false)
                }, 3000)
                clearValues()
        }
       
      

    }
   
    // Update User
    async function updateUser (id) {
    let data = {id: id ,avatar:"", email:formUpdEmail ,first_name:formUpdFname, last_name:formUpdLname}

    // Clear Update Form Values
    function clearValues() {
        setFormUpdEmail('')
        setFormUpdFname('')
        setFormUpdLname('')
    }

        if (!formUpdEmail || !formUpdFname || !formUpdLname ) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
            clearValues()
        } else {
            await fetch(API_URI.requestUsers + "/" + id, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json()) 
                .then((json) => {
                setUsersData(usersData.map((el) => {
                    if (el.id === json.id){
                        el.email = json.email 
                        el.first_name = json.first_name 
                        el.last_name = json.last_name 
                    }
                    return el
                }))
                console.log('Success:', json);
                })
                .catch((error) => {
                console.error('Error:', error);
                });
                setShowSuccess(true)
                setTimeout(() => {
                    setShowSuccess(false)
                }, 3000)
                clearValues()
        }
    }

    // Delete User
    async function deleteUser(id){
        await fetch(API_URI.requestUsers + "/" + id, {
        method: 'DELETE'
        }).then((res) => {
            console.log('Success:',res);
            setUsersData(usersData.filter(el => el.id !== id))
        }).catch(err => {
            console.error(err)
        });
    }

    // Show Data Here
    const data = usersData?.map((item , idx ) => ({
        key: idx,
        id: item.id,
        avatar: [<img className='avatar_img' src={item.avatar || defaultImage} alt='None'/>],
        email: item.email || "No Provided",
        firstName: item.first_name || "No Provided",
        lastName: item.last_name || "No Provided",
        actions: [<span className="d-flex justify-content-center gap-2">

                    <ViewModal className={`hoverButtonStyles`} userAvatar={item.avatar} userEmail={item.email} userFName={item.first_name} userLName={item.last_name}/>

                    <UpdateModal className={`hoverButtonStyles`} supplyId={() => updateUser(item.id)}  setFormUpdEmail={setFormUpdEmail} setFormUpdFname={setFormUpdFname} setFormUpdLname={setFormUpdLname} clickUser={updateUser} fnameValue={formUpdFname} emailValue={formUpdEmail} lnameValue={formUpdLname}/>

                    <Button className={`hoverButtonStyles`} type='danger' onClick={() => deleteUser(item.id)}>Delete</Button>

                  </span>]
    })) 

    // Mouse Animations
    let mouseHover = document.querySelector(".mousePointer")
    let interactives = document.querySelectorAll(".hoverButtonStyles")

    const animateTrailer = (e) => {
      mouseHover.style.top = e.pageY + 'px'
      mouseHover.style.left = e.pageX + 'px'
    }
    window.onmousemove = (e) => {
      animateTrailer(e)
    }

    interactives.forEach(item => {
      item.onmouseleave = () => {
        mouseHover.classList.remove("hovered")
      }
      item.onmouseover = () => {
        mouseHover.classList.add("hovered")
      }
    })
   

    return (
    <div className='oveflow-hidden container-fluid mb-5 pb-5' style={{cursor: 'none'}}> 
        <div className="mousePointer"></div>
        {/* ALERTS */}
        {showError&& 
        <Alert
            message="Error"
            description="All inputs must not be blank"
            type="error"
            closable="true"
            showIcon
            style={{fontWeight:'bold', top:'0', position: 'fixed', width:'100%', zIndex:'100'}}
        />}
        {showSuccess&& 
        <Alert
            message="Success"
            description="User Created/Updated"
            type="success"
            closable="true"
            showIcon
            style={{fontWeight:'bold', top:'0', position: 'fixed', width:'100%', zIndex:'100'}}
        />}
       
        <h1 className='text-center dispay-1 text-white archivo mt-5 py-5'>USER'S DATA</h1>
        <div className="d-flex justify-content-end">
            <CreateModal handleSubmit={createUser} setFormCreateEmail={setFormCreateEmail} setFormCreateFname={setFormCreateFname} setFormCreateLname={setFormCreateLname} emailValue={formCreateEmail} fnameValue={formCreateFname} lnameValue ={formCreateLname}/>
        </div>
        <Table dataSource={data} className="oveflow-hidden container-fluid w-100 bg-white text-center  mx-auto poppins">
            <Column title="ID" className='bg-white text-center  ' dataIndex="id" key="key" />
            <Column title="Avatar" className='bg-white text-center  ' dataIndex="avatar"  key="key" />
            <Column title="Email" className=' bg-white text-center ' dataIndex="email"  key="key" />
            <Column title="First Name" className=' bg-white text-center ' dataIndex="firstName"  key="key"  />
            <Column title="Last Name" className='bg-white text-center  ' dataIndex="lastName"  key="key"  />
            <Column title="Actions" className='bg-white text-center text-left ' dataIndex="actions"  key="key"  /> 
        </Table>
        
    </div>
  )
}

export default Users