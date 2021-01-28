/*jshint esversion: 6 */
const TABLECHAIR_START_POS = [-20, -5, 26];
const TABLECHAIR_INCREMENT = [0, 0, -8];

const DROPZONE_START_POS = [0, -4.99, 0];
const DROPZONE_INCREMENT = [10, 0, 0];

const DROPZONE_TABLE_SIZE = 3.5;
const DROPZONE_CHAIR_SIZE = 2.5;

// const DROPZONE_TABLE_START_POS = [];
// const DROPZONE_CHAIR_START_POS = [];

const MEASUREMENTS_TEXT_COLOR = "white";
const MEASUREMENTS_LINE_COLOR = "white";


window.onload = () => {
	console.log("js connected");
	const hintsKnop = document.getElementById("hintsKnop--js");
	const hints = document.getElementById("hintsText--js");
	const inhoud = ["Kijk naar de poster", "", "item3"];
	let index = 0;

	function hintsText(getal) {
	    console.log(getal);
	    hints.setAttribute("value", inhoud[getal]);
	}

	hintsKnop.onclick = (event) => {
		console.log(index);
		hintsText(index), index++;	
	}

	const introKnop = document.getElementById("introKnop--js");
	const intro = document.getElementById("introText--js");
	const inh = ["Welkom bij onze \n rekenles \n\n Druk op de groene knop voor meer", "Wij gaan een klaslokaal inrichten", "Loop nu door de gang \n naar het andere klaslokaal \n en loop naar de juf"];
	let ind = 0;

	function introText(getal) {
	    intro.setAttribute("value", inh[getal]);
	}

	introKnop.onclick = (event) => {
		console.log(ind);
		introText(ind), ind++;
	}
}




// window.addEventListener("load", function() {
// 	console.log("Loaded!");

// 	const camera = document.querySelector(".js--camera");


// 	let keyPressed = [];


// 	window.addEventListener("keydown", function(e) {
// 		const i = keyPressed.indexOf(e.key);
// 		if (i != -1) keyPressed.splice(i, 1);
// 		keyPressed.push(e.key);
// 	});

// 	window.addEventListener("keyup", function(e) {
// 		const i = keyPressed.indexOf(e.key);
// 		if (i != -1) keyPressed.splice(i, 1);
// 	});

// 	function handleKeys() {
// 		if (keyPressed.length > 0) {
// 			const cp = camera.getAttribute("position");
// 				if(keyPressed.includes("Shift")) {
// 					camera.setAttribute("position", cp.x + " " + (cp.y-0.2) + " " + cp.z);
// 				}
// 				if(keyPressed.includes(" ")) {
// 					camera.setAttribute("position", cp.x + " " + (cp.y+0.2) + " " + cp.z);
// 				}
// 				// if(keyPressed.includes("w")) {
// 				// 	camera.setAttribute("position", cp.x + " " + cp.y + " " + (cp.z-0.2));
// 				// }
// 				// if(keyPressed.includes("a")) {
// 				// 	camera.setAttribute("position", (cp.x-0.2) + " " + cp.y + " " + cp.z);
// 				// }
// 				// if(keyPressed.includes("s")) {
// 				// 	camera.setAttribute("position", cp.x + " " + cp.y + " " + (cp.z+0.2));
// 				// }
// 				// if(keyPressed.includes("d")) {
// 				// 	camera.setAttribute("position", (cp.x+0.2) + " " + cp.y + " " + cp.z);
// 				// }

// 		}
// 		window.requestAnimationFrame(handleKeys);
// 	}

// 	window.requestAnimationFrame(handleKeys);
// });


const levels = [
	{
		name: "Level 1",
		tables: ["measurements: 3 3 3; units: cm cm cm",
				"measurements: 300 300 300; units: cm cm cm",
				"measurements: 30 30 30; units: cm cm cm"],
		chairs: [],
		dropzones: {
			tables: ["measurements: 300 300 300; units: mm mm mm",
			"measurements: 300 300 300; units: mm mm mm",
			"measurements: 300 300 300; units: mm mm mm",
			"measurements: 300 300 300; units: mm mm mm"],
			chairs: []
		},
		points: 10,
	},
	{
		name: "Level 2",
		tables: ["measurements: 30 30 30; units: cm cm cm",
				"measurements: 300 300 300; units: cm cm cm",
				"measurements: 3000 3000 3000; units: cm cm cm"],
		chairs: [],
		dropzones: {
			tables: ["measurements: 0.3 0.3 0.3; units: m m m"],
			chairs: []
		},
		points: 10,
	},
];

let currentLevel = 0;


window.addEventListener("load", function() {
	const camera = document.querySelector(".js--camera");

	const interactiveEl = document.querySelectorAll("[data-interactive]");
	const pickupableNodes = document.querySelectorAll("[data-pickupable]");
	const placeableNodes = document.querySelectorAll("[data-placeable]");

	// for (let i = 0; i < interactiveEl.length; i++) {
	// 	const pickupable = interactiveEl[i].getAttribute("data-pickupable");
	// 	if (pickupable != null) {
	// 		addPickupEvent(interactiveEl[i]);
	// 	}

	// 	const placeable = interactiveEl[i].getAttribute("data-placeable");
	// 	if (placeable != null) {
	// 		addPlaceEvent(interactiveEl[i]);
	// 	}
	// }


	for (let i = 0; i < pickupableNodes.length; i++) {
		addPickupEvent(pickupableNodes[i]);
	}

	for (let i = 0; i < placeableNodes.length; i++) {
		if (placeableNodes[i].getAttribute("data-placeable") == "0") {
			addPlaceEvent(placeableNodes[i], 1);
		} else{
			addPlaceEvent(placeableNodes[i]);
		}
	}

	// camera.addEventListener("click", function(e) {
	// 	console.log("CLICKED!", e, e.target);
	// 	// camera.appendChild(e.target);
	// });

	loadLevel();


});

// const units = {
// 	"mm": 1,
// 	"cm": 10,
// 	"dm": 100,
// 	"m": 1000,
// 	"dam": 10000,
// 	"hm": 100000,
// 	"km": 1000000,
// };

const units = {
	"mm": 1,
	"cm": 2,
	"dm": 3,
	"m": 4,
	"dam": 5,
	"hm": 6,
	"km": 7,
};

function calculateLength(length, unit, to="cm") {
	let calculatedLength;

	if (unit == to) return length;

	const diff = units[unit] - units[to];

	calculatedLength = length * (10 ** diff);

	return Number(calculatedLength.toPrecision(1));
}


function addPosArrays(arr1, arr2, addTimes=1) {
	let tmp = Array.from(arr1);
	tmp[0] += isNaN(arr2[0]*addTimes) ? 0 : arr2[0]*addTimes;
	tmp[1] += isNaN(arr2[1]*addTimes) ? 0 : arr2[1]*addTimes;
	tmp[2] += isNaN(arr2[2]*addTimes) ? 0 : arr2[2]*addTimes;
	return tmp;
}

function pos2str(pos) {
	return pos.join(" ");
}

function getCurrentLevel() {
	return levels[currentLevel];
}

function loadLevel(levelId=currentLevel) {
	removeElementsFromLevel();
	currentLevel = levelId;

	let lvl = levels[levelId];


	console.log("Loading level: ", lvl.name);

	placeTables(lvl.tables);
	placeChairs(lvl.chairs);
	placeDropzones(lvl.dropzones);
}

function removeElementsFromLevel() {
	let elements = document.querySelectorAll("[data-pickupable], [data-placeable]:not(a-plane)");

	for (let i = 0; i < elements.length; i++) {
		elements[i].remove();
	}
}

function placeTables(tables) {
	for (let i = 0; i < tables.length; i++) {
		tableMeasurements = tables[i];
		placeTable(tableMeasurements, addPosArrays(TABLECHAIR_START_POS, TABLECHAIR_INCREMENT, i));
	}
}

function replaceTable(tableElement) {
	let clonedNode = aFrameCloneFully(tableElement);
	clonedNode.setAttribute("position", tableElement.getAttribute("original-position"));
	clonedNode.classList.remove("js--hold");

	clonedNode.setAttribute("measurements", "show", true);

	addPickupEvent(clonedNode);

	document.querySelector(".js--tableholder").appendChild(clonedNode);

	tableElement.remove();
}

function placeTable(tableMeasurements, position=TABLECHAIR_START_POS) {
		console.log(tableMeasurements, position);

		const tableElement = createTableElement(tableMeasurements, position);

		document.querySelector(".js--tableholder").appendChild(tableElement);
}

function createTableElement(measurementsAttr, position=TABLECHAIR_START_POS) {
	let tableElement = document.createElement("a-entity");

	tableElement.setAttribute("data-interactive", "");
	tableElement.setAttribute("data-pickupable", "");
	tableElement.setAttribute("gltf-model", "#classroom_table");
	tableElement.setAttribute("scale", "0.0175 0.0175 0.0175");
	tableElement.setAttribute("pivotpoint", "0 100 0");
	tableElement.setAttribute("position", pos2str(position));
	tableElement.setAttribute("measurements", measurementsAttr);
	tableElement.setAttribute("original-position", pos2str(position));

	addPickupEvent(tableElement);

	return tableElement;
}

function placeChairs(chairs) {
	for (let i = 0; i < chairs.length; i++) {
		chairMeasurements = chairs[i];
		placeChair(chairMeasurements, addPosArrays(TABLECHAIR_START_POS, TABLECHAIR_INCREMENT, i));
	}
}

function placeChair(chairMeasurements, position=TABLECHAIR_START_POS) {
		console.log(chairMeasurements, position);
}

function placeDropzones(dropzones) {
	for (let i = 0; i < dropzones.tables.length; i++) {
		console.log(addPosArrays(DROPZONE_START_POS, DROPZONE_INCREMENT, i));
		placeDropzone(dropzones.tables[i], addPosArrays(DROPZONE_START_POS, DROPZONE_INCREMENT, i), "table");
	}

	for (let i = 0; i < dropzones.chairs.length; i++) {
		placeDropzone(dropzone.chairs[i], addPosArrays(DROPZONE_START_POS, DROPZONE_INCREMENT, i), "chair");
	}
}

function placeDropzone(measurementsAttr, position=DROPZONE_START_POS, type="table") {
	const dropzoneElement = createDropzoneElement(measurementsAttr, position, type);

	dropzoneElement.addEventListener("object3dset", () => {
		dropzoneElement.setAttribute("measurements", measurementsAttr);
	});

	document.querySelector(".js--dropzoneholder").appendChild(dropzoneElement);
}

// material="color:aqua;opacity:0.3;"
// 		radius="3.5"
// 		position="0 -4.99 0"
// 		rotation="-90 0 0"
// 		data-interactive
// 		data-placeable
// 		data-measurements="50cm 70cm 64cm"

function createDropzoneElement(measurementsAttr, position=DROPZONE_START_POS, type="table") {
	let dropzoneElement = document.createElement("a-circle");

	dropzoneElement.setAttribute("material", "color:aqua;opacity:0.3");
	dropzoneElement.setAttribute("radius", type == "table" ? DROPZONE_TABLE_SIZE : DROPZONE_CHAIR_SIZE);
	dropzoneElement.setAttribute("rotation", "-90 0 0");
	dropzoneElement.setAttribute("data-interactive", "");
	dropzoneElement.setAttribute("data-placeable", "");
	dropzoneElement.setAttribute("measurements", measurementsAttr);
	dropzoneElement.setAttribute("position", pos2str(position));

	addPlaceEvent(dropzoneElement);

	return dropzoneElement;
}


function speak(text, done=function() {}) {
	const voices = speechSynthesis.getVoices();
	utterance = new SpeechSynthesisUtterance(text);

	for (let i = 0; i < voices.length; i++) {
		if (voices[i].lang == "nl-Nl") {
			console.log("Found!");
			utterance.voice = voices[i];
			break;
		}
	}

    utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 0.9; // 0.1 to 10
    utterance.pitch = 0.95; //0 to 2
    utterance.text = text;
    utterance.lang = 'nl-Nl';
	speechSynthesis.speak(utterance);

	utterance.onend = done;
}

function aFrameCloneFully(node) {
	let clonedNode = node.cloneNode();

	const attrs = node.attributes;

	for (let i = 0; i < attrs.length; i++) {
		clonedNode.setAttribute(attrs[i].name, node.getAttribute(attrs[i].name));
	}

	return clonedNode;
}


function addPlaceEvent(element, destroy=0) {
	element.addEventListener("click", function(e) {
		let holding = document.querySelector(".js--hold");

		if (holding && destroy == 1) return replaceTable(holding); // TODO: Place back at starting position
		const placeEl = e.target;
		const hasPlaceableAttr = placeEl.getAttribute("data-placeable") == null ? false : true;
		if (!holding || !hasPlaceableAttr) {
			const parentIsPlaceable = placeEl.parentEl.getAttribute("data-placeable") == null ? false : true;
			if (parentIsPlaceable) return; // TODO: add visual feedback for the user
			return;
		}


		placeEl.setAttribute("measurements", "show", false);

		if (placeEl.querySelector("[data-pickupable]") != null) return console.error("Cannot place there!"); // TODO: add visual feedback for the user
		const placePos = placeEl.getAttribute("position");
		const placeRot = placeEl.getAttribute("rotation");

		// const clonedNode = holding.cloneNode();
		const clonedNode = aFrameCloneFully(holding);

		clonedNode.setAttribute("measurements", "show", true);

		clonedNode.classList.remove("js--hold");
		clonedNode.setAttribute("scale", "0.0175 0.0175 0.0175");
		// clonedNode.setAttribute("position", placePos.x + " "+ placePos.y + 0.01 +" " + placePos.z);
		clonedNode.setAttribute("position", "0 0.01 0");
		clonedNode.setAttribute("rotation", (placeRot.x * -1 + 90) + " " + (placeRot.y * -1 + 90) + " " + (placeRot.z * -1 + 90));
		placeEl.appendChild(clonedNode);

		holding.remove();

		addPickupEvent(clonedNode);
	});
}

function addPickupEvent(element) {
	element.addEventListener("click", function(e) {
		const holding = document.querySelector(".js--hold");
		if (holding) {
			console.warn("Already holding something!", holding);
			return;
		}

		const camera = document.querySelector(".js--camera");
		const cp = camera.getAttribute("position");

		const x = 3;
		const y = -1;
		const z = 0;

		// let clonedNode = e.target.cloneNode();
		const clonedNode = aFrameCloneFully(e.target);

		clonedNode.classList.add("js--hold");

		clonedNode.setAttribute("position", "0 -5 0");

		const parent = e.target.parentNode;


		if (parent.getAttribute("data-placeable") == null ? false : true) {
			e.target.parentNode.setAttribute("measurements", "show", true);
		}

		// let measurementsAttr = clonedNode.getAttribute("measurements");
		// if (measurementsAttr) {
		// 	measurementsAttr.show = false;
		// 	clonedNode.setAttribute("measurements", measurementsAttr);
		// }

		clonedNode.setAttribute("rotation", "0 0 0");
		clonedNode.setAttribute("measurements", "show", false);

		camera.appendChild(clonedNode);

		e.target.remove();
	});
}

AFRAME.registerComponent("camera-rotate", {
    init: function() {
        let angles = this.data.split(" ");
        let xAngle = Number(angles[0]);
        let yAngle = Number(angles[1]);

        this.el.components['look-controls'].pitchObject.rotation.x = THREE.Math.degToRad(xAngle);
        this.el.components['look-controls'].yawObject.rotation.y = THREE.Math.degToRad(yAngle);
    }
});

AFRAME.registerComponent('pivotpoint', {
	dependencies: ['position'],
	schema: {type: 'vec3'},
	init: function () {
		let data = this.data;
		
		this.el.addEventListener('object3dset', () => {
			let mesh = this.el.getObject3D('mesh');
			if (!mesh) return;

			mesh.position.set(data.x, data.y, data.z);
		});
	}
});

AFRAME.registerComponent("rotate-towards-camera", {
	init: function() {
		this.cameraEl = document.querySelector('a-camera');
	},
	tick: function() {
		this.setRotation();
	},
	setRotation: function() {
		let cameraRotation = this.cameraEl.getAttribute("rotation");
		// toSetRotation.x = oppositeAngle(toSetRotation.x);
		// toSetRotation.y = oppositeAngle(toSetRotation.y);
		// toSetRotation.z = oppositeAngle(toSetRotation.z);
		this.el.setAttribute("rotation", cameraRotation);
	}
});

AFRAME.registerComponent('measurements', {
	schema: {
		measurements: {type: "string"},
		units: {type: "string"},
		show: {type: "boolean", default: true}
	},
	init: function() {
		const xyz = this.data.measurements.split(" ");
		const xyzU = this.data.units.split(" ");
		this.xMeasurement = xyz[0];
		this.yMeasurement = xyz[1];
		this.zMeasurement = xyz[2];

		this.xUnit = xyzU[0];
		this.yUnit = xyzU[1];
		this.zUnit = xyzU[2];

		this.addedMeasurements = false;
		if (this.el.object3D && (this.el.object3D.children && this.el.object3D.children.length > 0)) {
			this.addMeasurements();
		} else {
			const object3dsetListener = () => {
				this.addMeasurements();
			};
			this.el.addEventListener("object3dset", object3dsetListener, {once: true});

		}

	},
	update: function() {
		if (!this.addedMeasurements) return;
		const xyz = this.data.measurements.split(" ");
		const xyzU = this.data.units.split(" ");

		if (this.xMeasurement != xyz[0] ||
				this.yMeasurement != xyz[1] ||
				this.zMeasurement != xyz[2] ||
				this.xUnit != xyzU[0] ||
				this.yUnit != xyzU[1] ||
				this.zUnit != xyzU[2]) {

			// console.log("SOMETHING OTHER THAN SHOW HAS BEEN CHANGED!!!", this.data);
			this.xMeasurement = xyz[0];
			this.yMeasurement = xyz[1];
			this.zMeasurement = xyz[2];

			this.xUnit = xyzU[0];
			this.yUnit = xyzU[1];
			this.zUnit = xyzU[2];

			const mt = this.el.querySelector(".measurementText");
			const mc = this.el.querySelector(".measurementCube");

			if (mt) mt.remove();
			if (mc) mc.remove();
			this.addedMeasurements = false;
			if (this.el.object3D) {
				this.addMeasurements();
			}
		}

		let textWidth = this.el.querySelector(".measurementText");
		let cubeWidth = this.el.querySelector(".measurementCube");

		// console.log("[][][][][][][][][][][][][][]", this.data.show, textWidth, cubeWidth);

		textWidth.setAttribute("visible", this.data.show);
		cubeWidth.setAttribute("visible", this.data.show);

	},
	addMeasurements: function() {
		if (this.addedMeasurements) return;
		// console.error("addMeasurements", this.data.show);
		this.addedMeasurements = true;
// <a-text value="30" color="white" scale="200 200 200"></a-text>
// <a-box width="5.74" height="0.1" depth="0.1" scale="57.14 57.14 57.14"></a-box>
		const sizes = this.getMeshSize();
		const size = sizes.getSize();
		// console.warn(sizes.min, sizes.max, sizes, size);


		let textWidth = document.createElement("a-text");
		textWidth.classList.add("measurementText");
		// let textHeight = document.createElement("a-text");
		// let textDepth = document.createElement("a-text");

		let cubeWidth = document.createElement("a-box");
		cubeWidth.classList.add("measurementCube");


		textWidth.setAttribute("value", this.xMeasurement + this.xUnit);
		textWidth.setAttribute("color", MEASUREMENTS_TEXT_COLOR);

		let scale = this.el.getAttribute("scale");
		let rotation = this.el.getAttribute("rotation");

		textWidth.setAttribute("scale", 1 / scale.x * 4 + " " + 1 / scale.y * 4 + " " + 1 / scale.z * 4);
		// console.log("0 " + size.y + " 0");

		textWidth.setAttribute("visible", this.data.show);

		// console.warn("[scale]", scale);

		if (this.el.nodeName == "A-ENTITY" && size.x < 10) {
			size.x = size.x * (1 / scale.x);
			size.y = size.y * (1 / scale.z);
			size.z = size.z * (1 / scale.z);
		}
		cubeWidth.setAttribute("width", size.x);
		cubeWidth.setAttribute("height", 1 / scale.y * 0.1);
		cubeWidth.setAttribute("depth", 1 / scale.z * 0.1);
		cubeWidth.setAttribute("color", MEASUREMENTS_LINE_COLOR);
		// cubeWidth.setAttribute("scale", "1 1 1");

		if (this.el.nodeName == "A-CIRCLE") {
			textWidth.setAttribute("rotation", "90 0 0");
			textWidth.setAttribute("position", "0 0 0.5");
			cubeWidth.setAttribute("rotation", "0 0 0");
			cubeWidth.setAttribute("position", "0 0 0.01");
		} else {
			textWidth.setAttribute("position", "0 " + ((size.y + (1 / scale.y * 0.5)) * 1) + " " + size.z/4);
			cubeWidth.setAttribute("position", "0 " + ((size.y+0.1) * 1) + " 0");
			textWidth.setAttribute("rotation", "0 90 0");
			// textWidth.setAttribute("rotate-towards-camera", "");
			cubeWidth.setAttribute("rotation", "0 90 0");
		}

		// textWidth.setAttribute("rotation", rotation.x + " " + (rotation.y + 90) + " " + rotation.z);
		// cubeWidth.setAttribute("rotation", rotation.x + " " + (rotation.y + 90) + " " + rotation.z);

		cubeWidth.setAttribute("visible", this.data.show);
		textWidth.setAttribute("visible", this.data.show);

		// console.log(this.el);
		this.el.appendChild(textWidth);
		this.el.appendChild(cubeWidth);
	},
	getMeshSize: function(obj) {
		if (obj) {
			return new THREE.Box3().setFromObject(obj);
		}
		return new THREE.Box3().setFromObject(this.el.object3D.children[0]);
	}
});

AFRAME.registerComponent("make-transparent", {
	init: function() {
		this.el.addEventListener("object3dset", () => {
			let mesh = this.el.getObject3D("mesh");

			mesh.traverse(node => {
				for (let i = 0; i < node.children.length; i++) {
					node.children[i].material.transparent = true;
					node.children[i].material.opacity = 0.2;
				}
			});
		});
	}
});