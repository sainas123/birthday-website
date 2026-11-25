import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage.jsx';
import GiftSelection from './components/GiftSelection.jsx';
import GiftReveal from './components/GiftReveal.jsx';
import FinalBirthdayPage from './components/FinalBirthdayPage.jsx';
import { gifts } from './birthdayData.js';
import './style.css';
function App() {
  const [page, setPage] = useState('landing');
  const [selectedGift, setSelectedGift] = useState(null);
  const openGift = gift => { setSelectedGift(gift); setPage('reveal'); };
  return <AnimatePresence mode="wait">
    <motion.div className="app-shell" key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .24 }}>
      {page === 'landing' && <LandingPage onEnter={() => setPage('gifts')}/>}
      {page === 'gifts' && <GiftSelection gifts={gifts} onOpen={openGift} onFinal={() => setPage('final')}/>}
      {page === 'reveal' && selectedGift && <GiftReveal gift={selectedGift} onBack={() => setPage('gifts')}/>}
      {page === 'final' && <FinalBirthdayPage onBack={() => setPage('gifts')}/>}
    </motion.div>
  </AnimatePresence>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
