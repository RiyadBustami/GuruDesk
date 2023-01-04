import React from 'react'
import AppAppBar from '../views/AppAppBar'
import AppFooter from '../views/AppFooter'
import AboutUs from '../views/AboutUs'
import withRoot from '../withRoot'
import Header from '../views/Header'
import HowItWorks from '../views/HowItWork'

const LandingPage = () => {
    return (
        <React.Fragment>
            <AppAppBar/>
            <Header/>
            <HowItWorks/>
            <AboutUs/>
            <AppFooter/>
        </React.Fragment>
    )
}

export default withRoot(LandingPage)