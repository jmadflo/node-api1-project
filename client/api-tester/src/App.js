import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // user data from api
  const [ users, setUsers] = useState([])
  // need a dependency for the useEffect hook to fetch updated data every time we modify
  const [ formValues, setFormValues ] = useState({
    id: '',
    name: '',
    bio: ''
  })

  // update form values
  const updateForm = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  // get all user data
  const getAll = () => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        console.log(response)
        setUsers(response)
      })
      .catch(error => console.log(error))
  }

  // // get all user data
  // const getAll = () => {
    
  // }

  // // get all user data
  // const getAll = () => {
    
  // }

  // // get all user data
  // const getAll = () => {
    
  // }

  // // get all user data
  // const getAll = () => {
    
  // }


  return (
    <div className='App'>
      <form>
        <input name='id' placeholder='id' value={formValues.id} onChange={updateForm}/>
        <input name='name' placeholder='name' value={formValues.name} onChange={updateForm}/>
        <input name='bio' placeholder='bio' value={formValues.bio} onChange={updateForm}/>
      </form>
      <button onClick={getAll}>Get all</button>
      <button onClick={postNew}>Post New</button>
      <button onClick={getById}>Get By Id</button>
      <button onClick={deleteUser}>Delete</button>
      <button onClick={editUser}>Edit User</button>
      {/* render data */}
      {users.map(user => {
        return (
          <div>
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Bio: {user.bio}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
