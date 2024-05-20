/** @format */

import { useEffect, useState } from 'react';
import style from '../css/Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavOn, setIsNavOn] = useState(false);

  const toggleNav = () => {
    setIsNavOn(!isNavOn);
  };

  const closeNav = () => {
    setIsNavOn(false);
  };

  useEffect(() => {
    if (isNavOn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNavOn]);

  return (
    <header className={`${style.hd} mw`}>
      <h1>
        <Link onClick={closeNav} to="/">
          <img src="/img/logo.svg" alt="로고" />
        </Link>
      </h1>
      <nav className={isNavOn ? `${style.on}` : ``}>
        <div className={`${style.gnb}`}>
          <Link onClick={closeNav} to="/shopall">
            Shop
          </Link>
          <Link onClick={closeNav} to="#">
            Blog
          </Link>
          <Link onClick={closeNav} to="/Company">
            Our Stroy
          </Link>
        </div>
        <div className={`${style.person}`}>
          <Link onClick={closeNav} to="#">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
          <Link onClick={closeNav} to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <Link onClick={closeNav} to="#">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </nav>
      <button className={`${style.ham}`} onClick={toggleNav}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </header>
  );
};

export default Header;
