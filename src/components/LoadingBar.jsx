import React from 'react';

const LoadingBar = ({ loading }) => {
  return loading ? <div className="loading-bar">Loading...</div> : null;
};

export default LoadingBar;