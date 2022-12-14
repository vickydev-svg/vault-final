
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import CoinPage from './Pages/CoinPage/CoinPage';
import ProjectToken from './Components/ProjectToken/ProjectToken';
import MoreTrending from './Components/MoreTrending/MoreTrending';
import HoldingTokens from './Components/HoldingTokens/HoldingTokens';
function App() {

  return (
    <div className="App">
      {/* <Header/> */}
     <Routes>
     <Route path="/" element={<HomePage />} exact />
     <Route path = "/coins/:id" element={<CoinPage/>}/>
     <Route path = "/trending" element={<MoreTrending />}/>
     <Route
            path="/project-token/:id"
            element={<ProjectToken />}
          />
           <Route
            path="/holding-token/:id"
            element={<HoldingTokens/>}
          />
     </Routes>
    </div>
  );
}

export default App;
