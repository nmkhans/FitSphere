"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import Link from "next/link";

const useTypingEffect = (text, speed = 50, delay = 1000) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return;

    const startTimeout = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, speed);

      return () => {
        clearInterval(typingInterval);
        clearTimeout(startTimeout);
      };
    }, delay);
  }, [text, speed, delay]);

  return { displayedText, isTyping };
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-44 ">
     <Spinner key={'ring'} variant={'ring'} />
       
  </div>
);

export default function ExerciseForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load saved workout plan from localStorage on component mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('fitness-ai-plan');
    if (savedPlan) {
      try {
        const parsedPlan = JSON.parse(savedPlan);
        setRecommendation(parsedPlan);
      } catch (error) {
        console.error('Error loading saved plan:', error);
        localStorage.removeItem('fitness-ai-plan');
      }
    }
  }, []);

  // Save workout plan to localStorage whenever recommendation changes
  useEffect(() => {
    if (recommendation) {
      localStorage.setItem('fitness-ai-plan', JSON.stringify(recommendation));
    }
  }, [recommendation]);

  const paragraphText =
    "Get a personalized exercise plan tailored just for you. Our AI-powered recommender considers your goals, experience, and available equipment to generate a routine that fits your lifestyle. Say goodbye to generic workouts and hello to a smarter, more effective fitness journey.";
  const { displayedText } = useTypingEffect(paragraphText, 30, 500);

  const onSubmit = async (data) => {
    setLoading(true);
    setRecommendation(null);
    // Clear any existing saved plan when generating new one
    localStorage.removeItem('fitness-ai-plan');
    
    try {
      const response = await axios.post("/api/exercise-recommender-api", {
        formData: data,
      });
      const workoutData = response.data;
      setRecommendation(workoutData);
    } catch (error) {
      console.error("Error fetching AI recommendation:", error);
      setRecommendation({
        title: "Error Generating Plan",
        introduction: "Sorry, an error occurred while generating your plan. Please try again.",
        duration: "N/A",
        frequency: "N/A",
        exercises: [],
        conclusion: "Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const clearPlan = () => {
    setRecommendation(null);
    localStorage.removeItem('fitness-ai-plan');
    localStorage.removeItem('fitness-ai-progress');
  };

  return (
    <div className="flex items-center flex-col gap-10 bg-background min-h-screen text-foreground p-4">
      <div className="text-center max-w-4xl mx-auto pt-8">
        <Link href="/" className="inline-block mb-6">
          <Button variant="outline" size="sm">
            ← Back to Home
          </Button>
        </Link>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary leading-tight mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          AI Personal Trainer
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Powered by advanced AI technology to create personalized workout plans just for you
        </motion.p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-7xl">
        <div className="flex flex-col items-start justify-center text-left p-6 space-y-4">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span whileHover={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.8)" }}>
              Elevate Your Workout
            </motion.span>
            <motion.span
              className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-secondary-foreground"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Personalized for Your Success
            </motion.span>
          </motion.h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground min-h-[120px] md:min-h-[150px]">
            {displayedText}
          </p>
        </div>

        <div className="w-full">
          <motion.div
            className="w-full rounded-xl border-border bg-card text-card-foreground transition-all duration-500 hover:shadow-xl hover:shadow-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="w-full rounded-xl border-border bg-card text-card-foreground">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-2xl font-bold text-center text-primary">
                  Personalized Exercise Plan
                </CardTitle>
                <p className="text-muted-foreground text-center mt-2">
                  Fill out the form below to get a custom workout routine
                  tailored to your goals and lifestyle.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <label className="block text-foreground font-medium mb-2">
                      Your Main Goal:
                    </label>
                    <Controller
                      name="goal"
                      control={control}
                      rules={{ required: "Goal is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors">
                            <SelectValue placeholder="Set a Goal" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border text-popover-foreground">
                            <SelectGroup>
                              <SelectLabel className="text-muted-foreground">
                                Goal
                              </SelectLabel>
                              <SelectItem value="build muscle">
                                Build Muscle
                              </SelectItem>
                              <SelectItem value="lose weight">
                                Lose Weight
                              </SelectItem>
                              <SelectItem value="improve endurance">
                                Improve Endurance
                              </SelectItem>
                              <SelectItem value="maintain fitness">
                                Maintain Fitness
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.goal && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.goal.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-foreground font-medium mb-2">
                      Experience Level:
                    </label>
                    <Controller
                      name="experience"
                      control={control}
                      rules={{ required: "Experience level is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors">
                            <SelectValue placeholder="Experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border text-popover-foreground">
                            <SelectGroup>
                              <SelectLabel className="text-muted-foreground">
                                Experience
                              </SelectLabel>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.experience && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <label className="block text-foreground font-medium mb-2">
                      Available Equipment:
                    </label>
                    <Controller
                      name="equipment"
                      control={control}
                      rules={{ required: "Equipment is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors">
                            <SelectValue placeholder="Gym Access" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border text-popover-foreground">
                            <SelectGroup>
                              <SelectLabel className="text-muted-foreground">
                                Gym Access
                              </SelectLabel>
                              <SelectItem value="full gym">
                                Full Gym Access
                              </SelectItem>
                              <SelectItem value="dumbbells only">
                                Dumbbells Only
                              </SelectItem>
                              <SelectItem value="bodyweight only">
                                Bodyweight Only
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.equipment && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.equipment.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-primary text-primary-foreground font-bold py-3 px-4 
                      transition-all duration-300 hover:bg-primary-hover disabled:bg-muted disabled:text-muted-foreground"
                  >
                    {loading ? "Generating..." : "Get My Plan"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {loading && (
        <motion.div
          className="container mx-auto p-6 rounded-xl border-border bg-card shadow-inner shadow-primary/20 max-w-7xl mt-5 mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LoadingSpinner />
        </motion.div>
      )}

      {!loading && recommendation && (
        <motion.div
          className="container mx-auto p-6 max-w-7xl mt-5 mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Plan Action Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-primary">Your AI-Generated Plan</h2>
              <p className="text-muted-foreground">Your plan is automatically saved. It will persist until you create a new one.</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="outline"
                size="sm"
              >
                Generate New Plan
              </Button>
              <Button
                onClick={clearPlan}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Clear Plan
              </Button>
            </div>
          </div>
          
          <WorkoutPlan workoutData={recommendation} />
        </motion.div>
      )}
    </div>
  );
}