import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <FeaturedProject />
        <Projects />
        <Skills />
        <About />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
