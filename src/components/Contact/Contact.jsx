import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import SectionHeader from '../Shared/SectionHeader'
import { contactInfo } from '../../data/data'
import './Contact.css'

const Contact = () => {
  const controls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible')
        }
      },
      {
        threshold: 0.2
      }
    )

    const element = document.getElementById('contact')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [controls])

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  const infoVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    e.target.reset()
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={formVariants}
        >
          <SectionHeader title="Get In Touch" subtitle="Let's Build Something Great Together" />
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial="hidden"
            animate={controls}
            variants={infoVariants}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="contact-item"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <i className={`fas ${item.icon}`}></i>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="contact-form"
            initial="hidden"
            animate={controls}
            variants={formVariants}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Your Phone" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required />
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact