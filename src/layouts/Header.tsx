import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <br />
      <Link to='/users'>Users</Link>
    </div>
  );
};

export default Header;
