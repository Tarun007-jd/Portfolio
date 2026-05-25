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
    <section id="about" className="relative px-6 lg:px-12 py-20 md:py-28 bg-[#050810] overflow-hidden">
      {/* Divider */}
      <div className="section-divider" />

      {/* Ambient gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-cyan-400/3 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Heading */}
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-outfit font-black mb-3 tracking-tight">
          About <span className="gradient-text-cyan">Me</span>
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-lg md:text-xl font-outfit font-semibold text-white/70 mb-6">
          Full Stack Developer &amp; Problem Solver
        </motion.h3>

        <motion.p variants={fadeUp} className="text-base md:text-lg leading-8 text-white/65 mb-4">
          I build fast, scalable web apps with clean, maintainable code. I enjoy turning ideas into products and improving UX with data-driven decisions.
        </motion.p>
        <motion.p variants={fadeUp} className="text-base md:text-lg leading-8 text-white/65 mb-10">
          Recently, I&apos;ve focused on API design, React Native for mobile, and performance optimization across the stack.
        </motion.p>

        {/* Highlights */}
        <motion.ul variants={container} className="grid gap-2 md:gap-3 mb-12">
          {aboutHighlights.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              whileHover={{ x: 6 }}
              className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 glass rounded-lg text-[0.98rem] md:text-[1.05rem] text-white/70 border border-white/6 hover:border-cyan-300/20 transition-all duration-200"
            >
              <span className="text-cyan-400 text-[1.2rem]">→</span>
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* Info cards */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aboutInfo.map(({ label, value }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass rounded-lg p-5 md:p-6 text-center border border-white/6 transition-all duration-200 group"
            >
              <h4 className="text-[1.05rem] font-outfit font-semibold text-cyan-300 mb-2">{label}</h4>
              <p className="text-[0.95rem] text-white/60 leading-snug">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
