import React from 'react';
import { 
  GraduationCap, 
  Binary, 
  Cpu, 
  Workflow, 
  BookOpen, 
  ArrowRight, 
  ShieldAlert
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Disclaimer Banner */}
      <div className="disclaimer-banner">
        <ShieldAlert size={20} className="shrink-0" style={{ color: '#d97706', marginTop: 2 }} />
        <div>
          <strong>Educational Demonstration Model:</strong> This project uses mathematically documented, illustrative weights to demonstrate how forward propagation works inside multi-layer perceptrons. It is not an empirically trained or clinically validated model for evaluating real students.
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '3rem 1rem 4rem',
        maxWidth: 900,
        margin: '0 auto'
      }}>
        <div className="page-badge">
          <Binary size={14} /> Machine Learning Engineering Project
        </div>
        <h1 style={{ 
          fontSize: '2.75rem', 
          fontWeight: 800, 
          letterSpacing: '-0.03em', 
          lineHeight: 1.2,
          color: 'var(--text-main)',
          marginBottom: '1.25rem'
        }}>
          Student Performance Prediction using{' '}
          <span style={{ color: 'var(--primary)', position: 'relative' }}>
            Forward Propagation
          </span>
        </h1>
        <p style={{ 
          fontSize: '1.15rem', 
          color: 'var(--text-muted)', 
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          Explore the exact matrix operations, linear algebra, non-linear activations (ReLU), and numerically stable Softmax probability distributions powering modern artificial neural networks.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
            onClick={() => onNavigate('predictor')}
          >
            Launch Student Predictor <ArrowRight size={18} />
          </button>
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
            onClick={() => onNavigate('visualizer')}
          >
            Explore Neural Visualizer <Workflow size={18} />
          </button>
        </div>
      </section>

      {/* Project Objectives Grid */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          Core Educational Objectives
        </h2>
        <div className="grid-3">
          <div className="card">
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: 8, 
              backgroundColor: 'var(--primary-light)', 
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Demystify Forward Propagation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Break down the feed-forward cycle step-by-step: dot products between input vectors and weights, bias vector offsets, ReLU thresholding, and Softmax classification.
            </p>
          </div>

          <div className="card">
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: 8, 
              backgroundColor: 'var(--success-light)', 
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Workflow size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Interactive Live Computation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Watch neural layer activations update in real time as inputs change. Toggle between rounded pedagogical values and high-precision raw decimal mathematics.
            </p>
          </div>

          <div className="card">
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: 8, 
              backgroundColor: '#fef3c7', 
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <BookOpen size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Mathematical Transparency
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Every weight matrix, bias constant, and activation equation is completely open and documented. No black boxes, no opaque abstractions, and no fabricated statistics.
            </p>
          </div>
        </div>
      </section>

      {/* Network Architecture Quick Summary */}
      <section className="card" style={{ marginBottom: '3.5rem', backgroundColor: '#ffffff' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GraduationCap size={22} color="var(--primary)" /> System Architecture Snapshot
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          The system implements a classic 3-layer Feed-Forward Artificial Neural Network (Multilayer Perceptron):
        </p>
        <div className="grid-3">
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 8 }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>1. Input Layer (3 Nodes)</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              • Attendance (0–100%)<br />
              • Exam Marks (0–100)<br />
              • Daily Study Hours (0–12)
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 8 }}>
            <div style={{ fontWeight: 700, color: 'var(--success)', marginBottom: '0.25rem' }}>2. Hidden Layer (4 Neurons)</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              • ReLU Activation: <span className="math-badge">f(z) = max(0, z)</span><br />
              • Captures academic aptitude, consistency, at-risk habits, & baseline
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 8 }}>
            <div style={{ fontWeight: 700, color: 'var(--danger)', marginBottom: '0.25rem' }}>3. Output Layer (2 Nodes)</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              • Softmax Normalization<br />
              • PASS vs. FAIL Probabilities<br />
              • Guarantees sum to 100%
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Explore Project Sections
        </h2>
        <div className="grid-2">
          <div 
            className="card" 
            style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
            onClick={() => onNavigate('predictor')}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                Interactive Student Predictor →
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Adjust attendance, marks, and study hours with instant validation and dynamic PASS/FAIL scores.
              </p>
            </div>
          </div>

          <div 
            className="card" 
            style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
            onClick={() => onNavigate('how-it-works')}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                Mathematical Mechanics →
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Read comprehensive breakdowns of weight dot products, biases, ReLU clipping, and stable Softmax.
              </p>
            </div>
          </div>

          <div 
            className="card" 
            style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
            onClick={() => onNavigate('visualizer')}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                Neural Graph Visualizer →
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Inspect live animated network synapses, intermediate neuron activations, and arithmetic traces.
              </p>
            </div>
          </div>

          <div 
            className="card" 
            style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
            onClick={() => onNavigate('about')}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                Project Scope & Limitations →
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Learn why real-world prediction requires supervised datasets, cross-validation, and backpropagation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
