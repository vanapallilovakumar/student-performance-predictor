import PptxGenJS from 'pptxgenjs';
import * as path from 'path';

/**
 * Slide Generator Script
 * Generates Student_Performance_Prediction_Forward_Propagation.pptx with exactly 8 slides.
 */

async function generatePresentation() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  // Theme Colors
  const BG_LIGHT = 'F8FAFC'; // slate-50
  const CARD_BG = 'FFFFFF';
  const PRIMARY_DARK = '1E293B'; // slate-800
  const PRIMARY_BLUE = '2563EB'; // blue-600
  const SUCCESS_GREEN = '16A34A'; // emerald-600
  const DANGER_RED = 'DC2626'; // red-600
  const TEXT_MUTED = '64748B'; // slate-500
  const BORDER_COLOR = 'E2E8F0'; // slate-200
  const ACCENT_BG = 'EFF6FF'; // blue-50

  // -------------------------------------------------------------
  // SLIDE 1: Title Slide
  // -------------------------------------------------------------
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_LIGHT };

  // Decorative header band
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.15,
    fill: { color: PRIMARY_BLUE },
  });

  slide1.addText('STUDENT PERFORMANCE PREDICTION', {
    x: 1.0,
    y: 1.5,
    w: 11.3,
    h: 0.5,
    fontSize: 16,
    fontFace: 'Arial',
    color: PRIMARY_BLUE,
    bold: true,
    tracking: 3,
  });

  slide1.addText('Forward Propagation in Machine Learning', {
    x: 1.0,
    y: 2.1,
    w: 11.3,
    h: 1.3,
    fontSize: 34,
    fontFace: 'Arial',
    color: PRIMARY_DARK,
    bold: true,
  });

  slide1.addText('An Interactive Educational Deep Dive into Feed-Forward Neural Networks, ReLU Activations & Softmax Classifications', {
    x: 1.0,
    y: 3.5,
    w: 10.5,
    h: 0.8,
    fontSize: 16,
    fontFace: 'Arial',
    color: TEXT_MUTED,
  });

  // Card container for project metadata
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 4.7,
    w: 11.3,
    h: 1.8,
    fill: { color: CARD_BG },
    line: { color: BORDER_COLOR, width: 1.5 },
  });

  slide1.addText([
    { text: 'Project Domain: ', options: { bold: true, color: PRIMARY_DARK } },
    { text: 'Machine Learning / Neural Networks / Educational Demonstration\n', options: { color: TEXT_MUTED } },
    { text: 'Architecture: ', options: { bold: true, color: PRIMARY_DARK } },
    { text: '3 Inputs (Attendance, Marks, Study Hours) → 4 Hidden (ReLU) → 2 Outputs (Softmax)\n', options: { color: TEXT_MUTED } },
    { text: 'Mathematical Scope: ', options: { bold: true, color: PRIMARY_DARK } },
    { text: 'Matrix Multiplication, Biases, Activation Functions & Numerical Stability', options: { color: TEXT_MUTED } }
  ], {
    x: 1.3,
    y: 4.9,
    w: 10.7,
    h: 1.4,
    fontSize: 13,
    fontFace: 'Arial',
    lineSpacing: 22,
  });

  // -------------------------------------------------------------
  // SLIDE 2: Introduction, Problem Statement & Objectives
  // -------------------------------------------------------------
  const slide2 = pptx.addSlide();
  slide2.background = { color: BG_LIGHT };

  slide2.addText('PROJECT OVERVIEW', { x: 0.8, y: 0.5, w: 11, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
  slide2.addText('Introduction, Problem Statement & Project Objectives', { x: 0.8, y: 0.8, w: 11, h: 0.6, fontSize: 22, bold: true, color: PRIMARY_DARK });

  // 3 Column Cards
  // Card 1: Problem Statement
  slide2.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.6, w: 3.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide2.addText('Problem Statement', { x: 1.0, y: 1.8, w: 3.3, h: 0.4, fontSize: 16, bold: true, color: DANGER_RED });
  slide2.addText([
    { text: '• Black-Box Misconception:\n', options: { bold: true } },
    { text: 'Beginners frequently view neural networks as opaque black boxes without understanding inner vector mathematics.\n\n' },
    { text: '• Abstract Teaching:\n', options: { bold: true } },
    { text: 'Academic textbooks often state equations without showing exact matrix transformations on concrete numbers.\n\n' },
    { text: '• Need for Transparency:\n', options: { bold: true } },
    { text: 'Students need clear, verifiable step-by-step arithmetic from raw academic attributes to probability distributions.' }
  ], { x: 1.0, y: 2.3, w: 3.3, h: 4.1, fontSize: 12, color: PRIMARY_DARK, lineSpacing: 18 });

  // Card 2: Core Objectives
  slide2.addShape(pptx.ShapeType.roundRect, { x: 4.8, y: 1.6, w: 3.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide2.addText('Core Objectives', { x: 5.0, y: 1.8, w: 3.3, h: 0.4, fontSize: 16, bold: true, color: PRIMARY_BLUE });
  slide2.addText([
    { text: '• Transparent Implementation:\n', options: { bold: true } },
    { text: 'Build a multi-layer perceptron running pure forward propagation with documented weights and biases.\n\n' },
    { text: '• Step-by-Step Visualization:\n', options: { bold: true } },
    { text: 'Provide a real-time reactive interface displaying intermediate sums, ReLU clipping, and Softmax logs.\n\n' },
    { text: '• Dual Precision Display:\n', options: { bold: true } },
    { text: 'Present rounded whole-number views for intuitive comprehension while maintaining full floating-point precision.' }
  ], { x: 5.0, y: 2.3, w: 3.3, h: 4.1, fontSize: 12, color: PRIMARY_DARK, lineSpacing: 18 });

  // Card 3: Scope & Realism
  slide2.addShape(pptx.ShapeType.roundRect, { x: 8.8, y: 1.6, w: 3.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide2.addText('Educational Boundaries', { x: 9.0, y: 1.8, w: 3.3, h: 0.4, fontSize: 16, bold: true, color: SUCCESS_GREEN });
  slide2.addText([
    { text: '• Illustrative Network:\n', options: { bold: true } },
    { text: 'Employs carefully calibrated pedagogical weights designed to illustrate mathematical principles.\n\n' },
    { text: '• Explicit Disclaimers:\n', options: { bold: true } },
    { text: 'No fabricated training metrics, false accuracies, or synthetic clinical claims.\n\n' },
    { text: '• Foundation for ML:\n', options: { bold: true } },
    { text: 'Prepares learners for advanced concepts like Backpropagation, Gradient Descent, and Loss Functions.' }
  ], { x: 9.0, y: 2.3, w: 3.3, h: 4.1, fontSize: 12, color: PRIMARY_DARK, lineSpacing: 18 });

  // -------------------------------------------------------------
  // SLIDE 3: System Architecture: Input, Hidden & Output Layers
  // -------------------------------------------------------------
  const slide3 = pptx.addSlide();
  slide3.background = { color: BG_LIGHT };

  slide3.addText('NEURAL ARCHITECTURE', { x: 0.8, y: 0.5, w: 11, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
  slide3.addText('System Architecture: 3-Layer Feed-Forward Topology', { x: 0.8, y: 0.8, w: 11, h: 0.6, fontSize: 22, bold: true, color: PRIMARY_DARK });

  // Diagram Box Container
  slide3.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.6, w: 11.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });

  // Column 1: Input Layer (3 nodes)
  slide3.addShape(pptx.ShapeType.roundRect, { x: 1.2, y: 2.0, w: 3.2, h: 4.2, fill: { color: ACCENT_BG }, line: { color: PRIMARY_BLUE, width: 1 } });
  slide3.addText('INPUT LAYER (x ∈ ℝ³)', { x: 1.4, y: 2.2, w: 2.8, h: 0.4, fontSize: 13, bold: true, color: PRIMARY_BLUE, align: 'center' });
  slide3.addShape(pptx.ShapeType.ellipse, { x: 1.6, y: 2.8, w: 0.7, h: 0.7, fill: { color: PRIMARY_BLUE } });
  slide3.addText('x₁', { x: 1.6, y: 2.8, w: 0.7, h: 0.7, color: 'FFFFFF', bold: true, align: 'center', fontSize: 12 });
  slide3.addText('Attendance (0–100%)', { x: 2.4, y: 2.9, w: 1.9, h: 0.5, fontSize: 11, bold: true, color: PRIMARY_DARK });

  slide3.addShape(pptx.ShapeType.ellipse, { x: 1.6, y: 3.8, w: 0.7, h: 0.7, fill: { color: PRIMARY_BLUE } });
  slide3.addText('x₂', { x: 1.6, y: 3.8, w: 0.7, h: 0.7, color: 'FFFFFF', bold: true, align: 'center', fontSize: 12 });
  slide3.addText('Exam Marks (0–100)', { x: 2.4, y: 3.9, w: 1.9, h: 0.5, fontSize: 11, bold: true, color: PRIMARY_DARK });

  slide3.addShape(pptx.ShapeType.ellipse, { x: 1.6, y: 4.8, w: 0.7, h: 0.7, fill: { color: PRIMARY_BLUE } });
  slide3.addText('x₃', { x: 1.6, y: 4.8, w: 0.7, h: 0.7, color: 'FFFFFF', bold: true, align: 'center', fontSize: 12 });
  slide3.addText('Study Hours (0–12 h/d)', { x: 2.4, y: 4.9, w: 1.9, h: 0.5, fontSize: 11, bold: true, color: PRIMARY_DARK });

  // Column 2: Hidden Layer (4 nodes)
  slide3.addShape(pptx.ShapeType.roundRect, { x: 5.0, y: 2.0, w: 3.5, h: 4.2, fill: { color: 'F0FDF4' }, line: { color: SUCCESS_GREEN, width: 1 } });
  slide3.addText('HIDDEN LAYER (4 Neurons + ReLU)', { x: 5.1, y: 2.2, w: 3.3, h: 0.4, fontSize: 13, bold: true, color: SUCCESS_GREEN, align: 'center' });

  const hNodes = [
    { label: 'h₁: Academic Aptitude', y: 2.7 },
    { label: 'h₂: Consistency & Effort', y: 3.5 },
    { label: 'h₃: At-Risk Pattern', y: 4.3 },
    { label: 'h₄: Baseline Competence', y: 5.1 },
  ];
  hNodes.forEach((n, idx) => {
    slide3.addShape(pptx.ShapeType.ellipse, { x: 5.3, y: n.y, w: 0.6, h: 0.6, fill: { color: SUCCESS_GREEN } });
    slide3.addText(`h${idx+1}`, { x: 5.3, y: n.y, w: 0.6, h: 0.6, color: 'FFFFFF', bold: true, align: 'center', fontSize: 11 });
    slide3.addText(n.label, { x: 6.0, y: n.y + 0.1, w: 2.4, h: 0.4, fontSize: 10, bold: true, color: PRIMARY_DARK });
  });

  // Column 3: Output Layer (2 nodes)
  slide3.addShape(pptx.ShapeType.roundRect, { x: 9.1, y: 2.0, w: 3.1, h: 4.2, fill: { color: 'FEF2F2' }, line: { color: DANGER_RED, width: 1 } });
  slide3.addText('OUTPUT LAYER (Softmax)', { x: 9.2, y: 2.2, w: 2.9, h: 0.4, fontSize: 13, bold: true, color: PRIMARY_DARK, align: 'center' });

  slide3.addShape(pptx.ShapeType.ellipse, { x: 9.4, y: 3.2, w: 0.7, h: 0.7, fill: { color: SUCCESS_GREEN } });
  slide3.addText('y₁', { x: 9.4, y: 3.2, w: 0.7, h: 0.7, color: 'FFFFFF', bold: true, align: 'center', fontSize: 12 });
  slide3.addText('PASS Probability (%)', { x: 10.2, y: 3.3, w: 1.9, h: 0.5, fontSize: 11, bold: true, color: SUCCESS_GREEN });

  slide3.addShape(pptx.ShapeType.ellipse, { x: 9.4, y: 4.4, w: 0.7, h: 0.7, fill: { color: DANGER_RED } });
  slide3.addText('y₂', { x: 9.4, y: 4.4, w: 0.7, h: 0.7, color: 'FFFFFF', bold: true, align: 'center', fontSize: 12 });
  slide3.addText('FAIL Probability (%)', { x: 10.2, y: 4.5, w: 1.9, h: 0.5, fontSize: 11, bold: true, color: DANGER_RED });

  // -------------------------------------------------------------
  // SLIDE 4: Forward Propagation Workflow & Mathematical Formulas
  // -------------------------------------------------------------
  const slide4 = pptx.addSlide();
  slide4.background = { color: BG_LIGHT };

  slide4.addText('MATHEMATICAL FORMULATION', { x: 0.8, y: 0.5, w: 11, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
  slide4.addText('Forward Propagation Workflow with Explicit Formulas', { x: 0.8, y: 0.8, w: 11, h: 0.6, fontSize: 22, bold: true, color: PRIMARY_DARK });

  // 4 Horizontal Workflow Stages
  const stages = [
    {
      num: 'STEP 1',
      title: 'Linear Combinations',
      formula: 'z_hidden = W₁ · X + b₁',
      desc: 'Dot product of inputs (X) and weight matrix (W₁) plus bias vector (b₁). Computes pre-activation logits.',
      x: 0.8,
    },
    {
      num: 'STEP 2',
      title: 'ReLU Non-Linearity',
      formula: 'a = max(0, z_hidden)',
      desc: 'Rectified Linear Unit zeroes out negative responses, introducing non-linear feature representation.',
      x: 3.8,
    },
    {
      num: 'STEP 3',
      title: 'Output Affine Map',
      formula: 'z_out = W₂ · a + b₂',
      desc: 'Second linear transformation weighting activated hidden neurons into PASS and FAIL output logits.',
      x: 6.8,
    },
    {
      num: 'STEP 4',
      title: 'Numerically Stable Softmax',
      formula: 'P(y_i) = e^(z_i - max(z)) / Σ e^(z_j - max(z))',
      desc: 'Converts unconstrained real-valued logits into normalized probability distribution summing to 1.0 (100%).',
      x: 9.8,
    },
  ];

  stages.forEach(s => {
    slide4.addShape(pptx.ShapeType.roundRect, { x: s.x, y: 1.6, w: 2.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1.5 } });
    slide4.addText(s.num, { x: s.x + 0.2, y: 1.8, w: 2.3, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
    slide4.addText(s.title, { x: s.x + 0.2, y: 2.1, w: 2.3, h: 0.5, fontSize: 14, bold: true, color: PRIMARY_DARK });

    // Formula Box
    slide4.addShape(pptx.ShapeType.rect, { x: s.x + 0.2, y: 2.7, w: 2.3, h: 1.1, fill: { color: ACCENT_BG } });
    slide4.addText(s.formula, { x: s.x + 0.25, y: 2.8, w: 2.2, h: 0.9, fontSize: 11, bold: true, color: PRIMARY_BLUE, align: 'center' });

    slide4.addText(s.desc, { x: s.x + 0.2, y: 4.0, w: 2.3, h: 2.3, fontSize: 11, color: PRIMARY_DARK, lineSpacing: 16 });
  });

  // -------------------------------------------------------------
  // SLIDE 5: Student Input Example & Profiles
  // -------------------------------------------------------------
  const slide5 = pptx.addSlide();
  slide5.background = { color: BG_LIGHT };

  slide5.addText('INPUT DATA SPECIFICATION', { x: 0.8, y: 0.5, w: 11, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
  slide5.addText('Student Input Example: Attendance, Marks & Study Hours', { x: 0.8, y: 0.8, w: 11, h: 0.6, fontSize: 22, bold: true, color: PRIMARY_DARK });

  // Left: Feature definition table
  slide5.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.6, w: 5.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide5.addText('Feature Parameter Definitions', { x: 1.1, y: 1.8, w: 5.1, h: 0.4, fontSize: 16, bold: true, color: PRIMARY_DARK });

  const inputRows = [
    { name: 'Student Attendance', range: '0% – 100%', default: '85%', role: 'Measures classroom discipline, consistency and engagement.' },
    { name: 'Exam Marks', range: '0 – 100', default: '70', role: 'Represents academic knowledge mastery on summative evaluations.' },
    { name: 'Daily Study Hours', range: '0 – 12 hrs/day', default: '4 hrs', role: 'Indicates individual preparation time outside mandatory lecture periods.' },
  ];

  inputRows.forEach((r, idx) => {
    const yPos = 2.4 + idx * 1.3;
    slide5.addShape(pptx.ShapeType.roundRect, { x: 1.1, y: yPos, w: 5.1, h: 1.15, fill: { color: BG_LIGHT }, line: { color: BORDER_COLOR, width: 1 } });
    slide5.addText(`${r.name} (Default: ${r.default})`, { x: 1.3, y: yPos + 0.1, w: 4.7, h: 0.3, fontSize: 13, bold: true, color: PRIMARY_BLUE });
    slide5.addText(`Valid Range: ${r.range} | ${r.role}`, { x: 1.3, y: yPos + 0.45, w: 4.7, h: 0.6, fontSize: 11, color: PRIMARY_DARK });
  });

  // Right: Evaluated Test Scenarios
  slide5.addShape(pptx.ShapeType.roundRect, { x: 6.8, y: 1.6, w: 5.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide5.addText('Demonstration Test Profiles', { x: 7.1, y: 1.8, w: 5.1, h: 0.4, fontSize: 16, bold: true, color: PRIMARY_DARK });

  const profiles = [
    {
      title: 'Profile A: High Achiever',
      inputs: 'Attendance: 95% | Marks: 90 | Study: 8 hrs',
      outcome: 'PASS 99.86% | FAIL 0.14%',
      badge: 'PASS',
      badgeColor: SUCCESS_GREEN,
    },
    {
      title: 'Profile B: Default Benchmark Student',
      inputs: 'Attendance: 85% | Marks: 70 | Study: 4 hrs',
      outcome: 'PASS 98.67% | FAIL 1.33%',
      badge: 'PASS',
      badgeColor: SUCCESS_GREEN,
    },
    {
      title: 'Profile C: At-Risk / Borderline Student',
      inputs: 'Attendance: 45% | Marks: 38 | Study: 1 hr',
      outcome: 'PASS 52.74% | FAIL 47.26%',
      badge: 'BORDERLINE',
      badgeColor: 'D97706',
    },
    {
      title: 'Profile D: Underperforming Student',
      inputs: 'Attendance: 30% | Marks: 25 | Study: 1 hr',
      outcome: 'PASS 24.48% | FAIL 75.52%',
      badge: 'FAIL',
      badgeColor: DANGER_RED,
    },
  ];

  profiles.forEach((p, idx) => {
    const yPos = 2.3 + idx * 1.05;
    slide5.addShape(pptx.ShapeType.roundRect, { x: 7.1, y: yPos, w: 5.1, h: 0.95, fill: { color: BG_LIGHT }, line: { color: BORDER_COLOR, width: 1 } });
    slide5.addText(p.title, { x: 7.3, y: yPos + 0.08, w: 3.5, h: 0.3, fontSize: 12, bold: true, color: PRIMARY_DARK });
    slide5.addText(p.inputs, { x: 7.3, y: yPos + 0.33, w: 4.7, h: 0.25, fontSize: 10, color: TEXT_MUTED });
    slide5.addText(p.outcome, { x: 7.3, y: yPos + 0.58, w: 4.7, h: 0.25, fontSize: 10, bold: true, color: p.badgeColor });
  });

  // -------------------------------------------------------------
  // SLIDE 6: Worked Numerical Example (Exact Model Math)
  // -------------------------------------------------------------
  const slide6 = pptx.addSlide();
  slide6.background = { color: BG_LIGHT };

  slide6.addText('STEP-BY-STEP CALCULATION', { x: 0.8, y: 0.5, w: 11, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
  slide6.addText('Worked Numerical Example (Default Student: Att=85, Marks=70, Study=4)', { x: 0.8, y: 0.8, w: 11, h: 0.6, fontSize: 21, bold: true, color: PRIMARY_DARK });

  // 3 Boxes: Hidden Layer, Output Layer, Softmax
  // Box 1: Hidden Layer Calculations
  slide6.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.6, w: 4.8, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide6.addText('1. Hidden Layer (W₁ · X + b₁) & ReLU', { x: 1.0, y: 1.8, w: 4.4, h: 0.4, fontSize: 13, bold: true, color: PRIMARY_BLUE });

  slide6.addText([
    { text: 'Neuron h₁ (Academic Aptitude):\n', options: { bold: true } },
    { text: 'z₁ = (0.020×85) + (0.030×70) + (0.080×4) - 2.20 = 1.9200\n' },
    { text: 'a₁ = ReLU(1.9200) = 1.9200 (Rounded: 2)\n\n', options: { color: SUCCESS_GREEN, bold: true } },

    { text: 'Neuron h₂ (Consistency & Effort):\n', options: { bold: true } },
    { text: 'z₂ = (0.025×85) + (0.015×70) + (0.100×4) - 1.80 = 1.7750\n' },
    { text: 'a₂ = ReLU(1.7750) = 1.7750 (Rounded: 2)\n\n', options: { color: SUCCESS_GREEN, bold: true } },

    { text: 'Neuron h₃ (At-Risk Pattern):\n', options: { bold: true } },
    { text: 'z₃ = (-0.025×85) + (-0.035×70) + (-0.060×4) + 2.60 = -2.2150\n' },
    { text: 'a₃ = ReLU(-2.2150) = 0.0000 (Deactivated / Clipped)\n\n', options: { color: DANGER_RED, bold: true } },

    { text: 'Neuron h₄ (Baseline Competence):\n', options: { bold: true } },
    { text: 'z₄ = (0.010×85) + (0.015×70) + (0.040×4) - 1.00 = 1.0600\n' },
    { text: 'a₄ = ReLU(1.0600) = 1.0600 (Rounded: 1)', options: { color: SUCCESS_GREEN, bold: true } },
  ], { x: 1.0, y: 2.2, w: 4.4, h: 4.2, fontSize: 10, color: PRIMARY_DARK, lineSpacing: 14 });

  // Box 2: Output Layer Calculations
  slide6.addShape(pptx.ShapeType.roundRect, { x: 5.9, y: 1.6, w: 3.4, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide6.addText('2. Output Logits (W₂ · a + b₂)', { x: 6.1, y: 1.8, w: 3.0, h: 0.4, fontSize: 13, bold: true, color: PRIMARY_BLUE });

  slide6.addText([
    { text: 'Pass Logit (z_pass):\n', options: { bold: true } },
    { text: '= (0.55 × 1.9200)\n  + (0.45 × 1.7750)\n  + (-0.70 × 0.0000)\n  + (0.30 × 1.0600) + 0.10\n' },
    { text: '= 1.056 + 0.7988 + 0 + 0.318 + 0.10\n' },
    { text: '= 2.2727 (Rounded: 2)\n\n', options: { color: SUCCESS_GREEN, bold: true } },

    { text: 'Fail Logit (z_fail):\n', options: { bold: true } },
    { text: '= (-0.50 × 1.9200)\n  + (-0.40 × 1.7750)\n  + (0.75 × 0.0000)\n  + (-0.25 × 1.0600) - 0.10\n' },
    { text: '= -0.96 - 0.71 - 0 - 0.265 - 0.10\n' },
    { text: '= -2.0350 (Rounded: -2)', options: { color: DANGER_RED, bold: true } }
  ], { x: 6.1, y: 2.2, w: 3.0, h: 4.2, fontSize: 10, color: PRIMARY_DARK, lineSpacing: 14 });

  // Box 3: Softmax Probabilities
  slide6.addShape(pptx.ShapeType.roundRect, { x: 9.6, y: 1.6, w: 2.9, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide6.addText('3. Softmax & Result', { x: 9.8, y: 1.8, w: 2.5, h: 0.4, fontSize: 13, bold: true, color: PRIMARY_BLUE });

  slide6.addText([
    { text: 'Shift by max(z) = 2.2727:\n', options: { bold: true } },
    { text: 'e^(2.2727 - 2.2727) = e^0 = 1.0000\n' },
    { text: 'e^(-2.0350 - 2.2727) = e^(-4.3077)\n= 0.01346\n\n' },
    { text: 'Sum of Exponents:\n', options: { bold: true } },
    { text: 'Σ = 1.0000 + 0.0135 = 1.0135\n\n' },
    { text: 'Final Probabilities:\n', options: { bold: true } },
    { text: 'PASS = 1.0000 / 1.0135\n= 98.67%\n', options: { color: SUCCESS_GREEN, bold: true } },
    { text: 'FAIL = 0.0135 / 1.0135\n= 1.33%\n\n', options: { color: DANGER_RED, bold: true } },
    { text: 'PREDICTED: PASS', options: { color: SUCCESS_GREEN, bold: true, fontSize: 13 } }
  ], { x: 9.8, y: 2.2, w: 2.5, h: 4.2, fontSize: 10, color: PRIMARY_DARK, lineSpacing: 14 });

  // -------------------------------------------------------------
  // SLIDE 7: Website Demonstration, Applications, Advantages & Limitations
  // -------------------------------------------------------------
  const slide7 = pptx.addSlide();
  slide7.background = { color: BG_LIGHT };

  slide7.addText('PRACTICAL IMPLICATIONS', { x: 0.8, y: 0.5, w: 11, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
  slide7.addText('Website Demonstration, Applications, Advantages & Limitations', { x: 0.8, y: 0.8, w: 11, h: 0.6, fontSize: 22, bold: true, color: PRIMARY_DARK });

  // 4 Grid Cards
  const gridCards = [
    {
      x: 0.8,
      y: 1.6,
      title: 'Interactive Web Platform',
      color: PRIMARY_BLUE,
      items: [
        '• Responsive Vite + React + TypeScript web application',
        '• Instant dynamic calculations upon any input adjustment',
        '• Interactive SVG neural network diagram with layer nodes',
        '• Dual-view toggle: integer rounded vs exact raw decimals',
      ],
    },
    {
      x: 6.8,
      y: 1.6,
      title: 'Educational Applications',
      color: SUCCESS_GREEN,
      items: [
        '• Undergraduate artificial intelligence & machine learning lectures',
        '• Classroom visualization of matrix transformations and dot products',
        '• Intuitive demonstration of activation function thresholding (ReLU)',
        '• Concrete hands-on preparation for studying backpropagation',
      ],
    },
    {
      x: 0.8,
      y: 4.2,
      title: 'Project Advantages',
      color: PRIMARY_DARK,
      items: [
        '• Complete transparency: 100% open math, no hidden weights',
        '• Zero server latency: runs fully client-side in the browser',
        '• Numeric stability: protects against floating-point overflow',
        '• Validated UI: built-in input boundary validation and presets',
      ],
    },
    {
      x: 6.8,
      y: 4.2,
      title: 'Known Limitations',
      color: DANGER_RED,
      items: [
        '• Illustrative parameters: not trained on clinical or actual students',
        '• Fixed static weights: lacks backpropagation gradient updates',
        '• Simplified feature set: real academic success has many factors',
        '• Non-prescriptive: strictly for classroom teaching and exploration',
      ],
    },
  ];

  gridCards.forEach(c => {
    slide7.addShape(pptx.ShapeType.roundRect, { x: c.x, y: c.y, w: 5.7, h: 2.4, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
    slide7.addText(c.title, { x: c.x + 0.3, y: c.y + 0.2, w: 5.1, h: 0.35, fontSize: 14, bold: true, color: c.color });
    slide7.addText(c.items.join('\n'), { x: c.x + 0.3, y: c.y + 0.65, w: 5.1, h: 1.6, fontSize: 11, color: PRIMARY_DARK, lineSpacing: 18 });
  });

  // -------------------------------------------------------------
  // SLIDE 8: Conclusion, Future Scope & Q&A
  // -------------------------------------------------------------
  const slide8 = pptx.addSlide();
  slide8.background = { color: BG_LIGHT };

  slide8.addText('CONCLUSION & FUTURE SCOPE', { x: 0.8, y: 0.5, w: 11, h: 0.3, fontSize: 11, bold: true, color: PRIMARY_BLUE });
  slide8.addText('Project Summary, Future Scope & Questions & Answers', { x: 0.8, y: 0.8, w: 11, h: 0.6, fontSize: 22, bold: true, color: PRIMARY_DARK });

  // Left Card: Summary & Key Takeaways
  slide8.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.6, w: 5.7, h: 5.0, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide8.addText('Summary & Key Takeaways', { x: 1.1, y: 1.8, w: 5.1, h: 0.4, fontSize: 16, bold: true, color: PRIMARY_BLUE });

  slide8.addText([
    { text: '1. Demystifying Neural Operations:\n', options: { bold: true } },
    { text: 'Successfully proved how raw attributes transform into probability scores through sequential matrix arithmetic.\n\n' },
    { text: '2. Mathematical Rigor in Action:\n', options: { bold: true } },
    { text: 'Demonstrated practical ReLU rectification (killing negative noise) and numerically shifted Softmax.\n\n' },
    { text: '3. Educational Integrity:\n', options: { bold: true } },
    { text: 'Established that transparent, unpretentious simulation fosters genuine comprehension better than black-box hype.' }
  ], { x: 1.1, y: 2.3, w: 5.1, h: 4.0, fontSize: 12, color: PRIMARY_DARK, lineSpacing: 18 });

  // Right Card: Future Scope & Q&A Banner
  slide8.addShape(pptx.ShapeType.roundRect, { x: 6.8, y: 1.6, w: 5.7, h: 3.2, fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 } });
  slide8.addText('Future Research & Extensions', { x: 7.1, y: 1.8, w: 5.1, h: 0.4, fontSize: 16, bold: true, color: SUCCESS_GREEN });

  slide8.addText([
    { text: '• Backpropagation Engine: ', options: { bold: true } },
    { text: 'Implement SGD and Adam optimizers with live epoch-by-epoch loss curves.\n' },
    { text: '• Real Dataset Integration: ', options: { bold: true } },
    { text: 'Train on anonymized institutional benchmarks with cross-validation.\n' },
    { text: '• Multi-Class Outputs: ', options: { bold: true } },
    { text: 'Extend predictions from binary Pass/Fail to Letter Grades (A, B, C, D, F).\n' },
    { text: '• Model Explainability: ', options: { bold: true } },
    { text: 'Add SHAP values to explain individual feature attribution.' }
  ], { x: 7.1, y: 2.3, w: 5.1, h: 2.3, fontSize: 11, color: PRIMARY_DARK, lineSpacing: 16 });

  // Q&A Box
  slide8.addShape(pptx.ShapeType.roundRect, { x: 6.8, y: 5.0, w: 5.7, h: 1.6, fill: { color: PRIMARY_BLUE } });
  slide8.addText('QUESTIONS & ANSWERS', { x: 7.1, y: 5.2, w: 5.1, h: 0.4, fontSize: 18, bold: true, color: 'FFFFFF', align: 'center' });
  slide8.addText('Thank you! We welcome questions on forward propagation, network topology, and numerical evaluation.', {
    x: 7.1,
    y: 5.7,
    w: 5.1,
    h: 0.7,
    fontSize: 12,
    color: 'FFFFFF',
    align: 'center',
  });

  const outputPath = path.resolve('Student_Performance_Prediction_Forward_Propagation.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Presentation generated successfully at: ${outputPath}`);
}

generatePresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
