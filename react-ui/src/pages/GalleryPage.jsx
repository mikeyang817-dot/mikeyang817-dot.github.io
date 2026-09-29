import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import SoftAurora from '../components/SoftAurora'
import './gallery.css'

function parseCsvLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

function parseManifest(text) {
  const cleanText = text.replace(/^\uFEFF/, '').trim()
  const lines = cleanText.split(/\r?\n/).filter(Boolean)

  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0])

  if (!headers.includes('序号') || !headers.includes('缩略图文件名')) {
    throw new Error('gallery-manifest.csv 内容不正确，请检查 public/gallery-preview/ 路径。')
  }

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line)
    const row = {}

    headers.forEach((header, index) => {
      row[header] = values[index] ?? ''
    })

    return row
  })
}

function formatDate(dateString) {
  if (!dateString) return ''
  return dateString.split(' ')[0].replaceAll('-', '.')
}

function getYear(dateString) {
  return dateString?.slice(0, 4) || ''
}

function getMonth(dateString) {
  return dateString?.slice(5, 7) || ''
}

function buildTimeBands(photos, maxPerBand = 10) {
  const bands = []
  let current = []
  let currentYear = ''

  photos.forEach((photo) => {
    const year = getYear(photo.shotAt)

    const shouldBreak =
      current.length > 0 &&
      (
        year !== currentYear ||
        current.length >= maxPerBand
      )

    if (shouldBreak) {
      bands.push(current)
      current = []
    }

    current.push(photo)
    currentYear = year
  })

  if (current.length) {
    bands.push(current)
  }

  return bands
}

function getBandLabel(band) {
  if (!band.length) return ''

  const first = band[0]
  const last = band[band.length - 1]

  const y1 = getYear(first.shotAt)
  const y2 = getYear(last.shotAt)
  const m1 = getMonth(first.shotAt)
  const m2 = getMonth(last.shotAt)

  if (y1 === y2 && m1 === m2) {
    return `${y1}.${m1}`
  }

  if (y1 === y2) {
    return `${y1}.${m1} — ${m2}`
  }

  return `${y1}.${m1} — ${y2}.${m2}`
}

function MiniDecoration({ type }) {
  if (type === 'flower') {
    return (
      <div className="yy-band-mini-decor yy-band-mini-flower" aria-hidden="true">
        <span className="petal p1" />
        <span className="petal p2" />
        <span className="petal p3" />
        <span className="petal p4" />
        <span className="petal p5" />
        <i />
      </div>
    )
  }

  if (type === 'gull') {
    return (
      <div className="yy-band-mini-decor yy-band-mini-gull" aria-hidden="true">
        <svg viewBox="0 0 90 36">
          <path d="M3 25 Q14 11 26 24 Q38 11 50 25" />
          <path d="M54 18 Q63 8 72 18 Q80 9 88 19" />
        </svg>
      </div>
    )
  }

  if (type === 'bear') {
    return (
      <div className="yy-band-mini-decor yy-band-mini-bear" aria-hidden="true">
        <span className="ear e1" />
        <span className="ear e2" />
        <span className="face">
          <i className="eye eye1" />
          <i className="eye eye2" />
          <i className="nose" />
        </span>
      </div>
    )
  }

  return (
    <div className="yy-band-mini-decor yy-band-mini-night" aria-hidden="true">
      <span className="moon" />
      <span className="star s1">✦</span>
      <span className="star s2">✧</span>
    </div>
  )
}

function FloatingAccent({ kind, className = '' }) {
  if (kind === 'flower') {
    return (
      <div className={`yy-gallery-accent yy-accent-flower ${className}`} aria-hidden="true">
        <span className="petal p1" />
        <span className="petal p2" />
        <span className="petal p3" />
        <span className="petal p4" />
        <span className="petal p5" />
        <i />
      </div>
    )
  }

  if (kind === 'rainbow') {
    return (
      <div className={`yy-gallery-accent yy-accent-rainbow ${className}`} aria-hidden="true">
        <span className="arc a1" />
        <span className="arc a2" />
        <span className="arc a3" />
      </div>
    )
  }

  if (kind === 'gull') {
    return (
      <div className={`yy-gallery-accent yy-accent-gull ${className}`} aria-hidden="true">
        <svg viewBox="0 0 110 48">
          <path d="M4 31 Q17 16 31 31 Q45 16 59 31" />
          <path d="M63 23 Q74 11 86 23 Q97 11 106 24" />
        </svg>
      </div>
    )
  }

  if (kind === 'wave') {
    return (
      <div className={`yy-gallery-accent yy-accent-wave ${className}`} aria-hidden="true">
        <svg viewBox="0 0 130 44">
          <path d="M2 25 C14 12 24 12 36 25 S58 38 72 24 S97 10 112 24 S123 38 128 28" />
          <path d="M18 34 C29 23 40 22 51 33 S75 42 91 31 S116 20 127 27" />
        </svg>
      </div>
    )
  }

  if (kind === 'bear') {
    return (
      <div className={`yy-gallery-accent yy-accent-bear ${className}`} aria-hidden="true">
        <span className="ear e1" />
        <span className="ear e2" />
        <span className="face">
          <i className="eye eye1" />
          <i className="eye eye2" />
          <i className="nose" />
        </span>
      </div>
    )
  }

  return (
    <div className={`yy-gallery-accent yy-accent-night ${className}`} aria-hidden="true">
      <span className="moon" />
      <span className="star s1">✦</span>
      <span className="star s2">✧</span>
      <span className="star s3">✦</span>
    </div>
  )
}

function getLargeAccentForBand(bandIndex) {
  const plan = {
    1: { kind: 'flower', className: 'yy-large-accent yy-large-accent-right-lower' },
    2: { kind: 'rainbow', className: 'yy-large-accent yy-large-accent-left-mid' },
    4: { kind: 'wave', className: 'yy-large-accent yy-large-accent-right-mid' },
    5: { kind: 'night', className: 'yy-large-accent yy-large-accent-left-lower' },
    7: { kind: 'gull', className: 'yy-large-accent yy-large-accent-center-lower' },
    8: { kind: 'bear', className: 'yy-large-accent yy-large-accent-right-lower' },
    10: { kind: 'rainbow', className: 'yy-large-accent yy-large-accent-left-mid' }
  }

  return plan[bandIndex] || null
}

function GalleryPage() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadManifest() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('/gallery-preview/gallery-manifest.csv', {
          cache: 'no-store'
        })

        if (!response.ok) {
          throw new Error(`manifest 请求失败：${response.status}`)
        }

        const text = await response.text()
        const rows = parseManifest(text)

        const parsed = rows
          .map((row) => ({
            id: Number(row['序号']),
            originalName: row['原文件名'],
            previewName: row['缩略图文件名'],
            shotAt: row['拍摄时间'],
            width: Number(row['宽度']),
            height: Number(row['高度'])
          }))
          .filter((photo) => Number.isFinite(photo.id) && photo.previewName)
          .sort((a, b) => a.id - b.id)
          .map((photo, index) => ({
            ...photo,
            globalIndex: index
          }))

        if (!cancelled) {
          setPhotos(parsed)
        }
      } catch (err) {
        console.error(err)

        if (!cancelled) {
          setError(err.message || '相册读取失败')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadManifest()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + photos.length) % photos.length
        )
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current + 1) % photos.length
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIndex, photos.length])

  const activePhoto = useMemo(() => {
    if (activeIndex === null) return null
    return photos[activeIndex] ?? null
  }, [activeIndex, photos])

  const timeBands = useMemo(
    () => buildTimeBands(photos, 10),
    [photos]
  )

  const previousPhoto = () => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + photos.length) % photos.length
    )
  }

  const nextPhoto = () => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + 1) % photos.length
    )
  }

  const decorTypes = ['flower', 'gull', 'night', 'bear']

  return (
    <main className="yy-gallery-page">
      <div className="yy-gallery-dynamic-bg" aria-hidden="true">
        <SoftAurora
          speed={0.28}
          scale={1.42}
          brightness={0.72}
          color1="#c8d8ee"
          color2="#ead6df"
          noiseFrequency={2.25}
          noiseAmplitude={0.72}
          bandHeight={0.42}
          bandSpread={1.55}
          octaveDecay={0.22}
          layerOffset={0.9}
          colorSpeed={0.42}
          enableMouseInteraction={true}
          mouseInfluence={0.11}
          lightMode={true}
        />
      </div>
      <a className="yy-gallery-floating-back" href="/life/">
        <span>←</span>
        返回生活
      </a>

      <section className="yy-gallery-hero">
        <div className="yy-gallery-hero-top">
          <span className="yy-gallery-eyebrow">SELECTED PHOTOS</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          相册精选
        </motion.h1>

        <div className="yy-gallery-intro-row">
          <p>
            让照片自己说话，也给每一段记忆留一点呼吸的空间。
          </p>

          <div className="yy-gallery-count">
            <strong>{photos.length || '—'}</strong>
            <span>PHOTOS</span>
          </div>
        </div>
      </section>

      <section className="yy-gallery-content">
        {loading && (
          <div className="yy-gallery-state">正在整理照片…</div>
        )}

        {!loading && error && (
          <div className="yy-gallery-state yy-gallery-error">
            <strong>相册读取失败</strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && photos.length !== 113 && (
          <div className="yy-gallery-warning">
            当前读取到 {photos.length} 张，预期应为 113 张。
          </div>
        )}

        {!loading && !error && (
          <div className="yy-gallery-timebands">
            {timeBands.map((band, bandIndex) => {
              const firstYear = getYear(band[0]?.shotAt)
              const previousYear = getYear(timeBands[bandIndex - 1]?.[0]?.shotAt)
              const isNewYear = bandIndex === 0 || firstYear !== previousYear
              return (
                <motion.section
                  className="yy-gallery-timeband"
                  key={`${firstYear}-${bandIndex}`}
                  initial={{
                    opacity: 0,
                    y: 40
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true,
                    amount: 0.12
                  }}
                  transition={{
                    opacity: {
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    y: {
                      duration: 1.6,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    delay: 0.08
                  }}
                >
                  {getLargeAccentForBand(bandIndex) && (
                    <FloatingAccent
                      kind={getLargeAccentForBand(bandIndex).kind}
                      className={getLargeAccentForBand(bandIndex).className}
                    />
                  )}
                  <div className="yy-gallery-band-head">
                    <div className="yy-gallery-band-copy">
                      {isNewYear && (
                        <span className="yy-gallery-year">
                          {firstYear}
                        </span>
                      )}

                      <span className="yy-gallery-band-range">
                        {getBandLabel(band)}
                      </span>
                    </div>

                    {bandIndex > 0 && bandIndex % 3 === 0 && (
                      <MiniDecoration
                        type={decorTypes[Math.floor(bandIndex / 3) % decorTypes.length]}
                      />
                    )}
                  </div>

                  <div
                    className={`yy-gallery-masonry yy-gallery-masonry-pattern-${bandIndex % 3}`}
                  >
                    {band.map((photo, indexInBand) => {
                      const ratio =
                        photo.width && photo.height
                          ? photo.width / photo.height
                          : 1

                      const isPortrait = ratio < 0.82
                      const isLandscape = ratio > 1.28
                      const isSquare = !isPortrait && !isLandscape

                      const sizeClass = isPortrait
                        ? indexInBand % 3 === 0
                          ? 'size-portrait-medium'
                          : 'size-portrait-compact'
                        : isLandscape
                          ? indexInBand % 4 === 0
                            ? 'size-landscape-prominent'
                            : 'size-landscape-normal'
                          : indexInBand % 4 === 0
                            ? 'size-square-medium'
                            : 'size-square-normal'

                      const gapDecorType =
                        photo.globalIndex % 19 === 5
                          ? 'flower'
                          : photo.globalIndex % 23 === 8
                            ? 'gull'
                            : photo.globalIndex % 29 === 11
                              ? 'night'
                              : photo.globalIndex % 31 === 14
                                ? 'bear'
                                : photo.globalIndex % 37 === 16
                                  ? 'rainbow'
                                  : photo.globalIndex % 41 === 18
                                    ? 'wave'
                                    : null

                      return (
                        <div
                          className="yy-gallery-flow-item"
                          key={photo.id}
                        >
                          <button
                            type="button"
                            className={[
                              'yy-gallery-photo-card',
                              isPortrait ? 'is-portrait' : '',
                              isLandscape ? 'is-landscape' : '',
                              isSquare ? 'is-square' : '',
                              sizeClass
                            ].filter(Boolean).join(' ')}
                            onClick={() => setActiveIndex(photo.globalIndex)}
                            aria-label={`查看第 ${photo.id} 张照片`}
                          >
                            <span className="yy-gallery-mat">
                              <img
                                src={`/gallery-preview/${encodeURIComponent(photo.previewName)}`}
                                alt=""
                                loading={photo.globalIndex < 8 ? 'eager' : 'lazy'}
                                decoding="async"
                              />
                            </span>

                            <span className="yy-gallery-photo-meta">
                              <span className="yy-gallery-photo-number">
                                {String(photo.id).padStart(3, '0')}
                              </span>

                              <span className="yy-gallery-photo-date">
                                {formatDate(photo.shotAt)}
                              </span>
                            </span>
                          </button>

                          {gapDecorType && (
                            <FloatingAccent
                              kind={gapDecorType}
                              className={`yy-gap-accent ${
                                photo.globalIndex % 2 === 0
                                  ? 'yy-gap-accent-left'
                                  : 'yy-gap-accent-right'
                              }`}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </motion.section>
              )
            })}
          </div>
        )}
      </section>

      {activePhoto && (
        <div
          className="yy-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="照片预览"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="yy-lightbox-close"
            onClick={() => setActiveIndex(null)}
            aria-label="关闭"
          >
            ×
          </button>

          <button
            type="button"
            className="yy-lightbox-nav yy-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation()
              previousPhoto()
            }}
            aria-label="上一张"
          >
            ←
          </button>

          <div
            className="yy-lightbox-stage"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={`/gallery-original/${encodeURIComponent(activePhoto.originalName)}`}
              alt=""
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src =
                  `/gallery-preview/${encodeURIComponent(activePhoto.previewName)}`
              }}
            />

            <div className="yy-lightbox-meta">
              <span>
                {String(activePhoto.id).padStart(3, '0')} / {photos.length}
              </span>

              <span>{formatDate(activePhoto.shotAt)}</span>
            </div>
          </div>

          <button
            type="button"
            className="yy-lightbox-nav yy-lightbox-next"
            onClick={(event) => {
              event.stopPropagation()
              nextPhoto()
            }}
            aria-label="下一张"
          >
            →
          </button>
        </div>
      )}
    </main>
  )
}

export default GalleryPage
