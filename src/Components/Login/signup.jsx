import React, { useState } from 'react';
import '../../assets/styles/style.css';
import '../../assets/styles/signup.css';
import useLoginCheck from '../../Hooks/useLoginCheck';
import { Link, Navigate } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import axios from 'axios';

function Signup() {
    
    let {isLoggedIn} = useLoginCheck();
    let {changeElement, values, handleSubmit, errors} = useForm();
    let [isSubmit, setSubmit] = useState(false);
    let [serverError, setServerError] = useState({});
    let [isRegistered, setRegisterd] = useState(false)
    
    const registerUser = async (values) => {
        setServerError({serverError})
        await axios({
            method: 'POST',
            url:"http://localhost:4000/register",
            data: values
           
        }).then((response)=>{
            if(response.data.status === 200){
                if(Object.keys(response.data).length){
                    setRegisterd(true);
                }
            }else if(response.data.status === 101){
                setServerError({userExist:"Ueser already exist!"})
            }else if(response.data.status === 400){
                let myErrors = {};
                let objectKeys = Object.keys(response.data.data[0]);
                if(objectKeys.length){
                    objectKeys.forEach(function(item){
                        let {kind} = response.data.data[0][item]
                        if(kind === 'Number'){
                            myErrors[item] = `${item} must be type number`;
                        }

                        if(kind === 'required'){
                            myErrors[item] = `Field name is wrong`;
                        }
                        
                        setServerError(myErrors)
                    });
                }
            }
            setSubmit(false)
        }).catch((err) => {
        })
    }
    
    const handleElement = (event) => {
        event.preventDefault();
        handleSubmit(event)
        if(Object.keys(errors).length){
           return false;
        }else{
            delete values.confirmpassword;
            setSubmit(true)
            registerUser(values);
        }
    }
        
    return (
        <>
        {isRegistered} 
        {isLoggedIn ? <Navigate to='/dashboard' /> : 
            <div className='main-wrapper'>
                <div className='sign-up-form'>
                    <h2>Sign Up</h2>
                    {isRegistered === true?
                        <p>Yay! You are registered successfully! Do you want to login?  <Link to="/login" className='btn btn-link'>Yes</Link>.</p>: 
                        <form className='form-signup' onSubmit={handleElement}>
                            <div className='form-fields'>
                                <label>
                                    <span>First Name</span>
                                    <input type="text" name='firstname' className={errors.firstname?'form-field error': 'form-field'}  onChange={changeElement}/>
                                </label>
                                {errors.firstname && <p className='error'>{errors.firstname}</p>}
                                {serverError.firstname && <p className='error'>{serverError.firstname}</p>}
                            </div>
                            <div className="form-fields">
                                <label>
                                    <span>Last Name</span>
                                    <input type="text" name='lastname' className={errors.lastname?'form-field error': 'form-field'}  onChange={changeElement} />
                                </label>
                                {errors.lastname && <p className='error'>{errors.lastname}</p>}
                            </div>
                            <div className="form-fields">
                                <label>
                                    <span>Mobile</span>
                                    <input type="text" name='mobilenumber' className='form-field' onChange={changeElement}/>
                                </label>
                                {errors.mobilenumber && <p className='error'>{errors.mobilenumber}</p>}
                                {serverError.mobilenumber && <p className='error'>{serverError.mobilenumber}</p>}
                            </div>
                            <div className="form-fields">
                                <label>
                                    <span>Email</span>
                                    <input type="email" name='email' className='form-field' onChange={changeElement}/>
                                </label>
                                {errors.email && <p className='error'>{errors.email}</p>}
                                {serverError.userExist && <p className='error'>{serverError.userExist}</p>}
                            </div>
                            <div className="form-fields">
                                <label>
                                    <span>password</span>
                                    <input type="password" name='password' className='form-field' onChange={changeElement}/>
                                </label>
                                {errors.password && <p className='error'>{errors.password}</p>}
                            </div>
                            <div className="form-fields">
                                <label>
                                    <span>Confirm password</span>
                                    <input type="password" name='confirmpassword' className='form-field' onChange={changeElement}/>
                                </label>
                                {errors.confirmpassword && <p className='error'>{errors.confirmpassword}</p>}
                            </div>
                        
                            <div className="form-fields">
                                <div className='gender-wrap'>
                                    <input type="radio" name="gender" value="male" onChange={changeElement}/>
                                    <label>Male</label>
                                    <input type="radio" name="gender" value="female" onChange={changeElement}/>
                                    <label>Female</label>
                                </div>
                                {errors.gender && <p className='error'>{errors.gender}</p>}
                            </div>
                            <div className='form-fields'>
                                <select name="role" id="role" onChange={changeElement}>
                                    <option value="">Choose Role</option>
                                    <option value="manager">Manager</option>
                                    <option value="developer">Developer</option>
                                    <option value="director">Director</option>
                                </select>
                                {errors.role && <p className='error'>{errors.role}</p>}
                            </div>
                            <div className='btn-acion-signup'>
                                <button type='submit'className='btn btn-primary'>{isSubmit === false?'Signup':'Wait..'}</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        }
    </>
    );
}

export default Signup