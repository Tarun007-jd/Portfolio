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
      className="relative min-h-screen flex items-center justify-between gap-12 px-[9%] pt-28 pb-16 bg-[#050810] overflow-hidden"
    >
      <Starfield />

      {/* Ambient orbs */}
      <div className="absolute top-[10%] left-[-8%] w-[55rem] h-[55rem] rounded-full bg-purple-600/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] w-[45rem] h-[45rem] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[62rem]">
        <motion.h3
          {...fadeUp(0)}
          className="text-[2.4rem] font-outfit font-medium text-white/50 uppercase tracking-[0.1em] mb-2"
        >
          Hello, I am
        </motion.h3>

        <motion.h1
          {...fadeUp(0.2)}
          className="text-[6.4rem] font-outfit font-black leading-[1.08] tracking-tight gradient-text mb-4 text-glow"
        >
          Tarun Dharsan R J
        </motion.h1>

        <motion.h3
          {...fadeUp(0.4)}
          className="text-[2.8rem] font-outfit font-semibold text-white/80 mb-6"
        >
          And I&apos;m a <Typewriter roles={roles} />
        </motion.h3>

        <motion.p
          {...fadeUp(0.55)}
          className="text-[1.7rem] leading-[1.85] text-white/55 max-w-[52rem] mb-8 font-inter"
        >
          Computer Science student skilled in Full-Stack development
          with a passion for creating visually stunning,
          user-friendly websites and Python programming.
        </motion.p>

        {/* Social icons */}
        <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-3 mb-10">
          {socialLinks.map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -6, scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="w-[4.4rem] h-[4.4rem] flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-[2rem] backdrop-blur-sm transition-all duration-300 hover:bg-cyan-400 hover:text-[#050810] hover:border-transparent hover:shadow-[0_0_18px_rgba(0,212,255,0.5)]"
            >
              <i className={`bx ${icon}`} />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.75)} className="flex flex-wrap gap-5">
          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}
            whileHover={{ y: -4, boxShadow: '0 0 40px rgba(0,212,255,0.6)' }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center px-[3.6rem] py-[1.4rem] text-[1.55rem] font-bold font-inter text-[#050810] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_25px_rgba(0,212,255,0.4)] overflow-hidden group"
          >
            <span className="relative z-10">Hire Me</span>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-full" />
            {/* shimmer */}
            <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-700 ease-out" />
          </motion.a>

          <motion.a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, backgroundColor: 'rgba(0,212,255,1)', color: '#050810', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-[3.6rem] py-[1.4rem] text-[1.55rem] font-bold font-inter text-cyan-400 rounded-full border-2 border-cyan-400/50 bg-transparent backdrop-blur-sm transition-all duration-300"
          >
            Download CV
          </motion.a>
        </motion.div>
      </div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 shrink-0 hidden md:block"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-[-24px] rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-2xl animate-pulse-glow" />

        {/* Rotating gradient ring */}
        <div className="absolute inset-[-6px] rounded-full animate-orbit overflow-hidden">
          <div className="w-full h-full rounded-full"
            style={{ background: 'conic-gradient(from 0deg, #00d4ff 0deg, #7c6ef5 120deg, transparent 180deg, #00d4ff 360deg)', opacity: 0.7 }} />
        </div>

        {/* Profile image */}
        <div className="animate-float w-[36vw] h-[36vw] max-w-[420px] max-h-[420px] xl:w-[420px] xl:h-[420px]">
          <img
            src="/images/Profile-Picture.jpeg"
            alt="Tarun - Full Stack Developer"
            className="w-full h-full object-cover rounded-full border-[4px] border-cyan-400/60 animate-pulse-glow bg-[#0d1120]"
          />
        </div>
      </motion.div>
    </section>
  )
}
