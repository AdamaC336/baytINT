import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAdCampaignSchema, insertAiAgentSchema, insertFinancialSchema, insertMeetingSchema, insertProductMarketFitSchema, insertTaskSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // API Routes
  // Get all brands
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch brands" });
    }
  });

  // Get a specific brand by code
  app.get("/api/brands/:code", async (req, res) => {
    try {
      const brand = await storage.getBrandByCode(req.params.code);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch brand" });
    }
  });

  // Get financial data for a brand
  app.get("/api/financials/:brandId", async (req, res) => {
    try {
      const brandId = parseInt(req.params.brandId);
      const period = req.query.period as string | undefined;
      const financials = await storage.getFinancials(brandId, period);
      res.json(financials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch financial data" });
    }
  });

  // Create financial data for a brand
  app.post("/api/financials", async (req, res) => {
    try {
      const data = insertFinancialSchema.parse(req.body);
      const financial = await storage.createFinancial(data);
      res.status(201).json(financial);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid financial data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create financial data" });
    }
  });

  // Get ad campaigns for a brand
  app.get("/api/ad-campaigns/:brandId", async (req, res) => {
    try {
      const brandId = parseInt(req.params.brandId);
      const campaigns = await storage.getAdCampaigns(brandId);
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ad campaigns" });
    }
  });

  // Create ad campaign
  app.post("/api/ad-campaigns", async (req, res) => {
    try {
      const data = insertAdCampaignSchema.parse(req.body);
      const campaign = await storage.createAdCampaign(data);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid campaign data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ad campaign" });
    }
  });

  // Update ad campaign
  app.patch("/api/ad-campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const campaign = await storage.updateAdCampaign(id, data);
      if (!campaign) {
        return res.status(404).json({ message: "Ad campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to update ad campaign" });
    }
  });

  // Get AI agents for a brand
  app.get("/api/ai-agents/:brandId", async (req, res) => {
    try {
      const brandId = parseInt(req.params.brandId);
      const agents = await storage.getAiAgents(brandId);
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI agents" });
    }
  });

  // Create AI agent
  app.post("/api/ai-agents", async (req, res) => {
    try {
      const data = insertAiAgentSchema.parse(req.body);
      const agent = await storage.createAiAgent(data);
      res.status(201).json(agent);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid agent data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create AI agent" });
    }
  });

  // Update AI agent
  app.patch("/api/ai-agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const agent = await storage.updateAiAgent(id, data);
      if (!agent) {
        return res.status(404).json({ message: "AI agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to update AI agent" });
    }
  });

  // Get product market fit for a brand
  app.get("/api/product-market-fit/:brandId", async (req, res) => {
    try {
      const brandId = parseInt(req.params.brandId);
      const pmf = await storage.getProductMarketFit(brandId);
      if (!pmf) {
        return res.status(404).json({ message: "Product market fit data not found" });
      }
      res.json(pmf);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product market fit data" });
    }
  });

  // Create product market fit
  app.post("/api/product-market-fit", async (req, res) => {
    try {
      const data = insertProductMarketFitSchema.parse(req.body);
      const pmf = await storage.createProductMarketFit(data);
      res.status(201).json(pmf);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid PMF data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product market fit data" });
    }
  });

  // Update product market fit
  app.patch("/api/product-market-fit/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const pmf = await storage.updateProductMarketFit(id, data);
      if (!pmf) {
        return res.status(404).json({ message: "Product market fit data not found" });
      }
      res.json(pmf);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product market fit data" });
    }
  });

  // Get tasks for a brand
  app.get("/api/tasks/:brandId", async (req, res) => {
    try {
      const brandId = parseInt(req.params.brandId);
      const status = req.query.status as string | undefined;
      const tasks = await storage.getTasks(brandId, status);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  // Create task
  app.post("/api/tasks", async (req, res) => {
    try {
      const data = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(data);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  // Update task
  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const task = await storage.updateTask(id, data);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  // Get meetings for a brand
  app.get("/api/meetings/:brandId", async (req, res) => {
    try {
      const brandId = parseInt(req.params.brandId);
      const meetings = await storage.getMeetings(brandId);
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  });

  // Create meeting
  app.post("/api/meetings", async (req, res) => {
    try {
      const data = insertMeetingSchema.parse(req.body);
      const meeting = await storage.createMeeting(data);
      res.status(201).json(meeting);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid meeting data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create meeting" });
    }
  });

  // Update meeting
  app.patch("/api/meetings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const meeting = await storage.updateMeeting(id, data);
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      res.json(meeting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meeting" });
    }
  });

  return httpServer;
}
