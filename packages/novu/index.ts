import { Novu } from "@novu/node";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const novu = new Novu(process.env.NOVU_API_KEY!, {
  backendUrl: process.env.NOVU_BACKEND_URL,
});

export * from "@novu/node";
export * from "./src";
