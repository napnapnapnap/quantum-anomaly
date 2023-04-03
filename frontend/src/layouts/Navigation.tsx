import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../hooks/app-context';
import useWindowSize from '../hooks/window-size';
import './Navigation.scss';
import navigation from './navigation.json';

const Navigation = () => {
  const context = useContext(AppContext);
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  const isLargeScreen = !(isMobile || isTablet || isDesktop);

  useEffect(() => {
    if (!isLargeScreen) context.setNavOpen(false);
  }, []);

  return (
    <>
      <nav className="navigation">
        <div className="navigation__title">
          <a href="/">Quantum Anomaly</a>
        </div>
        <ul className="navigation__content">
          {navigation.items.map((group) => (
            <li key={group.label} className="navigation__group">
              {group.label}
              <ul className="navigation__content-nested">
                {group.items.map((item) => (
                  <li
                    className="navigation__link"
                    key={item.url}
                    onClick={() => {
                      if (!isLargeScreen) context.setNavOpen(false);
                    }}
                  >
                    <NavLink to={item.url} title={item.label}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <ul>
          <li className="navigation__link">
            <button
              className="link"
              onClick={() => {
                context.setTheme(context.theme === 'Dark' ? 'Light' : 'Dark');
                if (!isLargeScreen) context.setNavOpen(false);
              }}
            >
              {context.theme === 'Dark' ? 'Light' : 'Dark'} mode
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
