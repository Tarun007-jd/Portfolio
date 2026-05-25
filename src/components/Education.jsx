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
    <section id="education" className="relative px-6 lg:px-[9%] py-20 md:py-24 bg-[#0a0d1a]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.h2 variants={cardVariant} className="text-[2.4rem] md:text-[3.2rem] font-outfit font-black mb-12 tracking-tight">
          <span className="gradient-text-cyan">Education</span>
        </motion.h2>

        <div className="flex flex-col gap-4">
          {education.map(edu => (
            <motion.article
              key={edu.id}
              variants={cardVariant}
              whileHover={{ x: 4 }}
              className="glass rounded-lg p-6 md:p-8 border border-white/6 transition-all duration-200 group relative"
            >
              <div className="mb-3">
                <h3 className="text-[1.1rem] md:text-[1.3rem] font-outfit font-semibold text-white tracking-tight leading-snug mb-1">
                  {edu.institution}
                </h3>
                <h4 className="text-[1.05rem] font-medium text-cyan-300">{edu.degree}</h4>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 text-[0.9rem] font-semibold font-inter text-purple-300 bg-purple-500/8 border border-purple-400/20 rounded-full">
                  {edu.years}
                </span>
                <span className="inline-flex items-center px-3 py-1 text-[0.9rem] font-semibold font-inter text-purple-300 bg-purple-500/8 border border-purple-400/20 rounded-full">
                  {edu.grade}
                </span>
              </div>

              <p className="text-[0.95rem] md:text-[1rem] leading-7 text-white/60">{edu.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
