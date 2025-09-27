/* Nexus Luma AI Assistant - 380x700px Corner Widget *//* Nexus Luma AI Assistant - 380x700px Corner Widget */

(function() {(function() {

  if (window.__NXL_WIDGET_LOADED__) return;  if (window.__NXL_WIDGET_LOADED__) return;

  window.__NXL_WIDGET_LOADED__ = true;  window.__NXL_WIDGET_LOADED__ = true;



  // Create the floating chat icon  // Create the floating chat icon

  var icon = document.createElement('div');  var icon = document.createElement('div');

  icon.innerHTML = '💬';  icon.innerHTML = '💬';

  icon.style.cssText = 'position:fixed!important;bottom:20px!important;right:20px!important;width:60px!important;height:60px!important;border-radius:50%!important;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)!important;color:white!important;font-size:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:999999!important;box-shadow:0 4px 20px rgba(76,195,255,0.5)!important;transition:all 0.3s ease!important;border:2px solid rgba(76,195,255,0.3)!important;user-select:none!important;';  icon.style.cssText = 'position:fixed!important;bottom:20px!important;right:20px!important;width:60px!important;height:60px!important;border-radius:50%!important;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)!important;color:white!important;font-size:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:999999!important;box-shadow:0 4px 20px rgba(76,195,255,0.5)!important;transition:all 0.3s ease!important;border:2px solid rgba(76,195,255,0.3)!important;user-select:none!important;';

    

  // Create the corner popup widget (380x700px)  // Create the corner popup widget (380x700px)

  var popup = document.createElement('div');  var popup = document.createElement('div');

  popup.style.cssText = 'position:fixed!important;bottom:90px!important;right:20px!important;width:380px!important;height:700px!important;background:rgba(13,13,21,0.95)!important;border-radius:20px!important;box-shadow:0 10px 50px rgba(0,0,0,0.4)!important;z-index:999998!important;display:none!important;border:1px solid rgba(76,195,255,0.4)!important;overflow:hidden!important;backdrop-filter:blur(20px)!important;';  popup.style.cssText = 'position:fixed!important;bottom:90px!important;right:20px!important;width:380px!important;height:700px!important;background:rgba(13,13,21,0.95)!important;border-radius:20px!important;box-shadow:0 10px 50px rgba(0,0,0,0.4)!important;z-index:999998!important;display:none!important;border:1px solid rgba(76,195,255,0.4)!important;overflow:hidden!important;backdrop-filter:blur(20px)!important;';

    

  // Create iframe with proper scaling  // Create iframe

  var iframe = document.createElement('iframe');  var iframe = document.createElement('iframe');

  iframe.src = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';  iframe.src = HOST;

  iframe.style.cssText = 'width:100%!important;height:100%!important;border:none!important;border-radius:20px!important;transform:scale(1)!important;transform-origin:top left!important;';  iframe.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;border:none!important;z-index:999998!important;display:none!important;';

  iframe.allow = 'microphone';  iframe.allow = 'microphone; camera; autoplay';

  

  popup.appendChild(iframe);  // Toggle function

    function toggle() {

  var isOpen = false;    if (iframe.style.display === 'none') {

        iframe.style.display = 'block';

  // Toggle function      icon.style.display = 'none';

  function toggle() {    } else {

    isOpen = !isOpen;      iframe.style.display = 'none';

    if (isOpen) {      icon.style.display = 'flex';

      popup.style.display = 'block';    }

      icon.innerHTML = '✕';  }

      // Smooth animation

      popup.style.opacity = '0';  // Event listeners

      popup.style.transform = 'translateY(20px) scale(0.9)';  icon.addEventListener('click', toggle);

      popup.style.transition = 'all 0.3s ease';  

      setTimeout(function() {  // Listen for close message from iframe

        popup.style.opacity = '1';  window.addEventListener('message', function(e) {

        popup.style.transform = 'translateY(0) scale(1)';    if (e.data === 'nxl:close') {

      }, 10);      iframe.style.display = 'none';

    } else {      icon.style.display = 'flex';

      popup.style.opacity = '0';    }

      popup.style.transform = 'translateY(20px) scale(0.9)';  });

      setTimeout(function() {

        popup.style.display = 'none';  // Append to body

        icon.innerHTML = '💬';  document.body.appendChild(icon);

      }, 300);  document.body.appendChild(iframe);

    }

  }  // Enhanced hover effects

    icon.addEventListener('mouseenter', function() {

  // Event listeners    icon.style.transform = 'scale(1.15)';

  icon.addEventListener('click', function(e) {    icon.style.boxShadow = '0 12px 40px rgba(76,195,255,0.7)';

    e.stopPropagation();    icon.style.background = 'linear-gradient(135deg,#4CC3FF,#1E3FFF,#7A3FFF)';

    toggle();  });

  });  

    icon.addEventListener('mouseleave', function() {

  // Close when clicking outside    icon.style.transform = 'scale(1)';

  document.addEventListener('click', function(e) {    icon.style.boxShadow = '0 8px 32px rgba(76,195,255,0.5)';

    if (isOpen && !icon.contains(e.target) && !popup.contains(e.target)) {    icon.style.background = 'linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)';

      toggle();  });

    }

  });})();
  
  // Hover effects
  icon.addEventListener('mouseenter', function() {
    icon.style.transform = 'scale(1.1)';
    icon.style.boxShadow = '0 6px 30px rgba(76,195,255,0.7)';
    icon.style.background = 'linear-gradient(135deg,#4CC3FF,#1E3FFF,#7A3FFF)';
  });
  
  icon.addEventListener('mouseleave', function() {
    icon.style.transform = 'scale(1)';
    icon.style.boxShadow = '0 4px 20px rgba(76,195,255,0.5)';
    icon.style.background = 'linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)';
  });
  
  // Mobile responsiveness
  if (window.innerWidth <= 480) {
    popup.style.width = 'calc(100vw - 40px)!important';
    popup.style.height = '80vh!important';
    popup.style.left = '20px!important';
    popup.style.right = '20px!important';
  }
  
  // Add to page
  document.body.appendChild(icon);
  document.body.appendChild(popup);
})();