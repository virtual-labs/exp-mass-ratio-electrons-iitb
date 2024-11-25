class Scene {
	container: { geo: Chemistry.Geometry }[] = [];
	constructor() {
		this.container = [];
	}
	add(geometry: Chemistry.Geometry) {
		this.container.push({ geo: geometry });
		this.draw();
	}
	draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas_border();
		for (let i = 0; i < this.container.length; i++) {
			this.container[i].geo.draw();
		}
	}
	area(name: string): number {
		for (let i = 0; i < this.container.length; i++) {
			if (this.container[i].geo.name == name) {
				return this.container[i].geo.area;
			}
		}
		return 0;
	}
}

class Scene_Canvas extends Scene {
	container: { geo: Chemistry.Geometry }[] = [];
	canvas: HTMLCanvasElement[];
	context: CanvasRenderingContext2D[];
	constructor(canvas: HTMLCanvasElement) {
		super();
		this.canvas = [];
		this.context = [];
		this.canvas.push(canvas);
		this.context.push(canvas.getContext('2d'));
		this.container = [];
	}
	add(geometry: Chemistry.Geometry) {
		this.container.push({ geo: geometry });
		this.draw();
	}

	addcanvas(canvas: HTMLCanvasElement) {
		this.canvas.push(canvas);
		this.context.push(canvas.getContext('2d'));
	}

	draw() {
		for (let i = 0; i < this.canvas.length; i++) {
			this.context[i].clearRect(
				0,
				0,
				this.canvas[i].width,
				this.canvas[i].height
			);
			// canvas_border_context(this.canvas[i]);
		}

		for (let i = 0; i < this.container.length; i++) {
			this.container[i].geo.draw();
		}
	}
	area(name: string): number {
		for (let i = 0; i < this.container.length; i++) {
			if (this.container[i].geo.name == name) {
				return this.container[i].geo.area;
			}
		}
		return 0;
	}
}

function canvas_border() {
	context.beginPath();
	var grd = context.createRadialGradient(
		canvas.width / 2,
		canvas.height / 2,
		0,
		canvas.width / 2,
		canvas.height / 2,
		canvas.width
	);

	// grd.addColorStop(0, "rgba(50,50,50,1)");
	// grd.addColorStop(1, "rgba(75,75,75,1)");

	// context.roundRect(0.015*canvas.width, 0.03*canvas.height, ((canvas.width/1.4)-0.04*canvas.width)*canvas_box_scale, canvas.height-0.04*canvas.height, [5, 5 , 5, 5]);
	//context.fillStyle
	// context.stroke();
	// context.strokeStyle = "grey";

	//context.fillStyle=grd;
	context.fillStyle = 'rgb(242, 242, 242)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.lineWidth = 4;
	context.stroke();
}

function canvas_border_context(canvas: HTMLCanvasElement) {
	let context = canvas.getContext('2d');
	context.beginPath();
	var grd = context.createRadialGradient(
		canvas.width / 2,
		canvas.height / 2,
		0,
		canvas.width / 2,
		canvas.height / 2,
		canvas.width
	);

	// grd.addColorStop(0, "rgba(50,50,50,1)");
	// grd.addColorStop(1, "rgba(75,75,75,1)");

	// context.roundRect(0.015*canvas.width, 0.03*canvas.height, ((canvas.width/1.4)-0.04*canvas.width)*canvas_box_scale, canvas.height-0.04*canvas.height, [5, 5 , 5, 5]);
	//context.fillStyle
	// context.stroke();
	// context.strokeStyle = "grey";

	//context.fillStyle=grd;
	//context.fillStyle = "rgb(242, 242, 242)";
	context.rect(0, 0, canvas.width, canvas.height);
	context.lineWidth = 4;
	context.stroke();

	context.lineWidth = 1;
}
