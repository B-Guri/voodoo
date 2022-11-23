let map;
let popup;
let Popup;
const position = { lat: 50.38502612821319, lng: 30.47125377920813 };
let infoWindow = document.getElementById("infoWindow");
let markerIcon = "./src/images/carbon_location-filled.svg";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 16,
    disableDefaultUI: true,
    mapTypeControl: false,
  });

  map.setOptions({
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "landscape.man_made",
        stylers: [{ color: "#FCFAF6" }],
      },
      {
        featureType: "all",
        stylers: [{ saturation: -50 }],
      },
    ],
  });

  let marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: markerIcon,
  });

  class Popup extends google.maps.OverlayView {
    position;
    containerDiv;
    isVisible = true;
    constructor(position, content) {
      super();
      this.position = position;
      content.classList.add("popup-bubble");

      const bubbleAnchor = document.createElement("div");

      bubbleAnchor.classList.add("popup-bubble-anchor");
      bubbleAnchor.appendChild(content);

      this.containerDiv = document.createElement("div");
      this.containerDiv.classList.add("popup-container");
      this.containerDiv.appendChild(bubbleAnchor);

      Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    onAdd() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    }

    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      );
      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";

      if (display === "block") {
        this.containerDiv.style.left = divPosition.x + "px";
        this.containerDiv.style.top = divPosition.y + "px";
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }

  popup = new Popup(position, infoWindow);
  popup.setMap(map);

  marker.addListener("click", () => {
    infoWindow.classList.toggle("hidden");
  });
}

window.initMap = initMap;
