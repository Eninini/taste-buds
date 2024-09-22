import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <nav className="navbar fixed-top navbar-expand-lg" style={{ backgroundColor: '#800000' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ color: 'white' }} to="/">RecipeApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ color: '#DBE2E9' }}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" style={{ color: '#DBE2E9' }} aria-current="page" to="/">All Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#DBE2E9' }} to="/main-course">Main Course</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#DBE2E9' }} to="/desserts">Dessert</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#DBE2E9' }} to="/starters">Starters</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;