const eventModal = document.getElementById("dialog-message")
const editBox = document.getElementById("edit-box")
const giphyAPI = 'https://api.giphy.com/v1/gifs/search';
const giphyKEY = 'PVW7bT7xE7oiwvc3VLc9oHgGuFdSrfUb';
var allGiphs = [];
const eventType = 'rabbit'; //document.getElementById('etype').value;


// Fetch the GIPHY API and retrieve the GIFS
fetch(giphyAPI + '?q=' + eventType + '&limit=10&api_key=' + giphyKEY)
    .then(function(response) {
        if (!response) {
            console.log('error');
        }
        return response.json();
    })
    .then(function(data) {
        allGiphs = data;
        displayGifs();

    })
    .catch((err) => {});

function displayGifs() {
    var tab3 = document.getElementById('tabs-3');

    for (var i = 0; i < allGiphs.data.length; i++) {
        var img = document.createElement('img');
        img.setAttribute('src', allGiphs.data[i].images.downsized.url);
        tab3.appendChild(img);
    }
}


//tabs jQuery function
$(function() {
    $("#tabs").tabs();
});

//accordion jQuery function
$(function() {
    $("#accordion").accordion();
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

//edit button event listener
$(".edit-button").on('click', function() {
    console.log('hello')
    editBox.classList.toggle('hide')
})

//event listener for Schedule Event button - toggles hide for event modal box
$(".schedule-button").on('click', function() {
    const parentNode = $(this)[0].parentNode
    const eventTitleEl = parentNode.children[2].value
    const eventDateEl = parentNode.children[5].value
    const eventTypeEl = parentNode.children[8].children.value
    console.log(parentNode)
    console.log(eventTypeEl)
   
    $("#dialog-message").dialog( "close" )
  
$(".schedule-button").on('click', function(e) {
    e.preventDefault()

    console.log($("#dialog-message").dialog({}))
    $("#dialog-message").dialog("close")

    $("#dialog-message").dialog("close")


    eventModal.classList.toggle('hide')
    $("body").css("background-color", "gray");
    $("#confirmation-message").css("visibility", "visible");
    // script for confirmation modal w/ jquery
    $(function() {
        $("#confirmation-message").dialog({
            modal: true,
            resizable: false,
            buttons: [{
                    text: "Confirm",
                    "class": 'btn-hover color-3 modalButtonClass',
                    // script for congrats modal when confirm is clicked
                    click: function() {
                        $(this).dialog("close");
                        $("#congrats-message").css("visibility", "visible");
                        $(function() {
                            $("#congrats-message").dialog({
                                modal: true,
                                width: 500,
                                resizable: false,
                                buttons: [{
                                        text: "Back to Calendar",
                                        "class": 'btn-hover color-3 modalButtonClass',
                                        "id": 'backBtn',
                                        click: function() {
                                            $(this).dialog("close");
                                            $("body").css("background-color", "transparent");
                                        }
                                    },
                                    {
                                        text: "Schedule Another Event",
                                        "class": 'btn-hover color-3 modalButtonClass',
                                        "id": 'scheduleAnotherBtn',
                                        click: function() {
                                            $(this).dialog("close");
                                            $("body").css("background-color", "transparent");
                                        }
                                    }
                                ]
                            })
                        })
                    }
                },
                {
                    text: "Cancel",
                    "class": 'btn-hover color-3 modalButtonClass',
                    click: function() {
                        $(this).dialog("close");
                        $("body").css("background-color", "transparent");
                    }
                }
            ]
        })
    })
})