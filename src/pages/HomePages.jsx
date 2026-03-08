import React from 'react'
import NavbarCompenents from '../components/NavbarCompenents'
import HeroComponents from '../components/HeroComponents'
import ProblemsectionComponents from '../components/ProblemsectionComponents'
import FeatureSectionComponents from '../components/FeatureSectionComponents'
import BenafitTargetsectionComponents from '../components/BenafitTargetsectionComponents'
import CtaComponents from '../components/CtaComponents'
import FooterComponents from '../components/FooterComponents'
const HomePages = () => {
  return (
    <div>
    <NavbarCompenents/>
    <HeroComponents/>
    <ProblemsectionComponents/>
    <FeatureSectionComponents/>
    <BenafitTargetsectionComponents/>
    <CtaComponents/>
    <FooterComponents/>
    </div>
  )
}

export default HomePages
