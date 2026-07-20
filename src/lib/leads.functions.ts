import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const NOTION_DATABASE_ID = "REDACTED_DB_ID";
const GATEWAY_URL = "REDACTED_GATEWAY";

const emailSchema = z.object({
  email: z.string().trim().email().max(255),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const notionKey = process.env.NOTION_API_KEY;
    if (!lovableKey || !notionKey) {
      console.error("submitLead: missing LOVABLE_API_KEY or NOTION_API_KEY");
      return { ok: false as const, error: "Server non configurato" };
    }

    const res = await fetch(`${GATEWAY_URL}/v1/pages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": notionKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Email: {
            title: [{ text: { content: data.email } }],
          },
          Source: {
            rich_text: [{ text: { content: "landing" } }],
          },
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Notion gateway failed [${res.status}]: ${body}`);
      return { ok: false as const, error: `Notion ${res.status}` };
    }

    return { ok: true as const };
  });
