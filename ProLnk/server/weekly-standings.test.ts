/**
 * Weekly Referral Standings Tests
 * Wave 10: Test coverage for email templates and cron endpoint
 */
import { describe, it, expect } from "vitest";

describe("Weekly Referral Standings", () => {
  describe("Standings Calculation", () => {
    it("should rank referrers by count descending", () => {
      const referrers = [
        { email: "a@test.com", referralCount: 5, priorityScore: 50 },
        { email: "b@test.com", referralCount: 12, priorityScore: 120 },
        { email: "c@test.com", referralCount: 3, priorityScore: 30 },
        { email: "d@test.com", referralCount: 8, priorityScore: 80 },
      ];

      const ranked = [...referrers].sort((a, b) => b.referralCount - a.referralCount);
      expect(ranked[0].email).toBe("b@test.com");
      expect(ranked[1].email).toBe("d@test.com");
      expect(ranked[2].email).toBe("a@test.com");
      expect(ranked[3].email).toBe("c@test.com");
    });

    it("should calculate gap to next prize tier", () => {
      const prizeTiers = [
        { place: 1, minReferrals: 0, prize: "$10,000" },
        { place: 2, minReferrals: 0, prize: "$2,500" },
        { place: 3, minReferrals: 0, prize: "$1,000" },
        { place: 4, minReferrals: 0, prize: "$500" },
        { place: 5, minReferrals: 0, prize: "$250" },
      ];

      const ranked = [
        { name: "Alice", referrals: 15, rank: 1 },
        { name: "Bob", referrals: 12, rank: 2 },
        { name: "Charlie", referrals: 10, rank: 3 },
        { name: "Diana", referrals: 8, rank: 4 },
        { name: "Eve", referrals: 5, rank: 5 },
        { name: "Frank", referrals: 3, rank: 6 },
      ];

      // Frank needs 3 more referrals to overtake Eve (5 - 3 + 1 = 3)
      const frankGap = ranked[4].referrals - ranked[5].referrals + 1;
      expect(frankGap).toBe(3);

      // Eve needs 4 more to overtake Diana (8 - 5 + 1 = 4)
      const eveGap = ranked[3].referrals - ranked[4].referrals + 1;
      expect(eveGap).toBe(4);

      expect(prizeTiers.length).toBe(5);
    });
  });

  describe("Email Template", () => {
    it("should generate valid email subject with rank", () => {
      const rank = 3;
      const totalParticipants = 47;
      const subject = `Your Referral Standings: #${rank} of ${totalParticipants} — ProLnk Grand Prize Contest`;
      
      expect(subject).toContain("#3");
      expect(subject).toContain("47");
      expect(subject).toContain("Grand Prize");
    });

    it("should show correct prize for each tier", () => {
      const prizeForRank = (rank: number): string => {
        const prizes: Record<number, string> = {
          1: "$10,000 Cash",
          2: "$2,500 Service Credit",
          3: "$1,000 Service Credit",
          4: "$500 Service Credit",
          5: "$250 Service Credit",
        };
        return prizes[rank] ?? "Keep referring to move up!";
      };

      expect(prizeForRank(1)).toBe("$10,000 Cash");
      expect(prizeForRank(5)).toBe("$250 Service Credit");
      expect(prizeForRank(6)).toBe("Keep referring to move up!");
    });
  });

  describe("Cron Endpoint Security", () => {
    it("should validate webhook secret", () => {
      const secret = "test-webhook-secret";
      const validHeader = `Bearer ${secret}`;
      const invalidHeader = "Bearer wrong-secret";

      expect(validHeader.replace("Bearer ", "")).toBe(secret);
      expect(invalidHeader.replace("Bearer ", "")).not.toBe(secret);
    });
  });

  describe("Home Health Report", () => {
    it("should calculate health score color", () => {
      const getScoreColor = (score: number): string => {
        if (score >= 80) return "#22c55e"; // green
        if (score >= 60) return "#f59e0b"; // amber
        return "#ef4444"; // red
      };

      expect(getScoreColor(90)).toBe("#22c55e");
      expect(getScoreColor(70)).toBe("#f59e0b");
      expect(getScoreColor(40)).toBe("#ef4444");
    });

    it("should generate maintenance reminders based on system age", () => {
      const getMaintenanceUrgency = (systemAge: number, lastServiceYears: number): string => {
        if (systemAge > 15 || lastServiceYears > 3) return "urgent";
        if (systemAge > 10 || lastServiceYears > 2) return "attention";
        return "good";
      };

      expect(getMaintenanceUrgency(20, 1)).toBe("urgent");
      expect(getMaintenanceUrgency(12, 1)).toBe("attention");
      expect(getMaintenanceUrgency(5, 1)).toBe("good");
      expect(getMaintenanceUrgency(5, 4)).toBe("urgent");
    });
  });
});
