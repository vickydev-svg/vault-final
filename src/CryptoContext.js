import React, { Children, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
const Crypto = createContext();

const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState('USD');
    const [symbol,setSymbol] = useState("$");
    useEffect(()=>{
       if(currency==="INR"){
        setSymbol("₹")
       }
       else if (currency==="USD"){
        setSymbol("$");
       }
       else if (currency==="BTC"){
         setSymbol("BTC");
        }
        else if (currency==="ETH"){
         setSymbol("ETH");
        }
        else if (currency==="LTC"){
         setSymbol("LTC");
        }
        else if (currency==="BCH"){
         setSymbol("BCH");
        }
        else if (currency==="BNB"){
         setSymbol("BNB");
        }
        else if (currency==="EOS"){
         setSymbol("EOS");
        }
        else if (currency==="XPR"){
         setSymbol("XPR");
        }
        else if (currency==="XLM"){
         setSymbol("XLM");
        }
        else if (currency==="LINK"){
         setSymbol("LINK");
        }
        else if (currency==="DOT"){
         setSymbol("DOT");
        }
        else if (currency==="YFI"){
         setSymbol("YFI");
        }
        else if (currency==="AEP"){
         setSymbol("AEP");
        }
        else if (currency==="ARS"){
         setSymbol("ARS");
        }
        else if (currency==="AUD"){
         setSymbol("$");
        }
        else if (currency==="BDT"){
         setSymbol("BDT");
        }
        else if (currency==="BHD"){
         setSymbol(".د.ب");
        }
        else if (currency==="BMD"){
         setSymbol("$");
        }
        else if (currency==="BRL"){
         setSymbol("R$");
        }
        else if (currency==="BAD"){
         setSymbol("BAD");
        }
        else if (currency==="CHF"){
         setSymbol("Fr");
        }
        else if (currency==="CLP"){
         setSymbol("$");
        }
        else if (currency==="CNY"){
         setSymbol("¥");
        }
        else if (currency==="CZK"){
         setSymbol("Kč");
        }
        else if (currency==="DKK"){
         setSymbol("KR");
        }
        else if (currency==="EUR"){
         setSymbol("€");
        }
        else if (currency==="GBP"){
         setSymbol("£");
        }
        else if (currency==="HKD"){
         setSymbol("$");
        }
        else if (currency==="HUF"){
         setSymbol("FT");
        }
        else if (currency==="IDR"){
         setSymbol("RP");
        }
        else if (currency==="ILS"){
         setSymbol("₪");
        }
        else if (currency==="JPY"){
         setSymbol("¥");
        }
        else if (currency==="KRW"){
         setSymbol("₩");
        }
        else if (currency==="KWD"){
         setSymbol("$");
        }
        else if (currency==="LKR"){
         setSymbol("$");
        }
        else if (currency==="MMK"){
         setSymbol("MMK");
        }
        else if (currency==="MXN"){
         setSymbol("$");
        }
        else if (currency==="MYR"){
         setSymbol("RM");
        }
        else if (currency==="NGN"){
         setSymbol("NGN");
        }
        else if (currency==="NOK"){
         setSymbol("KR");
        }
        else if (currency==="NZD"){
         setSymbol("$");
        }
        else if (currency==="PHP"){
         setSymbol("₱");
        }
        else if (currency==="PKR"){
         setSymbol("RS");
        }
        else if (currency==="PLN"){
         setSymbol("zł");
        }
        else if (currency==="RVB"){
         setSymbol("$");
        }
        else if (currency==="SAK"){
         setSymbol("$");
        }
        else if (currency==="SEK"){
         setSymbol("KR");
        }
        else if (currency==="SGD"){
         setSymbol("S$");
        }
        else if (currency==="THB"){
         setSymbol("฿");
        }
        else if (currency==="TRY"){
         setSymbol("₺");
        }
        else if (currency==="TWD"){
         setSymbol("NT$");
        }
        else if (currency==="UAH"){
         setSymbol("UAH");
        }
        else if (currency==="VEF"){
         setSymbol("$");
        }
        else if (currency==="VND"){
         setSymbol("₫");
        }
        else if (currency==="ZAR"){
         setSymbol("R");
        }
        else if (currency==="XDR"){
         setSymbol("$");
        }
        else if (currency==="XAG"){
         setSymbol("$");
        }
        else if (currency==="XAU"){
         setSymbol("$");
        }
        else if (currency==="BITS"){
         setSymbol("BITS");
        }
        else if (currency==="SATS"){
         setSymbol("SATS");
        }
        

    },[currency])
  return (
   <Crypto.Provider value={{currency,symbol,setCurrency}}>
    {children}
   </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () =>{
   return  useContext(Crypto)
}