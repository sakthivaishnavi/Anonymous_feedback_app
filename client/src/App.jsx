
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Display from './Display'
import Login from './Login'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Display />}> </Route>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/create' element={<CreateUser />} ></Route>
        <Route path='/update/:id' element={<UpdateUser />}> </Route>
        <Route path='/edit' element={<Users />}> </Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
