import { useState } from "react";
import { Card, Metric, Text } from "@tremor/react";
import { PIDControls } from "./components/PIDControls";
import { InputControls } from "./components/InputControls";
import { SimulationChart } from "./components/SimulationChart";
import {
  runSimulation,
  type PIDParams,
  type SimulationStep,
} from "./utils/pidSimulation";

function App() {
  const [pidParams, setPidParams] = useState<PIDParams>({
    kp: 1.0,
    ki: 0.5,
    kd: 0.1,
  });

  const [inputType, setInputType] = useState<"constant" | "step" | "sine">(
    "step",
  );
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

  // Calculate statistics
  const stats =
    simulationData.length > 0
      ? {
          maxOutput: Math.max(...simulationData.map((d) => d.output)),
          finalOutput: simulationData[simulationData.length - 1].output,
          steadyStateError: Math.abs(
            simulationData[simulationData.length - 1].error,
          ),
          meanError:
            simulationData.reduce((sum, d) => sum + Math.abs(d.error), 0) /
            simulationData.length,
          dataPoints: simulationData.length,
          simTime: (simulationData.length * 0.01).toFixed(2),
        }
      : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div
          className="max-w-7xl mx-auto px-4 lg:px-8 py-8"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🎛️ PID 제어 시뮬레이터
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            PID 파라미터, 입력값, 외부 잡음에 따른 시스템 응답을 실시간으로
            시뮬레이션하고 분석합니다
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div
          className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* PID Parameters Card */}
                <Card>
                  <div className="mb-6">
                    <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      ⚙️ PID 파라미터
                    </Text>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      제어 계수
                    </h2>
                  </div>
                  <PIDControls
                    pidParams={pidParams}
                    onParamsChange={setPidParams}
                    onReset={handleReset}
                  />
                </Card>

                {/* Input Configuration Card */}
                <Card>
                  <div className="mb-6">
                    <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      📥 입력 설정
                    </Text>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      시스템 입력
                    </h2>
                  </div>
                  <InputControls
                    inputType={inputType}
                    onInputTypeChange={setInputType}
                    inputParams={inputParams}
                    onInputParamsChange={setInputParams}
                    noiseLevel={noiseLevel}
                    onNoiseLevelChange={setNoiseLevel}
                  />
                </Card>

                {/* Simulation Button */}
                <button
                  onClick={handleRunSimulation}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-base"
                >
                  ▶ 시뮬레이션 실행
                </button>
              </div>
            </div>

            {/* Right Content - Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Key Metrics Cards */}
              {stats && (
                <div>
                  <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                    📊 주요 지표
                  </Text>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Card>
                      <Text className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        최대 출력
                      </Text>
                      <Metric className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.maxOutput.toFixed(2)}
                      </Metric>
                    </Card>
                    <Card>
                      <Text className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        최종 출력
                      </Text>
                      <Metric className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.finalOutput.toFixed(2)}
                      </Metric>
                    </Card>
                    <Card>
                      <Text className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        정상상태 오차
                      </Text>
                      <Metric className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.steadyStateError.toFixed(2)}
                      </Metric>
                    </Card>
                    <Card>
                      <Text className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        평균 오차
                      </Text>
                      <Metric className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.meanError.toFixed(2)}
                      </Metric>
                    </Card>
                    <Card>
                      <Text className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        데이터 포인트
                      </Text>
                      <Metric className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.dataPoints}
                      </Metric>
                    </Card>
                    <Card>
                      <Text className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        시뮬레이션 시간
                      </Text>
                      <Metric className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.simTime}s
                      </Metric>
                    </Card>
                  </div>
                </div>
              )}

              {/* Chart Card */}
              <Card>
                <div className="mb-6">
                  <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    📈 시뮬레이션 결과
                  </Text>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    시스템 응답 분석
                  </h2>
                </div>

                <SimulationChart data={simulationData} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
