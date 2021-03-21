
  
import React,{useContext,useState,useEffect} from 'react'



import { Link } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'universal-cookie';
import LoadingOverlay from 'react-loading-overlay';







import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../layout/Navbar';

const Signup = (props) => {

    const cookies = new Cookies();


   
    const token = cookies.get('easy-flight-token')

    useEffect(()=>{
        if(token){
            console.log('oof')
            props.history.push('/dashboard');
        }
    },[props.history])

    const [loading,setLoading]=useState(false);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');

    const onEmailChange=(e)=>{
        setEmail(e.target.value);
    }

    const onPasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const onNameChange=(e)=>{
        setName(e.target.value)
    }

    const submit=async (e)=>{
        e.preventDefault();

        
        if(name === '' || password === '' || email === ''){
            
            toast.error('❌ Name,Email or Password cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

        try{
            const res= await axios.post('https://easy-flight.herokuapp.com/createuser',{
                name:name,
                email:email,
                password:password
            })

            cookies.set('easy-flight-token',res.data.data.token);
            cookies.set('name',res.data.data.name);
            cookies.set('email',res.data.data.email)
            props.history.push('/dashboard');

            toast.success('🦄 Account created. Login Successfull !', {
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
            if(err.response.status === 400){
                toast.error('❌ Email/User already exists.Please Login', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }


            if(err.response.status === 500){
                toast.error('❌ Something went wrong.Please try again.', {
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
    }

    


    

    


    

    

    
    return (
        <div>
        <Navbar/>
        
            
            
            <div className="container" style={{marginTop:'5rem',marginBottom:'2rem',alignContent:'center'}}>
            
                <div class="card" style={{width: '25rem',margin:'auto'}}>
                <LoadingOverlay
            active={loading}
            spinner
            text='Loading'
            >
                <img class="card-img-top" style={{marginTop:'1rem'}} src="https://i.ibb.co/tCQC7TJ/Untitled-design-28.png" alt="Card image cap"/>
                <div class="card-body" style={{margin:'auto',alignContent:'center',alignItems:'center'}}>
                <h5 class="card-title"></h5>
                <p class="card-text" style={{textAlign:'center'}}>Signup</p>

                <form onSubmit={submit}>
                <div class="form-group">
                    <label for="exampleInputName">Full Name</label>
                    <input type="text" onChange={(e)=>onNameChange(e)} class="form-control" id="exampleInputName"  placeholder="Enter Name"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={(e)=>onEmailChange(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" onChange={(e)=>onPasswordChange(e)}class="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>

              <button className="btn btn-block btn-primary">Submit</button>

              <Link to="/login"><p class="card-text" style={{textAlign:'center',marginTop:'20px'}}>Already have an account ? Login.</p></Link>

                
                </form>
                
                
                </div>
                
                </LoadingOverlay>
                </div>
                
            </div>
            
            
            
        </div>
    )
}

export default Signup;


