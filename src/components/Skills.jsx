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
    <section id="skills" className="relative min-h-screen px-6 md:px-[9%] py-24 bg-[#050810]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-[110rem] mx-auto"
      >
        <motion.h2 variants={item} className="text-[2.8rem] md:text-[3.6rem] font-outfit font-black text-center mb-12 tracking-tight">
          My <span className="gradient-text-cyan">Skills</span>
        </motion.h2>

        {/* Skill Categories */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {skillCategories.map(cat => (
            <motion.div
              key={cat.id}
              variants={item}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 border border-white/6 transition-all duration-200 group relative"
            >
              <h3 className="text-[1.1rem] md:text-[1.25rem] font-outfit font-semibold text-cyan-300 mb-4 tracking-tight">{cat.title}</h3>
              <motion.div variants={container} className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <motion.span
                    key={skill}
                    variants={tagItem}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="px-3 py-1 text-[0.95rem] font-medium font-inter text-white/80 bg-white/3 border border-white/6 rounded-full cursor-default transition-all duration-150"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Boxes */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillBoxes.map(box => (
            <motion.div
              key={box.id}
              variants={item}
              whileHover={{ y: -6 }}
              className="glass rounded-lg p-6 border border-white/6 transition-all duration-200 text-center group relative overflow-hidden"
            >
              <motion.i
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.35 }}
                className={`bx ${box.icon} text-[2.4rem] md:text-[3rem] block mb-4 text-cyan-300 relative z-10`}
              />
              <h3 className="text-[1.15rem] md:text-[1.4rem] font-outfit font-semibold mb-2 relative z-10">{box.title}</h3>
              <p className="text-[0.98rem] leading-7 text-white/60 relative z-10">{box.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
