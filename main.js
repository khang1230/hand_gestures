Webcam.set({
    heigth:350,
    width:350,
    image_format:"png",
    png_quality:90
})

Webcam.attach("camera")

function captureImg(){
    Webcam.snap(function(dataURL){
        document.getElementById("results").innerHTML = '<img id="capturedImg"src="' + dataURL + '">'
    })
}

console.log(ml5.version)

function speak() {
    var data1 = "The first prediction is:" + prediction1
    var data2 = "The second prediction is:" + prediction2
    var synth = window.speechSynthesis
    var utter = new SpeechSynthesisUtterance(data1 + data2)
    synth.speak(utter)
}

//speak()

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_jq4uHCtE/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model loaded!")
}

function predict() {
    var saveImg = document.getElementById("capturedImg")
    classifier.classify(saveImg, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        prediction1 = results[0].label
        prediction2 = results[1].label
        document.getElementById("gesture1").innerHTML = prediction1
        document.getElementById("gesture2").innerHTML = prediction2
        if(prediction1 == "Great"){
            document.getElementById("emoji1").innerHTML = "&#128077"
        }
        else if(prediction1 == "Horrible"){
            document.getElementById("emoji1").innerHTML = "&#128078"
        }
        else if(prediction1 == "Okay"){
            document.getElementById("emoji1").innerHTML = "&#128076"
        }

        if(prediction2 == "Great"){
            document.getElementById("emoji2").innerHTML = "&#128077"
        }
        else if(prediction2 == "Okay"){
            document.getElementById("emoji2").innerHTML = "&#128076"
        }
        else if(prediction2 == "Horrible"){
            document.getElementById("emoji2").innerHTML = "&#128078"
        }

        speak()
    }
}