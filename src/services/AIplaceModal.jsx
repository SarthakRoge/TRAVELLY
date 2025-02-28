import { GoogleGenerativeAI} from "@google/generative-ai"

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Suggest the 6 best destinations list for May month based on the following preferences: Urban Adventure, continent: Europe, activities: Cultural Exploration and popularity: Hidden-Gem. Provide the places list with name, a short 2 line description, and an image URL for each destination in JSON format.\""},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"destinations\": [\n    {\n      \"name\": \"Guimarães, Portugal\",\n      \"description\": \"The birthplace of Portugal, Guimarães boasts a charming medieval center, a well-preserved castle, and a relaxed atmosphere, offering a deep dive into Portuguese history without the crowds of Lisbon or Porto.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/GuimaraesCastle.jpg/1280px-GuimaraesCastle.jpg\"\n    },\n    {\n      \"name\": \"Ljubljana, Slovenia\",\n      \"description\": \"A green capital with a vibrant arts scene, Ljubljana is a pedestrian-friendly city with baroque architecture, a picturesque riverfront, and a thriving cafe culture, perfect for relaxed exploration.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ljubljana_Slovenia_Aerial_View.jpg/1280px-Ljubljana_Slovenia_Aerial_View.jpg\"\n    },\n    {\n      \"name\": \"Matera, Italy\",\n      \"description\": \"Known for its ancient Sassi cave dwellings, Matera is a UNESCO World Heritage site offering a unique glimpse into Italy's past. Explore the labyrinthine streets and experience a city unlike any other.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Matera_Sassi_Italy_2017.jpg/1280px-Matera_Sassi_Italy_2017.jpg\"\n    },\n    {\n      \"name\": \"Ghent, Belgium\",\n      \"description\": \"Often overshadowed by Bruges and Brussels, Ghent offers stunning medieval architecture, canals, and a vibrant student population. Its rich history and lively atmosphere create an unforgettable experience.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ghent_cityscape_from_Castle_of_the_Counts.jpg/1280px-Ghent_cityscape_from_Castle_of_the_Counts.jpg\"\n    },\n    {\n      \"name\": \"Sibiu, Romania\",\n      \"description\": \"A Transylvanian gem, Sibiu boasts a well-preserved medieval city center with colorful buildings, hidden passageways, and charming squares. Its rich history and Saxon heritage offer a unique cultural experience.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Sibiu_Romania_Main_Square.jpg/1280px-Sibiu_Romania_Main_Square.jpg\"\n    },\n    {\n      \"name\": \"Valletta, Malta\",\n      \"description\": \"The fortified capital of Malta, Valletta is a UNESCO World Heritage city packed with baroque architecture, stunning views of the Mediterranean, and a rich history dating back to the Knights of St. John.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Valletta_skyline_from_Sliema.jpg/1280px-Valletta_skyline_from_Sliema.jpg\"\n    }\n  ]\n}\n```"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();