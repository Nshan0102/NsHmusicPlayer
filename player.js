// making array for songs
var songs = ["Adreus - Siempre.mp3",
			"Alba - pami pati.mp3",
			"Don Moen - I Want.MP3",
			"Giluan - quand qe mara.mp3",
			"Kiara - Come with me.mp3",
			"Olala - olala song.mp3",
			"Omega - the best.mp3",
			"Siera - mi amo.mp3",
			"Simione- lets go.mp3",
			"Someone - some song.mp3",
			"Arabic Remix Ya Lili Samet Koban.mp3",
			"Dancing Shadows.MP3",
			"David Tatevosian - Yeli yeli Nikol jan.mp3",
			"Edo Barnaulski - Nikol Pashinyan.mp3",
			"F.Duval - Ballade Pour Adeline.mp3",
			"F.Pappetti - Emanuelle.mp3",
			"Flash Dance - Love Theme.mp3",
			"G.Zamfir - Yesterday.mp3",
			"HRAG - DUXOV.mp3",
			"JAMES LAST - BALLADE POUR ADELINE.mp3",
			"JOE DASSIN -A TOI.mp3",
			"LAV SAQSAFON.mp3",
			"Memories of Mallorea.mp3",
			"Michael Legrand - Parapluies De Sherbourg.mp3",
			"Mihran-Tsarukyan-Ti-Moya-Ty-Moya.mp3",
			"Once pon A Time In America - Cockey's Song.mp3",
			"Seduction.MP3"];

//making variables for player controllers
var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
volumeSlider.value = 0.05;
var nextSongTitle = document.getElementById('nextSongTitle');

// making an audio object
var song = new Audio();
var currentSong = 0;
function ready() {
    var oP = document.body.lastElementChild;
    document.body.removeChild(oP);
    loadSong();
}
document.addEventListener("DOMContentLoaded", ready);

function loadSong () {
	currentSong = Number(currentSong);
	song.src = "songs/" + songs[currentSong];
	songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
	nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[(currentSong + 1) % songs.length];
	song.playbackRate = 1;
	song.volume = volumeSlider.value;
	document.getElementById(currentSong).style.backgroundColor = "yellow";
	var img = document.getElementById(currentSong);
	img.scrollIntoView();
	img = img.childNodes;
	img[0].src = "images/pause.png";
	song.play();
	setTimeout(showDuration, 1000);
}

// Duretion and current time show functions

setInterval(updateSongSlider, 1000);

function updateSongSlider () {
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c);
	if(song.ended){
		next();
	}
}

function convertTime (secs) {
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;
	return (min + ":" + sec);
}

function showDuration () {
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max", d);
	duration.textContent = convertTime(d);
}

// Player controllers' functions 

function playOrPauseSong (img) {
	song.playbackRate = 1;
	if(song.paused){
		song.play();
		img.src = "images/pause.png";
	}else{
		song.pause();
		img.src = "images/play.png";
	}
}

function next(){
	var img = document.getElementById(currentSong);
	img = img.childNodes;
	img[0].src = "images/play.png";
	document.getElementById(currentSong).style.backgroundColor = "#c1cfea";

	currentSong = (currentSong + 1) % songs.length;
	loadSong();
}

function previous () {
	var img = document.getElementById(currentSong);
	img = img.childNodes;
	img[0].src = "images/play.png";
	document.getElementById(currentSong).style.backgroundColor = "#c1cfea";

	currentSong--;
	currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
	loadSong();
}

function seekSong () {
	song.currentTime = songSlider.value;
	currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume () {
	song.volume = volumeSlider.value;
}

function increasePlaybackRate () {
	if(song.playbackRate < 2.0){
		song.playbackRate += 0.5;
	}else{
		song.playbackRate = 2.0;
	}
	
}

function decreasePlaybackRate () {
	song.playbackRate -= 0.25;
}

// Fix player on the top of the page after scroll

window.onscroll = function() {myFunction()};

var player = document.getElementById("player");
var sticky = player.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    player.classList.add("sticky");
  } else {
    player.classList.remove("sticky");
  }
}

// play songs from playlist
function loadSongPL (el) {
	var img = document.getElementById(currentSong);
	img = img.childNodes;
	img[0].src = "images/play.png";
	document.getElementById(currentSong).style.backgroundColor = "#c1cfea";
	currentSong = el.id;
	loadSong();
}

function increaseVolume(){
	volumeSlider.value = 1;
	song.volume = volumeSlider.value;
}

function decreaseVolume(){
	volumeSlider.value = 0;
	song.volume = volumeSlider.value;
}
