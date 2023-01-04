import React from 'react'
import AppAppBar from '../views/AppAppBar'
import AppFooter from '../views/AppFooter'
import ProductHero from '../views/ProductHero'
import ProductHowItWorks from '../views/ProductHowItWork'
import ProductValues from '../views/ProductValues'
import withRoot from '../withRoot'

const LandingPage = () => {
    return (
        <React.Fragment>
            <AppAppBar/>
            <ProductHero/>
            <ProductHowItWorks/>
            <ProductValues/>
            <AppFooter/>
        </React.Fragment>
    )
}

export default withRoot(LandingPage)