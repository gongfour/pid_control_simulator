import { useState } from 'react';
import { SimulationChart } from './components/SimulationChart';
import { PIDControls } from './components/PIDControls';
import { InputControls } from './components/InputControls';
import { runSimulation, type PIDParams, type SimulationStep } from './utils/pidSimulation';

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
  const [isRunning, setIsRunning] = useState(false);

  const handleRunSimulation = () => {
    const simParams = {
      duration: 10,
      dt: 0.01,
      systemTau: 1.0,
      noise: noiseLevel,
    };

    const results = runSimulation(pidParams, simParams, inputType, inputParams);
    setSimulationData(results);
    setIsRunning(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎛️ PID 제어 시뮬레이터</h1>
          <p className="text-gray-600">입력값, PID 파라미터 및 외부 잡음에 따른 시스템 응답 시뮬레이션</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
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
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white text-lg transition ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              }`}
            >
              {isRunning ? '실행 중...' : '▶ 시뮬레이션 실행'}
            </button>
          </div>

          {/* Right Column - Chart */}
          <div className="lg:col-span-2">
            <SimulationChart data={simulationData} />
          </div>
        </div>

        {/* Stats */}
        {simulationData.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">📊 시뮬레이션 통계</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">최대 출력</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.max(...simulationData.map((d) => d.output)).toFixed(2)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">최종 출력</p>
                <p className="text-2xl font-bold text-green-600">
                  {simulationData[simulationData.length - 1].output.toFixed(2)}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">정상상태오차</p>
                <p className="text-2xl font-bold text-red-600">
                  {Math.abs(
                    simulationData[simulationData.length - 1].error
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">평균 오차</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(
                    simulationData.reduce((sum, d) => sum + Math.abs(d.error), 0) /
                    simulationData.length
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">데이터 포인트</p>
                <p className="text-2xl font-bold text-purple-600">
                  {simulationData.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
