class CookiePreferencesButton {
  constructor(containerId = null) {
    this.containerId = containerId;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.render());
    } else {
      this.render();
    }
  }

  render() {
    const container = this.containerId ? 
      document.getElementById(this.containerId) : 
      this.createDefaultContainer();

    if (!container) return;

    const button = document.createElement('button');
    button.className = 'cookie-preferences-button';
    button.textContent = 'Gérer les cookies';
    button.setAttribute('aria-label', 'Ouvrir les préférences de cookies');
    
    button.addEventListener('click', () => {
      const event = new CustomEvent("openCookiePreferences");
      window.dispatchEvent(event);
    });

    container.appendChild(button);
  }

  createDefaultContainer() {
    let container = document.getElementById('cookie-preferences-button-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cookie-preferences-button-container';
      document.body.appendChild(container);
    }
    return container;
  }
}

// Global initialization
window.createCookiePreferencesButton = function(containerId) {
  return new CookiePreferencesButton(containerId);
};
