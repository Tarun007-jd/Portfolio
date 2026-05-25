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
    <section id="featured-project" className="relative px-6 lg:px-12 py-16 md:py-28 bg-[#0a0d1a] overflow-hidden">
      <div className="section-divider" />

      {/* Ambient gradient */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-l from-cyan-400/4 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        {/* Section header */}
        <motion.div variants={item} className="mb-8 md:mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold font-inter text-cyan-300 bg-cyan-400/8 border border-cyan-300/20 rounded-full mb-4">
            Featured Project
          </span>
          <h2 className="text-3xl md:text-4xl font-outfit font-black leading-tight mb-3">
            My Best <span className="gradient-text-cyan">Work</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl">
            A premium project showcasing my full-stack expertise, modern tech stack, and attention to detail.
          </p>
        </motion.div>

        {/* Featured card */}
        <motion.div
          variants={item}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="group relative rounded-xl overflow-hidden border border-white/8 hover:border-cyan-300/30 shadow-md hover:shadow-xl transition-all duration-400 bg-[#0d1120]"
        >
          {/* Top gradient line on hover */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

          {/* Image container */}
          <div className="relative h-64 md:h-80 overflow-hidden bg-[#050810]/80 flex items-center justify-center">
            <img
              src={imgError ? featured.fallback : featured.image}
              alt={featured.title}
              onError={() => setImgError(true)}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1120] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title with badge */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl md:text-2xl font-outfit font-bold text-white">
                  {featured.title}
                </h3>
                {featured.highlight && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-400/10 border border-cyan-300/30 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                    <span className="text-[0.75rem] font-semibold text-cyan-300">Featured</span>
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-white/70 mb-6 max-w-2xl">
              {featured.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {featured.tags.map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.04 }}
                  className="px-3 py-1 text-sm font-medium font-inter text-white/70 bg-white/4 border border-white/10 rounded-full transition-all duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
