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
  
  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.src = HOST;
  iframe.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;border:none!important;z-index:999998!important;display:none!important;';
  iframe.allow = 'microphone; camera; autoplay';

  // Toggle function
  function toggle() {
    if (iframe.style.display === 'none') {
      iframe.style.display = 'block';
      icon.style.display = 'none';
    } else {
      iframe.style.display = 'none';
      icon.style.display = 'flex';
    }
  }

  // Event listeners
  icon.addEventListener('click', toggle);
  
  // Listen for close message from iframe
  window.addEventListener('message', function(e) {
    if (e.data === 'nxl:close') {
      iframe.style.display = 'none';
      icon.style.display = 'flex';
    }
  });

  // Append to body
  document.body.appendChild(icon);
  document.body.appendChild(iframe);

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