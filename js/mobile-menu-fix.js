// Mobile menu fixes - JavaScript approach
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on mobile or tablet
  function isMobileOrTablet() {
    return window.innerWidth <= 991;
  }
  
  // Fix Soumission button styling
  function fixSoumissionButton() {
    if (!isMobileOrTablet()) return;
    
    // Target the mobile menu button specifically
    const soumissionButton = document.querySelector('.navbar3_tablet-menu-button');
    if (soumissionButton) {
      soumissionButton.style.background = 'linear-gradient(135deg, #d3af37, #b8941f)';
      soumissionButton.style.backgroundColor = '#d3af37';
      soumissionButton.style.color = '#000000';
      soumissionButton.style.border = '2px solid #d3af37';
      soumissionButton.style.boxShadow = '0 4px 12px rgba(211, 175, 55, 0.4)';
      soumissionButton.style.borderRadius = '8px';
      soumissionButton.style.fontWeight = '700';
      soumissionButton.style.padding = '12px 24px';
    }
    
    // Also target any w-button in the mobile menu
    const menuButtons = document.querySelectorAll('.navbar3_menu .w-button');
    menuButtons.forEach(button => {
      if (button.textContent.trim() === 'Soumission') {
        button.style.background = 'linear-gradient(135deg, #d3af37, #b8941f)';
        button.style.backgroundColor = '#d3af37';
        button.style.color = '#000000';
        button.style.border = '2px solid #d3af37';
        button.style.boxShadow = '0 4px 12px rgba(211, 175, 55, 0.4)';
        button.style.borderRadius = '8px';
        button.style.fontWeight = '700';
        button.style.padding = '12px 24px';
      }
    });
  }
  
  // Fix current page text color
  function fixCurrentPageText() {
    if (!isMobileOrTablet()) return;
    
    const currentLink = document.querySelector('.navbar3_link.w--current');
    if (currentLink) {
      currentLink.style.color = '#ffffff';
      currentLink.style.backgroundColor = 'rgba(211, 175, 55, 0.2)';
      currentLink.style.borderRadius = '4px';
      currentLink.style.padding = '8px 12px';
    }
    
    // Fix Services dropdown current page items
    const servicesDropdownLinks = document.querySelectorAll('.navbar3_dropdown-list .navbar3_dropdown-link');
    servicesDropdownLinks.forEach(link => {
      if (link.classList.contains('w--current')) {
        link.style.color = '#ffffff';
        link.style.backgroundColor = 'rgba(211, 175, 55, 0.2)';
        link.style.borderRadius = '4px';
        link.style.padding = '8px 12px';
      } else {
        link.style.color = '#ffffff';
      }
    });
    
    // Fix all navbar links
    const allLinks = document.querySelectorAll('.navbar3_link');
    allLinks.forEach(link => {
      link.style.color = '#ffffff';
    });
    
    // Fix all dropdown links (comprehensive targeting)
    const allDropdownLinks = document.querySelectorAll('.navbar3_dropdown-link, .w-dropdown-link');
    allDropdownLinks.forEach(link => {
      if (link.classList.contains('w--current')) {
        link.style.color = '#ffffff';
        link.style.backgroundColor = 'rgba(211, 175, 55, 0.2)';
        link.style.borderRadius = '4px';
        link.style.padding = '8px 12px';
      } else {
        link.style.color = '#ffffff';
      }
    });
  }
  
  // Fix banner z-index
  function fixBannerZIndex() {
    if (!isMobileOrTablet()) return;
    
    const banner = document.querySelector('.banner9_component');
    if (banner) {
      banner.style.zIndex = '-1';
      banner.style.position = 'relative';
    }
    
    // Fix all banner elements
    const bannerElements = banner ? banner.querySelectorAll('*') : [];
    bannerElements.forEach(element => {
      element.style.zIndex = '-1';
    });
  }
  
  // Run fixes
  fixSoumissionButton();
  fixCurrentPageText();
  fixBannerZIndex();
  
  // Re-run on window resize
  window.addEventListener('resize', function() {
    if (isMobileOrTablet()) {
      fixSoumissionButton();
      fixCurrentPageText();
      fixBannerZIndex();
    }
  });
});
