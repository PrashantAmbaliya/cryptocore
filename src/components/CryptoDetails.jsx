import { useState } from "react"
import HTMLReactParser from 'html-react-parser';
import { useGetCoinDetailsQuery,useGetCoinHistoryQuery } from "../services/cryptoApi"
import { useParams } from "react-router-dom";
import millify from 'millify';
import { Col, Row, Typography, Select, } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Linechart, Loader } from './';

const { Title, Text } = Typography;
const { Option } = Select;


function CryptoDetails() {
  const { coinUuid } = useParams()
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isLoading } = useGetCoinDetailsQuery(coinUuid);
  const { data : coinHistory } = useGetCoinHistoryQuery({coinUuid,timeperiod});
  const cryptoDetails = data?.data?.coin;


  if (isLoading) {
    return <Loader />
  }

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


  return (
    <Col className="coin-detail-container">

      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol})
        </Title>
      </Col>
      <Select
        defaultValue={'7d'}
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((item) => (<Option key={item}>{item}</Option>))}
      </Select>

      <Linechart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>

      <Col className="stats-container">

        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="conin-details">
              {cryptoDetails.name} Value Statistics
            </Title>
          </Col>
          {stats.map(({ icon, value, title }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="conin-details">
              {cryptoDetails.name} Other Statistics
            </Title>
          </Col>
          {genericStats.map(({ icon, value, title }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Col className="coin-links">
          <Row className="coin-desc">
            <Title className="coin-details-heading" level={3}>
              What is {cryptoDetails.name}
            </Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Row>
          <Title className="coin-details-heading" level={3}>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title className="link-name" level={5}>
                {link.type}
              </Title>
              <a href={link.url}>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>

    </Col>
  )
}

export default CryptoDetails