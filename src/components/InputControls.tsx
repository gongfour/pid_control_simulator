import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { Slider } from './ui/Slider';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📥</span>
          입력값 및 잡음
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-10">
        <Tabs value={inputType} onValueChange={(v: any) => onInputTypeChange(v)}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="constant">상수</TabsTrigger>
            <TabsTrigger value="step">단계</TabsTrigger>
            <TabsTrigger value="sine">정현파</TabsTrigger>
          </TabsList>

          <TabsContent value="constant" className="space-y-5 mt-7">
            <div className="space-y-5">
              <label className="text-sm font-medium">값: {inputParams.value || 0}</label>
              <Slider min={0} max={200} step={1} value={[inputParams.value || 0]} onValueChange={(val) => onInputParamsChange({ ...inputParams, value: val[0] })} />
              <Input type="number" value={inputParams.value || 0} onChange={(e) => onInputParamsChange({ ...inputParams, value: parseFloat(e.target.value) })} />
            </div>
          </TabsContent>

          <TabsContent value="step" className="space-y-6 mt-7">
            {(inputParams.steps || []).map((step: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                <Input type="number" value={step.time} placeholder="시간" onChange={(e) => { const ns = [...inputParams.steps]; ns[idx].time = parseFloat(e.target.value); onInputParamsChange({ ...inputParams, steps: ns }); }} />
                <Input type="number" value={step.value} placeholder="값" onChange={(e) => { const ns = [...inputParams.steps]; ns[idx].value = parseFloat(e.target.value); onInputParamsChange({ ...inputParams, steps: ns }); }} />
              </div>
            ))}
            <Button onClick={() => onInputParamsChange({ ...inputParams, steps: [...inputParams.steps, { time: 5, value: 0 }] })} variant="secondary" className="w-full">+ 단계 추가</Button>
          </TabsContent>

          <TabsContent value="sine" className="space-y-6 mt-7">
            <div className="space-y-5">
              <label className="text-sm font-medium">진폭: {inputParams.amplitude || 100}</label>
              <Slider min={0} max={200} value={[inputParams.amplitude || 100]} onValueChange={(val) => onInputParamsChange({ ...inputParams, amplitude: val[0] })} />
            </div>
            <div className="space-y-5">
              <label className="text-sm font-medium">주파수: {(inputParams.frequency || 0.1).toFixed(2)} Hz</label>
              <Slider min={0.01} max={1} step={0.01} value={[inputParams.frequency || 0.1]} onValueChange={(val) => onInputParamsChange({ ...inputParams, frequency: val[0] })} />
            </div>
            <div className="space-y-5">
              <label className="text-sm font-medium">오프셋: {inputParams.offset || 0}</label>
              <Slider min={0} max={200} value={[inputParams.offset || 0]} onValueChange={(val) => onInputParamsChange({ ...inputParams, offset: val[0] })} />
            </div>
          </TabsContent>
        </Tabs>

        <div className="h-px bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-5">
          <label className="text-sm font-medium">🔊 외부 잡음: σ = {noiseLevel.toFixed(2)}</label>
          <Slider min={0} max={20} step={0.1} value={[noiseLevel]} onValueChange={onNoiseLevelChange} />
          <p className="text-xs text-gray-500 dark:text-gray-400">0: 없음 | 2-5: 적음 | 10-20: 큼</p>
        </div>
      </CardContent>
    </Card>
  );
}
