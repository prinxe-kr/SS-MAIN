import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { servicesData } from '../../data/data'
import './Services.css'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    const element = document.getElementById('services')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        staggerChildren: 0.12
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
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
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.p variants={itemVariants}>OUR SERVICES</motion.p>
          <motion.h2 variants={itemVariants}>Premium Steel Manufacturing Process</motion.h2>
          <motion.p className="services-subtitle" variants={itemVariants}>
            Precision-engineered industrial solutions across every stage of manufacturing.
          </motion.p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {servicesData.map((service, index) => (
            <motion.article
              key={service.id}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="service-card-top">
                <span className="service-card-icon">
                  <i className={`fas ${service.icon}`}></i>
                </span>
                <h3>{service.title}</h3>
              </div>

              <p className="service-card-copy">{service.description}</p>

              <div className="service-card-cta">
                <span>Learn More</span>
                <span className="cta-arrow">→</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services