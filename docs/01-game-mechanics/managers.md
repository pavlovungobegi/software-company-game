# Manager System

> **Manager capacity, salary calculation, and promotion mechanics**

---

## 👔 Manager Overview

Managers are unlocked via R&D and provide capacity to manage teams (future feature). Currently, managers can be hired but don't provide efficiency bonuses yet.

### **Status:** Partially Implemented
- ✅ Hiring system working
- ✅ Capacity calculation working
- ✅ Salary calculation working
- ✅ Experience gain working
- ✅ Promotion system working
- ⏳ Efficiency bonus system (planned, not yet implemented)

---

## 🎯 Manager Purpose

### Current Implementation
- **Capacity-based employees:** Each manager can manage a certain number of employees
- **Experience growth:** Managers gain experience over time
- **Promotion system:** Managers can be promoted to increase capacity

### Future Implementation (Planned)
- **Efficiency bonus:** Managed employees gain efficiency boost
- **Team optimization:** Auto-assign managers to teams
- **Management overhead:** Large teams managed by same manager get diminishing returns

---

## 📊 Manager Structure

```javascript
{
  id: Number,
  name: String,
  role: 'manager',
  efficiency: Number,          // 1.0-4.0
  baseEfficiency: 1.0,
  efficiencyCap: 4.0,
  capacity: Number,            // Calculated from efficiency
  monthlySalary: Number,       // Calculated from capacity
  experienceMonths: Number,
  managedEmployees: [],        // Array of employee IDs (future use)
  readyForPromotion: Boolean,
  promotionRejectionCount: Number,
  salaryExpectationForNextRank: Number
}
```

---

## 🧮 Manager Capacity Formula

### Calculation
```javascript
capacity = Math.floor(efficiency / 0.25)
```

**Formula Explanation:**
- Every **0.25 efficiency** = **1 employee capacity**
- Floor function rounds down (no fractional capacity)

### Capacity Table
| Efficiency | Capacity | Notes |
|------------|----------|-------|
| 1.00 | 4 | Starting capacity |
| 1.25 | 5 | After some experience |
| 1.50 | 6 | |
| 1.75 | 7 | |
| 2.00 | 8 | Double starting capacity |
| 2.25 | 9 | |
| 2.50 | 10 | |
| 2.75 | 11 | |
| 3.00 | 12 | |
| 3.25 | 13 | |
| 3.50 | 14 | |
| 3.75 | 15 | |
| 4.00 | 16 | Maximum capacity (efficiency cap) |

---

## 💰 Manager Salary Formula

### Initial Hiring Salary
```javascript
baseSalary = capacity * 2000
variance = 0.85 + (Math.random() * 0.30)  // 85%-115%
monthlySalary = Math.round(baseSalary * variance)
```

### Salary Examples
| Capacity | Base Salary | Min Salary | Max Salary | Average |
|----------|-------------|------------|------------|---------|
| 4 | $8,000 | $6,800 | $9,200 | $8,000 |
| 5 | $10,000 | $8,500 | $11,500 | $10,000 |
| 6 | $12,000 | $10,200 | $13,800 | $12,000 |
| 8 | $16,000 | $13,600 | $18,400 | $16,000 |
| 10 | $20,000 | $17,000 | $23,000 | $20,000 |
| 12 | $24,000 | $20,400 | $27,600 | $24,000 |
| 16 | $32,000 | $27,200 | $36,800 | $32,000 |

**Key Insight:** Salary scales linearly with capacity ($2,000 per employee managed).

---

## 📈 Manager Experience & Efficiency

### Experience Gain
```javascript
// Every 30 days (monthly billing)
if (manager exists in game) {
  manager.experienceMonths += 1
}
```

**Note:** Managers gain experience simply by existing (unlike developers/marketers who need assignment).

### Efficiency Growth
```javascript
// Same as employees: +5% per month
baseEfficiency = 1.0
experienceBonus = manager.experienceMonths * 0.05
currentEfficiency = Math.min(baseEfficiency + experienceBonus, 4.0)
manager.efficiency = currentEfficiency
```

### Efficiency Growth Timeline
| Month | Experience | Efficiency | Capacity | Salary Range |
|-------|------------|------------|----------|--------------|
| 0 | 0 | 1.00 | 4 | $6,800-$9,200 |
| 3 | 3 | 1.15 | 4 | $6,800-$9,200 |
| 5 | 5 | 1.25 | 5 | $8,500-$11,500 |
| 10 | 10 | 1.50 | 6 | $10,200-$13,800 |
| 15 | 15 | 1.75 | 7 | $11,900-$16,100 |
| 20 | 20 | 2.00 | 8 | $13,600-$18,400 |
| 30 | 30 | 2.50 | 10 | $17,000-$23,000 |
| 40 | 40 | 3.00 | 12 | $20,400-$27,600 |
| 50 | 50 | 3.50 | 14 | $23,800-$32,200 |
| 60 | 60 | 4.00 | 16 | $27,200-$36,800 |

---

## 🎖️ Manager Promotion System

### Promotion Trigger
```javascript
// Manager is ready for promotion when:
if (manager.efficiency >= 1.25 && capacity < 16) {
  // Capacity increases by 1
  // New salary negotiation required
  manager.readyForPromotion = true
}
```

### Promotion Frequency
- **Every 0.25 efficiency increase** → New promotion available
- Starting at 1.0 efficiency (4 capacity)
- Each promotion adds 1 capacity
- Maximum capacity: 16 (at 4.0 efficiency)

### Promotion Thresholds
| Current Efficiency | New Capacity | Frequency |
|-------------------|--------------|-----------|
| 1.25 | 5 | 5 months |
| 1.50 | 6 | 5 months |
| 1.75 | 7 | 5 months |
| 2.00 | 8 | 5 months |
| ... | ... | ... |
| 3.75 | 15 | 5 months |
| 4.00 | 16 | 5 months |

**Total Promotions Possible:** 12 promotions (from capacity 4 → 16)

---

## 💼 Manager Promotion Negotiation

### Salary Expectation Generation
```javascript
// When readyForPromotion = true
newCapacity = oldCapacity + 1
baseSalary = newCapacity * 2000

// Generate expectation with ±20% variation (normal distribution)
u1 = Math.random()
u2 = Math.random()
z0 = sqrt(-2.0 * log(u1)) * cos(2.0 * PI * u2)  // Box-Muller transform
multiplier = 1.0 + (z0 * 0.1)  // stddev = 0.1
clampedMultiplier = clamp(multiplier, 0.8, 1.2)  // ±20% range

salaryExpectation = round(baseSalary * clampedMultiplier)
```

**Example:**
- New capacity: 5
- Base salary: $10,000
- Expectation range: $8,000-$12,000 (±20%)
- Actual expectation: ~$9,500 (example)

---

## 🤝 Manager Promotion Acceptance

### Acceptance Probability Formula
```javascript
function calculatePromotionAcceptanceProbability(offer, expectation) {
  if (offer >= expectation) {
    return 1.0  // 100% acceptance
  }
  
  // Calculate percentage difference (negative)
  percentDiff = ((offer - expectation) / expectation) * 100
  
  // Exponential decay curve
  k = 0.08
  probability = exp(k * percentDiff)
  
  return max(0.01, min(1.0, probability))  // 1%-100%
}
```

### Acceptance Probability Table
| Offer vs Expectation | Probability | Notes |
|----------------------|-------------|-------|
| 100% or more | 100% | Guaranteed acceptance |
| 95% | ~90% | Very likely |
| 90% | ~80% | Likely |
| 85% | ~60% | Risky |
| 80% | ~40% | Very risky |
| 75% | ~20% | Unlikely |
| 70% | ~10% | Very unlikely |
| 65% | ~5% | Almost certain rejection |
| 60% or less | ~1% | Virtually certain rejection |

### Rejection System
```javascript
// After offering salary
acceptanceProbability = calculatePromotionAcceptanceProbability(offer, expectation)
accepted = Math.random() < acceptanceProbability

if (accepted) {
  // Promote manager
  manager.capacity += 1
  manager.monthlySalary = offer
  manager.readyForPromotion = false
  manager.promotionRejectionCount = 0
} else {
  // Rejection
  manager.promotionRejectionCount += 1
  
  if (manager.promotionRejectionCount >= 3) {
    // Manager quits after 3 rejections
    fireManager(manager.id)
    logEvent(`💼 ${manager.name} quit after 3 promotion rejections!`)
  } else {
    logEvent(`❌ ${manager.name} rejected promotion offer.`)
  }
}
```

**Critical Rule:** **3 rejections = Manager quits permanently**

---

## 🔥 Firing Managers

### Fire Process
```javascript
function fireManager(managerId) {
  manager = managers.find(m => m.id === managerId)
  
  // Unassign all managed employees (future feature)
  manager.managedEmployees.forEach(empId => {
    employee = getEmployeeById(empId)
    employee.managerId = null
    employee.isManaged = false
  })
  
  // Remove manager
  managers = managers.filter(m => m.id !== managerId)
  
  logEvent(`🔥 Fired manager ${manager.name}`)
}
```

**When to Fire:**
- Manager salary too high for capacity
- Multiple promotion rejections (automated after 3)
- Downsizing during cash crunch
- Reorganizing team structure

---

## 💡 Manager Strategy

### Early Game (Before Day 365)
- **Don't hire managers yet** - too expensive for small teams
- Focus on building revenue first
- Unlock via R&D when ready

### Mid Game (Days 365-1000)
- **Hire first manager** when teams reach 5-6 people
- Keep only 1 manager initially
- Focus on growing their efficiency

### Late Game (1000+ days)
- **Multiple managers** for large teams
- Promote managers regularly (every ~5 months)
- Optimize manager-to-employee ratio
- Consider firing low-capacity managers

---

## 🎯 Manager ROI Analysis

### Cost-Benefit (Current Implementation)
**Note:** Managers currently don't provide efficiency bonuses, so ROI is theoretical.

### Future ROI (When Efficiency Bonus Implemented)
```
Manager Cost: $8,000-$32,000/month (capacity 4-16)
Managed Employees: 4-16 employees
Efficiency Bonus: TBD (planned feature)

Example:
- 8 capacity manager: $16,000/month
- Manages 8 employees averaging $6,000/month each
- Manager cost as % of team cost: 16,000 / 48,000 = 33%
- Break-even efficiency bonus needed: 33% boost
```

**Current Recommendation:** Wait for efficiency bonus implementation before heavily investing in managers.

---

## 📋 Manager Checklist

### Hiring
- [ ] R&D "Management System" completed
- [ ] Cash available for hiring cost
- [ ] Cash flow supports $8,000+/month salary
- [ ] Team size ≥ 5 employees (to justify cost)

### Managing
- [ ] Track experience months (every 30 days)
- [ ] Monitor capacity increases (every 5 months)
- [ ] Prepare for promotion negotiations
- [ ] Keep salary competitive (avoid rejections)

### Promoting
- [ ] Check readyForPromotion flag
- [ ] Calculate expected salary (capacity × $2,000)
- [ ] Offer 90-100% of expectation (safe range)
- [ ] Track rejection count (max 3)

### Firing
- [ ] Assess ROI (salary vs value provided)
- [ ] Check for better candidates
- [ ] Consider promotion first
- [ ] Remove during cash crunches

---

## 🔮 Future Features (Not Yet Implemented)

### Efficiency Bonus System (Planned)
```javascript
// Planned implementation
managedEmployee.efficiency *= (1 + managerBonus)

// Proposed formula
managerBonus = manager.efficiency * 0.10  // 10% per 1.0 efficiency
// Example: 2.0 efficiency manager = 20% bonus to managed employees
```

### Team Optimization (Planned)
```javascript
// Auto-assign managers to maximize efficiency
function optimizeManagerAssignments() {
  // Algorithm to distribute employees across managers
  // Minimize team overhead + maximize manager bonuses
}
```

### Management Overhead (Planned)
```javascript
// Diminishing returns for large teams under one manager
managementOverhead = (managedCount - 1) * 0.03  // 3% per employee
effectiveBonus = managerBonus * (1 - managementOverhead)
```

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation
- Status: System partially implemented, efficiency bonus pending
