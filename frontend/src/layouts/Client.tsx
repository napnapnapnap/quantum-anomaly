import clsx from "clsx";
import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setIsNavigationOpen } from "../redux/ui";
import Navigation from "./Navigation";

function LayoutClient({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.ui);

  return (
    <>
      <header className="page-content-header">
        <Navigation />
      </header>
      <main className={clsx("page-content-main", { "dark-mode": isDarkMode })}
            onClick={() => dispatch(setIsNavigationOpen(false))}>
        {children}
      </main>
      <footer className="page-content-footer" onClick={() => dispatch(setIsNavigationOpen(false))}>
        Copyright © {new Date().getFullYear()} Quantum Anomaly
      </footer>
    </>
  );
}

export default LayoutClient;
