/* Nexus Luma AI Assistant - Corner Widget */
(function() {
  if (window.__NXL_CORNER_LOADED__) return;
  window.__NXL_CORNER_LOADED__ = true;

  // Create the floating chat icon
  var icon = document.createElement('div');
  icon.innerHTML = '💬';
  icon.style.cssText = 'position:fixed;bottom:20px;right:20px;width:60px;height:60px;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:28px;box-shadow:0 4px 20px rgba(76,195,255,0.5);z-index:999999;transition:all 0.3s ease;border:2px solid rgba(76,195,255,0.3);user-select:none;';
  
  // Create the corner popup (NOT FULLSCREEN)
  var popup = document.createElement('div');
  popup.style.cssText = 'position:fixed;bottom:90px;right:20px;width:380px;height:500px;background:rgba(13,13,21,0.95);border-radius:20px;box-shadow:0 10px 50px rgba(0,0,0,0.4);z-index:999998;display:none;border:1px solid rgba(76,195,255,0.4);overflow:hidden;backdrop-filter:blur(20px);';
  
  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.src = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';
  iframe.style.cssText = 'width:100%;height:100%;border:none;border-radius:20px;';
  iframe.allow = 'microphone';
  
  popup.appendChild(iframe);
  
  var isOpen = false;
  
  // Toggle function
  icon.onclick = function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    popup.style.display = isOpen ? 'block' : 'none';
    icon.innerHTML = isOpen ? '✕' : '💬';
  };
  
  // Close when clicking outside
  document.onclick = function(e) {
    if (isOpen && !icon.contains(e.target) && !popup.contains(e.target)) {
      isOpen = false;
      popup.style.display = 'none';
      icon.innerHTML = '💬';
    }
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
  
  // Mobile responsive
  if (window.innerWidth <= 768) {
    popup.style.width = 'calc(100vw - 40px)';
    popup.style.height = '70vh';
    popup.style.left = '20px';
  }
  
  // Add to page
  document.body.appendChild(icon);
  document.body.appendChild(popup);
})();