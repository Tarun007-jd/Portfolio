import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Starfield from './Starfield'
import { socialLinks, roles, CV_URL } from '../data/skills'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
})

function Typewriter({ roles }) {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const word = roles[roleIdx]
    let delay = deleting ? 45 : 80
    if (!deleting && charIdx === word.length) delay = 1400
    if (deleting && charIdx === 0) delay = 350

    const timer = setTimeout(() => {
      if (!deleting && charIdx === word.length) {
        setDeleting(true)
      } else if (deleting && charIdx === 0) {
        setDeleting(false)
        setRoleIdx(i => (i + 1) % roles.length)
      } else {
        const next = charIdx + (deleting ? -1 : 1)
        setCharIdx(next)
        setText(word.slice(0, next))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, roleIdx, roles])

  return (
    <span className="text-cyan-300 font-bold relative">
      {text}
      <span className="typewriter-cursor" />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative px-6 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28 bg-[#050810] overflow-hidden"
    >
      <Starfield />

      {/* Ambient gradient background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-cyan-400/3 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Hero grid container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left column - Text content */}
          <div className="flex flex-col justify-center">
            <motion.div {...fadeUp(0)} className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold font-inter text-white/60 bg-white/5 border border-white/10 rounded-full">
                Full Stack Developer
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black leading-tight mb-4 text-white"
            >
              Tarun Dharsan R J
            </motion.h1>

            <motion.h2 {...fadeUp(0.2)} className="text-lg md:text-xl font-outfit font-semibold text-white/80 mb-6">
              I'm a <Typewriter roles={roles} />
            </motion.h2>

            <motion.p {...fadeUp(0.3)} className="text-base md:text-lg leading-relaxed text-white/70 mb-8 max-w-lg">
              Computer Science student skilled in Full-Stack development with a passion for creating visually
              balanced, user-centered websites and reliable Python tooling.
            </motion.p>

            {/* Social icons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-white/8 bg-white/3 text-cyan-300 text-base hover:bg-white/8 transition-all duration-200"
                >
                  <i className={`bx ${icon}`} />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3">
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 text-sm font-semibold font-inter text-[#050810] rounded-md bg-cyan-400/95 transition-all duration-200"
              >
                Hire Me
              </motion.a>

              <motion.a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 text-sm font-semibold font-inter text-cyan-300 rounded-md border border-white/10 bg-white/3 hover:bg-white/6 transition-all duration-200"
              >
                Download CV
              </motion.a>
            </motion.div>
          </div>

          {/* Right column - Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Subtle background frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-2xl blur-2xl" />
              
              {/* Profile image container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d1120]">
                <img
                  src="/images/Profile-Picture.jpeg"
                  alt="Tarun - Full Stack Developer"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
