# Save/Load System

> **Save format, version migrations, and localStorage management**

---

## 💾 Save System Overview

The game uses **localStorage** to persist game state across browser sessions.

### Key Features
- **Auto-save every 5 days** - Prevents progress loss
- **Manual save** - Save button in UI
- **Version tracking** - Enables migrations
- **Validation** - Checks save integrity
- **Backward compatibility** - Older saves can be loaded

---

## 📊 Save Data Format

### Current Version: 3.1

```javascript
{
  version: "3.1",
  timestamp: Number,  // Unix timestamp (ms)
  gameState: {
    // Game configuration
    currency: "USD" | "EUR",
    currentDay: Number,
    cash: Number,
    lifetimeEarnings: Number,
    companyName: String,
    isPlaying: Boolean,
    gameSpeed: 1 | 2 | 4,
    
    // Founder
    founder: {
      name: String,
      efficiency: Number,
      baseEfficiency: Number,
      experienceMonths: Number,
      assignedProduct: Number | null
    },
    
    // Infrastructure
    currentOfficeTier: "home" | "coworking" | "small" | "medium" | "large",
    currentServerTier: "basic" | "standard" | "premium" | "enterprise",
    
    // Entities (full arrays)
    products: Product[],
    developers: Developer[],
    marketers: Marketer[],
    managers: Manager[],
    
    // R&D System
    rndProjects: RndProject[],
    completedRndProjects: String[],
    unlockedProducts: String[],
    nextRndProjectId: Number,
    
    // Event log (optional - for UI state)
    eventLog: LogEntry[]
  }
}
```

---

## 💾 Save Function

### Save Process
```javascript
function saveGame() {
  const saveData = {
    version: "3.1",
    timestamp: Date.now(),
    gameState: {
      // Game config
      currency: currency,
      currentDay: currentDay,
      cash: cash,
      lifetimeEarnings: lifetimeEarnings,
      companyName: companyName,
      isPlaying: isPlaying,
      gameSpeed: gameSpeed,
      
      // Founder (partial save - only necessary fields)
      founder: {
        name: founder.name,
        efficiency: founder.efficiency,
        baseEfficiency: founder.baseEfficiency,
        experienceMonths: founder.experienceMonths,
        assignedProduct: founder.assignedProduct
      },
      
      // Infrastructure
      currentOfficeTier: currentOfficeTier,
      currentServerTier: currentServerTier,
      
      // Entities (full arrays)
      products: products,
      developers: developers,
      marketers: marketers,
      managers: managers,
      
      // R&D System
      rndProjects: rndProjects,
      completedRndProjects: completedRndProjects,
      unlockedProducts: unlockedProducts,
      nextRndProjectId: nextRndProjectId,
      
      // Event log (for continuity)
      eventLog: eventLog
    }
  };
  
  try {
    localStorage.setItem('softwareCompanyGame', JSON.stringify(saveData));
    showNotification('💾 Game saved successfully!', 'success');
  } catch (error) {
    console.error('Save failed:', error);
    showNotification('❌ Save failed! Check browser storage.', 'error');
  }
}
```

### Auto-Save
```javascript
// Runs during game tick
if (currentDay % 5 === 0 && currentDay > 0) {
  saveGame();  // Auto-save every 5 days
}
```

---

## 📂 Load Function

### Load Process
```javascript
function loadGame() {
  try {
    // Fetch from localStorage
    const savedData = localStorage.getItem('softwareCompanyGame');
    
    if (!savedData) {
      return false; // No save found
    }
    
    const save = JSON.parse(savedData);
    
    // Validate save format
    if (!save.version || !save.gameState) {
      console.error("Invalid save format");
      return false;
    }
    
    // ============================================
    // RESTORE CORE STATE
    // ============================================
    
    currency = save.gameState.currency;
    currentDay = save.gameState.currentDay;
    cash = save.gameState.cash;
    lifetimeEarnings = save.gameState.lifetimeEarnings || 0;
    companyName = save.gameState.companyName;
    isPlaying = save.gameState.isPlaying || false;
    gameSpeed = save.gameState.gameSpeed || 1;
    
    // ============================================
    // RESTORE FOUNDER
    // ============================================
    
    founder.name = save.gameState.founder.name;
    founder.efficiency = save.gameState.founder.efficiency || 1.0;
    founder.baseEfficiency = save.gameState.founder.baseEfficiency || 1.0;
    founder.experienceMonths = save.gameState.founder.experienceMonths || 0;
    founder.assignedProduct = save.gameState.founder.assignedProduct;
    
    // ============================================
    // RESTORE INFRASTRUCTURE
    // ============================================
    
    currentOfficeTier = save.gameState.currentOfficeTier || 'home';
    currentServerTier = save.gameState.currentServerTier || 'basic';
    
    // ============================================
    // RESTORE ENTITIES
    // ============================================
    
    products = save.gameState.products || [];
    developers = save.gameState.developers || [];
    marketers = save.gameState.marketers || [];
    managers = save.gameState.managers || [];
    
    // ============================================
    // RESTORE R&D SYSTEM
    // ============================================
    
    rndProjects = save.gameState.rndProjects || [];
    completedRndProjects = save.gameState.completedRndProjects || [];
    unlockedProducts = save.gameState.unlockedProducts || ['Task Manager'];
    nextRndProjectId = save.gameState.nextRndProjectId || 10000;
    
    // ============================================
    // RESTORE EVENT LOG
    // ============================================
    
    eventLog = save.gameState.eventLog || [];
    
    // ============================================
    // REFRESH UI
    // ============================================
    
    renderAllPanels();
    updateCashDisplay();
    updateDayDisplay();
    
    showNotification('✅ Game loaded successfully!', 'success');
    return true;
    
  } catch (error) {
    console.error('Load failed:', error);
    showNotification('❌ Load failed! Save may be corrupted.', 'error');
    return false;
  }
}
```

---

## 🔄 Version Migration System

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Initial | Basic game state |
| 2.0 | Phase 2 | Added products system |
| 3.0 | Phase 3 | Added R&D system |
| 3.1 | Current | Added manager system |

### Migration Logic (Future Versions)

```javascript
function migrateGameSave(save) {
  let currentVersion = save.version;
  
  // Migration chain
  if (currentVersion === "1.0") {
    save = migrateV1toV2(save);
    currentVersion = "2.0";
  }
  
  if (currentVersion === "2.0") {
    save = migrateV2toV3(save);
    currentVersion = "3.0";
  }
  
  if (currentVersion === "3.0") {
    save = migrateV3toV3_1(save);
    currentVersion = "3.1";
  }
  
  return save;
}

// Example migration: V3.0 → V3.1 (add managers)
function migrateV3toV3_1(save) {
  if (!save.gameState.managers) {
    save.gameState.managers = [];
  }
  
  // Add managerId and isManaged to existing employees
  save.gameState.developers = save.gameState.developers.map(dev => ({
    ...dev,
    managerId: dev.managerId || null,
    isManaged: dev.isManaged || false
  }));
  
  save.gameState.marketers = save.gameState.marketers.map(mkt => ({
    ...mkt,
    managerId: mkt.managerId || null,
    isManaged: mkt.isManaged || false
  }));
  
  save.version = "3.1";
  return save;
}
```

---

## 🛡️ Save Validation

### Validation Checks
```javascript
function validateSaveData(save) {
  // Check required fields
  if (!save.version) return false;
  if (!save.gameState) return false;
  if (!save.gameState.currency) return false;
  if (typeof save.gameState.currentDay !== 'number') return false;
  if (typeof save.gameState.cash !== 'number') return false;
  
  // Check data types
  if (!Array.isArray(save.gameState.products)) return false;
  if (!Array.isArray(save.gameState.developers)) return false;
  if (!Array.isArray(save.gameState.marketers)) return false;
  
  // Check founder
  if (!save.gameState.founder) return false;
  if (!save.gameState.founder.name) return false;
  
  return true;
}
```

---

## 🗂️ localStorage Management

### Storage Key
```javascript
const STORAGE_KEY = 'softwareCompanyGame';
```

### Save
```javascript
localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
```

### Load
```javascript
const savedData = localStorage.getItem(STORAGE_KEY);
const save = JSON.parse(savedData);
```

### Delete
```javascript
localStorage.removeItem(STORAGE_KEY);
```

### Check if Save Exists
```javascript
function hasSavedGame() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
```

---

## 🔄 Save Triggers

### Manual Save
- User clicks "Save" button
- Immediately saves current game state
- Shows success notification

### Auto-Save
```javascript
// During game tick
if (currentDay % 5 === 0 && currentDay > 0) {
  saveGame();
}
```

**Auto-save triggers:**
- Every 5 days of game time
- Silent save (no notification)
- Prevents progress loss during long sessions

### Save on Important Events (Not Implemented Yet)
```javascript
// Potential improvements:
- Save after hiring employee
- Save after publishing product
- Save after completing R&D
- Save before game reset (prompt)
```

---

## 🚨 Error Handling

### Save Errors

**Possible Causes:**
- localStorage quota exceeded (5-10MB limit)
- Private browsing mode (storage disabled)
- Browser security settings

**Error Handling:**
```javascript
try {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    showNotification('❌ Storage quota exceeded! Clear old saves.', 'error');
  } else {
    showNotification('❌ Save failed! Check browser settings.', 'error');
  }
}
```

---

### Load Errors

**Possible Causes:**
- Corrupted save data
- Invalid JSON format
- Missing required fields
- Version incompatibility

**Error Handling:**
```javascript
try {
  const save = JSON.parse(savedData);
  
  if (!validateSaveData(save)) {
    throw new Error('Invalid save format');
  }
  
  // Restore state...
  
} catch (error) {
  console.error('Load failed:', error);
  showNotification('❌ Save corrupted! Starting new game.', 'error');
  
  // Optionally: Attempt partial recovery
  // Or: Prompt user to export save for debugging
}
```

---

## 🔄 Migration Best Practices

### Rule 1: Never Delete Fields
```javascript
// ❌ BAD: Removes old field
function migrate(save) {
  delete save.gameState.oldField;
  return save;
}

// ✅ GOOD: Keeps old fields for backward compatibility
function migrate(save) {
  save.gameState.newField = save.gameState.oldField || defaultValue;
  // Keep oldField in case user loads in older version
  return save;
}
```

### Rule 2: Always Provide Defaults
```javascript
// ✅ GOOD: Safe defaults for new fields
managers = save.gameState.managers || [];
lifetimeEarnings = save.gameState.lifetimeEarnings || 0;
```

### Rule 3: Test Migrations
```javascript
// Test with saves from each previous version
testMigration("v1.0_save.json");
testMigration("v2.0_save.json");
testMigration("v3.0_save.json");
```

---

## 🧪 Testing Save/Load

### Unit Tests
```javascript
describe('Save System', () => {
  it('saves game state to localStorage', () => {
    saveGame();
    const saved = localStorage.getItem('softwareCompanyGame');
    expect(saved).toBeTruthy();
  });
  
  it('loads game state from localStorage', () => {
    saveGame();
    resetGame();
    const loaded = loadGame();
    expect(loaded).toBe(true);
    expect(currentDay).toBeGreaterThan(0);
  });
  
  it('handles missing save gracefully', () => {
    localStorage.removeItem('softwareCompanyGame');
    const loaded = loadGame();
    expect(loaded).toBe(false);
  });
});
```

### Integration Tests
```javascript
describe('Save/Load Integration', () => {
  it('preserves game state across save/load', () => {
    // Set up game state
    currentDay = 100;
    cash = 50000;
    hireEmployee('developer', 'junior', 'Test Dev');
    createProduct('Task Manager');
    
    // Save
    saveGame();
    
    // Reset state
    const savedProducts = products.length;
    const savedDevelopers = developers.length;
    resetGame();
    
    // Load
    loadGame();
    
    // Verify
    expect(currentDay).toBe(100);
    expect(cash).toBe(50000);
    expect(products.length).toBe(savedProducts);
    expect(developers.length).toBe(savedDevelopers);
  });
});
```

---

## 📦 Save Data Size

### Typical Save Sizes

**Early Game (Day 30):**
```
- 1 product, 2 employees
- ~2 KB
```

**Mid Game (Day 365):**
```
- 5 products, 10 employees, 2 R&D projects
- ~8 KB
```

**Late Game (Day 1000):**
```
- 15 products, 30 employees, 10 completed R&D
- ~25 KB
```

**localStorage Limit:** ~5-10 MB (browser-dependent)

**Max Capacity:** ~200-400 late-game saves

---

## 🔐 Data Privacy

### What's Saved Locally
- All game state (progress, employees, products)
- Company name
- Currency preference
- Event log

### What's NOT Saved
- UI state (open modals, filters)
- Temporary calculations
- Browser settings
- User identity

### Privacy Notes
- Data stays in browser (not sent to server)
- No account or authentication
- No cross-device sync
- Clearing browser data deletes saves

---

## 🚀 Future Enhancements

### Multiple Save Slots
```javascript
// Planned feature
SAVE_SLOTS = ['slot1', 'slot2', 'slot3'];

function saveGame(slotId = 'slot1') {
  const key = `softwareCompanyGame_${slotId}`;
  localStorage.setItem(key, JSON.stringify(saveData));
}

function loadGame(slotId = 'slot1') {
  const key = `softwareCompanyGame_${slotId}`;
  const savedData = localStorage.getItem(key);
  // ... load logic
}

function listSaveSlots() {
  return SAVE_SLOTS.map(slot => {
    const key = `softwareCompanyGame_${slot}`;
    const data = localStorage.getItem(key);
    
    if (data) {
      const save = JSON.parse(data);
      return {
        slot: slot,
        companyName: save.gameState.companyName,
        day: save.gameState.currentDay,
        cash: save.gameState.cash,
        timestamp: save.timestamp
      };
    }
    
    return { slot: slot, empty: true };
  });
}
```

---

### Cloud Save (Planned)
```javascript
// Future feature: Save to server for cross-device sync
async function saveToCloud(saveData) {
  const response = await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(saveData),
    headers: { 'Content-Type': 'application/json' }
  });
  
  return response.ok;
}

async function loadFromCloud(userId) {
  const response = await fetch(`/api/save/${userId}`);
  const saveData = await response.json();
  return saveData;
}
```

---

### Save Export/Import
```javascript
// Export save to file
function exportSave() {
  const saveData = createSaveData();
  const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `software-company-save-${Date.now()}.json`;
  a.click();
}

// Import save from file
function importSave(file) {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const saveData = JSON.parse(event.target.result);
      loadGameFromData(saveData);
    } catch (error) {
      showNotification('❌ Invalid save file!', 'error');
    }
  };
  
  reader.readAsText(file);
}
```

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation
- Current version: 3.1 (manager system)
