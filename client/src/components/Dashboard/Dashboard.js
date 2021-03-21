import axios from 'axios';
import React,{useEffect,useState} from 'react';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../layout/Navbar';

function Dashboard(props) {

    const cookies=new Cookies();

    useEffect(()=>{
        const token = cookies.get('easy-flight-token');
        if(!token){
            props.history.push('/')
        }
    },[])

    const [airportCode,setAirportCode]=useState('');
    const [viewWaiting,setViewWaiting]=useState(false);
    const [waitingTime,setWaitingTime]=useState([]);
    const [departure,setDeparture]=useState('');
    const [arrival,setArrival]=useState('');
    const [flightCode,setFlightCode]=useState('');
    const [follower,setFollower]=useState(null);
    const [showFollower,setShowFollower]=useState(false);

    

    const getWaitingTime=async()=>{
        const config = {
            headers: { 'x-apiKey': `${process.env.REACT_APP_WAITING_TIME_API_KEY}`,
         }
    };

        if(airportCode === ''){
            toast.error('❌ Please enter Airport Code', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return;
        }
        try{
            const res= await axios.get(`https://waittime-qa.api.aero/waittime/v1/current/${airportCode}`,config)
            console.log(res.data.current);
            await setWaitingTime(res.data.current);
           
            await translate();
            setViewWaiting(true);
        }catch(err){
            console.log(err);
            toast.error('❌ Something went wrong', {
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

    const getFlightTracker=async()=>{

        console.log(process.env.REACT_APP_FLIGHT_FOLLOWER_API_KEY)
        const config = {
            headers: { 'x-apiKey': `${process.env.REACT_APP_FLIGHT_FOLLOWER_API_KEY}`,
         }
    };
        if(departure === '' || arrival === '' || flightCode === ''){
            toast.error('❌ Please fill all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }
        try{
            const airlineCode=flightCode.slice(0,2);
            console.log(airlineCode);
            const flightNumber=flightCode.slice(2);
            console.log(flightNumber)
            const res = await axios.get(`https://flightfollower-qa.api.aero/flightfollower/v1/${departure}/${arrival}/${airlineCode}/${flightNumber}?imgWidth=500&imgLength=500&imgType=gif&rfc2397=false&base64=true`,config)

            setFollower(res.data)
            setShowFollower(true);
            console.log(res.data);
            
        }catch(err){
            console.log(err);
            toast.error('❌ Something went wrong', {
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

    const [bagTag,setBagTag]=useState('');
    const [date,setDate]=useState('');
    const [pnr,setPnr]=useState('');
    const [surname,setSurname]=useState('');
    const [code,setCode]=useState('');

    const [viewBagDetails,setViewBagDetails]=useState(false);
    const [bagDetails,setBagDetails]=useState(null);

    const getBagStatus=async()=>{

        if(bagTag === ''|| date === '' || pnr === ''|| surname === '' || code===''){
            toast.error('❌ Please fill all the details', {
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
            const res= await axios.post('https://easy-flight.herokuapp.com/baggagedetails',{
                bagTag:bagTag,
                code:code,
                date:date,
                surname:surname,
                pnr:pnr
            })
            console.log(res);
            await setBagDetails(res.data.events)
            setViewBagDetails(true);
            translate();
        
        }catch(err){
            console.log(err);
            toast.error('❌ Something went wrong', {
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

    const [email,setEmail]=useState('');
    const [boardingPassPnr,setBoardingPassPnr]=useState('');

    

    const xmlString=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Request LanguageCode="en" username="xxx" password="yyy" emailAddress=${email} mobileNumber="" gate="212" boardingHHMM="18:40" departHHMM="19:10" arriveHHMM="20:30" ffMiles="" DepartTerminal="Term 2" ffTier="" message="Sample"  CabinName="Economy" >
        <Barcode firstName="TEST" lastName="TESTER" title="MR" bookingRef=${boardingPassPnr} depAirportCode="DUB" arrAirportCode="LHR" carrier="XS" flightNumber="56" depDate="2021-03-12" classCode="Y" seatNumber="21B" seqNumber="002" ffAirline="XS" ffNumber="123456789" ticketNumber="000123456789012" issuingCarrier="XS" />
        <Parameters>
            <Parameter name="anyname">Any Value</Parameter>
        </Parameters>
    </Request>`

    const getBoardingPass=async()=>{
        

        try{
            const res= await axios.post('https://easy-flight.herokuapp.com/boardingpass',{
                email:email,
                pnr:pnr
            });
            console.log(res);
            toast.success('🦄 Boarding Pass issued successfully.Please check your mail', {
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
            toast.error('❌ Something went wrong', {
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

    const [language,setLanguage]=useState('3');
    
    const translate=async()=>{

        console.log(waitingTime);

        if(waitingTime === [] && bagDetails === null){
            return;
        }

        var lang='en';
        if(language === '1'){
            lang='hi'
        }else if(language === '2'){
            lang='ta'
        }
        console.log(lang);
        const url=`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`;

        console.log(waitingTime)
        var queueString='';
        if(waitingTime !== []){
            waitingTime.map((waiting)=>{
                console.log('waiting' + waiting.queueName)
                queueString=queueString+waiting.queueName+"|";
            })
        }
        

        var baggageString='';
        if(bagDetails !== null){
            bagDetails.map(m=>{
                baggageString=baggageString+m.event_desc+"|"
            })
        }
        

       
        console.log(process.env.REACT_APP_AZURE_KEY_TRANSLATION)
        //console.log(queueString)
        console.log(baggageString)
        

        const config={
            headers:{
                'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_TRANSLATION}`,
                'Ocp-Apim-Subscription-Region':'eastus2',
                'Content-Type':'application/json'
            }
           
        }
        axios.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`,[
            {
                "text":queueString
            },
            {
                "text":baggageString
            }
        ],config).then((res)=>{
            
            console.log(res);
            const translatedQueueName=res.data[0].translations[0].text.split("|");
            const translatedBaggageDetails=res.data[1].translations[0].text.split("|");

            // console.log(translatedQueueName)
            

            const transdataqueuenames=[];
            console.log(waitingTime)
            if(waitingTime.length != 0 ){
                for(var i=0;i<translatedQueueName.length;i++){
                    if(translatedQueueName[i] !== ''){
                        transdataqueuenames.push({
                            queueName:translatedQueueName[i],
                            projectedMaxWaitMinutes:waitingTime[i].projectedMaxWaitMinutes,
                            projectedMinWaitMinutes:waitingTime[i].projectedMinWaitMinutes
                        })
                    }
                }
                console.log(transdataqueuenames)
    
                setWaitingTime(transdataqueuenames);
            }
            
            const transdatabaggage=[]
            console.log(bagDetails)
            if(bagDetails !== null){
                for(var j=0;j<translatedBaggageDetails.length;j++){
                    if(translatedBaggageDetails[j] !==''){
                        transdatabaggage.push({
                            event_desc:translatedBaggageDetails[j],
                            local_date_time:bagDetails[j].local_date_time,
                            flight_info:{
                                outbound:{
                                    dest_airport:bagDetails[j].flight_info.outbound.dest_airport
                                }
                            }
    
                        })
                    }
                }
                console.log(transdatabaggage)
                setBagDetails(transdatabaggage);
            }

            

            


        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <div>
        <Navbar/>
        <div className="container" style={{marginTop:'4rem',marginBottom:'3rem'}}>
        <div className="row mt-8">
        <label>{language === '3'?'Choose Language': language==='1'?'भाषा चुनें':'மொழியைத் தேர்வுசெய்க'} (Language)</label>
        <select class="form-select form-control" onChange={(e)=>setLanguage(e.target.value)} aria-label="Default select example">
        
        <option value="1">हिन्दी</option>
        <option value="2">தமிழ்</option>
        <option selected value="3">English</option>
      </select>
        
        </div>
        <div className="row mt-5" style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                <h4 style={{textAlign:'center'}}>  {language === '3'?'View Waiting Time for Airports': language==='1'?'हवाई अड्डों के लिए प्रतीक्षा समय देखें':'விமான நிலையங்களுக்கான காத்திருப்பு நேரத்தைக் காண்க'}</h4>
            </div>
            <div className="row">
        
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                <form>
                <div className="form-group"><input className="form-control" placeholder={language === '3'?'Enter Airport Code ': language==='1'?'हवाई अड्डा कोड दर्ज करें':'விமான நிலையக் குறியீட்டை உள்ளிடவும்'} type="text" onChange={(e)=>{setAirportCode(e.target.value)}} /></div>
                </form>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <button className="btn btn-block btn-success" onClick={getWaitingTime}>{language === '3'?'View Waiting Time ': language==='1'?'प्रतीक्षा समय देखें':'காத்திருப்பு நேரத்தைக் காண்க'}</button>
                </div>
            </div>
            <div className="row">
             {
                viewWaiting ? (
                    <div className="ml-3 mr-3">
                    {
                        waitingTime.map((waitTime)=>{
                            return(
                                <button type="button" class="btn btn-primary col-xl-5 ml-3 mr-3 mt-3 ">
                                 {waitTime.queueName} <span class="badge badge-light">{waitTime.projectedMinWaitMinutes}{'-'}{waitTime.projectedMaxWaitMinutes}{' Min'}</span>
                                </button>
                            )
                        })
                    }
                    </div>
                ):(
                    <h6 style={{justifyContent:'center'}}></h6>
                )
             }
            
            </div>

            <div className="row mt-5" style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                <h4 style={{textAlign:'center'}}>{language === '3'?'Track and Follow your Flight': language==='1'?'ट्रैक और अपनी उड़ान का पालन करें':'உங்கள் விமானத்தைக் கண்காணித்து பின்பற்றவும்'}</h4>
            </div>

            <div className="row">
        
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <form>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Departure': language==='1'?'प्रस्थान':'புறப்படுதல்'} type="text" onChange={(e)=>{setDeparture(e.target.value)}} /></div>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Arrival': language==='1'?'आगमन होना':'வருகை'} type="text" onChange={(e)=>{setArrival(e.target.value)}} /></div>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Flight Code': language==='1'?'उड़ान कोड':'விமானக் குறியீடு'} type="text" onChange={(e)=>{setFlightCode(e.target.value)}} /></div>
            </form>
            </div>
            
        </div>
        <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <button className="btn btn-block btn-success" onClick={getFlightTracker}>{language === '3'?'Track and Follow your Flight': language==='1'?'ट्रैक और अपनी उड़ान का पालन करें':'உங்கள் விமானத்தைக் கண்காணித்து பின்பற்றவும்'}</button>
        </div>
        </div>

        <div className="row">
             {
                showFollower ? (
                    <div className="card col-xl-12 col-lg-12 col-md-12 col-sm-12" style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:'2rem'}}>
                        <img src={`data:image/gif;base64, ${follower}`} className="img-fluid" style={{alignSelf:'center',justifyContent:'center',justifySelf:'center',marginTop:'2rem',marginBottom:'2rem'}}></img>
                    </div>
                ):(
                    <div></div>
                )
             }
             
        </div>

        <div className="row mt-5" style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                <h4 style={{textAlign:'center'}}>{language === '3'?'Get your baggage details': language==='1'?'अपने सामान का विवरण प्राप्त करें':'உங்கள் சாமான்களின் விவரங்களைப் பெறுங்கள்'}</h4>
            </div>

            <div className="row">
        
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <form>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Bag Tag': language==='1'?'बैग का टैग':'பை குறிச்சொல்'} type="text" onChange={(e)=>{setBagTag(e.target.value)}} /></div>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Surname': language==='1'?'उपनाम':'குடும்ப பெயர்'} type="text" onChange={(e)=>{setSurname(e.target.value)}} /></div>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Airport Code': language==='1'?'हवाई अड्डा कोड':'விமான நிலைய குறியீடு'} type="text" onChange={(e)=>{setCode(e.target.value)}} /></div>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'PNR': language==='1'?'पी एन आर':'பி.என்.ஆர்'} type="text" onChange={(e)=>{setPnr(e.target.value)}} /></div>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Date': language==='1'?'तारीख':'தேதி'} type="date" onChange={(e)=>{setDate(e.target.value)}} /></div>
            </form>
            </div>
            
        </div>
        <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <button className="btn btn-block btn-success" onClick={getBagStatus}>{language === '3'?'Get your baggage details': language==='1'?'अपने सामान का विवरण प्राप्त करें':'உங்கள் சாமான்களின் விவரங்களைப் பெறுங்கள்'}</button>
        </div>
        </div>

        {
            viewBagDetails ? (
                <div className="row" style={{marginTop:'2rem'}}>
                    {
                        bagDetails.map((bagDetail)=>{
                            return (<div class="col card" style={{width: '18rem'}}>

                            <div class="card-body">
                                <h5 class="card-title">{bagDetail.event_desc}</h5>
                                <p class="card-text">{bagDetail.local_date_time}</p>
                                <a href="#" class="btn btn-primary">{`Destination ${bagDetail.flight_info.outbound.dest_airport}`}</a>
                            </div>
                            </div>)
                        })
                    }
                
                </div>
            ):(
                <div></div>
            )
        }

        <div className="row mt-5" style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                <h4 style={{textAlign:'center'}}>{language === '3'?'Get your boarding pass': language==='1'?'अपना बोर्डिंग पास प्राप्त करें':'உங்கள் போர்டிங் பாஸைப் பெறுங்கள்'}</h4>
            </div>

            <div className="row">
        
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <form>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'Email': language==='1'?'ईमेल':'மின்னஞ்சல்'} type="text" onChange={(e)=>{setEmail(e.target.value)}} /></div>
            <div className="form-group"><input className="form-control" placeholder={language === '3'?'PNR': language==='1'?'पी एन आर':'பி.என்.ஆர்'} type="text" onChange={(e)=>{setBoardingPassPnr(e.target.value)}} /></div>
            
            </form>
            </div>
            
        </div>
        <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <button className="btn btn-block btn-success" onClick={getBoardingPass}>{language === '3'?'Get your boarding pass': language==='1'?'अपना बोर्डिंग पास प्राप्त करें':'உங்கள் போர்டிங் பாஸைப் பெறுங்கள்'}</button>
        </div>
        </div>
            
        </div>
        </div>
    )
}

export default Dashboard;
