let reservationDate = document.getElementById("reservation");
let reservationBtn = document.getElementById("reservationBtn");
let reservationList = document.getElementById("reservationList");
let reservationChat = document.getElementById("reservationChat");

let now = new Date();
reservationDate.setAttribute('value', now);
let makeReservation = function () {
    let selectDate = reservationDate.value;
    let chatText = reservationChat.value;
    console.log(selectDate);


    chrome.storage.sync.get(['reservationDict'], function (result) {
        if (result.reservationDict != null) {
            result.reservationDict[selectDate] = chatText;
            chrome.storage.sync.set({ "reservationDict": result.reservationDict }, function () {
                console.log(reservationresult.reservationDict);
            });
        } else {
            let reservationDict = {};
            reservationDict[selectDate] = chatText;
            chrome.storage.sync.set({ "reservationDict": reservationDict }, function () {
                console.log(reservationDict);
            });
        }
    });

    let reservation = document.createElement("li");
    reservation.setAttribute('class', 'reservationList')
    reservation.innerHTML = selectDate + " " + chatText;

    let deleteBtn = document.createElement("button");
    //deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("class", "btn btn-close mb-2")
    reservation.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function () {

        chrome.storage.sync.get(['reservationDict'], function (result) {
            if (result.reservationDict != null) {

                delete result.reservationDict[selectDate];
                chrome.storage.sync.set({ "reservationDict": result.reservationDict }, function () {
                    console.log(result.reservationDict);
                });
            }
        });

        this.parentElement.remove();

    })

    reservationList.appendChild(reservation);


    chrome.storage.sync.set({ "reservationDict": reservationDict }, function () {
        console.log("value is set to " + reservationDict);
    });

    //reservationId = setTimeout( function, reservationDate - now);

}

reservationBtn.addEventListener('click', makeReservation);


chrome.storage.sync.get(['reservationDict'], function (result) {

    console.log(result);
    for (key in result.reservationDict) {
        console.log(key);

        let selectDate = key;
        let chatText = result.reservationDict[key]
        console.log(selectDate);

        let reservation = document.createElement("li");
        reservation.setAttribute('class', 'reservationList')
        reservation.innerHTML = selectDate + " " + chatText;

        let deleteBtn = document.createElement("button");
        //deleteBtn.innerHTML = "Delete";
        deleteBtn.setAttribute("class", "btn btn-close mb-2")
        reservation.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function () {

            delete result.reservationDict[selectDate];
            this.parentElement.remove();
            chrome.storage.sync.set({ "reservationDict": result.reservationDict }, function () {
                console.log(result.reservationDict);
            });
        })

        reservationList.appendChild(reservation);
    }

});