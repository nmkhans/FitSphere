import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { NextResponse } from "next/server";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "xai/grok-3-mini";

export async function POST(req) {
  try {
    const { formData } = await req.json();

    const prompt = `
      Based on the following user data, generate a workout plan and return it as a JSON object with this exact structure:
      
      User Goal: ${formData.goal}
      Experience Level: ${formData.experience}
      Available Equipment: ${formData.equipment}
      Frequency: ${formData.frequency}
      
      Return ONLY a valid JSON object with this structure:
      {
        "title": "Workout Plan Title",
        "introduction": "Brief encouraging introduction (2-3 sentences)",
        "duration": "4 weeks",
        "frequency": "4 days per week",
        "exercises": [
          {
            "name": "Exercise Name (e.g., Push-ups, Dumbbell Bench Press)",
            "sets": 3,
            "reps": "12-15",
            "restTime": "60 seconds",
            "instructions": "Detailed step-by-step instructions for proper form and technique. Include breathing tips and common mistakes to avoid.",
            "difficulty": "intermediate",
            "muscleGroups": ["chest", "triceps", "shoulders"],
            "steps": [
              {
                "title": "Setup & Preparation",
                "instruction": "Specific setup instructions for this exercise",
                "duration": 15
              },
              {
                "title": "Form Check",
                "instruction": "How to check and maintain proper form",
                "duration": 10
              },
              {
                "title": "Execution Phase",
                "instruction": "Step by step execution with breathing pattern",
                "duration": 45
              },
              {
                "title": "Rest & Recovery",
                "instruction": "How to rest between sets effectively",
                "duration": 60
              }
            ]
          }
        ],
        "conclusion": "Motivational conclusion message with progress expectations"
      }
      
      Generate 6-8 exercises based on the user's equipment and experience level. Make each exercise unique with realistic step durations.
    `;

    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "" },
          { role: "user", content: prompt },
        ],
        temperature: 1,
        top_p: 1,
        model: model,
      },
    });

   

     const aiResponseText = response.body.choices[0].message.content;
     
     try {
       // Parse the JSON response from AI
       const parsedResponse = JSON.parse(aiResponseText);
       return NextResponse.json(parsedResponse);
     } catch (parseError) {
       // If parsing fails, return a fallback response
       console.error("Failed to parse AI response as JSON:", parseError);
       return NextResponse.json({
         title: "Custom Workout Plan",
         introduction: "Here's your personalized workout plan based on your preferences.",
         duration: "4 weeks",
         frequency: formData.frequency || "3-4 days per week",
         exercises: [
           {
             name: "Basic Exercise Plan",
             sets: 3,
             reps: "10-12",
             restTime: "60 seconds",
             instructions: "Follow proper form and listen to your body.",
             difficulty: "beginner",
             muscleGroups: ["full body"]
           }
         ],
         conclusion: "Stay consistent and you'll see great results!"
       });
     }
  } catch (error) {
    console.error(error);
  }
}
