const express=require('express');
require('dotenv').config()

const User = require('../models/user');
const jwt=require('jsonwebtoken');

const auth=require('../middleware/auth');

const router=express.Router();

const axios=require('axios');










router.post('/createuser',async(req,res)=>{

    console.log(req.body);

    try{

        const check=await User.findOne({email:req.body.email});

        if(check){
            res.status(400).json({
                data:{
                    message:'User Already exists.Please Login'
                }
            })
        }
        const user=new User(req.body);
        console.log(user)
        const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
        user.tokens=user.tokens.concat({token})
        console.log(user);
        await user.save();
        console.log('done');
        res.status(200).json({
            data:{
                token,
                email:user.email,
                name:user.name,
                
            }
        })
        
    }catch(e){
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }

})

router.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{
        const user=await User.findOne({email});
        if(!user){
            res.status(404).json({
                data:{
                    message:'User Not found.Please register first.'
                }
            })
        }
        if(user.password === password){
            const token =jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
            user.tokens=user.tokens.concat({token})
            await user.save();
            res.status(200).json({
                data:{
                    token,
                    email:user.email,
                    name:user.name,
                    
                }
            })

        }else{
            res.status(401).json({
                data:{
                    message:'Invalid Credentials'
                }
            })
        }
    }catch(err){
        res.status(500).json({
            data:err
        })
    }
})





router.post('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.status(200).json({
            data:{
                message:'Logged out successfully'
            }
        })
    }catch(e){
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }
})


router.post('/boardingpass',async(req,res)=>{
    const config = {
        headers: { 'X-apiKey': `${process.env.BOARDING_PASS_API_KEY}`,
        'Content-Type':'application/xml'
     }
    };
    console.log(process.env.BOARDING_PASS_API_KEY)

    const xmlString=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Request LanguageCode="en" username="xxx" password="yyy" emailAddress="${req.body.email}" mobileNumber="+91 9952121766" gate="212" boardingHHMM="18:40" departHHMM="19:10" arriveHHMM="20:30" ffMiles="" DepartTerminal="Term 2" ffTier="" message="Sample"  CabinName="Economy" >
        <Barcode firstName="TEST" lastName="TESTER" title="MR" bookingRef="${req.body.pnr}" depAirportCode="DUB" arrAirportCode="LHR" carrier="XS" flightNumber="56" depDate="2021-03-12" classCode="Y" seatNumber="21B" seqNumber="002" ffAirline="XS" ffNumber="123456789" ticketNumber="000123456789012" issuingCarrier="XS" />
        <Parameters>
            <Parameter name="anyname">Any Value</Parameter>
        </Parameters>
    </Request>`

    try{
        const result=await axios.post('http://qabpass.api.aero/api/14?channel=API',xmlString,config);
        console.log(result);
        res.send(result);

    }catch(err){
        console.log(err);
        res.send(err);
    }
})

router.post('/baggagedetails',async(req,res)=>{
    const config = {
        headers: { 'api_key': `${process.env.BAG_TRACKING_API_KEY}`
     }
};
    console.log(process.env.BAG_TRACKING_API_KEY)


    const url=`https://bagjourney.sita.aero/baggage/history/v1.0/tag/${req.body.bagTag}/flightdate/${req.body.date}?pnr=${req.body.pnr}&pax_surname=${req.body.surname}&include_bim=false&airportCode=${req.body.code}`;
    console.log(url);

    try{
        const result= await axios.get(url,config)
        console.log(result.data);
        res.send(result.data)
    }catch(err){
        console.log(err);
        res.send(err);
        
    }
})



module.exports=router;