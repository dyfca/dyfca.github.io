function increaseProgressBar() {
	var d = document.getElementById("progress-bar");
	var tmp = parseInt(d.style.width.substring(0, 2)) + 10;
	if (tmp === 110)
		tmp = 0;

	d.style.width = tmp + "%";
}