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

const inputClass = `w-full px-6 py-4 text-[1.55rem] font-inter text-white/90 bg-[#050810]/70 border border-cyan-400/12 rounded-xl backdrop-blur-sm placeholder-white/30 transition-all duration-300 focus:outline-none focus:border-cyan-400/60 focus:bg-[#050810]/90 focus:shadow-[0_0_20px_rgba(0,212,255,0.18),0_0_0_3px_rgba(0,212,255,0.06)] valid:not(:placeholder-shown):border-green-400/40 invalid:not(:placeholder-shown):border-red-400/50`

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
    <section id="contact" className="relative min-h-screen px-[9%] py-[10rem] bg-[#050810]">
      <div className="section-divider" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="relative z-10 max-w-[72rem] mx-auto"
      >
        <motion.h2 variants={fadeUp} className="text-[4.8rem] font-outfit font-black text-center mb-5 tracking-tight">
          Get In <span className="gradient-text-cyan">Touch</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-[1.8rem] text-white/50 text-center mb-4">
          Got a project or a collaboration idea? Feel free to get in touch.
        </motion.p>

        {/* Accent line */}
        <motion.div variants={fadeUp} className="w-20 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mb-14 shadow-[0_0_12px_rgba(0,212,255,0.5)]" />

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

              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <input type="text" name="name" placeholder="Full Name" required aria-label="Full Name" className={inputClass} />
                <input type="email" name="email" placeholder="Email Address" required aria-label="Email Address" className={inputClass} />
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <input type="tel" name="phone" placeholder="Mobile Number" aria-label="Mobile Number" pattern="[0-9]{10}" title="Enter 10 digit number" className={inputClass} />
                <input type="text" name="subject" placeholder="Email Subject" required aria-label="Email Subject" className={inputClass} />
              </motion.div>

              <motion.div variants={fadeUp}>
                <textarea
                  name="message"
                  rows="8"
                  placeholder="Your Message"
                  required
                  aria-label="Your Message"
                  className={`${inputClass} resize-none mb-6`}
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { y: -4, boxShadow: '0 0 40px rgba(0,212,255,0.6)' } : {}}
                  whileTap={!sending ? { scale: 0.97 } : {}}
                  className="relative px-20 py-5 text-[1.6rem] font-bold font-inter text-[#050810] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_25px_rgba(0,212,255,0.4)] overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span className="relative z-10">{sending ? 'Sending...' : 'Send Message'}</span>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-700" />
                </motion.button>
              </motion.div>

              <motion.p variants={fadeUp} className="text-center text-[1.4rem] text-white/40 mt-8 leading-relaxed">
                If you prefer to send an email directly instead of using the form, feel free to reach out to me at{' '}
                <a href="mailto:tarundharsanrj@gmail.com" className="text-cyan-400 font-semibold border-b border-cyan-400/30 hover:border-cyan-400 transition-colors duration-200">
                  tarundharsanrj@gmail.com
                </a>
                . Whether you have a specific project in mind, a question, or just want to connect, I&apos;m always happy to hear from you.{' '}
                <a href="mailto:tarundharsanrj@gmail.com" className="text-cyan-400 font-semibold border-b border-cyan-400/30 hover:border-cyan-400 transition-colors duration-200">
                  Click here to send an email directly.
                </a>
              </motion.p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center py-20 px-8 glass rounded-[2rem] border border-cyan-400/20"
            >
              <i className="bx bx-check-circle text-[7rem] text-green-400 block mb-6 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]" />
              <h3 className="text-[2.6rem] font-outfit font-bold mb-4 text-white">Message Sent Successfully!</h3>
              <p className="text-[1.65rem] text-white/55 mb-8 leading-relaxed">
                Thank you for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
              <motion.button
                onClick={() => setSuccess(false)}
                whileHover={{ y: -3, boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-4 text-[1.55rem] font-bold font-inter text-[#050810] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_4px_20px_rgba(0,212,255,0.35)] hover:shadow-[0_8px_30px_rgba(0,212,255,0.55)] transition-all duration-300"
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
