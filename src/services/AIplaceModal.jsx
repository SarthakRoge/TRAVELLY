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
            {text: "\"Suggest the 4 best travel destinations worldwide for May month based on the following preferences: Mountain Escape,climate: Cold and Snowy ,activities :Photography and popularity:Hidden Gems. Provide the places list with name, a short 2 line description, and an image URL for each destination in JSON format.\"\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"destinations\": [\n    {\n      \"name\": \"Aoraki/Mount Cook National Park, New Zealand\",\n      \"description\": \"Majestic alpine scenery dominated by New Zealand's highest peak. May offers quieter trails and stunning snow-capped vistas perfect for photography.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mount_Cook_Lake_Pukaki.jpg/1280px-Mount_Cook_Lake_Pukaki.jpg\"\n    },\n    {\n      \"name\": \"Hokkaido, Japan\",\n      \"description\": \"Vast landscapes covered in snow and pristine forests. May is the last time to experience the area in its snow covered state, offering unique photo opportunities with fewer crowds.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Shiretoko_Peninsula_Winter.jpg/1280px-Shiretoko_Peninsula_Winter.jpg\"\n    },\n    {\n      \"name\": \"Jasper National Park, Canada\",\n      \"description\": \"Less crowded than Banff, Jasper boasts equally impressive Canadian Rockies scenery. May can still offer snow-capped peaks and wildlife viewing opportunities.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Maligne_Lake_%28Jasper_National_Park%2C_Alberta%2C_Canada%29.jpg/1280px-Maligne_Lake_%28Jasper_National_Park%2C_Alberta%2C_Canada%29.jpg\"\n    },\n    {\n      \"name\": \"Troms, Norway\",\n      \"description\": \"A stunning arctic region, the last of the snow-covered areas can be found in May. Experience the transition from winter to summer in this unique and beautiful place.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Troms%C3%B8_panorama_%285311841786%29.jpg/1280px-Troms%C3%B8_panorama_%285311841786%29.jpg\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();