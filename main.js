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

	camera.addEventListener("click", function(e) {
		console.log("CLICKED!", e);
	});
});