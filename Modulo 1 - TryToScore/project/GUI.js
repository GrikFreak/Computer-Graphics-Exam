//Davide Greco
//settaggio iniziale della GUI

var controls = new function(){
    this.lightIntensity = 2.5;
    this.shadowIntensity = 0.5;
    this.D = 65;
    this.x_light = 100;
    this.y_light = 200;
    this.z_light = 100;
}

var gui = new dat.GUI();
gui.add(controls, 'lightIntensity', 0, 10);
gui.add(controls, 'shadowIntensity', 0, 4);
gui.add(controls, 'D', 1, 200);
gui.add(controls, 'x_light', -300, 300);
gui.add(controls, 'y_light', 0, 300);
gui.add(controls, 'z_light', -300, 300);