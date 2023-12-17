import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Input } from "antd"
import { Link } from 'react-router-dom';
import { useGetCoinsQuery } from '../services/cryptoApi';
import millify from 'millify';
import Loader from './Loader';

function Cryptocurrency({ simple }) {
  const coinCount = simple ? 10 : 100;
  const { data, isLoading } = useGetCoinsQuery(coinCount);
  const [coins, setCoins] = useState([]);
  const [coinsSearch, setCoinsSearch] = useState('');

  useEffect(() => {

    const filtredCoins = data?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(coinsSearch))

    if (data?.data?.coins) {
      setCoins(filtredCoins);
    }
  }, [data, coinsSearch]);

  if (isLoading) {
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
    <>
      {!simple && (<div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={(e) => setCoinsSearch(e.target.value)} />
      </div>)}
      <Row gutter={[24, 24]} className='home'>
        {coins?.map((coin) => (
          <Col xs={24} sm={12} lg={6} key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={coin.name}
                extra={<img className='crypto-image' src={coin.iconUrl} alt='crypto' />}
                hoverable
              >
                <p>Price: ${millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>
                  Daily Change:&nbsp;
                  <span style={{ color: coin.change.startsWith('-') ? 'red' : 'green' }}>
                    {millify(coin.change)}%
                  </span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>

  )
}

export default Cryptocurrency