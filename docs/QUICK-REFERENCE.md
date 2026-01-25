# Quick Reference Guide

> **One-page summary of all critical game mechanics and formulas**

---

## 🎮 Core Loop

```
1. Hire employees (devs + marketers)
2. Create product → Assign devs → Wait for 100% → Auto-publish
3. Assign marketers → Grow subscribers → Earn revenue
4. Every 30 days: Collect revenue, pay expenses
5. Promote employees, unlock R&D, expand
```

---

## 💰 Money Math

### Monthly Cash Flow
```
Revenue = Σ(product.subscribers × product.price)
Expenses = Rent + Utilities + Insurance + Salaries + Server
Net = Revenue - Expenses
```

### Expense Breakdown
```
Rent: $0-$15,000 (tier-based)
Utilities: Base + ($15-$50 × teamSize)
Insurance: (Revenue × 2%) + ($100 × employeeCount)
Salaries: Sum of all employee salaries
Server: $100-$10,000 (tier-based)
```

---

## 📈 Growth Formulas

### Development Progress (per day)
```
dailyProgress = Σ(dev.efficiency × (1 - teamPenalty))
teamPenalty = min(0.90, (teamSize - 1) × 0.06)

Example: 1 dev, 1.0 eff → 1% per day → 100 days
Example: 2 devs, 1.5 eff → 2.82% per day → 36 days
```

### Subscriber Growth (per day)
```
dailyGrowth = Σ(marketer.efficiency × (1 - teamPenalty)) × 5
randomFactor = 0.8 to 1.2 (80%-120%)
actualGrowth = min(potentialGrowth, serverCapacity)

Example: 1 mkt, 1.0 eff → 5 subs/day → 150/month
Example: 2 mkts, 1.5 eff → 14 subs/day → 420/month
```

### Churn (per day)
```
Published: 1-2% daily churn (if subs > 10)
Deprecated: 5-10% daily churn

Example: 1,000 subs published → lose ~10-20/day
Example: 1,000 subs deprecated → lose ~50-100/day
```

---

## 👥 Employee System

### Tiers & Efficiency
| Tier | Base Eff | Cap | Dev Salary | Mkt Salary | Hire Cost |
|------|----------|-----|------------|------------|-----------|
| Junior | 0.5 | 2.0 | $3k-5k | $2.5k-4k | $1k/$800 |
| Intermediate | 1.0 | 3.0 | $5k-8k | $4k-6.5k | $2k/$1.5k |
| Senior | 2.0 | 3.5 | $8k-12k | $6.5k-10k | $3.5k/$2.5k |
| Expert | 3.0 | 4.0 | $12k-18k | $10k-15k | $5k/$4k |

### Experience Growth
```
Gain: +5% efficiency per month (if assigned)
Promotion: Ready when efficiency ≥ next tier's base

Example: Junior (0.5) → 10 months → 1.0 eff → Promote to Intermediate
```

---

## 🏗️ Product Lifecycle

```
in_development (0-99%) → published (100%) → deprecated → deleted (365d)
```

### Status Effects
| Status | Progress | Subscribers | Revenue | Churn |
|--------|----------|-------------|---------|-------|
| Development | 0-99% | 0 | $0 | None |
| Published | 100% | Growing | Yes | 1-2% |
| Deprecated | 100% | Declining | Yes | 5-10% |

---

## 🔬 R&D System

### Project Categories
```
Productivity (Tier 1): Unlock basic products
Business Tools (Tier 2): Unlock advanced products
Advanced Features (Tier 3): Unlock premium products
Optimization: Reduce churn, boost growth
Management: Unlock manager system
```

### Completion
```
progress += Σ(dev.efficiency × (1 - teamPenalty)) × 1% per day
On 100%: Apply effects (unlock products, reduce churn, etc.)
```

---

## 🏢 Infrastructure

### Office Tiers
| Tier | Capacity | Rent (USD) | Utilities Base |
|------|----------|------------|----------------|
| Home | 3 | $0 | $100 + $50/person |
| Co-working | 10 | $1,500 | $200 + $30/person |
| Small | 25 | $4,000 | $400 + $25/person |
| Medium | 50 | $8,000 | $800 + $20/person |
| Large | 100 | $15,000 | $1,500 + $15/person |

### Server Tiers
| Tier | Max Subscribers | Monthly Fee (USD) |
|------|-----------------|-------------------|
| Basic | 1,000 | $100 |
| Standard | 5,000 | $500 |
| Premium | 20,000 | $2,000 |
| Enterprise | 100,000 | $10,000 |

---

## ⚠️ Critical Rules

1. **Team Penalty = Real** - Larger teams are LESS efficient per person
2. **Server Cap = Hard** - Cannot exceed maxSubscribers (growth stops)
3. **Office Cap = Hard** - Cannot hire beyond office capacity
4. **Billing = Every 30 days** - No variance, always exact
5. **Experience = Assignment Only** - Must be assigned to gain XP
6. **Promotions = Manual** - Must click "Promote" button
7. **Deprecated Products = Still Earn** - Until subscribers = 0
8. **Founder = Special** - Cannot fire, $0 salary, 1.0 starting eff

---

## 🎯 Optimal Strategies

### Early Game (Days 1-90)
```
✅ Keep team small (founder + 1-2 employees)
✅ Start with Task Manager (only unlocked)
✅ Stay in home office ($0 rent)
✅ Basic server ($100/month)
✅ Focus: Get first product published ASAP
```

### Mid Game (Days 90-365)
```
✅ Promote juniors to intermediate (10+ months)
✅ Unlock R&D projects
✅ Launch 2-3 products
✅ Upgrade office when capacity hit
✅ Upgrade server before hitting cap
✅ Balance: 2-3 devs per product, 2-3 mkts per product
```

### Late Game (365+ days)
```
✅ Portfolio of 5-10 products
✅ Promote to senior/expert
✅ Keep teams small (avoid 90% penalty)
✅ Deprecate old products regularly
✅ Focus on high-tier products ($20-50/month)
✅ Consider managers (when unlocked)
```

---

## 🧮 Quick Calculations

### Break-Even Subscribers
```
monthlyExpenses = $10,000
productPrice = $10
requiredSubs = 10,000 / 10 = 1,000 subscribers
```

### Time to Publish
```
targetDays = 100 / (Σ devs.effectiveEfficiency)

Example: 2 devs, 1.5 eff each, 6% penalty
= 100 / (1.5 × 0.94 × 2)
= 100 / 2.82
≈ 36 days
```

### ROI per Employee
```
devCost = $5,000/month salary
devValue = 2% progress/day × 30 days = 60% progress/month
product revenue = 500 subs × $10 = $5,000/month

If product completes in 2 months:
Cost = $5,000 × 2 = $10,000
Revenue (indefinite) = $5,000/month
ROI = Positive after 2 months
```

---

## 🚨 Common Mistakes

❌ **Hiring too fast** → Burn rate explosion  
✅ Hire 1-2 at a time, wait for revenue

❌ **Large teams** → 90% penalty kills efficiency  
✅ Keep teams 2-3 people max

❌ **Ignoring server capacity** → Lost growth  
✅ Upgrade proactively (before hitting cap)

❌ **Not promoting** → Wasting experience  
✅ Promote ASAP (better ROI than hiring senior)

❌ **Forgetting deprecated products** → Wasted marketers  
✅ Unassign marketers when deprecating

❌ **No cash buffer** → Game over on bad month  
✅ Keep 2-3 months expenses in reserve

---

## 📊 Sample Early Game Budget

**Day 30 (First Billing):**
```
REVENUE:
Product A: 150 subs × $10 = $1,500

EXPENSES:
Office (Home): $0
Utilities: $100 + ($50 × 3) = $250
Insurance: ($1,500 × 0.02) + ($100 × 2) = $230
Salaries: $3,500 + $3,000 = $6,500
Server (Basic): $100
Total: $7,080

NET: $1,500 - $7,080 = -$5,580
```

**Result:** Burning $5,580/month. Need more subscribers or reduce costs.

**Target:** 1,500+ subscribers to break even

---

## 🔢 Formula Quick Reference

```javascript
// Team Overhead
penalty = min(0.90, (teamSize - 1) × 0.06)
effectiveEff = baseEff × (1 - penalty)

// Development
dailyProgress = Σ(effectiveEff) × 1%

// Marketing
dailyGrowth = Σ(effectiveEff) × 5 × random(0.8-1.2)

// Experience
efficiency = min(base + (months × 0.05), cap)

// Manager
capacity = floor(efficiency / 0.25)
salary = capacity × $2,000 × random(0.85-1.15)

// Churn
publishedChurn = subs × random(0.01-0.02)
deprecatedChurn = subs × random(0.05-0.10)

// Revenue
productRevenue = subscribers × price
totalRevenue = Σ(productRevenue)

// Expenses
insurance = (revenue × 0.02) + ($100 × empCount)
utilities = base + (perPerson × teamSize)
total = rent + utilities + insurance + salaries + server
```

---

**Last Updated:** 2026-01-24  
**For Full Details:** See `/docs/` folder  
**Critical Files:**
- `formulas.md` - Complete formula reference
- `state-schema.ts` - TypeScript types
- `economy.md`, `products.md`, `employees.md` - Game mechanics
