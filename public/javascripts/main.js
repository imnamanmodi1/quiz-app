// select category element
var Arr = document.querySelectorAll(".category");

// making all categories capital
for (i=0; i< Arr.length; i++){
	Arr[i].textContent = Arr[i].textContent.toUpperCase();
	console.log(Arr[i]);
};