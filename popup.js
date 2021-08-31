let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let formText = document.getElementById("formText");
chrome.storage.local.get(['formText'], function (result) {
    //console.log(result.formText);
    if (result.formText) {
        formText.value = result.formText;
    }
 });

startBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab.url);
    console.log("hi");
    let inputText = document.getElementById("formText").value;
    console.log(inputText);

    chrome.storage.local.set({ "formText": inputText }, function () {
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

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: stop,
    });
});


function start() {
    //let formText;
    let makeForm = setInterval(() => {
        chrome.storage.local.get(['formText'], function (result) {
            // formText = result.formText;
            //console.log('Value currently is ' + result.formText)
            //    console.log(formText);

            var chat = document.querySelector("div#input.style-scope.yt-live-chat-text-input-field-renderer");
            if (chat != null) {
                if (chat.innerText == "") {
                    chat.innerText = result.formText;

                }
            } else {
                var chatFrame = document.querySelector("#chatframe").contentDocument;
                var chatInput = chatFrame.querySelector("div#input.yt-live-chat-text-input-field-renderer");
                var chatBtn = chatFrame.querySelector("div#send-button.style-scope.yt-live-chat-message-input-renderer");

                if (chatInput.innerText == "") {
                    chatInput.innerText = result.formText;
                    chatInput.removeAttribute('aria-invalid'); // 없어도 무방하나 일단 넣어둠

                    // chatInput.click();
                    // chatInput.focus();
                }
            }



            let now = new Date();
            chrome.storage.local.get(['reservationDict'], function (result) {
                //console.log('Value currently is ' + result)
                let count = 0;
                for (key in result.reservationDict) {
                    count += 1;
                    var year = Number(key.substring(0, 4));
                    var month = Number(key.substring(5, 7));
                    var day = Number(key.substring(8, 10));
                    var time = Number(key.substring(11, 13));
                    var minute = Number(key.substring(14, 16));

                    //console.log(year, month, day, time, minute);

                    var oprDate = new Date(year, month - 1, day, time, minute);


                    let reservationText = result.reservationDict[key];
                    if (oprDate - now >= -1000) {
                        setTimeout(function () {

                            chrome.storage.local.get(['formText'], function (formText) {
                                var chat = document.querySelector("div#input.style-scope.yt-live-chat-text-input-field-renderer");
                                if (chat != null) {
                                    chat.innerText = formText.formText + reservationText;
                                } else {

                                    var chatFrame = document.querySelector("#chatframe").contentDocument;
                                    var chatInput = chatFrame.querySelector("div#input.yt-live-chat-text-input-field-renderer");
                                    chatInput.innerText = formText.formText + reservationText;
                                }

                            });

                        }, oprDate - now);
                    } else {
                        delete result.reservationDict[key];
                        chrome.storage.local.set({ "reservationDict": result.reservationDict }, function () {

                        });
                    }
                }
            });


        });
    }, 1000);


    chrome.storage.local.set({ "makeForm": makeForm }, function () {
        //console.log("value is set to " + makeForm);
    });
}

function start2() {
    let chatFrame = document.querySelector("#chatframe").contentDocument;
    let chatInput = chatFrame.querySelector("div#input.yt-live-chat-text-input-field-renderer");


    var makeForm = function () {
        chrome.storage.local.get(['formText'], function (result) {
            //console.log('Value currently is ' + result.formText)
            //    console.log(formText);
            if (chatInput.innerText == "") {

                chatInput.innerText = result.formText;
            }
        });

    }

    chatInput.addEventListener("click", makeForm)


    chrome.storage.local.set({ "makeForm": makeForm }, function () {
        //console.log("value is set to " + makeForm);
    });
}

function stop() {

    chrome.storage.local.get(['makeForm'], function (result) {
        // console.log('Value currently is ' + result.makeForm)
        clearInterval(result.makeForm);
    });

}



function stringToUrl(input) {
    // Start with treating the provided value as a URL
    try {
      return new URL(input);
    } catch {}
    // If that fails, try assuming the provided input is an HTTP host
    try {
      return new URL("http://" + input);
    } catch {}
    // If that fails ¯\_(ツ)_/¯
    return null;
  }