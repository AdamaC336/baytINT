import { pgTable, text, serial, integer, boolean, timestamp, json, real, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const brandEnum = pgEnum('brand', ['HydraBark', 'FitFluence', 'EcoVibe']);
export const adPlatformEnum = pgEnum('ad_platform', ['Meta', 'TikTok', 'Google', 'Pinterest']);
export const adStatusEnum = pgEnum('ad_status', ['Active', 'Warning', 'Paused', 'Stopped']);
export const taskPriorityEnum = pgEnum('task_priority', ['Low', 'Medium', 'High']);
export const taskStatusEnum = pgEnum('task_status', ['Todo', 'InProgress', 'Review', 'Completed']);
export const agentTypeEnum = pgEnum('agent_type', ['CX', 'CMO', 'CartRecovery']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatar: text("avatar"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Brands table
export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: brandEnum("code").notNull(),
  logo: text("logo"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brandsRelations = relations(brands, ({ many }) => ({
  financials: many(financials),
  adCampaigns: many(adCampaigns),
  aiAgents: many(aiAgents),
  productMarketFit: many(productMarketFit),
  tasks: many(tasks),
  meetings: many(meetings),
}));

// Financial data table
export const financials = pgTable("financials", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  date: timestamp("date").defaultNow(),
  revenue: real("revenue").notNull().default(0),
  adSpend: real("ad_spend").notNull().default(0),
  cogs: real("cogs").notNull().default(0),
  otherExpenses: real("other_expenses").notNull().default(0),
  profit: real("profit").notNull().default(0),
  roas: real("roas").notNull().default(0),
});

export const financialsRelations = relations(financials, ({ one }) => ({
  brand: one(brands, {
    fields: [financials.brandId],
    references: [brands.id],
  }),
}));

// Ad Campaigns table
export const adCampaigns = pgTable("ad_campaigns", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  name: text("name").notNull(),
  platform: adPlatformEnum("platform").notNull(),
  spend: real("spend").notNull().default(0),
  ctr: real("ctr").notNull().default(0),
  roas: real("roas").notNull().default(0),
  status: adStatusEnum("status").notNull().default('Active'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const adCampaignsRelations = relations(adCampaigns, ({ one }) => ({
  brand: one(brands, {
    fields: [adCampaigns.brandId],
    references: [brands.id],
  }),
}));

// AI Agents table
export const aiAgents = pgTable("ai_agents", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  name: text("name").notNull(),
  type: agentTypeEnum("type").notNull(),
  successRate: real("success_rate").notNull().default(0),
  usageCount: integer("usage_count").notNull().default(0),
  cost: real("cost").notNull().default(0),
  metrics: json("metrics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const aiAgentsRelations = relations(aiAgents, ({ one }) => ({
  brand: one(brands, {
    fields: [aiAgents.brandId],
    references: [brands.id],
  }),
}));

// Product Market Fit table
export const productMarketFit = pgTable("product_market_fit", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  date: timestamp("date").defaultNow(),
  pmfScore: real("pmf_score").notNull().default(0),
  returnRate: real("return_rate").notNull().default(0),
  reviewSentiment: real("review_sentiment").notNull().default(0),
  repeatPurchaseRate: real("repeat_purchase_rate").notNull().default(0),
  npsScore: real("nps_score").notNull().default(0),
  objections: json("objections"),
});

export const productMarketFitRelations = relations(productMarketFit, ({ one }) => ({
  brand: one(brands, {
    fields: [productMarketFit.brandId],
    references: [brands.id],
  }),
}));

// Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  title: text("title").notNull(),
  description: text("description"),
  assignedTo: text("assigned_to"),
  priority: taskPriorityEnum("priority").default('Medium'),
  status: taskStatusEnum("status").default('Todo'),
  dueDate: timestamp("due_date"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completed: boolean("completed").default(false),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  brand: one(brands, {
    fields: [tasks.brandId],
    references: [brands.id],
  }),
}));

// Meetings table
export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  title: text("title").notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  attendees: text("attendees").array(),
  aiReportReady: boolean("ai_report_ready").default(false),
  meetingLink: text("meeting_link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const meetingsRelations = relations(meetings, ({ one }) => ({
  brand: one(brands, {
    fields: [meetings.brandId],
    references: [brands.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatar: true,
  role: true,
});

export const insertBrandSchema = createInsertSchema(brands).pick({
  name: true,
  code: true,
  logo: true,
});

export const insertFinancialSchema = createInsertSchema(financials).pick({
  brandId: true,
  date: true,
  revenue: true,
  adSpend: true,
  cogs: true,
  otherExpenses: true,
  profit: true,
  roas: true,
});

export const insertAdCampaignSchema = createInsertSchema(adCampaigns).pick({
  brandId: true,
  name: true,
  platform: true,
  spend: true,
  ctr: true,
  roas: true,
  status: true,
});

export const insertAiAgentSchema = createInsertSchema(aiAgents).pick({
  brandId: true,
  name: true,
  type: true,
  successRate: true,
  usageCount: true,
  cost: true,
  metrics: true,
});

export const insertProductMarketFitSchema = createInsertSchema(productMarketFit).pick({
  brandId: true,
  date: true,
  pmfScore: true,
  returnRate: true,
  reviewSentiment: true,
  repeatPurchaseRate: true,
  npsScore: true,
  objections: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  brandId: true,
  title: true,
  description: true,
  assignedTo: true,
  priority: true,
  status: true,
  dueDate: true,
  category: true,
  completed: true,
});

export const insertMeetingSchema = createInsertSchema(meetings).pick({
  brandId: true,
  title: true,
  description: true,
  startTime: true,
  endTime: true,
  attendees: true,
  aiReportReady: true,
  meetingLink: true,
});

// Typed exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Brand = typeof brands.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;

export type Financial = typeof financials.$inferSelect;
export type InsertFinancial = z.infer<typeof insertFinancialSchema>;

export type AdCampaign = typeof adCampaigns.$inferSelect;
export type InsertAdCampaign = z.infer<typeof insertAdCampaignSchema>;

export type AiAgent = typeof aiAgents.$inferSelect;
export type InsertAiAgent = z.infer<typeof insertAiAgentSchema>;

export type ProductMarketFit = typeof productMarketFit.$inferSelect;
export type InsertProductMarketFit = z.infer<typeof insertProductMarketFitSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Meeting = typeof meetings.$inferSelect;
export type InsertMeeting = z.infer<typeof insertMeetingSchema>;
