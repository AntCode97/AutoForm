// Initialize button with user's preferred color
let start = document.getElementById("start");
// let formText = document.getElementById("formText").value;

chrome.storage.sync.get("color", ({ color }) => {
    start.style.backgroundColor = color;
});

// start.addEventListener("click", starting);

// When the button is clicked, inject setPageBackgroundColor into current page
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
} function autoNaming() {
    var chat = document.querySelector("div#input.yt-live-chat-text-input-field-renderer");
    //console.log(formText.value);

    if (chat.innerText == "") {
        chat.innerText = "광주";
    }
}
function starting() {
    window.setInterval(() => {
        var chat = document.querySelector("div#input.yt-live-chat-text-input-field-renderer");
        console.log(chat);
        if (chat.innerText == "") {
            chat.innerText = "광주";
        }
    }, 1000);

}