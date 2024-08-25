import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeItem';
import LoadingBar from './components/LoadingBar';
import axios from 'axios';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<RecipeList setProgress={setProgress} apiKey={process.env.REACT_APP_NEWS_API_KEY} key="general" query="all"  />} />
          <Route exact path="/main course" element={<RecipeList setProgress={setProgress} apiKey={process.env.REACT_APP_NEWS_API_KEY} key="mainCourse" query="main course" />} />
          <Route exact path="/dessert" element={<RecipeList setProgress={setProgress} apiKey={process.env.REACT_APP_NEWS_API_KEY} key="dessert"  query="dessert" />} />
          <Route exact path="/starters" element={<RecipeList setProgress={setProgress} apiKey={process.env.REACT_APP_NEWS_API_KEY} key="starters"  query="starters" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

