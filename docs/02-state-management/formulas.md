# Game Formulas Reference

> **CRITICAL DOCUMENT** - Every calculation in the game. Use this as the single source of truth during migration.

---

## 📊 Subscriber Growth (Published Products)

### Base Growth Formula
```javascript
// Base growth per marketer per day
BASE_GROWTH_PER_MARKETER = 5 subscribers/day

// Daily growth calculation
dailyGrowth = 0
for each marketer in product.assignedMarketers:
  effectiveEfficiency = marketer.efficiency * (1 - teamOverheadPenalty)
  dailyGrowth += BASE_GROWTH_PER_MARKETER * effectiveEfficiency

// Apply randomness
randomFactor = 0.8 + (Math.random() * 0.4)  // Range: 80%-120%
potentialGrowth = Math.max(1, Math.round(dailyGrowth * randomFactor))

// Check server capacity
actualGrowth = Math.min(potentialGrowth, server.maxSubscribers - currentTotalSubscribers)
product.subscribers += actualGrowth
```

**Example:**
- 1 marketer with 1.0 efficiency → 5 subscribers/day
- 1 marketer with 2.0 efficiency → 10 subscribers/day
- 2 marketers with 1.5 efficiency each (no team penalty) → 15 subscribers/day

---

## 📉 Subscriber Churn

### Published Products Churn
```javascript
// Only applies if subscribers > 10
if (product.subscribers > 10) {
  baseChurnRate = 0.01 + (Math.random() * 0.01)  // 1-2% daily
  adjustedChurnRate = baseChurnRate * churnReductionMultiplier  // R&D reduction
  subscribersLost = Math.ceil(product.subscribers * adjustedChurnRate)
  product.subscribers = Math.max(0, product.subscribers - subscribersLost)
}
```

### Deprecated Products Churn
```javascript
// Much higher churn rate
churnRate = 0.05 + (Math.random() * 0.05)  // 5-10% daily
subscribersLost = Math.max(1, Math.ceil(product.subscribers * churnRate))
product.subscribers = Math.max(0, product.subscribers - subscribersLost)
```

**Key Insight:** Deprecated products lose subscribers 5-10x faster than published products.

---

## 👨‍💻 Team Overhead Penalty

### Communication Overhead Formula
```javascript
// The larger the team, the less efficient each member becomes
function getTeamOverheadPenalty(teamSize) {
  if (teamSize <= 1) return 0
  return Math.min(0.90, (teamSize - 1) * 0.06)
}

// Effective efficiency after penalty
function getEffectiveEfficiency(baseEfficiency, teamSize) {
  penalty = getTeamOverheadPenalty(teamSize)
  return baseEfficiency * (1 - penalty)
}
```

**Penalty Table:**
| Team Size | Penalty | Effective Efficiency (1.0 base) |
|-----------|---------|----------------------------------|
| 1 | 0% | 1.00 |
| 2 | 6% | 0.94 |
| 3 | 12% | 0.88 |
| 5 | 24% | 0.76 |
| 10 | 54% | 0.46 |
| 15 | 84% | 0.16 |
| 16+ | 90% (cap) | 0.10 |

**Critical:** This penalty applies to BOTH development progress and marketing growth.

---

## 🛠️ Product Development Progress

### Daily Progress Calculation
```javascript
// Base progress per developer per day
BASE_PROGRESS_PER_DEVELOPER = 1%

// Daily progress calculation
dailyProgress = 0
for each developer in product.assignedDevelopers:
  effectiveEfficiency = developer.efficiency * (1 - teamOverheadPenalty)
  dailyProgress += BASE_PROGRESS_PER_DEVELOPER * effectiveEfficiency

// Apply to product
product.progress = Math.min(100, product.progress + dailyProgress)

// Check completion
if (product.progress >= 100) {
  product.status = 'published'
  product.publishDate = currentDay
}
```

**Example:**
- 1 developer with 1.0 efficiency → 1% progress/day → 100 days to complete
- 1 developer with 2.0 efficiency → 2% progress/day → 50 days to complete
- 2 developers with 1.5 efficiency each (6% penalty) → 2.82% progress/day → 36 days

---

## 💰 Monthly Billing Cycle

### Revenue Calculation
```javascript
// Runs every 30 days
function monthlyBilling() {
  totalRevenue = 0
  
  for each product in products:
    if (product.status === 'published' || product.status === 'deprecated') {
      productRevenue = product.subscribers * product.monthlyPrice
      totalRevenue += productRevenue
    }
  
  cash += totalRevenue
  lifetimeEarnings += totalRevenue
}
```

### Expense Calculation
```javascript
// Office costs
rent = office.monthlyRent[currency]
utilitiesBase = office.utilitiesBase[currency]
utilitiesPerPerson = office.utilitiesPerPerson[currency]
utilities = utilitiesBase + (utilitiesPerPerson * teamSize)

// Insurance (2% of gross revenue + base per employee)
insuranceBase = currency === "USD" ? 100 : 90
insurance = (totalRevenue * 0.02) + (insuranceBase * (developers.length + marketers.length + managers.length))

// Salaries (all employees + managers)
salaries = sum(employees.monthlySalary) + sum(managers.monthlySalary)

// Server hosting
serverFee = server.monthlyFee[currency]

// Total deduction
totalCosts = rent + utilities + insurance + salaries + serverFee
cash -= totalCosts
```

**Cash Flow Summary:**
```
Cash Flow = Revenue - (Rent + Utilities + Insurance + Salaries + Server)
```

---

## 👔 Employee Efficiency & Experience

### Experience Growth
```javascript
// Monthly experience gain (runs every 30 days)
if (employee.assignedProduct !== null) {
  employee.experienceMonths += 1
}
```

### Efficiency Calculation
```javascript
// Base efficiency from tier
baseEfficiency = TIER_CONFIG[tier].baseEfficiency

// Experience bonus (capped at efficiencyCap)
experienceBonus = employee.experienceMonths * 0.05  // +5% per month
currentEfficiency = Math.min(
  baseEfficiency + experienceBonus,
  employee.efficiencyCap
)

employee.efficiency = currentEfficiency
```

**Example (Junior Developer):**
- Month 0: 0.5 base + 0.0 bonus = 0.5 (50%)
- Month 6: 0.5 base + 0.3 bonus = 0.8 (80%)
- Month 12: 0.5 base + 0.6 bonus = 1.1 (110%)
- Month 30: 0.5 base + 1.5 bonus = 2.0 (200%, capped)

---

## 🎖️ Promotion Readiness

### Promotion Check
```javascript
// Check if employee can be promoted
function canPromote(employee) {
  currentTier = employee.skill
  nextTier = getNextTier(currentTier)
  
  if (!nextTier) return false  // Already at max tier
  
  nextTierConfig = TIER_CONFIG[nextTier]
  minEfficiency = nextTierConfig.baseEfficiency
  
  return employee.efficiency >= minEfficiency
}
```

**Promotion Thresholds:**
| Current Tier | Next Tier | Min Efficiency Required |
|--------------|-----------|-------------------------|
| Junior | Intermediate | 1.0 (100%) |
| Intermediate | Senior | 2.0 (200%) |
| Senior | Expert | 3.0 (300%) |

---

## 👨‍💼 Manager System

### Manager Capacity
```javascript
// Capacity = 1 employee per 25% efficiency (rounded down)
capacity = Math.floor(manager.efficiency / 0.25)
```

**Example:**
- 1.0 efficiency → 4 employees capacity
- 1.5 efficiency → 6 employees capacity
- 2.0 efficiency → 8 employees capacity
- 2.5 efficiency → 10 employees capacity

### Manager Salary
```javascript
// Salary based on capacity with ±15% variance
variance = 0.85 + (Math.random() * 0.3)  // 85%-115%
monthlySalary = Math.round(capacity * 2000 * variance)
```

**Example:**
- Capacity 4 → Base $8,000 → Actual $6,800-$9,200
- Capacity 8 → Base $16,000 → Actual $13,600-$18,400

---

## 🔬 R&D System

### Project Progress
```javascript
// Same as product development
BASE_PROGRESS_PER_DEVELOPER = 1%

dailyProgress = 0
for each developer in project.assignedDevelopers:
  effectiveEfficiency = developer.efficiency * (1 - teamOverheadPenalty)
  dailyProgress += BASE_PROGRESS_PER_DEVELOPER * effectiveEfficiency

project.progress = Math.min(100, project.progress + dailyProgress)
```

### Unlock Effects
See `/docs/01-game-mechanics/rnd.md` for specific multipliers and thresholds.

---

## 🎯 Key Formula Insights

### ⚠️ Critical Rules
1. **Team Penalty applies to EVERYTHING** - development progress, marketing growth, R&D progress
2. **Efficiency caps exist** - Junior: 2.0, Intermediate: 3.0, Senior: 3.5, Expert: 4.0
3. **Randomness is bounded** - Most random factors are 80%-120% (±20%)
4. **Monthly cycles are EXACTLY 30 days** - No variance
5. **Server capacity is HARD CAP** - Cannot exceed `maxSubscribers`

### 🧮 Optimization Strategies
- **Small teams (2-3) are most efficient** due to low overhead penalty
- **Experience compounds quickly** - 5% per month adds up
- **Deprecated products drain slowly** - Can provide revenue for months
- **Manager ROI** - Compare salary cost vs efficiency gained

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial extraction from `index.html`
