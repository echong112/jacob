import { OpenAI } from "@langchain/openai"
import { APIChain } from "langchain/chains"

export async function run() {
  // const { prompt } = await req.json()
  const rapidNBA = `BASE URL: https://${process.env.RAPIDAPI_HOST}/

  API Documentation
  The API endpoint /teams Get data about teams. 																										
  The team id are unique in the API and teams keep it among all seasons.																										
  Available conferences : East, West																										
  Available divisions : Atlantic, Central, Northwest, Pacific, Southeast ,Southwest
  
  Parameter	Format	Required	Default	Example	Description																					
  id	Integer																									
  name	String			name=Atlanta Hawks	The name of the team	Enum																				
  code	String			code=ATL	The shortcode of the team																					
  league	String			league=standard	The league of the team. 	 "Africa" "Orlando" "Sacramento" "Standard" "Utah" "Vegas" 																				
  conference	String			conference=East	The conference of the team. 	"East" "West"																				
  division	String			division=Southeast	The division of the team. 	"Atlantic" "Central" "Northwest" "Pacific" "Southeast" "Southwest" 																				
  search	String			search=Atlanta	The name of the team. string >= 3 characters
  `
  
  const apiUrl = `https://${process.env.RAPIDAPI_HOST}`;
  try {
    new URL(apiUrl);
  } catch (error) {
    throw new Error("Invalid API URL: " + apiUrl);
  }

  const model = new OpenAI({ modelName: "gpt-4-1106-preview" })
  const chain = APIChain.fromLLMAndAPIDocs(model, rapidNBA, {
    headers: {
      "x-rapidapi-host": `${process.env.RAPIDAPI_HOST}`,
      "x-rapidapi-key": `${process.env.RAPIDAPI_KEY}`, // Replace with your actual API key
    }
  })

  const res = await chain.invoke({
    question:
      'how many teams are in the NBA Eastern conference?'
  }) 
  return Response.json(res)
}
