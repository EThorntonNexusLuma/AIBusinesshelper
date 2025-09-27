/* Nexus Luma AI Assistant - Reliable Embed Widget */
(function() {
  // Debug logging
  console.log('[NXL] Starting widget initialization...');
  
  // Prevent multiple widgets
  if (window.__NXL_EMBED_LOADED__) {
    console.log('[NXL] Widget already loaded, skipping');
    return;
  }
  window.__NXL_EMBED_LOADED__ = true;

  // Configuration
  var HOST = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';
  var isOpen = false;

  // Create the floating icon with simplified approach
  var icon = document.createElement('button');
  icon.id = 'nxl-chat-icon';
  icon.innerHTML = '💬';
  icon.type = 'button';
  icon.setAttribute('aria-label', 'Open Nexus Luma AI Assistant');
  
  // Apply styles directly
  icon.style.position = 'fixed';
  icon.style.bottom = '30px';
  icon.style.right = '30px';
  icon.style.width = '70px';
  icon.style.height = '70px';
  icon.style.borderRadius = '50%';
  icon.style.background = 'linear-gradient(135deg, #1E3FFF, #4CC3FF, #7A3FFF)';
  icon.style.color = 'white';
  icon.style.fontSize = '32px';
  icon.style.display = 'flex';
  icon.style.alignItems = 'center';
  icon.style.justifyContent = 'center';
  icon.style.cursor = 'pointer';
  icon.style.zIndex = '2147483647';
  icon.style.boxShadow = '0 8px 32px rgba(76, 195, 255, 0.5)';
  icon.style.transition = 'all 0.3s ease';
  icon.style.border = '2px solid rgba(76, 195, 255, 0.3)';
  icon.style.userSelect = 'none';
  icon.style.fontFamily = 'Arial, sans-serif';
  icon.style.pointerEvents = 'auto';
  icon.style.touchAction = 'manipulation';
  icon.style.outline = 'none';
  
  console.log('[NXL] Chat icon created with ID:', icon.id);
  
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
    console.log('[NXL] Opening widget...');
    isOpen = true;
    iframeContainer.style.display = 'block';
    icon.style.display = 'none';
    document.body.style.overflow = 'hidden';
    console.log('[NXL] Widget opened successfully');
  }

  function closeWidget() {
    console.log('[NXL] Closing widget...');
    isOpen = false;
    iframeContainer.style.display = 'none';
    icon.style.display = 'flex';
    document.body.style.overflow = '';
    console.log('[NXL] Widget closed successfully');
  }

  // Reliable event handling
  function handleIconClick(e) {
    console.log('[NXL] Icon clicked! Event type:', e.type);
    e.preventDefault();
    e.stopPropagation();
    
    if (isOpen) {
      console.log('[NXL] Widget already open, closing...');
      closeWidget();
    } else {
      console.log('[NXL] Opening widget...');
      openWidget();
    }
  }

  // Multiple event types for maximum compatibility
  icon.onclick = handleIconClick;
  icon.addEventListener('click', handleIconClick, true);
  icon.addEventListener('mouseup', handleIconClick);
  icon.addEventListener('touchend', function(e) {
    e.preventDefault();
    handleIconClick(e);
  });
  
  console.log('[NXL] Event listeners attached to icon');

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

  // Add to DOM with thorough debugging
  function addToDom() {
    console.log('[NXL] Adding widget to DOM...');
    console.log('[NXL] Document ready state:', document.readyState);
    
    try {
      document.body.appendChild(icon);
      document.body.appendChild(iframeContainer);
      
      // Force reflow
      icon.offsetHeight;
      
      console.log('[NXL] Widget added to DOM successfully');
      console.log('[NXL] Icon element:', icon);
      console.log('[NXL] Icon display:', getComputedStyle(icon).display);
      console.log('[NXL] Icon position:', getComputedStyle(icon).position);
      console.log('[NXL] Icon z-index:', getComputedStyle(icon).zIndex);
      console.log('[NXL] Icon pointer-events:', getComputedStyle(icon).pointerEvents);
      
      // Test click programmatically
      setTimeout(function() {
        console.log('[NXL] Widget ready for interaction');
        console.log('[NXL] To test, run: document.getElementById("nxl-chat-icon").click()');
      }, 1000);
      
    } catch (error) {
      console.error('[NXL] Error adding widget to DOM:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToDom);
  } else {
    // Add immediately if DOM is ready
    addToDom();
  }

})();