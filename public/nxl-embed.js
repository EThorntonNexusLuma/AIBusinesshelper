/* Nexus Luma — Embed Widget */
(function () {
  if (window.__NXL_EMBED_LOADED__) return;
  window.__NXL_EMBED_LOADED__ = true;

  var s = document.currentScript || (function(){
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var host = (s && s.getAttribute('data-host')) || 'https://ethorntonnexusluma.github.io/AIBusinesshelper/';
  if (!host.endsWith('/')) host += '/';
  var width = (s && s.getAttribute('data-width')) || '420px';
  var height = (s && s.getAttribute('data-height')) || '720px';
  var openByDefault = (s && s.getAttribute('data-open')) === 'true';
  var accent = (s && s.getAttribute('data-color')) || '#8b5cf6';

  var style = document.createElement('style');
  style.textContent = [
    '.nxl-ai-launcher{position:fixed;right:24px;bottom:24px;width:64px;height:64px;border:none;border-radius:50%;cursor:pointer;',
    'display:grid;place-items:center;font-size:26px;color:#fff;background:'+accent+';box-shadow:0 12px 30px rgba(0,0,0,.35),inset 0 0 18px rgba(255,255,255,.08);',
    'z-index:2147483647;transition:transform .2s ease}',
    '.nxl-ai-launcher:hover{transform:translateY(-2px)}',
    '.nxl-ai-launcher::after{content:"";position:absolute;inset:-8px;border-radius:inherit;box-shadow:0 0 32px '+accent+'55;pointer-events:none}',
    '.nxl-ai-frame{position:fixed;right:24px;bottom:100px;width:'+width+';height:'+height+';border:0;border-radius:16px;overflow:hidden;',
    'box-shadow:0 18px 60px rgba(0,0,0,.45);z-index:2147483647;background:transparent;display:none;max-height:calc(100vh - 120px)}',
    '@media (max-width:600px){.nxl-ai-frame{right:12px;left:12px;bottom:88px;width:auto;height:75vh;max-height:calc(100vh - 100px)}}',
    '@media (max-height:800px){.nxl-ai-frame{height:calc(100vh - 140px);max-height:600px}}'
  ].join('');
  document.head.appendChild(style);

  var frame = document.createElement('iframe');
  frame.className = 'nxl-ai-frame';
  frame.title = 'Nexus Luma AI Assistant';
  frame.src = host;
  frame.allow = 'microphone; autoplay; clipboard-write;';
  frame.setAttribute('aria-hidden', openByDefault ? 'false' : 'true');
  frame.style.display = openByDefault ? 'block' : 'none';

  var btn = document.createElement('button');
  btn.className = 'nxl-ai-launcher';
  btn.setAttribute('aria-label', 'Open AI Assistant');
  btn.innerHTML = '💬';
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