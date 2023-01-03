// Creating global variables
const eventModal = document.getElementById('dialog-message');
const giphyAPI = 'https://api.giphy.com/v1/gifs/search';
const selectEventTypeEl = document.getElementById('etype');
const giphyKEY = 'PVW7bT7xE7oiwvc3VLc9oHgGuFdSrfUb';
const giftbitKey =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.MytEdlNFcVp3clFCT2hrZ0Uxb1FNc2pZbWRoRjVKVmYwdlh3L2x6c0hqL1QvYTJpQ1N2cW1kc1JqOEFLWDJTMjJ0cmNzODNaSVVMOGJvcldOWTVNVkJBV1Yvb1B3ck4vZGQyMVNkcE9EN1pSMm8xeFdYbHRwd0ZPaVlsaHB2Smk=.weqw9hjbaEcLpqZlkrVMFngOntTuAIi3d09A/4dybFs=';
const giftbitAPI =
  'https://private-anon-b3a6e921d5-giftbit.apiary-proxy.com/papi/v1/brands';
var allBrands = [];
let allEventsArray = [];
var today = new Date(); //today's date object
var todayUnix = Math.floor(today / 1000); //today's unix date
var fourteenDays = todayUnix + 86400 * 14; // Unix timestamp
// console.log('today: ' + today);
// console.log('todayUnix: ' + todayUnix);
// console.log('fourteenDays Unix: ' + fourteenDays);
// console.log('fourteenDays: ' + new Date(fourteenDays * 1000));
var TZOffset = today.getTimezoneOffset() * 60;

selectEventTypeEl.addEventListener('change', fetchGifs);

function fetchGifs(e) {
  // Fetch the GIPHY API and retrieve the GIFS

  fetch(giphyAPI + '?q=' + e.target.value + '&api_key=' + giphyKEY)
    .then(function (response) {
      if (!response) {
        console.log('error');
      }
      return response.json();
    })
    .then(function (data) {
      displayGifs(data);
    })
    .catch(err => {});
}

function displayGifs(gifData) {
  var randGif = Math.floor(Math.random() * gifData.data.length);
  var textbox = document.getElementById('message-box');
  textbox.innerHTML = '';
  var img = document.createElement('img');
  img.setAttribute('src', gifData.data[randGif].images.fixed_height_small.url);
  textbox.appendChild(img);
}

// fetch data from giftbit api
fetch(giftbitAPI, {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.MytEdlNFcVp3clFCT2hrZ0Uxb1FNc2pZbWRoRjVKVmYwdlh3L2x6c0hqL1QvYTJpQ1N2cW1kc1JqOEFLWDJTMjJ0cmNzODNaSVVMOGJvcldOWTVNVkJBV1Yvb1B3ck4vZGQyMVNkcE9EN1pSMm8xeFdYbHRwd0ZPaVlsaHB2Smk=.weqw9hjbaEcLpqZlkrVMFngOntTuAIi3d09A/4dybFs=',
  },
})
  .then(response => response.json())
  .then(function (data) {
    allBrands = data;
    // Call the function to display brands in the select dropdown
    displayBrands();
  });

// function to display giftbit options under dropdown
function displayBrands() {
  var editBrandDrop = document.getElementById('edit-brand');
  var brandDrop = document.getElementById('brand');

  // Loop through the all giftbit api brands, create an element to be displayed on the dropdown, and append the element
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
$(function () {
  $('#tabs').tabs();
});

//accordion jQuery function
$(function () {
  $('#accordion, #accordion2').accordion();
});

// hides the button when going to other pages
if (document.getElementById('aLogo').href.includes('#top') != true) {
  $('.btn').css('visibility', 'hidden');
}

// Future Changes:
// const mediaQuery = window.matchMedia("(min-width: 550px)")

// // change the color of the background of navbar and calls changeImg
// if (mediaQuery.matches) { // If media query matches

//     $(".navContainer").hover(function (){

//         $(this).css("background-color", "white");

//         $(this).css("border-bottom", "solid 5px #e1dddf");

//         document.getElementById("logo").setAttribute("src", './assets/images/logo_name.png');

//         var aElements = document.querySlector(".navContainer").getElementsByTagName("a");

//         for (var i = 0; i < aElements.length; i++) {
//             aElements[i].style.color = "black";
//         };

//         }, function(){

//             $(this).css("background-color", "");

//             $(this).css("border-bottom", "");

//             document.getElementById("logo").setAttribute("src", './assets/images/logo_name_white.png');

//             var aElements = document.querySlector(".navContainer").getElementsByTagName("a");

//             for (var i = 0; i < aElements.length; i++) {
//                 aElements[i].style.color = "white";
//             };
//         });
// }

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById('overlayNav').style.width = '100%';
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById('overlayNav').style.width = '0%';
}

//event listener for Add Event - toggles hide for event modal box
$('.add-event').on('click', function () {
  $(function () {
    $('#dialog-message').dialog({
      modal: true,
    });
  });
});

// wrap the edit buttons in a div so that click event can be applied to edit button on each event
const wrapper = document.getElementById('accordion');

wrapper.addEventListener('click', event => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  //edit button event listener
  $(function () {
    $('#edit-message').dialog({
      modal: true,
    });
  });
});

//created event listener on the other option for events in the event modal.  When other is selected, a input box will appear by removing the hide class.  If something else is chosen, it will re-add the hide class.
$('#etype').on('mouseout', function () {
  const selectedOption = $('#etype option:selected').val();
  let otherOption = document.getElementById('other-option');
  if (selectedOption == 'other') {
    otherOption.classList.remove('hide');
  } else {
    otherOption.classList.add('hide');
  }
});

//same as above but for the edit event modal
$('#edit-etype').on('mouseout', function () {
  const selectedOption = $('#edit-etype option:selected').val();
  let otherOption = document.getElementById('edit-other-option');
  if (selectedOption == 'edit-other') {
    otherOption.classList.remove('hide');
  } else {
    otherOption.classList.add('hide');
  }
});

// Add functionality to the save button on the edit modal
$('.save-button').on('click', function () {
  const parentNode = $(this)[0].parentNode;
  let event = {
    title: parentNode.children[2].value,
    date: Math.floor(
      Date.parse(parentNode.children[5].value) / 1000 + TZOffset,
    ),
    type: $('#etype :selected').val(),
    other: parentNode.children[9].value,
    name: parentNode.children[12].value,
    email: parentNode.children[15].value,
    brand: $('#edit-brand :selected').val(),
    amount: parentNode.children[20].value,
    message: parentNode.children[22].value,
  };

  //  search the array to see if the current object matches any objects in the array.
  //  if there is a match, replace the existing event in the array with the current event
  if (allEventsArray.find(obj => obj.title === event.title)) {
    var location = allEventsArray.findIndex(obj => obj.title === event.title);
    allEventsArray[location] = event;
  } else {
    //  if no match, then add the current event to the array
    window.alert('Please enter the name of an existing event...');
    return;
  }

  // save the allEventsArray variable to the local storage
  localStorage.setItem('events', JSON.stringify(allEventsArray));

  $('#edit-message').dialog('close');
  retrieveEvents();
  $('body').css('background-color', 'gray');
  $('#confirmation-message').css('visibility', 'visible');
  // script for confirmation modal w/ jquery
  // Display the confirmation modal after saving an edit
  $(function () {
    $('#confirmation-message').dialog({
      modal: true,
      width: 650,
      resizable: false,
      buttons: [
        {
          text: 'Confirm',
          class: 'modalButtonClass',
          // script for congrats modal when confirm is clicked
          click: function () {
            $(this).dialog('close');
            $('#congrats-message').css('visibility', 'visible');
            $(function () {
              $('#congrats-message').dialog({
                modal: true,
                width: 650,
                resizable: false,
                buttons: [
                  {
                    text: 'Back to Events',
                    class: 'modalButtonClass',
                    click: function () {
                      $(this).dialog('close');
                      window.location.reload(true);
                      $('body').css('background-color', 'transparent');
                    },
                  },
                  {
                    text: 'Schedule Another Event',
                    class: 'modalButtonClass',
                    click: function () {
                      $(this).dialog('close');
                      $('body').css('background-color', 'transparent');
                      $(function () {
                        $('#dialog-message').dialog({
                          modal: true,
                        });
                      });
                      $(function () {
                        $('#dialog-message').dialog({
                          modal: true,
                        });
                      });
                    },
                  },
                ],
              });
            });
          },
        },
        {
          text: 'Cancel',
          class: 'modalButtonClass',
          click: function () {
            $(this).dialog('close');
            $('body').css('background-color', 'transparent');
          },
        },
      ],
    });
  });
});

//event listener for Schedule Event button - toggles hide for event modal box
$('.schedule-button').on('click', function () {
  const parentNode = $(this)[0].parentNode;
  let event = {
    title: parentNode.children[2].value,
    date: Math.floor(
      Date.parse(parentNode.children[5].value) / 1000 + TZOffset,
    ), //60,000 is converting minutes into milliseconds to account for Timzone Offset.
    type: $('#etype :selected').val(),
    other: parentNode.children[9].value,
    name: parentNode.children[12].value,
    email: parentNode.children[15].value,
    brand: $('#brand :selected').val(),
    amount: parentNode.children[20].value,
    message: parentNode.children[22].value,
  };

  //  search the array to see if the current object matches any objects in the array.
  //  if there is a match, replace the existing event in the array with the current event
  if (
    allEventsArray != null &&
    allEventsArray.find(obj => obj.title === event.title)
  ) {
    var location = allEventsArray.findIndex(obj => obj.title === event.title);
    allEventsArray[location] = event;
  } else {
    //  if no match, then add the current event to the array
    allEventsArray.push(event);
  }

  // save the allEventsArray variable to the local storage
  localStorage.setItem('events', JSON.stringify(allEventsArray));

  $('#dialog-message').dialog('close');
  retrieveEvents();

  eventModal.classList.toggle('hide');
  $('body').css('background-color', 'gray');
  $('#confirmation-message').css('visibility', 'visible');
  // script for confirmation modal w/ jquery
  // display confirmation modal after schedule button is clicked
  $(function () {
    $('#confirmation-message').dialog({
      modal: true,
      width: 650,
      resizable: false,
      buttons: [
        {
          text: 'Confirm',
          class: 'modalButtonClass',
          // script for congrats modal when confirm is clicked
          click: function () {
            $(this).dialog('close');
            $('#congrats-message').css('visibility', 'visible');
            $(function () {
              $('#congrats-message').dialog({
                modal: true,
                width: 650,
                resizable: false,
                buttons: [
                  {
                    // return to the homepage
                    text: 'Back to Events',
                    class: 'modalButtonClass',
                    click: function () {
                      $(this).dialog('close');
                      window.location.reload(true);
                      $('body').css('background-color', 'transparent');
                    },
                  },
                  {
                    // return to the schedule event modal
                    text: 'Schedule Another Event',
                    class: 'modalButtonClass',
                    click: function () {
                      $(this).dialog('close');
                      $('body').css('background-color', 'transparent');
                      $(function () {
                        $('#dialog-message').dialog({
                          modal: true,
                        });
                      });
                      $(function () {
                        $('#dialog-message').dialog({
                          modal: true,
                        });
                      });
                    },
                  },
                ],
              });
            });
          },
        },
        {
          text: 'Cancel',
          class: 'modalButtonClass',
          click: function () {
            $(this).dialog('close');
            $('body').css('background-color', 'transparent');
          },
        },
      ],
    });
  });
});

//this function will populate the information from the event modal to the upcoming events tab.
function upcomingEvents() {
  let accordionDiv = document.getElementById('accordion');
  if (allEventsArray.length > 0) {
    for (var i = 0; i < allEventsArray.length; i++) {
      if (allEventsArray[i].date >= todayUnix) {
        var eventDate = new Date(allEventsArray[i].date * 1000);
        //created a variable for ul and h5 to get appended to the upcoming-main-box div.
        let ul = document.createElement('ul');
        let h5 = document.createElement('h5');
        let div = document.createElement('div');
        //created variables for each of the input fields in the event modal box with a li tag.
        let lineDate = document.createElement('li');
        let lineMessage = document.createElement('li');
        let lineBrand = document.createElement('li');
        let lineAmount = document.createElement('li');
        let lineName = document.createElement('li');
        let lineEmail = document.createElement('li');
        let lineButton = document.createElement('button');
        lineButton.setAttribute('class', 'edit-button');
        lineButton.textContent = 'Edit';
        //made the variables the text input for the event modal
        h5.innerText = allEventsArray[i].title;
        lineName.innerText = allEventsArray[i].name;
        lineEmail.innerText = allEventsArray[i].email;
        lineDate.innerText =
          'Date: ' +
          (eventDate.getMonth() + 1) +
          '/' +
          eventDate.getDate() +
          '/' +
          eventDate.getFullYear();
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
        //appended the ul and h5 to the div element
        accordionDiv.appendChild(h5);
        accordionDiv.appendChild(ul);
      }
    }
  }
}

function pastEvents() {
  let pastEventDiv = document.getElementById('accordion2');
  //created for loop to grab the input to put into the past events tab.  also created if statement to take the date input by the user for the event and run it against today's date.  If that date is less than today's date, then it will be appended to the past events tab
  if (allEventsArray.length > 0) {
    for (var i = 0; i < allEventsArray.length; i++) {
      if (allEventsArray[i].date < todayUnix) {
        let ul = document.createElement('ul');
        let h5 = document.createElement('h5');
        let div = document.createElement('div');
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
        lineDate.innerText =
          'Date: ' +
          (eventDate.getMonth() + 1) +
          '/' +
          eventDate.getDate() +
          '/' +
          eventDate.getFullYear();
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
}

function retrieveEvents() {
  // get data from local storage and store it in allEventsArray
  if (localStorage.length > 0) {
    allEventsArray = JSON.parse(localStorage.getItem('events'));
    if (allEventsArray != null) {
      allEventsArray.sort((a, b) => a.date - b.date);
      upcomingEvents();
      pastEvents();
      reminderModal();
    }
  }
}

// DISPLAY REMINDER MODAL
// check all future dates against today's current date and display a reminder box if
// event is today's date +14 days or less
function reminderModal() {
  var i = 0;
  var upcoming = false;
  // find the starting point which is the first future event that is within 2 weeks from today
  var startingPoint;
  while (!upcoming && i < allEventsArray.length) {
    if (allEventsArray[i].date < todayUnix) {
      i++;
    } else {
      startingPoint = i;
      upcoming = true;
    }
  }
  if (!startingPoint) {
    return;
  }
  // TO DO:  if no gift selected, then event-gift content = '';
  // populate the reminder modal with information from the event at the startingPoint
  if (allEventsArray[startingPoint].date <= fourteenDays) {
    within2Weeks(startingPoint);
  }
  $('#reminder-modal').dialog({
    modal: true,
    buttons: {
      Prev: function () {
        i--;
        if (i >= startingPoint && allEventsArray[i].date <= fourteenDays) {
          within2Weeks(i);
        } else {
          i++;
        }
      },
      Next: function () {
        i++;
        if (i < allEventsArray.length) {
          if (allEventsArray[i].date <= fourteenDays) {
            within2Weeks(i);
          } else if (allEventsArray[i].date > fourteenDays) {
            notWithin2Weeks(i);
          }
        } else {
          i--;
        }
      },
      Close: function () {
        $(this).dialog('close');
      },
    },
  });
}

// fill the content of the reminder modal with the event content if the event is within 2 weeks from today
function within2Weeks(i) {
  document.getElementById('event-title').textContent =
    'Event: ' + allEventsArray[i].title;
  var eventDate = new Date(allEventsArray[i].date * 1000);
  document.getElementById('event-date').textContent =
    'Date: ' +
    (eventDate.getMonth() + 1) +
    '/' +
    eventDate.getDate() +
    '/' +
    eventDate.getFullYear();
  document.getElementById('event-type').textContent =
    'Type: ' + allEventsArray[i].type;
  document.getElementById('event-gift').textContent =
    'Gift: ' + allEventsArray[i].brand;
}

// display a message to user that the remaining events are not in the next 2 weeks from today
function notWithin2Weeks(i) {
  document.getElementById('event-title').textContent = '';
  document.getElementById('event-date').textContent = '';
  document.getElementById('event-type').textContent = '';
  document.getElementById('event-gift').textContent =
    'The remaining events are not within the next 2 weeks.';
}
