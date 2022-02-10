import {useState } from "react";
import serialize from 'form-serialize';

const useForm = () => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const changeElement = (event) => {
        let {name, value} = event.target;
        let {...rest} = {...values, [name]:value}
        
        setValues(rest)
        // validate(rest)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let setval = serialize(event.target, {empty:true})
        setValues(setval)
        validate(setval)
    }

    const validate = (values) => {
        if(!values.firstname){
            errors.firstname = "First name is required!"
        }else{
            delete errors.firstname;
        }
        
        if(!values.lastname){
            errors.lastname = "Last name is required!"
        }else{
            delete errors.lastname;
        }

        if(!values.password){
            errors.password = "Password is required!";
        }else if(values.password.length < 5){
            errors.password = "Password is too small, it must be greter than 5 character";
        }
        else{
            delete errors.password;
        }

        if(values.password !== values.confirmpassword){
            errors.confirmpassword = "Password is not matching!"
        }else{
            delete errors.confirmpassword;
        }

        if(!values.mobilenumber){
            errors.mobilenumber = "Mobilenumber is required!";
        }else{
            delete errors.mobilenumber;
        }

        if(!values.email){
            errors.email = "Email is required!";
        }else{
            delete errors.email;
        }

        if(!values.gender){
            errors.gender = "Gender is required!"
        }else{
            delete errors.gender;
        }

        if(!values.role){
            errors.role = "Role is required!";
        }else{
            delete errors.role;
        }
        console.log(errors)
        setErrors(errors)
        
    }
    
    return {values, errors, changeElement, handleSubmit, setErrors}
}

export default useForm;