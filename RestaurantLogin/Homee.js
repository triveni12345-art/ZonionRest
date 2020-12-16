
import React from 'react';
import homepg from './homepg.jpg'

function Home() {
  return (
    <div style={{backgroundImage:`url(${homepg})`,height:"500px",width:"100%"}}>
    <h1 style={{color:"#39e600"}}><b>Welcome to the Zonions</b></h1>  
    </div>
  );
}

export default Home;
