import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { PageHead } from './PageHead';

interface RootLayoutProps{
    children : React.ReactNode;
}

const RootLayout = ({children} : RootLayoutProps) => {
  return (
    <>
        <PageHead/>
        <Header />
        <main>{children}</main>
        <Footer/>
    </>
  )
}

export default RootLayout