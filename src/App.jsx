import { motion } from 'framer-motion';
import Header from './components/Header';
import MainSections from './components/MainSections';
import NewsSection from './components/NewsSection';
import './App.css';

function App() {
  return (
    <motion.div 
      className="App"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <main>
        <MainSections />
        <NewsSection />
      </main>
    </motion.div>
  );
}

export default App;
