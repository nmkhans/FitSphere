"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  Timer,
  Target,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  SkipForward
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ExerciseTrainer = ({ exercise, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);

  // Generate detailed steps for the exercise
  const exerciseSteps = exercise.steps || [
    {
      title: "Setup & Preparation",
      instruction: `Prepare for ${exercise.name}. Set up your equipment and get into starting position.`,
      duration: 15
    },
    {
      title: "Form Check",
      instruction: exercise.instructions || "Focus on proper form and breathing technique.",
      duration: 10
    },
    {
      title: "Execution Phase",
      instruction: `Perform ${exercise.reps} repetitions with controlled movement. Focus on the target muscles.`,
      duration: 45
    },
    {
      title: "Rest Period",
      instruction: `Rest and recover. Prepare for the next set.`,
      duration: parseInt(exercise.restTime) || 60
    }
  ];

  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            // Step completed
            setCompletedSteps(prev => [...prev, currentStep]);
            setIsRunning(false);
            
            if (currentStep < exerciseSteps.length - 1) {
              // Move to next step after a brief pause
              setTimeout(() => {
                const nextStep = currentStep + 1;
                setCurrentStep(nextStep);
                setTimeRemaining(exerciseSteps[nextStep].duration);
              }, 1000);
            } else {
              // All steps completed
              setTimeout(() => {
                setShowCompletion(true);
              }, 1000);
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, currentStep, exerciseSteps]);

  const startStep = () => {
    setTimeRemaining(exerciseSteps[currentStep].duration);
    setIsRunning(true);
  };

  const pauseStep = () => {
    setIsRunning(false);
  };

  const resetStep = () => {
    setIsRunning(false);
    setTimeRemaining(exerciseSteps[currentStep].duration);
  };

  const resetAll = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsRunning(false);
    setTimeRemaining(0);
    setShowCompletion(false);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setIsRunning(false);
      setCurrentStep(currentStep - 1);
      setTimeRemaining(exerciseSteps[currentStep - 1].duration);
    }
  };

  const goToNextStep = () => {
    if (currentStep < exerciseSteps.length - 1) {
      setIsRunning(false);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeRemaining(exerciseSteps[nextStep].duration);
    }
  };

  const goToStep = (stepIndex) => {
    setIsRunning(false);
    setCurrentStep(stepIndex);
    setTimeRemaining(exerciseSteps[stepIndex].duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) return "completed";
    if (stepIndex === currentStep) return "current";
    return "pending";
  };

  if (showCompletion) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-6"
      >
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">
              Exercise Session Complete!
            </CardTitle>
            <p className="text-gray-600">
              How did you feel about this exercise?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => onComplete(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Completed Successfully
              </Button>
              <Button
                onClick={() => onComplete(false)}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 px-8 py-3"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Had Difficulty
              </Button>
            </div>
            <Button
              onClick={resetAll}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Exercise
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plan
        </Button>
        <Badge variant="outline" className="text-sm">
          Set 1 of {exercise.sets}
        </Badge>
      </div>

      {/* Exercise Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{exercise.name}</CardTitle>
          <div className="flex gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {exercise.reps} reps
            </span>
            <span className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {exercise.restTime} rest
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Steps Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Training Steps</CardTitle>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {exerciseSteps.length}
            </span>
            <div className="flex gap-2">
              <Button
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={currentStep === exerciseSteps.length - 1}
                variant="outline"
                size="sm"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exerciseSteps.map((step, index) => (
              <div
                key={index}
                onClick={() => goToStep(index)}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  getStepStatus(index) === "completed"
                    ? "bg-green-50 border-green-200"
                    : getStepStatus(index) === "current"
                    ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-gray-600">{step.instruction}</div>
                </div>
                <div className="text-sm font-medium mr-3">
                  {formatTime(step.duration)}
                </div>
                {getStepStatus(index) === "completed" && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
                {getStepStatus(index) === "current" && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Details */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Step {currentStep + 1}: {exerciseSteps[currentStep].title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                isRunning 
                  ? 'bg-green-100 text-green-800' 
                  : timeRemaining === 0 
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {isRunning ? 'Running' : timeRemaining === 0 ? 'Ready' : 'Paused'}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            {exerciseSteps[currentStep].instruction}
          </p>

          {/* Timer Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {formatTime(timeRemaining || exerciseSteps[currentStep].duration)}
            </div>
            <Progress 
              value={timeRemaining ? ((exerciseSteps[currentStep].duration - timeRemaining) / exerciseSteps[currentStep].duration) * 100 : 0}
              className="w-full h-2 mb-4"
            />
          </div>

          {/* Control Buttons */}
          <div className="space-y-4">
            {/* Main Controls */}
            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <Button
                  onClick={startStep}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {timeRemaining === 0 ? "Start Step" : "Resume"}
                </Button>
              ) : (
                <Button
                  onClick={pauseStep}
                  variant="outline"
                  className="px-8 py-3"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button
                onClick={resetStep}
                variant="outline"
                className="px-8 py-3"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset Step
              </Button>
            </div>

            {/* Quick Navigation */}
            <div className="flex justify-center space-x-2">
              <Button
                onClick={() => goToStep(0)}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <SkipBack className="w-4 h-4 mr-1" />
                First
              </Button>
              <Button
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={currentStep === exerciseSteps.length - 1}
                variant="outline"
                size="sm"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                onClick={() => goToStep(exerciseSteps.length - 1)}
                disabled={currentStep === exerciseSteps.length - 1}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                Last
                <SkipForward className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExerciseTrainer;
