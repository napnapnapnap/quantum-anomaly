import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setIsDarkMode, setIsNavigationOpen } from '../redux/ui';
import './Navigation.scss';
import navigation from './navigation.json';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, isNavigationOpen } = useAppSelector((state) => state.ui);

  return (
    <nav
      className={clsx('navigation', {
        'navigation--visible': isNavigationOpen,
      })}
    >
      <span className="navigation__mobile" onClick={() => dispatch(setIsNavigationOpen(!isNavigationOpen))} />
      <div className="navigation__title">
        <a href="/">Quantum Anomaly</a>
      </div>
      <ul className="navigation__content">
        {navigation.items.map((item) => (
          <li className="navigation__link" key={item.url}>
            <NavLink to={item.url} title={item.label} onClick={() => dispatch(setIsNavigationOpen(false))}>
              {item.label}
            </NavLink>
          </li>
        ))}
        <li className="navigation__link">
          <a href="#" onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
