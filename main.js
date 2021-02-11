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

let camera;

window.addEventListener("orientationchange", function(e) {
	if ( window.orientation == 0 || window.orientation == 180) { // Portrait
		document.querySelector(".cameratext").setAttribute("scale", "0.15 0.15 0.15");
	} else { // Landscape
		document.querySelector(".cameratext").setAttribute("scale", "0.25 0.25 0.25");
	}
}, false);

window.onload = () => {
	const walking = document.getElementsByClassName("js--walking");
	console.log(walking);

	// WALKING
	for(let i = 0; i < walking.length; i++){
		walking[i].addEventListener("click", function(evt){

			console.log("walking");
			
			let att = document.createAttribute("animation");
			att.value = "property: position; easing: linear; dur: 2000; to: " + 
			this.getAttribute("position").x + " 1.6 " + this.getAttribute("position").z;
			camera.setAttribute("animation", att.value);
		});
	}

	console.log("js connected");
	const hintsKnop = document.getElementById("hintsKnop--js");
	const hints = document.getElementById("hintsText--js");
	const inhoud = ["Kijk naar de stapjes op de poster.", "4m = 400cm.", "Kijk naar het aantal 0 wat erbij komt\n per stapje."];
	
	if (!AFRAME.utils.device.isMobile()) {
		if ( window.orientation == 0 || window.orientation == 180) { // Portrait
			document.querySelector(".cameratext").setAttribute("scale", "0.15 0.15 0.15");
		} else { // Landscape
			document.querySelector(".cameratext").setAttribute("scale", "0.25 0.25 0.25");
		}
	}

	window.addEventListener("click", () => {

		document.querySelector(".intro .text p").innerText = "Om op een knop te klikken ga je met de ring in het midden van je scherm over een knop heen. Blijf hier dan even op staan.";
		document.querySelector(".intro video").play();
		// document.querySelector(".cameratext").setAttribute("value", "Om op een knop te klikken\nga je met de ring in het midden\nvan je scherm over een knop heen.\nBlijf hier dan even op staan.");
		// document.querySelector("a-video.js--start").setAttribute("src", "#starting-gif");
		// document.querySelector("a-video.js--start").play();
		// document.querySelector("a-video.js--start").components.material.material.map.image.play();

		speak("Om op een knop te klikken ga je met de ring in het midden van je scherm over een knop heen. Blijf hier dan even op staan.", () => {
			setTimeout(() => {
				document.querySelector(".intro video").pause();
				document.querySelector(".intro").style.display = "none";

				document.querySelector("[cursor]").setAttribute("visible", true);
				let digiBoards = document.querySelectorAll("[src=\"#digibord-obj\"]");
				for (let j = 0; j < digiBoards.length; j++) {
					digiBoards[j].components.sound.playSound();
				}

			}, 1000);
		});
	},{once:true});

	let index = 0;

	function hintsText(getal) {
	    console.log(getal);
	    hints.setAttribute("value", inhoud[getal]);
	}

	hintsKnop.onclick = (event) => {
		console.log(index);
		if (index >= inhoud.length) {
			index = 0;
		}
		hintsText(index++);	
	}

	const introKnop = document.getElementById("introKnop--js");
	const intro = document.getElementById("introText--js");
	const inh = ["Welkom bij onze \n rekenles. \n\n We geven je nu wat \n uitleg.", "Jij gaat een klaslokaal inrichten.", "Succes met de opdrachten, \n je wordt nu naar het lokaal \n gebracht"];
	let ind = 0;

	function introText(getal) {
	    intro.setAttribute("value", inh[getal]);
	}

	function nextText() {
		console.log(ind);
		introText(ind++);
		if (ind >= inh.length) {
			speak(inh[ind-1].replace(/\n/g, ""), () => {
				walkSequence(() => {

					// Show level Explanations
					showLevelExplanations(() => {
						setTimeout(() => {
							document.querySelector(".intro video").pause();
							document.querySelector(".intro").style.display = "none";
							loadLevel();
						}, 2000);
					});
				});
			});
		} else {
			speak(inh[ind-1].replace(/\n/g, ""), () => {
				nextText();
			});
		}

	}

	introKnop.onclick = (event) => {
		nextText();
		introKnop.remove();
	};
};

function showLevelExplanations(cb=() => {}) {
	document.querySelector(".intro video").src = "./videos/uitleg-level.mkv";
	document.querySelector(".intro video").play();
	document.querySelector(".intro").style.display = "block";

	document.querySelector(".intro .text p").innerText = "Om een tafel op te pakken, ga je met de ring in het midden van je scherm over een tafel heen.";
	speak("Om een tafel op te pakken, ga je met de ring in het midden van je scherm over een tafel heen.", () => {
		document.querySelector(".intro .text p").innerText = "Om de tafel terug te zetten, ga je met de tafel over het rode vlak en blijf je hier even op staan.";
		speak("Om de tafel terug te zetten, ga je met de tafel over het rode vlak en blijf je hier even op staan.", () => {
			cb();
		});
	});
}

// NOG NAGEKEKEN WORDEN
const levels = [
	{
		name: "Level 1",
		description: "Zet de tafel op de goede positie.\nPak de tafel op door \nnaar de tafel te kijken.",
		tables: ["measurements: 3 3 3; units: cm cm cm",
				"measurements: 300 300 300; units: cm cm cm",
				"measurements: 30 30 30; units: cm cm cm"],
		chairs: [],
		dropzones: {
			tables: ["measurements: 300 300 300; units: mm mm mm"],
			chairs: []
		},
		points: 10,
	},
	{
		name: "Level 2",
		description: "Zet de tafel op de goede positie.\nPak de tafel op door \nnaar de tafel te kijken.",
		tables: ["measurements: 30 30 30; units: cm cm cm",
				"measurements: 300 300 300; units: cm cm cm",
				"measurements: 3000 3000 3000; units: cm cm cm"],
		chairs: [],
		dropzones: {
			tables: ["measurements: 0.3 0.3 0.3; units: m m m"],
			chairs: []
		},
		points: 15,
	},
	{
		name: "Level 3",
		description: "Zet de tafel op de goede positie.\nPak de tafel op door \nnaar de tafel te kijken.",
		tables: ["measurements: 30 30 30; units: cm cm cm",
				"measurements: 300 300 300; units: cm cm cm",
				"measurements: 3000 3000 3000; units: cm cm cm",
				"measurements: 300 300 300; units: cm cm cm",],
				
		chairs: [],
		dropzones: {
			tables: ["measurements: 0.3 0.3 0.3; units: m m m"],
			chairs: []
		},
		points: 15,
	},
	{
		name: "Level 4",
		description: "Zet de tafel op de goede positie.\nPak de tafel op door \nnaar de tafel te kijken.",
		tables: ["measurements: 30 30 30; units: mm mm mm",
				"measurements: 300 300 300; units: cm cm cm",
				"measurements: 3000 3000 3000; units: dm dm dm",
				"measurements: 300 300 300; units: cm cm cm",],
				
		chairs: [],
		dropzones: {
			tables: ["measurements: 0.3 0.3 0.3; units: m m m"],
			chairs: []
		},
		points: 15,
	},
	{
		name: "Level 5",
		description: "Zet de tafel op de goede positie.\nPak de tafel op door \nnaar de tafel te kijken.",
		tables: ["measurements: 30 30 30; units: mm mm mm",
				"measurements: 300 300 300; units: cm cm cm",
				"measurements: 3000 3000 3000; units: dm dm dm",
				"measurements: 300 300 300; units: cm cm cm",],
				
		chairs: [],
		dropzones: {
			tables: ["measurements: 0.3 0.3 0.3; units: m m m",
					"measurements: 0.3 0.3 0.3; units: cm cm cm"],
			chairs: []
		},
		points: 15,
	}
];

let currentLevel = 0;


window.addEventListener("load", function() {
	camera = document.querySelector(".js--camera");

	const interactiveEl = document.querySelectorAll("[data-interactive]");
	const pickupableNodes = document.querySelectorAll("[data-pickupable]");
	const placeableNodes = document.querySelectorAll("[data-placeable]");

	// walkSequence();

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



});

function getDistance(obj1, obj2) {
  const pos1 = obj1.getAttribute("position");
  const pos2 = obj2.getAttribute("position");

  console.log(obj1, obj2);

  let xLen = pos1.x;
  let zLen = pos1.z;
  let xLenTo = pos2.x;
  let zLenTo = pos2.z;

  console.log(xLen, zLen, xLenTo, zLenTo);

  const distance = Math.sqrt(Math.pow(xLen - xLenTo, 2) + Math.pow(zLen - zLenTo, 2));
  return distance;
}

function walkToElement(el, cb=() => {}) {
	const distance = getDistance(camera, el);
	let elPos = el.getAttribute("position");
	elPos = elPos.x + " " + elPos.y + " " + elPos.z;
	const dur = 125 * distance;
	console.log(distance, dur);
	camera.setAttribute("animation", "property: position; easing: linear; to: " + elPos + "; dur: " + dur);

	setTimeout(cb, dur-10);
	// att.value = "property: position; easing: linear; dur: "+dur+"; to: " + this.getAttribute('position').x + " 1.6 " + this.getAttribute('position').z;
}


// function walkSequence() {
// 	const camerapositions = document.querySelectorAll(".js--camerapos");
// 	if (camerapositions == null) return;
// 	let index = 0;
// 	const callback = () => {
// 		console.log("[walkSequence]", index, camerapositions.length);
// 		if (index >= camerapositions.length) {
// 			console.log("Done!");
// 			return;
// 		}


// 		walkToElement(camerapositions[index++], callback);
// 	};
// 	walkToElement(camerapositions[index++], callback);
// }



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

	setTimeout(() => {
		const toSpeak = (lvl.name + ". " + lvl.description).replace(/\n/g, "");
		console.log(toSpeak);
		speak(toSpeak);
	}, 1000);

	document.querySelector(".js--levelText").setAttribute("value", lvl.name + "\n" + lvl.description);

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
		placeEl.setAttribute("material", "color", "aqua");

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
			e.target.parentNode.setAttribute("material", "color", "aqua");
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

AFRAME.registerComponent("check-btn", {
	init: function() {
		this.el.addEventListener("click", () => {
			let correct = true;
			const level = getCurrentLevel();
			const dropzones = document.querySelectorAll(".js--dropzoneholder > a-circle");

			for (let i = 0; i < dropzones.length; i++) {
				let dropzoneCorrect = true;
				let dropzone = dropzones[i];
				let tablechair = dropzone.querySelector("[data-pickupable]");

				if (tablechair == null) {
					// dropzone.setAttribute("material", "color", "red");
					dropzone.setAttribute("animation", "property: material.color; type: color; from: #00FFFF; to: #FF0000; dur: 2000;");
					correct = false;
				} else {
					const measurementsAttr = tablechair.getAttribute("measurements");
					const measurements = measurementsAttr.measurements.split(" ");
					const units = measurementsAttr.units.split(" ");

					const dropMeasurementsAttr = dropzone.getAttribute("measurements");
					const dropMeasurements = dropMeasurementsAttr.measurements.split(" ");
					const dropUnits = dropMeasurementsAttr.units.split(" ");

					for (let j = 0; j < 3; j++) {
						let cal = calculateLength(measurements[j], units[j], dropUnits[j]);

						if (cal != dropMeasurements[j]) {
							console.warn("NOT EQUAL TO", cal, dropMeasurements);
							dropzone.setAttribute("animation", "property: material.color; type: color; from: #00FFFF; to: #FF0000; dur: 2000;");
							correct = false;
							dropzoneCorrect = false;
							break;
						}
					}
					if (dropzoneCorrect) {
						dropzone.setAttribute("animation", "property: material.color; type: color; from: #00FFFF; to: #00FF00; dur: 2000;");
					}

				}

			}

			let cameratext = document.querySelector(".cameratext");
			if (correct) {

				setTimeout(() => {
					speak("Alles is goed beantwoord! Je wordt doorgestuurd naar het volgende level.", () => {
						cameratext.setAttribute("visible", false);
						loadLevel(currentLevel+1);
					});

					cameratext.setAttribute("visible", true);
					cameratext.setAttribute("value", "Alles is goed beantwoord!\nJe wordt doorgestuurd naar het volgende level.");
					console.log("EVERY TABLE IS IS THE CORRECT SPOT!");
				}, 2000);
			} else {
				setTimeout(() => {
					speak("Helaas, je hebt nog ergens een foutje. Je kunt het!", () => {
						cameratext.setAttribute("visible", false);
					});

					cameratext.setAttribute("visible", true);
					cameratext.setAttribute("value", "Helaas, je hebt nog ergens een foutje.\nJe kunt het!");
				}, 2000);
			}
		});
	}
});
