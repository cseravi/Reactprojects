import React from 'react'
import '../../assets/styles/login.css'
import {Link, useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';
import useLoginCheck from '../../Hooks/useLoginCheck';


class Loginform extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            name: '',
            isLoggedin:false,
            isSubmit:false,
            errors:{}
        }
    }

    validate = (e) => {
        let errors={};
        
        let email = e.target.email.value;
        let password = e.target.password.value;

        if(!email){
            errors.email = "Email is required!";
        }else{
            delete errors.email;
        }

        if(!password){
            errors.password = "Password is required!";
        }else{
            delete errors.password;
        }

        this.setState({errors})
    }

    loginHandler = async (e) => {
       e.preventDefault()
       let email = e.target.email.value;
       let password = e.target.password.value;
       const payload = {email:email, password:password}
       if(email !== '' && password !== ''){
           this.setState({isSubmit:true})
           await axios({
                   method: 'POST',
                   url: 'http://localhost:4000/login',
                   data: payload
               }).then((res) => {
                   if('token' in res.data){
                       localStorage.setItem('you', res.data.token);
                       this.setState({isLoggedin: true,email:`${res.data.data.email}`, name:`${res.data.data.firstname} ${res.data.data.lastname}`, isSubmit:false});
                       this.props.navigate('/dashboard');
                   }else{
                       if(res.data.status === 404){
                           this.setState({errors:{namePasswordWrong:res.data.details}, isSubmit: false})
                       }
                   }
           }).catch((err) => console.log(err))
       }else{
          this.validate(e)
       }
    }

    render() {
        return (
            <>
                <div className='main'>
                    <div className='inner-sections'>
                        <div className='section-login'>
                            <h2>Login</h2>
                            {this.state.errors.namePasswordWrong && <p className='error'>{this.state.errors.namePasswordWrong}</p>}
                            <form onSubmit={this.loginHandler}>
                                <label>
                                    <span>Email</span>
                                    <input type="email" name='email' className='form-field' onChange={(e)=>this.setState({email:e.target.value})}/>
                                </label>
                                 {this.state.errors.email && <p className='error'>{this.state.errors.email}</p>}
                                <label>
                                    <span>Password</span>
                                    <input type="password" name="password" className='form-field' />
                                </label>
                                {this.state.errors.password && <p className='error'>{this.state.errors.password}</p>}
                                <div className='btn-acion'>
                                    <button type='submit'className='btn btn-primary'>{this.state.isSubmit === false?'Login':'Wait...'}</button>
                                </div>
                            </form>
                        </div>
                        <div className='section-signup'>
                            <div className='upper-signup'>
                                <h2>Sign Up</h2>
                                <p>Sign up and discover great amount of new opportunities!</p>
                                {/* <button className='btn btn-line'>Signup</button> */}
                                <Link to="/sign-up" className='btn btn-link'>Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function Login(props){
    let navigate = useNavigate();
    let {email, name, isLoggedIn} = useLoginCheck();
    return(
        <>
            {isLoggedIn ? <Navigate to='/dashboard' /> : <Loginform navigate={navigate} email={email} name={name} isLogged={isLoggedIn}/>}
        </>
    )
}
export default Login;