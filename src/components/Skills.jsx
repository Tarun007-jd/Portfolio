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
    <section id="skills" className="relative min-h-screen px-[9%] py-[10rem] bg-[#050810]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-[110rem] mx-auto"
      >
        <motion.h2 variants={item} className="text-[4.8rem] font-outfit font-black text-center mb-16 tracking-tight">
          My <span className="gradient-text-cyan">Skills</span>
        </motion.h2>

        {/* Skill Categories */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {skillCategories.map(cat => (
            <motion.div
              key={cat.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 border border-cyan-400/10 hover:border-cyan-400/35 hover:shadow-[0_15px_40px_rgba(0,212,255,0.12)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-[2rem] font-outfit font-bold text-cyan-400 mb-6 tracking-tight">{cat.title}</h3>
              <motion.div variants={container} className="flex flex-wrap gap-3">
                {cat.skills.map(skill => (
                  <motion.span
                    key={skill}
                    variants={tagItem}
                    whileHover={{ y: -3, scale: 1.06 }}
                    className="px-5 py-2 text-[1.35rem] font-medium font-inter text-white/80 bg-cyan-400/6 border border-cyan-400/20 rounded-full cursor-default transition-all duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 hover:text-[#050810] hover:border-transparent hover:font-semibold hover:shadow-[0_4px_16px_rgba(0,212,255,0.35)]"
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
              whileHover={{ y: -8 }}
              className="glass rounded-[2.4rem] p-12 border border-cyan-400/10 hover:border-cyan-400/35 hover:shadow-[0_20px_50px_rgba(0,212,255,0.12)] transition-all duration-400 text-center group relative overflow-hidden"
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Conic sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.4rem] overflow-hidden">
                <div className="absolute inset-0"
                  style={{ background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,212,255,0.05) 60deg, rgba(124,110,245,0.05) 120deg, transparent 180deg)' }} />
              </div>

              <motion.i
                whileHover={{ scale: 1.2, rotateY: 180 }}
                transition={{ duration: 0.5 }}
                className={`bx ${box.icon} text-[5.5rem] block mb-6 gradient-text-cyan drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] relative z-10`}
              />
              <h3 className="text-[2.4rem] font-outfit font-bold mb-4 relative z-10">{box.title}</h3>
              <p className="text-[1.55rem] leading-[1.85] text-white/55 relative z-10">{box.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
