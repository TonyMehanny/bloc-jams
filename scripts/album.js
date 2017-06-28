var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/07.png',
  songs: [
    { title: 'Blue', duration: '4:26'},
    { title: 'Green', duration: '3:14' },
    { title: 'Red', duration: '5:01' },
    { title: 'Pink', duration: '3:21'},
    { title: 'Magenta', duration: '2:15'}
]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/09.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

// Assignment 11
var albumDrake = {
    title: 'More Life',
    artist: 'Drake',
    label: 'OVO',
    year: '2017',
    albumArtUrl: 'assets/images/album_covers/08.png',
    songs: [
        { title: 'Free Smoke', duration: '1:01' },
        { title: 'No Long Talk', duration: '5:01' },
        { title: 'Passionfruit', duration: '3:21'},
        { title: 'Get It Together', duration: '3:14' },
        { title: 'Blem', duration: '2:15'}
    ]
};


var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    return template;
}


// #1
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


var setCurrentAlbum = function(album) {
// #2
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3
    albumSongList.innerHTML = '';

    // #4
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    }
};


var findParentByClassName = function(element, targetClass) {
    // If element is the desired element then the current parent is = element's parent
    if (element) {
        var currentParent = element.parentElement;
        // While current parent class does not equal the target class and the current parent class is not null, the current parent is = currentParent's parent element
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        // After traversing as far as we can in our while statement, return current value of currentParent
        return currentParent;
    }
};


var getSongItem = function(element) {
    // Look at the class name of the element that was passed into the function
    switch (element.className) {
        // If the element is a child of song-item-number then use our findParentByClassName function to traverse up the DOM
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        // If it is the immediate parent then use the querySelector to traverse down the DOM tree to song-item-number
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    };
};


var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);

    //Create a conditional that checks if currentlyPlayingSong is null. If true, it should set the songItem's content to the pause button
    //and set currentlyPlayingSong to the new song's number
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    //Add another conditional to revert the button back to a play button if the playing song is clicked again. Set currentlyPlayingSong to null after:
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    // If the clicked song is not the active song, set the content of the new song to the pause button:
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};


// Variable declarations
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;    // Store state of playing songs


window.onload = function() {

    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item') {
            // Change the content from the number to the play button's HTML
            var songItem = getSongItem(event.target);
            // checks that the item the mouse is leaving is not the current song, and we only change the content if it isn't.
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // cached the song item that we're leaving in a variable. Referencing  getSongItem() repeatedly causes multiple queries that can hinder performance
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');

            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });

        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });


        var albums = [albumPicasso, albumMarconi, albumDrake];
        var index = 1;
        albumImage.addEventListener("click", function(event) {
            setCurrentAlbum(albums[index]);
            index++;
            if(index == albums.length) {
                index = 0;
            }
        });
    };
}
