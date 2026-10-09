import { runForwardPropagation, W_HIDDEN, B_HIDDEN, W_OUTPUT, B_OUTPUT } from './src/model/neuralNetwork';

function testScenario(name: string, inputs: { attendance: number; marks: number; studyHours: number }, expectedPrediction: 'PASS' | 'FAIL') {
  const result = runForwardPropagation(inputs);
  const X = [inputs.attendance, inputs.marks, inputs.studyHours];
  
  // 1. Verify hidden layer linear combination and ReLU
  for (let i = 0; i < 4; i++) {
    const expectedZ = W_HIDDEN[i][0]*X[0] + W_HIDDEN[i][1]*X[1] + W_HIDDEN[i][2]*X[2] + B_HIDDEN[i];
    const expectedA = Math.max(0, expectedZ);
    if (Math.abs(result.hiddenNeurons[i].zRaw - expectedZ) > 1e-9) {
      throw new Error(`Mismatch in ${name} h${i+1} zRaw: got ${result.hiddenNeurons[i].zRaw}, expected ${expectedZ}`);
    }
    if (Math.abs(result.hiddenNeurons[i].aRaw - expectedA) > 1e-9) {
      throw new Error(`Mismatch in ${name} h${i+1} aRaw: got ${result.hiddenNeurons[i].aRaw}, expected ${expectedA}`);
    }
  }

  // 2. Verify output layer linear combination
  const activations = result.hiddenActivations;
  for (let j = 0; j < 2; j++) {
    const expectedOutZ = W_OUTPUT[j][0]*activations[0] + W_OUTPUT[j][1]*activations[1] + W_OUTPUT[j][2]*activations[2] + W_OUTPUT[j][3]*activations[3] + B_OUTPUT[j];
    if (Math.abs(result.outputNeurons[j].zRaw - expectedOutZ) > 1e-9) {
      throw new Error(`Mismatch in ${name} out${j+1} zRaw: got ${result.outputNeurons[j].zRaw}, expected ${expectedOutZ}`);
    }
  }

  // 3. Verify Softmax probabilities with numerical stability check
  const maxZ = Math.max(result.outputNeurons[0].zRaw, result.outputNeurons[1].zRaw);
  const exp0 = Math.exp(result.outputNeurons[0].zRaw - maxZ);
  const exp1 = Math.exp(result.outputNeurons[1].zRaw - maxZ);
  const sumExp = exp0 + exp1;
  const p0 = exp0 / sumExp;
  const p1 = exp1 / sumExp;

  if (Math.abs(result.passProbability - p0) > 1e-9 || Math.abs(result.failProbability - p1) > 1e-9) {
    throw new Error(`Mismatch in ${name} probabilities`);
  }

  // 4. Verify sum to 100%
  const totalProb = result.passProbability + result.failProbability;
  if (Math.abs(totalProb - 1.0) > 1e-7) {
    throw new Error(`Probabilities do not sum to 1: ${totalProb}`);
  }

  // 5. Verify outcome prediction
  if (result.predictedResult !== expectedPrediction) {
    throw new Error(`Mismatch in ${name} prediction: got ${result.predictedResult}, expected ${expectedPrediction}`);
  }

  console.log(`✓ ${name}: Pass ${(result.passProbability*100).toFixed(2)}%, Fail ${(result.failProbability*100).toFixed(2)}% -> ${result.predictedResult} (MATCH)`);
}

testScenario('Default Benchmark [85, 70, 4]', { attendance: 85, marks: 70, studyHours: 4 }, 'PASS');
testScenario('High Achiever [95, 90, 8]', { attendance: 95, marks: 90, studyHours: 8 }, 'PASS');
testScenario('Borderline / Marginal [48, 42, 2]', { attendance: 48, marks: 42, studyHours: 2 }, 'PASS');
testScenario('At-Risk Student [30, 25, 1]', { attendance: 30, marks: 25, studyHours: 1 }, 'FAIL');
testScenario('Zero Inputs Extremum [0, 0, 0]', { attendance: 0, marks: 0, studyHours: 0 }, 'FAIL');
testScenario('Max Inputs Extremum [100, 100, 12]', { attendance: 100, marks: 100, studyHours: 12 }, 'PASS');
console.log('ALL FORWARD PROPAGATION MATHEMATICAL CHECKS PASSED PERFECTLY.');
