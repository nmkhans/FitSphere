"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ReactMarkdown from "react-markdown";
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
import { Button } from "@/components/ui/button"; // Assuming you have a button component

export default function ExerciseForm() {
  const {
    handleSubmit,
    control, // Use control instead of register for Controller
    formState: { errors },
  } = useForm();
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setRecommendation("");
    try {
      const response = await axios.post("/api/exercise-recommender-api", {
        formData: data,
      });
      const aiResponseText = response.data;
      setRecommendation(aiResponseText);
    } catch (error) {
      console.error("Error fetching AI recommendation:", error);
      setRecommendation(
        "Sorry, an error occurred while generating your plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-primary-foreground font-sans">
      <div className="">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl text-primary text-center">
            Personalized Exercise Plan
          </CardTitle>
          <p className="text-primary mb-6">
            Fill out the form below to get a custom workout routine tailored to
            your goals and lifestyle.
          </p>
        </CardHeader>
        <Card className="bg-secondary bg-opacity-80 backdrop-blur-sm  p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Goal Select */}
            <div className="mb-4">
              <label className="block text-primary mb-1">
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
                    <SelectTrigger className="w-full text-primary border-gray-700 bg-secondary">
                      <SelectValue placeholder="Set a Goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary text-primary border-gray-700">
                      <SelectGroup>
                        <SelectLabel>Goal</SelectLabel>
                        <SelectItem value="build muscle" className='text-ring'>Build Muscle</SelectItem>
                        <SelectItem value="lose weight" className='text-ring'>Lose Weight</SelectItem>
                        <SelectItem value="improve endurance" className='text-ring'>
                          Improve Endurance
                        </SelectItem>
                        <SelectItem value="maintain fitness" className='text-ring'>
                          Maintain Fitness
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.goal && (
                <p className="text-pink-400 text-sm mt-1">
                  {errors.goal.message}
                </p>
              )}
            </div>

            {/* Experience Level Select */}
            <div className="mb-4">
              <label className="block text-primary mb-1">
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
                    <SelectTrigger className="w-full text-primary border-gray-700 bg-secondary">
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary text-primary border-gray-700">
                      <SelectGroup>
                        <SelectLabel>Experience</SelectLabel>
                        <SelectItem value="beginner" className='text-ring'>Beginner</SelectItem>
                        <SelectItem value="intermediate" className='text-ring'>Intermediate</SelectItem>
                        <SelectItem value="advanced" className='text-ring'>Advanced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.experience && (
                <p className="text-pink-400 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Available Equipment Select */}
            <div className="mb-6">
              <label className="block text-primary mb-1">
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
                    <SelectTrigger className="w-full text-primary border-gray-700 bg-secondary">
                      <SelectValue placeholder="Gym Access" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary text-primary border-gray-700">
                      <SelectGroup>
                        <SelectLabel>Gym Access</SelectLabel>
                        <SelectItem value="full gym" className='text-ring'>Full Gym Access</SelectItem>
                        <SelectItem value="dumbbells only" className='text-ring'>
                          Dumbbells Only
                        </SelectItem>
                        <SelectItem value="bodyweight only" className='text-ring'>
                          Bodyweight Only
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.equipment && (
                <p className="text-pink-400 text-sm mt-1">
                  {errors.equipment.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:popover text-primary font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-secondary"
            >
              {loading ? "Generating..." : "Get My Plan"}
            </Button>
          </form>
        </Card>

        {recommendation && (
          <div className="mt-8 p-6 bg-secondary bg-opacity-80 backdrop-blur-sm rounded-lg border border-gray-700 shadow-md">
            <h2 className="text-2xl text-primary font-semibold mb-4">
              Your AI-Generated Plan:
            </h2>
            <div className="prose prose-invert text-primary">
              <ReactMarkdown>{recommendation}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}