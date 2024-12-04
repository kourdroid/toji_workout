"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Settings, Plus, Save } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useTimerStore from '@/app/store/timerStore';

const TIMER_PRESETS = [
  { name: "HIIT", work: 45, rest: 15, rounds: 8 },
  { name: "Tabata", work: 20, rest: 10, rounds: 8 },
  { name: "Strength", work: 60, rest: 90, rounds: 5 },
  { name: "Endurance", work: 120, rest: 30, rounds: 6 },
  { name: "Quick Burst", work: 30, rest: 10, rounds: 10 },
];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const WorkoutTimer = () => {
  const { 
    time,
    isRunning,
    workTime,
    restTime,
    currentRound,
    totalRounds,
    isWork,
    customPresets,
    startTimer,
    pauseTimer,
    resetTimer,
    setWorkTime,
    setRestTime,
    setTotalRounds,
    applyPreset,
    addCustomPreset
  } = useTimerStore();

  const [newPreset, setNewPreset] = useState({
    name: "",
    work: 30,
    rest: 10,
    rounds: 3
  });

  const saveCustomPreset = () => {
    if (newPreset.name.trim()) {
      addCustomPreset({ ...newPreset });
      setNewPreset({ name: "", work: 30, rest: 10, rounds: 3 });
    }
  };

  const getTimerColor = () => {
    if (!isRunning) return 'text-muted-foreground';
    return isWork ? 'text-blue-400' : 'text-cyan-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Timer */}
      <Card className="lg:col-span-8">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">
            Workout Timer
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Round {currentRound} of {totalRounds}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Timer Display */}
            <div className={`text-8xl font-bold tabular-nums ${getTimerColor()}`}>
              {formatTime(time)}
            </div>

            {/* Status */}
            <div className="text-2xl font-semibold">
              {time === 0 && !isRunning ? (
                <span className="text-muted-foreground">Ready</span>
              ) : (
                <span className={isWork ? 'text-blue-400' : 'text-cyan-400'}>
                  {isWork ? 'Work' : 'Rest'}
                </span>
              )}
            </div>

            {/* Controls */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12"
                onClick={resetTimer}
                disabled={time === 0 && !isRunning}
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                className={`w-16 h-16 rounded-full ${
                  isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={isRunning ? pauseTimer : startTimer}
              >
                {isRunning ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12"
                  >
                    <Settings className="h-6 w-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Timer Settings</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Work Time (seconds)</label>
                      <Slider
                        value={[workTime]}
                        onValueChange={([value]) => setWorkTime(value)}
                        min={5}
                        max={300}
                        step={5}
                      />
                      <div className="text-right text-sm text-muted-foreground">
                        {workTime}s
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rest Time (seconds)</label>
                      <Slider
                        value={[restTime]}
                        onValueChange={([value]) => setRestTime(value)}
                        min={5}
                        max={180}
                        step={5}
                      />
                      <div className="text-right text-sm text-muted-foreground">
                        {restTime}s
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rounds</label>
                      <Slider
                        value={[totalRounds]}
                        onValueChange={([value]) => setTotalRounds(value)}
                        min={1}
                        max={20}
                        step={1}
                      />
                      <div className="text-right text-sm text-muted-foreground">
                        {totalRounds} rounds
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Progress Indicators */}
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Work</div>
                <div className="text-lg font-semibold">{formatTime(workTime)}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Rest</div>
                <div className="text-lg font-semibold">{formatTime(restTime)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Presets and Custom Timer */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Timer Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Built-in Presets */}
            <div className="space-y-2">
              {TIMER_PRESETS.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => applyPreset(preset)}
                >
                  <div>
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {preset.work}s work / {preset.rest}s rest / {preset.rounds} rounds
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Custom Presets */}
            {customPresets.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Custom Presets</div>
                {customPresets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => applyPreset(preset)}
                  >
                    <div>
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {preset.work}s work / {preset.rest}s rest / {preset.rounds} rounds
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {/* Create Custom Timer */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Custom Timer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Custom Timer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preset Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-md border bg-background"
                      value={newPreset.name}
                      onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                      placeholder="Enter preset name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Time (seconds)</label>
                    <Slider
                      value={[newPreset.work]}
                      onValueChange={([value]) => setNewPreset({ ...newPreset, work: value })}
                      min={5}
                      max={300}
                      step={5}
                    />
                    <div className="text-right text-sm text-muted-foreground">{newPreset.work}s</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rest Time (seconds)</label>
                    <Slider
                      value={[newPreset.rest]}
                      onValueChange={([value]) => setNewPreset({ ...newPreset, rest: value })}
                      min={5}
                      max={180}
                      step={5}
                    />
                    <div className="text-right text-sm text-muted-foreground">{newPreset.rest}s</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rounds</label>
                    <Slider
                      value={[newPreset.rounds]}
                      onValueChange={([value]) => setNewPreset({ ...newPreset, rounds: value })}
                      min={1}
                      max={20}
                      step={1}
                    />
                    <div className="text-right text-sm text-muted-foreground">{newPreset.rounds} rounds</div>
                  </div>
                  <Button className="w-full" onClick={saveCustomPreset}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preset
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutTimer;
