declare var MathJax;

function activity3() {
	console.log('table data', data_table_1);

	internal_calculation3();
	cal_percentage_error();

	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(`<p id="exp-title">Calculate e/m</p>`, 3);
	pp.showdescription(
		`
      <p class='discription_text'>
         $$ \\frac{e}{m} = \\frac{2 \× V_a}{B^2 \× r^2} $$
         
         Calculate e/m for the table.

      </p>
      `,
		3
	);

	pp.addtorightpannel(
		`<button  class="btn btn-primary" onclick="a3_verify_table()" style="position: absolute; bottom: 12vh; width: 91%;">Verify</button>`,
		3
	);

	show_panel(3);
	a3_load_table1();

	setTimeout(() => MathJax.typeset(), 150);
}

function internal_calculation3() {
	let temp_mean = 0;

	for (let i = 0; i < data_table_1.length; i++) {
		temp_mean += data_table_1[i][6];
	}

	e_by_m_mean = temp_mean / data_table_1.length;

	e_by_m_compare =
		standard_e_by_m === e_by_m_mean
			? 1
			: e_by_m_mean < standard_e_by_m
			? 2
			: 3;
	console.log(e_by_m_mean);
}

function cal_percentage_error() {
	let error = Math.round(
		Math.abs((e_by_m_mean - standard_e_by_m) / standard_e_by_m) * 100
	);

	console.log('error', error);

	if (error <= 1) {
		percentage_error = 1;
	} else if (error > 1 && error <= 5) {
		percentage_error = 5;
	} else if (error > 5 && error <= 10) {
		percentage_error = 10;
	} else if (error > 10) {
		percentage_error = 15;
	}
}

function a3_load_table1() {
	let tbody = ``;
	for (let i = 0; i < data_table_1.length; i++) {
		tbody += `<tr>
                  <td style="width:15vw">${i + 1}</td>
                  <td style="width:15vw">${data_table_1[i][0]}</td>
                  <td style="width:15vw">${data_table_1[i][1]}</td>
                  <td style="width:15vw">${parseFloat(
						data_table_1[i][2].toFixed(6)
					)}</td>
                  <td style="width:15vw">${parseFloat(
						data_table_1[i][4].toFixed(1)
					)}</td>
                  <td style="width:15vw">${data_table_1[i][5].toFixed(6)}</td>
                  <td  style="width:13vw; display:flex; justify-content:center; flex-wrap:nowrap; align-items:center;"><input type='text' class='form-control' id='a3-e-by-m-inp-${i}' style="width:50%"/><span style="display:contents;"> &emsp;&times;10<sup>11</sup></span></td>
                  
            </tr>`;
	}

	let template = `<div id="a3-table-1" class='table-responsive' style="margin-top:5px;">
      <table class='table' id="a3-datatable" style="text-align:center;">
         <thead class='table-dark'>
            <tr>
               <td>S No.</td>
               <td>V<sub>a</sub>(volts)</td>
               <td>Coil current I (ampere)</td>
               <td>B (Tesla)</td>
               <td>Radius r (cm)</td>
               <td>r<sup>2</sup></td>
               <td>e/m (C/kg)</td>
            </tr>
         </thead>
         <tbody>
            ${tbody}
         </tbody>
      </table>
   </div>`;

	pp.addtoleftpannel(template);
	// a3_resizeTable();
}

function a3_resizeTable() {
	let tab: HTMLDivElement = <HTMLDivElement>(
		document.getElementById('a3-table-1')
	);
	tab.style.width = window.innerWidth * 0.9 + 'px';
	tab.style.height =
		((window.innerWidth * 0.91 * 1080.0) / 1920) * 0.75 + 'px';
}

function a3_verify_table() {
	let e_by_m_inp: HTMLInputElement;

	for (let i = 0; i < data_table_1.length; i++) {
		e_by_m_inp = <HTMLInputElement>(
			document.getElementById(`a3-e-by-m-inp-${i}`)
		);

		console.log(data_table_1[i][6] / 10 ** 11);

		if (
			!verify_values(
				parseFloat(e_by_m_inp.value),
				data_table_1[i][6] / 10 ** 11
			)
		) {
			e_by_m_inp.style.border = '1px solid red';
			alert('Incorrect value');
			return;
		} else {
			e_by_m_inp.style.border = '1px solid #ced4da';
			e_by_m_inp.disabled = true;
		}
	}
	a3_load_data_table();
}

function a3_load_data_table() {
	pp.clearleftpannel();
	// pp.clearrightpannel();
	// pp.addoffcanvas(3);

	// pp.showtitle(`<p id="exp-title">Gouy's method</p>`, 3);
	pp.showdescription(
		`<p class='discription_text'>Calculations correct. Calculate average e/m.</p>`,
		3
	);
	show_panel(3);

	let tbody = ``;
	for (let i = 0; i < data_table_1.length; i++) {
		tbody += `<tr>

                  <td style="width:15vw">${i + 1}</td>
                  <td style="width:15vw">${data_table_1[i][0]}</td>
                  <td style="width:15vw">${data_table_1[i][1]}</td>
                  <td style="width:15vw">${parseFloat(
						data_table_1[i][2].toFixed(6)
					)}</td>
                  <td style="width:15vw">${parseFloat(
						data_table_1[i][4].toFixed(1)
					)}</td>
                  <td style="width:15vw">${data_table_1[i][5].toFixed(6)}</td>
                  <td style="width:15vw">${data_table_1[i][6].toExponential(
						6
					)}</td>
            </tr>`;
	}

	let template = `<div class='table-responsive' style="margin-top:5px;">
      <table class='table' id="a3-datatable2" style="text-align:center;">
         <thead class='table-dark'>
            <tr>
               <td>S No.</td>
               <td>V<sub>a</sub>(volts)</td>
               <td>Coil current I (ampere)</td>
               <td>B (Tesla)</td>
               <td>Radius r (cm)</td>
               <td>r<sup>2</sup></td>
               <td>e/m (C/kg)</td>
            </tr>
         </thead>
         <tbody>
            ${tbody}
         </tbody>
      </table>
   </div>
   <br>
   <div class="row" id='mean-em-div'>
         <h4 class="col-md-3">Calculated mean e/m = </h4>
         <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
            <input style="width:50%"  type="text" id='mean-em'/><span style="display:contents;"> &emsp;&times;10<sup>11</sup> C/kg</span>
         </div>
         
         <button id="mean-em-btn" class="btn btn-primary col-md-2" onclick="verify_mean_e_by_m()" style="margin-left:10px;" >Verify</button>
      </div>
   `;

	pp.addtoleftpannel(template);
}

function verify_mean_e_by_m() {
	let mean_em_inp = <HTMLInputElement>document.getElementById('mean-em');
	let btn = <HTMLButtonElement>document.getElementById('mean-em-btn');

	console.log(e_by_m_mean / 10 ** 11);

	if (!verify_values(parseFloat(mean_em_inp.value), e_by_m_mean / 10 ** 11)) {
		alert('Incorrect answer');
		return;
	} else {
		pp.showdescription(
			`<p class='discription_text'>Calculations correct. Click on next.</p>`,
			3
		);

		pp.addtorightpannel(
			`<button id="panel1_btn" class="btn btn-primary" onclick="activity4()" style="position: absolute; bottom: 12vh; width: 91%;">Next</button>`,
			3
		);
		show_panel(3);
	}
	btn.remove();
	mean_em_inp.disabled = true;
}

// activity3();
