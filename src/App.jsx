import Nav from './components/Nav'
import JourneyMap from './components/JourneyMap'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import { LanguageProvider } from './i18n/LanguageContext'
import Hero from './components/sections/Hero'
import Property from './components/sections/Property'
import Commercial from './components/sections/Commercial'
import Websites from './components/sections/Websites'
import Method from './components/sections/Method'
import Contact from './components/sections/Contact'

function App() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Nav />
        <JourneyMap />
        <main>
          <Hero />
          <Property />
          <Commercial />
          <Websites />
          <Method />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </LanguageProvider>
  )
}

export default App
