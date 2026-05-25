import { motion } from 'framer-motion'
import { navItems, socialLinks } from '../data/skills'

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#050810] px-[9%] py-20 flex flex-col items-center gap-8 border-t border-cyan-400/8 overflow-hidden">
      {/* Centered top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(0,212,255,0.4)]" />

      {/* Ambient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[10rem] bg-cyan-400/4 blur-[60px] rounded-full pointer-events-none" />

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[3rem] font-outfit font-black gradient-text-cyan tracking-tight"
      >
        Tarun Dharsan R J
      </motion.div>

      {/* Nav Links */}
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2"
        aria-label="Footer navigation"
      >
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            onClick={e => { e.preventDefault(); scrollTo(item.href) }}
            className="px-4 py-2 text-[1.45rem] font-medium font-inter text-white/50 hover:text-cyan-400 hover:bg-cyan-400/6 rounded-lg transition-all duration-200"
          >
            {item.label}
          </a>
        ))}
      </motion.nav>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {socialLinks.map(({ icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -6, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="w-[4.8rem] h-[4.8rem] flex items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-400 text-[2.2rem] backdrop-blur-sm hover:bg-cyan-400 hover:text-[#050810] hover:border-transparent hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all duration-300"
          >
            <i className={`bx ${icon}`} />
          </motion.a>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-[1.4rem] text-white/30 font-inter"
      >
        Built with ❤️ by Tarun Dharsan R J
      </motion.div>
    </footer>
  )
}
