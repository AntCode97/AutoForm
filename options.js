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
    let reservation = document.createElement("li");
    reservation.innerHTML = selectDate + " " + chatText;
    reservationList.appendChild(reservation);

}

reservationBtn.addEventListener('click', makeReservation);
