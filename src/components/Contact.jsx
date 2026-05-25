import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { FORM_ACTION, SHEET_ID } from '../data/skills'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const inputClass = `w-full px-4 py-3 text-[0.95rem] md:text-[1rem] font-inter text-white/90 bg-[#050810]/70 border border-white/8 rounded-md backdrop-blur-sm placeholder-white/30 transition-all duration-200 focus:outline-none focus:border-cyan-300/60 focus:bg-[#050810]/90 focus:ring-1 focus:ring-cyan-400/30 valid:not(:placeholder-shown):border-green-300/40 invalid:not(:placeholder-shown):border-red-300/50`

export default function Contact() {
  const [ref, visible] = useReveal()
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity()
      return
    }
    setSending(true)
    const formData = new FormData(formRef.current)
    try {
      await fetch(FORM_ACTION, { method: 'POST', body: formData, mode: 'no-cors' })
      setSuccess(true)
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      alert('Oops! There was a problem submitting your form.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative px-6 lg:px-12 py-16 md:py-28 bg-[#050810]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-outfit font-black mb-3 tracking-tight">
          Get In <span className="gradient-text-cyan">Touch</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-base md:text-lg text-white/60 mb-8">
          Have a project or collaboration idea? Let's work together.
        </motion.p>

        {/* Accent line */}
        <motion.div variants={fadeUp} className="w-12 h-[2px] bg-gradient-to-r from-cyan-300 to-purple-400 rounded-full mb-10" />

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              noValidate
              autoComplete="on"
              acceptCharset="UTF-8"
            >
              <input type="hidden" name="sheetId" value={SHEET_ID} />
              <input type="hidden" name="sheetName" value="Sheet1" />

              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input type="text" name="name" placeholder="Full Name" required aria-label="Full Name" className={inputClass} />
                <input type="email" name="email" placeholder="Email Address" required aria-label="Email Address" className={inputClass} />
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input type="tel" name="phone" placeholder="Mobile Number" aria-label="Mobile Number" pattern="[0-9]{10}" title="Enter 10 digit number" className={inputClass} />
                <input type="text" name="subject" placeholder="Email Subject" required aria-label="Email Subject" className={inputClass} />
              </motion.div>

              <motion.div variants={fadeUp} className="mb-6">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                  aria-label="Your Message"
                  className={`${inputClass} resize-none`}
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { y: -2 } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  className="px-6 py-2.5 text-sm font-semibold font-inter text-[#050810] rounded-md bg-cyan-400/95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.div>

              <motion.p variants={fadeUp} className="text-center text-sm text-white/40 mt-6">
                Or email directly:{' '}
                <a href="mailto:tarundharsanrj@gmail.com" className="text-cyan-300 font-semibold hover:underline">
                  tarundharsanrj@gmail.com
                </a>
              </motion.p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center py-16 px-8 glass rounded-lg border border-cyan-400/20"
            >
              <i className="bx bx-check-circle text-5xl text-green-400 block mb-4" />
              <h3 className="text-2xl md:text-3xl font-outfit font-bold mb-3 text-white">Message Sent Successfully!</h3>
              <p className="text-base md:text-lg text-white/60 mb-6">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <motion.button
                onClick={() => setSuccess(false)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-2.5 text-sm font-semibold font-inter text-[#050810] bg-cyan-400/95 rounded-md transition-all duration-200"
              >
                Send Another Message
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
