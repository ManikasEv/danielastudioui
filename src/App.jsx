import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import JourneyMap from './components/JourneyMap'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import { LanguageProvider } from './i18n/LanguageContext'
import Hero from './components/sections/Hero'
import Property from './components/sections/Property'
import Commercial from './components/sections/Commercial'
import Websites from './components/sections/Websites'
import Portfolio from './components/sections/Portfolio'
import Packages from './components/sections/Packages'
import Partners from './components/sections/Partners'
import Method from './components/sections/Method'
import Contact from './components/sections/Contact'
import TicketPage from './pages/TicketPage'

function HomePage() {
  return (
    <SmoothScroll>
      <Nav />
      <JourneyMap />
      <main className="min-w-0 overflow-x-hidden">
        <Hero />
        <Property />
        <Commercial />
        <Websites />
        <Portfolio />
        <Packages />
        <Partners />
        <Method />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ticket" element={<TicketPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
