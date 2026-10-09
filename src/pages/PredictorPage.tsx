import React, { useState, useId } from 'react';
import type { ModelInput, ForwardPropResult } from '../model/neuralNetwork';
import { runForwardPropagation } from '../model/neuralNetwork';
import { 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Info, 
  Sliders, 
  BarChart3, 
  ArrowRight,
  ShieldAlert,
  Percent,
  Clock,
  Award
} from 'lucide-react';

interface PredictorPageProps {
  onNavigateToVisualizer?: () => void;
}

export const PredictorPage: React.FC<PredictorPageProps> = ({ onNavigateToVisualizer }) => {
  // Default values: Attendance 85, Marks 70, Study Hours 4
  const [inputs, setInputs] = useState<ModelInput>({
    attendance: 85,
    marks: 70,
    studyHours: 4,
  });

  const [useWholeNumbers, setUseWholeNumbers] = useState<boolean>(false);
  const attendanceId = useId();
  const marksId = useId();
  const studyHoursId = useId();

  // Run forward propagation live
  const result: ForwardPropResult = runForwardPropagation(inputs);

  // Preset profiles for instant demonstration
  const handlePreset = (attendance: number, marks: number, studyHours: number) => {
    setInputs({ attendance, marks, studyHours });
  };

  const handleReset = () => {
    setInputs({
      attendance: 85,
      marks: 70,
      studyHours: 4,
    });
  };

  const isPass = result.predictedResult === 'PASS';
  const passPercentStr = (result.passProbability * 100).toFixed(2);
  const failPercentStr = (result.failProbability * 100).toFixed(2);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">Interactive Module</div>
        <h1 className="page-title">Student Performance Predictor</h1>
        <p className="page-description">
          Provide student attendance, internal exam scores, and daily study hours to run live feedforward network calculations.
        </p>
      </div>

      {/* Educational Notice Banner */}
      <div className="disclaimer-banner">
        <ShieldAlert size={20} className="shrink-0" style={{ color: '#d97706', marginTop: 2 }} />
        <div>
          <strong>Educational Demonstration Notice:</strong> Results are dynamically derived from illustrative, hard-coded weights calibrated for classroom teaching. They do not constitute an empirical prediction of any real student.
        </div>
      </div>

      {/* Preset Profiles Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        marginBottom: '1.5rem', 
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        padding: '0.875rem 1.25rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border-light)'
      }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Sparkles size={16} color="var(--primary)" /> Sample Profiles:
        </span>
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          onClick={() => handlePreset(85, 70, 4)}
        >
          Default Benchmark (85%, 70, 4h)
        </button>
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          onClick={() => handlePreset(95, 90, 8)}
        >
          High Achiever (95%, 90, 8h)
        </button>
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          onClick={() => handlePreset(48, 42, 2)}
        >
          Borderline Student (48%, 42, 2h)
        </button>
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          onClick={() => handlePreset(30, 25, 1)}
        >
          At-Risk Student (30%, 25, 1h)
        </button>
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginLeft: 'auto', color: 'var(--danger)' }}
          onClick={handleReset}
        >
          <RotateCcw size={14} /> Reset Defaults
        </button>
      </div>

      {/* Main Grid: Controls + Results */}
      <div className="grid-2">
        {/* Left: Input Form Controls */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 className="card-title" style={{ margin: 0 }}>
              <Sliders size={20} color="var(--primary)" /> Input Parameters
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={useWholeNumbers} 
                  onChange={(e) => setUseWholeNumbers(e.target.checked)}
                />
                Show Rounded Mode
              </label>
            </div>
          </div>

          {/* 1. Attendance Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label htmlFor={attendanceId} style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Percent size={16} color="var(--primary)" /> Student Attendance:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  min={0} 
                  max={100}
                  value={inputs.attendance}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                    setInputs(prev => ({ ...prev, attendance: Math.round(val) }));
                  }}
                  style={{
                    width: 70,
                    padding: '0.35rem 0.5rem',
                    borderRadius: 6,
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    textAlign: 'right',
                    fontWeight: 600
                  }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>%</span>
              </div>
            </div>
            <input 
              id={attendanceId}
              type="range" 
              min={0} 
              max={100} 
              value={inputs.attendance} 
              onChange={(e) => setInputs(prev => ({ ...prev, attendance: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              <span>0% (Absent)</span>
              <span>Default: 85%</span>
              <span>100% (Perfect)</span>
            </div>
          </div>

          {/* 2. Exam Marks Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label htmlFor={marksId} style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={16} color="var(--primary)" /> Exam Marks:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  min={0} 
                  max={100}
                  value={inputs.marks}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                    setInputs(prev => ({ ...prev, marks: Math.round(val) }));
                  }}
                  style={{
                    width: 70,
                    padding: '0.35rem 0.5rem',
                    borderRadius: 6,
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    textAlign: 'right',
                    fontWeight: 600
                  }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ 100</span>
              </div>
            </div>
            <input 
              id={marksId}
              type="range" 
              min={0} 
              max={100} 
              value={inputs.marks} 
              onChange={(e) => setInputs(prev => ({ ...prev, marks: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              <span>0 (Lowest)</span>
              <span>Default: 70</span>
              <span>100 (Max)</span>
            </div>
          </div>

          {/* 3. Daily Study Hours Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label htmlFor={studyHoursId} style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={16} color="var(--primary)" /> Daily Study Hours:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  min={0} 
                  max={12}
                  value={inputs.studyHours}
                  onChange={(e) => {
                    const val = Math.min(12, Math.max(0, Number(e.target.value) || 0));
                    setInputs(prev => ({ ...prev, studyHours: Math.round(val) }));
                  }}
                  style={{
                    width: 70,
                    padding: '0.35rem 0.5rem',
                    borderRadius: 6,
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    textAlign: 'right',
                    fontWeight: 600
                  }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>hrs/day</span>
              </div>
            </div>
            <input 
              id={studyHoursId}
              type="range" 
              min={0} 
              max={12} 
              value={inputs.studyHours} 
              onChange={(e) => setInputs(prev => ({ ...prev, studyHours: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              <span>0 hrs</span>
              <span>Default: 4 hrs</span>
              <span>12 hrs</span>
            </div>
          </div>

          <div style={{ 
            padding: '0.875rem', 
            background: 'var(--bg-subtle)', 
            borderRadius: 6, 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Info size={16} className="shrink-0" />
            <span>
              Inputs feed directly into vector <code>X = [{inputs.attendance}, {inputs.marks}, {inputs.studyHours}]</code>. Math propagates instantaneously.
            </span>
          </div>
        </div>

        {/* Right: Prediction Results Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title" style={{ margin: 0 }}>
                <BarChart3 size={20} color="var(--primary)" /> Prediction Outcome
              </h2>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                padding: '0.25rem 0.5rem', 
                borderRadius: 4, 
                background: isPass ? 'var(--success-light)' : 'var(--danger-light)',
                color: isPass ? 'var(--success)' : 'var(--danger)',
                border: `1px solid ${isPass ? 'var(--success-border)' : 'var(--danger-border)'}`
              }}>
                Softmax Classified
              </span>
            </div>

            {/* Prominent Prediction Hero Box */}
            <div style={{ 
              padding: '1.75rem 1.25rem',
              borderRadius: '0.75rem',
              backgroundColor: isPass ? 'var(--success-light)' : 'var(--danger-light)',
              border: `2px solid ${isPass ? 'var(--success)' : 'var(--danger)'}`,
              textAlign: 'center',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {isPass ? (
                  <CheckCircle2 size={36} color="var(--success)" />
                ) : (
                  <XCircle size={36} color="var(--danger)" />
                )}
                <span style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 900, 
                  letterSpacing: '0.05em', 
                  color: isPass ? 'var(--success)' : 'var(--danger)' 
                }}>
                  {result.predictedResult}
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: isPass ? '#166534' : '#991b1b', fontWeight: 500 }}>
                {isPass 
                  ? 'Strong academic signals indicate passing likelihood based on current weights.' 
                  : 'Low indicators trip the at-risk neuron resulting in a failing likelihood.'}
              </p>
            </div>

            {/* Probability Breakdown Bars */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--success)' }}>PASS Probability:</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{passPercentStr}%</span>
                </div>
                <div style={{ height: 12, backgroundColor: 'var(--bg-subtle)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min(100, Math.max(0, result.passProbability * 100))}%`, 
                    backgroundColor: 'var(--success)', 
                    transition: 'width 0.3s ease' 
                  }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--danger)' }}>FAIL Probability:</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{failPercentStr}%</span>
                </div>
                <div style={{ height: 12, backgroundColor: 'var(--bg-subtle)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min(100, Math.max(0, result.failProbability * 100))}%`, 
                    backgroundColor: 'var(--danger)', 
                    transition: 'width 0.3s ease' 
                  }} />
                </div>
              </div>
            </div>

            {/* Mathematical Check Badge */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '0.5rem 0.75rem', 
              borderRadius: 6, 
              background: 'var(--bg-subtle)', 
              fontSize: '0.75rem', 
              color: 'var(--text-muted)',
              marginBottom: '1rem'
            }}>
              <span>Σ Probabilities (Softmax Axiom):</span>
              <strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                {(result.passProbability + result.failProbability).toFixed(6)} ≈ 100.00%
              </strong>
            </div>

            {useWholeNumbers && (
              <div style={{ 
                fontSize: '0.75rem', 
                padding: '0.5rem', 
                backgroundColor: '#eff6ff', 
                color: '#1d4ed8', 
                borderRadius: 4, 
                marginBottom: '1rem' 
              }}>
                <em>Teaching Mode:</em> Output logits rounded to whole numbers: Pass z ≈ {result.outputNeurons[0].zRounded}, Fail z ≈ {result.outputNeurons[1].zRounded}. (Real Softmax runs on exact floating-point decimals to preserve math integrity).
              </div>
            )}
          </div>

          {onNavigateToVisualizer && (
            <button 
              className="btn btn-outline" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={onNavigateToVisualizer}
            >
              Inspect Complete Calculation Steps <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
