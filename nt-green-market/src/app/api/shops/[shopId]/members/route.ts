import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

type Params = { params: Promise<{ shopId: string }> };

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the shop with its event, or a 404 response if not found.
 */
async function getShop(shopId: string) {
  return prisma.shop.findUnique({
    where: { id: shopId },
    include: { event: true },
  });
}

/**
 * Checks whether the caller is the shop OWNER or a global admin.
 * Returns a 403 response if not authorised, or null if authorised.
 */
async function requireOwnerOrAdmin(
  userId: string,
  isAdmin: boolean,
  shopId: string
): Promise<NextResponse | null> {
  if (isAdmin) return null;

  const membership = await prisma.shopMember.findUnique({
    where: { shop_id_user_id: { shop_id: shopId, user_id: userId } },
  });

  if (!membership || membership.role !== "OWNER") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  return null;
}

// ─── GET /api/shops/[shopId]/members ─────────────────────────────────────────

export async function GET(req: NextRequest, { params }: Params) {
  const { shopId } = await params;

  const caller = await getAuthUser(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const denied = await requireOwnerOrAdmin(caller.id, caller.is_admin, shopId);
  if (denied) return denied;

  const shop = await getShop(shopId);
  if (!shop) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  }

  const members = await prisma.shopMember.findMany({
    where: { shop_id: shopId },
    include: {
      user: {
        select: { id: true, name: true, email: true, location: true },
      },
    },
    orderBy: [{ role: "asc" }, { joined_at: "asc" }],
  });

  return NextResponse.json({ success: true, data: members });
}

// ─── POST /api/shops/[shopId]/members ────────────────────────────────────────

export async function POST(req: NextRequest, { params }: Params) {
  const { shopId } = await params;

  const caller = await getAuthUser(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const denied = await requireOwnerOrAdmin(caller.id, caller.is_admin, shopId);
  if (denied) return denied;

  const shop = await getShop(shopId);
  if (!shop) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  }

  if (shop.event.status === "CLOSED") {
    return NextResponse.json(
      { error: "Cannot add members to a shop in a closed event" },
      { status: 422 }
    );
  }

  const body = await req.json().catch(() => null);
  const userId: unknown = body?.userId;
  if (typeof userId !== "string" || !userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existing = await prisma.shopMember.findUnique({
    where: { shop_id_user_id: { shop_id: shopId, user_id: userId } },
  });
  if (existing) {
    return NextResponse.json(
      { error: "User is already a member of this shop" },
      { status: 409 }
    );
  }

  const member = await prisma.shopMember.create({
    data: { shop_id: shopId, user_id: userId, role: "EDITOR" },
    include: {
      user: { select: { id: true, name: true, email: true, location: true } },
    },
  });

  return NextResponse.json({ success: true, data: member }, { status: 201 });
}
