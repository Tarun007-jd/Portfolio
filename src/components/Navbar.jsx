import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, CV_URL } from '../data/skills'

export default function Navbar() {
  const [activeId, setActiveId] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const onScroll = () => {
      const scrollY = window.scrollY
      let current = ''
      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - window.innerHeight / 3) current = sec.id
      })
      if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
        current = sections[sections.length - 1]?.id || ''
      }
      if (current) setActiveId(current)
      setScrolled(scrollY > 60)
      if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  const handleNavClick = (href) => {
    setActiveId(href.slice(1))
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[#050810]/92 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent backdrop-blur-sm border-b border-white/4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); handleNavClick('#home') }}
          className="font-outfit font-black text-[1.3rem] tracking-tight shrink-0 text-white hover:brightness-110 transition-all duration-200"
        >
          Tarun
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = activeId === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={e => { e.preventDefault(); handleNavClick(item.href) }}
                className={`relative px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  isActive ? 'text-cyan-300' : 'text-white/60 hover:text-cyan-300 hover:bg-white/4'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-300"
                    transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Desktop CV Button */}
        <a
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-white/10 rounded-md backdrop-blur-sm hover:bg-white/6 transition-all duration-200 shrink-0"
        >
          CV
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="lg:hidden p-2 text-white/80 hover:text-cyan-300 hover:bg-white/6 rounded-md transition-all duration-150"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <i className={`bx text-lg ${menuOpen ? 'bx-x' : 'bx-menu'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-[#050810]/96 backdrop-blur-md border-t border-white/8"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={e => { e.preventDefault(); handleNavClick(item.href) }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeId === item.href.slice(1)
                      ? 'text-cyan-300 bg-white/6'
                      : 'text-white/65 hover:text-cyan-300 hover:bg-white/4'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-2.5 text-sm font-semibold text-cyan-300 border border-white/10 rounded-md text-center hover:bg-white/6 transition-all duration-200"
              >
                Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
