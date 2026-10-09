import React from 'react';
import { 
  W_HIDDEN, 
  B_HIDDEN, 
  HIDDEN_LABELS
} from '../model/neuralNetwork';
import { 
  Layers, 
  Sparkles, 
  Sigma, 
  Cpu
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-badge">Theoretical Foundations</div>
        <h1 className="page-title">How Forward Propagation Works</h1>
        <p className="page-description">
          A step-by-step mathematical guide to vectors, weight matrices, biases, ReLU activations, and numerically stable Softmax probability normalizations.
        </p>
      </div>

      {/* Overview Accordion/Grid */}
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        <div className="card">
          <h2 className="card-title">
            <Layers size={20} color="var(--primary)" /> What is Forward Propagation?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            Forward propagation is the fundamental inference mechanism of Artificial Neural Networks. Raw input features flow unidirectionally from the input layer through one or more hidden layers to produce the final output.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            At each layer, the network performs an <strong>affine transformation</strong> (linear dot product with weights plus a bias constant) followed by a <strong>non-linear activation function</strong> to enable the network to learn complex non-linear relationships.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">
            <Cpu size={20} color="var(--primary)" /> Network Topology in this Project
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <li><strong>• Input Layer:</strong> 3 feature nodes [Attendance, Marks, Study Hours]</li>
            <li><strong>• Hidden Layer:</strong> 4 neurons equipped with ReLU activations</li>
            <li><strong>• Output Layer:</strong> 2 neurons [Pass, Fail] mapped via Softmax</li>
            <li><strong>• Total Trainable Parameters:</strong> (3 × 4 + 4) + (4 × 2 + 2) = 16 + 10 = <strong>26 parameters</strong></li>
          </ul>
        </div>
      </div>

      {/* Layer 1: Input Layer Breakdown */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-title" style={{ color: 'var(--primary)' }}>
          <span className="math-badge">Layer 1</span> The Input Layer (Features)
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
          Inputs are represented as a 1D column vector <span className="math-badge">X = [x₁, x₂, x₃]ᵀ</span>:
        </p>
        <div className="grid-3">
          <div style={{ padding: '0.875rem', background: 'var(--bg-subtle)', borderRadius: 6 }}>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>x₁ : Attendance</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Range: 0 to 100%. Represents lecture participation and consistent presence.</p>
          </div>
          <div style={{ padding: '0.875rem', background: 'var(--bg-subtle)', borderRadius: 6 }}>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>x₂ : Exam Marks</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Range: 0 to 100. Quantifies academic competence demonstrated in examinations.</p>
          </div>
          <div style={{ padding: '0.875rem', background: 'var(--bg-subtle)', borderRadius: 6 }}>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>x₃ : Daily Study Hours</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Range: 0 to 12 hrs/day. Measures independent revision and continuous effort.</p>
          </div>
        </div>
      </section>

      {/* Layer 2: Hidden Layer & Weights */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-title" style={{ color: 'var(--success)' }}>
          <span className="math-badge" style={{ color: 'var(--success)' }}>Layer 2</span> Hidden Layer Linear Combination & Biases
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
          Each hidden neuron <span className="math-badge">h_i</span> computes a pre-activation scalar <span className="math-badge">z_i</span> by taking the dot product of input vector <span className="math-badge">X</span> with its specific weight vector <span className="math-badge">W_i</span>, then adding bias <span className="math-badge">b_i</span>:
        </p>
        
        <div className="code-block" style={{ marginBottom: '1.25rem' }}>
          z_i = (w_i1 · x₁) + (w_i2 · x₂) + (w_i3 · x₃) + b_i
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Documented Hidden Weights (W₁) and Biases (b₁)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.5rem 0.75rem' }}>Neuron</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>Specialized Meaning</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>w_attendance</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>w_marks</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>w_study</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>Bias (b)</th>
              </tr>
            </thead>
            <tbody>
              {W_HIDDEN.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>h{idx+1}</td>
                  <td style={{ padding: '0.5rem 0.75rem', color: 'var(--text-muted)' }}>{HIDDEN_LABELS[idx]}</td>
                  <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--font-mono)' }}>{row[0].toFixed(3)}</td>
                  <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--font-mono)' }}>{row[1].toFixed(3)}</td>
                  <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--font-mono)' }}>{row[2].toFixed(3)}</td>
                  <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{B_HIDDEN[idx].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Non-Linear Activation: ReLU */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-title" style={{ color: 'var(--primary)' }}>
          <Sparkles size={20} color="var(--primary)" /> Activation Function: Rectified Linear Unit (ReLU)
        </div>
        <div className="grid-2">
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Without activation functions, stacking multiple linear layers simply collapses into a single linear matrix multiplication. 
              <strong>ReLU</strong> introduces non-linearity by zeroing out any negative pre-activation:
            </p>
            <div className="code-block" style={{ marginBottom: '1rem' }}>
              f(z) = max(0, z) = &#123; z if z &gt; 0, 0 if z ≤ 0 &#125;
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Notice how when a student's indicators are deficient, <code>h3 (At-Risk Pattern)</code> becomes active (&gt; 0) while <code>h1</code> and <code>h2</code> evaluate to negative values and get cleanly clipped to 0.0.
            </p>
          </div>
          <div style={{ 
            backgroundColor: 'var(--bg-subtle)', 
            borderRadius: 8, 
            padding: '1.25rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>ReLU Characteristic Function</div>
            <svg viewBox="0 0 200 120" style={{ width: '100%', maxWidth: 240, height: 'auto' }}>
              {/* Axes */}
              <line x1="10" y1="90" x2="190" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="100" y1="10" x2="100" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
              {/* ReLU Curve */}
              <line x1="20" y1="90" x2="100" y2="90" stroke="#dc2626" strokeWidth="3" />
              <line x1="100" y1="90" x2="180" y2="20" stroke="#16a34a" strokeWidth="3" />
              <text x="175" y="105" fontSize="10" fill="#64748b">z</text>
              <text x="105" y="15" fontSize="10" fill="#64748b">f(z)</text>
              <text x="35" y="80" fontSize="9" fill="#dc2626">f(z)=0</text>
              <text x="135" y="45" fontSize="9" fill="#16a34a">f(z)=z</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Layer 3: Output Layer & Softmax */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-title" style={{ color: 'var(--danger)' }}>
          <span className="math-badge" style={{ color: 'var(--danger)' }}>Layer 3</span> Output Layer & Numerically Stable Softmax
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
          The hidden activations <span className="math-badge">A = [a₁, a₂, a₃, a₄]ᵀ</span> are multiplied by output weights <span className="math-badge">W₂</span> plus output bias <span className="math-badge">b_out</span> to compute unconstrained logits <span className="math-badge">z_pass</span> and <span className="math-badge">z_fail</span>:
        </p>
        <div className="code-block" style={{ marginBottom: '1.25rem' }}>
          z_pass = (0.55 · a₁) + (0.45 · a₂) + (-0.70 · a₃) + (0.30 · a₄) + 0.10<br />
          z_fail = (-0.50 · a₁) + (-0.40 · a₂) + (0.75 · a₃) + (-0.25 · a₄) - 0.10
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sigma size={18} color="var(--primary)" /> Numerical Stability via Softmax Max-Shift
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          A naive implementation of Softmax calculates <span className="math-badge">e^(z_i)</span> directly. If <span className="math-badge">z_i</span> exceeds ~710 in 64-bit floating point, the computer overflows to <code>Infinity</code> and crashes the application with <code>NaN</code>.
        </p>
        <div className="code-block" style={{ marginBottom: '1rem' }}>
          P(y_i) = exp(z_i - max(z)) / Σ_j exp(z_j - max(z))
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          By subtracting <span className="math-badge">max(z)</span> from all logits, the maximum exponent becomes <span className="math-badge">e^(0) = 1.0</span>. Mathematically, the scalar <span className="math-badge">e^(-max(z))</span> cancels out in the numerator and denominator, guaranteeing 100% precision with zero overflow danger!
        </p>
      </section>
    </div>
  );
};
