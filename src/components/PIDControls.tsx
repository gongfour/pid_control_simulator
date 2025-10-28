import { useState } from "react";
import type { PIDParams } from "../utils/pidSimulation";
import { Text, Card } from "@tremor/react";

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
  const handleSliderChange = (param: "kp" | "ki" | "kd", value: number) => {
    onParamsChange({
      ...pidParams,
      [param]: value,
    });
  };

  const handleInputChange = (param: "kp" | "ki" | "kd", value: string) => {
    const numValue = parseFloat(value) || 0;
    onParamsChange({
      ...pidParams,
      [param]: numValue,
    });
  };

  interface ParamConfig {
    label: string;
    param: "kp" | "ki" | "kd";
    value: number;
    min: number;
    max: number;
    step: number;
    color: string;
  }

  const ParamControl = ({
    label,
    param,
    value,
    min,
    max,
    step,
    color,
  }: ParamConfig) => (
    <div className={`p-4 rounded-lg border-2 ${color} bg-opacity-10`}>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className={`text-lg font-bold ${color}`}>{value.toFixed(3)}</span>
      </div>

      <div className="flex gap-3 items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) =>
            handleSliderChange(param, parseFloat(e.target.value))
          }
          className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-current"
          style={{
            accentColor: color.includes("blue")
              ? "#2563eb"
              : color.includes("amber")
                ? "#f59e0b"
                : "#8b5cf6",
          }}
        />
        <input
          type="number"
          value={value}
          onChange={(e) => handleInputChange(param, e.target.value)}
          step={step}
          min={min}
          max={max}
          className="w-20 px-2 py-1 text-sm font-semibold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-current"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <ParamControl
        label="Kp (비례 계수)"
        param="kp"
        value={pidParams.kp}
        min={0}
        max={5}
        step={0.01}
        color="border-blue-500 text-blue-600 dark:text-blue-400"
      />

      <ParamControl
        label="Ki (적분 계수)"
        param="ki"
        value={pidParams.ki}
        min={0}
        max={2}
        step={0.01}
        color="border-amber-500 text-amber-600 dark:text-amber-400"
      />

      <ParamControl
        label="Kd (미분 계수)"
        param="kd"
        value={pidParams.kd}
        min={0}
        max={2}
        step={0.01}
        color="border-violet-500 text-violet-600 dark:text-violet-400"
      />

      <button
        onClick={onReset}
        className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors duration-200"
      >
        🔄 초기화
      </button>
    </div>
  );
}
