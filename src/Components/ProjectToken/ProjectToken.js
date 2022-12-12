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
  import "./projectToken.css"
//   import BuyToken from '../components/Modal/BuyToken';
//   import GetAppIcon from '@mui/icons-material/GetApp';
//   import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
//   import url from '../serverUrl';
//   import Transactions from '../components/Tables/Transactions';
//   import TokenGraph from '../components/Graphs/TokenGraph.js';
//   import soapbox_btn from '../assets/images/soapbox_btn.svg';
//   import BuyProjectToken from '../components/Modal/BuyProjectToken';
//   import { ArrowDownward } from '@mui/icons-material';
//   import CoinInfo from '../components/coinInfo/coinInfo';
  
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

       <div className='container2'>
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
       </div>
        </div>
       
    );
  }
  