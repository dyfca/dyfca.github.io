var currentProcess = 1
var maxId = 7;
var prefix="location.href='https://www.w3schools.com/"
var suffix="/default.asp'"
var data = ["xml", "html", "css", "js", "jquery", "angular", "bootstrap"]
function enableClick(id) {
	if (id > maxId)
		return;
	var str = "process-" + id.toString();
	var ele = document.getElementById(str);
	if (id != 2)
		ele.childNodes[3].setAttribute("onclick", prefix+data[id-1]+suffix);
	else
		ele.childNodes[3].setAttribute("onclick", "window.location = './info.html'; return false;");
	ele.childNodes[5].setAttribute("onclick", "enableClick("+(id+1).toString()+")");
	ele.childNodes[3].classList.remove("disabled");
	ele.childNodes[5].classList.remove("disabled");
	id++;
}