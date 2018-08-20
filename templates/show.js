var queryString = window.location.search.split("?")[1];
console.log("qstring " + queryString);
var paramName = queryString.split("=")[0];
var paramValue = queryString.split("=")[1];
console.log("paramName " + paramName);
console.log("paramValue " + paramValue);

var image = document.createElement('img');
image.setAttribute('src', 'pictures='+paramValue);
document.querySelector('.image-holder').appendChild(image);