# Product System

> Product development, lifecycle, and subscriber growth mechanics

---

## 📦 Product Lifecycle States

```
in_development → published → deprecated → [deleted after 365 days]
```

### State Definitions

#### 1. In Development
- **Progress:** 0-99%
- **Subscribers:** 0
- **Revenue:** $0
- **Actions:** Assign developers, track progress
- **Duration:** Variable (depends on team efficiency)

#### 2. Published
- **Progress:** 100%
- **Subscribers:** Growing (if marketers assigned)
- **Revenue:** `subscribers × monthlyPrice`
- **Actions:** Assign marketers, deprecate
- **Churn:** 1-2% daily (low churn)

#### 3. Deprecated
- **Progress:** 100% (complete)
- **Subscribers:** Declining rapidly
- **Revenue:** `subscribers × monthlyPrice` (until 0)
- **Actions:** None (cannot reactivate)
- **Churn:** 5-10% daily (high churn)
- **Cleanup:** Auto-deleted after 365 days

---

## 🏗️ Product Creation

### Product Structure
```javascript
{
  id: Number,               // Unique identifier
  name: String,             // Product name (from template)
  status: String,           // 'in_development' | 'published' | 'deprecated'
  progress: Number,         // 0-100 (percentage)
  subscribers: Number,      // Current active subscribers
  monthlyPrice: Number,     // Subscription price (USD or EUR)
  assignedDevelopers: [],   // Array of developer IDs
  assignedMarketers: [],    // Array of marketer IDs
  publishDate: Number,      // Day when published (null if not yet)
  deprecationDate: Number,  // Day when deprecated (null if not yet)
  lastCapacityWarning: Number, // Last day server capacity warning shown
  
  // Template metadata
  category: String,         // 'productivity' | 'communication' | etc.
  tier: String,            // 'tier1' | 'tier2' | 'tier3'
  difficulty: String,      // 'easy' | 'medium' | 'hard'
  
  // R&D unlock tracking
  unlockedBy: String       // R&D project ID (if unlocked)
}
```

### Product Templates
```javascript
PRODUCT_TEMPLATES = {
  'Task Manager': {
    category: 'productivity',
    tier: 'tier1',
    difficulty: 'easy',
    monthlyPriceUSD: 10,
    monthlyPriceEUR: 9
  },
  'CRM Software': {
    category: 'business',
    tier: 'tier2',
    difficulty: 'medium',
    monthlyPriceUSD: 50,
    monthlyPriceEUR: 45
  },
  'Cloud Storage': {
    category: 'storage',
    tier: 'tier2',
    difficulty: 'hard',
    monthlyPriceUSD: 15,
    monthlyPriceEUR: 13.5
  }
  // ... 20+ templates total
}
```

**Initial Unlock:** Only "Task Manager" available at game start.

---

## 🛠️ Development Phase

### Progress Calculation (Daily)
```javascript
// Base progress: 1% per developer per day
BASE_PROGRESS = 1.0

dailyProgress = 0
teamSize = product.assignedDevelopers.length

for each developerId in product.assignedDevelopers:
  developer = getDeveloperById(developerId)
  
  // Apply team overhead penalty
  effectiveEfficiency = getEffectiveEfficiency(developer.efficiency, teamSize)
  
  // Add to daily progress
  dailyProgress += BASE_PROGRESS * effectiveEfficiency

// Update product progress
product.progress = Math.min(100, product.progress + dailyProgress)

// Check if complete
if (product.progress >= 100) {
  product.status = 'published'
  product.publishDate = currentDay
  product.progress = 100  // Cap at exactly 100
}
```

### Development Time Examples

**Solo Developer (1.0 efficiency):**
- 1% per day → **100 days to complete**

**Solo Developer (2.0 efficiency):**
- 2% per day → **50 days to complete**

**2 Developers (1.5 efficiency each, 6% penalty):**
- Dev 1: 1.5 × 0.94 = 1.41% per day
- Dev 2: 1.5 × 0.94 = 1.41% per day
- Total: 2.82% per day → **36 days to complete**

**5 Developers (1.0 efficiency each, 24% penalty):**
- Each: 1.0 × 0.76 = 0.76% per day
- Total: 3.8% per day → **27 days to complete**

---

## 🚀 Publishing

### Auto-Publishing Trigger
```javascript
if (product.progress >= 100 && product.status === 'in_development') {
  product.status = 'published'
  product.publishDate = currentDay
  
  // Notify user
  logEvent(`🎉 "${product.name}" is now published!`)
  showNotification(`🎉 ${product.name} is live! Assign marketers to gain subscribers.`, 'success')
  
  // Play celebration sound (optional)
  playCelebrationSound()
}
```

### Post-Publishing State
- Developers are **automatically unassigned** (freed for other projects)
- Product needs marketers assigned to gain subscribers
- Revenue starts at Day 30 (first billing cycle)

---

## 📈 Subscriber Growth (Published)

### Growth Formula (Daily)
```javascript
// Only runs if product has marketers assigned
if (product.assignedMarketers.length > 0) {
  dailyGrowth = 0
  teamSize = product.assignedMarketers.length
  
  for each marketerId in product.assignedMarketers:
    marketer = getMarketerById(marketerId)
    
    // Apply team overhead penalty
    effectiveEfficiency = getEffectiveEfficiency(marketer.efficiency, teamSize)
    
    // Base growth: 5 subscribers per marketer per day
    dailyGrowth += 5 * effectiveEfficiency
  
  // Apply randomness (80%-120%)
  randomFactor = 0.8 + (Math.random() * 0.4)
  potentialGrowth = Math.max(1, Math.round(dailyGrowth * randomFactor))
  
  // Check server capacity
  currentTotalSubs = getTotalSubscribers()
  actualGrowth = Math.min(potentialGrowth, server.maxSubscribers - currentTotalSubs)
  
  // Add subscribers
  product.subscribers += actualGrowth
  
  // Server full warning (once per day)
  if (potentialGrowth > 0 && actualGrowth === 0) {
    if (currentDay > product.lastCapacityWarning) {
      logEvent(`⚠️ Server full! "${product.name}" cannot gain subscribers.`)
      showNotification(`⚠️ Server capacity full! Upgrade server.`, 'warning')
      product.lastCapacityWarning = currentDay
    }
  }
}
```

### Growth Examples

**1 Marketer (1.0 efficiency):**
- 5 subscribers/day × 1.0 = 5/day
- 30 days = **150 subscribers**

**1 Marketer (2.0 efficiency):**
- 5 subscribers/day × 2.0 = 10/day
- 30 days = **300 subscribers**

**3 Marketers (1.5 efficiency each, 12% penalty):**
- Each: 5 × 1.5 × 0.88 = 6.6/day
- Total: 19.8/day → **~594 subscribers in 30 days**

---

## 📉 Subscriber Churn

### Published Products (Low Churn)
```javascript
// Only applies if subscribers > 10
if (product.subscribers > 10) {
  baseChurnRate = 0.01 + (Math.random() * 0.01)  // 1-2% daily
  
  // R&D can reduce churn
  adjustedChurnRate = baseChurnRate * churnReductionMultiplier
  
  subscribersLost = Math.ceil(product.subscribers * adjustedChurnRate)
  product.subscribers = Math.max(0, product.subscribers - subscribersLost)
}
```

**Example:**
- 1,000 subscribers
- 1.5% churn per day
- Lose 15 subscribers/day
- **Need 15+ growth/day to break even**

### Deprecated Products (High Churn)
```javascript
churnRate = 0.05 + (Math.random() * 0.05)  // 5-10% daily
subscribersLost = Math.max(1, Math.ceil(product.subscribers * churnRate))
product.subscribers = Math.max(0, product.subscribers - subscribersLost)

// Log when product dies
if (previousSubscribers > 0 && product.subscribers === 0) {
  logEvent(`💀 "${product.name}" has lost all subscribers.`)
}
```

**Death Timeline:**
- Start: 1,000 subscribers
- Day 1: 7.5% churn → 925 left
- Day 7: ~550 left
- Day 14: ~300 left
- Day 30: ~50 left
- Day 45: 0 (dead)

---

## 🗑️ Product Deprecation

### Manual Deprecation
```javascript
function deprecateProduct(productId) {
  product = getProductById(productId)
  
  if (product.status !== 'published') return
  
  // Change status
  product.status = 'deprecated'
  product.deprecationDate = currentDay
  
  // Unassign all marketers (freed for other products)
  product.assignedMarketers = []
  
  // Notify
  logEvent(`⚠️ Deprecated "${product.name}". Subscribers will decline.`)
}
```

### Auto-Cleanup (After 365 Days)
```javascript
// Runs during monthly billing
products = products.filter(product => {
  if (product.status !== 'deprecated') return true
  
  daysSinceDeprecation = currentDay - product.deprecationDate
  return daysSinceDeprecation < 365
})
```

**Why Deprecate?**
- Free up marketers for newer products
- Product is outdated/unprofitable
- Revenue per subscriber is too low
- Better products available

---

## 💰 Revenue Generation

### Monthly Revenue (Day 30, 60, 90, ...)
```javascript
productRevenue = product.subscribers * product.monthlyPrice
totalRevenue += productRevenue
```

**Example:**
- **Product A:** 500 subscribers × $10 = $5,000/month
- **Product B:** 100 subscribers × $50 = $5,000/month
- **Product C (deprecated):** 50 subscribers × $15 = $750/month
- **Total Revenue:** $10,750/month

---

## 🎯 Product Strategy

### Early Game (0-90 days)
1. **Start with Task Manager** (only unlocked product)
2. **Assign founder + 1 developer** for faster development
3. **Publish ASAP** (get to market quickly)
4. **Assign 1-2 marketers** to grow subscribers
5. **Wait for revenue** before starting new products

### Mid Game (90-365 days)
1. **Unlock new products via R&D**
2. **Launch 2-3 products** for revenue diversification
3. **Balance development vs marketing** teams
4. **Deprecate underperforming products**
5. **Upgrade server as needed**

### Late Game (365+ days)
1. **Portfolio of 5-10 products**
2. **Launch new products regularly**
3. **Deprecate old products** (keep fresh lineup)
4. **Optimize team assignments** (avoid large teams)
5. **Focus on high-tier products** (better revenue)

---

## 📊 Product Metrics Dashboard

### Key Metrics to Track
```javascript
// Per Product
- Status (development/published/deprecated)
- Progress (0-100%)
- Subscribers (current count)
- Daily Growth (with/without marketers)
- Monthly Revenue (subscribers × price)
- Days Since Published
- Days Since Deprecated

// Global
- Total Active Products (published)
- Total Subscribers (across all products)
- Total Monthly Revenue
- Server Capacity Used (% of max)
- Products in Development
- Deprecated Products (with revenue)
```

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation
