import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { education } from '../data/education'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}
const cardVariant = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

export default function Education() {
  const [ref, visible] = useReveal()

  return (
    <section id="education" className="relative min-h-screen px-[9%] py-[10rem] bg-[#0a0d1a]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-[90rem] mx-auto"
      >
        <motion.h2 variants={cardVariant} className="text-[4.8rem] font-outfit font-black text-center mb-16 tracking-tight">
          <span className="gradient-text-cyan">Education</span>
        </motion.h2>

        <div className="flex flex-col gap-6">
          {education.map(edu => (
            <motion.article
              key={edu.id}
              variants={cardVariant}
              whileHover={{ x: 6 }}
              className="glass rounded-2xl p-10 border border-cyan-400/10 hover:border-cyan-400/30 hover:shadow-[0_12px_40px_rgba(0,212,255,0.1)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl bg-gradient-to-b from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="mb-3">
                <h3 className="text-[2rem] font-outfit font-bold text-white tracking-tight leading-snug mb-1">
                  {edu.institution}
                </h3>
                <h4 className="text-[1.6rem] font-semibold text-cyan-400">{edu.degree}</h4>
              </div>

              <div className="flex flex-wrap gap-3 mb-5">
                <span className="inline-flex items-center px-4 py-1.5 text-[1.3rem] font-semibold font-inter text-purple-300 bg-purple-500/10 border border-purple-500/25 rounded-full">
                  {edu.years}
                </span>
                <span className="inline-flex items-center px-4 py-1.5 text-[1.3rem] font-semibold font-inter text-purple-300 bg-purple-500/10 border border-purple-500/25 rounded-full">
                  {edu.grade}
                </span>
              </div>

              <p className="text-[1.5rem] leading-[1.8] text-white/55">{edu.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
