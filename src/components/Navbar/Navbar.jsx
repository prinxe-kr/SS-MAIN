import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const prevScrollY = useRef(0)

  const isNavbarVisible = isHovered || isMobileMenuOpen || showNavbar

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const heroEl = document.getElementById('hero')
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : 0
      const isInHero = currentY < heroBottom

      if (isInHero) {
        setShowNavbar(true)
      } else if (currentY > prevScrollY.current + 5) {
        setShowNavbar(false)
      } else if (currentY < prevScrollY.current - 5) {
        setShowNavbar(true)
      }

      setIsScrolled(currentY > heroBottom)
      prevScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <div
      className="navbar-hover-region"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${isNavbarVisible ? 'visible' : 'hidden'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={isNavbarVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="nav-container">
        <a href="#hero" className="logo-link">
          <motion.img
            src="/logo.png"
            alt="S.S. Enterprises"
            className="logo-img"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </a>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="nav-link"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.a
          href="#contact"
          className="quote-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Get Quote
        </motion.a>

        <button
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
    </div>
  )
}

export default Navbar