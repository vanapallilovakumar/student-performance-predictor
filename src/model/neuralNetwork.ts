/**
 * Model Architecture & Mathematics Configuration
 * 
 * Architecture:
 * - Input Layer: 3 features [Attendance (0-100), Marks (0-100), Study Hours (0-12)]
 * - Hidden Layer: 4 neurons with ReLU activation: f(z) = max(0, z)
 * - Output Layer: 2 neurons [Pass Score, Fail Score] with Softmax activation:
 *                 P(y=i) = exp(z_i - max(z)) / sum(exp(z_j - max(z)))
 * 
 * IMPORTANT DISCLAIMER:
 * These weights and biases are documented illustrative parameters chosen to clearly
 * demonstrate the exact mathematical mechanics of multi-layer feedforward propagation
 * (matrix multiplication, bias addition, ReLU non-linearity, and numerically stable Softmax).
 * This is an educational demonstration and NOT a trained/validated clinical or real-world predictor.
 */

export interface ModelInput {
  attendance: number;   // 0 to 100
  marks: number;        // 0 to 100
  studyHours: number;   // 0 to 12
}

export interface HiddenNeuronDetail {
  index: number;
  label: string;
  weights: number[]; // [w_att, w_marks, w_study]
  weightedProducts: number[];
  bias: number;
  zRaw: number;      // raw pre-activation: dot(X, W) + b
  zRounded: number;  // rounded display
  aRaw: number;      // post-activation: ReLU(z)
  aRounded: number;  // rounded display
  formulaStr: string;
}

export interface OutputNeuronDetail {
  index: number;
  label: string; // 'Pass', 'Fail'
  weights: number[]; // 4 weights from hidden layer
  weightedProducts: number[];
  bias: number;
  zRaw: number;      // dot(A, W_out) + b
  zRounded: number;
  expShifted: number;// exp(z - max_z)
  probability: number; // 0.0 to 1.0
  percentageStr: string;
  formulaStr: string;
}

export interface ForwardPropResult {
  inputs: ModelInput;
  normalizedInputs: [number, number, number];
  hiddenNeurons: HiddenNeuronDetail[];
  hiddenActivations: number[];
  outputNeurons: OutputNeuronDetail[];
  passProbability: number;
  failProbability: number;
  predictedResult: 'PASS' | 'FAIL';
  maxZOut: number;
  sumExp: number;
}

// Weights connecting Input (3) -> Hidden (4)
// Rows: Hidden neurons (h1, h2, h3, h4)
// Columns: Inputs [attendance, marks, studyHours]
export const W_HIDDEN: number[][] = [
  // h1: Academic Aptitude (marks + attendance)
  [0.020, 0.030, 0.080],
  // h2: Consistency & Effort (attendance + study hours)
  [0.025, 0.015, 0.100],
  // h3: At-Risk Pattern (activates when attendance/marks/study are deficient)
  [-0.025, -0.035, -0.060],
  // h4: Baseline Competence (balanced across all three factors)
  [0.010, 0.015, 0.040],
];

// Biases for Hidden layer
export const B_HIDDEN: number[] = [
  -2.20,  // requires solid academic score
  -1.80,  // requires good study habits
  2.60,   // active when scores are low (penalizing neuron)
  -1.00,  // baseline threshold
];

// Weights connecting Hidden (4) -> Output (2)
// Row 0: Pass neuron weights [from h1, h2, h3, h4]
// Row 1: Fail neuron weights [from h1, h2, h3, h4]
export const W_OUTPUT: number[][] = [
  [0.55, 0.45, -0.70, 0.30],  // Pass: positively influenced by h1, h2, h4; suppressed by h3
  [-0.50, -0.40, 0.75, -0.25], // Fail: boosted by h3; suppressed by h1, h2, h4
];

// Biases for Output layer
export const B_OUTPUT: number[] = [
  0.10,  // Pass bias
  -0.10, // Fail bias
];

export const HIDDEN_LABELS = [
  'Academic Aptitude (h₁)',
  'Consistency & Effort (h₂)',
  'At-Risk Pattern (h₃)',
  'Baseline Competence (h₄)',
];

export const OUTPUT_LABELS = ['PASS (y₁)', 'FAIL (y₂)'];

/**
 * Executes documented forward propagation step-by-step
 */
export function runForwardPropagation(input: ModelInput): ForwardPropResult {
  const X = [input.attendance, input.marks, input.studyHours];

  // 1. Hidden Layer Calculations: Z = W * X + b, A = ReLU(Z)
  const hiddenNeurons: HiddenNeuronDetail[] = [];
  const hiddenActivations: number[] = [];

  for (let i = 0; i < 4; i++) {
    const weights = W_HIDDEN[i];
    const bias = B_HIDDEN[i];
    const weightedProducts = [
      weights[0] * X[0],
      weights[1] * X[1],
      weights[2] * X[2],
    ];
    const zRaw = weightedProducts[0] + weightedProducts[1] + weightedProducts[2] + bias;
    const aRaw = Math.max(0, zRaw); // ReLU activation

    const sign = bias >= 0 ? `+ ${bias.toFixed(2)}` : `- ${Math.abs(bias).toFixed(2)}`;
    const formulaStr = `z_${i + 1} = (${weights[0].toFixed(3)} × ${X[0]}) + (${weights[1].toFixed(3)} × ${X[1]}) + (${weights[2].toFixed(3)} × ${X[2]}) ${sign} = ${zRaw.toFixed(4)}`;

    hiddenNeurons.push({
      index: i + 1,
      label: HIDDEN_LABELS[i],
      weights,
      weightedProducts,
      bias,
      zRaw,
      zRounded: Math.round(zRaw),
      aRaw,
      aRounded: Math.round(aRaw),
      formulaStr,
    });

    hiddenActivations.push(aRaw);
  }

  // 2. Output Layer Calculations: Z_out = W_out * A + b_out
  const rawZOut: number[] = [];
  const outputNeuronDrafts: Array<{
    weights: number[];
    weightedProducts: number[];
    bias: number;
    zRaw: number;
  }> = [];

  for (let j = 0; j < 2; j++) {
    const weights = W_OUTPUT[j];
    const bias = B_OUTPUT[j];
    const weightedProducts = weights.map((w, idx) => w * hiddenActivations[idx]);
    const dot = weightedProducts.reduce((acc, curr) => acc + curr, 0);
    const zRaw = dot + bias;
    rawZOut.push(zRaw);
    outputNeuronDrafts.push({
      weights,
      weightedProducts,
      bias,
      zRaw,
    });
  }

  // 3. Numerically Stable Softmax:
  // Shift logits by max(z) to avoid overflow: exp(z_j - max(z))
  const maxZ = Math.max(...rawZOut);
  const expShifted = rawZOut.map(z => Math.exp(z - maxZ));
  const sumExp = expShifted.reduce((acc, curr) => acc + curr, 0);
  const probs = expShifted.map(e => e / sumExp);

  const outputNeurons: OutputNeuronDetail[] = [];
  for (let j = 0; j < 2; j++) {
    const d = outputNeuronDrafts[j];
    const prob = probs[j];
    const pPercent = (prob * 100).toFixed(2);
    const sign = d.bias >= 0 ? `+ ${d.bias.toFixed(2)}` : `- ${Math.abs(d.bias).toFixed(2)}`;
    const formulaStr = `z_out_${j + 1} = (${d.weights[0].toFixed(2)} × ${hiddenActivations[0].toFixed(2)}) + (${d.weights[1].toFixed(2)} × ${hiddenActivations[1].toFixed(2)}) + (${d.weights[2].toFixed(2)} × ${hiddenActivations[2].toFixed(2)}) + (${d.weights[3].toFixed(2)} × ${hiddenActivations[3].toFixed(2)}) ${sign} = ${d.zRaw.toFixed(4)}`;

    outputNeurons.push({
      index: j + 1,
      label: OUTPUT_LABELS[j],
      weights: d.weights,
      weightedProducts: d.weightedProducts,
      bias: d.bias,
      zRaw: d.zRaw,
      zRounded: Math.round(d.zRaw),
      expShifted: expShifted[j],
      probability: prob,
      percentageStr: `${pPercent}%`,
      formulaStr,
    });
  }

  const passProbability = probs[0];
  const failProbability = probs[1];
  const predictedResult: 'PASS' | 'FAIL' = passProbability >= 0.5 ? 'PASS' : 'FAIL';

  return {
    inputs: input,
    normalizedInputs: [input.attendance, input.marks, input.studyHours],
    hiddenNeurons,
    hiddenActivations,
    outputNeurons,
    passProbability,
    failProbability,
    predictedResult,
    maxZOut: maxZ,
    sumExp,
  };
}
