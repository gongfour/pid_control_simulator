interface InputControlsProps {
  inputType: 'constant' | 'step' | 'sine';
  onInputTypeChange: (type: 'constant' | 'step' | 'sine') => void;
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
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* 입력값 타입 선택 */}
      <div>
        <h2 className="text-xl font-bold mb-4">📥 입력값 설정</h2>
        <div className="flex gap-2 mb-4">
          {(['constant', 'step', 'sine'] as const).map((type) => (
            <button
              key={type}
              onClick={() => onInputTypeChange(type)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                inputType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {type === 'constant' && '상수'}
              {type === 'step' && '단계입력'}
              {type === 'sine' && '정현파'}
            </button>
          ))}
        </div>

        {/* 상수 입력 */}
        {inputType === 'constant' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              값: <span className="text-blue-600 font-bold">{inputParams.value || 0}</span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="1"
              value={inputParams.value || 0}
              onChange={(e) =>
                onInputParamsChange({ ...inputParams, value: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              value={inputParams.value || 0}
              onChange={(e) =>
                onInputParamsChange({ ...inputParams, value: parseFloat(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        )}

        {/* 단계 입력 */}
        {inputType === 'step' && (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-2">단계를 설정하세요:</div>
            {(inputParams.steps || [{ time: 0, value: 0 }]).map(
              (step: any, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600">시간 (초)</label>
                    <input
                      type="number"
                      value={step.time}
                      onChange={(e) => {
                        const newSteps = [...(inputParams.steps || [])];
                        newSteps[idx].time = parseFloat(e.target.value);
                        onInputParamsChange({ ...inputParams, steps: newSteps });
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-600">값</label>
                    <input
                      type="number"
                      value={step.value}
                      onChange={(e) => {
                        const newSteps = [...(inputParams.steps || [])];
                        newSteps[idx].value = parseFloat(e.target.value);
                        onInputParamsChange({ ...inputParams, steps: newSteps });
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              )
            )}
            <button
              onClick={() => {
                const newSteps = [...(inputParams.steps || [])];
                newSteps.push({ time: 5, value: 0 });
                onInputParamsChange({ ...inputParams, steps: newSteps });
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-sm"
            >
              + 단계 추가
            </button>
          </div>
        )}

        {/* 정현파 입력 */}
        {inputType === 'sine' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                진폭: <span className="text-blue-600 font-bold">{inputParams.amplitude || 100}</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={inputParams.amplitude || 100}
                onChange={(e) =>
                  onInputParamsChange({ ...inputParams, amplitude: parseFloat(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                주파수: <span className="text-blue-600 font-bold">{(inputParams.frequency || 0.1).toFixed(2)}</span> Hz
              </label>
              <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={inputParams.frequency || 0.1}
                onChange={(e) =>
                  onInputParamsChange({ ...inputParams, frequency: parseFloat(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                오프셋: <span className="text-blue-600 font-bold">{inputParams.offset || 0}</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={inputParams.offset || 0}
                onChange={(e) =>
                  onInputParamsChange({ ...inputParams, offset: parseFloat(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* 외부 잡음 */}
      <div>
        <h2 className="text-xl font-bold mb-4">🔊 외부 잡음</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          잡음 크기 (σ): <span className="text-red-600 font-bold">{noiseLevel.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="0.1"
          value={noiseLevel}
          onChange={(e) => onNoiseLevelChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="number"
          value={noiseLevel}
          onChange={(e) => onNoiseLevelChange(parseFloat(e.target.value))}
          step="0.1"
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  );
}
