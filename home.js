function updateScale() {
    var slider = document.getElementById("slider");
    var value = parseInt(slider.value);
    var indicator = document.getElementById("indicator");
    
    indicator.style.width = value + "%";
    indicator.style.backgroundColor = value == 0 ? "white" : "black";
}
