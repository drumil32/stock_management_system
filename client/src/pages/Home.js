import Stocks from './../components/Stocks';
import React from 'react';

const Home = (props) => {

  return (
    <>
      <Stocks stockData={props.stockData} cookies={props.cookies} handleSetCookie={props.handleSetCookie} userDetails={props.userDetails} setUserDetails={props.setUserDetails} />
    </>
  );
};

export default Home;