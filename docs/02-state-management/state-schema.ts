/**
 * SOFTWARE COMPANY SIMULATOR - STATE SCHEMA
 * Complete TypeScript interfaces for all game state
 * 
 * USE THIS AS THE SINGLE SOURCE OF TRUTH when building the React/Next.js version
 * 
 * Version: 1.0
 * Generated: 2026-01-24
 */

// ============================================
// CORE GAME STATE
// ============================================

export interface GameState {
  // Core game data
  currency: 'USD' | 'EUR';
  currentDay: number;
  cash: number;
  lifetimeEarnings: number;
  companyName: string;
  isPlaying: boolean;
  gameSpeed: 1 | 2 | 4;
  
  // Entities
  founder: Founder;
  products: Product[];
  developers: Developer[];
  marketers: Marketer[];
  managers: Manager[];
  
  // R&D System
  rndProjects: RndProject[];
  completedRndProjects: string[];  // Array of project IDs
  unlockedProducts: string[];      // Array of product template names
  nextRndProjectId: number;
  
  // Infrastructure
  currentOfficeTier: OfficeTierKey;
  currentServerTier: ServerTierKey;
  
  // Event Log
  eventLog: LogEntry[];
  
  // Manager System
  lastManagerOptimization: number;  // Day of last optimization
  
  // UI State (not saved)
  activeMobilePanel?: string;
  openModals?: string[];
}

// ============================================
// EMPLOYEE TYPES
// ============================================

export interface BaseEmployee {
  id: string | number;
  name: string;
  role: 'developer' | 'marketer' | 'manager';
  skill: EmployeeTier;
  tierName: string;
  baseEfficiency: number;
  efficiency: number;
  efficiencyCap: number;
  monthlySalary: number;
  experienceMonths: number;
  assignedProduct: number | null;
  readyForPromotion: boolean;
  isFounder: boolean;
  
  // Manager system
  managerId: number | null;
  isManaged: boolean;
}

export interface Founder extends BaseEmployee {
  id: 'founder';
  role: 'developer';
  isFounder: true;
  monthlySalary: 0;
}

export interface Developer extends BaseEmployee {
  role: 'developer';
  isFounder: false;
}

export interface Marketer extends BaseEmployee {
  role: 'marketer';
  isFounder: false;
}

export interface Manager {
  id: number;
  name: string;
  role: 'manager';
  efficiency: number;
  baseEfficiency: number;
  efficiencyCap: number;
  capacity: number;  // Calculated: Math.floor(efficiency / 0.25)
  monthlySalary: number;
  experienceMonths: number;
  managedEmployees: Array<string | number>;  // Array of employee IDs
}

export type EmployeeTier = 'junior' | 'intermediate' | 'senior' | 'expert';

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: number;
  name: string;
  status: ProductStatus;
  progress: number;  // 0-100
  subscribers: number;
  monthlyPrice: number;
  assignedDevelopers: Array<string | number>;
  assignedMarketers: Array<string | number>;
  publishDate: number | null;
  deprecationDate: number | null;
  lastCapacityWarning: number | null;
  
  // Template metadata
  category: string;
  tier: ProductTier;
  difficulty: ProductDifficulty;
  
  // R&D unlock tracking
  unlockedBy?: string;  // R&D project ID
}

export type ProductStatus = 'in_development' | 'published' | 'deprecated';
export type ProductTier = 'tier1' | 'tier2' | 'tier3';
export type ProductDifficulty = 'easy' | 'medium' | 'hard';

export interface ProductTemplate {
  category: string;
  tier: ProductTier;
  difficulty: ProductDifficulty;
  monthlyPriceUSD: number;
  monthlyPriceEUR: number;
}

// ============================================
// R&D TYPES
// ============================================

export interface RndProject {
  id: number;
  name: string;
  description: string;
  status: RndStatus;
  progress: number;  // 0-100
  assignedDevelopers: Array<string | number>;
  completionDate: number | null;
  category: string;
  tier: number;
  
  // Effects (executed on completion)
  effects: RndEffect[];
  
  // Dependencies
  requires?: string[];  // Array of required completed R&D project IDs
}

export type RndStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface RndEffect {
  type: 'unlock_product' | 'unlock_feature' | 'reduce_churn' | 'boost_growth';
  value: string | number;
  description: string;
}

// ============================================
// INFRASTRUCTURE TYPES
// ============================================

export type OfficeTierKey = 'home' | 'coworking' | 'small' | 'medium' | 'large';

export interface OfficeTier {
  name: string;
  maxCapacity: number;
  monthlyRentUSD: number;
  monthlyRentEUR: number;
  utilitiesBaseUSD: number;
  utilitiesBaseEUR: number;
  utilitiesPerPersonUSD: number;
  utilitiesPerPersonEUR: number;
}

export type ServerTierKey = 'basic' | 'standard' | 'premium' | 'enterprise';

export interface ServerTier {
  name: string;
  maxSubscribers: number;
  monthlyFeeUSD: number;
  monthlyFeeEUR: number;
}

// ============================================
// CONFIGURATION TYPES
// ============================================

export interface TierConfig {
  name: string;
  baseEfficiency: number;
  efficiencyCap: number;
  minSalaryUSD: number;
  maxSalaryUSD: number;
  minSalaryEUR: number;
  maxSalaryEUR: number;
  hiringCostUSD: number;
  hiringCostEUR: number;
}

export interface MilestoneConfig {
  threshold: number;
  unlocks: string[];  // Array of product template names
  message: string;
}

// ============================================
// UI TYPES
// ============================================

export interface LogEntry {
  day: number;
  message: string;
  timestamp: number;
}

export interface NotificationConfig {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  duration?: number;  // milliseconds
}

export interface FilterState {
  products: ProductStatus | 'all';
  employees: EmployeeFilter | 'all';
  rnd: RndStatus | 'all';
}

export type EmployeeFilter = 'developer' | 'marketer' | 'unassigned' | 'promotion';

// ============================================
// CALCULATION HELPERS
// ============================================

/**
 * Calculate team overhead penalty
 * Formula: (teamSize - 1) × 6%, capped at 90%
 */
export function getTeamOverheadPenalty(teamSize: number): number {
  if (teamSize <= 1) return 0;
  return Math.min(0.90, (teamSize - 1) * 0.06);
}

/**
 * Calculate effective efficiency after team penalty
 */
export function getEffectiveEfficiency(baseEfficiency: number, teamSize: number): number {
  const penalty = getTeamOverheadPenalty(teamSize);
  return baseEfficiency * (1 - penalty);
}

/**
 * Calculate daily development progress
 * Base: 1% per developer per day
 */
export function calculateDailyProgress(
  developers: Array<Developer | Founder>,
  teamSize: number
): number {
  let dailyProgress = 0;
  
  developers.forEach(dev => {
    const effectiveEfficiency = getEffectiveEfficiency(dev.efficiency, teamSize);
    dailyProgress += 1.0 * effectiveEfficiency;  // BASE_PROGRESS = 1.0
  });
  
  return dailyProgress;
}

/**
 * Calculate daily subscriber growth
 * Base: 5 subscribers per marketer per day
 */
export function calculateDailyGrowth(
  marketers: Marketer[],
  teamSize: number
): number {
  let dailyGrowth = 0;
  
  marketers.forEach(mkt => {
    const effectiveEfficiency = getEffectiveEfficiency(mkt.efficiency, teamSize);
    dailyGrowth += 5 * effectiveEfficiency;  // BASE_GROWTH = 5
  });
  
  // Apply randomness (80%-120%)
  const randomFactor = 0.8 + (Math.random() * 0.4);
  return Math.max(1, Math.round(dailyGrowth * randomFactor));
}

/**
 * Calculate monthly revenue for a product
 */
export function calculateProductRevenue(product: Product): number {
  if (product.status === 'in_development') return 0;
  return product.subscribers * product.monthlyPrice;
}

/**
 * Calculate manager capacity
 * Formula: Math.floor(efficiency / 0.25)
 */
export function calculateManagerCapacity(efficiency: number): number {
  return Math.floor(efficiency / 0.25);
}

/**
 * Calculate manager salary
 * Formula: capacity × $2,000 ± 15%
 */
export function calculateManagerSalary(capacity: number): number {
  const baseSalary = capacity * 2000;
  const variance = 0.85 + (Math.random() * 0.3);
  return Math.round(baseSalary * variance);
}

/**
 * Check if employee can be promoted
 */
export function canPromote(employee: Developer | Marketer): boolean {
  const tierOrder: EmployeeTier[] = ['junior', 'intermediate', 'senior', 'expert'];
  const currentIndex = tierOrder.indexOf(employee.skill);
  
  if (currentIndex === -1 || currentIndex === tierOrder.length - 1) {
    return false;  // Already at max tier or invalid tier
  }
  
  const nextTier = tierOrder[currentIndex + 1];
  // Note: You need to pass in TIER_CONFIG to get minEfficiency
  // This is a simplified check
  const minEfficiencyMap: Record<EmployeeTier, number> = {
    'junior': 0.5,
    'intermediate': 1.0,
    'senior': 2.0,
    'expert': 3.0
  };
  
  const minEfficiency = minEfficiencyMap[nextTier];
  return employee.efficiency >= minEfficiency;
}

// ============================================
// SAVE/LOAD TYPES
// ============================================

export interface SaveData {
  version: string;
  timestamp: number;
  gameState: GameState;
}

export interface MigrationFunction {
  fromVersion: string;
  toVersion: string;
  migrate: (oldData: any) => SaveData;
}

// ============================================
// CONSTANTS (for reference)
// ============================================

export const CONSTANTS = {
  // Development
  BASE_PROGRESS_PER_DEVELOPER: 1.0,  // % per day
  
  // Marketing
  BASE_GROWTH_PER_MARKETER: 5,  // subscribers per day
  
  // Team Overhead
  TEAM_OVERHEAD_RATE: 0.06,  // 6% per additional team member
  MAX_TEAM_OVERHEAD: 0.90,   // 90% cap
  
  // Experience
  EXPERIENCE_GAIN_RATE: 0.05,  // 5% per month
  
  // Churn
  PUBLISHED_CHURN_MIN: 0.01,   // 1% daily
  PUBLISHED_CHURN_MAX: 0.02,   // 2% daily
  DEPRECATED_CHURN_MIN: 0.05,  // 5% daily
  DEPRECATED_CHURN_MAX: 0.10,  // 10% daily
  
  // Billing
  BILLING_CYCLE_DAYS: 30,
  
  // Cleanup
  DEPRECATED_CLEANUP_DAYS: 365,
  
  // Randomness
  RANDOM_FACTOR_MIN: 0.8,  // 80%
  RANDOM_FACTOR_MAX: 1.2,  // 120%
  
  // Manager
  MANAGER_CAPACITY_DIVISOR: 0.25,
  MANAGER_SALARY_PER_CAPACITY: 2000,
  MANAGER_SALARY_VARIANCE: 0.15,  // ±15%
  
  // Insurance
  INSURANCE_REVENUE_RATE: 0.02,  // 2% of revenue
  INSURANCE_BASE_USD: 100,
  INSURANCE_BASE_EUR: 90
} as const;

// ============================================
// EXAMPLE USAGE IN REACT
// ============================================

/*
// In your React component:

import { GameState, Product, Developer } from './state-schema';
import { getEffectiveEfficiency, calculateDailyProgress } from './state-schema';

const [gameState, setGameState] = useState<GameState>({
  currency: 'USD',
  currentDay: 0,
  cash: 25000,
  // ... rest of initial state
});

// Update product progress
const updateProductProgress = (productId: number) => {
  setGameState(prev => {
    const product = prev.products.find(p => p.id === productId);
    if (!product) return prev;
    
    const assignedDevs = prev.developers.filter(d => 
      product.assignedDevelopers.includes(d.id)
    );
    
    const dailyProgress = calculateDailyProgress(
      assignedDevs,
      assignedDevs.length
    );
    
    const updatedProducts = prev.products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          progress: Math.min(100, p.progress + dailyProgress)
        };
      }
      return p;
    });
    
    return { ...prev, products: updatedProducts };
  });
};
*/
