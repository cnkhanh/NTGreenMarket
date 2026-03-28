import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

type Params = { params: Promise<{ shopId: string; userId: string }> };

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function requireOwnerOrAdmin(
  callerId: string,
  isAdmin: boolean,
  shopId: string
): Promise<NextResponse | null> {
  if (isAdmin) return null;

  const membership = await prisma.shopMember.findUnique({
    where: { shop_id_user_id: { shop_id: shopId, user_id: callerId } },
  });

  if (!membership || membership.role !== "OWNER") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  return null;
}

// ─── DELETE /api/shops/[shopId]/members/[userId] ──────────────────────────────

export async function DELETE(req: NextRequest, { params }: Params) {
  const { shopId, userId } = await params;

  const caller = await getAuthUser(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const denied = await requireOwnerOrAdmin(caller.id, caller.is_admin, shopId);
  if (denied) return denied;

  const target = await prisma.shopMember.findUnique({
    where: { shop_id_user_id: { shop_id: shopId, user_id: userId } },
  });

  if (!target) {
    return NextResponse.json(
      { error: "Member not found" },
      { status: 404 }
    );
  }

  if (target.role === "OWNER") {
    return NextResponse.json(
      { error: "Cannot remove the shop owner. Transfer ownership first." },
      { status: 422 }
    );
  }

  await prisma.shopMember.delete({
    where: { shop_id_user_id: { shop_id: shopId, user_id: userId } },
  });

  return new NextResponse(null, { status: 204 });
}

// ─── PATCH /api/shops/[shopId]/members/[userId] ───────────────────────────────
// Transfers shop ownership to the target user (who must already be a member).
// The previous OWNER is downgraded to EDITOR.

export async function PATCH(req: NextRequest, { params }: Params) {
  const { shopId, userId } = await params;

  const caller = await getAuthUser(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const denied = await requireOwnerOrAdmin(caller.id, caller.is_admin, shopId);
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  if (body?.role !== "OWNER") {
    return NextResponse.json(
      { error: "Only role 'OWNER' is valid for this endpoint (ownership transfer)" },
      { status: 400 }
    );
  }

  const target = await prisma.shopMember.findUnique({
    where: { shop_id_user_id: { shop_id: shopId, user_id: userId } },
  });

  if (!target) {
    return NextResponse.json(
      { error: "Target user is not a member of this shop" },
      { status: 404 }
    );
  }

  if (target.role === "OWNER") {
    return NextResponse.json(
      { error: "User is already the owner" },
      { status: 409 }
    );
  }

  // Verify the new owner has a SELLER UserRole for this shop's event so the
  // ownership invariant holds (OWNERs must be event sellers).
  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (!shop) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  }

  const sellerRole = await prisma.userRole.findUnique({
    where: { user_id_event_id: { user_id: userId, event_id: shop.event_id } },
  });
  if (!sellerRole || sellerRole.role !== "SELLER") {
    return NextResponse.json(
      { error: "New owner must have a SELLER role for this event" },
      { status: 422 }
    );
  }

  // Transfer in a transaction: demote current OWNER → EDITOR, promote target → OWNER.
  const [, updated] = await prisma.$transaction([
    prisma.shopMember.updateMany({
      where: { shop_id: shopId, role: "OWNER" },
      data: { role: "EDITOR" },
    }),
    prisma.shopMember.update({
      where: { shop_id_user_id: { shop_id: shopId, user_id: userId } },
      data: { role: "OWNER" },
      include: {
        user: { select: { id: true, name: true, email: true, location: true } },
      },
    }),
  ]);

  return NextResponse.json({ success: true, data: updated });
}
