import { motion, AnimatePresence } from 'framer-motion'

export default function ImageModal({ src, alt, onClose }) {
  if (!src) return null

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          key="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={e => e.stopPropagation()}
          className="relative bg-[#0d1120] rounded-2xl overflow-hidden border border-cyan-400/15 shadow-[0_30px_80px_rgba(0,0,0,0.9)] max-w-[90vw] max-h-[88vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white text-[1.8rem] hover:bg-cyan-400 hover:text-[#050810] transition-all duration-200 hover:rotate-90 backdrop-blur-sm font-sans leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[88vw] max-h-[84vh] object-contain block"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
