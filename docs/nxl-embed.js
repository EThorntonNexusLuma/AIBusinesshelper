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
  icon.setAttribute('aria-expanded', 'false');
  
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
  
  // Create the iframe container for corner widget
  var iframeContainer = document.createElement('div');
  iframeContainer.id = 'nxl-iframe-container';
  iframeContainer.setAttribute('role', 'region');
  iframeContainer.setAttribute('aria-label', 'Nexus Luma AI Assistant');
  
  // Corner styles
  iframeContainer.style.position = 'fixed';
  iframeContainer.style.bottom = '30px';
  iframeContainer.style.right = '30px';
  iframeContainer.style.width = '370px';
  iframeContainer.style.height = '520px';
  iframeContainer.style.zIndex = '2147483646'; // Just below icon
  iframeContainer.style.display = 'none';
  iframeContainer.style.background = '#fff';
  iframeContainer.style.borderRadius = '14px';
  iframeContainer.style.boxShadow = '0 20px 60px rgba(0,0,0,0.14)';
  iframeContainer.style.pointerEvents = 'auto';
  iframeContainer.style.overflow = 'hidden';
  iframeContainer.style.transition = 'transform 240ms ease, opacity 200ms ease';
  iframeContainer.style.transform = 'translateY(8px)';
  iframeContainer.style.opacity = '0';
  
  console.log('[NXL] Iframe container created');

  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.src = HOST;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.background = 'white';
  iframe.setAttribute('allow', 'microphone; camera; autoplay');
  iframe.setAttribute('title', 'Nexus Luma AI Assistant');
  
  console.log('[NXL] Iframe created with source:', HOST);

  console.log('[NXL] Using React component close button only');

  // Assemble components
  iframeContainer.appendChild(iframe);

  // Widget control functions with detailed logging
  function openWidget() {
    console.log('[NXL] === OPENING WIDGET ===');
    console.log('[NXL] Current isOpen state:', isOpen);
    
    isOpen = true;
    
    // Force visibility with multiple properties
    iframeContainer.style.display = 'block';
    iframeContainer.style.visibility = 'visible';
    iframeContainer.style.opacity = '1';
    iframeContainer.style.zIndex = '2147483646';
    
    // Hide icon
    icon.style.display = 'none';
    icon.style.visibility = 'hidden';
    icon.style.opacity = '0';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    console.log('[NXL] Widget styles applied - forcing visibility');
    
    // Verify the changes with comprehensive logging
    setTimeout(function() {
      console.log('[NXL] === VERIFICATION ===');
      console.log('[NXL] Container display:', iframeContainer.style.display);
      console.log('[NXL] Container visibility:', iframeContainer.style.visibility);
      console.log('[NXL] Container opacity:', iframeContainer.style.opacity);
      console.log('[NXL] Container zIndex:', iframeContainer.style.zIndex);
      console.log('[NXL] Icon display:', icon.style.display);
      console.log('[NXL] Icon visibility:', icon.style.visibility);
      console.log('[NXL] Icon opacity:', icon.style.opacity);
      console.log('[NXL] Body overflow:', document.body.style.overflow);
      console.log('[NXL] isOpen state:', isOpen);
      
      // Check if container is actually in DOM
      var containerInDOM = document.body.contains(iframeContainer);
      console.log('[NXL] Container in DOM:', containerInDOM);
      
      // Get computed styles
      var computedStyle = window.getComputedStyle(iframeContainer);
      console.log('[NXL] Computed display:', computedStyle.display);
      console.log('[NXL] Computed visibility:', computedStyle.visibility);
      console.log('[NXL] Computed opacity:', computedStyle.opacity);
      
      console.log('[NXL] === WIDGET OPEN COMPLETE ===');
    }, 50);
  }

  function closeWidget() {
    console.log('[NXL] === CLOSING WIDGET ===');
    console.log('[NXL] Current isOpen state:', isOpen);
    
    isOpen = false;
    
    // Send close message to iframe to end any active calls
    try {
      iframe.contentWindow.postMessage('nxl:close', '*');
      console.log('[NXL] Close message sent to iframe to end calls');
    } catch (e) {
      console.log('[NXL] Could not send close message:', e);
    }
    
    // Force hide container with multiple properties
    iframeContainer.style.display = 'none';
    iframeContainer.style.visibility = 'hidden';
    iframeContainer.style.opacity = '0';
    
    // Show icon
    icon.style.display = 'flex';
    icon.style.visibility = 'visible';
    icon.style.opacity = '1';
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    console.log('[NXL] Widget styles applied - forcing hidden');
    
    // Verify the changes with comprehensive logging
    setTimeout(function() {
      console.log('[NXL] === CLOSE VERIFICATION ===');
      console.log('[NXL] Container display:', iframeContainer.style.display);
      console.log('[NXL] Container visibility:', iframeContainer.style.visibility);
      console.log('[NXL] Container opacity:', iframeContainer.style.opacity);
      console.log('[NXL] Icon display:', icon.style.display);
      console.log('[NXL] Icon visibility:', icon.style.visibility);
      console.log('[NXL] Icon opacity:', icon.style.opacity);
      console.log('[NXL] Body overflow:', document.body.style.overflow);
      console.log('[NXL] isOpen state:', isOpen);
      
      // Get computed styles
      var computedStyle = window.getComputedStyle(iframeContainer);
      console.log('[NXL] Computed display:', computedStyle.display);
      console.log('[NXL] Computed visibility:', computedStyle.visibility);
      console.log('[NXL] Computed opacity:', computedStyle.opacity);
      
      console.log('[NXL] === WIDGET CLOSE COMPLETE ===');
    }, 50);
  }

  // Debounced click handling to prevent multiple rapid events
  var clickTimeout = null;
  var isProcessing = false;

  function handleIconClick(e) {
    console.log('[NXL] ╔══════════════════════════════════════╗');
    console.log('[NXL] ║            CLICK HANDLER             ║');
    console.log('[NXL] ╚══════════════════════════════════════╝');
    console.log('[NXL] Event type:', e.type);
    console.log('[NXL] Processing state:', isProcessing);
    console.log('[NXL] Current isOpen state:', isOpen);
    console.log('[NXL] Icon visibility:', icon.style.display);
    console.log('[NXL] Container visibility:', iframeContainer.style.display);
    
    // Prevent duplicate events
    if (isProcessing) {
      console.log('[NXL] ⚠️  Already processing, ignoring event');
      return;
    }
    
    // Clear any existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      console.log('[NXL] 🔄 Cleared previous timeout');
    }
    
    // Debounce the click
    clickTimeout = setTimeout(function() {
      isProcessing = true;
      console.log('[NXL] 🔒 Processing click - LOCKED');
      
      e.preventDefault();
      e.stopPropagation();
      
      if (isOpen) {
        console.log('[NXL] 📂 Widget is OPEN, initiating CLOSE...');
        closeWidget();
      } else {
        console.log('[NXL] 📁 Widget is CLOSED, initiating OPEN...');
        openWidget();
      }
      
      // Reset processing flag after a short delay
      setTimeout(function() {
        isProcessing = false;
        console.log('[NXL] 🔓 Ready for next click - UNLOCKED');
        console.log('[NXL] ═══════════════════════════════════════');
      }, 500);
      
    }, 100); // 100ms debounce delay
  }

  // Single, reliable event listener
  icon.addEventListener('click', handleIconClick);
  
  console.log('[NXL] Click event listener attached to icon');

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

  // React component handles close button styling

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