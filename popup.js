let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");

startBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("hi");
    let inputText = document.getElementById("formText").value;
    console.log(inputText);

    chrome.storage.sync.set({ "formText": inputText }, function () {
        console.log("value is set to " + inputText);
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: start,
    });
});

stopBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("hi");

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: stop,
    });
});


function start() {
    let makeForm = setInterval(() => {
        chrome.storage.sync.get(['formText'], function (result) {
            //console.log('Value currently is ' + result.formText)
            //    console.log(formText);
            var chatFrame = document.querySelector("#chatframe").contentDocument;
            var chatInput = chatFrame.querySelector("div#input.yt-live-chat-text-input-field-renderer");
            if (chatInput.innerText == "") {
                chatInput.innerText = result.formText;
                //            chatInput.innerText = "[광주_4반_이윤준]";
            }

        });


    }, 1000);

    chrome.storage.sync.set({ "makeForm": makeForm }, function () {
        //console.log("value is set to " + makeForm);
    });
}


function stop() {

    chrome.storage.sync.get(['makeForm'], function (result) {
        // console.log('Value currently is ' + result.makeForm)
        clearInterval(result.makeForm);
    });

}
