import { useState } from 'react';
import { SimulationChart } from './components/SimulationChart';
import { PIDControls } from './components/PIDControls';
import { InputControls } from './components/InputControls';
import { runSimulation, type PIDParams, type SimulationStep } from './utils/pidSimulation';
import { Card, CardContent } from './components/ui/Card';
import { Button } from './components/ui/Button';

function App() {
  const [pidParams, setPidParams] = useState<PIDParams>({
    kp: 1.0,
    ki: 0.5,
    kd: 0.1,
  });

  const [inputType, setInputType] = useState<'constant' | 'step' | 'sine'>('step');
  const [inputParams, setInputParams] = useState({
    steps: [
      { time: 0, value: 0 },
      { time: 2, value: 100 },
      { time: 5, value: 50 },
    ],
  });

  const [noiseLevel, setNoiseLevel] = useState(0);
  const [simulationData, setSimulationData] = useState<SimulationStep[]>([]);

  const handleRunSimulation = () => {
    const simParams = {
      duration: 10,
      dt: 0.01,
      systemTau: 1.0,
      noise: noiseLevel,
    };

    const results = runSimulation(pidParams, simParams, inputType, inputParams);
    setSimulationData(results);
  };

  const handleReset = () => {
    setPidParams({
      kp: 1.0,
      ki: 0.5,
      kd: 0.1,
    });
    setNoiseLevel(0);
    setSimulationData([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            🎛️ PID 제어 시뮬레이터
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            입력값, PID 파라미터 및 외부 잡음에 따른 시스템 응답 시뮬레이션
          </p>
        </div>

        {/* Main Grid Layout - Explicit two-column layout */}
        <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: '350px 1fr' }}>
          {/* Left Column - Controls (Fixed width) */}
          <div className="space-y-6">
            <PIDControls
              pidParams={pidParams}
              onParamsChange={setPidParams}
              onReset={handleReset}
            />
            <InputControls
              inputType={inputType}
              onInputTypeChange={setInputType}
              inputParams={inputParams}
              onInputParamsChange={setInputParams}
              noiseLevel={noiseLevel}
              onNoiseLevelChange={setNoiseLevel}
            />

            {/* Simulation Button */}
            <Button
              onClick={handleRunSimulation}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800"
            >
              ▶ 시뮬레이션 실행
            </Button>
          </div>

          {/* Right Column - Chart (Flexible) */}
          <div className="w-full">
            <SimulationChart data={simulationData} />
          </div>
        </div>

        {/* Stats Section */}
        {simulationData.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                📊 시뮬레이션 통계
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">최대 출력</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                    {Math.max(...simulationData.map((d) => d.output)).toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">최종 출력</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                    {simulationData[simulationData.length - 1].output.toFixed(2)}
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">정상상태오차</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                    {Math.abs(simulationData[simulationData.length - 1].error).toFixed(2)}
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">평균 오차</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                    {(simulationData.reduce((sum, d) => sum + Math.abs(d.error), 0) / simulationData.length).toFixed(2)}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">데이터 포인트</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                    {simulationData.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
