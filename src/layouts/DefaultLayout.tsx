import React, { ReactNode } from 'react';
import Header from 'src/layouts/Header';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
