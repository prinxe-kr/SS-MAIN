import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '../../data/data'
import './Projects.css'
import Sot from './projectassets/Sot.png'
import Amalgam from './projectassets/amalgam.png'
import NatrajIron from './projectassets/natraj_iron.jpeg'
import Ramkrishna from './projectassets/ramkrishna.png'
import RashmiGrp from './projectassets/rashmigrp.png'
import RSB from './projectassets/rsb.png'
import Sudisa from './projectassets/sudisa.png'


gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const logoLoopRef = useRef(null)
  const trustItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll reveal for section
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Logo loop animation
      if (logoLoopRef.current) {
        const logos = logoLoopRef.current.querySelectorAll('.client-logo')
        gsap.set(logos, { filter: 'grayscale(100%)' })
        
        gsap.to(logoLoopRef.current, {
          x: '-50%',
          duration: 20,
          ease: 'none',
          repeat: -1
        })

        logos.forEach(logo => {
          logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
              scale: 1.1,
              filter: 'grayscale(0%)',
              boxShadow: '0 0 20px rgba(255, 152, 0, 0.5)',
              duration: 0.3
            })
          })
          logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
              scale: 1,
              filter: 'grayscale(100%)',
              boxShadow: 'none',
              duration: 0.3
            })
          })
        })
      }

      // Trust items animation
      gsap.fromTo(trustItemsRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.trust-section',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Floating particles
      const particles = document.querySelectorAll('.floating-particle')
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          rotation: 'random(-180, 180)',
          duration: 'random(3, 6)',
          ease: 'none',
          repeat: -1,
          yoyo: true,
          delay: i * 0.5
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const clientLogos = [
    { id: 1, name: 'Sot', logo: Sot },
    { id: 2, name: 'Amalgam', logo: Amalgam },
    { id: 3, name: 'Natraj Iron', logo: NatrajIron },
    { id: 4, name: 'Ramkrishna', logo: Ramkrishna },
    { id: 5, name: 'Rashmi Group', logo: RashmiGrp },
    { id: 6, name: 'RSB', logo: RSB },
    { id: 7, name: 'Sudisa', logo: Sudisa },
    { id: 8, name: 'Sudisa', logo: Sudisa }
  ]

  const trustData = [
    {
      icon: 'fa-users',
      title: 'Experienced Team',
      description: 'Skilled professionals with decades of industrial expertise'
    },
    {
      icon: 'fa-cogs',
      title: 'Advanced Technology',
      description: 'State-of-the-art equipment and cutting-edge manufacturing'
    },
    {
      icon: 'fa-clock',
      title: 'Timely Delivery',
      description: 'Reliable project completion within agreed timelines'
    },
    {
      icon: 'fa-star',
      title: 'Customer Satisfaction',
      description: '100% client satisfaction with premium quality results'
    }
  ]

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      {/* Background Effects */}
      <div className="industrial-bg">
        <div className="steel-texture"></div>
        <div className="orange-glow"></div>
        <div className="floating-particles">
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
        </div>
        <div className="noise-overlay"></div>
      </div>

      <div className="container">
        {/* Top Header */}
        <div className="projects-header">
          <div className="header-left">
            <span className="section-subtitle">OUR PROJECTS</span>
            <h2 className="section-title">Building Stronger Tomorrow</h2>
            <p className="section-description">
              We deliver premium industrial solutions with unmatched expertise, 
              advanced technology, and a commitment to excellence that builds 
              the infrastructure of tomorrow.
            </p>
          </div>
          <div className="header-right">
            <a href="#contact" className="cta-button">
              <span>View All Projects</span>
              <div className="arrow-icon">→</div>
            </a>
          </div>
        </div>

        {/* Logo Loop */}
        <div className="logo-loop-container">
          <div ref={logoLoopRef} className="logo-loop">
            {clientLogos.concat(clientLogos).map((logo, index) => (
              <div key={index} className="client-logo">
                <img src={logo.logo} alt={logo.name} />
              </div>
            ))}
          </div>
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>

        {/* Trust Section */}
        <div className="trust-section">
          <div className="trust-grid">
            {trustData.map((item, index) => (
              <div 
                key={index}
                ref={el => trustItemsRef.current[index] = el}
                className="trust-item"
              >
                <div className="trust-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects