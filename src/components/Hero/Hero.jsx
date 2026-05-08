import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  const footerItems = [
    {
      icon: 'fa-certificate',
      title: 'ISO 9001:2015',
      subtitle: 'Certified'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Safety First',
      subtitle: 'Always'
    },
    {
      icon: 'fa-headset',
      title: '24/7 Support',
      subtitle: 'We\'re Here'
    }
  ]

  return (
    <section className="hero" id="hero">
      <div className="hero-image-container">
        <img src="/hero_01.png" alt="Industrial furnace" className="hero-image" />
        <div className="hero-overlay"></div>
      </div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div className="hero-copy" variants={itemVariants}>
          <motion.p className="hero-label" variants={itemVariants}>
            BUILDING TOMORROW'S INFRASTRUCTURE TODAY
          </motion.p>
          <motion.h1 className="hero-heading" variants={itemVariants}>
            Forging the Future of <span>Steel Industry</span>
          </motion.h1>
          <motion.p className="hero-description" variants={itemVariants}>
            Precision steel fabrication, engineering excellence and reliable industrial solutions trusted for 25+ years worldwide.
          </motion.p>
          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.a
              href="#projects"
              className="primary-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Explore Our Work
            </motion.a>
            <motion.a
              href="#contact"
              className="secondary-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-footer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {footerItems.map((item, index) => (
          <motion.div
            key={index}
            className="hero-footer-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <i className={`fas ${item.icon}`}></i>
            <div>
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Hero