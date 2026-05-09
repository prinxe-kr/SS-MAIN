import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  const logoContainerRef = useRef(null)
  const trustItemsRef = useRef([])

  useEffect(() => {
    let logoTween = null
    const ctx = gsap.context(() => {
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

      if (logoLoopRef.current) {
        logoTween = gsap.to(logoLoopRef.current, {
          xPercent: -50,
          duration: 18,
          ease: 'none',
          repeat: -1,
          paused: true
        })

        ScrollTrigger.create({
          trigger: logoContainerRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          onEnter: () => logoTween.play(),
          onEnterBack: () => logoTween.play()
        })
      }

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

    const container = logoContainerRef.current
    const reduceSpeed = () => logoTween && logoTween.timeScale(0.25)
    const restoreSpeed = () => logoTween && logoTween.timeScale(0.5)

    if (container) {
      container.addEventListener('mouseenter', reduceSpeed)
      container.addEventListener('mouseleave', restoreSpeed)
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', reduceSpeed)
        container.removeEventListener('mouseleave', restoreSpeed)
      }
      ctx.revert()
    }
  }, [])

  const clientLogos = [
    { id: 1, name: 'Sot', logo: Sot },
    { id: 2, name: 'Amalgam', logo: Amalgam },
    { id: 3, name: 'Natraj Iron', logo: NatrajIron },
    { id: 4, name: 'Ramkrishna', logo: Ramkrishna },
    { id: 5, name: 'Rashmi Group', logo: RashmiGrp },
    { id: 6, name: 'RSB', logo: RSB },
    { id: 7, name: 'Sudisa', logo: Sudisa },
  ]


  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      {/* Background Effects */}
      <div className="container">
        {/* Top Header */}
        <div className="projects-header">
          <div className="header-left">
            <span className="section-subtitle">OUR PROJECTS</span>
            <h2 className="section-title">Building Stronger Tomorrow</h2>
            <p className="section-description">
              Trusted by leading industrial companies for delivering precision manufacturing,
              steel fabrication, and large-scale engineering projects.
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
        <div ref={logoContainerRef} className="logo-loop-container">
          <div ref={logoLoopRef} className="logo-loop">
            {clientLogos.concat(clientLogos).map((logo, index) => (
              <div key={index} className="client-logo">
                <img src={logo.logo} alt={logo.name} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>
      </div>
    </section>
  )
}

export default Projects