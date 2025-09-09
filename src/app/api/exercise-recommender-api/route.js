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
      Based on the following user data, generate a comprehensive and friendly workout plan.
      Format the response with clear headings and bullet points with readable spacing.it should be very concise not more than three lines. Do not include any chat history.
      
      User Goal: ${formData.goal}
      Experience Level: ${formData.experience}
      Available Equipment: ${formData.equipment}
      Frequency: ${formData.frequency}
      
      The plan should include:
      - A brief, encouraging introduction.
      - A clear breakdown of exercises for a 1-week schedule.
      - Reps and sets for each exercise.
      - Notes on proper form and rest periods.
      - A concluding sentence of encouragement.
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

    // Return a proper NextResponse with the data
    return NextResponse.json(aiResponseText);
  } catch (error) {
    console.error(error);
  }
}
