const eventModal = document.getElementById("dialog-message")

//dialog box jQuery function


//accordion jQuery function
$( function() {
    $( "#accordion" ).accordion();
  } );

//event listener for Add Event - toggles hide for event modal box
$(".add-event").on('click', function() {
    $( function() {
        $( "#dialog-message" ).dialog({
          modal: true,
          buttons: {
            'Schedule Event': function() {
              $( this ).dialog( "close" );
            }
          }
        });
      } );
})

//event listener for Schedule Event button - toggles hide for event modal box
$(".schedule-button").on('click', function(e) {
    e.preventDefault()
    console.log($("#dialog-message").dialog({}))
  
})

