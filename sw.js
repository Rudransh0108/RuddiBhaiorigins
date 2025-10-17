// 🧠 Jarvis Enhanced SW (Old + Upgraded)

self.addEventListener("install", e => {
  console.log("🧠 Jarvis SW installing...");
  e.waitUntil(
    caches.open("jarvis-cache-v2").then(cache => {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "icon.png",
        "icon512.png"
      ]);
    })
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener("activate", e => {
  console.log("⚙️ Jarvis SW activated");
  e.waitUntil(self.clients.claim());
});

// ✅ Basic offline fetch
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

// ✅ Background keep-alive system
self.addEventListener("message", e => {
  if (e.data && e.data.type === "KEEP_ALIVE") {
    e.waitUntil(
      self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
        for (const client of clients) {
          client.postMessage({ type: "ALIVE_ACK", time: Date.now() });
        }
      })
    );
  }
});

// ✅ Periodic background ping every 10 seconds
setInterval(() => {
  self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: "PING" });
    });
  });
}, 10000);
