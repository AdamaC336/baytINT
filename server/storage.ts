import {
  users, User, InsertUser,
  brands, Brand, InsertBrand,
  financials, Financial, InsertFinancial,
  adCampaigns, AdCampaign, InsertAdCampaign,
  aiAgents, AiAgent, InsertAiAgent,
  productMarketFit, ProductMarketFit, InsertProductMarketFit,
  tasks, Task, InsertTask,
  meetings, Meeting, InsertMeeting
} from "@shared/schema";

// Comprehensive storage interface for the BI Dashboard
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Brand management
  getBrands(): Promise<Brand[]>;
  getBrand(id: number): Promise<Brand | undefined>;
  getBrandByCode(code: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;

  // Financial data
  getFinancials(brandId: number, period?: string): Promise<Financial[]>;
  createFinancial(financial: InsertFinancial): Promise<Financial>;

  // Ad campaigns
  getAdCampaigns(brandId: number): Promise<AdCampaign[]>;
  getAdCampaign(id: number): Promise<AdCampaign | undefined>;
  createAdCampaign(campaign: InsertAdCampaign): Promise<AdCampaign>;
  updateAdCampaign(id: number, data: Partial<InsertAdCampaign>): Promise<AdCampaign | undefined>;

  // AI agents
  getAiAgents(brandId: number): Promise<AiAgent[]>;
  getAiAgent(id: number): Promise<AiAgent | undefined>;
  createAiAgent(agent: InsertAiAgent): Promise<AiAgent>;
  updateAiAgent(id: number, data: Partial<InsertAiAgent>): Promise<AiAgent | undefined>;

  // Product market fit
  getProductMarketFit(brandId: number): Promise<ProductMarketFit | undefined>;
  createProductMarketFit(pmf: InsertProductMarketFit): Promise<ProductMarketFit>;
  updateProductMarketFit(id: number, data: Partial<InsertProductMarketFit>): Promise<ProductMarketFit | undefined>;

  // Tasks
  getTasks(brandId: number, status?: string): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, data: Partial<InsertTask>): Promise<Task | undefined>;

  // Meetings
  getMeetings(brandId: number): Promise<Meeting[]>;
  getMeeting(id: number): Promise<Meeting | undefined>;
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  updateMeeting(id: number, data: Partial<InsertMeeting>): Promise<Meeting | undefined>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private brands: Map<number, Brand> = new Map();
  private financials: Map<number, Financial[]> = new Map();
  private adCampaigns: Map<number, AdCampaign> = new Map();
  private aiAgents: Map<number, AiAgent> = new Map();
  private productMarketFits: Map<number, ProductMarketFit> = new Map();
  private tasks: Map<number, Task> = new Map();
  private meetings: Map<number, Meeting> = new Map();

  private userIdCounter = 1;
  private brandIdCounter = 1;
  private financialIdCounter = 1;
  private adCampaignIdCounter = 1;
  private aiAgentIdCounter = 1;
  private pmfIdCounter = 1;
  private taskIdCounter = 1;
  private meetingIdCounter = 1;

  constructor() {
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create brands
    const hydraBark = this.createBrand({
      name: "HydraBark",
      code: "HydraBark",
      logo: "/hydraBark-logo.png"
    });

    const fitFluence = this.createBrand({
      name: "FitFluence",
      code: "FitFluence",
      logo: "/fitFluence-logo.png"
    });

    const ecoVibe = this.createBrand({
      name: "EcoVibe",
      code: "EcoVibe",
      logo: "/ecoVibe-logo.png"
    });

    // Create a user
    this.createUser({
      username: "admin",
      password: "password123",
      displayName: "Zach Bowman",
      avatar: "/avatar.png",
      role: "admin"
    });

    // Create financial data for HydraBark
    this.createFinancial({
      brandId: hydraBark.id,
      date: new Date(),
      revenue: 124568,
      adSpend: 35000,
      cogs: 25136,
      otherExpenses: 11000,
      profit: 53432,
      roas: 3.2
    });

    // Create ad campaigns for HydraBark
    this.createAdCampaign({
      brandId: hydraBark.id,
      name: "Summer Sale",
      platform: "Meta",
      spend: 2450,
      ctr: 2.8,
      roas: 3.5,
      status: "Active"
    });

    this.createAdCampaign({
      brandId: hydraBark.id,
      name: "Dog Training Tips",
      platform: "TikTok",
      spend: 1875,
      ctr: 3.2,
      roas: 3.9,
      status: "Active"
    });

    this.createAdCampaign({
      brandId: hydraBark.id,
      name: "Product Demo",
      platform: "Meta",
      spend: 1120,
      ctr: 1.3,
      roas: 1.8,
      status: "Warning"
    });

    this.createAdCampaign({
      brandId: hydraBark.id,
      name: "Customer Reviews",
      platform: "TikTok",
      spend: 980,
      ctr: 4.1,
      roas: 4.2,
      status: "Active"
    });

    // Create AI agents for HydraBark
    this.createAiAgent({
      brandId: hydraBark.id,
      name: "CX GPT",
      type: "CX",
      successRate: 98,
      usageCount: 412,
      cost: 15.23,
      metrics: { resolutionRate: 94 }
    });

    this.createAiAgent({
      brandId: hydraBark.id,
      name: "CMO GPT",
      type: "CMO",
      successRate: 85,
      usageCount: 28,
      cost: 12.50,
      metrics: { roasImprovement: 85 }
    });

    this.createAiAgent({
      brandId: hydraBark.id,
      name: "Cart Recovery GPT",
      type: "CartRecovery",
      successRate: 62,
      usageCount: 183,
      cost: 14.63,
      metrics: { recoveryRate: 62 }
    });

    // Create product market fit data for HydraBark
    this.createProductMarketFit({
      brandId: hydraBark.id,
      date: new Date(),
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
    this.createTask({
      brandId: hydraBark.id,
      title: "Review ad performance for Meta campaigns",
      description: "Analyze the performance of all Meta ad campaigns and identify optimization opportunities",
      assignedTo: "ZB",
      priority: "Medium",
      status: "Todo",
      dueDate: new Date(),
      category: "Marketing",
      completed: false
    });

    this.createTask({
      brandId: hydraBark.id,
      title: "Analyze CX GPT customer feedback logs",
      description: "Review customer feedback logs from CX GPT and identify common issues",
      assignedTo: "AI",
      priority: "High",
      status: "Todo",
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      category: "AI Ops",
      completed: false
    });

    this.createTask({
      brandId: hydraBark.id,
      title: "Update product description for harnesses",
      description: "Rewrite product descriptions for the dog harness product line",
      assignedTo: "TK",
      priority: "Low",
      status: "Completed",
      dueDate: new Date(Date.now() - 86400000), // Yesterday
      category: "Content",
      completed: true
    });

    this.createTask({
      brandId: hydraBark.id,
      title: "Review TikTok ad creative performance",
      description: "Analyze the performance of TikTok ad creatives and identify top performers",
      assignedTo: "JL",
      priority: "Low",
      status: "Todo",
      dueDate: new Date(Date.now() + 4 * 86400000), // In 4 days (Friday)
      category: "Marketing",
      completed: false
    });

    // Create meetings for HydraBark
    this.createMeeting({
      brandId: hydraBark.id,
      title: "Weekly Marketing Review",
      description: "Review marketing performance from the previous week and plan for the next week",
      startTime: new Date(new Date().setHours(14, 0, 0, 0)), // Today at 2 PM
      endTime: new Date(new Date().setHours(15, 0, 0, 0)),  // Today at 3 PM
      attendees: ["ZB", "JL", "TK", "AI", "PM"],
      aiReportReady: false,
      meetingLink: "https://meet.google.com/abc-defg-hij"
    });

    this.createMeeting({
      brandId: hydraBark.id,
      title: "AI Performance Analysis",
      description: "Analyze the performance of AI agents and identify optimization opportunities",
      startTime: new Date(new Date().setHours(10, 0, 0, 0) + 86400000), // Tomorrow at 10 AM
      endTime: new Date(new Date().setHours(11, 0, 0, 0) + 86400000),  // Tomorrow at 11 AM
      attendees: ["ZB", "AI"],
      aiReportReady: false,
      meetingLink: "https://meet.google.com/jkl-mnop-qrs"
    });

    this.createMeeting({
      brandId: hydraBark.id,
      title: "Monthly Business Review",
      description: "Review business performance for the month and plan for the next month",
      startTime: new Date(new Date().setHours(13, 0, 0, 0) + 4 * 86400000), // Friday at 1 PM
      endTime: new Date(new Date().setHours(15, 0, 0, 0) + 4 * 86400000),  // Friday at 3 PM
      attendees: ["ZB", "JL"],
      aiReportReady: true,
      meetingLink: "https://meet.google.com/tuv-wxyz-123"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...userData, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Brand methods
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrand(id: number): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async getBrandByCode(code: string): Promise<Brand | undefined> {
    return Array.from(this.brands.values()).find(brand => brand.code === code);
  }

  async createBrand(brandData: InsertBrand): Promise<Brand> {
    const id = this.brandIdCounter++;
    const brand: Brand = { ...brandData, id, createdAt: new Date() };
    this.brands.set(id, brand);
    return brand;
  }

  // Financial methods
  async getFinancials(brandId: number, period?: string): Promise<Financial[]> {
    const brandFinancials = this.financials.get(brandId) || [];
    if (!period) return brandFinancials;

    // Filter by period if needed (could implement date filtering)
    return brandFinancials;
  }

  async createFinancial(financialData: InsertFinancial): Promise<Financial> {
    const id = this.financialIdCounter++;
    const financial: Financial = { ...financialData, id };
    
    const brandFinancials = this.financials.get(financialData.brandId) || [];
    brandFinancials.push(financial);
    this.financials.set(financialData.brandId, brandFinancials);
    
    return financial;
  }

  // Ad campaign methods
  async getAdCampaigns(brandId: number): Promise<AdCampaign[]> {
    return Array.from(this.adCampaigns.values()).filter(
      campaign => campaign.brandId === brandId
    );
  }

  async getAdCampaign(id: number): Promise<AdCampaign | undefined> {
    return this.adCampaigns.get(id);
  }

  async createAdCampaign(campaignData: InsertAdCampaign): Promise<AdCampaign> {
    const id = this.adCampaignIdCounter++;
    const now = new Date();
    const campaign: AdCampaign = { 
      ...campaignData, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.adCampaigns.set(id, campaign);
    return campaign;
  }

  async updateAdCampaign(id: number, data: Partial<InsertAdCampaign>): Promise<AdCampaign | undefined> {
    const campaign = this.adCampaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = { 
      ...campaign, 
      ...data,
      updatedAt: new Date()
    };
    this.adCampaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  // AI agent methods
  async getAiAgents(brandId: number): Promise<AiAgent[]> {
    return Array.from(this.aiAgents.values()).filter(
      agent => agent.brandId === brandId
    );
  }

  async getAiAgent(id: number): Promise<AiAgent | undefined> {
    return this.aiAgents.get(id);
  }

  async createAiAgent(agentData: InsertAiAgent): Promise<AiAgent> {
    const id = this.aiAgentIdCounter++;
    const now = new Date();
    const agent: AiAgent = { 
      ...agentData, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.aiAgents.set(id, agent);
    return agent;
  }

  async updateAiAgent(id: number, data: Partial<InsertAiAgent>): Promise<AiAgent | undefined> {
    const agent = this.aiAgents.get(id);
    if (!agent) return undefined;
    
    const updatedAgent = { 
      ...agent, 
      ...data,
      updatedAt: new Date()
    };
    this.aiAgents.set(id, updatedAgent);
    return updatedAgent;
  }

  // Product market fit methods
  async getProductMarketFit(brandId: number): Promise<ProductMarketFit | undefined> {
    return Array.from(this.productMarketFits.values()).find(
      pmf => pmf.brandId === brandId
    );
  }

  async createProductMarketFit(pmfData: InsertProductMarketFit): Promise<ProductMarketFit> {
    const id = this.pmfIdCounter++;
    const pmf: ProductMarketFit = { ...pmfData, id };
    this.productMarketFits.set(id, pmf);
    return pmf;
  }

  async updateProductMarketFit(id: number, data: Partial<InsertProductMarketFit>): Promise<ProductMarketFit | undefined> {
    const pmf = this.productMarketFits.get(id);
    if (!pmf) return undefined;
    
    const updatedPmf = { ...pmf, ...data };
    this.productMarketFits.set(id, updatedPmf);
    return updatedPmf;
  }

  // Task methods
  async getTasks(brandId: number, status?: string): Promise<Task[]> {
    let tasks = Array.from(this.tasks.values()).filter(
      task => task.brandId === brandId
    );
    
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    
    return tasks;
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(taskData: InsertTask): Promise<Task> {
    const id = this.taskIdCounter++;
    const now = new Date();
    const task: Task = { 
      ...taskData, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, data: Partial<InsertTask>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = { 
      ...task, 
      ...data,
      updatedAt: new Date()
    };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  // Meeting methods
  async getMeetings(brandId: number): Promise<Meeting[]> {
    return Array.from(this.meetings.values()).filter(
      meeting => meeting.brandId === brandId
    );
  }

  async getMeeting(id: number): Promise<Meeting | undefined> {
    return this.meetings.get(id);
  }

  async createMeeting(meetingData: InsertMeeting): Promise<Meeting> {
    const id = this.meetingIdCounter++;
    const meeting: Meeting = { 
      ...meetingData, 
      id, 
      createdAt: new Date()
    };
    this.meetings.set(id, meeting);
    return meeting;
  }

  async updateMeeting(id: number, data: Partial<InsertMeeting>): Promise<Meeting | undefined> {
    const meeting = this.meetings.get(id);
    if (!meeting) return undefined;
    
    const updatedMeeting = { ...meeting, ...data };
    this.meetings.set(id, updatedMeeting);
    return updatedMeeting;
  }
}

// Export a singleton instance
export const storage = new MemStorage();
