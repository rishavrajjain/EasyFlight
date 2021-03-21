import React,{Fragment, useContext,useEffect,useState} from 'react';
import Cookies from 'universal-cookie';

import LoadingOverlay from 'react-loading-overlay';


import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '../layout/Navbar';

const Profile = (props) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [loadingOverlay,setLoadingOverlay]=useState(false);
    const cookies=new Cookies();
    

    useEffect(()=>{
      const name=cookies.get('name');
      const email=cookies.get('email');

      setUser({
          name:name,
          email:email
      })
      
      
      
      setLoading(false);
    },[])

    const logout=async(e)=>{
        e.preventDefault();

        const token=cookies.get('easy-flight-token');
        console.log(token)
            const config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
             }
        };

        try{
            const res = await axios.post('https://easy-flight.herokuapp.com/logout',{},config);

            cookies.remove('easy-flight-token');
            cookies.remove('name');
            cookies.remove('email')
            props.history.push('/');
            toast.success('🦄 Logout Successfull !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        }catch(err){
            console.log(err);
            toast.error('❌ Something went wrong.Please try again after clearing cookies and history.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    

  

    

    

    
    
    

    return loading?(
      <Fragment className="container">
        Loading 
    </Fragment>
    ):(
      <Fragment>
        <Navbar/>
      <div>
        
            
            
      <div className="container" style={{marginTop:'5rem',marginBottom:'12rem',alignContent:'center'}}>
      
          <div class="card" style={{width: '18rem',margin:'auto',alignContent:'center',alignItems:'center'}}>
          
          
          <div class="card-body" style={{margin:'auto',alignContent:'center',alignItems:'center'}}>
          <h5 class="card-title" style={{textAlign:'center'}}>{user.name}</h5>
          <p class="card-text" style={{textAlign:'center'}}>{user.email}</p>

          <button className="btn btn-block btn-warning" onClick={logout}>Logout</button>
          
          
          
          </div>
          
          
          </div>
          
      </div>
      
      
      
  </div>

        
        </Fragment>
    )
}

export default Profile;