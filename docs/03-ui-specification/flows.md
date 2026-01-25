# User Interaction Flows

> **Step-by-step user journeys for all major features**

---

## 🎮 Core Game Flows

### 1. Start New Game Flow
```
1. User opens game in browser
   ↓
2. Check for saved game
   ↓ No save
3. Show New Game Modal
   ↓
4. User enters company name
   ↓
5. User selects currency (USD/EUR)
   ↓
6. Click "Start My Company!"
   ↓
7. Initialize game state (Day 0, $25,000 cash)
   ↓
8. Render all panels
   ↓
9. Game ready (paused, waiting for user to start)
```

---

### 2. Continue Saved Game Flow
```
1. User opens game in browser
   ↓
2. Check for saved game
   ↓ Save exists
3. Load game state from localStorage
   ↓
4. Restore all entities (products, employees, etc.)
   ↓
5. Render all panels with restored data
   ↓
6. Show notification: "Game loaded!"
   ↓
7. Game ready (paused)
```

---

## 👥 Employee Management Flows

### 3. Hire Employee Flow
```
1. User clicks "Hire Developer" button
   ↓
2. Game auto-pauses
   ↓
3. Show Hire Developer Modal
   ↓
4. Display available tiers (based on milestone)
   ↓
5. User selects tier (e.g., "Junior Developer")
   ↓
6. Generate 3 random candidates
   - Random names from nationality database
   - Random salaries within tier range
   ↓
7. User clicks on candidate
   ↓
8. Check if enough cash for hiring cost
   ↓ Yes
9. Deduct hiring cost from cash
   ↓
10. Add employee to developers list
    ↓
11. Close modal
    ↓
12. Show notification: "Hired [Name]!"
    ↓
13. Refresh employee panel
    ↓
14. Game remains paused (user controls)
```

---

### 4. Promote Employee Flow
```
1. Employee gains experience monthly
   ↓
2. Efficiency reaches next tier's base
   ↓
3. Set readyForPromotion = true
   ↓
4. Show promotion badge on employee card
   ↓
5. Log event: "Employee ready for promotion!"
   ↓
6. User clicks "Promote" button
   ↓
7. Game auto-pauses
   ↓
8. Show Promote Employee Modal
   ↓
9. Display current tier and next tier
   ↓
10. Generate salary expectation (±20% of base)
    ↓
11. User adjusts salary slider
    ↓
12. Calculate acceptance probability (real-time)
    ↓
13. User clicks "Offer Promotion"
    ↓
14. Roll random number vs probability
    ↓
15a. ACCEPTED:
     - Promote to next tier
     - Update salary
     - Reset readyForPromotion
     - Close modal
     - Show success notification
     
15b. REJECTED:
     - Increment rejectionCount
     - If rejectionCount >= 3:
       * Fire employee automatically
       * Show quit notification
     - Else:
       * Show rejection notification
       * Employee stays at current tier
     ↓
16. Refresh employee panel
```

---

### 5. Fire Employee Flow
```
1. User clicks "Fire" button on employee card
   ↓
2. Game auto-pauses
   ↓
3. Show Fire Employee Modal
   ↓
4. Display employee details and warning
   ↓
5. User clicks "Yes, Fire"
   ↓
6. If employee assigned to product:
   - Remove from product.assignedDevelopers/Marketers
   ↓
7. Remove employee from list
   ↓
8. Close modal
   ↓
9. Show notification: "Fired [Name]"
   ↓
10. Refresh employee panel and affected product cards
```

---

## 📦 Product Management Flows

### 6. Create Product Flow
```
1. User clicks "New Product" button
   ↓
2. Game auto-pauses
   ↓
3. Show Create Product Modal
   ↓
4. Display unlocked product templates
   - Group by category
   - Show: Name, Price, Tier, Difficulty
   ↓
5. User clicks on product template
   ↓
6. Create product object
   - status: 'in_development'
   - progress: 0
   - subscribers: 0
   - assignedDevelopers: []
   - assignedMarketers: []
   ↓
7. Add to products list
   ↓
8. Close modal
   ↓
9. Show notification: "Created [Product Name]!"
   ↓
10. Refresh products panel
```

---

### 7. Assign Developers to Product Flow
```
1. User clicks "Assign Developers" button on product card
   ↓
2. Game auto-pauses
   ↓
3. Show Assign Developer Modal
   ↓
4. Load available developers:
   - Founder (if not assigned)
   - Unassigned developers
   - Currently assigned developers (checked)
   ↓
5. User selects/deselects developers (checkboxes)
   ↓
6. Show selection summary (count, team penalty)
   ↓
7. User clicks "Assign Selected"
   ↓
8. Update product.assignedDevelopers with selected IDs
   ↓
9. Update employee.assignedProduct for each selected
   ↓
10. Close modal
    ↓
11. Refresh product card and employee cards
    ↓
12. Development progress starts on next tick
```

---

### 8. Product Development to Publishing Flow
```
1. Product created (status: 'in_development', progress: 0)
   ↓
2. Developers assigned
   ↓
3. Every game tick (daily):
   - Calculate dailyProgress based on developer efficiency
   - Apply team overhead penalty
   - Add to product.progress
   ↓
4. Progress reaches 100%
   ↓
5. Auto-publish product:
   - Set status: 'published'
   - Set publishDate: currentDay
   - Unassign all developers automatically
   ↓
6. Show notification: "🎉 [Product] is now published!"
   ↓
7. Log event
   ↓
8. Play celebration sound (optional)
   ↓
9. Refresh product card (orange → green)
   ↓
10. Product ready for marketers
```

---

### 9. Grow Subscribers Flow
```
1. Product published (status: 'published')
   ↓
2. User assigns marketers to product
   ↓
3. Every game tick (daily):
   - Calculate dailyGrowth based on marketer efficiency
   - Apply team overhead penalty
   - Apply randomness (80%-120%)
   - Check server capacity
   - Add actualGrowth to product.subscribers
   ↓
4. Display updated subscriber count
   ↓
5. If server full:
   - Show warning notification (once per day)
   - Growth stops until server upgraded
```

---

### 10. Deprecate Product Flow
```
1. User clicks "Deprecate" button on published product
   ↓
2. Game auto-pauses
   ↓
3. Show Deprecate Product Modal
   ↓
4. Display warning about subscriber loss
   ↓
5. User clicks "Yes, Deprecate"
   ↓
6. Set status: 'deprecated'
   ↓
7. Set deprecationDate: currentDay
   ↓
8. Unassign all marketers automatically
   ↓
9. Close modal
   ↓
10. Show notification: "Deprecated [Product]"
    ↓
11. Refresh product card (green → red)
    ↓
12. Every tick: Apply high churn rate (5-10% daily)
    ↓
13. Eventually subscribers → 0
    ↓
14. After 365 days: Auto-delete product
```

---

## 🔬 R&D Flows

### 11. Start R&D Project Flow
```
1. User clicks "New R&D Project" button
   ↓
2. Game auto-pauses
   ↓
3. Show Start R&D Modal
   ↓
4. Display available projects:
   - Available projects (green)
   - Locked projects (gray, show prerequisites)
   ↓
5. User clicks on available project
   ↓
6. Create R&D project object
   - status: 'in_progress'
   - progress: 0
   - assignedDevelopers: []
   ↓
7. Add to rndProjects list
   ↓
8. Close modal
   ↓
9. Show notification: "Started [Project]!"
   ↓
10. Refresh R&D panel
```

---

### 12. Complete R&D Project Flow
```
1. R&D project in progress with developers assigned
   ↓
2. Every game tick:
   - Calculate dailyProgress based on developer efficiency
   - Add to project.progress
   ↓
3. Progress reaches project.developmentEffort
   ↓
4. Auto-complete project:
   - Set status: 'completed'
   - Add to completedRndProjects array
   - Apply effect based on type:
     * unlock_product: Add to unlockedProducts
     * organic_growth: Applied in growth calculations
     * churn_reduction: Applied in churn calculations
   - Remove from rndProjects (active) list
   ↓
5. Show notification: "🎉 R&D Complete: [Project]!"
   ↓
6. Log event
   ↓
7. Refresh R&D panel
   ↓
8. If product unlocked:
   - Show in Create Product modal
   - Notification mentions unlock
```

---

## 💰 Billing Flows

### 13. Monthly Billing Flow
```
1. Game reaches day 30, 60, 90, etc.
   ↓
2. Calculate total revenue:
   - For each product (published or deprecated):
     * productRevenue = subscribers × monthlyPrice
   - Sum all productRevenue
   ↓
3. Add revenue to cash
   ↓
4. Add revenue to lifetimeEarnings
   ↓
5. Check for milestone achievement
   ↓ If milestone crossed
6. Show milestone notification
   ↓
7. Calculate total expenses:
   - Office rent
   - Utilities (base + per employee)
   - Insurance (2% revenue + per employee)
   - All salaries (devs + marketers + managers)
   - Server hosting
   ↓
8. Deduct expenses from cash
   ↓
9. Update all employee experience:
   - If assigned: experienceMonths += 1
   - Recalculate efficiency
   - Check for promotion readiness
   ↓
10. Clean up old deprecated products (>365 days)
    ↓
11. Log billing summary:
    - "💵 Monthly Income: $[revenue]"
    - Individual expense lines
    - "💸 Net Cash Flow: $[net]"
    ↓
12. Refresh all panels
    ↓
13. If cash < 0:
    - Show warning notification
    - Continue game (not game over)
```

---

## 🎯 User Journey (Full Session Example)

### Typical 5-Minute Session
```
1. Open game → Continue from Day 45
   ↓
2. Check cash: $15,000 (yellow, low)
   ↓
3. Check products: Task Manager at 500 subscribers
   ↓
4. Click "New Product" → Select "CRM Lite"
   ↓
5. Click "Assign Developers" → Select Founder + John Smith
   ↓
6. Click Play (2x speed)
   ↓
7. Watch progress: CRM at 10%, 20%, 30%...
   ↓
8. Day 50: First employee ready for promotion!
   ↓
9. Click "Promote" → Offer $5,500 → Accepted!
   ↓
10. Day 60: Monthly billing hits
    - Revenue: $5,000
    - Expenses: $7,500
    - Net: -$2,500
    - Cash now: $12,500
    ↓
11. Click "Assign Marketers" on Task Manager
    ↓
12. Select Jane Doe → Assign
    ↓
13. Continue playing...
    ↓
14. Click Save
    ↓
15. Close browser
```

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial user flow documentation
