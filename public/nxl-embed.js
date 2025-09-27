/* Nexus Luma AI Assistant - Clean Embed Widget */
(function() {
  // Prevent multiple widgets
  if (window.__NXL_EMBED_LOADED__) return;
  window.__NXL_EMBED_LOADED__ = true;

  // Configuration
  var HOST = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';
  var isOpen = false;

  // Create the floating icon
  var icon = document.createElement('div');
  icon.id = 'nxl-chat-icon';
  icon.innerHTML = '💬';
  icon.style.cssText = [
    'position: fixed !important',
    'bottom: 30px !important',
    'right: 30px !important',
    'width: 70px !important',
    'height: 70px !important',
    'border-radius: 50% !important',
    'background: linear-gradient(135deg, #1E3FFF, #4CC3FF, #7A3FFF) !important',
    'color: white !important',
    'font-size: 32px !important',
    'display: flex !important',
    'align-items: center !important',
    'justify-content: center !important',
    'cursor: pointer !important',
    'z-index: 2147483647 !important',
    'box-shadow: 0 8px 32px rgba(76, 195, 255, 0.5) !important',
    'transition: all 0.3s ease !important',
    'border: 2px solid rgba(76, 195, 255, 0.3) !important',
    'backdrop-filter: blur(10px) !important',
    'user-select: none !important',
    'font-family: Arial, sans-serif !important',
    'pointer-events: auto !important',
    'touch-action: manipulation !important'
  ].join('; ');
  
  // Create the iframe container
  var iframeContainer = document.createElement('div');
  iframeContainer.id = 'nxl-iframe-container';
  iframeContainer.style.cssText = [
    'position: fixed !important',
    'top: 0 !important',
    'left: 0 !important',
    'width: 100vw !important',
    'height: 100vh !important',
    'z-index: 999998 !important',
    'display: none !important',
    'background: rgba(0, 0, 0, 0.8) !important'
  ].join('; ');

  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.src = HOST;
  iframe.style.cssText = [
    'width: 100% !important',
    'height: 100% !important',
    'border: none !important',
    'background: white !important'
  ].join('; ');
  iframe.setAttribute('allow', 'microphone; camera; autoplay');
  iframe.setAttribute('title', 'Nexus Luma AI Assistant');

  // Create close button
  var closeButton = document.createElement('div');
  closeButton.id = 'nxl-close-button';
  closeButton.innerHTML = '✕';
  closeButton.style.cssText = [
    'position: absolute !important',
    'top: 20px !important',
    'right: 20px !important',
    'width: 50px !important',
    'height: 50px !important',
    'border-radius: 50% !important',
    'background: rgba(255, 255, 255, 0.9) !important',
    'color: #333 !important',
    'font-size: 24px !important',
    'display: flex !important',
    'align-items: center !important',
    'justify-content: center !important',
    'cursor: pointer !important',
    'z-index: 999999 !important',
    'box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important',
    'transition: all 0.3s ease !important',
    'user-select: none !important',
    'font-family: Arial, sans-serif !important',
    'font-weight: bold !important'
  ].join('; ');

  // Assemble components
  iframeContainer.appendChild(iframe);
  iframeContainer.appendChild(closeButton);

  // Toggle function
  function openWidget() {
    isOpen = true;
    iframeContainer.style.display = 'block !important';
    icon.style.display = 'none !important';
    document.body.style.overflow = 'hidden';
  }

  function closeWidget() {
    isOpen = false;
    iframeContainer.style.display = 'none !important';
    icon.style.display = 'flex !important';
    document.body.style.overflow = '';
  }

  // Event listeners with enhanced clickability
  function handleIconClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('NXL Widget: Icon clicked');
    openWidget();
  }

  icon.addEventListener('click', handleIconClick);
  icon.addEventListener('touchend', handleIconClick);
  icon.addEventListener('mousedown', function(e) {
    e.preventDefault();
  });

  closeButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeWidget();
  });

  // Close on background click
  iframeContainer.addEventListener('click', function(e) {
    if (e.target === iframeContainer) {
      closeWidget();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      closeWidget();
    }
  });

  // Listen for close message from iframe
  window.addEventListener('message', function(e) {
    if (e.data === 'nxl:close') {
      closeWidget();
    }
  });

  // Enhanced hover effects for icon
  icon.addEventListener('mouseenter', function() {
    if (!isOpen) {
      icon.style.transform = 'scale(1.15) !important';
      icon.style.boxShadow = '0 12px 40px rgba(76, 195, 255, 0.7) !important';
      icon.style.background = 'linear-gradient(135deg, #4CC3FF, #1E3FFF, #7A3FFF) !important';
    }
  });
  
  icon.addEventListener('mouseleave', function() {
    if (!isOpen) {
      icon.style.transform = 'scale(1) !important';
      icon.style.boxShadow = '0 8px 32px rgba(76, 195, 255, 0.5) !important';
      icon.style.background = 'linear-gradient(135deg, #1E3FFF, #4CC3FF, #7A3FFF) !important';
    }
  });

  // Close button hover effects
  closeButton.addEventListener('mouseenter', function() {
    closeButton.style.background = 'rgba(255, 255, 255, 1) !important';
    closeButton.style.transform = 'scale(1.1) !important';
    closeButton.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4) !important';
  });

  closeButton.addEventListener('mouseleave', function() {
    closeButton.style.background = 'rgba(255, 255, 255, 0.9) !important';
    closeButton.style.transform = 'scale(1) !important';
    closeButton.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3) !important';
  });

  // Add to DOM when ready
  function addToDom() {
    console.log('NXL Widget: Adding to DOM');
    document.body.appendChild(icon);
    document.body.appendChild(iframeContainer);
    
    // Force a reflow to ensure styles are applied
    icon.offsetHeight;
    
    console.log('NXL Widget: Added successfully. Icon visibility:', getComputedStyle(icon).display);
    console.log('NXL Widget: Icon position:', getComputedStyle(icon).position);
    console.log('NXL Widget: Icon z-index:', getComputedStyle(icon).zIndex);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToDom);
  } else {
    // Add a small delay to ensure page is fully rendered
    setTimeout(addToDom, 100);
  }

})();