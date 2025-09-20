/* Nexus Luma — Embed Widget (customizable) */
(function () {
  if (window.__NXL_EMBED_LOADED__) return;
  window.__NXL_EMBED_LOADED__ = true;

  // Grab options from the <script> tag
  var s = document.currentScript || (function(){
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  // Core URL (either full data-url or host root)
  var url  = s.getAttribute('data-url');
  var host = s.getAttribute('data-host') || 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';
  if (!host.endsWith('/')) host += '/';

  // Layout & style options
  var side         = (s.getAttribute('data-side') || 'right').toLowerCase(); // 'right' | 'left'
  var offsetX      = s.getAttribute('data-offset-x') || '24px';
  var offsetY      = s.getAttribute('data-offset-y') || '24px';
  var zIndex       = s.getAttribute('data-z') || '2147483647';
  var color        = s.getAttribute('data-color') || '#8b5cf6';
  var pulse        = (s.getAttribute('data-pulse') || 'true') === 'true';
  var emoji        = s.getAttribute('data-emoji') || '💬';
  var iconUrl      = s.getAttribute('data-icon'); // optional image instead of emoji
  var width        = s.getAttribute('data-width') || '420px';
  var height       = s.getAttribute('data-height') || '640px';
  var openDefault  = (s.getAttribute('data-open') || 'false') === 'true';
  var radiusBtn    = s.getAttribute('data-button-radius') || '50%';  // circle
  var radiusFrame  = s.getAttribute('data-frame-radius')  || '16px';
  var shadowBtn    = s.getAttribute('data-button-shadow') || '0 12px 30px rgba(0,0,0,.35), inset 0 0 18px rgba(255,255,255,.08)';
  var shadowFrame  = s.getAttribute('data-frame-shadow')  || '0 18px 60px rgba(0,0,0,.45)';

  // CSS (scoped)
  var style = document.createElement('style');
  style.textContent = `
    .nxl-ai-launcher{
      position:fixed;
      ${side === 'left' ? 'left' : 'right'}:${offsetX};
      bottom:${offsetY};
      width:64px;height:64px;border:none;border-radius:${radiusBtn};cursor:pointer;
      display:grid;place-items:center;font-size:26px;color:#fff;background:${color};
      box-shadow:${shadowBtn}; z-index:${zIndex}; transition:transform .2s ease;
      ${iconUrl ? 'background-image:url('+iconUrl+');background-size:cover;background-position:center;color:transparent;' : ''}
    }
    .nxl-ai-launcher:hover{ transform: translateY(-2px) }
    ${pulse ? `.nxl-ai-launcher::after{
      content:"";position:absolute;inset:-8px;border-radius:${radiusBtn};
      box-shadow:0 0 32px ${color}55;pointer-events:none;animation:nxlPulse 2s ease-in-out infinite;
    } @keyframes nxlPulse { 0%,100%{opacity:.6} 50%{opacity:.2} }` : ''}

    .nxl-ai-frame{
      position:fixed;
      ${side === 'left' ? 'left' : 'right'}:${offsetX};
      bottom:calc(${offsetY} + 76px);
      width:${width};height:${height};border:0;border-radius:${radiusFrame};
      overflow:hidden;background:transparent;display:none;box-shadow:${shadowFrame};
      z-index:${zIndex};
    }
    @media (max-width:600px){
      .nxl-ai-frame{ ${side === 'left' ? 'left' : 'right'}:12px; left:12px; right:12px; bottom:88px; width:auto; height:70vh }
    }
  `;
  document.head.appendChild(style);

  // iframe
  var frame = document.createElement('iframe');
  frame.className = 'nxl-ai-frame';
  frame.title = 'Nexus Luma AI Assistant';
  frame.src = url || host;
  frame.allow = 'microphone; autoplay; clipboard-write;';
  frame.setAttribute('aria-hidden', openDefault ? 'false' : 'true');
  frame.style.display = openDefault ? 'block' : 'none';

  // launcher
  var btn = document.createElement('button');
  btn.className = 'nxl-ai-launcher';
  btn.setAttribute('aria-label', 'Open AI Assistant');
  if (!iconUrl) btn.textContent = emoji;

  btn.addEventListener('click', function () {
    var open = frame.style.display !== 'none';
    frame.style.display = open ? 'none' : 'block';
    frame.setAttribute('aria-hidden', open ? 'true' : 'false');
  });

  window.addEventListener('message', function (e) {
    if (e && typeof e.data === 'string' && e.data === 'nxl:close') {
      frame.style.display = 'none';
      frame.setAttribute('aria-hidden', 'true');
    }
  });

  document.body.appendChild(btn);
  document.body.appendChild(frame);
})();
