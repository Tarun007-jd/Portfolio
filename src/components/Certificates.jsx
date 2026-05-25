import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { certificates } from '../data/certificates'
import ImageModal from './ImageModal'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function Certificates() {
  const [ref, visible] = useReveal()
  const [showAll, setShowAll] = useState(false)
  const [modal, setModal] = useState(null)

  const visible_certs = certificates.filter(c => !c.hidden)
  const hidden_certs = certificates.filter(c => c.hidden)
  const displayed = showAll ? certificates : visible_certs

  // ESC to close modal
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <section id="certificates" className="relative px-6 lg:px-12 py-20 md:py-28 bg-[#0a0d1a]">
      <div className="section-divider" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={visible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
          className="text-[2.4rem] md:text-[3.2rem] font-outfit font-black mb-12 tracking-tight"
        >
          My <span className="gradient-text-cyan">Certificates</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={visible ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayed.map(cert => (
                <motion.div
                key={cert.id}
                variants={cardVariant}
                layout
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setModal({ src: cert.image, alt: cert.title })}
                whileHover={{ y: -3 }}
                className="flex flex-col bg-[#0d1120] rounded-lg overflow-hidden border border-white/6 hover:border-cyan-300/20 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                {/* Image */}
                <div className="h-40 md:h-48 flex items-center justify-center bg-[#050810]/80 overflow-hidden p-2 md:p-3">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="p-3 md:p-4 flex flex-col gap-1 text-center">
                  <h3 className="text-[0.95rem] md:text-[1rem] font-bold font-outfit text-white leading-snug line-clamp-2">{cert.title}</h3>
                  <p className="text-[0.85rem] md:text-[0.9rem] text-cyan-300 font-medium opacity-90">by {cert.issuer}</p>
                  <p className="text-[0.8rem] md:text-[0.85rem] text-white/40 font-medium mt-auto">{cert.year}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Toggle button */}
        <div className="flex justify-center mt-10">
          <motion.button
            onClick={() => setShowAll(s => !s)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 text-[0.95rem] md:text-[1rem] font-semibold font-inter text-[#050810] bg-cyan-400/95 rounded-md transition-all duration-200"
          >
            {showAll ? 'View Less' : 'View All'}
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      {modal && <ImageModal src={modal.src} alt={modal.alt} onClose={() => setModal(null)} />}
    </section>
  )
}
