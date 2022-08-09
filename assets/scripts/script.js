const eventModal = document.getElementById("dialog-message")
const editBox = document.getElementById("edit-box")
const giphyAPI = 'https://api.giphy.com/v1/gifs/search';
const selectEventTypeEl = document.getElementById("etype");
const giphyKEY = 'PVW7bT7xE7oiwvc3VLc9oHgGuFdSrfUb';
const giftbitKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.MytEdlNFcVp3clFCT2hrZ0Uxb1FNc2pZbWRoRjVKVmYwdlh3L2x6c0hqL1QvYTJpQ1N2cW1kc1JqOEFLWDJTMjJ0cmNzODNaSVVMOGJvcldOWTVNVkJBV1Yvb1B3ck4vZGQyMVNkcE9EN1pSMm8xeFdYbHRwd0ZPaVlsaHB2Smk=.weqw9hjbaEcLpqZlkrVMFngOntTuAIi3d09A/4dybFs=';
const giftbitAPI = 'https://private-anon-b3a6e921d5-giftbit.apiary-proxy.com/papi/v1/brands';
var allBrands = [];
var allEventsArray = [];
var today = new Date(); //today's date object
var todayUnix = Math.floor((today) / 1000); //today's unix date
var fourteenDays = todayUnix + (86400 * 14); // Unix timestamp
// console.log('today: ' + today);
// console.log('todayUnix: ' + todayUnix);
// console.log('fourteenDays Unix: ' + fourteenDays);
// console.log('fourteenDays: ' + new Date(fourteenDays * 1000));
var TZOffset = today.getTimezoneOffset() * 60000;



retrieveEvents()

selectEventTypeEl.addEventListener("change", fetchGifs)


function fetchGifs(e) {
    // Fetch the GIPHY API and retrieve the GIFS

    fetch(giphyAPI + '?q=' + e.target.value + '&api_key=' + giphyKEY)
        .then(function(response) {
            if (!response) {
                console.log('error');
            }
            return response.json();
        })
        .then(function(data) {
            displayGifs(data);

        })
        .catch((err) => {});
}

function displayGifs(gifData) {
    var randGif = Math.floor(Math.random() * gifData.data.length);
    var textbox = document.getElementById('message-box');
    textbox.innerHTML = "";
    var img = document.createElement('img');
    img.setAttribute('src', gifData.data[randGif].images.fixed_height_small.url);
    textbox.appendChild(img);
}

// giftbit api
fetch(giftbitAPI, {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.MytEdlNFcVp3clFCT2hrZ0Uxb1FNc2pZbWRoRjVKVmYwdlh3L2x6c0hqL1QvYTJpQ1N2cW1kc1JqOEFLWDJTMjJ0cmNzODNaSVVMOGJvcldOWTVNVkJBV1Yvb1B3ck4vZGQyMVNkcE9EN1pSMm8xeFdYbHRwd0ZPaVlsaHB2Smk=.weqw9hjbaEcLpqZlkrVMFngOntTuAIi3d09A/4dybFs=',
        }
    })
    .then((response) => response.json())
    .then(function(data) {
        allBrands = data;
        displayBrands();
    });

//   display giftbit options under dropdown
function displayBrands() {
    var editBrandDrop = document.getElementById('edit-brand')
    var brandDrop = document.getElementById('brand');

    for (var i = 0; i < allBrands.brands.length; i++) {
        var option = document.createElement('option');
        var editOption = document.createElement('option');
        option.setAttribute('value', allBrands.brands[i].name);
        option.innerHTML = allBrands.brands[i].name;
        editOption.setAttribute('value', allBrands.brands[i].name);
        editOption.innerHTML = allBrands.brands[i].name;
        editBrandDrop.appendChild(option);
        brandDrop.appendChild(editOption);
    }
}

//tabs jQuery function
$(function() {
    $("#tabs").tabs();
});

//accordion jQuery function
$(function() {
    $("#accordion, #accordion2").accordion();
});

//event listener for Add Event - toggles hide for event modal box
$(".add-event").on('click', function() {

    $(function() {
        $("#dialog-message").dialog({
            modal: true,
        })
    })
    $(function() {
        $("#dialog-message").dialog({
            modal: true,
        });
    });
})

const wrapper = document.getElementById('accordion');

wrapper.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    //edit button event listener
    editBox.classList.toggle('hide')
});


$("#etype").on('mouseout', function() {
    const selectedOption = $("#etype option:selected").val()
    let otherOption = document.getElementById("other-option")
    if (selectedOption == 'other') {
        otherOption.classList.remove('hide')
    } else {
        otherOption.classList.add('hide')
    }
})

$("#edit-etype").on('mouseout', function() {
    const selectedOption = $("#edit-etype option:selected").val()
    let otherOption = document.getElementById("edit-other-option")
    if (selectedOption == 'edit-other') {
        otherOption.classList.remove('hide')
    } else {
        otherOption.classList.add('hide')
    }
})

//event listener for Schedule Event button - toggles hide for event modal box
$(".schedule-button").on('click', function() {
    const parentNode = $(this)[0].parentNode
    let event = {
        title: parentNode.children[2].value,
        date: Math.floor(new Date(parentNode.children[5].value) / 1000 + 60000), //60,000 is converting minutes into milliseconds to account for Timzone Offset.
        type: $("#etype :selected").val(),
        other: parentNode.children[9].value,
        name: parentNode.children[12].value,
        email: parentNode.children[15].value,
        brand: $("#brand :selected").val(),
        amount: parentNode.children[20].value,
        message: parentNode.children[22].value
    }

    //  search the array to see if the current object matches any objects in the array.
    //  if there is a match, replace the existing event in the array with the current event
    if (allEventsArray.find(obj => obj.title === event.title)) {
        var location = allEventsArray.findIndex(obj => obj.title === event.title);
        allEventsArray[location] = event;
    } else {
        //  if no match, then add the current event to the array
        allEventsArray.push(event);
    }

    // save the allEventsArray variable to the local storage
    localStorage.setItem('events', JSON.stringify(allEventsArray));

    $("#dialog-message").dialog("close");
    retrieveEvents();

    eventModal.classList.toggle('hide');
    $("body").css("background-color", "gray");
    $("#confirmation-message").css("visibility", "visible");
    // script for confirmation modal w/ jquery
    $(function() {
        $("#confirmation-message").dialog({
            modal: true,
            width: 650,
            resizable: false,
            buttons: [{
                    text: "Confirm",
                    "class": 'modalButtonClass',
                    // script for congrats modal when confirm is clicked
                    click: function() {
                        $(this).dialog("close");
                        $("#congrats-message").css("visibility", "visible");
                        $(function() {
                            $("#congrats-message").dialog({
                                modal: true,
                                width: 650,
                                resizable: false,
                                buttons: [{
                                        text: "Back to Calendar",
                                        "class": 'modalButtonClass',
                                        click: function() {
                                            $(this).dialog("close");
                                            window.location.reload(true);
                                            $("body").css("background-color", "transparent");
                                        }
                                    },
                                    {
                                        text: "Schedule Another Event",
                                        "class": 'modalButtonClass',
                                        click: function() {
                                            $(this).dialog("close");
                                            $("body").css("background-color", "transparent");
                                            $(function() {
                                                $("#dialog-message").dialog({
                                                    modal: true,
                                                })
                                            })
                                            $(function() {
                                                $("#dialog-message").dialog({
                                                    modal: true,
                                                });
                                            });
                                        }
                                    }
                                ]
                            })
                        })
                    }
                },
                {
                    text: "Cancel",
                    "class": 'modalButtonClass',
                    click: function() {
                        $(this).dialog("close");
                        $("body").css("background-color", "transparent");
                    }
                }
            ]
        })
    })
})

//this function will populate the information from the event modal to the upcoming events tab.
function upcomingEvents() {
    let accordionDiv = document.getElementById('accordion')
    for (var i = 0; i < allEventsArray.length; i++) {
        if (allEventsArray[i].date >= todayUnix) {
            var eventDate = new Date(allEventsArray[i].date * 1000);
            let ul = document.createElement('ul');
            let h5 = document.createElement('h5');
            let div = document.createElement('div')
            let lineDate = document.createElement('li');
            let lineMessage = document.createElement('li');
            let lineBrand = document.createElement('li');
            let lineAmount = document.createElement('li');
            let lineName = document.createElement('li');
            let lineEmail = document.createElement('li');
            let lineButton = document.createElement('button');
            lineButton.setAttribute('class', 'edit-button');
            lineButton.textContent = 'Edit'
            h5.innerText = allEventsArray[i].title;
            lineName.innerText = allEventsArray[i].name;
            lineEmail.innerText = allEventsArray[i].email;
            lineDate.innerText = 'Date: ' + (eventDate.getMonth() + 1) + '/' + eventDate.getDate() + '/' + eventDate.getFullYear();
            lineMessage.innerText = allEventsArray[i].message;
            lineBrand.innerText = allEventsArray[i].brand;
            lineAmount.innerText = allEventsArray[i].amount;
            ul.appendChild(lineName);
            ul.appendChild(lineEmail);
            ul.appendChild(lineDate);
            ul.appendChild(lineMessage);
            ul.appendChild(lineBrand);
            ul.appendChild(lineAmount);
            ul.appendChild(lineButton);
            accordionDiv.appendChild(h5);
            accordionDiv.appendChild(ul);
        }
    }
}

upcomingEvents();

function pastEvents() {
    let pastEventDiv = document.getElementById('accordion2')
    for (var i = 0; i < allEventsArray.length; i++) {
        if (allEventsArray[i].date < todayUnix) {
            let ul = document.createElement('ul');
            let h5 = document.createElement('h5');
            let div = document.createElement('div')
            let lineDate = document.createElement('li');
            let lineMessage = document.createElement('li');
            let lineBrand = document.createElement('li');
            let lineAmount = document.createElement('li');
            let lineName = document.createElement('li');
            let lineEmail = document.createElement('li');
            h5.innerText = allEventsArray[i].title;
            lineName.innerText = 'Event: ' + allEventsArray[i].name;
            lineEmail.innerText = 'Email: ' + allEventsArray[i].email;
            var eventDate = new Date(allEventsArray[i].date * 1000);
            lineDate.innerText = 'Date: ' + (eventDate.getMonth() + 1) + '/' + eventDate.getDate() + '/' + eventDate.getFullYear();
            lineMessage.innerText = 'Message: ' + allEventsArray[i].message;
            lineBrand.innerText = 'Brand: ' + allEventsArray[i].brand;
            lineAmount.innerText = 'Amount: ' + allEventsArray[i].amount;
            ul.appendChild(lineName);
            ul.appendChild(lineEmail);
            ul.appendChild(lineDate);
            ul.appendChild(lineMessage);
            ul.appendChild(lineBrand);
            ul.appendChild(lineAmount);
            pastEventDiv.appendChild(h5);
            pastEventDiv.appendChild(ul);
        }
    }
}


pastEvents()



// Need to check all future dates against today's current date and display a reminder box if
// event is today's date +14 days or less



function retrieveEvents() {
    // get data from local storage and store it in an array
    if (localStorage.length > 0) {
        allEventsArray = JSON.parse(localStorage.getItem("events"));
        if (allEventsArray != null) {
            allEventsArray.sort((a, b) => a.date - b.date);
            for (var i = 0; i < allEventsArray.length; i++) {
                //console.log(new Date(allEventsArray[i].date));
            }
            reminderModal();
        }
    }
}


// DISPLAY REMINDER MODAL
function reminderModal() {
    var i = 0;
    var upcoming = false;
    var startingPoint;
    while (!upcoming) {
        if (allEventsArray[i].date < todayUnix) {
            i++;
            startingPoint = i;
        } else {
            upcoming = true;
        }
    }
    // if no gift selected, then event-gift content = '';
    if (allEventsArray[i].date <= fourteenDays) {
        within2Weeks(i, fourteenDays);
    }
    $("#reminder-modal").dialog({
        modal: true,
        buttons: {
            Prev: function() {
                if (i > startingPoint) {
                    i--;
                    if (allEventsArray[i].date <= fourteenDays) {
                        within2Weeks(i);
                    } else if (allEventsArray[i].date > fourteenDays) {
                        notWithin2Weeks(i);
                    }
                } else {
                    if (allEventsArray[i].date <= fourteenDays) {
                        within2Weeks(i, fourteenDays);
                    } else if (allEventsArray[i].date > fourteenDays) {
                        notWithin2Weeks(i);
                    }
                }
            },
            Next: function() {
                if (i < allEventsArray.length) {
                    if (allEventsArray[i + 1].date <= fourteenDays) {
                        i++;
                        within2Weeks(i);
                    } else if (allEventsArray[i + 1].date > fourteenDays) {
                        notWithin2Weeks(i);
                    }
                }
            },
            Close: function() {
                $(this).dialog("close");
            }
        }
    });
}

function within2Weeks(i) {
    document.getElementById('event-title').textContent = 'Event: ' + allEventsArray[i].title;
    var eventDate = new Date(allEventsArray[i].date * 1000);
    document.getElementById('event-date').textContent = 'Date: ' + (eventDate.getMonth() + 1) + '/' + eventDate.getDate() + '/' + eventDate.getFullYear();
    document.getElementById('event-type').textContent = 'Type: ' + allEventsArray[i].type;
    document.getElementById('event-gift').textContent = 'Gift: ' + allEventsArray[i].brand;
}

//
function notWithin2Weeks(i) {
    document.getElementById('event-title').textContent = '';
    document.getElementById('event-date').textContent = '';
    document.getElementById('event-type').textContent = '';
    document.getElementById('event-gift').textContent = 'The remaining events are not within the next 2 weeks.';
}