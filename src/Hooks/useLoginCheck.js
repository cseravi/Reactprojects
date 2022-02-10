import {useState, useLayoutEffect} from 'react'
import axios from 'axios';

function useLoginCheck() {
    const [data, setData] = useState({email:'',id:'', name: '', isLoggedIn:false});
    
    useLayoutEffect(() => {
      async function fetchData(){
            let token = localStorage.getItem('you');
            if(token){
               await axios({
                    method:'POST',
                    url: 'http://localhost:4000/login/auth',
                    headers:{
                        'x-auth-token': token,
                    }
                }).then((userData) => {
                    if(userData.data.status === 200){
                        console.log(userData.data);
                        if('email' in userData.data.data){
                            console.log("if");
                            setData({email:userData.data.data.email,id:userData.data.data.user_id, name: userData.data.data.name, isLoggedIn:true})
                        }
                    }
                }).catch((err) => {
                    return err;
                })
            }else{
                console.log("else");
                setData({email:'', id:"",name: '', isLoggedIn:false})
            }
        }
        fetchData();
    }, [])
    return data;
}

export default useLoginCheck
