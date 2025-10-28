import { Text } from "@tremor/react";

interface InputControlsProps {
  inputType: "constant" | "sine";
  onInputTypeChange: (type: "constant" | "sine") => void;
  inputParams: any;
  onInputParamsChange: (params: any) => void;
  noiseLevel: number;
  onNoiseLevelChange: (level: number) => void;
}

export function InputControls({
  inputType,
  onInputTypeChange,
  inputParams,
  onInputParamsChange,
  noiseLevel,
  onNoiseLevelChange,
}: InputControlsProps) {
  const tabs = [
    { id: "constant", label: "상수" },
    { id: "sine", label: "정현파" },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onInputTypeChange(tab.id as any)}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              inputType === tab.id
                ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {/* Constant Tab */}
        {inputType === "constant" && (
          <div className="p-4 rounded-lg border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                목표값
              </label>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {inputParams.value || 0}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={inputParams.value || 0}
                onChange={(e) =>
                  onInputParamsChange({
                    ...inputParams,
                    value: parseFloat(e.target.value),
                  })
                }
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
              />
              <input
                type="number"
                value={inputParams.value || 0}
                onChange={(e) =>
                  onInputParamsChange({
                    ...inputParams,
                    value: parseFloat(e.target.value),
                  })
                }
                className="w-20 px-2 py-1 text-sm font-semibold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Sine Tab */}
        {inputType === "sine" && (
          <div className="space-y-3">
            <div className="p-4 rounded-lg border-2 border-violet-400 bg-violet-50 dark:bg-violet-900/20">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  진폭
                </label>
                <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                  {inputParams.amplitude || 100}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={1}
                  value={inputParams.amplitude || 100}
                  onChange={(e) =>
                    onInputParamsChange({
                      ...inputParams,
                      amplitude: parseFloat(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600 dark:accent-violet-400"
                />
                <input
                  type="number"
                  value={inputParams.amplitude || 100}
                  onChange={(e) =>
                    onInputParamsChange({
                      ...inputParams,
                      amplitude: parseFloat(e.target.value),
                    })
                  }
                  className="w-20 px-2 py-1 text-sm font-semibold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  주파수
                </label>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {(inputParams.frequency || 0.1).toFixed(2)} Hz
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="range"
                  min={0.01}
                  max={1}
                  step={0.01}
                  value={inputParams.frequency || 0.1}
                  onChange={(e) =>
                    onInputParamsChange({
                      ...inputParams,
                      frequency: parseFloat(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <input
                  type="number"
                  value={(inputParams.frequency || 0.1).toFixed(2)}
                  onChange={(e) =>
                    onInputParamsChange({
                      ...inputParams,
                      frequency: parseFloat(e.target.value),
                    })
                  }
                  step={0.01}
                  className="w-20 px-2 py-1 text-sm font-semibold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  오프셋
                </label>
                <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                  {inputParams.offset || 0}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={1}
                  value={inputParams.offset || 0}
                  onChange={(e) =>
                    onInputParamsChange({
                      ...inputParams,
                      offset: parseFloat(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-600 dark:accent-cyan-400"
                />
                <input
                  type="number"
                  value={inputParams.offset || 0}
                  onChange={(e) =>
                    onInputParamsChange({
                      ...inputParams,
                      offset: parseFloat(e.target.value),
                    })
                  }
                  className="w-20 px-2 py-1 text-sm font-semibold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Noise Level */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="p-4 rounded-lg border-2 border-green-400 bg-green-50 dark:bg-green-900/20">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              🔊 외부 잡음
            </label>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              σ = {noiseLevel.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-3 items-center mb-3">
            <input
              type="range"
              min={0}
              max={20}
              step={0.1}
              value={noiseLevel}
              onChange={(e) => onNoiseLevelChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600 dark:accent-green-400"
            />
            <input
              type="number"
              value={noiseLevel.toFixed(2)}
              onChange={(e) => onNoiseLevelChange(parseFloat(e.target.value))}
              step={0.1}
              className="w-20 px-2 py-1 text-sm font-semibold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400 text-center">
            <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
              0: 없음
            </span>
            <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
              2-5: 적음
            </span>
            <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
              10-20: 큼
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
