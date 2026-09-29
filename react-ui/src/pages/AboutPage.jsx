import { motion } from 'motion/react'
import SpotlightCard from '../components/SpotlightCard'
import SoftAurora from '../components/SoftAurora'
import './about.css'

const identityCards = [
  {
    title: '敲代码边敲边蒙圈的物联网大二生',
    body:
      '代码写得出来，Bug 也造得出来。偶尔觉得自己已经理解了系统，下一秒一个报错就会重新教我做人。',
    color: 'rgba(89, 194, 255, 0.28)',
    className: 'yy-about-card-blue'
  },
  {
    title: '高中稳坐语文课代表，却高考语文 99 分的失意伪文青',
    body:
      '曾经相信我和文字很熟，直到高考语文 99 分提醒我：关系可能只是我单方面觉得不错。现在还是会被一些文字感动，也还是喜欢写点没什么用、自己想留下来的东西。',
    color: 'rgba(174, 125, 255, 0.28)',
    className: 'yy-about-card-purple'
  },
  {
    title: '疯狂囤知识，又总怀疑自己学不对路的迷茫学者',
    body:
      '收藏夹永远有下一门课，硬盘里永远有下一套资料。一边疯狂吸收新东西，一边认真怀疑：我是不是又学偏了？',
    color: 'rgba(83, 146, 255, 0.28)',
    className: 'yy-about-card-indigo'
  },
  {
    title: '在山路、快门和和弦之间乱逛的野生玩家',
    body:
      '喜欢背着包去走没走过的路，也喜欢拿着相机留住一点光。偶尔弹弹吉他，水平不一定稳定，但生活得有点声音。',
    color: 'rgba(79, 219, 214, 0.24)',
    className: 'yy-about-card-cyan'
  },
  {
    title: '跑步、羽球样样接招，却总想偷会儿懒的摸鱼健将',
    body:
      '跑得动，也打得动，就是不一定每天都想动。状态好的时候像在备赛，状态差的时候下楼拿个外卖都觉得自己完成了今日有氧。',
    color: 'rgba(139, 112, 255, 0.26)',
    className: 'yy-about-card-violet'
  }
]

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 34
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

function AboutPage() {
  return (
    <main className="yy-about-page">
        <video
        className="yy-about-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        >
        <source src="/about-bg.mp4" type="video/mp4" />
        </video>
      {/* ===== Persistent cosmic background ===== */}

      <div className="yy-about-cosmos" aria-hidden="true">
        <div className="yy-about-stars yy-about-stars-a" />
        <div className="yy-about-stars yy-about-stars-b" />
        <div className="yy-about-stars yy-about-stars-c" />

        <div className="yy-about-aurora">
          <SoftAurora
            speed={0.35}
            scale={1.25}
            brightness={0.62}
            color1="#244f87"
            color2="#6550a5"
            noiseFrequency={2.4}
            noiseAmplitude={0.85}
            bandHeight={0.4}
            bandSpread={1.4}
            octaveDecay={0.22}
            layerOffset={0.8}
            colorSpeed={0.55}
            enableMouseInteraction={false}
            lightMode={false}
          />
        </div>

        <div className="yy-about-glow yy-about-glow-one" />
        <div className="yy-about-glow yy-about-glow-two" />
      </div>


      {/* =====================================================
          Scene 1
          ===================================================== */}

      <section className="yy-about-intro">

        <motion.div
          className="yy-about-intro-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.16,
                delayChildren: 0.15
              }
            }
          }}
        >
          <motion.p
            className="yy-about-intro-lead"
            variants={fadeUp}
          >
            一个敲代码时偶尔胸有成竹，更多时候边敲边蒙圈的大二生
          </motion.p>

          <motion.p variants={fadeUp}>
            目前就读于北京信息科技大学物联网工程专业。
          </motion.p>

          <motion.p variants={fadeUp}>
            会写一点代码，做一点项目，也经常在“我是不是学会了”和“我到底在干什么”之间怀疑人生。
          </motion.p>

          <motion.p variants={fadeUp}>
            正在参与“基于质量感知与本地大模型代理的心电智能辅助分析系统”大创项目，也参加过电子信息类新生创客大赛，接下来还想去碰一碰华为 ICT 创新赛。
          </motion.p>

          <motion.p variants={fadeUp}>
            但如果只用工科生三个字介绍我，好像又少了很多东西。
          </motion.p>
        </motion.div>


        <motion.div
          className="yy-about-planet-wrap"
          initial={{
            opacity: 0,
            scale: 0.88,
            x: 60
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0
          }}
          transition={{
            duration: 1.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          aria-hidden="true"
        >
          <div className="yy-about-orbit yy-about-orbit-one" />
          <div className="yy-about-orbit yy-about-orbit-two" />

          <div className="yy-about-planet">
            <div className="yy-about-planet-light" />
            <div className="yy-about-planet-shadow" />
          </div>
        </motion.div>

      </section>


      {/* =====================================================
          Scene 2 — identity cards
          ===================================================== */}

      <section className="yy-about-identities">

        <motion.div
          className="yy-about-card-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
        >
          {identityCards.map((card) => (
            <motion.div
              key={card.title}
              className="yy-about-card-motion"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 42
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.95,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              <SpotlightCard
                className={`yy-about-card ${card.className}`}
                spotlightColor={card.color}
              >
                <div className="yy-about-card-content">
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

      </section>


      {/* =====================================================
          Scene 3 — now
          ===================================================== */}

      <section className="yy-about-now">

        <motion.div
          className="yy-about-now-panel"
          initial={{
            opacity: 0,
            y: 44
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.25
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1]
          }}
        >

          <div className="yy-about-now-accent" />

          <motion.h2
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.15
            }}
          >
            现在的我，还在一边试错，一边往前走。
          </motion.h2>

          <div className="yy-about-now-copy">

            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.18 }}
            >
              学习嵌入式、计算机相关技术
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.28 }}
            >
              参加了相关计算机社团和机器人社团
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.38 }}
            >
              正在参与“基于质量感知与本地大模型代理的心电智能辅助分析系统”大学生创新项目，也参加了电子信息类新生创客大赛。
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.48 }}
            >
              接下来还想继续挑战华为 ICT 创新赛，也想把更多想法从“我觉得这个挺有意思”，真正变成“我把它做出来了”。
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.58 }}
            >
              我还没有完全想清楚未来一定走哪条路，但我很确定一件事：
            </motion.p>

            <motion.p
              className="yy-about-now-emphasis"
              initial={{
                opacity: 0,
                y: 18
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.68,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              我并不确定未来一定走哪条路，但我希望自己永远保留学习新东西、动手做东西、以及对未知保持好奇心的能力
            </motion.p>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          Scene 4 — explore
          ===================================================== */}

      <section className="yy-about-explore">

        <motion.div
          className="yy-about-explore-copy"
          initial={{
            opacity: 0,
            y: 36
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.3
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >

          <h2>
            <span>我很喜欢</span>
            <span>探索这个词</span>
          </h2>

          <p>
            它可以是第一次写出一个真正能跑起来的项目，也可以是走进一条没走过的山路，是镜头里偶然出现的一束光，是终于弹顺的一段和弦，也是某天突然发现，自己正在慢慢变成以前想成为的人。
          </p>

        </motion.div>


        <motion.div
          className="yy-about-explore-orb"
          initial={{
            opacity: 0,
            scale: 0.78
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true,
            amount: 0.25
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          aria-hidden="true"
        >
          <div className="yy-about-explore-orb-core" />
          <div className="yy-about-explore-ring yy-about-explore-ring-one" />
          <div className="yy-about-explore-ring yy-about-explore-ring-two" />
        </motion.div>

      </section>


      {/* =====================================================
          Scene 5 — ending
          ===================================================== */}

      <section className="yy-about-ending">

        <motion.div
          className="yy-about-ending-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.5
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.35
              }
            }
          }}
        >

          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 28
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
          >
            用技术丈量未知，用目光收藏世界。
          </motion.p>

          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 28
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
          >
            去走远一点，也去成为更辽阔的人。
          </motion.p>

        </motion.div>

      </section>

    </main>
  )
}

export default AboutPage