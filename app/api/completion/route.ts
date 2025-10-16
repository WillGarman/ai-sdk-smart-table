import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model: openai("gpt-4.1-mini"),
    system: `You generate a new value for a cell in a table. First determine the type of the <value-type> and then follow the format of the value type to generate a new value for the cell.
      
      <value-types>
      - string
      - number
      - boolean: true/false
      - date/time: format as YYYY-MM-DD HH:MM:SS
      - currency: prefix with currency symbol (e.g. $100, €100, £100)
      - percentage: prefix with percentage symbol
      - email: valid email address
      - phone: valid phone number
      - url: valid URL
      </value-types>
      `,
    prompt,
    schema: z.object({
      value: z.string().describe("The new value of this cell."),
    }),
  });

  return result.toJsonResponse();
}
