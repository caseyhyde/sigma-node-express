function duplicateChecker(songs, newSong) {
  for (var i = 0; i < songs.length; i++) {
    if(songs[i].title == newSong.title && songs[i].artist == newSong.artist) {
      return true;
    }
  }
  return false;
}

function emptyChecker(newSong) {
  if(newSong.title == "" || newSong.name == "") {
    return true;
  } else {
    return false;
  }
}

module.exports.duplicateChecker = duplicateChecker;
module.exports.emptyChecker = emptyChecker;
