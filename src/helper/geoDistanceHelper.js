

const distanceCalculater=(shopLocation,userLocation)=>{
  
    var rad = function(x) {
      return x * Math.PI / 180;
    };
    
      var R = 6378137; // Earth’s mean radius in meters
      var dLat = rad(shopLocation.lat - userLocation.lat);
      var dLong = rad(shopLocation.lng - userLocation.lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(userLocation.lat)) * Math.cos(rad(shopLocation.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2); // Added missing ')' here
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      var actualDistance=Math.floor(((14/100)*d)+d);
      return (actualDistance/1000).toFixed(1); // returns the distance in Km
}

export default distanceCalculater