import React, { useState } from 'react';
import type { ModelInput } from '../model/neuralNetwork';
import { 
  runForwardPropagation, 
  W_HIDDEN, 
  W_OUTPUT 
} from '../model/neuralNetwork';
import { 
  ToggleLeft, 
  ToggleRight, 
  Calculator
} from 'lucide-react';

export const VisualizerPage: React.FC = () => {
  const [inputs, setInputs] = useState<ModelInput>({
    attendance: 85,
    marks: 70,
    studyHours: 4,
  });

  // State to toggle rounded whole-number view vs high-precision raw decimal view
  const [showRounded, setShowRounded] = useState<boolean>(false);
  const [selectedNeuron, setSelectedNeuron] = useState<string | null>('h1');

  const result = runForwardPropagation(inputs);

  // SVG Coordinates for Neural Network Layers
  // ViewBox: 800 x 420
  const inputCoords = [
    { id: 'x1', label: 'Attendance (x₁)', val: inputs.attendance, cx: 120, cy: 90 },
    { id: 'x2', label: 'Marks (x₂)', val: inputs.marks, cx: 120, cy: 210 },
    { id: 'x3', label: 'Study Hours (x₃)', val: inputs.studyHours, cx: 120, cy: 330 },
  ];

  const hiddenCoords = [
    { id: 'h1', label: 'Aptitude (h₁)', cx: 400, cy: 60, data: result.hiddenNeurons[0] },
    { id: 'h2', label: 'Effort (h₂)', cx: 400, cy: 150, data: result.hiddenNeurons[1] },
    { id: 'h3', label: 'At-Risk (h₃)', cx: 400, cy: 240, data: result.hiddenNeurons[2] },
    { id: 'h4', label: 'Baseline (h₄)', cx: 400, cy: 330, data: result.hiddenNeurons[3] },
  ];

  const outputCoords = [
    { id: 'y1', label: 'PASS (y₁)', cx: 680, cy: 140, data: result.outputNeurons[0], isPass: true },
    { id: 'y2', label: 'FAIL (y₂)', cx: 680, cy: 280, data: result.outputNeurons[1], isPass: false },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-badge">Interactive Neural Diagram</div>
        <h1 className="page-title">Neural Network Visualizer</h1>
        <p className="page-description">
          Follow the forward flow of signals across network synapses. Click any neuron to inspect its exact algebraic summation, bias offset, and activation step.
        </p>
      </div>

      {/* Control Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        backgroundColor: '#ffffff',
        padding: '0.875rem 1.25rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border-light)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Att:</span>
            <input 
              type="range" min={0} max={100} value={inputs.attendance} 
              onChange={e => setInputs(p => ({ ...p, attendance: Number(e.target.value) }))}
              style={{ verticalAlign: 'middle', width: 90 }}
            />
            <strong style={{ fontSize: '0.85rem', marginLeft: '0.35rem' }}>{inputs.attendance}%</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Marks:</span>
            <input 
              type="range" min={0} max={100} value={inputs.marks} 
              onChange={e => setInputs(p => ({ ...p, marks: Number(e.target.value) }))}
              style={{ verticalAlign: 'middle', width: 90 }}
            />
            <strong style={{ fontSize: '0.85rem', marginLeft: '0.35rem' }}>{inputs.marks}</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Study:</span>
            <input 
              type="range" min={0} max={12} value={inputs.studyHours} 
              onChange={e => setInputs(p => ({ ...p, studyHours: Number(e.target.value) }))}
              style={{ verticalAlign: 'middle', width: 80 }}
            />
            <strong style={{ fontSize: '0.85rem', marginLeft: '0.35rem' }}>{inputs.studyHours}h</strong>
          </div>
        </div>

        {/* Display Precision Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Teaching Rounded Mode:
          </span>
          <button 
            onClick={() => setShowRounded(!showRounded)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: showRounded ? 'var(--primary)' : 'var(--text-dim)'
            }}
            title="Toggle between rounded integers and raw floating point math"
          >
            {showRounded ? <ToggleRight size={30} /> : <ToggleLeft size={30} />}
          </button>
        </div>
      </div>

      {showRounded && (
        <div style={{ 
          fontSize: '0.8rem', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#eff6ff', 
          color: '#1e40af', 
          borderRadius: 6, 
          marginBottom: '1rem',
          border: '1px solid #bfdbfe'
        }}>
          💡 <strong>Note on Educational Precision:</strong> In rounded mode, values inside neuron labels are rounded to nearest whole numbers for classroom clarity. The actual network engine always computes using exact raw floats to preserve mathematical truth.
        </div>
      )}

      {/* SVG Neural Diagram Card */}
      <div className="card" style={{ padding: '1rem', marginBottom: '2rem', overflowX: 'auto', textAlign: 'center' }}>
        <svg 
          viewBox="0 0 800 400" 
          style={{ width: '100%', maxWidth: 840, height: 'auto', display: 'block', margin: '0 auto' }}
        >
          {/* Layer Headers */}
          <text x="120" y="30" textAnchor="middle" fill="#2563eb" fontWeight="700" fontSize="13">INPUT LAYER</text>
          <text x="400" y="30" textAnchor="middle" fill="#16a34a" fontWeight="700" fontSize="13">HIDDEN LAYER (ReLU)</text>
          <text x="680" y="30" textAnchor="middle" fill="#dc2626" fontWeight="700" fontSize="13">OUTPUT LAYER (Softmax)</text>

          {/* Synapses: Input -> Hidden */}
          {inputCoords.map((inp, iIdx) => 
            hiddenCoords.map((hid, hIdx) => {
              const weight = W_HIDDEN[hIdx][iIdx];
              const isPositive = weight > 0;
              const isSelected = selectedNeuron === hid.id;
              return (
                <line 
                  key={`in-hid-${iIdx}-${hIdx}`}
                  x1={inp.cx}
                  y1={inp.cy}
                  x2={hid.cx}
                  y2={hid.cy}
                  stroke={isSelected ? (isPositive ? '#2563eb' : '#ef4444') : (isPositive ? '#93c5fd' : '#fca5a5')}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                  strokeDasharray={weight < 0 ? '4 2' : undefined}
                  opacity={isSelected ? 0.9 : 0.4}
                />
              );
            })
          )}

          {/* Synapses: Hidden -> Output */}
          {hiddenCoords.map((hid, hIdx) => 
            outputCoords.map((out, oIdx) => {
              const weight = W_OUTPUT[oIdx][hIdx];
              const isPositive = weight > 0;
              const isSelected = selectedNeuron === out.id || selectedNeuron === hid.id;
              return (
                <line 
                  key={`hid-out-${hIdx}-${oIdx}`}
                  x1={hid.cx}
                  y1={hid.cy}
                  x2={out.cx}
                  y2={out.cy}
                  stroke={isSelected ? (isPositive ? '#16a34a' : '#ef4444') : (isPositive ? '#86efac' : '#fca5a5')}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                  strokeDasharray={weight < 0 ? '4 2' : undefined}
                  opacity={isSelected ? 0.9 : 0.4}
                />
              );
            })
          )}

          {/* Input Nodes */}
          {inputCoords.map((n) => (
            <g key={n.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedNeuron(n.id)}>
              <circle cx={n.cx} cy={n.cy} r={28} fill="#eff6ff" stroke="#2563eb" strokeWidth={2.5} />
              <text x={n.cx} y={n.cy - 4} textAnchor="middle" fill="#1e293b" fontWeight="700" fontSize="12">
                {n.id}
              </text>
              <text x={n.cx} y={n.cy + 13} textAnchor="middle" fill="#2563eb" fontWeight="800" fontSize="13">
                {n.val}
              </text>
              <text x={n.cx} y={n.cy + 42} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="500">
                {n.label}
              </text>
            </g>
          ))}

          {/* Hidden Nodes */}
          {hiddenCoords.map((n) => {
            const isActive = n.data.aRaw > 0;
            const isSelected = selectedNeuron === n.id;
            const displayVal = showRounded ? n.data.aRounded : n.data.aRaw.toFixed(2);
            return (
              <g key={n.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedNeuron(n.id)}>
                <circle 
                  cx={n.cx} 
                  cy={n.cy} 
                  r={26} 
                  fill={isActive ? '#f0fdf4' : '#f8fafc'} 
                  stroke={isSelected ? '#15803d' : (isActive ? '#16a34a' : '#cbd5e1')} 
                  strokeWidth={isSelected ? 3.5 : 2} 
                />
                <text x={n.cx} y={n.cy - 4} textAnchor="middle" fill="#1e293b" fontWeight="700" fontSize="11">
                  {n.id}
                </text>
                <text x={n.cx} y={n.cy + 13} textAnchor="middle" fill={isActive ? '#16a34a' : '#94a3b8'} fontWeight="800" fontSize="12">
                  {displayVal}
                </text>
                <text x={n.cx} y={n.cy + 38} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">
                  {n.label}
                </text>
              </g>
            );
          })}

          {/* Output Nodes */}
          {outputCoords.map((n) => {
            const isSelected = selectedNeuron === n.id;
            const probStr = (n.data.probability * 100).toFixed(1) + '%';
            return (
              <g key={n.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedNeuron(n.id)}>
                <circle 
                  cx={n.cx} 
                  cy={n.cy} 
                  r={32} 
                  fill={n.isPass ? '#f0fdf4' : '#fef2f2'} 
                  stroke={isSelected ? '#0f172a' : (n.isPass ? '#16a34a' : '#dc2626')} 
                  strokeWidth={isSelected ? 3.5 : 2.5} 
                />
                <text x={n.cx} y={n.cy - 6} textAnchor="middle" fill="#1e293b" fontWeight="800" fontSize="12">
                  {n.isPass ? 'PASS' : 'FAIL'}
                </text>
                <text 
                  x={n.cx} 
                  y={n.cy + 14} 
                  textAnchor="middle" 
                  fill={n.isPass ? '#16a34a' : '#dc2626'} 
                  fontWeight="900" 
                  fontSize="14"
                >
                  {probStr}
                </text>
                <text x={n.cx} y={n.cy + 46} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">
                  {showRounded ? `z ≈ ${n.data.zRounded}` : `z = ${n.data.zRaw.toFixed(2)}`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Step-by-Step Calculation Breakdown Card */}
      <section className="card">
        <h2 className="card-title">
          <Calculator size={20} color="var(--primary)" /> Complete Step-by-Step Arithmetic Trace
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Below is the precise mathematical sequence executed by forward propagation for the current student inputs:
        </p>

        {/* 1. Hidden Layer Calculations */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--success)', marginBottom: '0.75rem' }}>
            1. Hidden Layer Linear Combinations + ReLU Activations
          </h3>
          <div className="grid-2">
            {result.hiddenNeurons.map(h => (
              <div 
                key={h.index} 
                style={{ 
                  padding: '1rem', 
                  borderRadius: 8, 
                  backgroundColor: 'var(--bg-subtle)', 
                  border: selectedNeuron === `h${h.index}` ? '2px solid var(--success)' : '1px solid var(--border-light)',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedNeuron(`h${h.index}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong>{h.label}</strong>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.15rem 0.4rem', 
                    borderRadius: 4, 
                    backgroundColor: h.aRaw > 0 ? 'var(--success-light)' : '#f1f5f9',
                    color: h.aRaw > 0 ? 'var(--success)' : 'var(--text-dim)',
                    fontWeight: 700
                  }}>
                    {h.aRaw > 0 ? 'ACTIVE' : 'CLIPPED TO 0'}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {h.formulaStr}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  ReLU Output: <code>a_{h.index} = max(0, {h.zRaw.toFixed(4)}) = {h.aRaw.toFixed(4)}</code> 
                  {showRounded && <span> (Rounded: <strong>{h.aRounded}</strong>)</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Output Layer Calculations */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem' }}>
            2. Output Layer Affine Transform (Logits)
          </h3>
          <div className="grid-2">
            {result.outputNeurons.map(o => (
              <div 
                key={o.index} 
                style={{ 
                  padding: '1rem', 
                  borderRadius: 8, 
                  backgroundColor: 'var(--bg-subtle)', 
                  border: selectedNeuron === `y${o.index}` ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedNeuron(`y${o.index}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong>{o.label}</strong>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                    Logit z = {o.zRaw.toFixed(4)}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {o.formulaStr}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Logit Rounded: <strong>{o.zRounded}</strong> | Raw Precision: <strong>{o.zRaw.toFixed(4)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Softmax Normalization */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '0.75rem' }}>
            3. Numerically Shifted Softmax Normalization
          </h3>
          <div style={{ padding: '1rem', borderRadius: 8, backgroundColor: '#fef2f2', border: '1px solid #fecaca', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div>• <strong>Logit shift:</strong> max(z) = {result.maxZOut.toFixed(4)}</div>
            <div>• <strong>Pass exponent:</strong> exp({result.outputNeurons[0].zRaw.toFixed(4)} - {result.maxZOut.toFixed(4)}) = {result.outputNeurons[0].expShifted.toFixed(6)}</div>
            <div>• <strong>Fail exponent:</strong> exp({result.outputNeurons[1].zRaw.toFixed(4)} - {result.maxZOut.toFixed(4)}) = {result.outputNeurons[1].expShifted.toFixed(6)}</div>
            <div>• <strong>Sum of exponents (Σ):</strong> {result.sumExp.toFixed(6)}</div>
            <div style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
              • PASS Probability: {(result.passProbability * 100).toFixed(2)}% | FAIL Probability: {(result.failProbability * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
