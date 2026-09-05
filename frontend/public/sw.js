const ICON =
  "https://res.cloudinary.com/pmduo5tk/image/upload/c_crop,x_150,y_15,w_430,h_360/c_pad,b_black,w_430,h_430/c_fill,w_192,h_192/f_png/v1787398198/uniwe/ic6kroaszekbybbyppqu.jpg";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = { title: "UNIWÊ", body: "Vous avez une nouvelle notification." };
  try {
    if (event.data) data = event.data.json();
  } catch {
    // Le format n'est pas du JSON, on garde le message par défaut.
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: ICON,
      badge: ICON,
      silent: true,
      data: { url: "/admin" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/admin";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsList) => {
      for (const client of clientsList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
