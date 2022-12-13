import React from 'react'
import { useState } from 'react'
import "./coinTable.css"
import { CoinList } from '../../Api/api'
import { CryptoState } from '../../CryptoContext'
import axios from 'axios'
import { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, LinearProgress, Pagination, TableContainer, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import { ChangingPrice } from '../../Api/api'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { HistoricalChart } from '../../Api/api'
import CoinInfo from "../CoinInfo/CoinInfo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HootDex from '../Hootdex/HootDex'
import {AiFillCaretDown} from 'react-icons/ai';
import {BiUpArrow} from 'react-icons/bi';
import {IoMdArrowDropup} from 'react-icons/io';
import {IoMdArrowDropdown} from 'react-icons/io';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
const CoinTable = () => {
    const navigate = useNavigate()
    const {currency,symbol} = CryptoState()
    // const [changeCoin,setCoinChange] = useState([]);
    const [coins,setCoins] = useState([]);
    const [loading,setLoading]= useState(true);
    const [tokenlLoading,setTokenLoading] = useState(false)
    const [search,setSearch] = useState("");
    const [page,setPage]=useState(1);
    // new
    const [historicalData,setHistoricalData] = useState();
    const [days,setDays] = useState(1);
    const [volume,setVolume] = useState([])
    const [coinToken,setCoinToken] =  useState([])

  const fetchCoins = async () => {
      setCoins([])
     
      const { data } = await axios.get(CoinList(currency));
    const wrapToken = await axios.get(`https://api.pecunovus.net/wallet/get_all_tokens_wrap_new`)
    const projectToken = await axios.get(`https://api.pecunovus.net/hootdex/all-project-token`)
    const holdingToken = await axios.get('https://api.pecunovus.net/wallet/get_all_tokens_holding')
  
   
    wrapToken.data.tokens.forEach((token) => {
      setCoins((prev) => [...prev, {
        ...token, market_cap: token.currentPrice * token.amount, image: token.logo,
        current_price: token.currentPrice,
        price_change_percentage_24h_in_currency: ((token.currentPrice - token.firstPrice) /
          token.currentPrice) * 100,
        price_change_percentage_1h_in_currency:((token.currentPrice - token.firstPrice) /
        (3 * token.currentPrice)) *
      100
    
      
      }]);
    })
  
    projectToken.data.data.forEach((token) => {
     
      setCoins((prev) => [...prev,
        {
          ...token, market_cap: token.token_price * token.amount_issued,
          name: token.token_name, symbol: token.token_symbol,
          current_price: token.token_price,
        price_change_percentage_24h_in_currency: (token.priceChange / (3 * token.token_price)),
        price_change_percentage_1h_in_currency:(token.priceChange / (  token.token_price))
    
      
      }]);
    })

    holdingToken.data.tokens.forEach((token) => {
     
      setCoins((prev) => [...prev,
        {
          ...token, market_cap: token.token_price * token.amount_issued,
          name: token.token_name, symbol: token.token_symbol,
          current_price: token.token_price,
          price_change_percentage_24h_in_currency: (token.priceChange / (3 * token.token_price)),
          price_change_percentage_1h_in_currency:(token.priceChange / (  token.token_price))
      
    
      
      }]);
    })
    setCoins((prev)=>[...prev,...data]);
   
    setLoading(false);
    

        
    }

  //   const fetchHistoricData= async () =>{
      
  //     const {data} = await axios.get(HistoricalChart(coins.id,days,currency))
    
  //     setHistoricalData(data.prices);
      
      
  // }
  

    useEffect(()=>{
    fetchCoins();
        
    }, [])
  
  useEffect(()=>{coins.sort((a,b)=>a.market_cap>b.market_cap? -1 : 1)},[ loading])
 

  
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

    
 
    const darkTheme = createTheme({

        palette: {
          primary:{
            main:"#fff"
          },
          mode:"dark"
        },
      });

      const handleSearch = () =>{
        return coins.filter((coin)=>(
            coin?.name?.toLowerCase().includes(search) || coin?.symbol?.toLowerCase().includes(search)
        ))
      }
    
      console.log(coins)
  // useEffect(() => {
  //   coins.sort((a,b)=>a.market_cap-b.market_cap)
  // },[coins])

  return (
    
       <Container style={{textAlign:"center"}}>
            <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat",color:"#005373"}}>
             Cryptocurrencies Prices By Market Cap
            </Typography>
            <TextField label="Search For A Crypto Currency.." variant='outlined' style={{marginBottom:20,width:"100%"}} onChange={(e)=>setSearch(e.target.value)}/>
       <TableContainer>
        {
            loading ? (
                <LinearProgress style={{backgroundColor:"gold"}}/>
            ):(
                <Table>
                 <TableHead style={{backgroundColor:"#005373"}}>
                    <TableRow>
                        {["Coin","Price","1h%","24h%","Market Cap"].map((head)=>(
                            <TableCell style={{color:"white",fontWeight:"700",fontFamily:"Montserrat",width:"5%"}} key={head} >
                               {head}
                            </TableCell>
                        ))}
                    </TableRow>

                 </TableHead>
                 <TableBody>

                    {handleSearch().slice((page-1)*10,(page-1) * 10+10).map((row)=>{
                        const profit = row?.price_change_percentage_24h > 0;
                       
                        return (
                            <TableRow
                        
                            onClick={() => {
                             
                              row?.symbol[0] === 'X' ?
                                navigate(`/wrap-token/${row.symbol}`) :
                                row.symbol[row.symbol.length - 1] === 'x' ?
                                  navigate(`/project-token/${row.token_symbol}`) :
                                  row.symbol[row.symbol.length - 1] === 'h' ?
                                    navigate(`holding-token/${row.token_symbol}`) :
                                    navigate(`/coins/${row.id}`)
                             
                            }}
                            
                            
                            className="row"
                            key={row.name}
                            style={{cursor:"pointer",marginBottom:"20 !important"}}
                            >
                              <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                                <img src={row?.image} alt={row?.name} height="20" style={{marginBottom:10}} />
                                <div
                            style={{ display: "flex", flexDirection: "column"}}
                          >
                            <span
                              style={{
                                textTransform:  row?.symbol[0]==='X'|| row.symbol[row.symbol.length-1]==='x' ||row.symbol[row.symbol.length-1]==='h'?"":  "uppercase",
                                fontSize: 22,
                                color:"black"
                              }}
                            >
                                  {
                                    row?.symbol[0]==='X'?  row?.symbol[0]?.toLowerCase()+row.symbol.slice(1):row.symbol[row.symbol.length-1]==='x'?  row?.symbol:row.symbol[row.symbol.length-1]==='h'? row?.symbol:  row?.symbol
                            
                                    }
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row?.name}
                            </span>
                          </div>
                          {/*  */}
                              </TableCell>
                              <TableCell align="right" style={{color:"black",width:"15%"}}>
                          <div className="price" style={{display:"flex"}}>
                                {symbol}{(row?.current_price?.toFixed(2))}
                          </div>
                          
                        </TableCell>
                        {/*  */}
                        <TableCell
                          align="right"
                          style={{
                            color: row?.price_change_percentage_1h_in_currency >0 ? "#13C784" : "red",
                            fontWeight: 500,
                            width:"10%"
                          }}
                        >
                          {/* {profit && "+"} */}
                           <div className="symbol_text">
                           <div className="picture" style={{width:"14%"}}>
                          {row?.price_change_percentage_1h_in_currency >0  ?<IoMdArrowDropup style={{color:"#13C784"}}/> : <IoMdArrowDropdown style={{color:"red"}}/>}
                          </div>
                           <div className="price_content" style={{width:"83%"}}>
                           {row?.price_change_percentage_1h_in_currency?.toFixed(2)}%
                           </div>
                           
                           </div>
                          
                        </TableCell>
                        {/*  */}
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            width:"10%"
                          }}
                        >

                          <div className="symbol_text" >
                          <div className="picture" style={{width:"14%"}}>
                          {row?.price_change_percentage_24h_in_currency>0  ?<IoMdArrowDropup style={{color:"#13C784"}}/> : <IoMdArrowDropdown style={{color:"red"}}/>}
                          </div>
                           <div className="price_content" style={{width:"83%"}}>
                           {row?.price_change_percentage_24h_in_currency?.toFixed(2)}%
                           </div>
                           
                           </div>
                          {/* {profit && "+"} */}
                          
                        </TableCell>
                        
                       
                      
                        <TableCell align="right" style={{color:"black",width:"10%"}}>
                              {symbol}{" "}
                              {convertToInternationalCurrencySystem( row?.market_cap)}
                         
                        
                        </TableCell>
                        
                            </TableRow>
                        )
                    })}
                    
                
                 </TableBody>
                </Table>
            )
        }
        
       </TableContainer>

       

      <Pagination 
       count={(handleSearch()?.length/10).toFixed(0)}
       
       className="pagination"
       variant="outlined"
       color="secondary"
       onChange={(_,value)=>{
        setPage(value);
        window.scroll(0,450)
       }}
      />

       </Container>

    
  )
}

export default CoinTable
