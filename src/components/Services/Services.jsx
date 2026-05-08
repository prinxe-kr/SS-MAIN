import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { servicesData } from '../../data/data'
import './Services.css'

const Services = () => {
  const [activeCard, setActiveCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('services')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleCardInteraction = (index) => {
    if (window.innerWidth <= 768) {
      // Mobile: tap to toggle
      setActiveCard(activeCard === index ? null : index)
    } else {
      // Desktop: hover to activate
      setActiveCard(index)
    }
  }

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setActiveCard(null)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="services" className="services">
      <div className="services-container">
        <motion.div
          className="services-intro"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.p variants={itemVariants}>OUR SERVICES</motion.p>
          <motion.h2 variants={itemVariants}>
            Industrial Process & Premium Steel Services
          </motion.h2>
          <motion.p
            className="services-subtitle"
            variants={itemVariants}
          >
            
          </motion.p>
        </motion.div>

        <motion.div
          className="services-panels"
          onMouseLeave={handleMouseLeave}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={`premium-service-card ${activeCard === index ? 'active' : ''}`}
              onMouseEnter={() => window.innerWidth > 768 && handleCardInteraction(index)}
              onClick={() => handleCardInteraction(index)}
              variants={itemVariants}
              whileHover={window.innerWidth > 768 ? { scale: 1.02 } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="card-ambient"></div>
              <div className="card-edge-glow"></div>

              <div className="card-vertical-title">
                <div className="vertical-text">{service.label}</div>
              </div>

              <div className="card-shell">
                <div className="card-header">
                  <span className="service-badge">
                    <i className={`fas ${service.badge}`}></i>
                  </span>
                  <div className="service-mini-label">PROCESS SEQUENCE</div>
                </div>

                <div>
                  <h3 className="service-headline">{service.headline}</h3>
                  <p className="service-description">{service.description}</p>
                </div>

                <AnimatePresence>
                  {activeCard === index && (
                    <motion.div
                      className="service-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <ul className="service-list">
                        {service.highlights.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.3 }}
                          >
                            <span></span>
                            <strong>{item}</strong>
                          </motion.li>
                        ))}
                      </ul>
                      <p className="service-caption">
                        Industrial visuals layer molten steel, sparks, laser scanning and premium assembly craftsmanship.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services