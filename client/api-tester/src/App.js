import React, { useState } from 'react'
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
        setUsers(response.data)
      })
      .catch(error => console.log(error))
  }

  // post a new user
  const postNew = () => {
    axios.create({headers: {'Content-Type': 'application/json'}})
      .post('http://localhost:8000/api/users/', {
        name: formValues.name,
        bio: formValues.bio
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  // get a specific user by id
  const getById = () => {
    axios.get(`http://localhost:8000/api/users/${formValues.id}`)
      .then(response => {
        console.log(response)
        setUsers([response.data])
      })
      .catch(error => console.log(error))
  }

  // delete user by id
  const deleteUser = () => {
    axios.delete(`http://localhost:8000/api/users/${formValues.id}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  // edit user with put request
  const editUser = () => {
    axios.create({headers: {'Content-Type': 'application/json'}})
      .put(`http://localhost:8000/api/users/${formValues.id}`, {
        name: formValues.name,
        bio: formValues.bio
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }


  return (
    <div className='App'>
      <h1>API Tester</h1>
      <div className='formAndButtons'>
        <form>
          <input name='id' placeholder='id' value={formValues.id} onChange={updateForm}/>
          <input name='name' placeholder='name' value={formValues.name} onChange={updateForm}/>
          <input name='bio' placeholder='bio' value={formValues.bio} onChange={updateForm}/>
        </form>
        <div className='buttonContainer'>
          <button onClick={getAll}>Get all</button>
          <button onClick={postNew}>Post New</button>
          <button onClick={getById}>Get By Id</button>
          <button onClick={deleteUser}>Delete</button>
          <button onClick={editUser}>Edit User</button>
        </div>
      </div>
      {/* render data */}
      {users.map(user => {
        return (
          <div key={user.id} className='user'>
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
