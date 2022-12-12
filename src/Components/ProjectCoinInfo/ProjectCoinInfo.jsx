import axios from 'axios';
import { useEffect, useState } from 'react';
import { HistoricalChart } from './api';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';

import { chartDays } from './chartDays';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import CustomButtons from '../Buttons/CustomButtons';
import "./projectCoinInfo.css"
import back from "../../Images/pictureCenter.svg"
ChartJS.register(...registerables);

const ProjectCoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const symbol = coin?.symbol;
  const [days, setDays] = useState(1);
  const currency = 'USD';
  const [flag, setflag] = useState(false);

  const getChatData = (target) => {
    setHistoricData([]);
    axios
      .get(`https://api.pecunovus.net/wallet/get_change_token_${target}?symbol=${symbol}`)
      .then((res) => {
        setflag(true);
        res.data.forEach((e) => {
          setHistoricData((old) => [...old, e]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchHistoricData = async () => {
    if (coin && coin.id) {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      console.log(data);
      setflag(true);
      setHistoricData(data.prices);
    }
  };

  useEffect(() => {
    if (coin && coin.id) {
      fetchHistoricData();
    } else {
      getChatData('hourly');
    }
  }, [symbol]);

  useEffect(() => {
    if (coin && coin.id) {
      fetchHistoricData();
    }
  }, [days]);

  const updateChart = (value) => {
    if (value == 1) {
      getChatData('hourly');
    } else if (value == 30) {
      getChatData('monthly');
    } else if (value == 90) {
      getChatData('quaterly');
    } else if (value == 365) {
      getChatData('yearly');
    }
  };

  return (
    <div className='chart_container' >
      
        
          {coin?.id ? (
            <>
              <img src={back} className="back_image" alt="" />
              {' '}
              <Line
                data={{
                  labels: historicData?.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicData?.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: '#EEBC1D'
                    }
                  ]
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1
                    }
                  }
                }}
              />
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'space-around',
                  width: '100%'
                }}
              >
                {chartDays?.map((day) => (
                  <button
                    className="header-link chart-button"
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      setflag(false);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
            <img src={back} className="back_image" alt="" />
              {' '}
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    return coin?.chart_date;
                  }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin.Price),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: '#005373',
                      backgroundColor: '#005373',
                    }
                  ]
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1
                    }
                  }
                }}
              />
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'space-around',
                  width: '100%'
                }}
              >
                {chartDays?.map((day) => (
                  <CustomButtons key={day.value}
                  onClick={() => {
                    if (coin.id) {
                      setDays(day.value);
                      setflag(false);
                    } else {
                      setDays(day.value);
                      setflag(false);
                      updateChart(day.value);
                    }
                  }}
                  selected={day.value === days}> {day.label}</CustomButtons>
                  // <button
                    
                  //   key={day.value}
                  //   onClick={() => {
                  //     if (coin.id) {
                  //       setDays(day.value);
                  //       setflag(false);
                  //     } else {
                  //       setDays(day.value);
                  //       setflag(false);
                  //       updateChart(day.value);
                  //     }
                  //   }}
                  //   selected={day.value === days}
                    
                  // >
                  //   {day.label}
                  // </button>
                ))}
              </div>
            </>
          )}
        
      
    </div>
  );
};

export default ProjectCoinInfo;

