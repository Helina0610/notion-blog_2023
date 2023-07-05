import React from 'react'
import Header from './Header';
import Footer from './Footer';

interface RootLayoutProps{
    children : React.ReactNode;
}

const RootLayout = ({children} : RootLayoutProps) => {
  return (
    <>
        <Header/>
        <main>{children}</main>
        <Footer/>
    </>
  )
}

export default RootLayout