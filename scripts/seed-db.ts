import { db } from "../server/db";
import { 
  brands, users, financials, adCampaigns, aiAgents, tasks, meetings, productMarketFit
} from "../shared/schema";

async function seed() {
  console.log("Seeding database...");
  
  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(meetings);
    await db.delete(tasks);
    await db.delete(productMarketFit);
    await db.delete(aiAgents);
    await db.delete(adCampaigns);
    await db.delete(financials);
    await db.delete(brands);
    await db.delete(users);
    
    // Create admin user
    console.log("Creating user...");
    const [adminUser] = await db.insert(users).values({
      username: "admin",
      password: "password123",
      displayName: "Zach Bowman",
      avatar: "/avatar.png",
      role: "admin"
    }).returning();
    
    // Create brands
    console.log("Creating brands...");
    const [hydraBark] = await db.insert(brands).values({
      name: "HydraBark",
      code: "HydraBark",
      logo: "/hydraBark-logo.png"
    }).returning();
    
    const [fitFluence] = await db.insert(brands).values({
      name: "FitFluence",
      code: "FitFluence",
      logo: "/fitFluence-logo.png"
    }).returning();
    
    const [ecoVibe] = await db.insert(brands).values({
      name: "EcoVibe",
      code: "EcoVibe",
      logo: "/ecoVibe-logo.png"
    }).returning();
    
    // Create financial data for HydraBark
    console.log("Creating financial data...");
    await db.insert(financials).values({
      brandId: hydraBark.id,
      revenue: 124568,
      adSpend: 35000,
      cogs: 25136,
      otherExpenses: 11000,
      profit: 53432,
      roas: 3.2
    });
    
    // Create ad campaigns for HydraBark
    console.log("Creating ad campaigns...");
    await db.insert(adCampaigns).values([
      {
        brandId: hydraBark.id,
        name: "Summer Sale",
        platform: "Meta",
        spend: 2450,
        ctr: 2.8,
        roas: 3.5,
        status: "Active"
      },
      {
        brandId: hydraBark.id,
        name: "Dog Training Tips",
        platform: "TikTok",
        spend: 1875,
        ctr: 3.2,
        roas: 3.9,
        status: "Active"
      },
      {
        brandId: hydraBark.id,
        name: "Product Demo",
        platform: "Meta",
        spend: 1120,
        ctr: 1.3,
        roas: 1.8,
        status: "Warning"
      },
      {
        brandId: hydraBark.id,
        name: "Customer Reviews",
        platform: "TikTok",
        spend: 980,
        ctr: 4.1,
        roas: 4.2,
        status: "Active"
      }
    ]);
    
    // Create AI agents for HydraBark
    console.log("Creating AI agents...");
    await db.insert(aiAgents).values([
      {
        brandId: hydraBark.id,
        name: "CX GPT",
        type: "CX",
        successRate: 98,
        usageCount: 412,
        cost: 15.23,
        metrics: { resolutionRate: 94 }
      },
      {
        brandId: hydraBark.id,
        name: "CMO GPT",
        type: "CMO",
        successRate: 85,
        usageCount: 28,
        cost: 12.50,
        metrics: { roasImprovement: 85 }
      },
      {
        brandId: hydraBark.id,
        name: "Cart Recovery GPT",
        type: "CartRecovery",
        successRate: 62,
        usageCount: 183,
        cost: 14.63,
        metrics: { recoveryRate: 62 }
      }
    ]);
    
    // Create product market fit data for HydraBark
    console.log("Creating product market fit data...");
    await db.insert(productMarketFit).values({
      brandId: hydraBark.id,
      pmfScore: 75,
      returnRate: 5.2,
      reviewSentiment: 82,
      repeatPurchaseRate: 31,
      npsScore: 42,
      objections: {
        items: [
          { name: "Price too high", percentage: 38 },
          { name: "Durability concerns", percentage: 22 },
          { name: "Sizing issues", percentage: 18 },
          { name: "Shipping time", percentage: 12 }
        ]
      }
    });
    
    // Create tasks for HydraBark
    console.log("Creating tasks...");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const friday = new Date(today);
    friday.setDate(friday.getDate() + 4);
    
    await db.insert(tasks).values([
      {
        brandId: hydraBark.id,
        title: "Review ad performance for Meta campaigns",
        description: "Analyze the performance of all Meta ad campaigns and identify optimization opportunities",
        assignedTo: "ZB",
        priority: "Medium",
        status: "Todo",
        dueDate: today,
        category: "Marketing",
        completed: false
      },
      {
        brandId: hydraBark.id,
        title: "Analyze CX GPT customer feedback logs",
        description: "Review customer feedback logs from CX GPT and identify common issues",
        assignedTo: "AI",
        priority: "High",
        status: "Todo",
        dueDate: tomorrow,
        category: "AI Ops",
        completed: false
      },
      {
        brandId: hydraBark.id,
        title: "Update product description for harnesses",
        description: "Rewrite product descriptions for the dog harness product line",
        assignedTo: "TK",
        priority: "Low",
        status: "Completed",
        dueDate: yesterday,
        category: "Content",
        completed: true
      },
      {
        brandId: hydraBark.id,
        title: "Review TikTok ad creative performance",
        description: "Analyze the performance of TikTok ad creatives and identify top performers",
        assignedTo: "JL",
        priority: "Low",
        status: "Todo",
        dueDate: friday,
        category: "Marketing",
        completed: false
      }
    ]);
    
    // Create meetings for HydraBark
    console.log("Creating meetings...");
    const twoPM = new Date(today);
    twoPM.setHours(14, 0, 0, 0);
    const threePM = new Date(today);
    threePM.setHours(15, 0, 0, 0);
    
    const tenAM_tomorrow = new Date(tomorrow);
    tenAM_tomorrow.setHours(10, 0, 0, 0);
    const elevenAM_tomorrow = new Date(tomorrow);
    elevenAM_tomorrow.setHours(11, 0, 0, 0);
    
    const onePM_friday = new Date(friday);
    onePM_friday.setHours(13, 0, 0, 0);
    const threePM_friday = new Date(friday);
    threePM_friday.setHours(15, 0, 0, 0);
    
    await db.insert(meetings).values([
      {
        brandId: hydraBark.id,
        title: "Weekly Marketing Review",
        description: "Review marketing performance from the previous week and plan for the next week",
        startTime: twoPM,
        endTime: threePM,
        attendees: ["ZB", "JL", "TK", "AI", "PM"],
        aiReportReady: false,
        meetingLink: "https://meet.google.com/abc-defg-hij"
      },
      {
        brandId: hydraBark.id,
        title: "AI Performance Analysis",
        description: "Analyze the performance of AI agents and identify optimization opportunities",
        startTime: tenAM_tomorrow,
        endTime: elevenAM_tomorrow,
        attendees: ["ZB", "AI"],
        aiReportReady: false,
        meetingLink: "https://meet.google.com/jkl-mnop-qrs"
      },
      {
        brandId: hydraBark.id,
        title: "Monthly Business Review",
        description: "Review business performance for the month and plan for the next month",
        startTime: onePM_friday,
        endTime: threePM_friday,
        attendees: ["ZB", "JL"],
        aiReportReady: true,
        meetingLink: "https://meet.google.com/tuv-wxyz-123"
      }
    ]);
    
    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seed();