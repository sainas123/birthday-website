import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

const impactMarks = ['✦', '✧', '✳', '※', '★', '✦', '✧', '✳'];

export default function GiftReveal({ gift, onBack }) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="cat-reveal page-noise">
      {gift.voiceCueVideoId && <iframe
        className="meme-voice-player"
        src={`https://www.youtube-nocookie.com/embed/${gift.voiceCueVideoId}?autoplay=1&controls=0&playsinline=1&rel=0`}
        title={`Meme voice cue for ${gift.title}`}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
      />}
      <div className="reveal-comic-rays" aria-hidden="true"/>
      <div className="reveal-impact-marks" aria-hidden="true">
        {impactMarks.map((mark, i) => <motion.span key={i} style={{ '--mark-index': i }} animate={reduceMotion ? undefined : { rotate: [0, i % 2 ? 15 : -15, 0], scale: [1, 1.13, 1], opacity: [.38, .85, .38] }} transition={{ duration: 3 + i % 3, repeat: reduceMotion ? 0 : Infinity, delay: i * .16 }}>{mark}</motion.span>)}
      </div>
      <motion.div className="cat-reveal-content" key={gift.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.p className="reveal-overline" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}><Sparkles size={15}/> SURPRISE INCIDENT: {gift.id.toUpperCase()} <Sparkles size={15}/></motion.p>
        <div className="reveal-stage">
          <motion.span className="reveal-baam" aria-hidden="true" initial={{ scale: .1, rotate: -15, opacity: 0 }} animate={{ scale: [0.1, 1.18, 1], rotate: [-15, 5, 0], opacity: [0, 1, .92] }} transition={reduceMotion ? { duration: .2 } : { duration: .72, times: [0, .58, 1], type: 'spring', bounce: .55, stiffness: 150 }}>
            BAAM!
          </motion.span>
          <motion.div className="reveal-image-halo" initial={reduceMotion ? false : { scale: .5, opacity: 0 }} animate={reduceMotion ? undefined : { scale: [0.5, 1.08, 1], opacity: [0, 1, 1], rotate: [0, 9, 0] }} transition={{ duration: .7, type: 'spring' }}>
            {gift.revealImageReady ? (
              <motion.img className="reveal-photo" src={gift.revealImage} alt={`Reveal for ${gift.title}`} initial={reduceMotion ? false : { scale: .5, rotate: 9, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={reduceMotion ? { duration: .2 } : { type: 'spring', stiffness: 190, damping: 11, delay: .06 }}/>
            ) : (
              <div className="reveal-image-placeholder" role="img" aria-label={`Placeholder for ${gift.revealImage}`}>
                <span className="reveal-placeholder-cross">✳</span>
                <span>REVEAL IMAGE<br/><b>GOES HERE</b></span>
                <small>{gift.revealImage}</small>
              </div>
            )}
          </motion.div>
        </div>
        <motion.p className="cat-reveal-caption" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .25 }}>{gift.caption}</motion.p>
        <motion.button className="cat-back-button" onClick={onBack} whileHover={reduceMotion ? undefined : { scale: 1.045, x: -3 }} whileTap={reduceMotion ? undefined : { scale: .96 }}>
          <ArrowLeft size={17}/> BACK TO THE NONSENSE
        </motion.button>
      </motion.div>
      <span className="reveal-corner-note">NO NEXT BUTTON<br/>WE HAVE STANDARDS*</span>
    </main>
  );
}
