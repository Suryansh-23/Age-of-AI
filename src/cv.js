const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );
    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
                color: "#C0C0C070",
                lineWidth: 1,
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
                color: "#FF3030",
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {
                color: "#FF3030",
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {
                color: "#FF3030",
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
                color: "#30FF30",
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {
                color: "#30FF30",
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {
                color: "#30FF30",
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
                color: "#E0E0E0",
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {
                color: "#E0E0E0",
            });
        }
    }
    canvasCtx.restore();
}

const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
});
faceMesh.setOptions({
    maxNumFaces: 4,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});
faceMesh.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await faceMesh.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
});

let fps = 1;
const times = [];
const fpsLoop = (timestamp) => {
    while (times.length > 0 && times[0] <= timestamp - 1000) {
        times.shift();
    }
    times.push(timestamp);
    fps = times.length;
    document.getElementById("fps").innerHTML = fps;
    requestAnimationFrame(fpsLoop);
};

requestAnimationFrame(fpsLoop);

//Option Logic
document.getElementById("Yep").addEventListener("click", () => {
    document.getElementById("box").remove();
    document.getElementById("fps").style.display = "unset";
    camera.start();
});
document.getElementById("Nope").addEventListener("click", () => {
    document.getElementById(
        "box"
    ).innerHTML = `<span>No Problem, As you wish</span>`;
});
