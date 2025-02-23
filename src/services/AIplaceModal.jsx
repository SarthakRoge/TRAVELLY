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
          {text: "Suggest the 6 best travel destinations worldwide for May month based on the following preferences: Mountain Escape, continent:Europe ,activities :Photography and popularity:Hidden Gems. Provide the places list with name, a short 2 line description, and an image URL for each destination in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, here's a JSON object containing 6 suggestions for hidden gem mountain escapes in Europe that are excellent for photography in May, along with a brief description and an image URL.  I've focused on places that offer stunning scenery and are relatively less crowded than some of the major tourist hotspots.\n\n```json\n[\n  {\n    \"name\": \"Julian Alps, Slovenia\",\n    \"description\": \"Emerald lakes, soaring peaks, and charming villages make the Julian Alps a photographer's dream. May offers pleasant weather for hiking and capturing the landscape before the summer crowds arrive.\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Triglav_North_Face_from_Vrata_valley.jpg/1280px-Triglav_North_Face_from_Vrata_valley.jpg\"\n  },\n  {\n    \"name\": \"Dolomites, Italy (Less Known Areas)\",\n    \"description\": \"While popular, explore the Dolomites beyond the main resorts. Areas like the Pale di San Martino or the Brenta Dolomites offer equally stunning scenery with fewer tourists in May, perfect for landscape photography.\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Pale_di_San_Martino_Panorama.jpg/1280px-Pale_di_San_Martino_Panorama.jpg\"\n  },\n  {\n    \"name\": \"Picos de Europa, Spain\",\n    \"description\": \"Dramatic limestone peaks, lush green valleys, and picturesque villages characterize the Picos de Europa. May is ideal for hiking and photographing the wildflowers and mountain views before the summer heat.\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Picos_de_Europa_Fuente_De_Cablecar.jpg/1280px-Picos_de_Europa_Fuente_De_Cablecar.jpg\"\n  },\n  {\n    \"name\": \"Retezat Mountains, Romania\",\n    \"description\": \"Known as the 'Romanian Alps,' the Retezat Mountains offer pristine glacial lakes, rugged peaks, and diverse flora and fauna. May is a good time to visit before the higher elevation trails are completely clear of snow, offering unique photo opportunities.\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Taul_Portii%2C_Mun%C8%9Bii_Retezat.jpg/1280px-Taul_Portii%2C_Mun%C8%9Bii_Retezat.jpg\"\n  },\n  {\n    \"name\": \"High Tatras, Slovakia/Poland\",\n    \"description\": \"These majestic mountains offer stunning alpine scenery, challenging hiking trails, and charming mountain huts. May brings blooming wildflowers and clearer skies, providing excellent conditions for photography.\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Slovakia_High_Tatras_Popradske_pleso.jpg/1280px-Slovakia_High_Tatras_Popradske_pleso.jpg\"\n  },\n  {\n    \"name\": \"Scottish Highlands, Scotland (Western Isles)\",\n    \"description\": \"While parts of the Highlands are well-known, explore the Western Isles. May boasts longer daylight hours and fewer midges compared to later in the summer, perfect for capturing dramatic coastal and mountain landscapes.\",\n    \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Luskentyre_Beach_sunset_Harris.jpg/1280px-Luskentyre_Beach_sunset_Harris.jpg\"\n  }\n]\n```\n\n**Important Notes about the Image URLs:**\n\n*   **Image Rights:**  These URLs are for images on Wikimedia Commons, which generally have licenses that allow for free use. However, *always* double-check the specific license for any image before using it for any commercial purpose.  If you're using the images for a personal project, you're likely fine, but verifying the license is good practice.\n*   **Image Quality and Availability:**  The images are chosen to be representative and of reasonable quality. Image availability on the internet can change, so these links may not be permanent.\n*   **Alternative Image Sources:** Consider using stock photography sites like Unsplash, Pexels, or Pixabay for higher-resolution and guaranteed-available images, though attribution may be required depending on the license.\n\nThis list provides a diverse range of European mountain destinations that offer beautiful scenery, opportunities for photography, and relative peace and quiet in the month of May. Remember to check local weather conditions and trail accessibility before you go.\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();