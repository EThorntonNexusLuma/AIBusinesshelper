(function() {
  'use strict';
  
  // Prevent multiple instances
  if (window.nxlCornerWidgetLoaded) {
    console.log('[NXL Corner] Widget already loaded');
    return;
  }
  window.nxlCornerWidgetLoaded = true;
  
  // Configuration
  var HOST = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';
  var isOpen = false;
  var isProcessing = false;
  var clickTimeout = null;
  
  console.log('[NXL Corner] Initializing Nexus Luma Corner AI Assistant Widget...');
  
  // Create widget icon
  var icon = document.createElement('button');
  icon.id = 'nxl-corner-icon';
  icon.innerHTML = '💬';
  icon.type = 'button';
  icon.setAttribute('aria-label', 'Open Nexus Luma AI Assistant');
  icon.style.cssText = [
    'position: fixed !important',
    'bottom: 30px !important',
    'right: 30px !important',
    'width: 60px !important',
    'height: 60px !important',
    'border-radius: 50% !important',
    'background: linear-gradient(135deg, #1E3FFF 0%, #4CC3FF 50%, #7A3FFF 100%) !important',
    'color: white !important',
    'font-size: 24px !important',
    'border: none !important',
    'cursor: pointer !important',
    'z-index: 2147483647 !important',
    'box-shadow: 0 8px 32px rgba(30, 63, 255, 0.3) !important',
    'transition: all 0.3s ease !important',
    'display: flex !important',
    'align-items: center !important',
    'justify-content: center !important',
    'outline: none !important',
    'user-select: none !important',
    'font-family: Arial, sans-serif !important'
  ].join('; ');
  
  // Add hover effects
  icon.addEventListener('mouseenter', function() {
    icon.style.transform = 'scale(1.1)';
    icon.style.boxShadow = '0 12px 48px rgba(30, 63, 255, 0.4)';
  });
  
  icon.addEventListener('mouseleave', function() {
    icon.style.transform = 'scale(1)';
    icon.style.boxShadow = '0 8px 32px rgba(30, 63, 255, 0.3)';
  });
  
  console.log('[NXL Corner] Icon created');
  
  // Create the corner widget container (386x700px)
  var widgetContainer = document.createElement('div');
  widgetContainer.id = 'nxl-corner-container';
  widgetContainer.style.cssText = [
    'position: fixed !important',
    'bottom: 100px !important',
    'right: 30px !important',
    'width: 386px !important',
    'height: 700px !important',
    'background: white !important',
    'border-radius: 16px !important',
    'box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important',
    'z-index: 2147483646 !important',
    'display: none !important',
    'flex-direction: column !important',
    'overflow: hidden !important',
    'border: 2px solid rgba(30, 63, 255, 0.2) !important',
    'backdrop-filter: blur(10px) !important'
  ].join('; ');
  
  console.log('[NXL Corner] Container created');
  
  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.src = HOST;
  iframe.style.cssText = [
    'width: 100% !important',
    'height: 100% !important',
    'border: none !important',
    'border-radius: 14px !important',
    'background: white !important'
  ].join('; ');
  iframe.setAttribute('allow', 'microphone; camera; autoplay');
  iframe.setAttribute('title', 'Nexus Luma AI Assistant - Corner Widget');
  
  console.log('[NXL Corner] Iframe created');
  
  console.log('[NXL Corner] Using React component close button only');
  
  // Assemble the widget
  widgetContainer.appendChild(iframe);
  
  // Widget control functions
  function openCornerWidget() {
    console.log('[NXL Corner] === OPENING CORNER WIDGET ===');
    console.log('[NXL Corner] Current isOpen state:', isOpen);
    
    isOpen = true;
    widgetContainer.style.display = 'flex';
    icon.style.display = 'none';
    
    console.log('[NXL Corner] Corner widget opened');
    
    // Verify the changes
    setTimeout(function() {
      console.log('[NXL Corner] Widget display:', widgetContainer.style.display);
      console.log('[NXL Corner] Icon display:', icon.style.display);
      console.log('[NXL Corner] === CORNER WIDGET OPEN COMPLETE ===');
    }, 50);
  }
  
  function closeCornerWidget() {
    console.log('[NXL Corner] === CLOSING CORNER WIDGET ===');
    console.log('[NXL Corner] Current isOpen state:', isOpen);
    
    isOpen = false;
    widgetContainer.style.display = 'none';
    icon.style.display = 'flex';
    
    // Send close message to iframe to end any active calls
    try {
      iframe.contentWindow.postMessage('nxl:close', '*');
      console.log('[NXL Corner] Close message sent to iframe');
    } catch (e) {
      console.log('[NXL Corner] Could not send close message:', e);
    }
    
    console.log('[NXL Corner] Corner widget closed');
    
    // Verify the changes
    setTimeout(function() {
      console.log('[NXL Corner] Widget display:', widgetContainer.style.display);
      console.log('[NXL Corner] Icon display:', icon.style.display);
      console.log('[NXL Corner] === CORNER WIDGET CLOSE COMPLETE ===');
    }, 50);
  }
  
  // Debounced click handler
  function handleIconClick(e) {
    console.log('[NXL Corner] ╔═════════════════════════════════════╗');
    console.log('[NXL Corner] ║         CORNER CLICK HANDLER       ║');
    console.log('[NXL Corner] ╚═════════════════════════════════════╝');
    console.log('[NXL Corner] Event type:', e.type);
    console.log('[NXL Corner] Processing state:', isProcessing);
    console.log('[NXL Corner] Current isOpen state:', isOpen);
    
    if (isProcessing) {
      console.log('[NXL Corner] ⚠️  Already processing, ignoring event');
      return;
    }
    
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      console.log('[NXL Corner] 🔄 Cleared previous timeout');
    }
    
    clickTimeout = setTimeout(function() {
      isProcessing = true;
      console.log('[NXL Corner] 🔒 Processing click - LOCKED');
      
      e.preventDefault();
      e.stopPropagation();
      
      if (isOpen) {
        console.log('[NXL Corner] 📂 Widget is OPEN, initiating CLOSE...');
        closeCornerWidget();
      } else {
        console.log('[NXL Corner] 📁 Widget is CLOSED, initiating OPEN...');
        openCornerWidget();
      }
      
      setTimeout(function() {
        isProcessing = false;
        console.log('[NXL Corner] 🔓 Ready for next click - UNLOCKED');
        console.log('[NXL Corner] ═══════════════════════════════════════');
      }, 300);
      
    }, 100);
  }
  
  // Event listeners
  icon.addEventListener('click', handleIconClick);
  
  // React component handles close button
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      console.log('[NXL Corner] Escape key pressed, closing widget');
      closeCornerWidget();
    }
  });
  
  // Listen for close message from iframe
  window.addEventListener('message', function(e) {
    if (e.data === 'nxl:close' && isOpen) {
      console.log('[NXL Corner] Received close message from iframe');
      closeCornerWidget();
    }
  });
  
  // Add responsive behavior for mobile
  function handleResize() {
    var isMobile = window.innerWidth <= 768;
    if (isMobile) {
      widgetContainer.style.width = '320px';
      widgetContainer.style.height = '600px';
      widgetContainer.style.right = '10px';
      widgetContainer.style.bottom = '80px';
      icon.style.right = '20px';
      icon.style.bottom = '20px';
    } else {
      widgetContainer.style.width = '386px';
      widgetContainer.style.height = '700px';
      widgetContainer.style.right = '30px';
      widgetContainer.style.bottom = '100px';
      icon.style.right = '30px';
      icon.style.bottom = '30px';
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial call
  
  // Initialize widget by adding to DOM
  function initializeWidget() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(icon);
        document.body.appendChild(widgetContainer);
        console.log('[NXL Corner] Corner widget initialized and added to DOM');
      });
    } else {
      document.body.appendChild(icon);
      document.body.appendChild(widgetContainer);
      console.log('[NXL Corner] Corner widget initialized and added to DOM');
    }
  }
  
  initializeWidget();
  
  console.log('[NXL Corner] Nexus Luma Corner AI Assistant Widget loaded successfully!');
  
})();