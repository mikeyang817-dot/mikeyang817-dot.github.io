import LifePage from './pages/LifePage'

import GalleryPage from './pages/GalleryPage'

import AboutPage from './pages/AboutPage'

import ComingSoonPage from './pages/ComingSoonPage'

import SpotlightCard from './components/SpotlightCard'

import SoftAurora from './components/SoftAurora'

import GlareHover from './components/GlareHover'

import Magnet from './components/Magnet'

import './App.css'

import SplitText from './components/SplitText'

import BlurText from './components/BlurText'

import { motion } from 'motion/react'





function SiteNav() {

  const path = window.location.pathname



  return (

    <nav className="yy-site-nav">

      <a

        className={`yy-nav-brand ${path === '/' ? 'is-active' : ''}`}

        href="/"

      >

        YYYangMike

      </a>



      <div className="yy-nav-links">

        <a

          className={path === '/' ? 'is-active' : ''}

          href="/"

        >

          首页

        </a>



        <a
          className={path.startsWith('/articles') ? 'is-active' : ''}
          href="/articles/"
        >
          文章
        </a>

        <a
          className={path.startsWith('/projects') ? 'is-active' : ''}
          href="/projects/"
        >
          项目
        </a>



        <a

          className={path.startsWith('/life') ? 'is-active' : ''}

          href="/life/"

        >

          生活

        </a>



        <a

          className={path.startsWith('/about') ? 'is-active' : ''}

          href="/about/"

        >

          关于

        </a>

      </div>

    </nav>

  )

}





function App() {

  const path = window.location.pathname



  const isAboutPage = path.startsWith('/about')

  const isGalleryPage = path.startsWith('/life/gallery')

  const isLifePage = path.startsWith('/life')

  const isArticlesPage = path.startsWith('/articles')
  const isProjectsPage = path.startsWith('/projects')

      const scrollToSection = (id, duration = 1300) => {
    const target = document.getElementById(id)

    if (!target) return

    const navOffset = 105
    const startY = window.scrollY
    const targetY =
      target.getBoundingClientRect().top +
      window.scrollY -
      navOffset

    const distance = targetY - startY
    const startTime = performance.now()
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior

    root.style.scrollBehavior = 'auto'

    const easeInOutCubic = (t) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutCubic(progress)

      window.scrollTo(0, startY + distance * eased)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        root.style.scrollBehavior = previousScrollBehavior
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (

    <>

      <SiteNav />



      {isArticlesPage ? (
        <ComingSoonPage
          section="文章"
          english="ARTICLES"
        />
      ) : isProjectsPage ? (
        <ComingSoonPage
          section="项目"
          english="PROJECTS"
        />
      ) : isAboutPage ? (
        <AboutPage />
      ) : isGalleryPage ? (
        <GalleryPage />
      ) : isLifePage ? (
        <LifePage />
      ) : (

        <main className="yy-home-demo">



          <div className="yy-aurora-bg" aria-hidden="true">

            <SoftAurora

              speed={0.7}

              scale={1.35}

              brightness={1.15}

              color1="#d8c9e8"

              color2="#c9dfea"

              noiseFrequency={2.8}

              noiseAmplitude={1.25}

              bandHeight={0.47}

              bandSpread={1.55}

              octaveDecay={0.2}

              layerOffset={0.85}

              colorSpeed={1.0}

              enableMouseInteraction={true}

              mouseInfluence={0.28}

              lightMode={true}

            />

          </div>



          <section className="yy-hero-demo">

            <SplitText

              text="YYYangMike"

              className="yy-demo-title"

              delay={70}

              duration={0.85}

              ease="power3.out"

              splitType="chars"

              from={{ opacity: 0, y: 36 }}

              to={{ opacity: 1, y: 0 }}

              textAlign="center"

              tag="h1"

            />



            <BlurText

              text="写代码，也记录生活。"

              className="yy-demo-subtitle"

              delay={55}

              animateBy="letters"

              direction="bottom"

              stepDuration={0.35}

            />



            <div className="yy-demo-actions">

              <Magnet padding={70} magnetStrength={4}>

                <GlareHover

                  width="auto"

                  height="auto"

                  background="#1c1c1f"

                  borderRadius="999px"

                  borderColor="rgba(255,255,255,0.08)"

                  glareColor="#ffffff"

                  glareOpacity={0.16}

                  glareAngle={-30}

                  glareSize={220}

                  transitionDuration={700}

                  className="yy-glare-button yy-glare-primary"

                >

                  <a
                    className="yy-demo-btn yy-demo-btn-primary"
                    href="#explore"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('explore', 1300)
                    }}
                  >
                    Explore My World
                    <span>→</span>
                  </a>

                </GlareHover>

              </Magnet>



              <Magnet padding={70} magnetStrength={4}>

                <GlareHover

                  width="auto"

                  height="auto"

                  background="rgba(255,255,255,0.48)"

                  borderRadius="999px"

                  borderColor="rgba(30,30,35,0.10)"

                  glareColor="#ffffff"

                  glareOpacity={0.65}

                  glareAngle={-30}

                  glareSize={220}

                  transitionDuration={700}

                  className="yy-glare-button yy-glare-secondary"

                >

                  <a
                    className="yy-demo-btn yy-demo-btn-secondary"
                    href="#recent"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('recent', 1300)
                    }}
                  >
                    Read My Stories
                  </a>

                </GlareHover>

              </Magnet>

            </div>

          </section>



          <section className="yy-philosophy-demo">

            <motion.div

              className="yy-philosophy-text"

              initial="hidden"

              whileInView="visible"

              viewport={{

                once: true,

                amount: 0.35

              }}

              variants={{

                hidden: {},

                visible: {

                  transition: {

                    staggerChildren: 0.09,

                    delayChildren: 0.25

                  }

                }

              }}

            >

              <div className="yy-philosophy-line">

                {"人生不过三万天，".split("").map((char, index) => (

                  <motion.span

                    key={index}

                    className="yy-wave-char"

                    variants={{

                      hidden: {

                        opacity: 0,

                        y: 26

                      },

                      visible: {

                        opacity: 1,

                        y: [26, -7, 3, 0],

                        transition: {

                          duration: 1.15,

                          ease: [0.22, 1, 0.36, 1]

                        }

                      }

                    }}

                  >

                    {char}

                  </motion.span>

                ))}

              </div>



              <div className="yy-philosophy-line">

                {"去选择我真正想要的生活。".split("").map((char, index) => (

                  <motion.span

                    key={index}

                    className="yy-wave-char"

                    variants={{

                      hidden: {

                        opacity: 0,

                        y: 26

                      },

                      visible: {

                        opacity: 1,

                        y: [26, -7, 3, 0],

                        transition: {

                          duration: 1.15,

                          ease: [0.22, 1, 0.36, 1]

                        }

                      }

                    }}

                  >

                    {char}

                  </motion.span>

                ))}

              </div>

            </motion.div>

          </section>



          <section className="yy-manifesto-demo">

            <div className="yy-manifesto-inner">

              <motion.p

                className="yy-manifesto-line yy-manifesto-line-1"

                initial={{ opacity: 0, y: 42 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, amount: 0.6 }}

                transition={{

                  duration: 1.15,

                  ease: [0.22, 1, 0.36, 1]

                }}

              >

                Build things.

              </motion.p>



              <motion.p

                className="yy-manifesto-line yy-manifesto-line-2"

                initial={{ opacity: 0, y: 42 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, amount: 0.6 }}

                transition={{

                  duration: 1.15,

                  delay: 0.18,

                  ease: [0.22, 1, 0.36, 1]

                }}

              >

                Record life.

              </motion.p>



              <motion.p

                className="yy-manifesto-line yy-manifesto-line-3"

                initial={{ opacity: 0, y: 42 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, amount: 0.6 }}

                transition={{

                  duration: 1.15,

                  delay: 0.36,

                  ease: [0.22, 1, 0.36, 1]

                }}

              >

                Stay curious.

              </motion.p>

            </div>

          </section>



          <section id="explore" className="yy-explore-demo">

            <motion.div

              className="yy-explore-heading"

              initial={{ opacity: 0, y: 30 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true, amount: 0.6 }}

              transition={{

                duration: 1,

                ease: [0.22, 1, 0.36, 1]

              }}

            >

              <span className="yy-explore-kicker">EXPLORE</span>

              <h2>探索我的世界</h2>

            </motion.div>



            <div className="yy-explore-grid">



              <motion.div

                initial={{ opacity: 0, y: 35 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, amount: 0.35 }}

                transition={{

                  duration: 0.9,

                  delay: 0.05,

                  ease: [0.22, 1, 0.36, 1]

                }}

              >

                <SpotlightCard

                  className="yy-explore-card yy-project-card"

                  spotlightColor="rgba(160, 185, 225, 0.28)"

                >

                  <a className="yy-explore-link" href="/projects/">

                    <div>

                      <span className="yy-card-number">01</span>

                      <h3>项目</h3>

                      <p>Things I build.</p>

                    </div>



                    <span className="yy-card-arrow">→</span>

                  </a>

                </SpotlightCard>

              </motion.div>



              <motion.div

                initial={{ opacity: 0, y: 35 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, amount: 0.35 }}

                transition={{

                  duration: 0.9,

                  delay: 0.18,

                  ease: [0.22, 1, 0.36, 1]

                }}

              >

                <SpotlightCard

                  className="yy-explore-card yy-life-card"

                  spotlightColor="rgba(220, 190, 175, 0.28)"

                >

                  <a className="yy-explore-link" href="/life/">

                    <div>

                      <span className="yy-card-number">02</span>

                      <h3>生活</h3>

                      <p>Moments I keep.</p>

                    </div>



                    <span className="yy-card-arrow">→</span>

                  </a>

                </SpotlightCard>

              </motion.div>



              <motion.div

                initial={{ opacity: 0, y: 35 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, amount: 0.35 }}

                transition={{

                  duration: 0.9,

                  delay: 0.31,

                  ease: [0.22, 1, 0.36, 1]

                }}

              >

                <SpotlightCard

                  className="yy-explore-card yy-about-card"

                  spotlightColor="rgba(190, 175, 215, 0.28)"

                >

                  <a className="yy-explore-link" href="/about/">

                    <div>

                      <span className="yy-card-number">03</span>

                      <h3>关于</h3>

                      <p>Who I am.</p>

                    </div>



                    <span className="yy-card-arrow">→</span>

                  </a>

                </SpotlightCard>

              </motion.div>



            </div>

          </section>



          <section id="recent" className="yy-recent-demo">

            <motion.div

              className="yy-recent-inner"

              initial={{ opacity: 0, y: 32 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true, amount: 0.45 }}

              transition={{

                duration: 1,

                ease: [0.22, 1, 0.36, 1]

              }}

            >

              <div className="yy-recent-heading">

                <span className="yy-recent-kicker">RECENT</span>

                <h2>最近留下的东西</h2>

              </div>



              <div className="yy-recent-line" />



              <motion.div

                className="yy-recent-empty"

                initial={{ opacity: 0 }}

                whileInView={{ opacity: 1 }}

                viewport={{ once: true }}

                transition={{

                  duration: 1.2,

                  delay: 0.25

                }}

              >

                <span className="yy-recent-dot" />

                <p>内容正在慢慢长出来。</p>

              </motion.div>

            </motion.div>

          </section>



          <footer className="yy-footer-demo">

            <motion.div

              className="yy-footer-inner"

              initial={{ opacity: 0, y: 28 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true, amount: 0.4 }}

              transition={{

                duration: 1.1,

                ease: [0.22, 1, 0.36, 1]

              }}

            >

              <div className="yy-footer-top">

                <div className="yy-footer-brand">

                  <span className="yy-footer-name">YYYangMike</span>

                  <p>写代码，也记录生活。</p>

                </div>



                <Magnet padding={60} magnetStrength={4}>

                  <a

                    className="yy-back-top"

                    href="#"

                    onClick={(e) => {

                      e.preventDefault()

                      window.scrollTo({

                        top: 0,

                        behavior: 'smooth'

                      })

                    }}

                  >

                    ↑

                  </a>

                </Magnet>

              </div>



              <div className="yy-footer-divider" />



              <div className="yy-footer-bottom">

                <span>© {new Date().getFullYear()} YYYangMike</span>



                <span className="yy-footer-small">

                  Build things. Record life. Stay curious.

                </span>

              </div>

            </motion.div>

          </footer>



        </main>

      )}

    </>

  )

}



export default App
