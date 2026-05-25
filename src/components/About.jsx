import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { aboutHighlights, aboutInfo } from '../data/skills'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

export default function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="relative min-h-screen px-[9%] py-[10rem] bg-[#0a0d1a] overflow-hidden">
      {/* Divider */}
      <div className="section-divider" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.06) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-[90rem] mx-auto"
      >
        {/* Heading */}
        <motion.h2 variants={fadeUp} className="text-[4.8rem] font-outfit font-black text-center mb-14 tracking-tight leading-none">
          About <span className="gradient-text-cyan">Me</span>
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-[2.4rem] font-outfit font-semibold text-center text-white/60 mb-6 tracking-wide">
          Full Stack Developer &amp; Problem Solver
        </motion.h3>

        <motion.p variants={fadeUp} className="text-[1.65rem] leading-[1.85] text-white/55 text-center mb-5">
          I build fast, scalable web apps with clean, maintainable code. I enjoy turning ideas into products and improving UX with data-driven decisions.
        </motion.p>
        <motion.p variants={fadeUp} className="text-[1.65rem] leading-[1.85] text-white/55 text-center mb-10">
          Recently, I&apos;ve focused on API design, React Native for mobile, and performance optimization across the stack.
        </motion.p>

        {/* Highlights */}
        <motion.ul variants={container} className="max-w-[80rem] mx-auto grid gap-3 mb-14">
          {aboutHighlights.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              whileHover={{ x: 8 }}
              className="flex items-center gap-4 px-7 py-5 glass rounded-2xl text-[1.6rem] text-white/65 border border-cyan-400/10 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-300 cursor-default"
            >
              <span className="text-cyan-400 text-[1.8rem] drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]">✦</span>
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* Info cards */}
        <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[90rem] mx-auto">
          {aboutInfo.map(({ label, value }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8, borderColor: 'rgba(0,212,255,0.4)' }}
              className="glass rounded-2xl p-10 text-center border border-cyan-400/10 hover:shadow-[0_15px_40px_rgba(0,212,255,0.12)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h4 className="text-[2rem] font-outfit font-bold text-cyan-400 mb-3">{label}</h4>
              <p className="text-[1.55rem] text-white/60 leading-snug">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
