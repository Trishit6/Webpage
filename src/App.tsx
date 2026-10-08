import { motion } from 'framer-motion'
import Scene from './Scene'

const features = [
  {
    title: 'Real-time 3D',
    body: 'An interactive WebGL scene rendered with three.js and React Three Fiber. Hover the core to feel it react.',
    accent: '#8b5cf6',
  },
  {
    title: 'Motion everywhere',
    body: 'Scroll-triggered reveals, spring physics, and staggered entrances powered by Framer Motion.',
    accent: '#22d3ee',
  },
  {
    title: 'Fast by default',
    body: 'Vite dev server, pnpm workspaces, and TypeScript strict mode keep iteration instant.',
    accent: '#f472b6',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export default function App() {
  return (
    <div className="page">
      {/* Hero: fullscreen 3D canvas with overlaid text */}
      <section className="hero">
        <Scene />
        <div className="hero-overlay">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            Dimension
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            A 3D experience built with React Three Fiber &amp; Framer Motion
          </motion.p>
          <motion.a
            href="#features"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="cta"
          >
            Explore ↓
          </motion.a>
        </div>
      </section>

      {/* Feature cards with staggered scroll reveals */}
      <section id="features" className="features">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          custom={0}
        >
          Why it feels different
        </motion.h2>
        <div className="cards">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              className="card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -8, boxShadow: `0 20px 40px -16px ${f.accent}55` }}
            >
              <span className="dot" style={{ background: f.accent }} />
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Big statement with scroll-linked parallax */}
      <section className="statement">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          “The web is no longer flat.”
        </motion.blockquote>
      </section>

      <footer className="footer">
        <p>Built with pnpm · Vite · React · three.js · Framer Motion</p>
      </footer>
    </div>
  )
}
