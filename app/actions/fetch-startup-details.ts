import { client } from "@/sanity/lib/client";

export async function fetchStartupDetails(id: string) {
  const query = `*[_type == "startup" && _id == $id][0]`;
  const params = { id };
  return await client.fetch(query, params);
}
