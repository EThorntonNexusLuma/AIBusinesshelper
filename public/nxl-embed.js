/* Nexus Luma AI Assistant - Embed Widget */
(function() {
  if (window.__NXL_EMBED_LOADED__) return;
  window.__NXL_EMBED_LOADED__ = true;

  // Your GitHub Pages URL
  var HOST = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';

  // Create the floating icon
  var icon = document.createElement('div');
  icon.innerHTML = '💬';
  icon.style.cssText = 'position:fixed!important;bottom:30px!important;right:30px!important;width:70px!important;height:70px!important;border-radius:50%!important;background:linear-gradient(135deg,#7A3FFF,#4CC3FF)!important;color:white!important;font-size:30px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:999999!important;box-shadow:0 8px 32px rgba(30,63,255,0.4)!important;transition:transform 0.3s ease!important;';
  
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

  // Hover effect
  icon.addEventListener('mouseenter', function() {
    icon.style.transform = 'scale(1.1)';
  });
  
  icon.addEventListener('mouseleave', function() {
    icon.style.transform = 'scale(1)';
  });

})();