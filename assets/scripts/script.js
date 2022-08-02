const eventModal = document.getElementById("form-fill")
var calendar = caleandar(document.getElementById('section-calendar'));
var events = [
    { 'Date': new Date(2016, 6, 1), 'Title': 'Doctor appointment at 3:25pm.' },
    { 'Date': new Date(2016, 6, 7), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com' },
    { 'Date': new Date(2016, 6, 11), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts' },
];
var settings = {
    Color: '#999', //(string - color) font color of whole calendar.
    LinkColor: '#333', //(string - color) font color of event titles.
    NavShow: true, //(bool) show navigation arrows.
    NavVertical: false, //(bool) show previous and coming months.
    NavLocation: '#foo', //(string - element) where to display navigation, if not in default position.
    DateTimeShow: true, //(bool) show current date.
    DateTimeFormat: 'mmm, yyyy', //(string - dateformat) format previously mentioned date is shown in.
    DatetimeLocation: '', //(string - element) where to display previously mentioned date, if not in default position.
    EventClick: '', //(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
    EventTargetWholeDay: false, //(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
    DisabledDays: [], //(array of numbers) days of the week to be slightly transparent. ie: [1,6] to fade Sunday and Saturday.
    // ModelChange: model //(array of objects) new data object to pass into calendar (serving suggestion: passing through only the currently selected month's events if working with large dataset.
}

$(function() {
    $("#accordion").accordion();
});

//event listener for Add Event - toggles hide for event modal box
$(".add-event").on('click', function() {
    eventModal.classList.toggle('hide')
})



//event listener for Schedule Event button - toggles hide for event modal box
$(".schedule-button").on('click', function(e) {
    e.preventDefault()
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