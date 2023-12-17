import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import { Loader } from './index';

function News({ simple }) {
  const { data, isLoading } = useGetCryptoNewsQuery();
  const [News, setNews] = useState();

  useEffect(() => {
    if (data?.data) {
      setNews(data?.data);
    }
  }, [data])
  
  const displayedNews = simple ? News?.slice(0, 12) : News;
  
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
    <div className="home">
      {!simple && (
        <Col span={24}>
          <Typography.Title level={1}>Latest Crypto News</Typography.Title>
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {displayedNews?.map((news) => (
          <Col xs={24} sm={12} lg={6} key={news.link}>
            <a href={news.link}>
              <Card
                hoverable
                cover={<img alt="example" src={news.photo_url} style={{ objectFit: 'cover', height: '150px' }} />}
              >
                <Typography.Title level={5}>{news.title}</Typography.Title>
                <div className='provider-container'>
                  <Avatar src={news.source_favicon_url} />
                  <Typography.Text style={{ marginTop: 'auto', marginBottom: 'auto' }}>{moment(news.published_datetime_utc).fromNow()}</Typography.Text>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News