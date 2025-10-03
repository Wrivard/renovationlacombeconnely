(function () {
  // Only run on clean URLs (without .html)
  const path = window.location.pathname.replace(/\/+$/, '');
  if (!path || /\.html$/i.test(path)) return;
  
  // Check if the clean URL works, if not, try .html version
  fetch(new Request(path, { method: 'HEAD', cache: 'no-store' }))
    .then(r => { 
      if (!r.ok) {
        // If clean URL fails, try .html version
        return fetch(new Request(path + '.html', { method: 'HEAD', cache: 'no-store' }));
      }
    })
    .then(r => { 
      if (r && r.ok) {
        // Only redirect to .html if clean URL doesn't work
        history.replaceState(null, '', path + '.html'); 
      }
    })
    .catch(() => {});
})();
