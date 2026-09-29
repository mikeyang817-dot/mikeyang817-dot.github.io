import { motion } from 'motion/react'
import './coming-soon.css'

function ComingSoonPage({ section = '文章', english = 'ARTICLES' }) {
  return (
    <main className="yy-coming-page">
      <div className="yy-coming-orb yy-coming-orb-one" aria-hidden="true" />
      <div className="yy-coming-orb yy-coming-orb-two" aria-hidden="true" />

      <motion.div
        className="yy-coming-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.span
          className="yy-coming-kicker"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {english}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.25,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          敬请期待
        </motion.h1>

        <motion.div
          className="yy-coming-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.5
          }}
        >
          <span className="yy-coming-dot" />
          <span>{section}</span>
        </motion.div>
      </motion.div>
    </main>
  )
}

export default ComingSoonPage
