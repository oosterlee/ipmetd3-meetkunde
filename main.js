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
		console.log(pickupable);
		if (pickupable != null) {
			console.log("yes");
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

		console.log(e);

		const scene = document.querySelector("a-scene");
		const placeEl = e.target;
		const placePos = placeEl.getAttribute("position");
		console.log(placePos);

		const holdingCopy = holding.cloneNode();

		console.log(placePos.x + " -0.5 " + placePos.z);

		scene.appendChild(holdingCopy);
		// let mesh = holding.getObject3D('mesh');
		// holding.removeObject3D('mesh');
		// holdingCopy.setObject3D('mesh', mesh);
		holdingCopy.classList.remove("js--hold");
		holdingCopy.setAttribute("scale", "0.0175 0.0175 0.0175");
		holdingCopy.setAttribute("position", placePos.x + " -0.5 " + placePos.z);
		holdingCopy.getAttribute("position");
		holding.remove();
		// holding = document.querySelector(".js--hold");
		console.warn(holding);

		console.warn("HOLDING SOMETHING!!", holding);
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

		camera.innerHTML += `<a-entity
				data-interactive
				data-pickupable
				gltf-model="#classroom_table"
				position="1 -0.9 -3"
				scale="0.002 0.002 0.002"
				rotation="0 90 0"
				class="js--hold"
			>
			</a-entity>`;
		e.target.remove();
		// camera.innerHTML += '<a-box width="1" height="1" depth="1" position="1 -1 -1"></a-box>';
	});
}