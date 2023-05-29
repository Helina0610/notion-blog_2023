import React from 'react'
import Header from './Header';

interface RootLayoutProps{
    children : React.ReactNode;
}

const RootLayout = ({children} : RootLayoutProps) => {
  return (
    <>
        <Header/>
        <main>{children}</main>
        <div>footer</div>
    </>
  )
}

export default RootLayout