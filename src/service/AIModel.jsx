import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateTripPlan({
  destination,
  days,
  budget,
  travelWith,
}) {
  const prompt = `
Generate a ${days}-day travel plan for ${destination} for ${travelWith} with a ${budget} budget.

Return ONLY valid JSON with the following keys:
- destination (string)
- duration_days (number)
- travel_style (string)
- budget (string)
- hotels_options (array of { hotel_name, hotel_address, hotel_image_url, geo_coordinates {latitude, longitude}, rating, description, price })
- itinerary (array of { day, plan: [ { place_name, place_details, place_image_url, geo_coordinates {latitude, longitude}, ticket_pricing, rating, time_to_travel, best_time_to_visit } ] })
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    responseText = responseText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", responseText);
      throw new Error("Gemini returned invalid JSON");
    }

    return parsed;
  } catch (error) {
    console.error("Error generating trip plan:", error);
    return null;
  }
}
