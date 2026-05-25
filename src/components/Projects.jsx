import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/projects'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -14 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group flex flex-col bg-[#0d1120] rounded-[2rem] overflow-hidden border border-cyan-400/10 hover:border-cyan-400/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(0,212,255,0.18),0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 relative"
    >
      {/* Top gradient border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Shine sweep */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[2rem]">
        <div className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12 group-hover:left-[200%] transition-all duration-700 ease-out" />
      </div>

      {/* Image */}
      <div className="relative h-[32rem] overflow-hidden bg-[#050810]/80 flex items-center justify-center p-6">
        <img
          src={imgError ? project.fallback : project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-600 group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1120]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {/* Info */}
      <div className="p-8 flex flex-col gap-4 flex-1">
        <h3 className="text-[2.4rem] font-outfit font-bold text-white tracking-tight leading-tight">
          {project.title}
          {project.highlight && (
            <span className="ml-3 text-[1.1rem] px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-cyan-400 font-semibold align-middle">
              Featured
            </span>
          )}
        </h3>
        <p className="text-[1.6rem] leading-[1.85] text-white/55 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-3 pt-1">
          {project.tags.map(tag => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-2 text-[1.3rem] font-semibold font-inter text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full cursor-default transition-all duration-200 hover:bg-purple-500/80 hover:text-white hover:border-transparent"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, visible] = useReveal()

  return (
    <section id="projects" className="relative min-h-screen px-[9%] py-[10rem] bg-[#0a0d1a]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-[130rem] mx-auto"
      >
        <motion.h2 variants={card} className="text-[4.8rem] font-outfit font-black text-center mb-16 tracking-tight">
          Featured <span className="gradient-text-cyan">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
