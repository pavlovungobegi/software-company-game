# Documentation Errata & Corrections

> **Known discrepancies and corrections to be made**

---

## ⚠️ Critical Corrections Needed

### 1. Experience Rate Formula

**Incorrect (in early versions):**
```javascript
EXPERIENCE_RATE = 0.05  // 5% per month
experienceBonus = experienceMonths * 0.05
```

**CORRECT (from HTML):**
```javascript
EXPERIENCE_RATE = 0.01  // 1% per month
experienceBonus = experienceMonths * 0.01
// Comment in code: "100 months of work = 1.0x efficiency gain"
```

**Impact:**
- Efficiency grows **5x slower** than initially documented
- Promotions take longer
- Junior → Intermediate: ~50 months (not 10 months)

**Files to Update:**
- [ ] `formulas.md` - Experience growth section
- [ ] `employees.md` - Efficiency growth timeline tables
- [ ] `QUICK-REFERENCE.md` - Experience formula

---

### 2. Employee Tier Definitions

**Discrepancy Found:**
The HTML file shows **5 tiers** (including "Lead"), but initial documentation showed **4 tiers**.

**CORRECT Tier Structure (from HTML):**

**Developers:**
1. Junior (0.5 eff, cap 1.0)
2. Intermediate (1.0 eff, cap 1.5)
3. Senior (1.5 eff, cap 2.0)
4. **Lead** (2.0 eff, cap 3.0)
5. Expert (3.0 eff, cap 5.0)

**Marketers:**
1. Junior (0.5 eff, cap 1.0)
2. Intermediate (1.0 eff, cap 1.5)
3. Senior (1.5 eff, cap 2.0)
4. Expert (2.0 eff, cap 4.0)

**Key Differences:**
- Developers have 5 tiers (Lead tier between Senior and Expert)
- Marketers have 4 tiers (no Lead tier)
- Efficiency caps differ from initial documentation

**Files to Update:**
- [ ] `employees.md` - Complete tier table rewrite
- [ ] `state-schema.ts` - Update EmployeeTier type
- [ ] `formulas.md` - Update promotion thresholds

---

### 3. Efficiency Caps

**Initial Documentation (INCORRECT):**
```
Junior cap: 2.0
Intermediate cap: 3.0
Senior cap: 3.5
Expert cap: 4.0
```

**CORRECT (from HTML):**
```
Junior cap: 1.0
Intermediate cap: 1.5
Senior cap: 2.0
Lead cap: 3.0 (developers only)
Expert cap: 5.0 (developers) / 4.0 (marketers)
```

**Impact:**
- Promotions happen much faster than documented
- Max efficiency is higher for developers (5.0 vs 4.0)
- Completely changes progression timelines

**Files to Update:**
- [ ] `employees.md` - All efficiency cap references
- [ ] `formulas.md` - Promotion threshold tables
- [ ] `QUICK-REFERENCE.md` - Tier comparison table

---

## ℹ️ Minor Corrections

### 4. Auto-Save Frequency

**Documented:** Every 30 days  
**Actual (from HTML):** Every 5 days

```javascript
if (currentDay % 5 === 0 && currentDay > 0) {
  saveGame();
}
```

**Files to Update:**
- [ ] `save-load.md` - Auto-save trigger section

---

### 5. Event Log History

**Documented:** Last 100 events  
**Actual (from HTML):** Last 50 events

```javascript
eventLog: eventLog.slice(-50)  // Keep last 50 only
```

**Files to Update:**
- [ ] `save-load.md` - Event log section

---

## 🔍 Verification Needed

### Items Requiring HTML Verification

**Manager System:**
- [ ] Verify efficiency bonus implementation status
- [ ] Check if manager optimization runs
- [ ] Confirm team assignment mechanics

**R&D System:**
- [ ] Verify all R&D project IDs and effects
- [ ] Check organic growth application formula
- [ ] Confirm churn reduction multiplier

**Milestone System:**
- [ ] Verify exact probability tables for each milestone
- [ ] Check milestone notification timing
- [ ] Confirm progression display in UI

---

## 📊 Documentation Accuracy Status

### Fully Verified ✅
- Economy system (billing, revenue, expenses)
- Product lifecycle states
- Team overhead penalty formula
- Manager capacity and salary formulas
- Save/load format (version 3.1)

### Partially Verified ⚠️
- Employee tier structure (5 tiers vs 4 tiers)
- Experience rate (1% vs 5%)
- Efficiency caps (different values)
- R&D project list (need to verify all effects)

### Not Yet Verified ⏳
- UI component specifications (extracted from HTML, not tested)
- Animation timings (need to verify CSS)
- Mobile breakpoints (need to test responsive behavior)

---

## 🔧 Recommended Actions

### High Priority (This Week)
1. **Correct experience rate** in all formulas (0.01 not 0.05)
2. **Update tier structures** with correct 5-tier system
3. **Fix efficiency caps** in all tables
4. **Verify R&D effects** by testing in game

### Medium Priority (This Month)
1. Verify all animation timings
2. Test mobile responsiveness
3. Verify modal triggers and behaviors
4. Confirm all formula examples with actual gameplay

### Low Priority (When Time Permits)
1. Add screenshots to UI documentation
2. Create component storybook (for React version)
3. Document keyboard shortcuts (if implemented)
4. Add accessibility notes

---

## 🧪 Testing Strategy for Corrections

### Formula Testing
```javascript
// Test experience rate
employee.experienceMonths = 50
efficiency = calculateEfficiency(employee)
// Expected: 0.5 base + (50 × 0.01) = 1.0
// NOT: 0.5 base + (50 × 0.05) = 3.0

// Test promotion thresholds
juniorDev.efficiency = 1.0
canPromote = checkPromotionReadiness(juniorDev)
// Expected: true (reached cap)

intermediteDev.efficiency = 1.5
canPromote = checkPromotionReadiness(intermediateDev)
// Expected: true (reached cap)
```

---

## 📝 Change Log Template

When making corrections, use this format:

```markdown
## Correction: [Issue Name]

**Date:** 2026-01-24
**Affected Files:** formulas.md, employees.md
**Severity:** CRITICAL | HIGH | MEDIUM | LOW

**Incorrect Value:**
[What was documented wrong]

**Correct Value:**
[What it should be]

**Source:** HTML file line [line number]

**Verified:** [Yes/No]
```

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial errata document
- Identified 3 critical corrections and 2 minor corrections
