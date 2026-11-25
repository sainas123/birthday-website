import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const decorations = [
  { text: '💀', className: 'cover-float c-deco-1' },
  { text: '😭', className: 'cover-float c-deco-2' },
  { text: '🤡', className: 'cover-float c-deco-3' },
  { text: '🗿', className: 'cover-float c-deco-4' },
  { text: '🧍', className: 'cover-float c-deco-5' },
  { text: '⚠️', className: 'cover-float c-deco-6' },
  { text: '✦', className: 'cover-spark c-deco-7' },
  { text: '✧', className: 'cover-spark c-deco-8' },
  { text: 'BRAIN CELLS NOT FOUND', className: 'cover-sticker c-sticker-1' },
  { text: 'ERROR 404: NORMALITY NOT FOUND', className: 'cover-sticker c-sticker-2' },
  { text: 'WHAT DID YOU JUST CLICK?', className: 'cover-sticker c-sticker-3' },
  { text: 'HELP', className: 'cover-sticker c-sticker-4' },
  { text: 'ABSOLUTE CINEMA', className: 'cover-sticker c-sticker-5' },
  { text: 'NO THOUGHTS HEAD EMPTY', className: 'cover-sticker c-sticker-6' },
];
const statusMessages = [
  'System status: 3 brain cells remaining.',
  'System status: one brain cell buffering…',
  'System status: raccoon at the controls.',
  'System status: normality.exe has crashed.',
];

/** Pass imageSrc to swap the cover specimen without editing this component. */
export default function LandingPage({ onEnter, imageSrc = '/assets/naruto-specimen.png' }) {
  const reduceMotion = useReducedMotion();
  const [statusIndex, setStatusIndex] = useState(0);
  const [warningShake, setWarningShake] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setStatusIndex(index => (index + 1) % statusMessages.length), 3000);
    return () => window.clearInterval(timer);
  }, []);

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    window.setTimeout(() => onEnter?.(), 240);
  };

  return (
    <main className="cover-page page-noise">
      <div className="cover-scanlines" aria-hidden="true" />
      <div className="cover-pixels" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="cover-decorations" aria-hidden="true">
        {decorations.map((item, index) => (
          <motion.span
            key={item.className}
            className={item.className}
            animate={reduceMotion ? undefined : { y: [0, index % 2 ? -11 : 9, 0], rotate: [0, index % 2 ? 9 : -8, 0], opacity: item.text.startsWith('✦') || item.text.startsWith('✧') ? [.5, 1, .5] : [1, .88, 1] }}
            transition={{ duration: 3.5 + index % 4, delay: index * .12, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
          >{item.text}</motion.span>
        ))}
      </div>

      <div className="cover-layout">
        <motion.button
          type="button"
          className="cover-warning"
          onClick={() => { setWarningShake(true); window.setTimeout(() => setWarningShake(false), 550); }}
          animate={warningShake && !reduceMotion ? { x: [0, -8, 8, -6, 6, 0], rotate: [0, -1.5, 1.5, 0] } : undefined}
          transition={{ duration: .42 }}
          aria-label="Warning banner. Click for a brief nonsense alert."
        >
          <span aria-hidden="true">⚠️</span> WARNING: UNAUTHORIZED LEVELS OF NONSENSE DETECTED <span aria-hidden="true">⚠️</span>
        </motion.button>

        <motion.header className="cover-heading" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: 'easeOut' }}>
          <p className="cover-kicker">UNOFFICIAL INTERNET INCIDENT REPORT · 2003–2026</p>
          <h1><span>YOU HAVE</span><br/><em>BEEN</em> <strong>WARNED.</strong></h1>
        </motion.header>

        <motion.p className="cover-description" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .035, delayChildren: .22 } } }}>
          {'The following website contains questionable images, unnecessary chaos, severe brainrot and absolutely no educational value.'.split(' ').map((word, index, words) => (
            <motion.span key={`${word}-${index}`} variants={{ hidden: { opacity: 0, y: 7 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: .2 }}>{word}{index < words.length - 1 ? ' ' : ''}</motion.span>
          ))}
        </motion.p>

        <motion.figure
          className="cover-specimen"
          initial={{ opacity: 0, scale: .82, rotate: -5 }}
          animate={reduceMotion ? { opacity: 1, scale: 1, rotate: -2 } : { opacity: 1, scale: 1, rotate: [-2, -1, -2], y: [0, -9, 0] }}
          transition={reduceMotion ? { duration: .35 } : { opacity: { duration: .55, delay: .12 }, scale: { type: 'spring', stiffness: 130, damping: 13 }, rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
          whileHover={reduceMotion ? undefined : { scale: 1.035, rotate: 1, transition: { duration: .2 } }}
        >
          <span className="cover-specimen-label">SPECIMEN #001 <b>• OBSERVED</b></span>
          <div className="cover-image-frame"><img src={imageSrc} alt="Confused anime specimen, image supplied for the birthday cover"/></div>
          <figcaption>Exhibit A: bro has detected the incoming nonsense.</figcaption>
          <span className="cover-corner-mark" aria-hidden="true">JPEG<br/>2003</span>
        </motion.figure>

        <motion.button
          type="button"
          className="cover-enter"
          onClick={handleEnter}
          whileHover={reduceMotion ? undefined : { scale: 1.055, rotate: [-1, 1, -1], boxShadow: '0 0 44px rgba(255,79,163,.9)' }}
          whileTap={reduceMotion ? undefined : { scale: .94, rotate: -2 }}
          animate={entering && !reduceMotion ? { scale: [1, 1.08, .96], rotate: [0, -2, 2, 0] } : undefined}
          transition={{ duration: .24 }}
          disabled={entering}
        >
          {entering ? 'INITIATING NONSENSE…' : <>ENTER AT YOUR OWN RISK <ArrowRight size={20} strokeWidth={3}/></>}
        </motion.button>

        <div className="cover-status" role="status" aria-live="polite"><span className="cover-status-light"/>{statusMessages[statusIndex]}<span className="cover-loading">[ LOADING??? ]</span></div>
      </div>

      <footer className="cover-footer">
        <span>By entering, you acknowledge that we are not responsible for any emotional damage, loss of brain cells or questionable life decisions.</span>
        <span>© 2026 The Department of Unnecessary Nonsense.</span>
      </footer>
    </main>
  );
}
