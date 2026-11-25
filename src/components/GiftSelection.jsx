import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles, TriangleAlert } from 'lucide-react';
const dances = [
  { y: [0, -12, 0, -7, 1, 0], rotate: [0, -10, 9, -8, 4, 0], scaleX: [1, .94, 1.07, .97, 1.04, 1], scaleY: [1, 1.1, .91, 1.07, .94, 1] },
  { y: [0, -8, -14, 2, 0], rotate: [0, 8, -9, 7, 0], scaleX: [1, 1.06, .94, 1.05, 1], scaleY: [1, .94, 1.1, .96, 1] },
  { y: [0, -14, 2, -9, 0], rotate: [0, -7, 10, -5, 0], scaleX: [1, .92, 1.08, .98, 1], scaleY: [1, 1.12, .9, 1.05, 1] },
];

export default function GiftSelection({ gifts, onOpen, onFinal }) {
  const reduceMotion = useReducedMotion();
  const [dancingId, setDancingId] = useState(null);
  const [openingId, setOpeningId] = useState(null);

  const chooseGift = gift => {
    if (openingId) return;
    setDancingId(gift.id);
    setOpeningId(gift.id);
    window.setTimeout(() => onOpen(gift), reduceMotion ? 0 : 210);
  };

  return (
    <main className="cat-selection page-noise">
      <div className="cat-backdrop" aria-hidden="true">
        {['✦', '✧', '※', '★', '!', '✦', '·', '✳'].map((mark, i) => (
          <motion.span key={i} className={`cat-sparkle cat-sparkle-${i + 1}`} animate={reduceMotion ? undefined : { y: [0, i % 2 ? -9 : 8, 0], rotate: [0, i % 2 ? 20 : -20, 0], opacity: [.45, 1, .45] }} transition={{ duration: 3.2 + i % 3, repeat: reduceMotion ? 0 : Infinity, delay: i * .22 }}>
            {mark}
          </motion.span>
        ))}
      </div>

      <header className="cat-topbar">
        <span className="cat-site-id">THE UNNECESSARY INTERNET · EST. 2003-ish</span>
        <span className="cat-live"><i/> LIVE CAT FEED</span>
      </header>

      <section className="cat-heading">
        <motion.p className="cat-pretitle" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}><TriangleAlert size={13}/> SELECT YOUR PROBLEM</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: 'spring', bounce: .35 }}>
          <span className="cat-heading-prefix">WELCOME TO THE</span> <span>NONSENSE.</span>
        </motion.h1>
        <motion.p className="cat-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .18 }}>
          Some questionable surprises have been prepared for you. Choose wisely. Or don't.
        </motion.p>
        <motion.span className="cat-warning-tag" animate={reduceMotion ? undefined : { rotate: [-3, 3, -3], y: [0, -2, 0] }} transition={{ duration: 2.4, repeat: reduceMotion ? 0 : Infinity }}>
          WARNING: CAT ACTIVITY DETECTED
        </motion.span>
      </section>

      <div className="cat-chatter" aria-hidden="true">
        <span>100% QUESTIONABLE CONTENT</span>
        <span>WHAT COULD POSSIBLY GO WRONG?</span>
        <span>NO REFUNDS</span>
      </div>

      <section className="cat-grid" aria-label="Choose a cat surprise">
        {gifts.map((gift, i) => {
          const dancing = dancingId === gift.id;
          const dance = dances[i % dances.length];
          return (
            <motion.button
              key={gift.id}
              type="button"
              className={`cat-option cat-option-${i + 1}${dancing ? ' is-dancing' : ''}`}
              onClick={() => chooseGift(gift)}
              onHoverStart={() => setDancingId(gift.id)}
              onHoverEnd={() => { if (!openingId) setDancingId(null); }}
              onFocus={() => setDancingId(gift.id)}
              onBlur={() => { if (!openingId) setDancingId(null); }}
              initial={{ opacity: 0, y: 24, rotate: i % 2 ? 5 : -4 }}
              animate={dancing && !reduceMotion
                ? { ...dance, opacity: 1 }
                : { opacity: 1, y: 0, rotate: i % 2 ? 2 : -2, scaleX: 1, scaleY: 1 }}
              transition={dancing && !reduceMotion
                ? { duration: .62 + (i % 3) * .08, repeat: Infinity, ease: 'easeInOut' }
                : { delay: i * .07, type: 'spring', stiffness: 160, damping: 14 }}
              whileHover={reduceMotion ? undefined : { scale: 1.035 }}
              whileTap={reduceMotion ? undefined : { scale: .94 }}
              disabled={Boolean(openingId)}
              aria-label={`Open surprise ${i + 1}`}
            >
              <span className="cat-image-stage">
                <img className="cat-cutout" src={gift.catImage} alt={gift.title} draggable="false"/>
                {dancing && !reduceMotion && <motion.span className="cat-music-note" aria-hidden="true" initial={{ opacity: 0, scale: .6, y: 8 }} animate={{ opacity: [0, 1, 0], scale: [0.7, 1.1, 1], y: [8, -16, -26], rotate: [0, 14, -9] }} transition={{ duration: .72, repeat: Infinity }}>{i % 2 ? '♫' : '♪'}</motion.span>}
              </span>
              <span className="cat-option-sub">{dancing ? 'THE CAT IS AWARE' : 'CLICK TO OPEN THE INCIDENT'} <ArrowUpRight size={12}/></span>
            </motion.button>
          );
        })}
        <motion.button type="button" className="cat-option cat-final-option" onClick={onFinal} initial={{ opacity: 0, y: 24, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: -1 }} transition={{ delay: gifts.length * .07, type: 'spring', stiffness: 160, damping: 14 }} whileHover={reduceMotion ? undefined : { y: -7, rotate: 2, scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: .94 }}>
          <span className="cat-cake-stage" aria-hidden="true">
            <span className="cake-icon" role="img" aria-label="Cake">🎂</span>
            <Sparkles className="cake-spark" size={20}/>
          </span>
          <span className="cat-option-title">THE CAKE INCIDENT</span>
          <span className="cat-option-sub">ABSOLUTELY FINAL · PROBABLY <ArrowUpRight size={12}/></span>
        </motion.button>
      </section>

      <footer className="cat-footer">
        <span>100% QUESTIONABLE CONTENT · NO REFUNDS · WHAT COULD POSSIBLY GO WRONG?</span>
        <span>© THE DEPARTMENT OF CAT NONSENSE</span>
      </footer>
    </main>
  );
}
