const map = L.map("map").setView([6.5244, 3.3792], 13); // Lagos default

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let allMarkers = []; // To store markers
let hasLoadedPins = false; // Track if pins have been loaded on first click

// Function to load all pins
async function loadPins() {
  const res = await fetch("http://localhost:5000/api/pins");
  const pins = await res.json();

  allMarkers.forEach((marker) => map.removeLayer(marker));
  allMarkers = [];

  const latLngs = [];
  const currentUser = localStorage.getItem("username");

  pins.forEach((pin) => {
    const iconUrl =
      pin.username === currentUser
        ? "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png"
        : "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png";

    const icon = L.icon({ iconUrl, iconSize: [32, 32] });

    const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);
    marker.bindPopup(`<strong>Reported by:</strong> ${pin.username}`);
    marker._pinId = pin._id;

    if (currentUser === pin.username) {
      marker.on("click", async () => {
        if (confirm("Unpin this location?")) {
          await deletePin(pin._id);
          loadPins(); // Reload pins
        }
      });
    }

    latLngs.push([pin.lat, pin.lng]);
    allMarkers.push(marker);
  });

  if (latLngs.length > 0) {
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds);
  }
}

// Function to delete a pin
async function deletePin(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must log in to delete a pin.");
    return;
  }

  const res = await fetch(`http://localhost:5000/api/pins/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    alert("Failed to delete pin");
  }
}

// Handle map clicks
map.on("click", async (e) => {
  // First click: load pins
  if (!hasLoadedPins) {
    await loadPins();
    hasLoadedPins = true;
    return;
  }

  // After first click: allow pinning if logged in
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!token || !username) {
    alert("You must log in to pin a location.");
    return;
  }

  const res = await fetch("http://localhost:5000/api/pins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    }),
  });

  if (res.ok) {
    loadPins();
  } else {
    alert("Failed to pin location");
  }
});
