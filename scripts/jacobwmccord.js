// code adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/markers-with-image-slideshow/

var map = L.mapbox.map('map','jacobwmccord.l31595mc')					//('map')   // ('map','jacobwmccord.l31595mc')
// Construct a bounding box for this map that the user cannot
// move out of

var southWest = L.latLng(52.4934, 13.45867),
northEast = L.latLng(52.545311, 13.328738),
bounds = L.latLngBounds(southWest, northEast);



// uses OSM tiles just to make sure I don't run out of Mapbox data
/*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);*/



// creates popups for map features
// called when each geoJson object is placed on the map
function onEachFeature(feature, layer){

	var images = feature.properties.images
	var slideshowContent = '';

	for(var i = 0; i < images.length; i++) {
		var img = images[i];

		slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
		img[0] +
		'<div class="caption">' + img[1] + '</div>' +
		'</div>';
	}

	// Create custom popup content
	var popupContent =  '<div id="' + feature.properties.id + '" class="popup">' +
	'<h2>' + feature.properties.title + '</h2>' +
	'<div class="slideshow">' +
	slideshowContent +
	'</div>' +
	'<div class="cycle">' +
	'<a href="#" class="prev">&laquo; Previous</a>' +
	'<a href="#" class="next">Next &raquo;</a>' +
	'</div>'
	'</div>';

	// http://leafletjs.com/reference.html#popup
	layer.bindPopup(popupContent,{
		closeButton: false,
		maxWidth: 250,
		maxHeight: 300,
		autoPan: true,
		keepInView: true

	});

}



// Adds images to the map using Leaflet's imageOverlay function
var imageURL = 'images/stadium.png',
imageBounds = [[52.510232, 13.231320], [52.519018, 13.253973]];

var olympicOverlay = (L.imageOverlay(imageURL, imageBounds)).addTo(map)

imageURL = 'images/camp.png';
imageBounds = [[52.524832, 13.226037], [52.535159, 13.244893]];

var campOverlay = (L.imageOverlay(imageURL, imageBounds)).addTo(map)




// overarching style for the polyogns (all in one place so the shapes can
// be made visible for debugging)
var myStyle = {
		"color": "#ff7800",
		"weight": 0,
		"fillOpacity": 0.0
};

// Add features to the map, adds popup content to them, and makes them invisible
L.geoJson(geoJson,{style: myStyle, onEachFeature: onEachFeature}).addTo(map);




// This example uses jQuery to make selecting items in the slideshow easier.
// Download it from http://jquery.com
$('#map').on('click', '.popup .cycle a', function() {
	var $slideshow = $('.slideshow'),
	$newSlide;

	if ($(this).hasClass('prev')) {
		$newSlide = $slideshow.find('.active').prev();
		if ($newSlide.index() < 0) {
			$newSlide = $('.image').last();
		}
	} else {
		$newSlide = $slideshow.find('.active').next();
		if ($newSlide.index() < 0) {
			$newSlide = $('.image').first();
		}
	}

	$slideshow.find('.active').removeClass('active').hide();
	$newSlide.addClass('active').show();
	return false;
});

map.setView([52.509187, 13.303643], 13);
