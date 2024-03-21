//@ts-nocheck

// need to work on this one
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { GooglePaLM } from "@langchain/community/llms/googlepalm";

type Data = {
  title: any;
  story: any;
  status: any;
};
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // console.log(req.body);
    if (req.method === "POST") {

      const model = new GooglePaLM({
        apiKey: process.env.PALM_KEY,
        temperature: 1,
        modelName: "models/text-bison-001",
        maxOutputTokens: 1024,
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
        stopSequences: ["stop"],
      });
      const result = await model.invoke(req.body.question);
      // console.log({ res });
      res.status(200).json({ data: result, status: "success" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ title: null, story: null, status: "error" });
  }
}
