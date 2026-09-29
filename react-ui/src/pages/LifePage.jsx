import { motion } from 'motion/react'
import SoftAurora from '../components/SoftAurora'
import './life.css'

function LifePage() {
  return (
    <main className="yy-life-page">
      <div className="yy-life-dynamic-bg" aria-hidden="true">
        <SoftAurora
          speed={0.24}
          scale={1.38}
          brightness={0.78}
          color1="#d7e2ef"
          color2="#ead8cf"
          noiseFrequency={2.1}
          noiseAmplitude={0.68}
          bandHeight={0.45}
          bandSpread={1.65}
          octaveDecay={0.2}
          layerOffset={0.86}
          colorSpeed={0.36}
          enableMouseInteraction={true}
          mouseInfluence={0.12}
          lightMode={true}
        />
      </div>
      <section className="yy-life-hero">
        <motion.span
          className="yy-life-label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          LIFE
        </motion.span>
      </section>

      <section className="yy-life-entry-section">
        <motion.a
          href="/life/gallery/"
          className="yy-life-gallery-entry"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <div className="yy-life-photo-frame">
            <div className="yy-life-photo-mat">
              <img
                src="/life-gallery-cover.jpg"
                alt=""
                className="yy-life-cover-image"
              />
            </div>

            <div className="yy-life-frame-caption">
              <div>
                <span className="yy-life-entry-number">01</span>
                <h2>相册精选</h2>
              </div>

              <span className="yy-life-entry-arrow">→</span>
            </div>
          </div>
        </motion.a>
      </section>
    </main>
  )
}

export default LifePage
