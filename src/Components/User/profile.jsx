import axios from 'axios';
import React, { PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom';
import Header from '../Common/header';

class Profile extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            name:'',
            isLoggedin: false,
            Id: "",
            User:[]
        }
    }

    async checklogin(){
        let token = localStorage.getItem('you');
        let result;
        if(token){
            await axios({
                method:'POST',
                url: 'http://localhost:4000/login/auth',
                headers:{
                    'x-auth-token': token,
                }
            }).then((userData) => {
              if(userData.data.status === 200){
                  if('email' in userData.data.data){
                      this.setState({email:userData.data.data.email, name: userData.data.data.name, isLoggedin:true, Id:userData.data.data.user_id })
                      result = true;
                  }
              }
            }).catch((err) => {
                return err;
            })
        }else{
            result = false;           
        }
        return result
    }

    componentDidMount(){
        this.checklogin().then(async (result) => {
            if(!result){
                window.location.href = '/'
            }else{
                if(this.state.Id){
                     await axios({
                        method:'GET',
                        url: `http://localhost:4000/users/${this.state.Id}`,
                       
                    }).then((userData)=>{
                        if(Object.keys(userData.data.data).length){
                            console.log(userData)
                            this.setState({User:[userData.data.data]})
                        }
                    }).catch(err => console.log(err))
                }
            }
        })
    }

    render() {
        let {firstname, lastname, email, gender, mobilenumber, role} = this.state.User[0] || {};
        let {isLoggedin} = this.state;
        if(!isLoggedin) return false;
        return (
            <>
                <Header user={this.state}/>
                <div className='container-lg' style={{'borderRadius':".5rem .5rem 0 0"}}>
                    <div className="row gx-5 mt-5">
                        {/* {this.state.User[0]?this.state.User[0]:'Loading'} */}
                        {!Object.keys(this.state.User).length ?
                            
                            <button type="button" className="btn btn-primary ms-1">'Loading...'</button>
                        : 
                            <>
                                <div className="col-lg-4">
                                    <div className="card mb-4">
                                        <div className="card-body text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" />
                                            <h5 className="my-3">{firstname} {lastname}</h5>
                                            <p className="text-muted mb-1">{role}</p>
                                            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                            <div className="d-flex justify-content-center mb-2">
                                                <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-8'>
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{firstname} {lastname}</p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                                </div>
                                                <div className="col-sm-9">
                                                <p className="text-muted mb-0">{email}</p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <p className="mb-0">Gender</p>
                                                </div>
                                                <div className="col-sm-9">
                                                <p className="text-muted mb-0">{gender}</p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <p className="mb-0">Mobile</p>
                                                </div>
                                                <div className="col-sm-9">
                                                <p className="text-muted mb-0">{mobilenumber}</p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                                </div>
                                                <div className="col-sm-9">
                                                <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                                </div>
                                            </div>
                                            
                                            <div className='d-flex justify-content-center mb-2 mt-5'>
                                                <Link className="navbar-brand" to="edit">Edit info</Link>
                                                <button type="button" className="btn btn-primary ms-1">Edit info</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        
                    </div>
                </div>
                
            </>
        )
    }
}

export default Profile