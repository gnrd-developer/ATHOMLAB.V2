import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../client/components/header'
import Footer from '../client/components/Footer'
function Auth() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Auth