/* Nexus Luma AI Assistant - Embed Widget */
(function() {
  if (window.__NXL_EMBED_LOADED__) return;
  window.__NXL_EMBED_LOADED__ = true;

  // Your GitHub Pages URL
  var HOST = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';

  // Create the floating icon
  var icon = document.createElement('div');
  icon.innerHTML = '💬';
  icon.style.cssText = 'position:fixed!important;bottom:30px!important;right:30px!important;width:70px!important;height:70px!important;border-radius:50%!important;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)!important;color:white!important;font-size:32px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:999999!important;box-shadow:0 8px 32px rgba(76,195,255,0.5)!important;transition:all 0.3s ease!important;border:2px solid rgba(76,195,255,0.3)!important;backdrop-filter:blur(10px)!important;';
  
  // Create the corner popup container
  var popup = document.createElement('div');
  popup.style.cssText = 'position:fixed!important;bottom:100px!important;right:20px!important;width:380px!important;height:500px!important;background:rgba(13,13,21,0.95)!important;border-radius:20px!important;box-shadow:0 10px 50px rgba(0,0,0,0.4)!important;z-index:999998!important;display:none!important;border:1px solid rgba(76,195,255,0.4)!important;overflow:hidden!important;backdrop-filter:blur(20px)!important;';
  
  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.src = HOST;
  iframe.style.cssText = 'width:100%!important;height:100%!important;border:none!important;border-radius:20px!important;';
  iframe.allow = 'microphone; camera; autoplay';
  
  popup.appendChild(iframe);

  // Toggle function
  function toggle() {
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
      icon.innerHTML = '✕';
    } else {
      popup.style.display = 'none';
      icon.innerHTML = '💬';
    }
  }

  // Event listeners
  icon.addEventListener('click', toggle);
  
  // Listen for close message from iframe
  window.addEventListener('message', function(e) {
    if (e.data === 'nxl:close') {
      popup.style.display = 'none';
      icon.innerHTML = '💬';
    }
  });

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (popup.style.display === 'block' && !icon.contains(e.target) && !popup.contains(e.target)) {
      popup.style.display = 'none';
      icon.innerHTML = '💬';
    }
  });

  // Mobile responsiveness
  if (window.innerWidth <= 768) {
    popup.style.width = 'calc(100vw - 40px)';
    popup.style.height = '70vh';
    popup.style.right = '20px';
    popup.style.left = '20px';
  }

  // Append to body
  document.body.appendChild(icon);
  document.body.appendChild(popup);

  // Enhanced hover effects
  icon.addEventListener('mouseenter', function() {
    icon.style.transform = 'scale(1.15)';
    icon.style.boxShadow = '0 12px 40px rgba(76,195,255,0.7)';
    icon.style.background = 'linear-gradient(135deg,#4CC3FF,#1E3FFF,#7A3FFF)';
  });
  
  icon.addEventListener('mouseleave', function() {
    icon.style.transform = 'scale(1)';
    icon.style.boxShadow = '0 8px 32px rgba(76,195,255,0.5)';
    icon.style.background = 'linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)';
  });

})();