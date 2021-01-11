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

	for (let i = 0; i < interactiveEl.length; i++) {
		const pickupable = interactiveEl[i].getAttribute("data-pickupable");
		if (pickupable != null) {
			addPickupEvent(interactiveEl[i]);
		}

		const placeable = interactiveEl[i].getAttribute("data-placeable");
		if (placeable != null) {
			addPlaceEvent(interactiveEl[i]);
		}
	}

	// camera.addEventListener("click", function(e) {
	// 	console.log("CLICKED!", e, e.target);
	// 	// camera.appendChild(e.target);
	// });


});

function addPlaceEvent(element) {
	element.addEventListener("click", function(e) {
		let holding = document.querySelector(".js--hold");
		if (!holding) {
			return;
		}

		const scene = document.querySelector("a-scene");
		const placeEl = e.target;
		const placePos = placeEl.getAttribute("position");

		const clonedNode = holding.cloneNode();

		clonedNode.classList.remove("js--hold");
		clonedNode.setAttribute("scale", "0.0175 0.0175 0.0175");
		clonedNode.setAttribute("position", placePos.x + " "+ placePos.y + 0.01 +" " + placePos.z);
		scene.appendChild(clonedNode);

		holding.remove();
	});
}

function addPickupEvent(element) {
	element.addEventListener("click", function(e) {
		const holding = document.querySelector(".js--hold");
		if (holding) {
			return;
		}

		const camera = document.querySelector(".js--camera");
		const cp = camera.getAttribute("position");

		const x = 3;
		const y = -1;
		const z = 0;

		let clonedNode = e.target.cloneNode();

		clonedNode.classList.add("js--hold");

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
			console.log("[pivotpoint]", "getting mesh", mesh);
			if (!mesh) return;

			mesh.position.set(data.x, data.y, data.z);
		});
	}
});