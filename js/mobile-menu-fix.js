// Mobile menu fixes - JavaScript approach
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 767;
  }
  
  // Fix Soumission button styling
  function fixSoumissionButton() {
    if (!isMobile()) return;
    
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
  }
  
  // Fix current page text color
  function fixCurrentPageText() {
    if (!isMobile()) return;
    
    const currentLink = document.querySelector('.navbar3_link.w--current');
    if (currentLink) {
      currentLink.style.color = '#ffffff';
      currentLink.style.backgroundColor = 'rgba(211, 175, 55, 0.2)';
      currentLink.style.borderRadius = '4px';
      currentLink.style.padding = '8px 12px';
    }
    
    // Fix Services dropdown current page items
    const servicesDropdownLinks = document.querySelectorAll('.navbar3_dropdown-list .navbar3_link');
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
  }
  
  // Fix banner z-index
  function fixBannerZIndex() {
    if (!isMobile()) return;
    
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
    if (isMobile()) {
      fixSoumissionButton();
      fixCurrentPageText();
      fixBannerZIndex();
    }
  });
});
