# Milestone System

> **Lifetime earnings thresholds and hiring pool quality progression**

---

## 🎯 Milestone Overview

The milestone system tracks your **lifetime earnings** (total revenue collected, not current cash) and unlocks better hiring candidates as you grow.

### Purpose
- **Hiring pool quality improves** with company growth
- **Higher-tier candidates** become available at milestones
- **Progression feels rewarding** - visible company growth

---

## 📊 Milestone Thresholds

```javascript
const HIRING_MILESTONES = [
  { 
    threshold: 0, 
    name: "Startup", 
    badge: "🌱", 
    description: "Entry-Level Talent" 
  },
  { 
    threshold: 100000, 
    name: "Small Business", 
    badge: "📈", 
    description: "Growing Talent Pool" 
  },
  { 
    threshold: 500000, 
    name: "Growing Company", 
    badge: "🚀", 
    description: "Quality Candidates" 
  },
  { 
    threshold: 2000000, 
    name: "Established Company", 
    badge: "🏢", 
    description: "Senior Talent Available" 
  },
  { 
    threshold: 10000000, 
    name: "Major Player", 
    badge: "⭐", 
    description: "Elite Talent Pool" 
  }
];
```

---

## 🏆 Milestone Details

### 1. Startup (🌱)
**Threshold:** $0 (default starting milestone)

**Hiring Pool:**
- **Developers:** 100% Junior
- **Marketers:** 100% Junior
- **Quality:** Entry-level talent only

**What This Means:**
- Can only hire junior employees
- No access to intermediate/senior/expert talent
- Building from scratch

---

### 2. Small Business (📈)
**Threshold:** $100,000 lifetime earnings

**Hiring Pool:**
- **Developers:** 70% Junior, 25% Intermediate, 5% Senior
- **Marketers:** 70% Junior, 25% Intermediate, 5% Senior
- **Quality:** Mostly junior, some intermediate talent

**What This Means:**
- Intermediate candidates start appearing (25% chance)
- Rare senior candidates (5% chance)
- Still mostly junior talent

**Typical Timeline:** 3-6 months of gameplay

---

### 3. Growing Company (🚀)
**Threshold:** $500,000 lifetime earnings

**Hiring Pool:**
- **Developers:** 40% Junior, 40% Intermediate, 15% Senior, 5% Lead
- **Marketers:** 40% Junior, 40% Intermediate, 15% Senior, 5% Expert
- **Quality:** Balanced mix of talent

**What This Means:**
- Equal mix of junior and intermediate (40% each)
- Senior candidates more common (15%)
- First chance at lead/expert tier (5%)
- Hiring pool quality significantly improved

**Typical Timeline:** 6-12 months of gameplay

---

### 4. Established Company (🏢)
**Threshold:** $2,000,000 lifetime earnings

**Hiring Pool:**
- **Developers:** 20% Junior, 30% Intermediate, 30% Senior, 15% Lead, 5% Expert
- **Marketers:** 20% Junior, 30% Intermediate, 30% Senior, 15% Expert
- **Quality:** Senior talent readily available

**What This Means:**
- Junior candidates become rare (20%)
- Intermediate and Senior equally common (30% each)
- Lead/Expert candidates more available (15-20%)
- Premium talent pool

**Typical Timeline:** 12-24 months of gameplay

---

### 5. Major Player (⭐)
**Threshold:** $10,000,000 lifetime earnings

**Hiring Pool:**
- **Developers:** 5% Junior, 20% Intermediate, 35% Senior, 25% Lead, 15% Expert
- **Marketers:** 5% Junior, 20% Intermediate, 35% Senior, 25% Expert
- **Quality:** Elite talent pool

**What This Means:**
- Junior candidates very rare (5%)
- Senior candidates most common (35%)
- High chance of lead/expert tier (40% combined)
- Top-tier talent available

**Typical Timeline:** 24+ months of gameplay

---

## 📈 Probability Tables

### Developer Tier Probabilities

| Milestone | Junior | Intermediate | Senior | Lead | Expert |
|-----------|--------|--------------|--------|------|--------|
| Startup | 100% | 0% | 0% | 0% | 0% |
| Small Business | 70% | 25% | 5% | 0% | 0% |
| Growing Company | 40% | 40% | 15% | 5% | 0% |
| Established | 20% | 30% | 30% | 15% | 5% |
| Major Player | 5% | 20% | 35% | 25% | 15% |

### Marketer Tier Probabilities

| Milestone | Junior | Intermediate | Senior | Expert |
|-----------|--------|--------------|--------|--------|
| Startup | 100% | 0% | 0% | 0% |
| Small Business | 70% | 25% | 5% | 0% |
| Growing Company | 40% | 40% | 15% | 5% |
| Established | 20% | 30% | 30% | 20% |
| Major Player | 5% | 20% | 35% | 40% |

---

## 🎲 Hiring Mechanics

### Candidate Generation
```javascript
function generateCandidateTier(role) {
  milestone = getCurrentMilestone()
  probabilities = (role === 'developer') ? 
    DEVELOPER_TIER_PROBABILITIES[milestone.threshold] : 
    MARKETER_TIER_PROBABILITIES[milestone.threshold]
  
  // Roll random number (0-100)
  roll = Math.random() * 100
  
  // Determine tier based on probabilities
  cumulative = 0
  for (i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i]
    if (roll < cumulative) {
      return TIERS[i]  // Return corresponding tier
    }
  }
}
```

### Current Milestone Calculation
```javascript
function getCurrentMilestone() {
  let currentMilestone = HIRING_MILESTONES[0]
  
  for (const milestone of HIRING_MILESTONES) {
    if (lifetimeEarnings >= milestone.threshold) {
      currentMilestone = milestone
    } else {
      break  // First threshold not reached
    }
  }
  
  return currentMilestone
}
```

### Next Milestone Check
```javascript
function getNextMilestone() {
  current = getCurrentMilestone()
  currentIndex = HIRING_MILESTONES.indexOf(current)
  
  if (currentIndex === HIRING_MILESTONES.length - 1) {
    return null  // Already at max milestone
  }
  
  return HIRING_MILESTONES[currentIndex + 1]
}
```

---

## 🎉 Milestone Achievement

### Detection
```javascript
// During monthly billing (every 30 days)
previousLifetimeEarnings = lifetimeEarnings
totalRevenue = calculateTotalRevenue()
lifetimeEarnings += totalRevenue

// Check if crossed a threshold
checkMilestoneAchievement(previousLifetimeEarnings, lifetimeEarnings)
```

### Notification
```javascript
function checkMilestoneAchievement(previous, current) {
  for (const milestone of HIRING_MILESTONES) {
    // Check if milestone was crossed
    if (previous < milestone.threshold && current >= milestone.threshold) {
      showMilestoneNotification(milestone)
      logEvent(`🏆 Milestone Achieved: ${milestone.name}!`)
      break  // Only show one milestone per billing
    }
  }
}
```

### Milestone Notification Display
```javascript
function showMilestoneNotification(milestone) {
  // Show fancy animated notification
  html = `
    <div class="milestone-notification">
      <h3>${milestone.badge} Milestone Achieved!</h3>
      <p><strong>${milestone.name}</strong></p>
      <p>${milestone.description}</p>
    </div>
  `
  
  // Display for 5 seconds with animation
  // Auto-fade out after duration
}
```

---

## 📊 Progress Tracking

### Finance Panel Display
```javascript
// Show current milestone and progress to next
currentMilestone = getCurrentMilestone()
nextMilestone = getNextMilestone()

if (nextMilestone) {
  progressPercent = (lifetimeEarnings - currentMilestone.threshold) / 
                    (nextMilestone.threshold - currentMilestone.threshold)
  
  display = `
    Current: ${currentMilestone.badge} ${currentMilestone.name}
    Progress to ${nextMilestone.badge}: ${progressPercent * 100}%
    Remaining: ${formatCurrency(nextMilestone.threshold - lifetimeEarnings)}
  `
} else {
  display = `Max milestone reached: ${currentMilestone.badge} ${currentMilestone.name}`
}
```

---

## 💡 Milestone Strategy

### Reaching Small Business ($100k)
**Timeline:** 3-6 months

**Strategy:**
- Focus on first product
- Keep costs low (home office, basic server)
- Grow subscribers to 1,000+
- Revenue: ~$10,000/month × 10 months = $100k

### Reaching Growing Company ($500k)
**Timeline:** 6-12 months

**Strategy:**
- Launch 2-3 products
- Upgrade to co-working space
- Hire 3-5 employees
- Revenue: ~$40,000/month × 12 months = $480k

### Reaching Established Company ($2M)
**Timeline:** 12-24 months

**Strategy:**
- Portfolio of 5-7 products
- Small office, standard server
- Team of 10-15 employees
- Revenue: ~$80,000/month × 24 months = $1.92M

### Reaching Major Player ($10M)
**Timeline:** 24-36 months

**Strategy:**
- Portfolio of 10+ products
- Medium/large office, premium server
- Team of 25-50 employees
- Revenue: ~$250,000/month × 40 months = $10M

---

## 📈 Milestone Impact on Gameplay

### Early Game (Startup → Small Business)
- **Challenge:** Can only hire juniors
- **Focus:** Build from scratch, train employees
- **Strategy:** Promote juniors instead of hiring seniors

### Mid Game (Small Business → Growing Company)
- **Opportunity:** Intermediate candidates available
- **Focus:** Build team with mix of junior/intermediate
- **Strategy:** Hire intermediate for faster development

### Late Game (Growing Company → Established)
- **Advantage:** Senior candidates common
- **Focus:** High-quality team
- **Strategy:** Replace juniors with seniors, hire lead/expert

### End Game (Established → Major Player)
- **Elite Status:** Expert candidates readily available
- **Focus:** Optimize team composition
- **Strategy:** All senior/lead/expert team

---

## 🎯 Hiring Pool Quality Comparison

### Example: Hiring 10 Developers

**At Startup ($0 earned):**
- 10 Junior developers (100%)
- Average efficiency: 0.5
- Team efficiency: 5.0 total

**At Small Business ($100k earned):**
- 7 Junior, 2 Intermediate, 1 Senior (average)
- Average efficiency: 0.65
- Team efficiency: 6.5 total

**At Growing Company ($500k earned):**
- 4 Junior, 4 Intermediate, 2 Senior (average)
- Average efficiency: 0.95
- Team efficiency: 9.5 total

**At Established ($2M earned):**
- 2 Junior, 3 Intermediate, 3 Senior, 2 Lead (average)
- Average efficiency: 1.35
- Team efficiency: 13.5 total

**At Major Player ($10M earned):**
- 1 Junior, 2 Intermediate, 3 Senior, 3 Lead, 1 Expert (average)
- Average efficiency: 1.85
- Team efficiency: 18.5 total

**Impact:** 3.7x more efficient team at max milestone vs starting!

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation extracted from HTML
- System fully implemented and working
