var allPerson = [{firstName: "Sheng",lastName: "Ma", userName: "Machine", email: "shengma2019@u.northwestern.edu", address: "1212 Church St.", address2: "Mudd Library", image: "image/masheng.png"}, 
{firstName: "Yifei",lastName: "Deng", userName: "Daniel", email: "yifeideng2018@u.northwestern.edu", address: "1100 Church St.", address2: "Mudd Library", image: "image/yifeideng.jpg"}];
var currentNav = document.getElementsByClassName("first-one")[0];
var id = location.search.split('id=')[1];
var setPerson = (function(){
	var person;

	function render() {
		document.getElementById("firstName").value = person.firstName == undefined ? "" : person.firstName;
		document.getElementById("lastName").value = person.lastName == undefined ? "" : person.lastName;
		document.getElementById("userName").value = person.userName == undefined ? "" : person.userName;
		document.getElementById("email").value = person.email == undefined ? "" : person.email;
		document.getElementById("address").value = person.address == undefined ? "" : person.address;
		document.getElementById("address2").value = person.address2 == undefined ? "" : person.address2;
		document.getElementById("person-image").src = person.image;
	}
	return function(p) {
		person = p;
		render();
	};
})();

function changeNav(nav) {
	currentNav.classList.remove("active");
	nav.classList.add("active");
	currentNav = nav;
}

function init() {
	setPerson(allPerson[id]);
}

