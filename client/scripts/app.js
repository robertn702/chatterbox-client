// YOUR CODE HERE:
// $(document).ready(function() {
  var app = {};
  app.server = 'https://api.parse.com/1/classes/chatterbox';

  app.init = function () {

  };

  app.send = function (message) {
    console.log("started sending");
    $.ajax({
      // always use this url
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  app.fetch = function() {
    $.ajax({
      // always use this url
      url: app.server,
      type: 'GET',
      data: 'order=-createdAt;limit=30',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Received message');
        displayMessages(data);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
    // $.get('https://api.parse.com/1/classes/chatterbox')
  };

 var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };


  var escapeHtml = function(str) {
    return String(str).replace(/[&<>"'"\/]/g, function (s) {
      return entityMap[s];
    });
  }

  var displayMessages = function(data) {
    console.log("data",data);
    for (var i = 0; i < data.results.length; i++) {
      app.addMessage(data.results[data.results.length-1-i]);
      //}
    }
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.addMessage = function(messageObj) {
    var escapedRoom;
    if (messageObj.username && (messageObj.text || messageObj.message)) {
        var userText = messageObj.text || messageObj.message;
        var user = '<a href=#>'+ escapeHtml(messageObj.username) + '</a>';
        var message =  escapeHtml(userText);
        if (messageObj.roomname !== undefined) {
          escapedRoom=escapeHtml(messageObj.roomname);
          app.addRoom(escapedRoom);
          $('#chats').prepend('<p class=' + escapedRoom +'>'+user+': ' + message + '</p>');
        } else {
          $('#chats').prepend('<p class=' + escapedRoom +'>'+user+': '+message + '</p>');
        }
        // console.log("Are we there?");
      }
  };

  app.addRoom = function(roomName) {
    if ($('#roomSelect').has('option:contains('+roomName+')').length) {  //the room is already in Selectroom
      return;
    }
    $('#roomSelect').append('<option value=' + roomName + '>'+roomName+'</option>'); //
  };
  //<option value="volvo">Volvo</option>

  $(document).ready(function(){
   app.fetch();

   $(".getMessageButton").click(function(){
    app.fetch();
   });

     $(".sendMessageButton").click(function(){
      var message = {
        username: "defaultname",
        text: $('input').val(),
        roomname: "defaultroom"
      };
      console.log("mess", message);
    app.send(message);
   });

  // var newT = $("select").val();
    $('select').change(function(){
      filterRooms($("select").val());
    });

    var filterRooms = function(roomName) {
      $('#chats').children().each(function() {
        if (!$(this).hasClass(roomName)) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    };
  });





// });
