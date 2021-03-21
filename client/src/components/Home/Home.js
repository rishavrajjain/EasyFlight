import React,{useContext,useEffect} from 'react';

import Cookies from 'universal-cookie';

import './home.css'


import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Home = (props) => {

 


  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('easy-flight-token');
    if(token ){
      props.history.push('/dashboard');
    }
    
  }, [])

  

    

    const svg='<div class="container"><div class="row"><div class="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center"><div data-aos="zoom-out"><h1><span>Easy Flight</span> Seamless Flying Experience</h1><h2></h2><div class="text-center text-lg-left"><a href="#about" class="btn-get-started scrollto">Get Started</a></div></div></div><div class="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay="300"></div></div></div><svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none"><defs><path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></defs><g class="wave1"><use xlink:href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)"></g><g class="wave2"><use xlink:href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)"> </g><g class="wave3"><use xlink:href="#wave-path" x="50" y="9" fill="#fff"></g></svg>'

    const home=(
        <div>
        
        <section id="hero" dangerouslySetInnerHTML={{__html: svg }}>

    

    

  </section>
      <div>
      <section id="features" class="features">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>Check The Features</p>
        </div>

        <div class="row" data-aos="fade-left">
          <div class="col-lg-3 col-md-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="50">
              <i class="fa fa-clock-o" style={{color: '#ffbb2c'}}></i>
              <h3><a href="">Know waiting time for Queues in an Airport</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="100">
              <i class="fa fa-globe" style={{color: '#5578ff'}}></i>
              <h3><a href="">Track and Follow your Flight Status</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="150">
              <i class="fa fa-ticket" style={{color: '#e80368;'}}></i>
              <h3><a href="">Get Boarding Pass and Updates</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-lg-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="200">
              <i class="fa fa-suitcase" style={{color: '#e361ff'}}></i>
              <h3><a href="">Get your baggae info and ability to track it</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="250">
              <i class="fa fa-language" style={{color: '#47aeff'}}></i>
              <h3><a href="">Available in Multiple Indian Languages for seamless experience</a></h3>
            </div>
          </div>
          
          
          
          
        </div>

      </div>
    </section>

    
        
      
        </div>

        
      
  
    
  
    
    
        

        
            
        </div>
    )

   
  
   

    return (
        <div>
            <Navbar style={{marginBottom:'2rem'}}/>
            {home}
        </div>
    )
}

export default Home;


// <section id="steps" className="steps section-bg">
//         <div className="container">
  
//           <div className="row no-gutters">
  
//             <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in">
//               <span>01</span>
//               <h4>Lorem Ipsum</h4>
//               <p>Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et consectetur ducimus vero placeat</p>
//             </div>
  
//             <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="100">
//               <span>02</span>
//               <h4>Repellat Nihil</h4>
//               <p>Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis dolor quod et vel dire leno para dest</p>
//             </div>
  
//             <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="200">
//               <span>03</span>
//               <h4> Ad ad velit qui</h4>
//               <p>Molestiae officiis omnis illo asperiores. Aut doloribus vitae sunt debitis quo vel nam quis</p>
//             </div>
  
//             <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="300">
//               <span>04</span>
//               <h4>Repellendus molestiae</h4>
//               <p>Inventore quo sint a sint rerum. Distinctio blanditiis deserunt quod soluta quod nam mider lando casa</p>
//             </div>
  
//             <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="400">
//               <span>05</span>
//               <h4>Sapiente Magnam</h4>
//               <p>Vitae dolorem in deleniti ipsum omnis tempore voluptatem. Qui possimus est repellendus est quibusdam</p>
//             </div>
  
//             <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="500">
//               <span>06</span>
//               <h4>Facilis Impedit</h4>
//               <p>Quis eum numquam veniam ea voluptatibus voluptas. Excepturi aut nostrum repudiandae voluptatibus corporis sequi</p>
//             </div>
  
//           </div>
  
//         </div>
//       </section>