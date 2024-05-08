import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { loadQARefineChain } from "langchain/chains";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
    mood: z.string().describe("the mood of the person who wrote the entry."),
    summary: z
      .string()
      .describe(
        "quick,brief and meaningful summary of the entire entry.(don't refer to the writer as 'the writer' use something like 'you' instead "
      ),
    subject: z.string().describe("the subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e does it contain negative emotions)."
      ),
    color: z
      .string()
      .describe(
        "a hexadecimal color representing the mood of the entry. Example #FF0000 is red for anger."
      ),
  })
);

const getPrompt = async (content: any) => {
  const formatted_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formatted_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { formatted_instructions },
  });
  const input = prompt.format({
    entry: content,
  });
  return input;
};

export const analyze = async (content: any) => {
  const input = await getPrompt(content);
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    temperature: 0.3,
    maxOutputTokens: 2048,
  });
  const result = await model.invoke(input);
  // const JSONcontent = result.content;
  try {
    return parser.parse(result.content.toString());
  } catch (error) {
    console.log(error, "could not parse o");
  }
};
function* createDocuments(entries) {
  for (const entry of entries) {
    yield new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    });
  }
}
export const qa = async (question: any, entries: any) => {
  const docs = Array.from(createDocuments(entries)); // Convert generator to array
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    temperature: 0,
    maxOutputTokens: 1024,
  });
  const chain = loadQARefineChain(model);

  const embeddings = new GoogleGenerativeAIEmbeddings();
  console.time("mem vector init");
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  console.timeEnd("mem vector init");
  console.time("similarity search");
  const relevantDocs = await store.similaritySearch(question);
  console.timeEnd("similarity search");
  console.time("invoke");
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });
  console.timeEnd("invoke");
  return res.output_text;
};
