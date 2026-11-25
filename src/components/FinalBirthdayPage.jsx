import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { cakeIncidentVideo } from '../birthdayData.js';
const confetti = ['✦','✧','✿','✧','★','✦','✳','✿','✧','✦','★','✦'];
export default function FinalBirthdayPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  return <main className="final-page page-noise">
    <div className="confetti" aria-hidden="true">{confetti.map((mark, i) => <motion.span key={i} style={{ left: `${(i * 17 + 4) % 100}%`, color: ['#C6FF4A','#477BFF','#B9A3FF','#F5F2FF'][i % 4] }} animate={reduceMotion ? undefined : { y: ['-8vh','108vh'], rotate: [0, 220], x: [0, i % 2 ? 25 : -25] }} transition={{ duration: 5 + i % 4, repeat: reduceMotion ? 0 : Infinity, delay: i * .43, ease: 'linear' }}>{mark}</motion.span>)}</div>
    <motion.div className="final-content" initial={{ opacity: 0, scale: reduceMotion ? 1 : .8, y: reduceMotion ? 0 : 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', bounce: .4, duration: .9 }}>
      <p className="eyebrow"><Sparkles size={16}/> PLOT TWIST: WE CARE <Sparkles size={16}/></p>
      <h1>HAPPY<br/><span>BIRTHDAY!</span></h1>
      <div className="final-image final-video-wrap"><video className="final-birthday-video" src={cakeIncidentVideo} controls autoPlay playsInline preload="metadata" aria-label="Birthday wishes video"/></div>
      <p className="love-note">We love you in spite of all this. <Heart size={22} fill="currentColor"/></p>
      <motion.button className="back-button" onClick={onBack} whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: .96 }}><ArrowLeft size={17}/> BACK TO THE NONSENSE</motion.button>
    </motion.div>
    <div className="final-sticker">CERTIFIED<br/>LOVED ★</div>
  </main>;
}
