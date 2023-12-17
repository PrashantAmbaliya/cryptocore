import React from 'react'
import {Typography,Row,Col,Statistic} from 'antd';
import {Link} from 'react-router-dom';
import CountUp from 'react-countup';
import {useGetCoinsQuery} from '../services/cryptoApi';
import millify from 'millify';
import {Cryptocurrencies ,News,Loader } from './index';


const formatter = (value) => <CountUp end={value} separator="," />;

function Home() {

  const {data,isLoading} = useGetCoinsQuery();
  const stats = data?.data?.stats

  if(isLoading){
    return (<>
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </>)
  }

  return (
    <div className='home'>
      <Typography.Title level={2} className='heading'>Globle Crypto States</Typography.Title>
      <Row gutter={[0, 16]} className='home'>
        <Col span={12}><Statistic title="Totoal Cryptocurrencies" value={stats.total} formatter={formatter}/></Col>
        <Col span={12}><Statistic title="Totoal Exchanges" value={stats.totalExchanges} formatter={formatter}/></Col>
        <Col span={12}><Statistic title="Totoal Market Cap" value={millify(stats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Totoal Total 24h Volume" value={millify(stats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Totoal Markets" value={millify(stats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className='home-title'>Top 10 Cryptocurrencies</Typography.Title>
        <Typography.Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Typography.Title>
      </div>
      <Cryptocurrencies simple={true}/>
      <div className="home-heading-container">
        <Typography.Title level={2} className='home-title'>Crypto News</Typography.Title>
        <Typography.Title level={3} className='show-more'><Link to="/news">Show More</Link></Typography.Title>
      </div>
      <News simple={true}/>
    </div>
  )
}

export default Home