import clsx from 'clsx';
import { ReactElement, useContext } from 'react';

import { AppContext } from '../hooks/app-context';
import Navigation from './Navigation';

function LayoutBase({ title, children }: { title?: string; children: ReactElement }) {
  const context = useContext(AppContext);

  return (
    <>
      <header className={clsx('page-content-header', { 'page-content-header--hidden': !context.navOpen })}>
        <Navigation />
      </header>
      <span
        className={clsx('page-nav-toggle', { 'page-nav-toggle--hidden': !context.navOpen })}
        onClick={() => context.setNavOpen(!context.navOpen)}
      >
        ☰
      </span>
      <main
        className={clsx('page-content-main', {
          'page-content-main--expanded': !context.navOpen,
          'page--dark': context.theme === 'Dark',
        })}
      >
        <h1>{title}</h1>
        {children}
      </main>
      <footer className="page-content-footer">
        <span>Copyright © {new Date().getFullYear()} Quantum Anomaly</span>
      </footer>
    </>
  );
}

export default LayoutBase;
