//global variables for activity2
let row_count = 1;
let scale_img;
let assembly_img;
let line_out_1;
let line_out_2;
let curve_out;
let canvas1;
let canvas2;
let context1;
let context2;
let rect1;
let rect2;
let scene1;
let reading_count = 0;
let tab;
let va_inp;
let I_inp;
let beta_inp;
let r_inp;
let all_canvas = `
   <canvas id="mycanvas1">

   </canvas>
   <canvas id="mycanvas2" style="position: absolute; left:3.4vw; top:9.7vw;">

   </canvas>
`;
function activity2() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle(`<p id="exp-title">Simulation with experimental setup</p>`, 3);
    let inp_fields = `
	<div>
	   <label style='position: absolute; left: 2.5vw; width: 15vw; top: 1.5vw; font-size: 1.6vw; font-weight: 600;' for="voltage" id='voltage-label'>Voltage (V<sub>a</sub>) = ${v_a} V</label>

      <input type="range" name="voltage" id="voltage" style="position:absolute;top: 4vw; width:40%;" min="0" max="300" value='0' step="10" oninput="calculate_r_2(this)">
	</div>

	<div>
	   <label style='position: absolute; left: 50vw; width: 35vw; top: 1.5vw; font-size: 1.6vw; font-weight: 600;' for="current" id='current-label'>Current through Helmholtz coil = ${I} A</label>

      <input type="range" name="voltage" id="current" style="position:absolute;top: 4vw; width:40%; left:48.5vw" min="0" max="3" value='0' step="0.1" oninput="calculate_beta(this)">
	</div>

   <div id="B-div" style="position:absolute;left:4vw; top:10vw; font-size:25px; font-weight:bold">
      B = ${parseFloat(B.toFixed(6))} 
   </div>
	`;
    pp.addtoleftpannel(inp_fields);
    pp.addtoleftpannel(all_canvas);
    a2_load_table1();
    canvas1 = document.getElementById('mycanvas1');
    canvas2 = document.getElementById('mycanvas2');
    // canvas2.style.border = '1px solid red';
    context1 = canvas1.getContext('2d');
    context2 = canvas2.getContext('2d');
    canvas1.style.cursor = 'crosshair';
    canvas2.style.cursor = 'crosshair';
    rect1 = canvas1.getBoundingClientRect();
    rect2 = canvas2.getBoundingClientRect();
    scene1 = new Scene_Canvas(canvas1);
    scene1.addcanvas(canvas2);
    scale_img = new Chemistry.Custome_image(scale, new Chemistry.Point(750, 295), 1152 * 0.98, 230 * 0.98, canvas1);
    scene1.add(scale_img);
    assembly_img = new Chemistry.Custome_image(assembly, new Chemistry.Point(630, 400), 5766 * 0.21, 3233 * 0.21, canvas1);
    scene1.add(assembly_img);
    // line_out_1 = new Chemistry.Line(
    // 	new Chemistry.Point(151, 230),
    // 	new Chemistry.Point(151, 736),
    // 	2,
    // 	'black',
    // 	canvas1
    // );
    // scene1.add(line_out_1);
    if (isNaN(r) || r === Infinity || r === 0) {
        line_out_2 = new Chemistry.Line(new Chemistry.Point(122.5, 0), new Chemistry.Point(122.5, 736), 1, 'black', canvas2);
        scene1.add(line_out_2);
    }
    else {
        curve_out = new Chemistry.Circle(new Chemistry.Point(122.5 + r_canvas2, 0), r_canvas2, canvas2);
        curve_out.color = 'transparent';
        scene1.add(curve_out);
    }
    scene1.draw();
    add_description_btn();
    show_panel(3);
    // add canvas sizing
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    a2_windowresize();
    // canvas1.addEventListener('click', a2_mouseclick_canvas1);
    // canvas2.addEventListener('click', a2_mouseclick_canvas2);
}
function a2_windowresize() {
    //canvas size
    a2_canvas_size();
    //canvas mapping
    a2_canvas_mapping();
    a2_resizeTable();
    //draw scene
    scene1.draw();
}
function a2_canvas_size() {
    canvas1.width = window.innerWidth * 0.91;
    canvas1.height = ((canvas1.width * 1080.0) / 1920) * 0.85;
    lscale = canvas1.width / 1920.0;
    canvas2.width = window.innerWidth * 0.57;
    canvas2.height = window.innerWidth * 0.2145;
    document.getElementById('leftpannel').style.height =
        canvas1.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a2_canvas_mapping() {
    context1.translate(0, canvas1.height);
    context1.scale(1, -1);
    context2.translate(0, canvas2.height);
    context2.scale(1, -1);
}
function add_description_btn() {
    pp.showdescription(`
         <p class='discription_text'>
            Vary the voltage and the current to take a reading.
         </p>
         <p class='discription_text'>
            Note all the required values in the table and click on verify for each row.
         </p>
      `, 3);
    pp.addtorightpannel(`<button id="panel1_btn" class="btn btn-primary" onclick="a2_verify_reading()" style="position: absolute; bottom: 12vh; width: 91%;">Verify</button>`, 3);
}
function calculate_beta(ele) {
    let b = document.getElementById('B-div');
    let label = (document.getElementById('current-label'));
    I = Number(ele.value);
    label.innerHTML = `Current through Helmholtz coil = ${I} A`;
    B = mu_0 * ((8 * I * N) / (R * sqrt_125)) * 100;
    // B = B + B * ((Math.random() * 10 - 5) / 100);
    B_2 = Math.pow(B, 2);
    calculate_r_2();
    b.innerHTML = `B = ${parseFloat(B.toFixed(6))}`;
    scene1.container.pop();
    if (isNaN(r) || r === Infinity || r === 0) {
        line_out_2 = new Chemistry.Line(new Chemistry.Point(122.5, 0), new Chemistry.Point(122.5, 736), 1, 'black', canvas2);
        scene1.add(line_out_2);
    }
    else {
        curve_out = new Chemistry.Circle(new Chemistry.Point(122.5 + r_canvas2, 0), r_canvas2, canvas2);
        curve_out.color = 'transparent';
        scene1.add(curve_out);
    }
    scene1.draw();
}
function calculate_r_2(ele) {
    let label = (document.getElementById('voltage-label'));
    va_inp = (document.getElementById(`a2-va-inp-${row_count}`));
    I_inp = document.getElementById(`a2-I-inp-${row_count}`);
    beta_inp = (document.getElementById(`a2-B-inp-${row_count}`));
    r_inp = document.getElementById(`a2-r-inp-${row_count}`);
    if (ele) {
        v_a = Number(ele.value);
    }
    label.innerHTML = `Voltage (V<sub>a</sub>) = ${v_a} V`;
    r_2 = (2 * m * v_a) / (e * B_2);
    r = Math.sqrt(r_2) * 100;
    r_canvas2 = (r * 10 * 5.96 + 150.5) / 2;
    e_by_m = (2 * v_a) / (B_2 * r_2);
    console.log('v_a', v_a);
    console.log('I', I);
    console.log('r', r);
    console.log('r_2', r_2);
    console.log('B', B);
    console.log('B_2', B_2);
    console.log('e_by_m', e_by_m);
    scene1.container.pop();
    if (isNaN(r) || r === Infinity || r === 0) {
        line_out_2 = new Chemistry.Line(new Chemistry.Point(122.5, 0), new Chemistry.Point(122.5, 736), 1, 'black', canvas2);
        scene1.add(line_out_2);
        va_inp.disabled = true;
        I_inp.disabled = true;
        beta_inp.disabled = true;
        r_inp.disabled = true;
    }
    else {
        curve_out = new Chemistry.Circle(new Chemistry.Point(122.5 + r_canvas2, 0), r_canvas2, canvas2);
        curve_out.color = 'transparent';
        scene1.add(curve_out);
        va_inp.disabled = false;
        I_inp.disabled = false;
        beta_inp.disabled = false;
        r_inp.disabled = false;
        add_description_btn();
        // show_panel(3);
    }
    scene1.draw();
}
function a2_load_table1() {
    let tbody = ``;
    for (let i = 1; i < 6; i++) {
        tbody += `
         <tr>
            <td>${i}</td>
            <td style="width:8vw"><input disabled  type='text' class='form-control' id='a2-va-inp-${i}' /></td>
            <td style="width:8vw"><input disabled  type='text' class='form-control' id='a2-I-inp-${i}' /></td>
            <td style="width:16vw"><input disabled  type='text' class='form-control' id='a2-B-inp-${i}' /></td>
            <td style="width:8vw"><input disabled  type='text' class='form-control' id='a2-r-inp-${i}' /></td>
         </tr>`;
    }
    let template = `<div id="a2-table-1" class='table-responsive' style=" position:absolute; right:6.5vw; top:10vw;">
      <table class='table' id="a2-datatable" style="text-align:center;">
         <thead class='table-dark'>
            <tr>
               <td>S No.</td>
               <td>V<sub>a</sub>(volts)</td>
               <td>Coil current I (ampere)</td>
               <td>B (Tesla)</td>
               <td>Radius r (cm)</td>
            </tr>
         </thead>
         <tbody>
            ${tbody}
         </tbody>
      </table>
   </div>`;
    pp.addtoleftpannel(template);
    a2_resizeTable();
}
function a2_resizeTable() {
    let tab = (document.getElementById('a2-table-1'));
    tab.style.width = window.innerWidth * 0.3 + 'px';
    tab.style.height =
        ((window.innerWidth * 0.91 * 1080.0) / 1920) * 0.5 + 'px';
}
function a2_verify_reading() {
    console.log('inside verify');
    if (!va_inp || va_inp.disabled || a2_check_duplicate_reading()) {
        pp.showdescription(`<p class='discription_text'>
               Either voltage or current value is 0 or the same set of value is used before.
         </p>
			<p class='discription_text'>
               Change the voltage and the current value and click on next.
         </p>
         `, 3);
        show_panel(3);
        return;
    }
    if (!verify_values(parseFloat(va_inp.value), v_a)) {
        va_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        va_inp.style.border = '1px solid #ced4da';
    }
    if (!verify_values(parseFloat(I_inp.value), I)) {
        I_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        I_inp.style.border = '1px solid #ced4da';
    }
    if (!verify_values(parseFloat(beta_inp.value), B)) {
        beta_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        beta_inp.style.border = '1px solid #ced4da';
    }
    if (!verify_values(parseFloat(r_inp.value), r)) {
        r_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        r_inp.style.border = '1px solid #ced4da';
    }
    va_inp.disabled = true;
    I_inp.disabled = true;
    beta_inp.disabled = true;
    r_inp.disabled = true;
    data_table_1.push([v_a, I, B, B_2, r, r_2, e_by_m]);
    if (row_count === 5) {
        let vol = (document.getElementById('voltage'));
        let cur = (document.getElementById('current'));
        vol.disabled = true;
        cur.disabled = true;
        hide_panel(3);
        pp.showdescription(`
            <p class='discription_text'>
               Successfully taken all the readings.
            </p>
         `, 3);
        pp.addtorightpannel(`<button id="panel1_btn" class="btn btn-primary" onclick="activity3()" style="position: absolute; bottom: 12vh; width: 91%;">Next</button>`, 3);
    }
    else {
        pp.showdescription(`
            <p class='discription_text'>
               Correct reading. Take reading for next row
            </p>
         `, 3);
        show_panel(3);
        setTimeout(() => add_description_btn(), 3000);
        row_count++;
    }
}
function a2_check_duplicate_reading() {
    for (let i = 0; i < data_table_1.length; i++) {
        if (v_a === data_table_1[i][0] && I === data_table_1[i][1])
            return true;
    }
    return false;
}
// remove these event listeners
// function a2_mouseclick_canvas1(e: MouseEvent) {
// 	let x = Math.round((e.clientX - rect1.x) / lscale);
// 	let y = Math.round((canvas1.height - (e.clientY - rect1.y)) / lscale);
// 	console.log('canvas1', x, y);
// }
// function a2_mouseclick_canvas2(e: MouseEvent) {
// 	let x = Math.round((e.clientX - rect2.x) / lscale);
// 	let y = Math.round((canvas2.height - (e.clientY - rect2.y)) / lscale);
// 	console.log('canvas2', x, y);
// }
// remove these event listeners
activity2();
//# sourceMappingURL=activity2.js.map