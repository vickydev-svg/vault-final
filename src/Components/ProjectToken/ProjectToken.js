import {
    Alert,
    Avatar,
    Collapse,
    Divider,
    Grid,
    IconButton,
    LinearProgress
  } from '@mui/material';
  import pic from "../../Images/soapbox_btn.svg"
  import { Box } from '@mui/system';
  import axios from 'axios';
  import React from 'react';
  import { useEffect } from 'react';
  import { useState } from 'react';
  import { Link, useParams, useLocation } from 'react-router-dom';
  import {  MenuItem, Select, Toolbar, Typography } from '@mui/material';
  import ProjectCoinInfo from '../ProjectCoinInfo/ProjectCoinInfo';
  import { AiOutlineArrowUp} from 'react-icons/ai';
import {AiFillCaretDown} from 'react-icons/ai';
import {AiOutlineLink} from 'react-icons/ai';
import {IoMdArrowDropup} from 'react-icons/io';
import {BiSearchAlt2} from 'react-icons/bi';
import {HiOutlineExternalLink} from 'react-icons/hi';
import {DiCode} from 'react-icons/di';
import {IoMdContact} from 'react-icons/io';
import logo from "../../Images/megahootvaultLogo.svg"
import HTMLReactParser from 'html-react-parser'
import AppBar from '@mui/material/AppBar';

import {IoMdArrowDropdown} from 'react-icons/io';
  import "./projectToken.css"

  
  function convertToInternationalCurrencySystem(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'b'
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'm'
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'k'
      : Math.abs(Number(labelValue))
      ? Math.abs(Number(labelValue))?.toFixed(2)
      : '0.00';
  }
  export default function ProjectToken({ user }) {
    const {id} = useParams();
    console.log(id)
    const [tokenPage, setTokenPage] = useState();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
      msg: '',
      type: '',
      show: false
    });
  
    const fetchProjectToken = () => {
      setLoading(true);
      axios
        .get(`https://api.pecunovus.net/wallet/get_tokens_project_by_symbol?symbol=${id}`)
        .then((res) => {
            console.log(res)
          setTokenPage(res.data.token[0]);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setAlert({
            msg: 'There was an error',
            type: 'error',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: 'There was an error',
              type: 'error',
              show: false
            });
          }, 3000);
          console?.log(err);
        });
    };
  
    useEffect(() => {
      fetchProjectToken();
    }, []);
   console.log(tokenPage);
    return (
      <>
       <AppBar color='transparent' position="static" className='navbar_crypto' style={{height:"8vh",padding:"10px 10px 0px 10px"}}>
      <div className="nav_content">
     <div className="right_part">
      <img src={logo} alt="" style={{height:"3rem",marginRight:"10px"}}/>
     <img src={tokenPage?.image} alt={tokenPage?.image} style={{width:"40px"}} />
     <span className="crypto_symbol" style={{color:"black"}}>
        {tokenPage?.token_symbol.toUpperCase()}
      </span>
     <span className="crypto_name" style={{color:"darkgray"}}>
        {tokenPage?.token_name}
      </span>
     </div>
     <div className="left_part" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span className="crypto_price" style={{color:"black"}}>
          Price:  $  {tokenPage?.token_price.toFixed(2)}
        </span>
        <div className="crypto_price_change" style={{padding:"5px",background: (tokenPage?.priceChange / (  tokenPage?.token_price))>=0 ? "#13C784":"red",display:"flex",alignItems:"center",borderRadius:"20%"}}>
         {(tokenPage?.priceChange / (  tokenPage?.token_price))>=0 ?  <IoMdArrowDropup/>:<AiFillCaretDown/>}
          {(tokenPage?.priceChange / (  tokenPage?.token_price)).toFixed(2)}
        </div>
      </div>
      </div>
    </AppBar>
     
        <div className='pageWrap'>
      <div className="container">
        <div className="sidebar" >
         <img src={tokenPage?.image} alt={tokenPage?.token_name} height="200" style={{marginBottom:"20px"}} />
         <Typography variant='h3' className='heading'>
              {tokenPage?.token_name}
         </Typography>
         <Typography variant='subtitle1' className='description' style={{color:"black",fontWeight:"light",width:"100%",fontFamily:"Montserrat",padding:"25px 0px 25px 0",paddingBottom:25}}>
              {tokenPage?.token_desc}
         </Typography>
    
         <div className="market_data" style={{width:"100%"}}>
              
    
              <span style={{ display: "flex" }}>
                <Typography variant="h5" className="heading">
                24h Trading Vol
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                    color:"black"
                  }}
                >
                 0.00
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" className="heading">
                7d Trading Vol
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                    color:"black"
                  }}
                >
                  0.00
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" className="heading">
                24h Fees
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                    color:"black"
                  }}
                >
                  0.00
                </Typography>
              </span>
            </div>
        </div>
        
     
       <ProjectCoinInfo coin={{  symbol: id}}/>
       </div>

       {/* <div className='container2'>
            <div className='info'>
               <img src={tokenPage?.image} style={{width:"40px"}}/>
               <span className='symbol'>Symbol: {tokenPage?.token_symbol}</span>
               <span className='name'>Name: {tokenPage?.token_name}</span>
               <span className='description'>
                Description<br></br>
                {tokenPage?.token_desc}
               </span>
               <span className='price'>Price: {tokenPage?.launch_price?.toFixed(2)} USD</span>
               <span className='amount'>Amount: {tokenPage?.amount_issued}</span> 
               <div className='soapbox_btn'>
               <a
                  href={
                    tokenPage?.soapboxLink
                      ? tokenPage.soapboxLink
                      : `https://www.megahoot.net/explore`
                  }
                  target="_blank"
                >
                  <img
                    src={pic}
                    style={{
                      width: '400px',
                      maxWidth: '80%',
                      cursor: 'pointer'
                    }}
                  />
                </a>
               </div>
            </div>
       </div> */}
        <div className="crypto_data">
    
      <div className="crypto_one_info_project">
    <div className="crypto_links">
      <div className="coin_link_info">
        <img src={tokenPage?.image} style={{width:"6%"}} alt="" />
         <span className="coin_link_name" style={{color:"black"}}>{tokenPage?.token_name}</span> 
          <span className="coin_link_symbol" >{tokenPage?.token_symbol.toUpperCase()}</span>
      </div>

      <div className="first_row">
           <span className="coin_org common_link"><a href="https://bitcoin.org/en/" target = "_blank" className='coin_org_link'><AiOutlineLink/> {`${tokenPage?.token_name}`}.org<HiOutlineExternalLink/></a></span>
           <span className="explorers common_link"><BiSearchAlt2/>Explorers<AiFillCaretDown/></span>
           <span className="community common_link"><IoMdContact/>Community<AiFillCaretDown/></span>

      </div>

      <div className="second_row">
  <span className="source_code common_link"><DiCode/>Source Code<HiOutlineExternalLink/></span>
      </div>
    </div>
       <span className="crypto_one_desc">
      <span className="what_is" style={{color:"black" ,fontSize:"2rem"}}>
      What is {tokenPage?.token_name} ({tokenPage?.token_symbol.toUpperCase()}) ?
    <br></br>
      </span>
        <br></br>
        <span className='desc_info'>
          {tokenPage?.token_desc}
        </span>
       </span>
    </div>
   
   <div className="crypto_stats_project" >
         <div className="crypto_title common_stats2" style={{textAlign:"center"}}>
          {tokenPage?.token_symbol.toUpperCase()} Price Statisctics
          <span className='updated_at'>
       
          </span>
         </div>
         <div className="price_today common_stats">
           {tokenPage?.token_name} Price Today 
           <span className="price_text">
           $ &nbsp; {tokenPage?.token_price.toFixed(2)}
           </span>
         </div>
         <div className="stats_price common_stats">
          <span className="stata_price_imp">
            Price Change <span className='24h'>24hr</span>
           
          </span>
          <span className="change_price_text">
            {}
            {tokenPage?.price_change_percentage_24h_in_currency>0  ?<IoMdArrowDropup style={{color:"#13C784"}}/> : <IoMdArrowDropdown style={{color:"red"}}/>}
       <span style={{color: tokenPage?.priceChange/(3*tokenPage?.token_price)>=0 ? "#13C784":"red"}}> {(tokenPage?.priceChange/(3*tokenPage?.token_price)).toFixed(2)}
              %</span>
          </span> 
         </div>
         <div className="24hr_low_high common_stats">
          <span className="24_hr_text">
            24h Trading Vol
          </span>
          <span className="24h_real"style={{color:"#13C784"}} >
          <IoMdArrowDropup style={{color:"#13C784"}}/> 0.00
          </span>
         </div>
         <div className="trading_value common_stats">
         <span className="stata_price_imp">
            7D Trading Volume
          
          </span>
          <span className="change_price" style={{color:"#13C784"}}>
          <IoMdArrowDropup style={{color:"#13C784"}}/> 0.00
          </span>
         </div>
         <div className="volume common_stats">
          <span className="rank">Market Cap Rank</span>
          <span className="rank_text"></span>
         </div>
         <div className="market_cap_text">
             {tokenPage?.token_name} Market Cap
         </div>
         <div className="market_cap common_stats">
         <span className="market_cap_text2"> Market Capital</span>
         <div className="market_cap_not_change">
         
          <span>$ &nbsp; {convertToInternationalCurrencySystem(tokenPage?.token_price * tokenPage?.amount_issued)}</span>
          <span className="change_market_cap"  style={{color: tokenPage?.token_price*tokenPage?.tokenPage?.amount_issued >=0 ? "#13C784":"red"}}>
         
          </span>
         </div>
         </div>

   </div>
    

   </div>
        </div>
        </>
       
    );
  }
  