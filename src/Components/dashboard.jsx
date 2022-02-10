import React from 'react'
import axios from 'axios';
import Header from './Common/header';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            name:'',
            isLoggedin: false,
            Id: "",
            allData:[]
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
        this.checklogin().then((result) => {
            if(!result)
            window.location.href = '/'
        })
    }

    componentWillUnmount(){
        // this.setState({
        //     email:'',
        //     name:'',
        //     isLoggedin: false
        // })
    }

    render() {
        let {isLoggedin} = this.state;

        if(!isLoggedin) return false;

        return (
            <>
                <Header user={this.state}/>
                <div className='container-lg'>
                    <div className="row gx-5 mt-5">
                        <div className="col-md-4">
                             <div className="p-3 border bg-secondary" align="center">
                                <h6 className='center text-white'>Total Tasks</h6>
                                <p className="text-white mt-4">0</p>
                             </div>
                        </div>
                        <div className="col-md-4">
                             <div className="p-3 border bg-secondary" align="center">
                                <h6 className='center text-white'>Total Tasks</h6>
                                <p className="text-white mt-4">0</p>
                             </div>
                        </div>
                        <div className="col-md-4">
                             <div className="p-3 border bg-secondary" align="center">
                                <h6 className='center text-white'>Total Tasks</h6>
                                <p className="text-white mt-4">0</p>
                             </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard