import './App.css';
import { Routes , Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Cryptocurrencies, News, Homepage,CryptoDetails } from './components/index';


function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/cryptocurrencies' element={<Cryptocurrencies/>} />
            <Route exact path='/exchanges' element={<Exchanges/>} />
            <Route exact path='/news' element={<News/>} />
            <Route exact path='/crypto/:coinUuid' element={<CryptoDetails/>} />
          </Routes>
        </Layout>
      
      <div className="footer">
        <Typography.Title level={5} style={{color: "white", textAlign: "center"}}>
            CryptoCore <br />
            All rightes reserved
        </Typography.Title>
        <Space className='text-[#71acff] hovor:text-[#FFF]'>
          <Link  theme="light" to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
      </div>
    </div>
  )
}

export default App;
