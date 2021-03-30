// All code will be running when page loads
window.addEventListener(
  'load',
  function () {
    // Preparing a "list" of locations
    var locations = [];

    // We have a dynamic collection on the page
    // with all the information that we need.
    // Change the "place" class name
    // with the one that you use for the collection item
    var dynPlaces = document.querySelectorAll('.w-dyn-item.place');

    // Now we can define each piece of information
    // that we want to publish to the popup on the map
    dynPlaces.forEach(function (elem) {
      // This will be the information that needed to identify
      // the actual location on the map
      var place = [];
      // Change classnames to those that you used
      // for each element in your "info-block"
      var title = elem.querySelector('.place-title').innerText;
      var descript = elem.querySelector('.place-walking').innerText;
      var infoText = elem.querySelector('.info_content').innerHTML;
      var pLat = Number(elem.querySelector('.lat').innerText);
      var pLong = Number(elem.querySelector('.long').innerText);

      place.push(title, infoText, pLat, pLong); // Adding required info about each place to the array of places

      locations.push(place); // Adding each place to the array of Locations
    });

    // Generating a map with parameters we want:
    // - you need set up a zoom level
    // - coordinates for the center of the map
    // - type of the map
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(51.5202464, -0.1655422),
      mapId: '9408d631affad597',
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
      rotateControl: false,
      zoomControl: false,
      fullscreenControl: false,
    });
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    const sentinelMarker = new google.maps.Marker({
      position: { lat: 51.5198817, lng: -0.1654404 },
      map,
      icon: 'https://img.icons8.com/ios-filled/50/000000/here.png',
    });

    // We are using "standard" GoogleMap function
    // to create an info-popup for each marker
    var infowindow = new google.maps.InfoWindow();

    // Reusable function to create a marker
    // based on the information we provide
    function createMarker(latlng, html) {
      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
      });

      // Allow each marker to have an info window
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(html);
        infowindow.open(map, marker);
      });
      return marker;
    }

    gmarkers = [];
    for (var i = 0; i < locations.length; i++) {
      gmarkers[locations[i][0]] = createMarker(
        new google.maps.LatLng(locations[i][2], locations[i][3]), // passing lat and long
        locations[i][1]
      ); // passing Info-window information
    }
  },
  false
);
