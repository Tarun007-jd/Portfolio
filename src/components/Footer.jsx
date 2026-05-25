import { motion } from 'framer-motion'
import { navItems, socialLinks } from '../data/skills'

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#050810] px-6 lg:px-[9%] py-16 flex flex-col items-center gap-6 border-t border-white/6 overflow-hidden">
      {/* Centered top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Ambient gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-cyan-400/2 blur-3xl rounded-full pointer-events-none" />

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[1.8rem] md:text-[2.2rem] font-outfit font-bold text-white"
      >
        Tarun Dharsan R J
      </motion.div>

      {/* Nav Links */}
      <motion.nav
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="flex flex-wrap justify-center gap-2"
        aria-label="Footer navigation"
      >
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            onClick={e => { e.preventDefault(); scrollTo(item.href) }}
            className="px-3 py-1 text-[0.95rem] font-medium font-inter text-white/60 hover:text-cyan-300 transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </motion.nav>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {socialLinks.map(({ icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-md border border-white/8 bg-transparent text-cyan-300 text-base hover:bg-white/6 transition-all duration-200"
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
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[0.95rem] text-white/40 font-inter"
      >
        Built with ❤️ by Tarun Dharsan R J
      </motion.div>
    </footer>
  )
}
