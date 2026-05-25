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
    <section id="certificates" className="relative min-h-screen px-[5%] py-[10rem] bg-[#050810]">
      <div className="section-divider" />

      <div ref={ref} className="relative z-10 max-w-[1300px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={visible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8 }}
          className="text-[4.8rem] font-outfit font-black text-center mb-16 tracking-tight"
        >
          My <span className="gradient-text-cyan">Certificates</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={visible ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {displayed.map(cert => (
              <motion.div
                key={cert.id}
                variants={cardVariant}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setModal({ src: cert.image, alt: cert.title })}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex flex-col bg-[#0d1120] rounded-2xl overflow-hidden border border-cyan-400/10 hover:border-cyan-400/35 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(0,212,255,0.14)] transition-all duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="h-[18rem] flex items-center justify-center bg-[#050810]/80 overflow-hidden p-3">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-400 group-hover:scale-[1.06]"
                  />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-2 text-center">
                  <h3 className="text-[1.3rem] font-bold font-outfit text-white leading-snug">{cert.title}</h3>
                  <p className="text-[1.1rem] text-cyan-400 font-medium opacity-90">Issued by: {cert.issuer}</p>
                  <p className="text-[1rem] text-white/45 font-medium mt-auto">Year: {cert.year}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Toggle button */}
        <div className="flex justify-center mt-14">
          <motion.button
            onClick={() => setShowAll(s => !s)}
            whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,212,255,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="px-14 py-4 text-[1.5rem] font-bold font-inter text-[#050810] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_4px_20px_rgba(0,212,255,0.35)] transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">{showAll ? 'View Less' : 'View All'}</span>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      {modal && <ImageModal src={modal.src} alt={modal.alt} onClose={() => setModal(null)} />}
    </section>
  )
}
