"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Users, CheckCircle, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ExerciseTrainer from "./ExerciseTrainer";

const WorkoutPlan = ({ workoutData }) => {
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [currentTrainingExercise, setCurrentTrainingExercise] = useState(null);

  // Load completed exercises from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('fitness-ai-progress');
    if (savedProgress) {
      try {
        const progressArray = JSON.parse(savedProgress);
        setCompletedExercises(new Set(progressArray));
      } catch (error) {
        console.error('Error loading saved progress:', error);
        localStorage.removeItem('fitness-ai-progress');
      }
    }
  }, [workoutData]);

  // Save progress to localStorage whenever completedExercises changes
  useEffect(() => {
    if (completedExercises.size > 0) {
      localStorage.setItem('fitness-ai-progress', JSON.stringify([...completedExercises]));
    } else {
      localStorage.removeItem('fitness-ai-progress');
    }
  }, [completedExercises]);

  const toggleExerciseComplete = (exerciseIndex) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseIndex)) {
      newCompleted.delete(exerciseIndex);
    } else {
      newCompleted.add(exerciseIndex);
    }
    setCompletedExercises(newCompleted);
  };

  const startTraining = (exerciseIndex) => {
    setCurrentTrainingExercise(exerciseIndex);
  };

  const handleTrainingComplete = (exerciseIndex, wasSuccessful) => {
    if (wasSuccessful) {
      const newCompleted = new Set(completedExercises);
      newCompleted.add(exerciseIndex);
      setCompletedExercises(newCompleted);
    }
    setCurrentTrainingExercise(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!workoutData) return null;

  // Show exercise trainer if training is active
  if (currentTrainingExercise !== null) {
    return (
      <ExerciseTrainer
        exercise={workoutData.exercises[currentTrainingExercise]}
        onComplete={(wasSuccessful) => handleTrainingComplete(currentTrainingExercise, wasSuccessful)}
        onBack={() => setCurrentTrainingExercise(null)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
            {workoutData.title}
          </CardTitle>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">{workoutData.introduction}</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>{workoutData.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-purple-600" />
              <span>{workoutData.frequency}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-green-600" />
              <span>{workoutData.exercises?.length || 0} Exercises</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg p-4 border shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700">Progress</h3>
          <span className="text-sm text-gray-500">
            {completedExercises.size}/{workoutData.exercises?.length || 0} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${workoutData.exercises?.length ? (completedExercises.size / workoutData.exercises.length) * 100 : 0}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutData.exercises?.map((exercise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="h-full"
          >
            <Card 
              className={`transition-all duration-300 hover:shadow-lg h-full flex flex-col ${
                completedExercises.has(index) 
                  ? 'bg-green-50 border-green-300 ring-2 ring-green-200' 
                  : 'hover:border-blue-300'
              }`}
            >
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2 mb-2">
                      {completedExercises.has(index) && (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      )}
                      <span className="line-clamp-2">{exercise.name}</span>
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty || 'Intermediate'}
                      </Badge>
                      {exercise.muscleGroups?.slice(0, 2).map((muscle, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                      {exercise.muscleGroups?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{exercise.muscleGroups.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-xl lg:text-2xl font-bold text-blue-600">{exercise.sets}</div>
                    <div className="text-xs text-gray-500">Sets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl lg:text-2xl font-bold text-purple-600">{exercise.reps}</div>
                    <div className="text-xs text-gray-500">Reps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm lg:text-base font-bold text-orange-600">{exercise.restTime}</div>
                    <div className="text-xs text-gray-500">Rest</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4 flex-grow">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    <span className="font-medium">Instructions:</span> {exercise.instructions}
                  </p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button
                    onClick={() => startTraining(index)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    disabled={completedExercises.has(index)}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {completedExercises.has(index) ? 'Completed' : 'Start Training'}
                  </Button>
                  
                  {completedExercises.has(index) && (
                    <Button
                      onClick={() => toggleExerciseComplete(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50 px-3"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Conclusion Card */}
      {workoutData.conclusion && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardContent className="pt-6">
            <p className="text-center text-gray-700 font-medium">
              {workoutData.conclusion}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default WorkoutPlan;
