class GTMIntegration {
  constructor(gtmId = null) {
    this.gtmId = gtmId || 'GTM-XXXXXXX'; // Replace with your GTM ID
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    
    window.gtag = gtag;
    
    // Set default consent before GTM loads
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    });
    
    // Apply existing consent
    const existingConsent = window.CookieUtils ? window.CookieUtils.getCookieConsent() : null;
    if (existingConsent) {
      this.applyConsentSettings(existingConsent);
    }

    // Load GTM script
    this.loadGTMScript();
  }

  loadGTMScript() {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${this.gtmId}');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
}

// Initialize GTM Integration
document.addEventListener('DOMContentLoaded', function() {
  const gtmId = window.GTM_ID || 'GTM-XXXXXXX'; // Replace with your GTM ID
  window.gtmIntegration = new GTMIntegration(gtmId);
});
