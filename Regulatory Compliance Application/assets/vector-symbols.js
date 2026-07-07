(function(){
  'use strict';

  var MODULE_ICON = {
    compliance:'M4 5h16v15H4z M8 5V3h8v2 M8 10h8 M8 14h5',
    analytics:'M4 19h16 M7 16v-5 M12 16V7 M17 16v-8 M5 6l5 4 4-5 5 3',
    tasks:'M5 5h14v14H5z M8 10l2 2 5-5 M8 16h8',
    map:'M5 6l4-2 6 2 4-2v14l-4 2-6-2-4 2z M9 4v14 M15 6v14',
    water:'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
    audit:'M10.5 18a7.5 7.5 0 1 1 5.3-12.8 7.5 7.5 0 0 1-5.3 12.8z M16 16l4 4 M8 10h5 M8 13h3',
    closure:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M8 12l3 3 5-6',
    reports:'M7 3h7l4 4v14H7z M14 3v5h4 M10 12h5 M10 16h6',
    finance:'M12 3v18 M17 7.5c-.8-1-2.5-1.8-5-1.8-3 0-5 1.1-5 2.8 0 4.4 10 1.8 10 6.2 0 1.8-2 3-5 3-2.6 0-4.5-.9-5.4-2.2',
    release:'M4 12l16-7-5 15-3-6-8-2z M12 14l8-9',
    permit:'M4 7h6l2 2h8v10H4z M7 13h10',
    issue:'M12 4l9 16H3z M12 9v5 M12 17h.01',
    shield:'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z M9 12l2 2 4-4',
    site:'M4 20h16 M6 20V8l6-4 6 4v12 M9 20v-5h6v5 M9 10h.01 M12 10h.01 M15 10h.01',
    waste:'M8 7h8 M10 7v12 M14 7v12 M5 7h14l-1 14H6z M10 4h4l1 3H9z',
    stack:'M4 20h16 M6 20V9h4v11 M10 20V6h4v14 M14 20v-8h4v8 M7 6c1-2 3-2 4 0',
    air:'M4 9h10a3 3 0 1 0-3-3 M4 14h14a2.5 2.5 0 1 1-2.5 2.5 M4 19h8',
    ai:'M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8z M5 17l.8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8z',
    home:'M4 11l8-7 8 7 M6 10v10h12V10 M10 20v-6h4v6',
    leaf:'M5 19c8 0 14-6 14-14C11 5 5 11 5 19z M5 19c4-5 8-8 14-14',
    wave:'M3 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 M4 9c4-4 10-4 16 0',
    beach:'M3 17h18 M5 15c3-4 11-4 14 0 M15 6a3 3 0 1 0-6 0 3 3 0 0 0 6 0 M12 1v2 M12 9v2 M7 6H5 M19 6h-2',
    dunes:'M3 18c4-5 8-8 12-8 3 0 5 2 6 4 M3 18h18 M6 14c3-2 6-3 9-3',
    planet:'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M3 14c4 2 12 2 18-4',
    snow:'M12 3v18 M5 7l14 10 M19 7L5 17 M8 5l4 3 4-3 M8 19l4-3 4 3',
    crystal:'M12 3l7 7-7 11-7-11z M5 10h14 M9 10l3 11 3-11',
    moon:'M18 16.5A8 8 0 0 1 8 6.5a7 7 0 1 0 10 10z M4 20h16',
    sunset:'M3 18h18 M5 15a7 7 0 0 1 14 0 M12 5v3 M6 9l2 2 M18 9l-2 2',
    mono:'M12 21a9 9 0 0 0 0-18z M12 3a9 9 0 0 1 0 18',
    generic:'M12 3l8 4v10l-8 4-8-4V7z M12 3v18 M4 7l8 4 8-4'
  };

  var COMP_NAV_KEY = {
    home:'home',
    'all-permits':'permit',
    'released-permits':'release',
    'permit-issues':'issue',
    ecc:'shield',
    'denr-permits':'site',
    'llda-permits':'water',
    hw:'waste',
    'denr-smr':'reports',
    'llda-smr':'water',
    balagtas:'site',
    cmr:'reports',
    stack:'stack',
    ambient:'air',
    'water-quality':'water',
    'permit-conditions':'ai'
  };

  var THEME_KEY = {
    forest:'leaf',
    underwater:'wave',
    beach:'beach',
    desert:'dunes',
    space:'planet',
    arctic:'snow',
    emerald:'crystal',
    midnight:'moon',
    sunrise:'sunset',
    mono:'mono'
  };

  var MODULE_KEY = {
    compliance:'compliance',
    analytics:'analytics',
    regtasks:'tasks',
    mapping:'map',
    water:'water',
    audit:'audit',
    closure:'closure',
    reports:'reports',
    finance:'finance'
  };

  var ICON_TARGETS = [
    '.sys-tab-icon',
    '.mod-icon',
    '.comp-nav-item .ci',
    '.nc-icon',
    '.mob-icon',
    '.ae-preview-symbol',
    '.tc-img-placeholder',
    '.ac-photo-placeholder',
    '.nc-img-placeholder',
    '.vb-icon'
  ].join(',');

  var THEME_CARD_TARGETS = '.ae-theme-swatch, .theme-swatch';

  var HEADING_TARGETS = [
    '#system-shell .module-pro-heading',
    '#system-shell .analytics-heading',
    '#system-shell .comp-brand-title',
    '#system-shell .section-head h1',
    '#system-shell .section-head h2',
    '#system-shell .section-head h3',
    '#system-shell .comp-section-title h2',
    '#system-shell .c-card-header h3',
    '#system-shell .wm-card h2',
    '#system-shell .wm-card h3',
    '#system-shell .cls-card h2',
    '#system-shell .cls-card h3',
    '#system-shell .rtt-card h2',
    '#system-shell .rtt-card h3',
    '#system-shell .module-pane h1',
    '#system-shell .module-pane h2',
    '#system-shell .module-pane h3'
  ].join(',');

  function svgMarkup(key){
    var path = MODULE_ICON[key] || MODULE_ICON.generic;
    return '<svg class="mets-vector-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"/></svg>';
  }

  function textOf(el){
    if (!el) return '';
    return (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function inferFromText(text){
    if (!text) return 'generic';
    if (text.indexOf('analytics') !== -1 || text.indexOf('graph') !== -1 || text.indexOf('kpi') !== -1) return 'analytics';
    if (text.indexOf('task') !== -1 || text.indexOf('deadline') !== -1) return 'tasks';
    if (text.indexOf('map') !== -1 || text.indexOf('location') !== -1 || text.indexOf('pin') !== -1) return 'map';
    if (text.indexOf('water') !== -1 || text.indexOf('llda') !== -1 || text.indexOf('effluent') !== -1) return 'water';
    if (text.indexOf('audit') !== -1 || text.indexOf('inspection') !== -1) return 'audit';
    if (text.indexOf('closure') !== -1 || text.indexOf('closed') !== -1 || text.indexOf('corrective') !== -1) return 'closure';
    if (text.indexOf('report') !== -1 || text.indexOf('smr') !== -1 || text.indexOf('cmr') !== -1 || text.indexOf('document') !== -1) return 'reports';
    if (text.indexOf('finance') !== -1 || text.indexOf('budget') !== -1 || text.indexOf('cash') !== -1 || text.indexOf('payment') !== -1) return 'finance';
    if (text.indexOf('released') !== -1 || text.indexOf('release') !== -1) return 'release';
    if (text.indexOf('permit') !== -1 || text.indexOf('license') !== -1 || text.indexOf('clearance') !== -1 || text.indexOf('released') !== -1) return 'permit';
    if (text.indexOf('waste') !== -1 || text.indexOf('manifest') !== -1) return 'waste';
    if (text.indexOf('issue') !== -1 || text.indexOf('alert') !== -1 || text.indexOf('overdue') !== -1 || text.indexOf('hazard') !== -1) return 'issue';
    if (text.indexOf('ecc') !== -1 || text.indexOf('compliance') !== -1) return 'compliance';
    if (text.indexOf('denr') !== -1 || text.indexOf('site') !== -1) return 'site';
    if (text.indexOf('stack') !== -1 || text.indexOf('emission') !== -1 || text.indexOf('boiler') !== -1) return 'stack';
    if (text.indexOf('ambient') !== -1 || text.indexOf('air') !== -1 || text.indexOf('noise') !== -1) return 'air';
    if (text.indexOf('ai') !== -1 || text.indexOf('assistant') !== -1) return 'ai';
    if (text.indexOf('home') !== -1 || text.indexOf('dashboard') !== -1) return 'home';
    return 'generic';
  }

  function inferFromCompNav(el){
    var nav = el && el.closest && el.closest('.comp-nav-item');
    if (!nav) return '';
    var onclick = nav.getAttribute('onclick') || '';
    var match = onclick.match(/compNav\(['"]([^'"]+)['"]\)/);
    if (match && COMP_NAV_KEY[match[1]]) return COMP_NAV_KEY[match[1]];
    return inferFromText(textOf(nav));
  }

  function inferIcon(el){
    if (!el) return 'generic';
    if (el.matches && el.matches('.comp-nav-item .ci')) return inferFromCompNav(el) || 'generic';
    if (el.matches && el.matches('.nc-icon')) {
      var navCard = el.closest('.nav-card');
      if (navCard) {
        var onclick = navCard.getAttribute('onclick') || '';
        var match = onclick.match(/compNav\(['"]([^'"]+)['"]\)/);
        if (match && COMP_NAV_KEY[match[1]]) return COMP_NAV_KEY[match[1]];
      }
    }
    if (el.dataset && el.dataset.vectorIcon) return el.dataset.vectorIcon;
    var tab = el.closest && el.closest('.sys-tab[data-module], .mob-nav-btn[onclick]');
    if (tab && tab.dataset && MODULE_KEY[tab.dataset.module]) return MODULE_KEY[tab.dataset.module];
    var card = el.closest && el.closest('.mod-card, .nav-card, .module-card, .comp-nav-item, .c-card, .wm-card, .cls-card, .rtt-card, .section-head');
    if (card) return inferFromText(textOf(card));
    var modulePane = el.closest && el.closest('.module-pane[id]');
    if (modulePane) {
      var id = (modulePane.id || '').replace('module-', '');
      if (MODULE_KEY[id]) return MODULE_KEY[id];
    }
    return inferFromText(textOf(card || el));
  }

  function setIcon(el, key){
    if (!el || el.nodeType !== 1) return;
    key = key || inferIcon(el);
    if (el.dataset.vectorized === key && el.querySelector('.mets-vector-icon')) return;
    el.textContent = '';
    el.dataset.vectorIcon = key;
    el.dataset.vectorized = key;
    el.setAttribute('aria-hidden', 'true');
    el.insertAdjacentHTML('afterbegin', svgMarkup(key));
  }

  function collect(root, selector){
    var out = [];
    if (!root || root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return out;
    if (root.matches && root.matches(selector)) out.push(root);
    if (root.querySelectorAll) {
      Array.prototype.forEach.call(root.querySelectorAll(selector), function(el){ out.push(el); });
    }
    return out;
  }

  function decorateIconTargets(root){
    collect(root, ICON_TARGETS).forEach(function(el){
      setIcon(el, inferIcon(el));
    });
  }

  function decorateHeadingTargets(root){
    collect(root, HEADING_TARGETS).forEach(function(heading){
      if (heading.closest('button, table, .sys-navbar, #nav-settings-menu')) return;
      if (heading.querySelector('.mets-vector-title-icon')) return;
      var span = document.createElement('span');
      span.className = 'mets-vector-title-icon';
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = svgMarkup(inferIcon(heading));
      heading.insertBefore(span, heading.firstChild);
    });
  }

  function inferThemeIcon(card){
    if (!card) return 'generic';
    var onclick = card.getAttribute('onclick') || '';
    var title = (card.getAttribute('title') || textOf(card)).toLowerCase();
    var idMatch = onclick.match(/['"]([a-z]+)['"]/);
    if (idMatch && THEME_KEY[idMatch[1]]) return THEME_KEY[idMatch[1]];
    Object.keys(THEME_KEY).some(function(id){
      if (title.indexOf(id) !== -1) {
        idMatch = [null, id];
        return true;
      }
      return false;
    });
    if (idMatch && THEME_KEY[idMatch[1]]) return THEME_KEY[idMatch[1]];
    if (title.indexOf('forest') !== -1 || title.indexOf('leaves') !== -1) return 'leaf';
    if (title.indexOf('underwater') !== -1 || title.indexOf('aqua') !== -1) return 'wave';
    if (title.indexOf('beach') !== -1 || title.indexOf('coast') !== -1) return 'beach';
    if (title.indexOf('desert') !== -1 || title.indexOf('dune') !== -1) return 'dunes';
    if (title.indexOf('space') !== -1 || title.indexOf('orbit') !== -1) return 'planet';
    if (title.indexOf('arctic') !== -1 || title.indexOf('ice') !== -1) return 'snow';
    if (title.indexOf('emerald') !== -1 || title.indexOf('crystal') !== -1) return 'crystal';
    if (title.indexOf('moon') !== -1 || title.indexOf('lake') !== -1) return 'moon';
    if (title.indexOf('sunset') !== -1 || title.indexOf('sunrise') !== -1 || title.indexOf('ocean') !== -1) return 'sunset';
    if (title.indexOf('mono') !== -1) return 'mono';
    return 'generic';
  }

  function decorateThemeCards(root){
    collect(root, THEME_CARD_TARGETS).forEach(function(card){
      var preview = card.querySelector('.ae-theme-preview, .theme-swatch-preview');
      if (!preview) return;
      var key = inferThemeIcon(card);
      if (preview.dataset.vectorized === key && preview.querySelector('.mets-vector-icon')) return;
      preview.dataset.vectorized = key;
      preview.dataset.vectorIcon = key;
      preview.innerHTML = svgMarkup(key);
    });
  }

  function apply(root){
    root = root || document.body || document.documentElement;
    decorateIconTargets(root);
    decorateHeadingTargets(root);
    decorateThemeCards(root);
  }

  function idle(fn, delay){
    if ('requestIdleCallback' in window) return window.requestIdleCallback(fn, { timeout: delay || 800 });
    return window.setTimeout(fn, delay || 80);
  }

  function applyActive(){
    ['.sys-navbar', '#landing', '#appearance-editor-overlay', '.comp-sidebar', '.module-pane.active'].forEach(function(selector){
      Array.prototype.forEach.call(document.querySelectorAll(selector), function(root){ apply(root); });
    });
  }

  function applyFullSliced(){
    var roots = Array.prototype.slice.call(document.querySelectorAll('.module-pane, #landing, .sys-navbar, #appearance-editor-overlay, .comp-sidebar'));
    var index = 0;
    function next(){
      if (index >= roots.length) return;
      apply(roots[index++]);
      idle(next, 500);
    }
    idle(next, 500);
  }

  function observe(){
    if (!document.body || !window.MutationObserver) return;
    var queued = false;
    var pendingRoots = [];
    var observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        Array.prototype.forEach.call(mutation.addedNodes || [], function(node){
          if (node.nodeType === 1) pendingRoots.push(node);
          else if (mutation.target && mutation.target.nodeType === 1) pendingRoots.push(mutation.target);
        });
      });
      if (queued) return;
      queued = true;
      requestAnimationFrame(function(){
        queued = false;
        var roots = pendingRoots.length ? pendingRoots.splice(0, pendingRoots.length) : [document.body];
        roots.forEach(function(root){ apply(root); });
      });
    });
    observer.observe(document.body, { childList:true, subtree:true });
  }

  document.addEventListener('click', function(e){
    if (e.target && e.target.closest && e.target.closest('.sys-tab[data-module], .mob-nav-btn')) {
      window.setTimeout(function(){ apply(document.querySelector('.module-pane.active') || document.body); }, 160);
    }
    if (e.target && e.target.closest && e.target.closest('[onclick*="openAppearanceEditor"], #appearance-editor-overlay, .ae-tab, .ae-theme-swatch')) {
      window.setTimeout(function(){ apply(document.getElementById('appearance-editor-overlay') || document.body); }, 180);
    }
  }, true);

  window.metsApplyVectorSymbols = apply;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      applyActive();
      observe();
      idle(applyFullSliced, 1200);
    });
  } else {
    applyActive();
    observe();
    idle(applyFullSliced, 1200);
  }
})();
