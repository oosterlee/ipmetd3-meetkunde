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
		addPlaceEvent(placeableNodes[i]);
	}

	// camera.addEventListener("click", function(e) {
	// 	console.log("CLICKED!", e, e.target);
	// 	// camera.appendChild(e.target);
	// });


});

function addPlaceEvent(element) {
	element.addEventListener("click", function(e) {
		let holding = document.querySelector(".js--hold");
		const placeEl = e.target;
		const hasPlaceableAttr = placeEl.getAttribute("data-placeable") == null ? false : true;
		if (!holding || !hasPlaceableAttr) {
			const parentIsPlaceable = placeEl.parentEl.getAttribute("data-placeable") == null ? false : true;
			if (parentIsPlaceable) return; // TODO: add visual feedback for the user
			return;
		}

		if (placeEl.querySelector("[data-pickupable]") != null) return console.error("Cannot place there!"); // TODO: add visual feedback for the user
		const placePos = placeEl.getAttribute("position");
		const placeRot = placeEl.getAttribute("rotation");

		const clonedNode = holding.cloneNode();

		clonedNode.classList.remove("js--hold");
		clonedNode.setAttribute("scale", "0.0175 0.0175 0.0175");
		// clonedNode.setAttribute("position", placePos.x + " "+ placePos.y + 0.01 +" " + placePos.z);
		clonedNode.setAttribute("position", "0 0.01 0");
		clonedNode.setAttribute("rotation", (placeRot.x * -1) + " " + (placeRot.y * -1) + " " + (placeRot.z * -1));
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

		let clonedNode = e.target.cloneNode();

		clonedNode.classList.add("js--hold");

		clonedNode.setAttribute("position", "0 -5 0");

		camera.appendChild(clonedNode);

		e.target.remove();
	});
}

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


AFRAME.registerComponent('measurements', {
	schema: {
		measurements: {type: "string"},
		units: {type: "string"}
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

		this.el.addEventListener("object3dset", () => {
			this.addMeasurements();
		});

	},
	addMeasurements: function() {
		if (this.addedMeasurements) return;
		this.addedMeasurements = true;
// <a-text value="30" color="white" scale="200 200 200"></a-text>
// <a-box width="5.74" height="0.1" depth="0.1" scale="57.14 57.14 57.14"></a-box>
		const sizes = this.getMeshSize();
		// console.warn(sizes.min, sizes.max, sizes);
		const size = sizes.getSize();


		let textWidth = document.createElement("a-text");
		// let textHeight = document.createElement("a-text");
		// let textDepth = document.createElement("a-text");

		let cubeWidth = document.createElement("a-box");


		textWidth.setAttribute("value", this.xMeasurement);
		textWidth.setAttribute("color", "#4470AD");
		textWidth.setAttribute("scale", "200 200 200");
		// console.log("0 " + size.y + " 0");
		textWidth.setAttribute("position", "0 " + ((size.y+0.5) * 57.14) + " 0");

		cubeWidth.setAttribute("width", size.x);
		cubeWidth.setAttribute("height", "0.1");
		cubeWidth.setAttribute("depth", "0.1");
		cubeWidth.setAttribute("color", "#4470AD");
		cubeWidth.setAttribute("scale", "57.14 57.14 57.14");
		cubeWidth.setAttribute("position", "0 " + ((size.y+0.1) * 57.14) + " 0");

		textWidth.setAttribute("rotation", "0 90 0");
		cubeWidth.setAttribute("rotation", "0 90 0");

		// console.log(this.el);
		this.el.appendChild(textWidth);
		this.el.appendChild(cubeWidth);
	},
	getMeshSize: function(obj) {
		if (obj) {
			return new THREE.Box3().setFromObject(obj);
		}
		return new THREE.Box3().setFromObject(this.el.object3D);
	}
});