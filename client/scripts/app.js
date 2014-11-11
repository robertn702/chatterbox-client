// YOUR CODE HERE:
// $(document).ready(function() {
  var app = {};
  app.server = 'https://api.parse.com/1/classes/chatterbox';

  app.init = function () {

  };

  app.send = function (message) {
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
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Received message');
        console.log(data);
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
    // console.log(data.results.length);
    for (var i = 0; i < data.results.length; i++) {
      /*if (data.results[i].username && (data.results[i].text || data.results[i].message)) {
        var userText = data.results[i].text || data.results[i].message;
        var message = escapeHtml(data.results[i].username) + ": " + escapeHtml(userText);
        $('#chats').append('<p>' + message + '</p>');*/
      app.addMessage(data.results[i]);
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
        var message = escapeHtml(messageObj.username) + ": " + escapeHtml(userText);
        if (messageObj.roomname !==undefined) {
          escapedRoom=escapeHtml(messageObj.roomname);
          app.addRoom(escapedRoom);
          var idName = "#"+escapedRoom
          $(idName).append('<p>' + message + '</p>');
        } else {
          $('#chats').append('<p>' + message + '</p>');
        }
        // console.log("Are we there?");
      }
  };

  app.addRoom = function(roomName) {
    console.log("fir",$('#roomSelect').length);
    if ($('div.roomSelect').length === 0) {
      console.log("syntax for existance")
      $('#chats').append('<div class="roomSelect"></div>');
    }
   // console.log("sec", $('#roomSelect').children().length);
    var idName = "#"+roomName;
    if ($(idName).length>0) {  //the room is already in Selectroom
      console.log("check loop")
      return;
    }
    $('.roomSelect').append('<div id=' + roomName + ' class="room">'+roomName+'</div>');
    $('#roomSelect').append('<option value=' + roomName + '>'+roomName+'</option>'); //
  };
  //<option value="volvo">Volvo</option>

  app.fetch();

  $(".getMessageButton").click(function(){
    app.fetch();
  });

// });
