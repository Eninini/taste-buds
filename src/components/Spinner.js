import React, { Component } from 'react'
import loading from './Rolling-1.2s-96px.gif'
const Spinner =()=> {
  
    return (
      <div className="text-center">
        <img src={loading} alt="loading" />
      </div>
    )
  
}

export default Spinner