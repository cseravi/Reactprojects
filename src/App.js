import React, { PureComponent } from 'react'
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/dashboard';
import Signup from './Components/Login/signup';
import Profile from './Components/User/profile';
import EditProfile from './Components/User/editProfile';

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='sign-up' element={<Signup/>}/>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='profile' element={<Profile />} />
          <Route path='profile/edit' element={<EditProfile />} />
        </Routes>
    )
  }
}

export default App
