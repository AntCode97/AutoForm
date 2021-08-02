// Initialize button with user's preferred color
let start = document.getElementById("start");


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
    let inputText = document.getElementById("formText").value;
    console.log(inputText);

    // chrome.storage.sync.set({ "formText": inputText }, function () {
    //     console.log("value is set to " + inputText);
    // });
    // let tabId = tab.id;
    // chrome.tabs.executeScript(
    //     tab.id, {
    //     code: `console.log("hi");`
    // }, function () {
    //     chrome.tabs.executeScript(tab.id, { file: 'content.js' })
    // });

    // storage 기능을 이용하여 변수를 전달해야 한다고 한다
    // https://developer.chrome.com/docs/extensions/reference/scripting/
    //https://developer.chrome.com/docs/extensions/reference/storage/
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
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
        chrome.storage.sync.get(['formText'], function (result) {
            console.log('Value currently is ' + result.formText)
            //    console.log(formText);
            var chatFrame = document.querySelector("#chatframe").contentDocument;
            var chatInput = chatFrame.querySelector("div#input.yt-live-chat-text-input-field-renderer");
            if (chatInput.innerText == "") {
                chatInput.innerText = result.formText;
                //            chatInput.innerText = "[광주_4반_이윤준]";
            }

        });


    }, 1000);

}

