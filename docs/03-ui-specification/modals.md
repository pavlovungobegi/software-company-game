# Modal System

> **Complete catalog of all modals, triggers, and interactions**

---

## 🎯 Modal Overview

The game uses 15+ modals for all major interactions. All modals:
- **Auto-pause game** when opened
- **Resume on close** (unless manually paused)
- **Overlay dismissible** (click outside to close)
- **Reusable Dialog class** (consistent styling)

---

## 📋 Complete Modal List

### Game Setup Modals
1. **New Game Modal** - Start new game (company name, currency)
2. **Settings Modal** - Game settings (future feature)
3. **Save/Load Modal** - Save slots management (future feature)

### Employee Modals
4. **Hire Employee Modal** - Select tier and role
5. **Hire Developer Modal** - Developer-specific hiring
6. **Hire Marketer Modal** - Marketer-specific hiring
7. **Hire Manager Modal** - Manager hiring (R&D unlocked)
8. **Fire Employee Modal** - Confirmation for firing
9. **Fire Manager Modal** - Confirmation for firing manager
10. **Promote Employee Modal** - Salary negotiation for promotion
11. **Manager Promotion Modal** - Salary negotiation for manager promotion

### Product Modals
12. **Create Product Modal** - Select product template
13. **Assign Developer Modal** - Assign developers to product
14. **Assign Marketer Modal** - Assign marketers to product
15. **Deprecate Product Modal** - Confirm deprecation

### R&D Modals
16. **Start R&D Project Modal** - Select R&D project
17. **Assign Developer to R&D Modal** - Assign developers to R&D

### Infrastructure Modals
18. **Upgrade Office Modal** - Select office tier
19. **Upgrade Server Modal** - Select server tier

---

## 🎨 Modal Components (Reusable Dialog Class)

### Dialog Class Structure
```javascript
class Dialog {
  constructor(options) {
    this.id = options.id || 'dialog-' + Date.now()
    this.title = options.title || ''
    this.description = options.description || ''
    this.content = options.content || ''
    this.onConfirm = options.onConfirm || null
    this.onCancel = options.onCancel || null
    this.confirmText = options.confirmText || 'Confirm'
    this.cancelText = options.cancelText || 'Cancel'
    this.confirmClass = options.confirmClass || 'bg-indigo-600'
    this.showCancel = options.showCancel !== false
    this.maxWidth = options.maxWidth || 'max-w-sm'
  }
  
  render() { /* ... */ }
  open() { /* ... */ }
  close() { /* ... */ }
  confirm() { /* ... */ }
  cancel() { /* ... */ }
  updateContent(newContent) { /* ... */ }
  destroy() { /* ... */ }
}
```

---

## 📋 Detailed Modal Specifications

### 1. New Game Modal

**Trigger:** Page load (if no saved game)

**Fields:**
- Company name input (text, required)
- Currency selection (USD/EUR radio buttons)

**Actions:**
- **Start Game:** Validate name → Initialize game state → Close modal → Start game loop
- No cancel button (must start game)

**UI:**
```
┌─────────────────────────────┐
│ 🚀 Start Your Company       │
├─────────────────────────────┤
│ Company Name: [___________] │
│                             │
│ Currency:                   │
│ ( ) USD  (•) EUR           │
│                             │
│        [Start My Company!]  │
└─────────────────────────────┘
```

---

### 2. Hire Employee Modal

**Trigger:** Click "Hire Developer" or "Hire Marketer" or "Hire Manager" button

**Steps:**
1. **Select Employee Type** (if from generic hire button)
   - Developer / Marketer / Manager
2. **Select Tier** (based on milestone)
   - Shows available tiers with probabilities
   - Displays: Efficiency, Salary Range, Hiring Cost
3. **Generate Candidates** (3 candidates per tier)
   - Random names from nationality database
   - Random salaries within tier range
   - Click candidate to select

**Candidate Card:**
```
┌─────────────────────────────┐
│ John Smith                  │
│ Junior Developer            │
│                             │
│ Efficiency: 0.5 (50%)       │
│ Salary: $3,500/mo           │
│ Hiring Cost: $1,000         │
│                             │
│        [Hire John Smith]    │
└─────────────────────────────┘
```

**Actions:**
- **Hire:** Deduct hiring cost → Add employee → Close modal → Show notification
- **Cancel:** Close modal without hiring

---

### 3. Promote Employee Modal

**Trigger:** Click "Promote" button on employee with `readyForPromotion: true`

**Fields:**
- Employee name and current tier (display only)
- Current efficiency (display only)
- New tier and salary expectation (display only)
- **Salary slider** (80%-120% of expectation)
- **Acceptance probability** (real-time calculation)

**UI:**
```
┌─────────────────────────────┐
│ 🎖️ Promote Employee          │
├─────────────────────────────┤
│ John Smith                  │
│ Junior → Intermediate       │
│                             │
│ Expectation: $5,500/mo      │
│ Your Offer:  $5,000/mo      │
│                             │
│ [====|=====] Salary Slider  │
│ $4,400      $6,600          │
│                             │
│ 📊 Acceptance: 85%          │
│                             │
│ ⚠️ Rejected 0/3 - After 3   │
│    rejections, they quit!   │
│                             │
│ [Cancel] [Offer Promotion]  │
└─────────────────────────────┘
```

**Acceptance Probability:**
- Updates in real-time as slider moves
- Color-coded: Green (90%+), Yellow (60-90%), Red (<60%)

**Actions:**
- **Offer Promotion:** 
  - Roll acceptance (based on probability)
  - If accepted: Promote → Close modal → Show success notification
  - If rejected: Increment rejection count → Show failure notification
  - If 3rd rejection: Fire employee automatically
- **Cancel:** Close modal without promoting

---

### 4. Manager Promotion Modal

**Trigger:** Click "Promote" button on manager with `readyForPromotion: true`

**Similar to Employee Promotion but:**
- Capacity increase shown (e.g., "4 → 5")
- Salary based on capacity ($2,000 per capacity)
- Same negotiation mechanics
- Same 3-rejection quit rule

**UI:**
```
┌─────────────────────────────┐
│ 👔 Manager Promotion         │
├─────────────────────────────┤
│ Jane Manager                │
│ Capacity: 4 → 5             │
│                             │
│ Expectation: $10,000/mo     │
│ Your Offer:  $9,500/mo      │
│                             │
│ [====|=====] Salary Slider  │
│ $8,500      $11,500         │
│                             │
│ 📊 Acceptance: 92%          │
│                             │
│ [Cancel] [Offer Promotion]  │
└─────────────────────────────┘
```

---

### 5. Create Product Modal

**Trigger:** Click "New Product" button

**Content:**
- Scrollable list of unlocked product templates
- Grouped by category
- Shows: Name, Price, Tier, Difficulty

**Product Card (in modal):**
```
┌─────────────────────────────┐
│ Task Manager                │
│ Tier 1 | Easy                │
│ $10/month subscription      │
│                             │
│     [Create This Product]   │
└─────────────────────────────┘
```

**Actions:**
- **Create Product:** Add to products list → Set status 'in_development' → Close modal
- **Cancel:** Close modal

---

### 6. Assign Developer Modal

**Trigger:** Click "Assign Developers" button on product

**Content:**
- Product name display
- Checkbox list of available developers
  - Founder (if not assigned)
  - Unassigned developers
  - Currently assigned developers (checked)
- Shows: Name, Tier, Efficiency
- **Multi-select** (checkboxes)

**UI:**
```
┌─────────────────────────────┐
│ Assign Developers           │
│ Product: Task Manager       │
├─────────────────────────────┤
│ [✓] Founder (1.0 eff)       │
│ [ ] John Smith (0.5 eff)    │
│ [✓] Jane Doe (1.2 eff)      │
│ [ ] Bob Lee (0.8 eff)       │
│                             │
│ Selected: 2 developers      │
│ Team Penalty: 6%            │
│                             │
│ [Cancel] [Assign Selected]  │
└─────────────────────────────┘
```

**Actions:**
- **Assign Selected:** Update product.assignedDevelopers → Close modal
- **Cancel:** Close modal without changes

---

### 7. Assign Marketer Modal

**Same as Assign Developer Modal but for marketers**

**Differences:**
- Only shows marketers (not developers)
- Used for published products only
- Shows expected subscriber growth rate

---

### 8. Start R&D Project Modal

**Trigger:** Click "New R&D Project" button

**Content:**
- Scrollable list of available R&D projects
- Shows: Name, Category, Description, Effort, Prerequisites
- Locked projects shown but disabled (missing prerequisites)

**Project Card (in modal):**
```
┌─────────────────────────────┐
│ 🚀 SEO & Content Marketing  │
│ Growth Category             │
│                             │
│ Effort: 9 progress points   │
│ Effect: +5% organic growth  │
│                             │
│ Prerequisites: None         │
│                             │
│    [Start This Project]     │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🔒 Viral Referral System    │
│ Growth Category             │
│                             │
│ Effort: 24 progress points  │
│ Effect: +10% organic growth │
│                             │
│ ❌ Requires: SEO & Content  │
│                             │
│    [Locked - Complete SEO]  │
└─────────────────────────────┘
```

**Actions:**
- **Start Project:** Add to rndProjects → Close modal → Show notification
- **Cancel:** Close modal

---

### 9. Fire Employee Modal

**Trigger:** Click "Fire" button on employee card

**Content:**
- Employee name and details
- Current assignment (if any)
- Warning about losing employee

**UI:**
```
┌─────────────────────────────┐
│ 🔥 Fire Employee             │
├─────────────────────────────┤
│ John Smith                  │
│ Junior Developer            │
│ Efficiency: 1.2             │
│ Salary: $3,500/mo           │
│                             │
│ Currently assigned to:      │
│ • Task Manager              │
│                             │
│ Are you sure?               │
│                             │
│ [Cancel] [Yes, Fire]        │
└─────────────────────────────┘
```

**Actions:**
- **Fire:** Unassign from products → Remove from list → Close modal → Show notification
- **Cancel:** Close modal

---

### 10. Deprecate Product Modal

**Trigger:** Click "Deprecate" button on published product

**Content:**
- Product name and current stats
- Warning about subscriber loss
- Confirmation

**UI:**
```
┌─────────────────────────────┐
│ ⚠️ Deprecate Product         │
├─────────────────────────────┤
│ Task Manager                │
│ Subscribers: 1,500          │
│ Revenue: $15,000/mo         │
│                             │
│ ⚠️ Warning:                  │
│ • Marketers will be freed   │
│ • Subscribers will decline  │
│ • Product will die in ~45d  │
│                             │
│ Are you sure?               │
│                             │
│ [Cancel] [Yes, Deprecate]   │
└─────────────────────────────┘
```

**Actions:**
- **Deprecate:** Set status 'deprecated' → Unassign marketers → Close modal
- **Cancel:** Close modal

---

### 11. Upgrade Office Modal

**Trigger:** Click "Upgrade Office" button

**Content:**
- Current office tier
- List of higher tiers with:
  - Capacity
  - Monthly rent
  - Utilities cost
  - One-time upgrade cost (if applicable)

**Office Card (in modal):**
```
┌─────────────────────────────┐
│ Co-Working Space            │
│                             │
│ Capacity: 10 employees      │
│ Rent: $1,500/mo             │
│ Utilities: $200 + $30/emp   │
│                             │
│      [Upgrade to This]      │
└─────────────────────────────┘
```

**Actions:**
- **Upgrade:** Set currentOfficeTier → Close modal → Show notification
- **Cancel:** Close modal

---

### 12. Upgrade Server Modal

**Trigger:** Click "Upgrade Server" button

**Content:**
- Current server tier
- List of higher tiers with:
  - Max subscribers capacity
  - Monthly hosting fee
  - One-time upgrade cost (if applicable)

**Server Card (in modal):**
```
┌─────────────────────────────┐
│ Standard Server             │
│                             │
│ Capacity: 5,000 subscribers │
│ Monthly Fee: $500           │
│                             │
│      [Upgrade to This]      │
└─────────────────────────────┘
```

**Actions:**
- **Upgrade:** Set currentServerTier → Close modal → Show notification
- **Cancel:** Close modal

---

## 🎭 Modal Behavior

### Opening a Modal
```javascript
function openModal(modalId) {
  // Auto-pause game
  pauseGame()
  
  // Show modal
  modal = document.getElementById(modalId)
  modal.classList.remove('hidden')
  
  // Disable body scroll
  document.body.style.overflow = 'hidden'
}
```

### Closing a Modal
```javascript
function closeModal(modalId) {
  // Hide modal
  modal = document.getElementById(modalId)
  modal.classList.add('hidden')
  
  // Re-enable body scroll
  document.body.style.overflow = ''
  
  // Note: Game remains paused (user must manually unpause)
}
```

### Overlay Click
```javascript
// Click outside modal to close
overlay.onclick = () => {
  closeModal()
}

// Click inside modal does nothing
modalContent.onclick = (e) => {
  e.stopPropagation()  // Prevent closing
}
```

---

## 🎨 Modal Styling

### Standard Modal Layout
```html
<div class="modal-overlay">
  <div class="modal">
    <!-- Header -->
    <div class="modal-header">
      [Icon] [Title]
    </div>
    
    <!-- Body -->
    <div class="modal-body">
      [Content goes here]
    </div>
    
    <!-- Footer -->
    <div class="modal-footer">
      <button class="btn" onclick="cancel()">Cancel</button>
      <button class="btn-primary" onclick="confirm()">Confirm</button>
    </div>
  </div>
</div>
```

### Modal Sizes
- **Small:** max-width: 400px (confirmations)
- **Medium:** max-width: 600px (forms)
- **Large:** max-width: 800px (lists, multiple selections)

### Modal Animations
```css
/* Fade in overlay */
.modal-overlay {
  animation: fadeIn 0.2s ease-out;
}

/* Slide up modal */
.modal {
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 🔄 Modal State Management

### Active Modal Tracking
```javascript
// Track which modals are currently open
let openModals = []

function openModal(id) {
  openModals.push(id)
  pauseGame()
  // ... show modal
}

function closeModal(id) {
  openModals = openModals.filter(m => m !== id)
  // ... hide modal
}

function closeAllModals() {
  openModals.forEach(id => closeModal(id))
  openModals = []
}
```

### Modal z-index Management
```javascript
// Modals: z-index: 10000
// Modal overlays: z-index: 9999
// Notifications: z-index: 10001 (above modals)
```

---

## 💡 Modal UX Best Practices

### Do's ✅
- Auto-pause game when modal opens
- Show loading states for async actions
- Validate inputs before submitting
- Provide clear error messages
- Show confirmation for destructive actions
- Allow ESC key to close (future feature)

### Don'ts ❌
- Don't nest modals (one at a time)
- Don't auto-resume game on close (user controls pause)
- Don't allow modal actions while loading
- Don't lose form data on accidental close (future: save draft)

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial modal catalog
