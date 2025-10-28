// PID 시뮬레이션 엔진

export interface PIDParams {
  kp: number;  // 비례 계수
  ki: number;  // 적분 계수
  kd: number;  // 미분 계수
}

export interface SimulationParams {
  duration: number;  // 시뮬레이션 시간 (초)
  dt: number;        // 샘플링 시간 간격 (초)
  systemTau: number; // 시스템 시정수 (초)
  noise: number;     // 잡음 크기 (표준편차)
}

export interface SimulationStep {
  time: number;
  reference: number;
  output: number;
  error: number;
  control: number;
}

// 가우시안 난수 생성 (Box-Muller 변환)
function gaussianRandom(mean: number = 0, stdev: number = 1): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z0 * stdev + mean;
}

// 1차 선형 시스템 (1-order system)
// dy/dt = -1/tau * y + 1/tau * u
function simulateSystem(
  y: number,
  u: number,
  tau: number,
  dt: number
): number {
  const dydt = (-1 / tau) * y + (1 / tau) * u;
  return y + dydt * dt;
}

// 참조 입력값 생성
export function generateReferenceInput(
  time: number,
  inputType: 'constant' | 'step' | 'sine',
  params: any
): number {
  switch (inputType) {
    case 'constant':
      return params.value || 0;
    
    case 'step':
      // 여러 단계 입력
      const steps = params.steps || [{ time: 0, value: 0 }];
      let currentValue = steps[0].value;
      for (const step of steps) {
        if (time >= step.time) {
          currentValue = step.value;
        }
      }
      return currentValue;
    
    case 'sine':
      const amplitude = params.amplitude || 100;
      const frequency = params.frequency || 0.1;
      const offset = params.offset || 0;
      return offset + amplitude * Math.sin(2 * Math.PI * frequency * time);
    
    default:
      return 0;
  }
}

// PID 제어기
class PIDController {
  private kp: number;
  private ki: number;
  private kd: number;
  private integral: number = 0;
  private prevError: number = 0;

  constructor(kp: number, ki: number, kd: number) {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
  }

  // 제어 신호 계산
  calculate(error: number, dt: number): number {
    // 비례 항
    const pTerm = this.kp * error;

    // 적분 항
    this.integral += error * dt;
    const iTerm = this.ki * this.integral;

    // 미분 항
    const dTerm = this.kd * (error - this.prevError) / dt;

    this.prevError = error;

    return pTerm + iTerm + dTerm;
  }

  reset(): void {
    this.integral = 0;
    this.prevError = 0;
  }
}

// 전체 시뮬레이션 실행
export function runSimulation(
  pidParams: PIDParams,
  simParams: SimulationParams,
  inputType: 'constant' | 'step' | 'sine',
  inputParams: any
): SimulationStep[] {
  const results: SimulationStep[] = [];
  const pid = new PIDController(pidParams.kp, pidParams.ki, pidParams.kd);

  let output = 0;
  let time = 0;

  const steps = Math.floor(simParams.duration / simParams.dt);

  for (let i = 0; i <= steps; i++) {
    // 참조 입력값 계산
    const reference = generateReferenceInput(time, inputType, inputParams);

    // 오차 계산
    const error = reference - output;

    // PID 제어 신호 계산
    const control = pid.calculate(error, simParams.dt);

    // 시스템 시뮬레이션
    const noisyControl = control + gaussianRandom(0, simParams.noise);
    output = simulateSystem(output, noisyControl, simParams.systemTau, simParams.dt);

    results.push({
      time,
      reference,
      output,
      error,
      control,
    });

    time += simParams.dt;
  }

  return results;
}
