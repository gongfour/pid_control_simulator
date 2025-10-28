import type { PIDParams } from '../utils/pidSimulation';

interface PIDControlsProps {
  pidParams: PIDParams;
  onParamsChange: (params: PIDParams) => void;
  onReset: () => void;
}

export function PIDControls({
  pidParams,
  onParamsChange,
  onReset,
}: PIDControlsProps) {
  const handleKpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onParamsChange({
      ...pidParams,
      kp: parseFloat(e.target.value),
    });
  };

  const handleKiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onParamsChange({
      ...pidParams,
      ki: parseFloat(e.target.value),
    });
  };

  const handleKdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onParamsChange({
      ...pidParams,
      kd: parseFloat(e.target.value),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">⚙️ PID 파라미터</h2>

      <div className="space-y-4">
        {/* Kp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kp (비례 계수): <span className="text-blue-600 font-bold">{pidParams.kp.toFixed(3)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.01"
            value={pidParams.kp}
            onChange={handleKpChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={pidParams.kp}
            onChange={handleKpChange}
            step="0.01"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Ki */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ki (적분 계수): <span className="text-green-600 font-bold">{pidParams.ki.toFixed(3)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={pidParams.ki}
            onChange={handleKiChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={pidParams.ki}
            onChange={handleKiChange}
            step="0.01"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Kd */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kd (미분 계수): <span className="text-red-600 font-bold">{pidParams.kd.toFixed(3)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={pidParams.kd}
            onChange={handleKdChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={pidParams.kd}
            onChange={handleKdChange}
            step="0.01"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
