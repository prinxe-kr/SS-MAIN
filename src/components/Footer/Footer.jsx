import './Footer.css'

const Footer = () => {
  const quickLinks = [
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ]

  const servicesLinks = [
    { href: '#', label: 'Construction' },
    { href: '#', label: 'Manufacturing' },
    { href: '#', label: 'Project Management' },
    { href: '#', label: 'Maintenance' }
  ]

  const socials = [
    { href: '#', icon: 'fab fa-facebook' },
    { href: '#', icon: 'fab fa-twitter' },
    { href: '#', icon: 'fab fa-linkedin' },
    { href: '#', icon: 'fab fa-instagram' }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo.png" alt="S.S. Enterprises" />
              <h3>S.S. Enterprises</h3>
            </div>
            <p>
              Building tomorrow's infrastructure today with excellence, innovation, and commitment.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              {socials.map((social, index) => (
                <a key={index} href={social.href}>
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 S.S. Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer