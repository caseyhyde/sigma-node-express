$(document).ready(function() {
  // console.log("it's alive!");

  $("#postSongForm").on("submit", function(event) {
    event.preventDefault();
    var newSong = {};

    $.each($('#postSongForm').serializeArray(), function(i, field) {
      newSong[field.name] = field.value;
    });

    // console.log(newSong);

    // send song object to the Server
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: newSong,
      success: function(response) {
        console.log(response);
        if(response == "Created") {
          getSongs();
        }
      },
      error: function(response) {
        console.log(response);
        console.log(response.status);
        if(response.status == 400) {
          alert("You need to both fill out all fields, and enter a new song");
        } else if(response.status == 0) {
          alert("You are not connected to the server!");
        } else {
          alert("Uknown error!");
        }
      }
    });

  });

  getSongs();

  function getSongs() {
    $.ajax({
      type: 'GET',
      url: '/songs',
      success: function(songData) {
        songsToDom(songData);
        $("input").val("");
      }
    });
  }

  function songsToDom(songs) {
    $("#songContainer").empty();

    for (var i = 0; i < songs.length; i++) {
      $("#songContainer").append('<div class="song"></div>');
      var $el = $("#songContainer").children().last();
      $el.append('<h3>' + songs[i].title + '</h3>');
      $el.append('<p>By: ' + songs[i].artist + '</p>');
      $el.append('<p>Date added: ' + songs[i].dateAdded + '</p>');
    }

  }



});
