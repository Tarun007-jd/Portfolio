import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { skillCategories, skillBoxes } from '../data/skills'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}
const tagItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

export default function Skills() {
  const [ref, visible] = useReveal()

  return (
    <section id="skills" className="relative px-6 lg:px-12 py-20 md:py-28 bg-[#0a0d1a]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-outfit font-black mb-3 tracking-tight">
          My <span className="gradient-text-cyan">Skills</span>
        </motion.h2>

        <motion.p variants={item} className="text-base md:text-lg text-white/60 mb-12">
          A comprehensive set of technologies and tools I use daily for modern web development.
        </motion.p>

        {/* Skill Categories */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {skillCategories.map(cat => (
            <motion.div
              key={cat.id}
              variants={item}
              whileHover={{ y: -2 }}
              className="glass rounded-lg p-5 border border-white/6 transition-all duration-150 group"
            >
              <h3 className="text-[1rem] md:text-[1.1rem] font-outfit font-semibold text-cyan-300 mb-3 tracking-tight">{cat.title}</h3>
              <motion.div variants={container} className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <motion.span
                    key={skill}
                    variants={tagItem}
                    whileHover={{ y: -2, scale: 1.03 }}
                    className="px-3 py-1 text-[0.9rem] font-medium font-inter text-white/75 bg-white/2 border border-white/6 rounded-full cursor-default transition-all duration-150"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Boxes */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillBoxes.map(box => (
            <motion.div
              key={box.id}
              variants={item}
              whileHover={{ y: -4 }}
              className="glass rounded-lg p-5 md:p-6 border border-white/6 transition-all duration-200 text-center group"
            >
              <motion.i
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className={`bx ${box.icon} text-[2rem] md:text-[2.4rem] block mb-3 text-cyan-300 relative z-10`}
              />
              <h3 className="text-[1rem] md:text-[1.15rem] font-outfit font-semibold mb-2 relative z-10">{box.title}</h3>
              <p className="text-[0.95rem] leading-6 text-white/60 relative z-10">{box.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
