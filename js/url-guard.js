(function () {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (!path || /\.html$/i.test(path)) return;
  fetch(new Request(path + '.html', { method: 'HEAD', cache: 'no-store' }))
    .then(r => { if (r.ok) history.replaceState(null, '', path + '.html'); })
    .catch(() => {});
})();
