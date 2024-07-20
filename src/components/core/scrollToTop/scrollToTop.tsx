import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}

export const ScrollToTop: React.FC<IProps> = (props: IProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};
