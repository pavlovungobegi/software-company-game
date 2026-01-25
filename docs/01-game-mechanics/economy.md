# Economy & Cash Flow System

> How money flows in and out of the company

---

## 💵 Cash Flow Overview

```
Monthly Net Cash Flow = Revenue - Expenses
```

### Revenue Sources
1. **Product Subscriptions** (monthly billing, every 30 days)
2. **Lifetime Earnings Tracking** (for unlock milestones)

### Expense Categories
1. **Office Rent** (fixed per tier)
2. **Utilities** (base + per employee)
3. **Insurance** (2% of revenue + per employee)
4. **Employee Salaries** (developers + marketers + managers)
5. **Server Hosting** (fixed per tier)

---

## 💰 Starting Capital

```javascript
cash = 25000  // USD or EUR equivalent
lifetimeEarnings = 0
```

**First Month Strategy:**
- You have 25,000 to cover expenses until first billing (Day 30)
- Typical runway: 2-3 months with 1-2 employees
- **Critical:** Monitor "Next Billing In" display for cash flow projection

---

## 📅 Billing Cycle

### Monthly Billing (Every 30 Days)
```javascript
// Trigger condition
if (currentDay % 30 === 0 && currentDay > 0) {
  runMonthlyBilling()
}
```

### Revenue Collection
```javascript
totalRevenue = 0

for each product in products:
  if (product.status === 'published' || product.status === 'deprecated') {
    productRevenue = product.subscribers * product.monthlyPrice
    totalRevenue += productRevenue
  }

cash += totalRevenue
lifetimeEarnings += totalRevenue
```

**Key Insights:**
- Deprecated products STILL generate revenue (until subscribers reach 0)
- Revenue is collected BEFORE expenses are deducted
- Lifetime earnings trigger unlock milestones

---

## 🏢 Office Costs

### Office Tiers
```javascript
OFFICE_TIERS = {
  'home': {
    name: 'Home Office',
    maxCapacity: 3,  // Founder + 2 employees
    monthlyRentUSD: 0,
    monthlyRentEUR: 0,
    utilitiesBaseUSD: 100,
    utilitiesBaseEUR: 90,
    utilitiesPerPersonUSD: 50,
    utilitiesPerPersonEUR: 45
  },
  'coworking': {
    name: 'Co-Working Space',
    maxCapacity: 10,
    monthlyRentUSD: 1500,
    monthlyRentEUR: 1350,
    utilitiesBaseUSD: 200,
    utilitiesBaseEUR: 180,
    utilitiesPerPersonUSD: 30,
    utilitiesPerPersonEUR: 27
  },
  'small': {
    name: 'Small Office',
    maxCapacity: 25,
    monthlyRentUSD: 4000,
    monthlyRentEUR: 3600,
    utilitiesBaseUSD: 400,
    utilitiesBaseEUR: 360,
    utilitiesPerPersonUSD: 25,
    utilitiesPerPersonEUR: 22.5
  },
  'medium': {
    name: 'Medium Office',
    maxCapacity: 50,
    monthlyRentUSD: 8000,
    monthlyRentEUR: 7200,
    utilitiesBaseUSD: 800,
    utilitiesBaseEUR: 720,
    utilitiesPerPersonUSD: 20,
    utilitiesPerPersonEUR: 18
  },
  'large': {
    name: 'Large Office',
    maxCapacity: 100,
    monthlyRentUSD: 15000,
    monthlyRentEUR: 13500,
    utilitiesBaseUSD: 1500,
    utilitiesBaseEUR: 1350,
    utilitiesPerPersonUSD: 15,
    utilitiesPerPersonEUR: 13.5
  }
}
```

### Cost Calculation
```javascript
rent = office.monthlyRent[currency]
utilitiesBase = office.utilitiesBase[currency]
utilitiesPerPerson = office.utilitiesPerPerson[currency]
teamSize = getCurrentTeamSize()  // Founder + developers + marketers + managers

utilities = utilitiesBase + (utilitiesPerPerson * teamSize)
totalOfficeCost = rent + utilities
```

**Example (Co-working, 5 people, USD):**
```
Rent: $1,500
Utilities: $200 (base) + ($30 × 5) = $350
Total: $1,850/month
```

---

## 🛡️ Insurance Costs

### Formula
```javascript
insuranceBase = currency === "USD" ? 100 : 90
employeeCount = developers.length + marketers.length + managers.length

insurance = (totalRevenue * 0.02) + (insuranceBase * employeeCount)
```

**Key Insights:**
- Insurance scales with BOTH revenue (2%) AND team size
- Founder is NOT counted in employee count
- Higher revenue = higher insurance cost (risk management)

**Example:**
```
Revenue: $10,000/month
Employees: 3
Currency: USD

Insurance = ($10,000 × 0.02) + ($100 × 3)
         = $200 + $300
         = $500/month
```

---

## 💼 Employee Salaries

### Salary Structure
See `/docs/01-game-mechanics/employees.md` for full tier breakdown.

**Quick Reference:**
```javascript
// Developer Salaries (USD)
Junior: $3,000-$5,000
Intermediate: $5,000-$8,000
Senior: $8,000-$12,000
Expert: $12,000-$18,000

// Marketer Salaries (USD)
Junior: $2,500-$4,000
Intermediate: $4,000-$6,500
Senior: $6,500-$10,000
Expert: $10,000-$15,000

// Manager Salaries (USD)
capacity * $2,000 ± 15%
```

### Monthly Salary Deduction
```javascript
totalSalaries = 0

for each developer in developers:
  totalSalaries += developer.monthlySalary

for each marketer in marketers:
  totalSalaries += marketer.monthlySalary

for each manager in managers:
  totalSalaries += manager.monthlySalary

cash -= totalSalaries
```

**Founder's Salary:** $0 (does not take salary)

---

## 🖥️ Server Hosting Costs

### Server Tiers
```javascript
SERVER_TIERS = {
  'basic': {
    name: 'Basic Server',
    maxSubscribers: 1000,
    monthlyFeeUSD: 100,
    monthlyFeeEUR: 90
  },
  'standard': {
    name: 'Standard Server',
    maxSubscribers: 5000,
    monthlyFeeUSD: 500,
    monthlyFeeEUR: 450
  },
  'premium': {
    name: 'Premium Server',
    maxSubscribers: 20000,
    monthlyFeeUSD: 2000,
    monthlyFeeEUR: 1800
  },
  'enterprise': {
    name: 'Enterprise Server',
    maxSubscribers: 100000,
    monthlyFeeUSD: 10000,
    monthlyFeeEUR: 9000
  }
}
```

### Cost Calculation
```javascript
serverFee = server.monthlyFee[currency]
cash -= serverFee
```

**Key Insights:**
- Server capacity is HARD CAP - cannot exceed `maxSubscribers`
- Products cannot gain subscribers if server is full
- Upgrade server BEFORE hitting capacity (avoid lost growth)

---

## 📊 Monthly Expense Summary

### Example Breakdown (Day 30)
```
REVENUE:
Product A: 100 subscribers × $10 = $1,000
Product B: 50 subscribers × $20 = $1,000
Total Revenue: $2,000

EXPENSES:
Office Rent (Home): $0
Utilities (Home, 3 people): $100 + ($50 × 3) = $250
Insurance: ($2,000 × 0.02) + ($100 × 2) = $240
Salaries:
  - Developer 1 (Junior): $3,500
  - Marketer 1 (Junior): $3,000
Server (Basic): $100
Total Expenses: $7,090

NET CASH FLOW: $2,000 - $7,090 = -$5,090
```

**Result:** Burning $5,090/month. Need more revenue or reduce costs.

---

## 🚨 Cash Flow Warnings

### Display Colors
```javascript
if (cash < 0) {
  color = 'red'
  flashAnimation = true
} else if (cash < 10000) {
  color = 'yellow'
} else {
  color = 'green'
}
```

### Next Billing Projection
```javascript
daysUntilBilling = 30 - (currentDay % 30)
projectedRevenue = calculateProjectedRevenue()
projectedExpenses = calculateProjectedExpenses()
projectedCashFlow = projectedRevenue - projectedExpenses

if (projectedCashFlow > 0) {
  displayColor = 'green'
  prefix = '+'
} else {
  displayColor = 'red'
  prefix = ''
}

display = `Next billing in ${daysUntilBilling}d: ${prefix}${formatCurrency(projectedCashFlow)}`
```

---

## 💡 Economic Strategy Tips

### Early Game (Days 1-90)
- **Keep team small** (1-2 employees max) to minimize burn rate
- **Focus on one product** to reach publishing quickly
- **Stay in home office** until you have stable revenue
- **Basic server is enough** for first 1,000 subscribers

### Mid Game (Days 90-365)
- **Expand team gradually** - watch cash flow carefully
- **Upgrade office when capacity reached** (not before)
- **Monitor insurance costs** - scales with revenue
- **Upgrade server proactively** - don't hit capacity during growth

### Late Game (365+ days)
- **Optimize office efficiency** - balance capacity vs cost
- **Manage multiple products** for revenue diversification
- **Invest in R&D** for competitive advantages
- **Consider managers** when teams exceed 3-4 people

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation
