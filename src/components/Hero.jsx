import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Starfield from './Starfield'
import { socialLinks, roles, CV_URL } from '../data/skills'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
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
    <span className="text-cyan-400 font-bold relative">
      {text}
      <span className="typewriter-cursor" />
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-70"
        style={{ animation: 'underlinePulse 2s ease-in-out infinite' }} />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[75vh] flex items-center justify-between gap-8 px-6 lg:px-[9%] pt-24 pb-12 bg-[#050810] overflow-hidden"
    >
      <Starfield />

      {/* Ambient orbs */}
      <div className="absolute top-[10%] left-[-8%] w-[55rem] h-[55rem] rounded-full bg-purple-600/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] w-[45rem] h-[45rem] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[62rem]">
        <motion.h3 {...fadeUp(0)} className="text-sm font-outfit font-medium text-white/50 uppercase tracking-widest mb-2">
          Hello, I am
        </motion.h3>

        <motion.h1
          {...fadeUp(0.2)}
          className="text-[3.6rem] md:text-[4.6rem] lg:text-[5.2rem] font-outfit font-extrabold leading-[1.02] tracking-tight mb-3 text-white"
        >
          Tarun Dharsan R J
        </motion.h1>

        <motion.h3 {...fadeUp(0.4)} className="text-[1.5rem] md:text-[1.9rem] font-outfit font-semibold text-white/80 mb-4">
          And I&apos;m a <Typewriter roles={roles} />
        </motion.h3>

        <motion.p {...fadeUp(0.55)} className="text-[1.05rem] md:text-[1.2rem] leading-7 text-white/60 max-w-2xl mb-6 font-inter">
          Computer Science student skilled in Full-Stack development with a passion for creating visually
          balanced, user-centered websites and reliable Python tooling.
        </motion.p>

        {/* Social icons */}
        <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-3 mb-8">
          {socialLinks.map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -4, scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              className="w-10 h-10 flex items-center justify-center rounded-md border border-white/6 bg-transparent text-cyan-300 text-lg backdrop-blur-sm transition-all duration-200 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              <i className={`bx ${icon}`} />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.75)} className="flex flex-wrap gap-4">
          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 text-[1rem] font-semibold font-inter text-[#050810] rounded-md bg-cyan-400/95 shadow-sm transition-all duration-200"
          >
            <span className="relative z-10">Hire Me</span>
          </motion.a>

          <motion.a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-5 py-3 text-[0.98rem] font-semibold font-inter text-cyan-300 rounded-md border border-white/8 bg-transparent backdrop-blur-sm transition-all duration-200"
          >
            Download CV
          </motion.a>
        </motion.div>
      </div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="relative z-10 shrink-0 hidden md:block"
      >
        <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border border-white/6 bg-[#0d1120]">
          <img
            src="/images/Profile-Picture.jpeg"
            alt="Tarun - Full Stack Developer"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
