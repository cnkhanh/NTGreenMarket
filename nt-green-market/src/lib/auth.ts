import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { User } from "@/generated/prisma";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Extracts and verifies the Bearer token from the Authorization header,
 * then returns the corresponding User record from the application database.
 *
 * Returns null if the token is missing, invalid, or the user is not found.
 */
export async function getAuthUser(req: NextRequest): Promise<User | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user?.email) return null;

  return prisma.user.findUnique({ where: { email: data.user.email } });
}
