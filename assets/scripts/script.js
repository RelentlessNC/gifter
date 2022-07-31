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

$( function() {
    $( "#accordion" ).accordion();
  } );