const map = L.map("map").setView([6.5244, 3.3792], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let allMarkers = [];
let hasLoadedPins = false;
let cachedLastVisit = null;

// Load pins
// async function loadPins() {
//   document.getElementById("loadingModal").style.display = "block";

//   try {
//     const token = localStorage.getItem("token");
//     const currentUser = localStorage.getItem("username");

//     const res = await fetch(
//       "https://civicwatch-backend-v2.onrender.com/api/pins",
//       { headers: token ? { Authorization: `Bearer ${token}` } : {} }
//     );

//     const { pins, lastVisit } = await res.json();

//     if (!cachedLastVisit && lastVisit) cachedLastVisit = lastVisit;

//     allMarkers.forEach((m) => map.removeLayer(m));
//     allMarkers = [];

//     const lastVisitTime = cachedLastVisit
//       ? new Date(cachedLastVisit).getTime()
//       : 0;
//     const latLngs = [];

//     pins.forEach((pin) => {
//       const pinTime = new Date(pin.createdAt).getTime();
//       let iconUrl;

//       if (pin.username === currentUser) {
//         iconUrl = "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png";
//       } else if (currentUser && cachedLastVisit) {
//         // Only show yellow pins for logged-in users with a lastVisit
//         iconUrl =
//           pinTime > new Date(cachedLastVisit).getTime()
//             ? "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png"
//             : "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png";
//       } else {
//         // Guest sees only red pins
//         iconUrl = "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png";
//       }

//       const icon = L.icon({ iconUrl, iconSize: [32, 32] });
//       const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);
//       marker.bindPopup(`<strong>Reported by:</strong> ${pin.username}`);
//       marker._pinId = pin._id;

//       if (currentUser === pin.username) {
//         marker.on("click", async () => {
//           if (confirm("Unpin this location?")) {
//             await deletePin(pin._id);
//             loadPins();
//           }
//         });
//       }

//       allMarkers.push(marker);
//       latLngs.push([pin.lat, pin.lng]);
//     });

//     if (latLngs.length > 0) map.fitBounds(L.latLngBounds(latLngs));
//   } catch (err) {
//     alert("Failed to load pins");
//     console.error(err);
//   } finally {
//     document.getElementById("loadingModal").style.display = "none";
//   }
// }

async function loadPins() {
  document.getElementById("loadingModal").style.display = "block";

  try {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("username");

    const res = await fetch(
      "https://civicwatch-backend-v2.onrender.com/api/pins",
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );

    const { pins, lastVisit, isFirstLogin } = await res.json(); // get flag

    if (!cachedLastVisit && lastVisit) cachedLastVisit = lastVisit;

    // Show first-login toast
    if (isFirstLogin) {
      const toast = document.createElement("div");
      toast.innerText = "Pins start tracking as new from today.";
      toast.className = "toast-notification";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 8000);
    }

    allMarkers.forEach((m) => map.removeLayer(m));
    allMarkers = [];

    const latLngs = [];
    const lastVisitTime = cachedLastVisit
      ? new Date(cachedLastVisit).getTime()
      : 0;

    pins.forEach((pin) => {
      const pinTime = new Date(pin.createdAt).getTime();
      let iconUrl;

      if (pin.username === currentUser) {
        iconUrl = "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png";
      } else if (currentUser && cachedLastVisit) {
        iconUrl =
          pinTime > new Date(cachedLastVisit).getTime()
            ? "https://maps.gstatic.com/mapfiles/ms2/micons/orange-dot.png"
            : "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png";
      } else {
        iconUrl = "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png";
      }

      const icon = L.icon({ iconUrl, iconSize: [32, 32] });
      const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);
      marker.bindPopup(`<strong>Reported by:</strong> ${pin.username}`);
      marker._pinId = pin._id;

      if (currentUser === pin.username) {
        marker.on("click", async () => {
          if (confirm("Unpin this location?")) {
            await deletePin(pin._id);
            loadPins();
          }
        });
      }

      allMarkers.push(marker);
      latLngs.push([pin.lat, pin.lng]);
    });

    if (latLngs.length > 0) map.fitBounds(L.latLngBounds(latLngs));
  } catch (err) {
    alert("Failed to load pins");
    console.error(err);
  } finally {
    document.getElementById("loadingModal").style.display = "none";
  }
}


// Delete pin
async function deletePin(id) {
  const token = localStorage.getItem("token");
  if (!token) return alert("You must log in to delete a pin.");

  const res = await fetch(
    `https://civicwatch-backend-v2.onrender.com/api/pins/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) alert("Failed to delete pin");
}

// Map click
map.on("click", async (e) => {
  if (!hasLoadedPins) {
    await loadPins();
    hasLoadedPins = true;
    return;
  }

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return alert("You must log in to pin a location.");

  const res = await fetch(
    "https://civicwatch-backend-v2.onrender.com/api/pins",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng }),
    }
  );

  if (res.ok) loadPins();
  else alert("Failed to pin location");
});
