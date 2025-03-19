/**
 * Simple Storage Helper
 * Easy-to-use functions for persisting dashboard state
 */
const SimpleStorage = {
  /**
   * Save any data with a specific key
   * @param {string} key - Unique identifier for this data
   * @param {any} data - Data to be saved (will be JSON stringified)
   */
  save: function(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save data:", e);
      return false;
    }
  },
  
  /**
   * Load data by key
   * @param {string} key - Identifier for the data
   * @param {any} defaultValue - Default value if nothing is stored
   * @return {any} The stored data or defaultValue
   */
  load: function(key, defaultValue = null) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.error("Failed to load data:", e);
      return defaultValue;
    }
  },
  
  /**
   * Delete stored data by key
   * @param {string} key - Identifier for the data to delete
   */
  delete: function(key) {
    localStorage.removeItem(key);
  },
  
  /**
   * Save the checked state of checkboxes
   * @param {string} dashboardId - Identifier for the dashboard
   */
  saveCheckboxes: function(dashboardId) {
    const checkboxes = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      // Fix: Use data attributes as fallback if no ID exists
      const identifier = checkbox.id || checkbox.getAttribute('data-id') || checkbox.name;
      if (identifier) {
        checkboxes[identifier] = checkbox.checked;
      } else if (checkbox.closest('[id]')) {
        // Use parent element's ID + index as fallback
        const parentId = checkbox.closest('[id]').id;
        const siblings = Array.from(checkbox.parentNode.querySelectorAll('input[type="checkbox"]'));
        const index = siblings.indexOf(checkbox);
        checkboxes[`${parentId}-checkbox-${index}`] = checkbox.checked;
      }
    });
    this.save(`${dashboardId}-checkboxes`, checkboxes);
  },
  
  /**
   * Load and apply saved checkbox states
   * @param {string} dashboardId - Identifier for the dashboard
   */
  loadCheckboxes: function(dashboardId) {
    const saved = this.load(`${dashboardId}-checkboxes`, {});
    Object.keys(saved).forEach(id => {
      // Try to find checkbox by ID first
      let checkbox = document.getElementById(id);
      
      // If not found, try data-id attribute
      if (!checkbox) {
        checkbox = document.querySelector(`[data-id="${id}"]`);
      }
      
      // If not found, try name attribute
      if (!checkbox) {
        checkbox = document.querySelector(`[name="${id}"]`);
      }
      
      // If it's a parent-index format
      if (!checkbox && id.includes('-checkbox-')) {
        const [parentId, , index] = id.split('-');
        const parent = document.getElementById(parentId);
        if (parent) {
          const checkboxes = Array.from(parent.querySelectorAll('input[type="checkbox"]'));
          checkbox = checkboxes[parseInt(index)];
        }
      }
      
      if (checkbox) {
        checkbox.checked = saved[id];
        
        // Trigger change event to ensure any listeners are notified
        const event = new Event('change', { bubbles: true });
        checkbox.dispatchEvent(event);
      }
    });
  }
};

// Make available globally
window.SimpleStorage = SimpleStorage;
