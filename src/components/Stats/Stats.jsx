import { motion } from 'framer-motion'
import { statsData } from '../../data/data'
import './Stats.css'

const Stats = ({ animate }) => {
  return (
    <motion.div
      className="about-stats-row"
      initial={{ opacity: 0, y: 50 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          className="about-stat"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="about-stat-icon">
            <i className={`fas ${stat.icon}`}></i>
          </div>
          <div>
            <h3>{stat.number}</h3>
            <p>{stat.title}</p>
            <span>{stat.description}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Stats