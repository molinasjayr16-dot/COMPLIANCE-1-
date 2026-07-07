(function(){
  const tabLabels = {
    compliance: ['compliance', 'Compliance'],
    analytics: ['analytics', 'Analytics'],
    regtasks: ['tasks', 'Reg. Tasks'],
    mapping: ['map', 'Plant Map'],
    water: ['water', 'Water Monitoring'],
    audit: ['audit', 'Env. Audit'],
    closure: ['closure', 'Closure Monitor'],
    reports: ['reports', 'Reports'],
    finance: ['finance', 'Finance']
  };

  const menuLabels = [
    ['button[onclick*="openHistory"]', 'Revision History'],
    ['#jsonBackupBtn', 'Backup Data'],
    ['button[onclick*="openOneDriveBackupSettings"]', 'OneDrive Folder Backup'],
    ['button[onclick*="saveSnapshotAndResetData"]', 'Save Snapshot + Reset Data'],
    ['#jsonRestoreBtn', 'Restore Backup'],
    ['#nav-admin-btn', 'Manage Users'],
    ['#nav-approval-btn', 'Approvals'],
    ['button[onclick*="openChangePassword"]', 'Change Password'],
    ['button[onclick*="openApiKeySettings"]', 'AI API Key'],
    ['button[onclick*="logout();navCloseSettings"]', 'Logout'],
    ['button[onclick*="openAppearanceEditor"]', 'Theme & Backgrounds']
  ];

  const moduleIconLabels = {
    'Compliance Dashboard': 'compliance',
    'Analytics Center': 'analytics',
    'Regulatory Tasks': 'tasks',
    'Plant Map': 'map',
    'Daily Water Monitoring': 'water',
    'Environmental Audit': 'audit',
    'Closure Monitoring': 'closure',
    'Compliance Reports': 'reports',
    'Compliance Finance': 'finance'
  };

  function idle(fn, delay) {
    if ('requestIdleCallback' in window) return window.requestIdleCallback(fn, { timeout: delay || 700 });
    return window.setTimeout(fn, delay || 80);
  }

  function setPlainText(el, text) {
    if (!el || el.textContent.trim() === text) return;
    const input = el.querySelector && el.querySelector('input');
    el.textContent = text;
    if (input) el.appendChild(input);
  }

  function repairTabs(root) {
    (root || document).querySelectorAll('.sys-tab[data-module]').forEach(btn => {
      const info = tabLabels[btn.dataset.module];
      if (!info) return;
      const icon = btn.querySelector('.sys-tab-icon') || document.createElement('span');
      icon.className = 'sys-tab-icon';
      icon.dataset.vectorIcon = info[0];
      if (!icon.parentNode) btn.insertBefore(icon, btn.firstChild);
      const labelText = Array.from(btn.childNodes).filter(n => n.nodeType === 3).map(n => n.nodeValue).join('').replace(/\s+/g, ' ').trim();
      if (labelText !== info[1]) {
        Array.from(btn.childNodes).forEach(n => { if (n.nodeType === 3) n.remove(); });
        btn.appendChild(document.createTextNode(info[1]));
      }
    });
  }

  function repairTopButtons() {
    setPlainText(document.getElementById('nav-user-pill'), 'User');
    setPlainText(document.getElementById('nav-refresh-btn'), 'Refresh');
    setPlainText(document.getElementById('saveBtn'), 'Save Changes');
    setPlainText(document.querySelector('button[title="Home"]'), 'Home');

    const settings = document.getElementById('nav-settings-btn');
    if (settings && settings.textContent.replace(/\s+/g, ' ').trim() !== 'Settings v') {
      settings.textContent = '';
      settings.appendChild(document.createTextNode('Settings '));
      const caret = document.createElement('span');
      caret.style.cssText = 'font-size:9px;opacity:.7;';
      caret.textContent = 'v';
      settings.appendChild(caret);
    }
  }

  function repairMenu() {
    menuLabels.forEach(([selector, label]) => setPlainText(document.querySelector(selector), label));
  }

  function repairModuleCards(root) {
    (root || document).querySelectorAll('#landing .mod-card').forEach(card => {
      const title = card.querySelector('.mod-title')?.textContent.trim();
      const icon = card.querySelector('.mod-icon');
      if (icon && moduleIconLabels[title]) {
        icon.textContent = '';
        icon.dataset.vectorIcon = moduleIconLabels[title];
      }
    });
  }

  function repairSmallText(root) {
    (root || document).querySelectorAll('.sys-navbar .mod-open, #landing .mod-open, #landing .hnp-view-all, #nav-settings-menu .nav-dd-item').forEach(el => {
      const input = el.querySelector && el.querySelector('input');
      if (input) return;
      const cleaned = el.textContent.replace(/[^ -~]+/g, ' ').replace(/\s+/g, ' ').trim();
      if (cleaned && cleaned !== el.textContent.trim()) el.textContent = cleaned;
    });
  }

  function repairNavLabels(root) {
    const scope = root && root.nodeType === 1 ? root : document;
    repairTabs(scope);
    repairTopButtons();
    repairMenu();
    repairModuleCards(scope);
    repairSmallText(scope);
    if (typeof window.metsApplyVectorSymbols === 'function') {
      const nav = document.querySelector('.sys-navbar');
      const landing = document.getElementById('landing');
      if (nav) window.metsApplyVectorSymbols(nav);
      if (landing) window.metsApplyVectorSymbols(landing);
    }
  }

  let repairQueued = false;
  function queueRepair(mutations) {
    if (repairQueued) return;
    repairQueued = true;
    requestAnimationFrame(() => {
      repairQueued = false;
      const root = mutations && mutations[0] && mutations[0].target && mutations[0].target.closest ? mutations[0].target.closest('.sys-navbar, #landing') : null;
      repairNavLabels(root || document);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    repairNavLabels(document);
    document.querySelectorAll('.sys-navbar, #landing').forEach(watched => {
      new MutationObserver(queueRepair).observe(watched, { childList: true, subtree: true });
    });
    idle(() => repairNavLabels(document), 300);
  });

  window.metsRepairNavLabels = repairNavLabels;
})();
