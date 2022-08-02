const eventModal = document.getElementById("dialog-message")

//tabs jQuery function
$( function() {
    $( "#tabs" ).tabs();
  } );

//accordion jQuery function
$(function() {
    $("#accordion").accordion();
});

//event listener for Add Event - toggles hide for event modal box
$(".add-event").on('click', function() {

    $( function() {
        $( "#dialog-message" ).dialog({
          modal: true,
        })})
    $(function() {
        $("#dialog-message").dialog({
            modal: true,
        });
    });
})



//event listener for Schedule Event button - toggles hide for event modal box
$(".schedule-button").on('click', function(e) {
    e.preventDefault()

    console.log($("#dialog-message").dialog({}))
    $("#dialog-message").dialog( "close" )
  

    $("#dialog-message").dialog( "close" )


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