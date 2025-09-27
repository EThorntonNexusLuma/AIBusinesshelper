/* Nexus Luma AI Assistant - 380x700px Corner Widget *//* Nexus Luma AI Assistant - 380x700px Corner Widget *//* Nexus Luma AI Assistant - 380x700px Corner Widget */

(function() {

  if (window.__NXL_WIDGET_LOADED__) return;(function() {(function() {

  window.__NXL_WIDGET_LOADED__ = true;

  if (window.__NXL_WIDGET_LOADED__) return;  if (window.__NXL_WIDGET_LOADED__) return;

  // Create the floating chat icon

  var icon = document.createElement('div');  window.__NXL_WIDGET_LOADED__ = true;  window.__NXL_WIDGET_LOADED__ = true;

  icon.innerHTML = '💬';

  icon.style.cssText = 'position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF);color:white;font-size:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:999999;box-shadow:0 4px 20px rgba(76,195,255,0.5);transition:all 0.3s ease;border:2px solid rgba(76,195,255,0.3);user-select:none;';

  

  // Create the corner popup widget (380x700px)  // Create the floating chat icon  // Create the floating chat icon

  var popup = document.createElement('div');

  popup.style.cssText = 'position:fixed;bottom:90px;right:20px;width:380px;height:700px;background:rgba(13,13,21,0.95);border-radius:20px;box-shadow:0 10px 50px rgba(0,0,0,0.4);z-index:999998;display:none;border:1px solid rgba(76,195,255,0.4);overflow:hidden;backdrop-filter:blur(20px);';  var icon = document.createElement('div');  var icon = document.createElement('div');

  

  // Create iframe  icon.innerHTML = '💬';  icon.innerHTML = '💬';

  var iframe = document.createElement('iframe');

  iframe.src = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';  icon.style.cssText = 'position:fixed!important;bottom:20px!important;right:20px!important;width:60px!important;height:60px!important;border-radius:50%!important;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)!important;color:white!important;font-size:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:999999!important;box-shadow:0 4px 20px rgba(76,195,255,0.5)!important;transition:all 0.3s ease!important;border:2px solid rgba(76,195,255,0.3)!important;user-select:none!important;';  icon.style.cssText = 'position:fixed!important;bottom:20px!important;right:20px!important;width:60px!important;height:60px!important;border-radius:50%!important;background:linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)!important;color:white!important;font-size:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:999999!important;box-shadow:0 4px 20px rgba(76,195,255,0.5)!important;transition:all 0.3s ease!important;border:2px solid rgba(76,195,255,0.3)!important;user-select:none!important;';

  iframe.style.cssText = 'width:100%;height:100%;border:none;border-radius:20px;';

  iframe.allow = 'microphone';    

  

  popup.appendChild(iframe);  // Create the corner popup widget (380x700px)  // Create the corner popup widget (380x700px)

  

  var isOpen = false;  var popup = document.createElement('div');  var popup = document.createElement('div');

  

  // Toggle function  popup.style.cssText = 'position:fixed!important;bottom:90px!important;right:20px!important;width:380px!important;height:700px!important;background:rgba(13,13,21,0.95)!important;border-radius:20px!important;box-shadow:0 10px 50px rgba(0,0,0,0.4)!important;z-index:999998!important;display:none!important;border:1px solid rgba(76,195,255,0.4)!important;overflow:hidden!important;backdrop-filter:blur(20px)!important;';  popup.style.cssText = 'position:fixed!important;bottom:90px!important;right:20px!important;width:380px!important;height:700px!important;background:rgba(13,13,21,0.95)!important;border-radius:20px!important;box-shadow:0 10px 50px rgba(0,0,0,0.4)!important;z-index:999998!important;display:none!important;border:1px solid rgba(76,195,255,0.4)!important;overflow:hidden!important;backdrop-filter:blur(20px)!important;';

  function toggle() {

    isOpen = !isOpen;    

    if (isOpen) {

      popup.style.display = 'block';  // Create iframe with proper scaling  // Create iframe

      icon.innerHTML = '✕';

      // Smooth animation  var iframe = document.createElement('iframe');  var iframe = document.createElement('iframe');

      popup.style.opacity = '0';

      popup.style.transform = 'translateY(20px) scale(0.9)';  iframe.src = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';  iframe.src = HOST;

      popup.style.transition = 'all 0.3s ease';

      setTimeout(function() {  iframe.style.cssText = 'width:100%!important;height:100%!important;border:none!important;border-radius:20px!important;transform:scale(1)!important;transform-origin:top left!important;';  iframe.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;border:none!important;z-index:999998!important;display:none!important;';

        popup.style.opacity = '1';

        popup.style.transform = 'translateY(0) scale(1)';  iframe.allow = 'microphone';  iframe.allow = 'microphone; camera; autoplay';

      }, 10);

    } else {  

      popup.style.opacity = '0';

      popup.style.transform = 'translateY(20px) scale(0.9)';  popup.appendChild(iframe);  // Toggle function

      setTimeout(function() {

        popup.style.display = 'none';    function toggle() {

        icon.innerHTML = '💬';

      }, 300);  var isOpen = false;    if (iframe.style.display === 'none') {

    }

  }        iframe.style.display = 'block';

  

  // Event listeners  // Toggle function      icon.style.display = 'none';

  icon.onclick = function(e) {

    e.stopPropagation();  function toggle() {    } else {

    toggle();

  };    isOpen = !isOpen;      iframe.style.display = 'none';

  

  // Close when clicking outside    if (isOpen) {      icon.style.display = 'flex';

  document.onclick = function(e) {

    if (isOpen && !icon.contains(e.target) && !popup.contains(e.target)) {      popup.style.display = 'block';    }

      toggle();

    }      icon.innerHTML = '✕';  }

  };

        // Smooth animation

  // Hover effects

  icon.onmouseenter = function() {      popup.style.opacity = '0';  // Event listeners

    icon.style.transform = 'scale(1.1)';

    icon.style.boxShadow = '0 6px 30px rgba(76,195,255,0.7)';      popup.style.transform = 'translateY(20px) scale(0.9)';  icon.addEventListener('click', toggle);

    icon.style.background = 'linear-gradient(135deg,#4CC3FF,#1E3FFF,#7A3FFF)';

  };      popup.style.transition = 'all 0.3s ease';  

  

  icon.onmouseleave = function() {      setTimeout(function() {  // Listen for close message from iframe

    icon.style.transform = 'scale(1)';

    icon.style.boxShadow = '0 4px 20px rgba(76,195,255,0.5)';        popup.style.opacity = '1';  window.addEventListener('message', function(e) {

    icon.style.background = 'linear-gradient(135deg,#1E3FFF,#4CC3FF,#7A3FFF)';

  };        popup.style.transform = 'translateY(0) scale(1)';    if (e.data === 'nxl:close') {

  

  // Mobile responsiveness      }, 10);      iframe.style.display = 'none';

  if (window.innerWidth <= 480) {

    popup.style.width = 'calc(100vw - 40px)';    } else {      icon.style.display = 'flex';

    popup.style.height = '80vh';

    popup.style.left = '20px';      popup.style.opacity = '0';    }

    popup.style.right = '20px';

  }      popup.style.transform = 'translateY(20px) scale(0.9)';  });

  

  // Add to page when DOM is ready      setTimeout(function() {

  function addWidget() {

    document.body.appendChild(icon);        popup.style.display = 'none';  // Append to body

    document.body.appendChild(popup);

  }        icon.innerHTML = '💬';  document.body.appendChild(icon);

  

  if (document.readyState === 'loading') {      }, 300);  document.body.appendChild(iframe);

    document.addEventListener('DOMContentLoaded', addWidget);

  } else {    }

    addWidget();

  }  }  // Enhanced hover effects

})();
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