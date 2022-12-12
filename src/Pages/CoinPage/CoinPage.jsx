import React from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../../CryptoContext';
import { useState } from 'react';
import {SingleCoin} from "../../Api/api"
import axios from "axios"
import { useEffect } from 'react';
import CoinInfo from '../../Components/CoinInfo/CoinInfo';
import {  MenuItem, Select, Toolbar, Typography } from '@mui/material';
import {LinearProgress} from '@mui/material'
import AppBar from '@mui/material/AppBar';
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
import "./coinPage.css"
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinPage = () => {
  
  const {id}  = useParams();
 const [coin,setCoin] = useState();
 const {currency,symbol}= CryptoState()
  const fetchCoin =  async () => {
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data);
  }
 console.log(coin)
 useEffect(()=>{
     fetchCoin()
 },[])

 const date_time = coin?.market_data?.last_updated;
 console.log(date_time)
 const date = new Date(date_time)
 useEffect(()=>{
const options = {
  method: 'GET',
  url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
  params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'},
  headers: {
    'X-RapidAPI-Key': '1089d04e79msh1bb5033a4c8b4cfp1199b5jsn8185df5941c4',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

axios.get(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
 },[])
 if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <>
    <AppBar color='transparent' position="static" className='navbar_crypto' style={{height:"8vh",padding:"10px 10px 0px 10px"}}>
      <div className="nav_content">
     <div className="right_part">
      <img src={logo} alt="" style={{height:"3rem",marginRight:"10px"}}/>
     <img src={coin?.image.large} alt={coin?.image.large} style={{width:"40px"}} />
     <span className="crypto_symbol" style={{color:"black"}}>
        {coin?.symbol.toUpperCase()}
      </span>
     <span className="crypto_name" style={{color:"darkgray"}}>
        {coin?.name}
      </span>
     </div>
     <div className="left_part" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span className="crypto_price" style={{color:"black"}}>
          Price:  {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
        </span>
        <div className="crypto_price_change" style={{padding:"5px",background: coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]>=0 ? "#13C784":"red",display:"flex",alignItems:"center",borderRadius:"20%"}}>
         {coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]>=0 ?  <IoMdArrowDropup/>:<AiFillCaretDown/>}
        { `${coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]}`.slice(0,4)
              }%
        </div>
      </div>
      </div>
    </AppBar>
   <div className="container">
    <div className="sidebar" >
     <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom:"20px"}} />
     <Typography variant='h3' className='heading'>
          {coin?.name}
     </Typography>
     <Typography variant='subtitle1' className='description' style={{color:"black",fontWeight:"light",width:"100%",fontFamily:"Montserrat",padding:25,paddingBottom:25}}>
          {coin?.description.en.split(". ")[0]}
     </Typography>

     <div className="market_data">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                color:"black"
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                color:"black"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                color:"black"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
    </div>

      <CoinInfo coin = {coin}/>
   
   </div>
   <div className="crypto_data">
    
    <div className="crypto_one_info">
    <div className="crypto_links">
      <div className="coin_link_info">
        <img src={coin?.image.large} style={{width:"6%"}} alt="" />
         <span className="coin_link_name" style={{color:"black"}}>{coin?.name}</span> 
          <span className="coin_link_symbol" >{coin?.symbol.toUpperCase()}</span>
      </div>

      <div className="first_row">
           <span className="coin_org common_link"><a href="https://bitcoin.org/en/" target = "_blank" className='coin_org_link'><AiOutlineLink/> bitcoin.org<HiOutlineExternalLink/></a></span>
           <span className="explorers common_link"><BiSearchAlt2/>Explorers<AiFillCaretDown/></span>
           <span className="community common_link"><IoMdContact/>Community<AiFillCaretDown/></span>

      </div>

      <div className="second_row">
  <span className="source_code common_link"><DiCode/>Source Code<HiOutlineExternalLink/></span>
      </div>
    </div>
       <span className="crypto_one_desc">
      <span className="what_is" style={{color:"black" ,fontSize:"2rem"}}>
      What is {coin?.name} ({coin?.symbol.toUpperCase()}) ?
    <br></br>
      </span>
        <br></br>
        <span className='desc_info'>
          {HTMLReactParser(coin?.description["bg"])}
        </span>
       </span>
    </div>
   
   <div className="crypto_stats" >
         <div className="crypto_title common_stats2" style={{textAlign:"center"}}>
          {coin?.symbol.toUpperCase()} Price Statisctics
          <span className='updated_at'>
       
          </span>
         </div>
         <div className="price_today common_stats">
           {coin?.name} Price Today 
           <span className="price_text">
            {currency} &nbsp; {coin?.market_data?.current_price[currency.toLowerCase()]}
           </span>
         </div>
         <div className="stats_price common_stats">
          <span className="stata_price_imp">
            Price Change <span className='24h'>24hr</span>
           
          </span>
          <span className="change_price_text">
          {coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]>=0 ?  <IoMdArrowDropup style={{color:"#13C784"}}/>:<AiFillCaretDown style={{color:"red"}}/>}
       <span style={{color: coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]>=0 ? "#13C784":"red"}}> { `${coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]}`.slice(0,4)
              }%</span>
          </span> 
         </div>
         <div className="24hr_low_high common_stats">
          <span className="24_hr_text">
            24h Low/24h high 
          </span>
          <span className="24h_real">
            {coin?.market_data.high_24h[currency.toLowerCase()]} {currency}/{coin?.market_data.low_24h[currency.toLowerCase()]}{currency}
          </span>
         </div>
         <div className="trading_value common_stats">
         <span className="stata_price_imp">
            Trading Value <span className='24h'>24hr</span>
          
          </span>
          <span className="change_price">

          </span>
         </div>
         <div className="volume common_stats">
          <span className="rank">Market Cap Rank</span>
          <span className="rank_text">{coin?.market_cap_rank}</span>
         </div>
         <div className="market_cap_text">
             Bitcoin Market Cap
         </div>
         <div className="market_cap common_stats">
         <span className="market_cap_text2"> Market Capital</span>
         <div className="market_cap_not_change">
         
          <span>{currency} &nbsp; {coin?.market_data.market_cap[currency.toLowerCase()]}</span>
          <span className="change_market_cap"  style={{color: coin?.market_data.market_cap_change_percentage_24h_in_currency[currency.toLowerCase()] >=0 ? "#13C784":"red"}}>
          {coin?.market_data.market_cap_change_percentage_24h_in_currency[currency.toLowerCase()] >=0 ? <IoMdArrowDropup style={{color:"#13C784"}}/>:<AiFillCaretDown style={{color:"red"}}/>  }
          {coin?.market_data.market_cap_change_percentage_24h_in_currency[currency.toLowerCase()]}
          </span>
         </div>
         </div>

   </div>
    

   </div>
   </>
  )
}

export default CoinPage