import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { PredictorPage } from './pages/PredictorPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { VisualizerPage } from './pages/VisualizerPage';
import { AboutPage } from './pages/AboutPage';
import { 
  GraduationCap, 
  Home, 
  Sliders, 
  BookOpen, 
  Workflow, 
  Info
} from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => setCurrentPage('home')}>
            <div className="brand-icon">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="brand-title">Student Performance Predictor</div>
              <div className="brand-subtitle">Forward Propagation in Machine Learning</div>
            </div>
          </div>

          <nav className="nav-links">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              <Home size={16} /> Home
            </button>
            <button 
              className={`nav-link ${currentPage === 'predictor' ? 'active' : ''}`}
              onClick={() => setCurrentPage('predictor')}
            >
              <Sliders size={16} /> Predictor
            </button>
            <button 
              className={`nav-link ${currentPage === 'how-it-works' ? 'active' : ''}`}
              onClick={() => setCurrentPage('how-it-works')}
            >
              <BookOpen size={16} /> How It Works
            </button>
            <button 
              className={`nav-link ${currentPage === 'visualizer' ? 'active' : ''}`}
              onClick={() => setCurrentPage('visualizer')}
            >
              <Workflow size={16} /> Visualizer
            </button>
            <button 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => setCurrentPage('about')}
            >
              <Info size={16} /> About
            </button>
          </nav>
        </div>
      </header>

      {/* Main Dynamic View */}
      <main className="main-content">
        {currentPage === 'home' && <HomePage onNavigate={(p) => setCurrentPage(p)} />}
        {currentPage === 'predictor' && <PredictorPage onNavigateToVisualizer={() => setCurrentPage('visualizer')} />}
        {currentPage === 'how-it-works' && <HowItWorksPage />}
        {currentPage === 'visualizer' && <VisualizerPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <strong>Student Performance Prediction using Forward Propagation</strong>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
              Academic College Project • Educational Machine Learning Demonstration
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Presentation: <code>Student_Performance_Prediction_Forward_Propagation.pptx</code> (8 Slides)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
