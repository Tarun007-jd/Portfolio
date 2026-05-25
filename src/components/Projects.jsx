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
      <div className="relative h-48 md:h-56 overflow-hidden bg-[#050810]/80 flex items-center justify-center">
        <img
          src={imgError ? project.fallback : project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1120]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-lg md:text-xl font-outfit font-bold text-white tracking-tight leading-tight">
          {project.title}
          {project.highlight && (
            <span className="ml-2 text-xs px-2 py-1 bg-cyan-400/10 border border-cyan-300/30 rounded-full text-cyan-300 font-semibold inline-block align-middle">
              Featured
            </span>
          )}
        </h3>
        <p className="text-sm md:text-base leading-6 text-white/65 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map(tag => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.03 }}
              className="px-2 py-1 text-xs md:text-sm font-medium font-inter text-white/70 bg-white/4 border border-white/8 rounded-md transition-all duration-200"
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
  // Filter out featured projects - only show regular projects
  const otherProjects = projects.filter(p => !p.highlight)

  return (
    <section id="projects" className="relative px-6 lg:px-12 py-20 md:py-28 bg-[#050810]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section header */}
        <motion.div variants={card} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-outfit font-black leading-tight mb-3">
            Other <span className="gradient-text-cyan">Projects</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl">
            A collection of diverse projects showcasing different technical skills and problem-solving approaches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {otherProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
