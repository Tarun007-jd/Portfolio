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
          ? 'bg-[#050810]/90 backdrop-blur-2xl border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#050810]/60 backdrop-blur-xl border-b border-cyan-500/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-[9%] py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); handleNavClick('#home') }}
          className="gradient-text-cyan font-outfit font-black text-[2rem] tracking-tight shrink-0 hover:brightness-125 transition-all duration-300"
        >
          Tarun Dharsan R J
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
                className={`relative px-4 py-2 text-[1.4rem] font-medium rounded-lg transition-all duration-300 ${
                  isActive ? 'text-cyan-400' : 'text-white/60 hover:text-cyan-400 hover:bg-cyan-400/6'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
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
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-[1.35rem] font-semibold text-cyan-400 border border-cyan-400/40 rounded-full backdrop-blur-sm hover:bg-cyan-400 hover:text-[#050810] hover:border-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] shrink-0"
        >
          Download CV
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="lg:hidden p-2 text-white/80 hover:text-cyan-400 hover:bg-cyan-400/8 rounded-lg transition-all duration-200"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <i className={`bx text-[2.8rem] ${menuOpen ? 'bx-x' : 'bx-menu'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-[#050810]/96 backdrop-blur-2xl border-t border-cyan-500/10"
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
                  className={`px-4 py-3 text-[1.6rem] font-medium rounded-lg transition-all duration-200 ${
                    activeId === item.href.slice(1)
                      ? 'text-cyan-400 bg-cyan-400/8'
                      : 'text-white/65 hover:text-cyan-400 hover:bg-cyan-400/6'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 text-[1.55rem] font-semibold text-cyan-400 border border-cyan-400/30 rounded-lg text-center hover:bg-cyan-400 hover:text-[#050810] transition-all duration-200"
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
