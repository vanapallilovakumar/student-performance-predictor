# Student Performance Prediction using Forward Propagation in Machine Learning

A complete, responsive, modern web application and academic presentation demonstrating the internal mathematics of **Forward Propagation** in Artificial Neural Networks (Multilayer Perceptrons).

---

## 🌟 Project Highlights

- **Interactive Feedforward Simulator:** Dynamically computes affine transformations, hidden layer activations, and output probability distributions as student inputs change.
- **Dual Numerical Precision:** Seamlessly toggle between whole-number display (for classroom teaching) and raw high-precision floating-point decimals.
- **Mathematically Documented:** All 26 parameters (16 weights, 6 biases, 4 ReLU thresholds) are fully documented and auditable.
- **Numerically Stable Softmax:** Mitigates floating-point overflow hazards using maximum logit shifting.
- **8-Slide PowerPoint Presentation:** Pre-generated editable presentation ([`Student_Performance_Prediction_Forward_Propagation.pptx`](./Student_Performance_Prediction_Forward_Propagation.pptx)) ready for college seminars and project reviews.
- **High Academic Integrity:** Explicitly labeled as an educational demonstration with zero fabricated training accuracies or synthetic clinical claims.

---

## 🏗️ System Architecture

```
[ INPUT LAYER ]              [ HIDDEN LAYER ]           [ OUTPUT LAYER ]
  (3 Features)              (4 Neurons + ReLU)          (2 Nodes + Softmax)

x₁: Attendance (0-100) ----\   /---> h₁ (Aptitude) ----\
                            \ /                         \---> PASS Probability
x₂: Exam Marks (0-100) ------X-----> h₂ (Effort) --------X
                            / \                         /---> FAIL Probability
x₃: Study Hours (0-12) ----/   \---> h₃ (At-Risk) -----/
                                \--> h₄ (Baseline) ---/
```

- **Input Dimension:** $X \in \mathbb{R}^3$ [Attendance: 85%, Marks: 70, Study Hours: 4 hrs]
- **Hidden Layer:** $W_1 \in \mathbb{R}^{4 \times 3}$, $b_1 \in \mathbb{R}^4$, Activation: $\text{ReLU}(z) = \max(0, z)$
- **Output Layer:** $W_2 \in \mathbb{R}^{2 \times 4}$, $b_2 \in \mathbb{R}^2$, Activation: $\text{Softmax}(z)$

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher; tested on Node.js v24)
- npm (v9 or higher)

### Installation

Clone or extract into your project directory and install dependencies:

```bash
cd student-performance-predictor
npm install
```

### Running Locally

To start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Visit the local URL displayed in the terminal (usually `http://localhost:5173`).

### Production Build

To test TypeScript compilation and build the optimized production assets:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

### Linting

Run Oxlint to check code quality:

```bash
npm run lint
```

---

## 📊 Generating the PowerPoint Presentation

The project includes a standalone generator script to regenerate the 8-slide presentation file at any time:

```bash
npx tsx generate-pptx.ts
```

Output:
`Student_Performance_Prediction_Forward_Propagation.pptx` (Contains exactly 8 slides adhering to project specifications).

### Slide Structure

1. **Title Slide:** Student Performance Prediction using Forward Propagation in Machine Learning
2. **Introduction & Objectives:** Problem statement, black-box dilemma, transparent pedagogy
3. **System Architecture:** 3-Layer topology, weights, biases, and neuron roles
4. **Forward Propagation Workflow:** Step-by-step arithmetic equations
5. **Student Input Examples:** Feature attributes and test scenarios (High Achiever, Benchmark, Borderline, Underperforming)
6. **Worked Numerical Example:** Exact arithmetic trace of the default student ($85\%, 70, 4\text{h}$)
7. **Demonstration & Applications:** Web interface features, applications, advantages, and limitations
8. **Conclusion & Future Scope:** Project summary, research extensions, and Q&A

---

## 🌐 Deploying to GitHub & Vercel

### Step 1: Initialize Git and Commit

From the `student-performance-predictor` directory:

```bash
# Initialize a local Git repository
git init

# Stage all project files (ignoring node_modules and dist via .gitignore)
git add .

# Create the initial commit
git commit -m "feat: complete student performance prediction project with interactive web app and 8-slide PPT"
```

### Step 2: Push to a NEW GitHub Repository

1. Go to [GitHub.com](https://github.com/new) and create a **new repository** (e.g., `student-performance-predictor`).
2. Run the following commands:

```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/student-performance-predictor.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy as a NEW Vercel Project

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import the newly created `student-performance-predictor` GitHub repository.
4. Keep the default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**. Your site will be live on a production `.vercel.app` URL within seconds.

---

## ⚠️ Academic Disclaimer

This project is an **educational demonstration** designed to illustrate how feedforward layers process signals. The model utilizes illustrative, manually calibrated parameters to highlight linear algebra, thresholding, and normalization. It is **not** an empirically trained predictor and should not be used for actual academic decisions. Real-world predictive systems require institutional training datasets, cross-validation, and bias audits.
