import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAdminCtx(id = 1): TrpcContext {
  return {
    user: {
      id,
      openId: `admin-${id}`,
      email: `admin${id}@test.com`,
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function createPartnerCtx(id = 1): TrpcContext {
  return {
    user: {
      id,
      openId: `partner-${id}`,
      email: `partner${id}@test.com`,
      name: "Test Partner",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

// content.create returns { success: true, id: number }
// content.list returns published items only
// content.adminList returns all items (admin only)
describe("partnerTools.content", () => {
  const adminCaller = appRouter.createCaller(createAdminCtx(9905));
  const partnerCaller = appRouter.createCaller(createPartnerCtx(9906));

  it("creates a content item as draft (isPublished defaults to false)", async () => {
    const result = await adminCaller.partnerTools.content.create({
      contentType: "announcement",
      title: "New Feature: Proposal Builder",
      body: "You can now create and send proposals directly from your dashboard.",
      category: "Product Update",
    });

    expect(result).toBeDefined();
    expect(result.id).toBeGreaterThan(0);
    expect(result.success).toBe(true);

    // Verify it's in the admin list as unpublished
    const adminList = await adminCaller.partnerTools.content.adminList({});
    const found = adminList.find((i: { id: number }) => i.id === result.id);
    expect(found).toBeDefined();
    expect(found?.isPublished).toBe(false);
  });

  it("publishes a content item and makes it visible to partners", async () => {
    const created = await adminCaller.partnerTools.content.create({
      contentType: "playbook_tip",
      title: "Always upsell gutter guards with roof jobs",
      body: "Partners who mention gutter guards close 40% more add-on revenue.",
      category: "Roofing",
    });

    // Publish it
    await adminCaller.partnerTools.content.update({
      id: created.id,
      isPublished: true,
    });

    // Partner should see it in the public list
    const publicList = await partnerCaller.partnerTools.content.list({
      contentType: "playbook_tip",
    });
    const found = publicList.find((i: { id: number }) => i.id === created.id);
    expect(found).toBeDefined();
    expect(found?.isPublished).toBe(true);
  });

  it("unpublished items are not visible to partners via content.list", async () => {
    const created = await adminCaller.partnerTools.content.create({
      contentType: "announcement",
      title: "Draft Announcement — Not Published",
      body: "This should not be visible to partners.",
    });

    // Do NOT publish — item stays as draft
    const publicList = await partnerCaller.partnerTools.content.list({
      contentType: "announcement",
    });
    const found = publicList.find((i: { id: number }) => i.id === created.id);
    expect(found).toBeUndefined();
  });

  it("deletes a content item", async () => {
    const created = await adminCaller.partnerTools.content.create({
      contentType: "resource_link",
      title: "To Be Deleted",
      url: "https://example.com/resource",
    });

    await adminCaller.partnerTools.content.delete({ id: created.id });

    const adminList = await adminCaller.partnerTools.content.adminList({});
    const found = adminList.find((i: { id: number }) => i.id === created.id);
    expect(found).toBeUndefined();
  });

  it("non-admin users cannot create content items", async () => {
    await expect(
      partnerCaller.partnerTools.content.create({
        contentType: "announcement",
        title: "Unauthorized Announcement",
      })
    ).rejects.toThrow();
  });
});
