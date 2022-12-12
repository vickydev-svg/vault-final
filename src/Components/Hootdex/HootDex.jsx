import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import { ChangingPrice } from '../../Api/api'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableContainer } from '@mui/material';
import {AiFillCaretDown} from 'react-icons/ai';
import {IoMdArrowDropup} from 'react-icons/io';
import { LinearProgress, Pagination,TextField, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import "./hootDex.css"
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const removeDuplicatedToken = (allData) => {
    for (let i = 0; i < allData.length; i++) {
      for (let j = i + 1; j < allData.length; j++) {
        if (allData[i].symbol == allData[j].symbol) {
          allData[i].wrapAmount = allData[j].wrapAmount + allData[i].wrapAmount;
          allData[i].initialFinal =
            allData[j].initialFinal + allData[i].initialFinal;
          allData = allData.filter((e) => e !== allData[j]);
        }
      }
    }
  
    for (let i = 0; i < allData.length; i++) {
      for (let j = i + 1; j < allData.length; j++) {
        if (allData[i].symbol == allData[j].symbol) {
          return removeDuplicatedToken(allData);
        }
      }
    }
  
    return allData;
  };
  function convertToInternationalCurrencySystem(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(labelValue))
      ? Math.abs(Number(labelValue))?.toFixed(2)
      : '0.00';
  }
  
const HootDex = () => {
  const navigate = useNavigate()
    const [tokens, setTokens] = useState([]);
    const [loading,setLoading]= useState(false);
    const [projectToken,setProjectToken] = useState([])
    const [holdingToken,setHoldingToken] = useState([]);
    const [pecu,setPecu] = useState([])
    const [pecuMarket,setPecuMarket] = useState([]);
    const fetchProject = async () =>{
      const {data} = await axios.get('https://api.pecunovus.net/hootdex/all-project-token')
      setProjectToken(data);
    }
    const fetchHolding = async () =>{
      const {data} = await axios.get('https://api.pecunovus.net/wallet/get_all_tokens_holding')
      setHoldingToken(data);
    }
    
    const fetchPecu = async () =>{
      const {data} = await axios.get('https://api.pecunovus.net/wallet/get_change_index_coin')
      setPecu(data);
    }

    const fetchMarket = async () =>{
      const {data} = await axios.get('https://api.pecunovus.net/wallet/marketcap')
      setPecuMarket(data);
    }

    console.log(pecuMarket);
    console.log(pecu);
    
    console.log(holdingToken);
    useEffect(() => {
        setLoading(true);
        axios
          .get(`https://api.pecunovus.net/wallet/get_all_tokens_wrap`)
          .then((res) => {
            if (res.data.status) {
              setTokens(removeDuplicatedToken(res.data.tokens));
            }
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
        
      },[]);
      useEffect(()=>{
        fetchProject()
      },[])
      useEffect(()=>{
       fetchHolding()
      },[])
      useEffect(()=>{
        fetchPecu();
       },[])
       useEffect(()=>{
        fetchMarket();
       },[])
      console.log(holdingToken?.tokens)
      console.log(projectToken?.data);
      console.log(tokens)
      
  
  return (
   <>

{
    loading ? (
        <LinearProgress style={{backgroundColor:"gold"}}/>
    ):(
        <>
        
        
           
           <TableRow className = "row" style={{cursor:"pointer",marginBottom:"20 !important"}}>
           <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                        <img src='https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico' height="20" style={{marginBottom:10}} />
                        <div
                     style={{ display: "flex", flexDirection: "column",fontSize:"22px"}}
                   >
                     <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color:"black"
                              }}
                            >
                            PECU
                            </span>
                            <span style={{ color: "darkgrey" ,fontSize:"15px"}}>
                            Pecu Novus
                            </span>
                  
                   </div>
               
                      </TableCell>
                      <TableCell align="right" style={{color:"black",width:"15%"}}>
                  <div className="price" style={{display:"flex"}}>
                  ${pecu?.today_value}
                  </div>
                  
                </TableCell>
                {/*  */}
                <TableCell
                  align="right"
                  style={{
                    color: pecu?.value > 0 ? "#13C784" : "red",
                    fontWeight: 500,
                    width:"10%"
                  }}
                >
                  {/* {profit && "+"} */}
                   <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {pecu.value > 0 ? <IoMdArrowDropup style={{color:"#13C784"}}/>:<AiFillCaretDown style={{color:"red"}}/>}
                  </div>
                   <div className="price_content" style={{width:"83%"}}>
                   {pecu?.value}
                    %
                   </div>
                   
                   </div>
                   
                  
                </TableCell>
                {/*  */}
                <TableCell
                  align="right"
                  style={{
                    color: pecu.value > 0 ? "#13C784" : "red",
                    fontWeight: 500,
                    width:"10%"
                  }}
                >

                  
                  <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {pecu.value >0 ? <IoMdArrowDropup style={{color:"#13C784"}}/>:<AiFillCaretDown style={{color:"red"}}/>}
                  </div>
                   <div className="price_content" style={{width:"83%"}}>
                   {pecu?.value} %
                   </div>
                   
                   </div>
                </TableCell>
                
                <TableCell
                  align="right"
                  style={{
                    color: "black",
                    
                    width:"10%"
                  }}
                >
        
         {/* {each.wrapAmount * each.initialFinal} */}${' '}
         {/* {convertToInternationalCurrencySystem(
                      (pecuMarket?.MARKET_CAP).toFixed(2)
                    )} */}
                    {convertToInternationalCurrencySystem(
                      (pecuMarket?.MARKET_CAP)
                    )}
                   
     {}
                </TableCell>
           </TableRow>

           {/*  */}
           {/*  */}
           {/*  */}
           {/*  */}
           {/*  */}
            {tokens.map((row)=>{
                const profit = row.price_change_percentage_24h > 0;
                console.log()
                return (
                    <TableRow
                    className="row"
                    key={row.name}
                    style={{cursor:"pointer",marginBottom:"20 !important"}}
                    >
                      <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                        <img src={row?.image} alt={row?.name} height="20" style={{marginBottom:10}} />
                        <div
                    style={{ display: "flex", flexDirection: "column",fontSize:"22px"}}
                  >
                    
                     {row.symbol}
                  </div>
                  {/*  */}
                      </TableCell>
                      <TableCell align="right" style={{color:"black",width:"15%"}}>
                  <div className="price" style={{display:"flex"}}>
                  ${' '}
                    {convertToInternationalCurrencySystem(
                      (row.initialFinal / row.wrapAmount).toFixed(2)
                    )}
                  </div>
                  
                </TableCell>
                {/*  */}
                <TableCell
                  align="right"
                  style={{
                    color: profit > 0 ? "#13C784" : "red",
                    fontWeight: 500,
                    width:"10%"
                  }}
                >
                  {/* {profit && "+"} */}
                   <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {profit ? <IoMdArrowDropup style={{color:"#13C784"}}/>:<AiFillCaretDown style={{color:"red"}}/>}
                  </div>
                   <div className="price_content" style={{width:"83%"}}>
                   {(
                      (Math.abs(row.initialFinal - row.firstPrice) /
                        row.wrapAmount /
                        row.initialFinal) *
                      100
                    ).toFixed(2)}{' '}
                    %
                   </div>
                   
                   </div>
                   
                  
                </TableCell>
                {/*  */}
                <TableCell
                  align="right"
                  style={{
                    color: profit > 0 ? "#13C784" : "red",
                    fontWeight: 500,
                    width:"10%"
                  }}
                >

                  {/* <div className="symbol_text" >
                  <div className="picture" style={{width:"14%"}}>
                  {profit ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"green"}}><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"red"}}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>}
                  </div>
                   <div className="price_content" style={{width:"83%"}}>
                   {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                   </div>
                   
                   </div>
                 */}
                  <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {profit ? <IoMdArrowDropup style={{color:"#13C784"}}/>:<AiFillCaretDown style={{color:"red"}}/>}
                  </div>
                   <div className="price_content" style={{width:"83%"}}>
                   {convertToInternationalCurrencySystem(
                      (row?.firstPrice - row?.currentPrice) * row.amount
                    )}
                   </div>
                   
                   </div>
                </TableCell>
                
                <TableCell
                  align="right"
                  style={{
                    color: "black",
                    
                    width:"10%"
                  }}
                >
        
         {/* {each.wrapAmount * each.initialFinal} */}${' '}
         {convertToInternationalCurrencySystem(row?.initialFinal)}
                </TableCell>
                {/*  */}
               
                
                    </TableRow>
                )
            })}

            {projectToken?.data?.map((each,index)=>{
                 return (
                  <TableRow
                  key={index}
                  style={{cursor:"pointer",marginBottom:"20 !important"}}
                  onClick={()=>navigate(`/project-token/${each?.token_symbol}`)}
                  className="row"
                  >
                   
                    <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                    <img src={each?.image} alt={each?.name} height="20" style={{marginBottom:10}} />
                    <div
                     style={{ display: "flex", flexDirection: "column",fontSize:"22px"}}
                   >
                     
                     <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color:"black"
                              }}
                            >
                            {each.token_symbol}
                            </span>
                            <span style={{ color: "darkgrey" ,fontSize:"15px"}}>
                            {`${each?.token_name}`}
                            </span>
                  
                   </div>
                   
                   
                    </TableCell>
                    <TableCell align="right" style={{color:"black",width:"15%"}}>
                  <div className="price" style={{display:"flex"}}>
                  $ {(each?.token_price).toFixed(2)}
                  </div>
                  
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    
                    fontWeight: 500,
                    width:"10%"
                  }}
                >
                                     
                  {/* {profit && "+"} */}
                   <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {each.priceChange > 0 ? (
                       <IoMdArrowDropup style={{color:"#13C784"}}/>
                    ) : each.priceChange < 0 ? (
                      <AiFillCaretDown style={{color:"red"}}/>
                    ) : (
                      <IoMdArrowDropup style={{color:"#13C784"}}/>
                    )}
                  </div>
                   <div className="price_content" style={{width:"83%",color: each.priceChange >= 0? "#13C784":"red"} }>
                   {(each.priceChange / each.token_price).toFixed(2)} %
                   </div>
                   
                   </div>
                   
                  
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                   
                    fontWeight: 500,
                    width:"10%"
                  }}
                >

                  {/* <div className="symbol_text" >
                  <div className="picture" style={{width:"14%"}}>
                  {profit ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"green"}}><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"red"}}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>}
                  </div>
                   <div className="price_content" style={{width:"83%"}}>
                   {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                   </div>
                   
                   </div>
                 */}
                   <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {each.priceChange > 0 ? (
                       <IoMdArrowDropup style={{color:"#13C784"}}/>
                    ) : each.priceChange < 0 ? (
                      <AiFillCaretDown style={{color:"red"}}/>
                    ) : (
                      <IoMdArrowDropup style={{color:"#13C784"}}/>
                    )}
                  </div>
                   <div className="price_content" style={{width:"83%",color:each.priceChange >= 0? "#13C784":"red"}}>
                   {(each.priceChange / each.token_price).toFixed(2)} %
                   </div>
                   
                   </div>
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color: "black",
                    
                    width:"10%"
                  }}
                >
        {/* {each.wrapAmount * each.initialFinal} */}
        ${' '}
                    {convertToInternationalCurrencySystem(
                      each.token_price * each.amount_issued
                    )}
                </TableCell>
           
                  </TableRow>
                 )
                 
            
            })}
            
            {holdingToken?.tokens?.map((each,index)=>{
              each.symbol = each.token_symbol;
              each.tokenName = each.token_name;
                 return (
                  <TableRow
                  key={index}
                  style={{cursor:"pointer",marginBottom:"20 !important"}}
                  >
                    <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                    <img src={each?.image} alt={each?.name} height="20" style={{marginBottom:10}} />
                    <div
                     style={{ display: "flex", flexDirection: "column",fontSize:"22px"}}
                   >
                     
                     <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color:"black"
                              }}
                            >
                             {each.token_symbol}
                            </span>
                            <span style={{ color: "darkgrey" ,fontSize:"15px"}}>
                            {`${each?.token_name}`}
                            </span>
                  
                   
                   </div>
                  
                    </TableCell>
                    <TableCell align="right" style={{color:"black",width:"15%"}}>
                  <div className="price" style={{display:"flex"}}>
                  $ {(each?.token_price).toFixed(2)}
                  </div>
                  
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    
                    fontWeight: 500,
                    width:"10%"
                  }}
                >
                  {/* {profit && "+"} */}
                   <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {each.priceChange > 0 ? (
                       <IoMdArrowDropup style={{color:"#13C784"}}/>
                    ) : each.priceChange < 0 ? (
                      <AiFillCaretDown style={{color:"red"}}/>
                    ) : (
                      <IoMdArrowDropup style={{color:"#13C784"}}/>
                    )}
                  </div>
                   <div className="price_content" style={{width:"83%",color:each.priceChange >= 0? "#13C784":"red"}}>
                   {(each.priceChange / each.token_price).toFixed(2)} %
                   </div>
                   
                   </div>
                   
                  
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                   
                    fontWeight: 500,
                    width:"10%"
                  }}
                >

                  {/* <div className="symbol_text" >
                  <div className="picture" style={{width:"14%"}}>
                  {profit ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"green"}}><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"red"}}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>}
                  </div>
                   <div className="price_content" style={{width:"83%"}}>
                   {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                   </div>
                   
                   </div>
                 */}
                   <div className="symbol_text">
                   <div className="picture" style={{width:"14%"}}>
                   {each.priceChange > 0 ? (
                       <IoMdArrowDropup style={{color:"#13C784"}}/>
                    ) : each.priceChange < 0 ? (
                      <AiFillCaretDown style={{color:"red"}}/>
                    ) : (
                      <IoMdArrowDropup style={{color:"#13C784"}}/>
                    )}
                  </div>
                   <div className="price_content" style={{width:"83%",color:each.priceChange >= 0? "#13C784":"red"}}>
                   {(each.priceChange / each.token_price).toFixed(2)} %
                   </div>
                   
                   </div>
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color: "black",
                    
                    width:"10%"
                  }}
                >
        {/* {each.wrapAmount * each.initialFinal} */}
        ${' '}
                    {convertToInternationalCurrencySystem(
                      each.token_price * each.amount_issued
                    )}
                </TableCell>
                  </TableRow>
                 )
                 
            
            })}
            
      
        </>
    )
}







</>
  )
}

export default HootDex