# R&D System

> **Research & Development projects, unlock trees, and permanent upgrades**

---

## 🔬 R&D Overview

The R&D system allows you to invest development resources into research projects that provide **permanent upgrades** and **unlock new products/features**.

### Key Features
- **Sequential unlock trees** - Projects have prerequisites
- **Permanent effects** - Benefits persist forever
- **Product unlocks** - Access to new product templates
- **Efficiency boosts** - Team-wide improvements
- **Growth multipliers** - Subscriber growth bonuses
- **Churn reduction** - Lower subscriber loss rates

---

## 📊 R&D Project Structure

```javascript
{
  id: String,              // Unique identifier (e.g., 'growth_1')
  name: String,            // Display name
  category: String,        // GROWTH | RETENTION | EFFICIENCY | UNLOCK
  developmentEffort: Number, // Progress points needed (NOT days)
  effect: {
    type: String,          // Effect type
    value: String|Number   // Effect value
  },
  description: String,     // What it does
  prerequisites: []        // Array of required project IDs
}
```

---

## 🎯 R&D Categories

### 1. **GROWTH** (Organic Growth Street)
**Purpose:** Increase subscriber growth rates

**Projects:**
- SEO & Content Marketing
- Viral Referral System
- AI Growth Engine
- Community & Ecosystem Platform
- Global Brand Authority
- Market Penetration Strategy

**Effect:** Adds multiplicative bonus to daily subscriber growth

### 2. **RETENTION** (Churn Reduction Street)
**Purpose:** Reduce subscriber churn rates

**Projects:**
- Customer Success Portal
- Predictive Retention Analytics
- Hyper-Personalization Engine
- Personalized Marketing Engine

**Effect:** Reduces daily churn percentage

### 3. **EFFICIENCY** (Employee Effectiveness Street)
**Purpose:** Boost employee efficiency

**Projects:**
- Modern Dev Tools & CI/CD
- Knowledge Management Platform
- AI Coding Assistant

**Effect:** Increases all employee efficiency (future feature)

### 4. **UNLOCK** (Product Unlock Street)
**Purpose:** Unlock new product templates

**Projects:** 19 sequential unlocks (see full list below)

**Effect:** Adds new product to available templates

---

## 🌳 R&D Unlock Trees

### 🚀 GROWTH STREET (Sequential Chain)

```
growth_1 (SEO & Content Marketing)
  ↓ +5% growth
growth_2 (Viral Referral System)
  ↓ +10% growth
growth_3 (AI Growth Engine)
  ↓ +15% growth
growth_4 (Community & Ecosystem Platform)
  ↓ +20% growth
growth_5 (Global Brand Authority)
  ↓ +25% growth
growth_6 (Market Penetration Strategy)
  ↓ +35% growth
```

**Total Growth Bonus:** +110% (2.1x multiplier)

---

### 🛡️ RETENTION STREET (Sequential Chain)

```
retention_1 (Customer Success Portal)
  ↓ -10% churn
retention_2 (Predictive Retention Analytics)
  ↓ -10% churn
retention_3 (Hyper-Personalization Engine)
  ↓ -15% churn
retention_4 (Personalized Marketing Engine)
  ↓ -10% churn
```

**Total Churn Reduction:** -45% (0.55x multiplier)

---

### ⚡ EFFICIENCY STREET (Sequential Chain)

```
efficiency_1 (Modern Dev Tools & CI/CD)
  ↓ +10% employee efficiency
efficiency_2 (Knowledge Management Platform)
  ↓ +10% employee efficiency
efficiency_3 (AI Coding Assistant)
  ↓ +15% employee efficiency
```

**Total Efficiency Bonus:** +35% (future feature, not yet implemented)

---

### 🔓 UNLOCK STREET (19-Project Sequential Chain)

```
unlock_time_tracking (Time Tracking App)
  ↓
unlock_form_builder (Form Builder)
  ↓
unlock_invoicing (Invoicing Software)
  ↓
unlock_crm (CRM Lite)
  ↓
unlock_password (Password Manager)
  ↓
unlock_email_marketing (Email Marketing Tool)
  ↓
unlock_analytics (Analytics Dashboard)
  ↓
unlock_social_media (Social Media Manager)
  ↓
unlock_project_mgmt (Project Management Suite)
  ↓
unlock_hr (HR Management System)
  ↓
unlock_ecommerce (E-commerce Platform)
  ↓
unlock_video (Video Conferencing Tool)
  ↓
unlock_ai_chatbot (AI Chatbot)
  ↓
unlock_erp (ERP System)
```

**Total Products Unlocked:** 14 products (+ Task Manager default = 15 total)

---

## 📋 Complete R&D Project List

### GROWTH PROJECTS

| ID | Name | Effort | Effect | Prerequisites |
|----|------|--------|--------|---------------|
| growth_1 | SEO & Content Marketing | 9 | +5% growth | None |
| growth_2 | Viral Referral System | 24 | +10% growth | growth_1 |
| growth_3 | AI Growth Engine | 36 | +15% growth | growth_2 |
| growth_4 | Community & Ecosystem | 60 | +20% growth | growth_3 |
| growth_5 | Global Brand Authority | 120 | +25% growth | growth_4 |
| growth_6 | Market Penetration | 240 | +35% growth | growth_5 |

---

### RETENTION PROJECTS

| ID | Name | Effort | Effect | Prerequisites |
|----|------|--------|--------|---------------|
| retention_1 | Customer Success Portal | 24 | -10% churn | None |
| retention_2 | Predictive Analytics | 36 | -10% churn | retention_1 |
| retention_3 | Hyper-Personalization | 72 | -15% churn | retention_2 |
| retention_4 | Personalized Marketing | 240 | -10% churn | retention_3 |

---

### EFFICIENCY PROJECTS

| ID | Name | Effort | Effect | Prerequisites |
|----|------|--------|--------|---------------|
| efficiency_1 | Modern Dev Tools & CI/CD | 48 | +10% efficiency | None |
| efficiency_2 | Knowledge Management | 60 | +10% efficiency | efficiency_1 |
| efficiency_3 | AI Coding Assistant | 180 | +15% efficiency | efficiency_2 |

---

### UNLOCK PROJECTS (Sequential Chain)

| ID | Name | Effort | Unlocks Product | Prerequisites |
|----|------|--------|-----------------|---------------|
| unlock_time_tracking | Task Scheduling Research | 6 | Time Tracking App | None |
| unlock_form_builder | Dynamic Form Generation | 8 | Form Builder | unlock_time_tracking |
| unlock_invoicing | Automated Billing | 8 | Invoicing Software | unlock_form_builder |
| unlock_crm | Customer Relationship | 12 | CRM Lite | unlock_invoicing |
| unlock_password | Encryption & Storage | 12 | Password Manager | unlock_crm |
| unlock_email_marketing | Campaign Automation | 12 | Email Marketing Tool | unlock_password |
| unlock_analytics | Data Visualization | 24 | Analytics Dashboard | unlock_email_marketing |
| unlock_social_media | Social Media API | 24 | Social Media Manager | unlock_analytics |
| unlock_project_mgmt | Agile Workflow | 36 | Project Management | unlock_social_media |
| unlock_hr | Enterprise HR | 36 | HR Management | unlock_project_mgmt |
| unlock_ecommerce | Payment Gateway | 36 | E-commerce Platform | unlock_hr |
| unlock_video | Real-time Streaming | 48 | Video Conferencing | unlock_ecommerce |
| unlock_ai_chatbot | Natural Language | 48 | AI Chatbot | unlock_video |
| unlock_erp | Enterprise Integration | 60 | ERP System | unlock_ai_chatbot |

---

## 🛠️ R&D Development Mechanics

### Starting a Project
```javascript
function startRndProject(projectId) {
  // Check prerequisites
  project = RND_PROJECTS.find(p => p.id === projectId)
  
  for (prereqId of project.prerequisites) {
    if (!completedRndProjects.includes(prereqId)) {
      return false  // Cannot start - missing prerequisites
    }
  }
  
  // Create active project
  rndProject = {
    id: nextRndProjectId++,
    templateId: projectId,
    name: project.name,
    category: project.category,
    progress: 0,
    status: 'in_progress',
    assignedDevelopers: [],
    effect: project.effect,
    developmentEffort: project.developmentEffort
  }
  
  rndProjects.push(rndProject)
}
```

---

### Progress Calculation (Daily)
```javascript
// Same as product development
dailyProgress = 0
teamSize = project.assignedDevelopers.length

for each developerId in project.assignedDevelopers:
  developer = getDeveloperById(developerId)
  effectiveEfficiency = developer.efficiency * (1 - getTeamOverheadPenalty(teamSize))
  dailyProgress += 1.0 * effectiveEfficiency

project.progress += dailyProgress

// Check completion
if (project.progress >= project.developmentEffort) {
  completeRndProject(project)
}
```

**Key Difference from Products:** Progress target is `developmentEffort`, NOT always 100.

---

### Completion & Effects
```javascript
function completeRndProject(project) {
  // Mark as completed
  completedRndProjects.push(project.templateId)
  project.status = 'completed'
  
  // Apply effect based on type
  switch(project.effect.type) {
    case 'unlock_product':
      unlockedProducts.push(project.effect.value)
      break
    
    case 'organic_growth':
      // Applied multiplicatively during subscriber growth
      // No state change - checked when calculating growth
      break
    
    case 'churn_reduction':
      // Applied multiplicatively during churn calculation
      // No state change - checked when calculating churn
      break
    
    case 'employee_efficiency':
      // Future feature - not yet implemented
      break
  }
  
  // Remove from active projects
  rndProjects = rndProjects.filter(p => p.id !== project.id)
  
  // Notify user
  logEvent(`🎉 R&D Complete: ${project.name}!`)
  showNotification(`🔬 ${project.name} completed!`, 'success')
}
```

---

## 📈 Effect Application

### Organic Growth Bonus
```javascript
// During daily subscriber growth calculation
function calculateActiveRndEffects() {
  effects = {
    organicGrowth: 0,
    churnReduction: 1.0
  }
  
  completedRndProjects.forEach(projectId => {
    project = RND_PROJECTS.find(p => p.id === projectId)
    
    if (project.effect.type === 'organic_growth') {
      effects.organicGrowth += project.effect.value  // Additive
    }
    
    if (project.effect.type === 'churn_reduction') {
      effects.churnReduction -= project.effect.value  // Subtractive
    }
  })
  
  return effects
}

// Applied to growth
baseGrowth = marketers * 5 * efficiency
organicBonus = effects.organicGrowth
finalGrowth = baseGrowth * (1 + organicBonus)
```

**Example:**
- Base growth: 10 subscribers/day
- Completed: growth_1 (+5%), growth_2 (+10%)
- Bonus: 15%
- Final growth: 10 × 1.15 = 11.5 subscribers/day

---

### Churn Reduction
```javascript
// During daily churn calculation
baseChurnRate = 0.01 + (Math.random() * 0.01)  // 1-2%
churnReductionMultiplier = effects.churnReduction
adjustedChurnRate = baseChurnRate * churnReductionMultiplier
subscribersLost = subscribers * adjustedChurnRate
```

**Example:**
- Base churn: 1.5% daily
- Completed: retention_1 (-10%), retention_2 (-10%)
- Reduction: 20%
- Multiplier: 0.80
- Final churn: 1.5% × 0.80 = 1.2% daily

---

## 🎯 R&D Strategy

### Early Game (Days 1-180)
- **Focus:** Unlock Street
- **Priority:** unlock_time_tracking → unlock_form_builder → unlock_invoicing
- **Why:** Unlock new products quickly for revenue diversification
- **Resources:** 1 developer assigned to R&D (founder or hired)

### Mid Game (Days 180-730)
- **Focus:** Growth Street + Continue Unlocks
- **Priority:** growth_1, growth_2, growth_3 + finish unlock chain
- **Why:** Boost subscriber growth rates
- **Resources:** 2-3 developers rotating between R&D and products

### Late Game (730+ days)
- **Focus:** Retention Street + Advanced Growth
- **Priority:** retention_1, retention_2, retention_3 + growth_4, growth_5, growth_6
- **Why:** Maximize subscriber retention and growth multipliers
- **Resources:** Dedicated R&D team (3-5 developers)

---

## 💡 R&D Optimization Tips

### Effort vs Benefit Analysis

**Best ROI Projects (Early):**
1. **unlock_time_tracking** (6 effort) - Unlocks product in ~6 days (1 dev, 1.0 eff)
2. **growth_1** (9 effort) - +5% growth for 9 days investment
3. **unlock_form_builder** (8 effort) - Unlocks product in ~8 days

**High Effort, High Reward (Late):**
- **growth_6** (240 effort) - +35% growth, but takes ~240 days (1 dev)
- **retention_4** (240 effort) - -10% churn, but takes ~240 days

### Team Size for R&D
- **Solo developer (1.0 eff):** 1% progress per day
- **2 developers (1.5 eff, 6% penalty):** 2.82% progress per day
- **3 developers (2.0 eff, 12% penalty):** 5.28% progress per day

**Recommendation:** Keep R&D teams small (1-2 developers) to avoid overhead penalty.

---

## 📊 R&D Completion Timeline

### With 1 Developer (1.0 efficiency)

| Project | Effort | Days to Complete |
|---------|--------|------------------|
| unlock_time_tracking | 6 | 6 days |
| growth_1 | 9 | 9 days |
| unlock_form_builder | 8 | 8 days |
| unlock_crm | 12 | 12 days |
| retention_1 | 24 | 24 days |
| growth_2 | 24 | 24 days |
| unlock_analytics | 24 | 24 days |
| growth_3 | 36 | 36 days |
| retention_2 | 36 | 36 days |
| efficiency_1 | 48 | 48 days |
| unlock_video | 48 | 48 days |
| growth_4 | 60 | 60 days |
| efficiency_2 | 60 | 60 days |
| unlock_erp | 60 | 60 days |
| retention_3 | 72 | 72 days |
| growth_5 | 120 | 120 days |
| efficiency_3 | 180 | 180 days |
| growth_6 | 240 | 240 days |
| retention_4 | 240 | 240 days |

---

### With 2 Developers (1.5 efficiency each, 6% penalty)

**Effective Progress:** 2.82% per day

| Project | Effort | Days to Complete |
|---------|--------|------------------|
| unlock_time_tracking | 6 | ~2 days |
| growth_1 | 9 | ~3 days |
| retention_1 | 24 | ~9 days |
| growth_2 | 24 | ~9 days |
| growth_3 | 36 | ~13 days |
| efficiency_1 | 48 | ~17 days |
| growth_4 | 60 | ~21 days |
| retention_3 | 72 | ~26 days |
| growth_5 | 120 | ~43 days |
| efficiency_3 | 180 | ~64 days |
| growth_6 | 240 | ~85 days |
| retention_4 | 240 | ~85 days |

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation extracted from HTML
- Note: Efficiency boost feature planned but not yet implemented
