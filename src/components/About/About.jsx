import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { aboutFeatures } from '../../data/data'
import Stats from '../Stats/Stats'
import industrialImg from './aboutassets/industrial.png'
import weldingImg from './aboutassets/welding.png'
import grindingImg from './aboutassets/grinding.png'
import './About.css'

const About = () => {
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

    const element = document.getElementById('about')
    if (element) observer.observe(element)

    return () => observer.disconnect()
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

  return (
    <section id="about" className="about">
      <div className="about-container">
        <motion.div
          className="about-layout"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="about-left" variants={itemVariants}>
            <div className="image-stack">
              <motion.div
                className="image-card image-card-large"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img src={industrialImg} alt="Industrial Construction" loading="lazy" decoding="async" />
              </motion.div>
              <motion.div
                className="image-card image-card-medium"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img src={weldingImg} alt="Steel Welding" loading="lazy" decoding="async" />
              </motion.div>
              <motion.div
                className="image-card image-card-small"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img src={grindingImg} alt="Industrial Team" loading="lazy" decoding="async" />
              </motion.div>

              <div className="image-tag image-tag-top">
                <i className="fas fa-industry"></i>
                <span>Industrial Construction</span>
              </div>
              <div className="image-tag image-tag-bottom">
                <i className="fas fa-wrench"></i>
                <span>Steel Welding</span>
              </div>
              <motion.div
                className="image-overlay-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="overlay-number">25+</p>
                <p className="overlay-label">Years of Excellence</p>
              </motion.div>
              <div className="dots-pattern"></div>
            </div>
          </motion.div>

          <motion.div className="about-right" variants={itemVariants}>
            <div className="section-trail">
              <span>ABOUT US</span>
              <span className="section-line"></span>
            </div>
            <motion.h2
              className="about-heading"
              variants={itemVariants}
            >
              Pioneers in Industrial Excellence
            </motion.h2>
            <motion.p
              className="about-description"
              variants={itemVariants}
            >
              S.S. Enterprises has been a trusted partner in delivering high-quality steel fabrication, engineering and construction solutions. Our commitment to innovation, quality and customer satisfaction has made us a leader in the industry.
            </motion.p>

            <motion.div
              className="about-feature-grid"
              variants={containerVariants}
            >
              {aboutFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="about-feature-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="about-feature-icon">
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              className="about-btn"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Know More About Us
              <i className="fas fa-arrow-right"></i>
            </motion.a>
          </motion.div>
        </motion.div>

        <Stats animate={isVisible} />
      </div>
    </section>
  )
}

export default About