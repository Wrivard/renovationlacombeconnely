class CookieBanner {
  constructor() {
    this.open = false;
    this.showPreferences = false;
    this.mounted = false;
    this.preferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };

    // Cookie provider details for Rénovation Lacombe Connely
    this.cookieProviders = {
      necessary: [
        {
          name: "Session Cookie",
          provider: "Rénovation Lacombe Connely",
          purpose: "Maintient votre session active lors de la navigation.",
          duration: "Session",
          type: "HTTP Cookie"
        }
      ],
      functional: [
        {
          name: "Language Preference",
          provider: "Rénovation Lacombe Connely",
          purpose: "Mémorise votre préférence de langue.",
          duration: "1 an",
          type: "HTTP Cookie"
        }
      ],
      analytics: [
        {
          name: "Google Analytics",
          provider: "Google LLC",
          purpose: "Analyse le trafic et l'utilisation du site web.",
          duration: "2 ans",
          type: "HTTP Cookie"
        }
      ],
      marketing: [
        {
          name: "Facebook Pixel",
          provider: "Meta Platforms Inc.",
          purpose: "Suivi des conversions et publicités ciblées.",
          duration: "90 jours",
          type: "HTTP Cookie"
        }
      ]
    };

    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.mount());
    } else {
      this.mount();
    }
  }

  mount() {
    this.mounted = true;
    
    const existingConsent = window.CookieUtils.getCookieConsent();
    if (existingConsent) {
      this.preferences = existingConsent;
      window.CookieUtils.applyConsentSettings(existingConsent);
    } else {
      this.open = true;
      this.render();
    }

    // Listen for preference opening events
    window.addEventListener("openCookiePreferences", () => {
      this.open = true;
      this.showPreferences = true;
      this.render();
    });
  }

  // Handle user interactions
  handleAcceptAll() {
    const acceptedPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    this.preferences = acceptedPreferences;
    window.CookieUtils.setCookieConsent(acceptedPreferences);
    
    if (acceptedPreferences.analytics) {
      window.dispatchEvent(new CustomEvent('analytics_consent_granted'));
    }
    
    this.open = false;
    this.remove();
  }

  handleRefuse() {
    const refusedPreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    this.preferences = refusedPreferences;
    window.CookieUtils.setCookieConsent(refusedPreferences);
    this.open = false;
    this.remove();
  }

  // Create banner HTML
  createBanner() {
    return `
      <div class="cookie-banner">
        <button onclick="cookieBanner.closeBanner()" class="cookie-banner-close" aria-label="Fermer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <p class="cookie-banner-text">
          En cliquant sur "Accepter", vous consentez à l'utilisation de cookies pour améliorer votre expérience, 
          analyser le trafic et personnaliser le contenu.
        </p>

        <div class="cookie-banner-actions">
          <div class="cookie-banner-buttons">
            <button onclick="cookieBanner.openPreferences()" class="cookie-btn cookie-btn-settings">Paramètres</button>
            <button onclick="cookieBanner.handleRefuse()" class="cookie-btn cookie-btn-refuse">Refuser</button>
            <button onclick="cookieBanner.handleAcceptAll()" class="cookie-btn cookie-btn-accept">Accepter</button>
          </div>
          <div class="cookie-banner-policy">
            <a href="/politique-de-cookie" class="cookie-policy-link-small">Politique de cookies</a>
          </div>
        </div>
      </div>
    `;
  }

  // Create preferences modal HTML
  createPreferencesModal() {
    return `
      <div class="cookie-modal-overlay" onclick="cookieBanner.closePreferences()"></div>
      <div class="cookie-preferences-modal">
        <div class="cookie-modal-header">
          <div class="cookie-modal-title">
            <span class="cookie-brand-bar"></span>
            <h3>Préférences de cookies</h3>
          </div>
          <button onclick="cookieBanner.closePreferences()" class="cookie-modal-close">×</button>
        </div>
        
        <div class="cookie-modal-content">
          <div class="cookie-categories">
            ${this.createCookieCategory('necessary', 'Nécessaires', '🔒', 'Ces cookies sont essentiels au fonctionnement du site web et ne peuvent pas être désactivés.')}
            ${this.createCookieCategory('functional', 'Fonctionnels', '⚙️', 'Ces cookies améliorent les fonctionnalités du site web et votre expérience utilisateur.')}
            ${this.createCookieCategory('analytics', 'Analytiques', '📊', 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web.')}
            ${this.createCookieCategory('marketing', 'Marketing', '📢', 'Ces cookies sont utilisés pour diffuser des publicités pertinentes et mesurer l\'efficacité des campagnes.')}
          </div>
        </div>
        
        <div class="cookie-modal-footer">
          <a href="/politique-de-cookie" class="cookie-policy-link">Politique de cookies</a>
          <div class="cookie-modal-buttons">
            <button onclick="cookieBanner.closePreferences()" class="cookie-btn cookie-btn-secondary">Annuler</button>
            <button onclick="cookieBanner.handleSavePreferences()" class="cookie-btn cookie-btn-primary">Sauvegarder</button>
          </div>
        </div>
      </div>
    `;
  }

  createCookieCategory(category, title, icon, description) {
    const isChecked = this.preferences[category];
    const isDisabled = category === 'necessary';
    
    return `
      <div class="cookie-category ${isDisabled ? 'disabled' : ''}">
        <div class="cookie-category-header">
          <div class="cookie-category-info">
            <span class="cookie-category-icon">${icon}</span>
            <div>
              <h4 class="cookie-category-title">${title}</h4>
              <p class="cookie-category-description">${description}</p>
            </div>
          </div>
          <div class="cookie-toggle">
            <input type="checkbox" 
                   id="cookie-${category}" 
                   ${isChecked ? 'checked' : ''} 
                   ${isDisabled ? 'disabled' : ''}
                   onchange="cookieBanner.toggleCategory('${category}')">
            <label for="cookie-${category}" class="cookie-toggle-label"></label>
          </div>
        </div>
        <div class="cookie-providers">
          ${this.cookieProviders[category].map(provider => `
            <div class="cookie-provider">
              <div class="cookie-provider-name">${provider.name}</div>
              <div class="cookie-provider-details">
                <span class="cookie-provider-company">${provider.provider}</span>
                <span class="cookie-provider-duration">${provider.duration}</span>
              </div>
              <div class="cookie-provider-purpose">${provider.purpose}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  toggleCategory(category) {
    if (category === 'necessary') return; // Can't disable necessary cookies
    
    this.preferences[category] = !this.preferences[category];
  }

  handleSavePreferences() {
    window.CookieUtils.setCookieConsent(this.preferences);
    
    if (this.preferences.analytics) {
      window.dispatchEvent(new CustomEvent('analytics_consent_granted'));
    }
    
    this.open = false;
    this.showPreferences = false;
    this.remove();
  }

  openPreferences() {
    this.showPreferences = true;
    this.render();
  }

  closePreferences() {
    this.showPreferences = false;
    this.render();
  }

  closeBanner() {
    this.open = false;
    this.remove();
  }

  render() {
    if (!this.mounted || !this.open) return;

    this.remove();
    const container = document.createElement('div');
    container.id = 'cookie-banner-container';
    
    if (this.showPreferences) {
      container.innerHTML = this.createPreferencesModal();
    } else {
      container.innerHTML = this.createBanner();
    }

    document.body.appendChild(container);
  }

  remove() {
    const existing = document.getElementById('cookie-banner-container');
    if (existing) existing.remove();
  }
}

// Initialize globally
document.addEventListener('DOMContentLoaded', function() {
  window.cookieBanner = new CookieBanner();
});
