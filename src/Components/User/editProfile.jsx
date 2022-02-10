import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import useLoginCheck from '../../Hooks/useLoginCheck'

function EditProfile() {

    const [data, setData] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const {isLoggedIn, id} = useLoginCheck();
    // const LoginResData = useLoginCheck();
    
    useEffect(()=>{
        // console.log("LoginResData",LoginResData);
        async function getData() {
            console.log("id is: ",typeof(id),isLoggedIn );
            if(id == ""){
                console.log("Inside effect if");
            }else{
                console.log("Inside effect else");
                     await axios({
                        method:'GET',
                        url: `http://localhost:4000/users/${id}`,
                       
                    }).then((userData)=>{
                        console.log("userData.data.data",userData.data);
                        if(Object.keys(userData.data.data).length){
                            console.log(userData)
                            setisLoaded(true)
                            setData({User:[userData.data.data]})
                        }
                    }).catch(err => console.log(err))
            }
        }
        getData()
    },[isLoggedIn])
    
    // console.log("isLoggedIn", id)
    console.log("isLoaded",isLoaded)
    return (
        <>
            {isLoaded? <>{ JSON.stringify(data) }</> : 'Loading...'}
        </>
    )
}

export default EditProfile
