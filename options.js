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

    let reservationDict = {}
    reservationDict[selectDate] = chatText;

    let reservation = document.createElement("li");
    reservation.setAttribute('class', 'reservationList')
    reservation.innerHTML = selectDate + " " + chatText;

    let deleteBtn = document.createElement("button");
    //deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("class", "btn btn-close mb-2")
    reservation.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function () {
        delete reservationDict[selectDate];
        this.parentElement.remove();
        chrome.storage.sync.set({ "reservationDict": reservationDict }, function () {
            console.log(reservationDict);
        });
    })

    reservationList.appendChild(reservation);


    chrome.storage.sync.set({ "reservationDict": reservationDict }, function () {
        console.log("value is set to " + reservationDict);
    });

    //reservationId = setTimeout( function, reservationDate - now);

}

reservationBtn.addEventListener('click', makeReservation);
