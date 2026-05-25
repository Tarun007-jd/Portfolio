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
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="group flex flex-col bg-[#0d1120] rounded-xl overflow-hidden border border-white/6 hover:border-cyan-300/20 shadow-sm hover:shadow-lg transition-all duration-400 relative"
    >
      {/* Top gradient border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Shine sweep */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[2rem]">
        <div className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12 group-hover:left-[200%] transition-all duration-700 ease-out" />
      </div>

      {/* Image */}
      <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden bg-[#050810]/80 flex items-center justify-center p-4">
        <img
          src={imgError ? project.fallback : project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1120]/60 opacity-0 group-hover:opacity-80 transition-opacity duration-400" />
      </div>

      {/* Info */}
      <div className="p-8 flex flex-col gap-4 flex-1">
        <h3 className="text-[1.6rem] md:text-[1.8rem] font-outfit font-bold text-white tracking-tight leading-tight">
          {project.title}
          {project.highlight && (
            <span className="ml-3 text-[1.1rem] px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-cyan-400 font-semibold align-middle">
              Featured
            </span>
          )}
        </h3>
        <p className="text-[1rem] leading-7 text-white/60 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-3">
          {project.tags.map(tag => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.04, y: -2 }}
              className="px-3 py-1 text-[0.9rem] font-medium font-inter text-white/80 bg-white/3 border border-white/6 rounded-full cursor-default transition-all duration-200"
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
