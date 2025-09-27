/* Nexus Luma AI Assistant - Corner Widget */
(function() {
  if (window.__NXL_CORNER_LOADED__) return;
  window.__NXL_CORNER_LOADED__ = true;

  // Create the floating chat icon
  var icon = document.createElement('div');
  icon.innerHTML = '💬';
  icon.style.cssText = 'position:fixed;bottom:20px;right:20px;width:60px;height:60px;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:28px;box-shadow:0 4px 20px rgba(76,195,255,0.5);z-index:999999;transition:all 0.3s ease;border:2px solid rgba(76,195,255,0.3);user-select:none;';
  
  // Create the fullscreen popup
  var popup = document.createElement('div');
  popup.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(13,13,21,0.98);z-index:999998;display:none;backdrop-filter:blur(20px);';
  
  // Create close button
  var closeBtn = document.createElement('div');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = 'position:absolute;top:20px;right:20px;width:50px;height:50px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:24px;color:white;z-index:999999;transition:all 0.3s ease;border:2px solid rgba(76,195,255,0.3);backdrop-filter:blur(10px);';
  
  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.src = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';
  iframe.style.cssText = 'width:100%;height:100%;border:none;';
  iframe.allow = 'microphone';
  
  popup.appendChild(closeBtn);
  popup.appendChild(iframe);
  
  var isOpen = false;
  
  // Open widget function
  function openWidget() {
    isOpen = true;
    popup.style.display = 'block';
    icon.style.display = 'none';
    // Smooth fade-in animation
    popup.style.opacity = '0';
    setTimeout(function() {
      popup.style.transition = 'opacity 0.3s ease';
      popup.style.opacity = '1';
    }, 10);
  }
  
  // Close widget function
  function closeWidget() {
    isOpen = false;
    popup.style.opacity = '0';
    setTimeout(function() {
      popup.style.display = 'none';
      icon.style.display = 'flex';
      icon.innerHTML = '💬';
    }, 300);
  }
  
  // Event listeners
  icon.onclick = function(e) {
    e.stopPropagation();
    openWidget();
  };
  
  closeBtn.onclick = function(e) {
    e.stopPropagation();
    closeWidget();
  };
  
  // Close button hover effects
  closeBtn.onmouseenter = function() {
    closeBtn.style.background = 'rgba(255,255,255,0.2)';
    closeBtn.style.transform = 'scale(1.1)';
  };
  
  closeBtn.onmouseleave = function() {
    closeBtn.style.background = 'rgba(255,255,255,0.1)';
    closeBtn.style.transform = 'scale(1)';
  };
  
  // Hover effects
  icon.onmouseenter = function() {
    icon.style.transform = 'scale(1.1)';
    icon.style.boxShadow = '0 6px 30px rgba(76,195,255,0.7)';
  };
  
  icon.onmouseleave = function() {
    icon.style.transform = 'scale(1)';
    icon.style.boxShadow = '0 4px 20px rgba(76,195,255,0.5)';
  };
  
  // Add to page
  document.body.appendChild(icon);
  document.body.appendChild(popup);
})();