import { useState } from 'react';
import type { PIDParams } from '../utils/pidSimulation';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Slider } from './ui/Slider';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

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
  const [activeInput, setActiveInput] = useState<'kp' | 'ki' | 'kd' | null>(null);

  const handleSliderChange = (param: 'kp' | 'ki' | 'kd', value: number[]) => {
    onParamsChange({
      ...pidParams,
      [param]: value[0],
    });
  };

  const handleInputChange = (param: 'kp' | 'ki' | 'kd', value: string) => {
    const numValue = parseFloat(value) || 0;
    onParamsChange({
      ...pidParams,
      [param]: numValue,
    });
  };

  const ParamControl = ({
    label,
    param,
    value,
    min,
    max,
    step,
    color,
  }: {
    label: string;
    param: 'kp' | 'ki' | 'kd';
    value: number;
    min: number;
    max: number;
    step: number;
    color: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <span className={`text-lg font-bold ${color}`}>
          {value.toFixed(3)}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(val) => handleSliderChange(param, val)}
        className="cursor-pointer"
      />
      <Input
        type="number"
        value={value}
        onChange={(e) => handleInputChange(param, e.target.value)}
        step={step}
        min={min}
        max={max}
        className="text-sm"
      />
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          PID 파라미터
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ParamControl
          label="Kp (비례 계수)"
          param="kp"
          value={pidParams.kp}
          min={0}
          max={5}
          step={0.01}
          color="text-blue-600 dark:text-blue-400"
        />

        <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />

        <ParamControl
          label="Ki (적분 계수)"
          param="ki"
          value={pidParams.ki}
          min={0}
          max={2}
          step={0.01}
          color="text-green-600 dark:text-green-400"
        />

        <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />

        <ParamControl
          label="Kd (미분 계수)"
          param="kd"
          value={pidParams.kd}
          min={0}
          max={2}
          step={0.01}
          color="text-red-600 dark:text-red-400"
        />

        <Button
          onClick={onReset}
          variant="outline"
          size="md"
          className="w-full mt-6"
        >
          초기화
        </Button>
      </CardContent>
    </Card>
  );
}
