import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/projects'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
}

export default function FeaturedProject() {
  const [ref, visible] = useReveal()
  const [imgError, setImgError] = useState(false)
  const featured = projects.find(p => p.highlight) || projects[0]

  return (
    <section id="featured-project" className="relative min-h-screen px-6 lg:px-[9%] py-24 bg-[#050810] overflow-hidden flex items-center">
      {/* Top divider */}
      <div className="section-divider" />

      {/* Ambient gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-cyan-400/5 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 w-full max-w-[1200px] mx-auto"
      >
        {/* Section label */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-block px-4 py-2 text-[0.9rem] font-semibold font-inter text-cyan-300 bg-cyan-400/8 border border-cyan-300/20 rounded-full">
            Featured Work
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 variants={item} className="text-[2.4rem] md:text-[3.2rem] font-outfit font-black mb-4 leading-tight">
          My Best <span className="gradient-text-cyan">Project</span>
        </motion.h2>

        <motion.p variants={item} className="text-[1.05rem] text-white/60 mb-12 max-w-2xl">
          A showcase of one of my most polished full-stack projects—built with modern tech, clean architecture, and attention to detail.
        </motion.p>

        {/* Featured card */}
        <motion.div
          variants={item}
          whileHover={{ y: -12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="group relative rounded-2xl overflow-hidden border border-white/6 hover:border-cyan-300/30 shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0d1120]"
        >
          {/* Top gradient border on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

          {/* Image container */}
          <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden bg-[#050810]/80 flex items-center justify-center">
            <img
              src={imgError ? featured.fallback : featured.image}
              alt={featured.title}
              onError={() => setImgError(true)}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1120] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Shine sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 group-hover:left-[200%] transition-all duration-800 ease-out" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 lg:p-14">
            {/* Title with badge */}
            <div className="mb-6">
              <h3 className="text-[1.8rem] md:text-[2.2rem] font-outfit font-bold text-white leading-tight mb-3">
                {featured.title}
              </h3>
              {featured.highlight && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-300/30 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[0.9rem] font-semibold text-cyan-300">Featured Work</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-[1.05rem] leading-8 text-white/70 mb-8 max-w-2xl">
              {featured.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {featured.tags.map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-[0.95rem] font-semibold font-inter text-white/80 bg-white/4 border border-white/8 rounded-lg transition-all duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
              variants={item}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mt-12 text-center"
            >
              <p className="text-[0.95rem] text-white/40 font-inter">Scroll to see more</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
