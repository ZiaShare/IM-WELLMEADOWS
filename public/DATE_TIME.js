<<<<<<< HEAD:public/DATE_TIME.js
=======
<<<<<<< HEAD
>>>>>>> 6f3832743fb74fb9cb98e68ab882473d4cf4d84e:DATE_TIME.js
function updateDateTime() {
    var now = new Date();

    var dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    var timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    var dateElement = document.getElementById('date');
    var timeElement = document.getElementById('time');

    dateElement.textContent = now.toLocaleString('en-US', dateOptions);
    timeElement.textContent = now.toLocaleString('en-US', timeOptions);
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display date and time immediately
<<<<<<< HEAD:public/DATE_TIME.js
=======
=======
function updateDateTime() {
    var now = new Date();

    var dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    var timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    var dateElement = document.getElementById('date');
    var timeElement = document.getElementById('time');

    dateElement.textContent = now.toLocaleString('en-US', dateOptions);
    timeElement.textContent = now.toLocaleString('en-US', timeOptions);
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display date and time immediately
>>>>>>> origin/main
>>>>>>> 6f3832743fb74fb9cb98e68ab882473d4cf4d84e:DATE_TIME.js
updateDateTime();