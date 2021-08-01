// Initialize button with user's preferred color
let start = document.getElementById("start");
// let formText = document.getElementById("formText").value;

// chrome.storage.sync.get("color", ({ color }) => {
//     start.style.backgroundColor = color;
// });

//TODO: 종료버튼도 만들어야함

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("hi");

//     chrome.tabs.executeScript(null, { code: "document.body.style.backgroundColor='red'" });
//     // chrome.tabs.executeScript({
//     //     code: 'document.querySelector("div#input.yt-live-chat-text-input-field-renderer")'
//     // }, function (result) {
//     //     console.log("HI");
//     //     console.log(result);
//     // });

// });



//div.querySelector(".tit-box > .fl > table > tbody > tr > td > .b").innerText;


// start.addEventListener("click", starting);

//When the button is clicked, inject setPageBackgroundColor into current page
start.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("hi");
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: starting,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}


function starting() {
    window.setInterval(() => {

        console.log("testset");
        var chatFrame = document.querySelector("#chatframe").contentDocument;
        var chatInput = chatFrame.querySelector("div#input.yt-live-chat-text-input-field-renderer");
        if (chatInput.innerText == "") {
            chatInput.innerText = "[광주_4반_이윤준]";
        }
    }, 1000);

}

