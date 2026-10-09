# Project Overview: Student Performance Prediction using Forward Propagation

## 1. Executive Summary

This project implements an interactive, educational machine learning web platform and academic presentation demonstrating the foundational mechanics of **Forward Propagation** in Artificial Neural Networks (Multilayer Perceptrons).

Using three core student academic attributes—**Attendance percentage**, **Exam marks**, and **Daily study hours**—the system walks through matrix multiplication, bias addition, non-linear rectification via **ReLU**, and classification into **PASS** and **FAIL** probabilities via **numerically stable Softmax**.

---

## 2. Theoretical Foundations

Forward propagation is the deterministic inference pathway of artificial neural networks. Signals move strictly forward from the input layer through hidden intermediate layers to the final output nodes without cycle or feedback.

### 2.1 Layer Hierarchy

1. **Input Layer ($X \in \mathbb{R}^3$)**:
   - $x_1$: Student Attendance ($0 - 100\%$, default $85\%$)
   - $x_2$: Exam Marks ($0 - 100$, default $70$)
   - $x_3$: Daily Study Hours ($0 - 12\text{ hrs/day}$, default $4\text{ hrs}$)

2. **Hidden Layer ($h \in \mathbb{R}^4$)**:
   - Computes affine transformation: $z_{\text{hidden}} = W_1 \cdot X + b_1$
   - Applies Rectified Linear Unit activation: $a_i = \max(0, z_i)$
   - Hidden representations capture:
     - $h_1$: Academic Aptitude (weighted towards marks and attendance)
     - $h_2$: Consistency & Effort (weighted towards attendance and study hours)
     - $h_3$: At-Risk Pattern (negative weights; activates when attendance and marks are deficient)
     - $h_4$: Baseline Competence (balanced across all three attributes)

3. **Output Layer ($y \in \mathbb{R}^2$)**:
   - Computes output logits: $z_{\text{out}} = W_2 \cdot a + b_2$
   - $z_{\text{pass}}$: Affine combination favoring positive hidden features and suppressing risk
   - $z_{\text{fail}}$: Affine combination favoring at-risk activation and penalizing positive features

---

## 3. Mathematical Equations

### 3.1 Pre-activation Logits (Hidden Layer)
$$\begin{bmatrix} z_1 \\ z_2 \\ z_3 \\ z_4 \end{bmatrix} = \begin{bmatrix} 0.020 & 0.030 & 0.080 \\ 0.025 & 0.015 & 0.100 \\ -0.025 & -0.035 & -0.060 \\ 0.010 & 0.015 & 0.040 \end{bmatrix} \begin{bmatrix} x_{\text{att}} \\ x_{\text{marks}} \\ x_{\text{study}} \end{bmatrix} + \begin{bmatrix} -2.20 \\ -1.80 \\ 2.60 \\ -1.00 \end{bmatrix}$$

### 3.2 ReLU Non-Linear Activation
$$a_i = \max(0, z_i) = \begin{cases} z_i & \text{if } z_i > 0 \\ 0 & \text{if } z_i \le 0 \end{cases}$$

### 3.3 Output Logits
$$\begin{bmatrix} z_{\text{pass}} \\ z_{\text{fail}} \end{bmatrix} = \begin{bmatrix} 0.55 & 0.45 & -0.70 & 0.30 \\ -0.50 & -0.40 & 0.75 & -0.25 \end{bmatrix} \begin{bmatrix} a_1 \\ a_2 \\ a_3 \\ a_4 \end{bmatrix} + \begin{bmatrix} 0.10 \\ -0.10 \end{bmatrix}$$

### 3.4 Numerically Stable Softmax Normalization
To prevent numerical overflow when computing $e^z$, logits are shifted by their maximum value:
$$M = \max(z_{\text{pass}}, z_{\text{fail}})$$
$$P(\text{Pass}) = \frac{e^{z_{\text{pass}} - M}}{e^{z_{\text{pass}} - M} + e^{z_{\text{fail}} - M}}, \quad P(\text{Fail}) = \frac{e^{z_{\text{fail}} - M}}{e^{z_{\text{pass}} - M} + e^{z_{\text{fail}} - M}}$$

---

## 4. Worked Numerical Example (Default Benchmark)

For the default benchmark student:
- Attendance $x_1 = 85$
- Marks $x_2 = 70$
- Study Hours $x_3 = 4$

### Step 1: Hidden Layer
- $z_1 = (0.020 \times 85) + (0.030 \times 70) + (0.080 \times 4) - 2.20 = 1.70 + 2.10 + 0.32 - 2.20 = 1.9200$
  $\rightarrow a_1 = \max(0, 1.9200) = \mathbf{1.9200}$
- $z_2 = (0.025 \times 85) + (0.015 \times 70) + (0.100 \times 4) - 1.80 = 2.125 + 1.05 + 0.40 - 1.80 = 1.7750$
  $\rightarrow a_2 = \max(0, 1.7750) = \mathbf{1.7750}$
- $z_3 = (-0.025 \times 85) + (-0.035 \times 70) + (-0.060 \times 4) + 2.60 = -2.125 - 2.45 - 0.24 + 2.60 = -2.2150$
  $\rightarrow a_3 = \max(0, -2.2150) = \mathbf{0.0000}$ *(clipped)*
- $z_4 = (0.010 \times 85) + (0.015 \times 70) + (0.040 \times 4) - 1.00 = 0.85 + 1.05 + 0.16 - 1.00 = 1.0600$
  $\rightarrow a_4 = \max(0, 1.0600) = \mathbf{1.0600}$

### Step 2: Output Logits
- $z_{\text{pass}} = (0.55 \times 1.92) + (0.45 \times 1.775) + (-0.70 \times 0.0) + (0.30 \times 1.06) + 0.10 = 1.056 + 0.79875 + 0 + 0.318 + 0.10 = \mathbf{2.27275}$
- $z_{\text{fail}} = (-0.50 \times 1.92) + (-0.40 \times 1.775) + (0.75 \times 0.0) + (-0.25 \times 1.06) - 0.10 = -0.96 - 0.71 + 0 - 0.265 - 0.10 = \mathbf{-2.0350}$

### Step 3: Softmax Probabilities
- $M = \max(2.27275, -2.0350) = 2.27275$
- $e^{z_{\text{pass}} - M} = e^0 = \mathbf{1.0000}$
- $e^{z_{\text{fail}} - M} = e^{-4.30775} = \mathbf{0.01346}$
- $\Sigma = 1.0000 + 0.01346 = 1.01346$
- $P(\text{Pass}) = \frac{1.0000}{1.01346} = \mathbf{98.67\%}$
- $P(\text{Fail}) = \frac{0.01346}{1.01346} = \mathbf{1.33\%}$
- **Classification:** **PASS**

---

## 5. Limitations & Ethical Considerations

1. **Illustrative Pedagogical Parameters:** Weights and biases are manually configured to illustrate specific mathematical mechanics (thresholding, negative weight risk detection, and normalization).
2. **Absence of Optimization Engine:** The project focuses exclusively on the forward inference pipeline and does not perform Backpropagation, Stochastic Gradient Descent, or Loss minimization.
3. **Absence of Empirical Validation:** To maintain academic integrity, no false training accuracies, AUC metrics, or synthetic performance benchmarks are reported. Real-world student early-warning systems require large-scale longitudinal datasets, demographic fairness audits, and student privacy compliance (e.g., FERPA, GDPR).
