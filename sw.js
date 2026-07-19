const CACHE_NAME = 'video-vault-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-256.png',
  './icon-512.png'
];

// 安裝 Service Worker 並儲存基本檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 清理舊嘅緩存
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 優先讀取網絡，離線時自動讀取本地緩存
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
