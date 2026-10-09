import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Workflow, 
  Database,
  BookOpen
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-badge">Project Scope & Engineering Context</div>
        <h1 className="page-title">About the Project</h1>
        <p className="page-description">
          Detailed review of model assumptions, educational objectives, production limitations, and real-world machine learning roadmaps.
        </p>
      </div>

      {/* Limitations Card */}
      <section className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid #dc2626' }}>
        <h2 className="card-title" style={{ color: '#dc2626' }}>
          <AlertTriangle size={20} /> Critical Limitations & Academic Disclaimers
        </h2>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>1. Pure Inference without Backpropagation:</strong> This project is intentionally structured as a dedicated forward-propagation simulator. It illustrates how neural layers process input signals to compute probabilities, but it does not execute iterative optimization algorithms like Stochastic Gradient Descent (SGD) or backpropagation error back-tracing.
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>2. Illustrative Documented Weights:</strong> The parameter matrices and bias terms were manually calibrated to demonstrate mathematical behaviors (e.g., neuron activation thresholds, positive and negative feature correlations, and Softmax normalization). They were <em>not</em> trained on a statistical dataset of real students.
          </p>
          <p>
            <strong>3. No Synthetic Accuracy Claims:</strong> In accordance with strict machine learning ethics, we do not fabricate accuracy percentages, F1-scores, or ROC-AUC benchmarks on imaginary data. Real student prediction requires institutional datasets, privacy protection (FERPA/GDPR compliance), cross-validation, and bias audits.
          </p>
        </div>
      </section>

      {/* Educational Applications */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="card-title">
          <BookOpen size={20} color="var(--primary)" /> Educational Applications
        </h2>
        <div className="grid-3" style={{ marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 8 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>
              Classroom Lecture Aid
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Enables computer science professors to show live numerical transformations rather than static blackboard matrices.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 8 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--success)' }}>
              Interactive Lab Exploration
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Undergraduate students can test edge cases (e.g. 0% attendance vs. 100% exam score) to observe neuron clipping.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 8 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#d97706' }}>
              Bridge to Deep Learning
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Provides a concrete mental model of weights, biases, and activation functions before introducing complex frameworks like PyTorch or TensorFlow.
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Machine Learning Roadmap */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="card-title">
          <Compass size={20} color="var(--success)" /> Transition to Real-World Prediction Systems
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          To transform an educational forward-propagation model into an institutional-grade student early-warning decision support system, the following pipeline is required:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Database size={18} color="var(--primary)" style={{ marginTop: 3 }} />
            <div>
              <strong>1. Ethical Data Ingestion & Feature Engineering:</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Collect longitudinal student records including LMS engagement, assignment submission intervals, prerequisite coursework grades, and socio-emotional check-ins.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Workflow size={18} color="var(--primary)" style={{ marginTop: 3 }} />
            <div>
              <strong>2. Backpropagation & Regularization:</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Implement categorical cross-entropy loss with Adam optimization, Dropout (p=0.2) to prevent overfitting, and batch normalization.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={18} color="var(--primary)" style={{ marginTop: 3 }} />
            <div>
              <strong>3. Rigorous Cross-Validation:</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Evaluate across stratified 5-fold cross-validation splits, monitoring precision, recall, and false positive rates to ensure equitable support for struggling students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverable Downloads Card */}
      <section className="card" style={{ backgroundColor: '#ffffff', border: '2px solid var(--primary-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              PowerPoint Presentation Included
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              The complete 8-slide presentation file is located in the project root: <br />
              <code style={{ fontSize: '0.85rem' }}>Student_Performance_Prediction_Forward_Propagation.pptx</code>
            </p>
          </div>
          <div>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.5rem 1rem', 
              borderRadius: 6, 
              backgroundColor: 'var(--primary-light)', 
              color: 'var(--primary)',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              <CheckCircle2 size={16} /> Exactly 8 Slides Generated
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
