# Employee System

> Hiring, tiers, efficiency, experience, and promotions

---

## 👥 Employee Types

### 1. Founder
- **Role:** Unique, cannot be fired
- **Starting Efficiency:** 1.0 (100%)
- **Skill Level:** Intermediate
- **Salary:** $0 (no salary)
- **Can Do:** Development work (assigned to products/R&D)
- **Experience Cap:** 4.0 (400%) - same as expert employees
- **Promotion:** Cannot be promoted (stays intermediate)

### 2. Developers
- **Role:** Build products, work on R&D projects
- **Efficiency:** Determines development progress speed
- **Tiers:** Junior → Intermediate → Senior → Expert
- **Salary Range:** $3,000-$18,000/month (USD)
- **Experience Gain:** +5% efficiency per month (when assigned)

### 3. Marketers
- **Role:** Grow subscribers for published products
- **Efficiency:** Determines subscriber growth speed
- **Tiers:** Junior → Intermediate → Senior → Expert
- **Salary Range:** $2,500-$15,000/month (USD)
- **Experience Gain:** +5% efficiency per month (when assigned)

### 4. Managers
- **Role:** Boost team efficiency (future feature)
- **Capacity:** Based on efficiency (4-10 employees per manager)
- **Salary:** Based on capacity ($6,800-$18,400/month)
- **Unlocked:** Via R&D project "Management System"

---

## 📊 Employee Tier System

### Developer Tiers
```javascript
DEVELOPER_TIERS = {
  'junior': {
    name: 'Junior Developer',
    baseEfficiency: 0.5,      // 50% efficiency
    efficiencyCap: 2.0,       // 200% max (after experience)
    minSalaryUSD: 3000,
    maxSalaryUSD: 5000,
    minSalaryEUR: 2700,
    maxSalaryEUR: 4500,
    hiringCostUSD: 1000,      // One-time hiring fee
    hiringCostEUR: 900
  },
  'intermediate': {
    name: 'Intermediate Developer',
    baseEfficiency: 1.0,      // 100% efficiency
    efficiencyCap: 3.0,       // 300% max
    minSalaryUSD: 5000,
    maxSalaryUSD: 8000,
    minSalaryEUR: 4500,
    maxSalaryEUR: 7200,
    hiringCostUSD: 2000,
    hiringCostEUR: 1800
  },
  'senior': {
    name: 'Senior Developer',
    baseEfficiency: 2.0,      // 200% efficiency
    efficiencyCap: 3.5,       // 350% max
    minSalaryUSD: 8000,
    maxSalaryUSD: 12000,
    minSalaryEUR: 7200,
    maxSalaryEUR: 10800,
    hiringCostUSD: 3500,
    hiringCostEUR: 3150
  },
  'expert': {
    name: 'Expert Developer',
    baseEfficiency: 3.0,      // 300% efficiency
    efficiencyCap: 4.0,       // 400% max
    minSalaryUSD: 12000,
    maxSalaryUSD: 18000,
    minSalaryEUR: 10800,
    maxSalaryEUR: 16200,
    hiringCostUSD: 5000,
    hiringCostEUR: 4500
  }
}
```

### Marketer Tiers
```javascript
MARKETER_TIERS = {
  'junior': {
    name: 'Junior Marketer',
    baseEfficiency: 0.5,      // 50% efficiency
    efficiencyCap: 2.0,       // 200% max
    minSalaryUSD: 2500,
    maxSalaryUSD: 4000,
    minSalaryEUR: 2250,
    maxSalaryEUR: 3600,
    hiringCostUSD: 800,
    hiringCostEUR: 720
  },
  'intermediate': {
    name: 'Intermediate Marketer',
    baseEfficiency: 1.0,      // 100% efficiency
    efficiencyCap: 3.0,       // 300% max
    minSalaryUSD: 4000,
    maxSalaryUSD: 6500,
    minSalaryEUR: 3600,
    maxSalaryEUR: 5850,
    hiringCostUSD: 1500,
    hiringCostEUR: 1350
  },
  'senior': {
    name: 'Senior Marketer',
    baseEfficiency: 2.0,      // 200% efficiency
    efficiencyCap: 3.5,       // 350% max
    minSalaryUSD: 6500,
    maxSalaryUSD: 10000,
    minSalaryEUR: 5850,
    maxSalaryEUR: 9000,
    hiringCostUSD: 2500,
    hiringCostEUR: 2250
  },
  'expert': {
    name: 'Expert Marketer',
    baseEfficiency: 3.0,      // 300% efficiency
    efficiencyCap: 4.0,       // 400% max
    minSalaryUSD: 10000,
    maxSalaryUSD: 15000,
    minSalaryEUR: 9000,
    maxSalaryEUR: 13500,
    hiringCostUSD: 4000,
    hiringCostEUR: 3600
  }
}
```

---

## 🎲 Hiring System

### Hire New Employee Flow
```javascript
function hireEmployee(tier, role, name) {
  tierConfig = getTierConfig(tier, role)
  
  // Calculate random salary (within tier range)
  salaryRange = tierConfig.maxSalary - tierConfig.minSalary
  monthlySalary = tierConfig.minSalary + (Math.random() * salaryRange)
  monthlySalary = Math.round(monthlySalary)
  
  // Deduct hiring cost
  hiringCost = tierConfig.hiringCost
  if (cash < hiringCost) {
    showNotification('❌ Not enough cash to hire!', 'error')
    return
  }
  cash -= hiringCost
  
  // Create employee object
  employee = {
    id: generateId(),
    name: name,
    role: role,                    // 'developer' | 'marketer'
    skill: tier,                   // 'junior' | 'intermediate' | etc.
    tierName: tierConfig.name,
    baseEfficiency: tierConfig.baseEfficiency,
    efficiency: tierConfig.baseEfficiency,
    efficiencyCap: tierConfig.efficiencyCap,
    monthlySalary: monthlySalary,
    experienceMonths: 0,
    assignedProduct: null,
    readyForPromotion: false,
    isFounder: false,
    managerId: null,
    isManaged: false
  }
  
  // Add to appropriate list
  if (role === 'developer') {
    developers.push(employee)
  } else {
    marketers.push(employee)
  }
  
  logEvent(`✅ Hired ${tierConfig.name}: ${name} (${formatCurrency(monthlySalary)}/mo)`)
}
```

### Name Generation
```javascript
// Random name from database by nationality
AMERICAN_FIRST_NAMES = ['James', 'Mary', 'John', 'Patricia', ...]
AMERICAN_LAST_NAMES = ['Smith', 'Johnson', 'Williams', ...]

TURKISH_FIRST_NAMES = ['Ahmet', 'Ayşe', 'Mehmet', ...]
TURKISH_LAST_NAMES = ['Yılmaz', 'Kaya', 'Demir', ...]

// ... more nationalities

function generateName(nationality) {
  firstNames = NAMES[nationality].firstNames
  lastNames = NAMES[nationality].lastNames
  
  firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  
  return `${firstName} ${lastName}`
}
```

---

## 📈 Experience & Efficiency Growth

### Monthly Experience Gain
```javascript
// Runs every 30 days (monthly billing)
function gainExperience() {
  for each developer in developers:
    if (developer.assignedProduct !== null) {
      developer.experienceMonths += 1
      updateEfficiency(developer)
    }
  
  for each marketer in marketers:
    if (marketer.assignedProduct !== null) {
      marketer.experienceMonths += 1
      updateEfficiency(marketer)
    }
}
```

### Efficiency Calculation
```javascript
function updateEfficiency(employee) {
  // Base efficiency from tier
  baseEfficiency = employee.baseEfficiency
  
  // Experience bonus: +5% per month
  experienceBonus = employee.experienceMonths * 0.05
  
  // Total efficiency (capped at efficiencyCap)
  currentEfficiency = Math.min(
    baseEfficiency + experienceBonus,
    employee.efficiencyCap
  )
  
  employee.efficiency = currentEfficiency
  
  // Check if ready for promotion
  checkPromotionReadiness(employee)
}
```

### Efficiency Growth Examples

**Junior Developer (0.5 base, 2.0 cap):**
| Month | Experience | Efficiency | % Growth |
|-------|------------|------------|----------|
| 0 | 0 | 0.5 | - |
| 3 | 3 | 0.65 | 30% |
| 6 | 6 | 0.80 | 60% |
| 12 | 12 | 1.10 | 120% |
| 24 | 24 | 1.70 | 240% |
| 30 | 30 | 2.00 | 300% (capped) |

**Intermediate Developer (1.0 base, 3.0 cap):**
| Month | Experience | Efficiency | % Growth |
|-------|------------|------------|----------|
| 0 | 0 | 1.0 | - |
| 6 | 6 | 1.3 | 30% |
| 12 | 12 | 1.6 | 60% |
| 24 | 24 | 2.2 | 120% |
| 40 | 40 | 3.0 | 200% (capped) |

**Key Insight:** Experience compounds quickly. A junior with 30 months experience is as good as a senior hire!

---

## 🎖️ Promotion System

### Promotion Readiness Check
```javascript
function checkPromotionReadiness(employee) {
  currentTier = employee.skill
  nextTier = getNextTier(currentTier)
  
  if (!nextTier) {
    employee.readyForPromotion = false
    return // Already at max tier (expert)
  }
  
  nextTierConfig = TIER_CONFIG[nextTier]
  minEfficiency = nextTierConfig.baseEfficiency
  
  // Ready if current efficiency >= next tier's base
  employee.readyForPromotion = (employee.efficiency >= minEfficiency)
}

function getNextTier(currentTier) {
  tierOrder = ['junior', 'intermediate', 'senior', 'expert']
  currentIndex = tierOrder.indexOf(currentTier)
  
  if (currentIndex === -1 || currentIndex === tierOrder.length - 1) {
    return null // No next tier
  }
  
  return tierOrder[currentIndex + 1]
}
```

### Promotion Thresholds
| Current Tier | Next Tier | Min Efficiency Required | Experience Months Needed |
|--------------|-----------|-------------------------|--------------------------|
| Junior (0.5) | Intermediate (1.0) | 1.0 | 10 months |
| Intermediate (1.0) | Senior (2.0) | 2.0 | 20 months |
| Senior (2.0) | Expert (3.0) | 3.0 | 20 months |
| Expert (3.0) | - | - | - (max tier) |

### Execute Promotion
```javascript
function promoteEmployee(employeeId) {
  employee = getEmployeeById(employeeId)
  
  if (!employee.readyForPromotion) {
    showNotification('❌ Employee not ready for promotion yet.', 'error')
    return
  }
  
  currentTier = employee.skill
  nextTier = getNextTier(currentTier)
  nextTierConfig = TIER_CONFIG[nextTier]
  
  // Update tier
  employee.skill = nextTier
  employee.tierName = nextTierConfig.name
  employee.baseEfficiency = nextTierConfig.baseEfficiency
  employee.efficiencyCap = nextTierConfig.efficiencyCap
  
  // Salary increase (based on new tier's absolute efficiency)
  // Formula: efficiencyValue * 5000 ± 15%
  baseSalary = employee.efficiency * 5000
  variance = 0.85 + (Math.random() * 0.3)  // 85%-115%
  employee.monthlySalary = Math.round(baseSalary * variance)
  
  // Reset promotion flag
  employee.readyForPromotion = false
  
  // Notify
  logEvent(`🎖️ ${employee.name} promoted to ${nextTierConfig.name}!`)
  showNotification(`🎖️ ${employee.name} promoted to ${nextTierConfig.name}!`, 'success')
}
```

### Salary After Promotion
```javascript
// Formula: efficiency × $5,000 ± 15%
// Example: 2.0 efficiency → $10,000 base → $8,500-$11,500 actual

salaryExamples = {
  '1.0 efficiency': '$4,250-$5,750/month',
  '1.5 efficiency': '$6,375-$8,625/month',
  '2.0 efficiency': '$8,500-$11,500/month',
  '2.5 efficiency': '$10,625-$14,375/month',
  '3.0 efficiency': '$12,750-$17,250/month'
}
```

---

## 🔥 Firing Employees

### Fire Employee Flow
```javascript
function fireEmployee(employeeId) {
  employee = getEmployeeById(employeeId)
  
  if (employee.isFounder) {
    showNotification('❌ Cannot fire the founder!', 'error')
    return
  }
  
  // Unassign from product (if assigned)
  if (employee.assignedProduct) {
    removeFromProduct(employee.assignedProduct, employeeId)
  }
  
  // Remove from employee list
  if (employee.role === 'developer') {
    developers = developers.filter(d => d.id !== employeeId)
  } else {
    marketers = marketers.filter(m => m.id !== employeeId)
  }
  
  logEvent(`🔥 Fired ${employee.name} (${employee.tierName})`)
}
```

**When to Fire:**
- Employee salary too high for productivity
- Need to reduce burn rate
- Downsizing during cash crunch
- Replacing with promoted junior employees

---

## 👔 Manager System (R&D Unlocked)

### Manager Structure
```javascript
{
  id: Number,
  name: String,
  role: 'manager',
  efficiency: Number,          // 1.0-4.0
  baseEfficiency: 1.0,
  efficiencyCap: 4.0,
  capacity: Number,            // Calculated: efficiency / 0.25
  monthlySalary: Number,       // Calculated: capacity × $2,000 ± 15%
  experienceMonths: Number,
  managedEmployees: []         // Array of employee IDs
}
```

### Manager Capacity
```javascript
// Capacity = efficiency / 0.25 (rounded down)
capacity = Math.floor(manager.efficiency / 0.25)

// Examples:
// 1.0 efficiency → 4 employees capacity
// 1.5 efficiency → 6 employees capacity
// 2.0 efficiency → 8 employees capacity
// 2.5 efficiency → 10 employees capacity
// 3.0 efficiency → 12 employees capacity
```

### Manager Salary
```javascript
// Formula: capacity × $2,000 ± 15%
baseSalary = capacity * 2000
variance = 0.85 + (Math.random() * 0.3)
monthlySalary = Math.round(baseSalary * variance)

// Examples:
// Capacity 4 → $8,000 base → $6,800-$9,200/month
// Capacity 8 → $16,000 base → $13,600-$18,400/month
```

### Manager Efficiency Bonus (Future Feature)
*Note: Currently managers are hired but don't provide bonuses yet. This is planned for future updates.*

---

## 📊 Employee Metrics

### Individual Metrics
```javascript
// Per Employee
- Name & Tier
- Efficiency (current)
- Experience (months)
- Monthly Salary
- Assigned Product/Project
- Ready for Promotion (boolean)
- Manager (if managed)

// Calculated
- ROI per month (value generated - salary)
- Experience until next promotion
- Efficiency growth rate
- Cost per 1.0 efficiency point
```

### Team Metrics
```javascript
// Global
- Total Developers
- Total Marketers
- Total Managers
- Average Developer Efficiency
- Average Marketer Efficiency
- Total Monthly Salary Expense
- Promotions Available
- Unassigned Employees
```

---

## 💡 Employee Strategy

### Early Game (0-90 days)
- **Hire 1 junior developer** ($3,000-$5,000/month)
- **Hire 1 junior marketer** ($2,500-$4,000/month)
- **Keep team small** to minimize burn rate
- **Promote as soon as possible** (better ROI than hiring senior)

### Mid Game (90-365 days)
- **Promote juniors to intermediate** (10+ months experience)
- **Hire intermediate developers** for faster development
- **Balance dev/marketing teams** (2:1 or 3:2 ratio)
- **Fire low-efficiency employees** if salary too high

### Late Game (365+ days)
- **Promote to senior/expert** (20+ months each)
- **Keep teams small** (2-3 per product to avoid overhead)
- **Hire managers** (when R&D unlocked)
- **Optimize salary vs efficiency** (fire expensive underperformers)

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation
