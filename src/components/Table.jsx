import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import ViewModal from '../components/ViewModal';
import API_URI from '../app/Request'
import { Table, Button } from 'antd';
import UpdateModal from './UpdateModal';
import CreateModal from './CreateModal';
import defaultImage from '../assets/defaultImage.jpg'
const { Column } = Table;

const UserTable = () => {

     // Get Form Value from Create User
     const [formCreateEmail, setFormCreateEmail] = useState("")   
     const [formCreateFname, setFormCreateFname] = useState("")   
     const [formCreateLname, setFormCreateLname] = useState("")  
 
     // Get Form Value from UPD User
     const [formUpdEmail, setFormUpdEmail] = useState("")   
     const [formUpdFname, setFormUpdFname] = useState("")   
     const [formUpdLname, setFormUpdLname] = useState("")  
 
     // Modal Toggler 
     const [modal, setModal] = useState(false);
     const toggle = () => setModal(!modal);
 
    // setId
    function userId () {
     return usersData.length + 1 
     }

    // FETCHING DATA
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

    // CREATE USER
    async function createUser () {
        let data = {id: userId() ,avatar:"",email:formCreateEmail ,first_name:formCreateFname, last_name:formCreateLname}
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
    }
    
    // UPD USER
   async function updateUser (id) {
    console.log(API_URI.requestUsers + "/" + id)
    let data = {id: id ,avatar:"", email:formUpdEmail ,first_name:formUpdFname, last_name:formUpdLname}
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
        setModal(false)
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

    // DELETE USER
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

    // SHOW DATA HERE
    const data = usersData?.map((item , idx ) => ({
        key: idx,
        id: item.id,
        avatar: [<img className='avatar_img' src={item.avatar || defaultImage} alt='None'/>],
        email: item.email || "No Provided",
        firstName: item.first_name || "No Provided",
        lastName: item.last_name || "No Provided",
        actions: [<span className="d-flex justify-content-center gap-2">

                    <ViewModal userAvatar={item.avatar} userEmail={item.email} userFName={item.first_name} userLName={item.last_name}/>

                    <UpdateModal supplyId={() => updateUser(item.id)} updUserId={item.id} setFormUpdEmail={setFormUpdEmail} setFormUpdFname={setFormUpdFname} setFormUpdLname={setFormUpdLname} clickUser={updateUser} />

                    <Button type='danger' onClick={() => deleteUser(item.id)}>Delete</Button>

                  </span>]
    })) 
           

    return (
    <div className='oveflow-hidden container-fluid '> 
        <div className="d-flex justify-content-end">
            <CreateModal handleSubmit={createUser} setFormCreateEmail={setFormCreateEmail} setFormCreateFname={setFormCreateFname} setFormCreateLname={setFormCreateLname} />
        </div>
        <Table dataSource={data} className="oveflow-hidden container-fluid w-100 bg-white text-center  mx-auto">
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

export default UserTable