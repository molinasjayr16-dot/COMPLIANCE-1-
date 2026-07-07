(function(){
  'use strict';

  var SKIP_TAGS = {
    SCRIPT: true,
    STYLE: true,
    NOSCRIPT: true,
    TEXTAREA: true,
    INPUT: true,
    CANVAS: true,
    SVG: true,
    CODE: true,
    PRE: true
  };

  var LAST_FULL_CLEAN = 0;
  var FULL_CLEAN_MIN_GAP = 2500;

  var ICON_SELECTORS = [
    '.sys-tab-icon',
    '.comp-nav-item .ci',
    '.mod-icon',
    '.nc-icon',
    '.tc-img-placeholder',
    '.ac-photo-placeholder',
    '.nc-img-placeholder',
    '.vb-icon',
    '.mob-icon'
  ].join(',');

  function hasBadText(text){
    return /[\u00f0\u00e2\u00e3\u00c3\u00c2\u00ef\u00bf\u00bd\ufffd]/.test(text || '');
  }

  function normalizeText(text){
    if (!text || !hasBadText(text)) return text;

    var out = String(text);
    var replacements = [
      [/Ni\u00c3\u00b1o/g, 'Nino'],
      [/\u00c3\u00b1/g, 'n'],
      [/\u00c3\u2018/g, 'N'],
      [/\u00c3\u201a/g, ''],
      [/\u00c2\u00a9/g, '(c)'],
      [/\u00c2\u00ae/g, '(R)'],
      [/\u00c2\u00b7/g, ' - '],
      [/\u00e2\u20ac\u201d/g, ' - '],
      [/\u00e2\u20ac\u201c/g, ' - '],
      [/\u00e2\u20ac"/g, ' - '],
      [/\u00e2\u20ac\u02dc/g, "'"],
      [/\u00e2\u20ac\u2122/g, "'"],
      [/\u00e2\u20ac\u0153/g, '"'],
      [/\u00e2\u20ac\ufffd/g, '"'],
      [/\u00e2\u20ac\u00a6/g, '...'],
      [/\u00e2\u20ac\u00a2/g, '-'],
      [/\u00e2\u2020\u2019/g, '->'],
      [/\u00e2\u2020\u0090/g, '<-'],
      [/\u00e2\u2020\u00bb/g, 'Sync'],
      [/\u00e2\u00ac\u2021/g, 'Pull'],
      [/\u00e2\u00ac\u2020/g, 'Push'],
      [/\u00e2\u0153\u201c/g, 'OK'],
      [/\u00e2\u0153\u2026/g, 'OK'],
      [/\u00e2\u0153\u2022/g, 'x'],
      [/\u00e2\u0153\u008d\u00ef\u00b8\u008f/g, 'Sign'],
      [/\u00e2\u0153\u008f\u00ef\u00b8\u008f/g, 'Edit'],
      [/\u00e2\u0161\u00a0\u00ef\u00b8\u008f/g, 'Warning'],
      [/\u00e2\u0161\u2013\u00ef\u00b8\u008f/g, 'Issue'],
      [/\u00e2\u0161\u2122\u00ef\u00b8\u008f/g, 'Admin'],
      [/\u00e2\u0161\u00a1/g, 'Power'],
      [/\u00e2\u009d\u201e\u00ef\u00b8\u008f/g, 'Cold'],
      [/\u00e2\u203a\u201d/g, 'Blocked'],
      [/\u00e2\u02dc\u0081\u00ef\u00b8\u008f/g, 'Cloud'],
      [/\u00e2\u201e\u00a2/g, 'TM'],
      [/\u00e2\u201a\u201a/g, '2'],
      [/\u00ef\u00b8\u008f/g, ''],
      [/\u00ef\u00bf\u00bd/g, '']
    ];

    replacements.forEach(function(pair){
      out = out.replace(pair[0], pair[1]);
    });

    out = out.replace(/[\u2500-\u257f]+/g, '');
    out = out.replace(/[\u25b2\u25bc]/g, '');
    out = out.replace(/\u2192/g, '->').replace(/\u2190/g, '<-');
    out = out.replace(/\u2014|\u2013/g, ' - ');
    out = out.replace(/\u2026/g, '...');
    out = out.replace(/\u00b7/g, ' - ');
    out = out.replace(/\u20b1/g, 'PHP ');
    out = out.replace(/SO\s*2/g, 'SO2').replace(/NO\s*2/g, 'NO2');
    out = out.replace(/\u00f0[^\s<>()\[\]{}|,.;:'"]*/g, '');
    out = out.replace(/\u00e2[^\s<>()\[\]{}|,.;:'"]*/g, '');
    out = out.replace(/\u00e3[^\s<>()\[\]{}|,.;:'"]*/g, '');
    out = out.replace(/\u00ef[^\s<>()\[\]{}|,.;:'"]*/g, '');
    out = out.replace(/[\u0080-\u009f\u00c2\u00c3\u00bf\u00bd\ufffd]/g, '');
    out = out.replace(/\(\s*\)/g, '(PHP)');
    out = out.replace(/\bPHP\s*PHP\b/g, 'PHP');
    out = out.replace(/\b(PHP)\s*,/g, '$1 ');
    out = out.replace(/[ \t]{2,}/g, ' ');
    out = out.replace(/\s+([,.;:])/g, '$1');
    return out;
  }

  function shouldSkip(node){
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    while (el) {
      if (SKIP_TAGS[el.tagName]) return true;
      if (el.hasAttribute && el.hasAttribute('data-keep-symbols')) return true;
      el = el.parentElement;
    }
    return false;
  }

  function cleanTextNode(node){
    if (!node || node.nodeType !== 3 || shouldSkip(node)) return;
    var next = normalizeText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function cleanElementAttributes(el){
    if (!el || el.nodeType !== 1 || shouldSkip(el)) return;
    ['title', 'aria-label', 'placeholder'].forEach(function(attr){
      if (!el.hasAttribute(attr)) return;
      var current = el.getAttribute(attr);
      var next = normalizeText(current);
      if (next !== current) el.setAttribute(attr, next);
    });
  }

  function cleanIconElements(root){
    if (!root || root.nodeType !== 1) return;
    var nodes = [];
    if (root.matches && root.matches(ICON_SELECTORS)) nodes.push(root);
    if (root.querySelectorAll) {
      Array.prototype.forEach.call(root.querySelectorAll(ICON_SELECTORS), function(el){
        nodes.push(el);
      });
    }
    nodes.forEach(function(el){
      if (el.querySelector && el.querySelector('.mets-vector-icon')) return;
      if (hasBadText(el.textContent)) el.textContent = '';
      el.setAttribute('aria-hidden', 'true');
    });
  }

  function cleanTree(root){
    if (!root) return;
    if (root.nodeType === 3) {
      cleanTextNode(root);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (shouldSkip(root)) return;

    if (root.nodeType === 1) cleanElementAttributes(root);
    cleanIconElements(root);

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        return shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(cleanTextNode);

    if (root.querySelectorAll) {
      Array.prototype.forEach.call(root.querySelectorAll('[title],[aria-label],[placeholder]'), cleanElementAttributes);
    }
    repairKnownText(root);
  }

  function repairKnownText(root){
    if (!root || !root.querySelectorAll) return;
    var overlay = root.id === 'appearance-editor-overlay' ? root : root.querySelector('#appearance-editor-overlay');
    if (overlay) {
      Array.prototype.forEach.call(overlay.querySelectorAll('div,button'), function(el){
        var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (text.indexOf('Theme & Backgrounds') !== -1 && text.length < 60 && el.children.length === 0) {
          el.textContent = 'Theme & Backgrounds';
        }
      });
      var themeTab = overlay.querySelector('#ae-tab-theme');
      var bgTab = overlay.querySelector('#ae-tab-backgrounds');
      var personalTab = overlay.querySelector('#ae-tab-personal');
      var closeBtn = overlay.querySelector('button[onclick*="closeAppearanceEditor"][style*="border-radius:50%"]');
      if (themeTab) themeTab.textContent = 'Theme';
      if (bgTab) bgTab.textContent = 'Page Backgrounds';
      if (personalTab) personalTab.textContent = 'Personal';
      if (closeBtn && closeBtn.textContent.trim() !== 'x') closeBtn.textContent = 'x';
      Array.prototype.forEach.call(overlay.querySelectorAll('.ae-bg-clear'), function(btn){
        if ((btn.textContent || '').toLowerCase().indexOf('clear') !== -1) btn.textContent = 'Clear';
      });
      Array.prototype.forEach.call(overlay.querySelectorAll('#ae-theme-status,#ae-pref-status,#ae-bg-save-status'), function(el){
        el.textContent = normalizeText(el.textContent || '');
      });
    }
    Array.prototype.forEach.call(root.querySelectorAll('.app-copyright, .l-footer-copy'), function(el){
      el.textContent = 'Copyright (c) 2026 Nino, Jr. C. Molinas. All rights reserved. - METS Cold Storage Services Inc. Environmental Compliance System.';
    });
  }

  function idle(fn, delay){
    if ('requestIdleCallback' in window) return window.requestIdleCallback(fn, { timeout: delay || 800 });
    return window.setTimeout(fn, delay || 80);
  }

  function activeRoots(includeBody){
    var roots = [];
    ['.sys-navbar', '#landing', '#nav-settings-menu', '#appearance-editor-overlay', '.app-copyright', '.l-footer-copy', '.comp-sidebar', '.module-pane.active', '.toast', '#toast', '.modal', '[role="dialog"]'].forEach(function(selector){
      Array.prototype.forEach.call(document.querySelectorAll(selector), function(el){
        if (roots.indexOf(el) === -1) roots.push(el);
      });
    });
    if (includeBody && document.body && roots.indexOf(document.body) === -1) roots.push(document.body);
    return roots.length ? roots : [document.body || document.documentElement];
  }

  function installStyleFixes(){
    if (document.getElementById('mets-mojibake-cleaner-style')) return;
    var style = document.createElement('style');
    style.id = 'mets-mojibake-cleaner-style';
    style.textContent = [
      '.eyebrow::before,',
      '.hero-compliance-badge::before,',
      '.commitment-date-wrap label::before,',
      '.crit-ref::before,',
      '.section-summary h4::before,',
      '.sig-label::before{content:"" !important;}',
      '.app-toast::before,.toast::before,#toast::before{content:"" !important;}',
      '.comp-nav-item .ci:empty:not([data-vector-icon]), .sys-tab-icon:empty:not([data-vector-icon]){display:none !important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function run(root){
    installStyleFixes();
    if (root) {
      cleanTree(root);
      return;
    }
    activeRoots(false).forEach(cleanTree);
  }

  function runWholeBodyThrottled(){
    var now = Date.now();
    if (now - LAST_FULL_CLEAN < FULL_CLEAN_MIN_GAP) return;
    LAST_FULL_CLEAN = now;
    idle(function(){ cleanTree(document.body || document.documentElement); }, 200);
  }

  function runFullSliced(){
    installStyleFixes();
    var roots = Array.prototype.slice.call(document.querySelectorAll('.module-pane, #landing, .sys-navbar, #appearance-editor-overlay, .app-copyright, .l-footer-copy, .comp-sidebar, #nav-settings-menu'));
    var index = 0;
    function next(){
      if (index >= roots.length) return;
      cleanTree(roots[index++]);
      idle(next, 500);
    }
    idle(next, 500);
  }

  function observe(){
    if (!document.body || !window.MutationObserver) return;
    var pending = false;
    var pendingRoots = [];
    var observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        if (mutation.type === 'characterData') {
          cleanTextNode(mutation.target);
          return;
        }
        if (mutation.type === 'attributes') {
          cleanElementAttributes(mutation.target);
          return;
        }
        Array.prototype.forEach.call(mutation.addedNodes || [], function(node){
          if (node.nodeType === 1 || node.nodeType === 3) pendingRoots.push(node);
        });
      });
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(function(){
        pending = false;
        var roots = pendingRoots.splice(0, pendingRoots.length);
        roots.forEach(cleanTree);
        if (roots.length > 20) runWholeBodyThrottled();
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['title', 'aria-label', 'placeholder']
    });
  }

  document.addEventListener('click', function(e){
    if (e.target && e.target.closest && e.target.closest('.sys-tab[data-module], .mob-nav-btn')) {
      window.setTimeout(function(){ run(document.querySelector('.module-pane.active') || document.body); }, 140);
      window.setTimeout(runWholeBodyThrottled, 650);
    }
    if (e.target && e.target.closest && e.target.closest('[onclick*="openAppearanceEditor"], #nav-settings-btn, #appearance-editor-overlay, .ae-tab, .ae-theme-swatch')) {
      window.setTimeout(function(){
        run(document.getElementById('appearance-editor-overlay') || document.body);
        run(document.querySelector('.app-copyright') || document.querySelector('.l-footer-copy') || document.body);
      }, 180);
    }
  }, true);

  document.addEventListener('input', function(e){
    if (e.target && e.target.closest && e.target.closest('.module-pane, #landing, #appearance-editor-overlay')) {
      window.setTimeout(function(){ run(e.target.closest('.module-pane, #landing, #appearance-editor-overlay')); }, 120);
    }
  }, true);

  window.metsNormalizeMojibakeText = normalizeText;
  window.metsCleanMojibake = run;
  window.metsCleanMojibakeFull = runFullSliced;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      run();
      observe();
      idle(runFullSliced, 1200);
      idle(runWholeBodyThrottled, 2600);
      window.setTimeout(runWholeBodyThrottled, 5000);
    });
  } else {
    run();
    observe();
    idle(runFullSliced, 1200);
    idle(runWholeBodyThrottled, 2600);
    window.setTimeout(runWholeBodyThrottled, 5000);
  }
})();
