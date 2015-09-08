// 2. This code loads the IFrame Player API code asynchronously.
$(document).foundation();
// var tag = document.createElement('script'),
//     player;

// var wordPicked = ['see','my','to','and','go'];
// var json_str = JSON.stringify(wordPicked);
// createCookie('mycookie', json_str);

var listOfWords = ['see','my','to','and','go','is','said','the','for','play','can','you','me','it','big','in','we','not','down','where','little','help','like','have','she','are','was','he','they','with','on','this','at','what','do','no','want','who','but','a','up','his','him','had','yes','baby','banana','car','cat','chimpanzee','clap','diaper','dog','milk','rhinoceros','spider'],
	wordIndex = 0,
	videoIndex = 0,
	playerButton = $('span.player a'),
	level = 0,
	searchWords = [
		{ 
			name:'full time kid', 
			image:'https://i.ytimg.com/vi/mc26BHPFydc/default.jpg'
		},
		{ name: 'frozen',
			image: 'https://i.ytimg.com/vi/moSFlvxnbgk/default.jpg'
		},
		{
			name: 'kid science',
			image: 'https://i.ytimg.com/vi/ZjTifsUvcBI/default.jpg'
		},
		{
			name: 'pokemon',
			image: 'https://i.ytimg.com/vi/tAczll2cjMo/default.jpg'
		},
		{
			name: 'minecraft',
			image: 'https://i.ytimg.com/vi/Ku0GahgNnJ4/default.jpg'
		},
		{
			name: 'lego',
			image: 'https://i.ytimg.com/vi/lVl6UxiDQQs/default.jpg'
		},
		{
			name: 'barbie',
			image: 'https://i.ytimg.com/vi/0Mv9hD3-8qg/default.jpg'
		},
		{
			name: 'shopkins',
			image: 'https://i.ytimg.com/vi/P_TO7VdKnLU/default.jpg'
		},
		{
			name: 'how to train a dragon',
			image: 'https://i.ytimg.com/vi/T9KYlBYr4Ms/default.jpg'
		},
		{
			name: 'cookie swirl c',
			image: 'https://i.ytimg.com/vi/7ihWchxoz2o/default.jpg'
		},
		{
			name: 'inside out',
			image: 'https://i.ytimg.com/vi/8Cn1pYnAZSE/default.jpg'
		},
		{
			name: 'sofia the first',
			image: 'https://i.ytimg.com/vi/0I0oKknVlwg/default.jpg'
		},
		{
			name: 'princess',
			image: 'https://i.ytimg.com/vi/CtyOC6ayKoU/default.jpg'
		},
		{
			name: 'ever after high',
			image: 'https://i.ytimg.com/vi/McpbMMSQh18/default.jpg'
		},
		{
			name: 'surprise toys',
			image: 'https://i.ytimg.com/vi/6QG4n3-rKTs/default.jpg'
		},
		{
			name: 'monster high',
			image: 'https://i.ytimg.com/vi/qlMsPRu981g/default.jpg'
		},
		{
			name: 'my little pony',
			image: 'https://i.ytimg.com/vi/boiXc3xjUJc/default.jpg'
		},
		{
			name: 'minions',
			image: 'https://i.ytimg.com/vi/qTSDL94_Y7M/default.jpg'
		},
		{
			name: 'tiny toons',
			image: 'https://i.ytimg.com/vi/GtPxTkcTEgs/default.jpg'
		},
		{
			name: 'mickey mouse',
			image: 'https://i.ytimg.com/vi/qHHaYpdpsrM/default.jpg'
		}
	]

	searchFor = '';

shuffle(listOfWords);

function resetPlayer(){
		$('#gameScreen').show();
		$('.sound-play').show()
		$('.player').hide();
		$('#currentWord p').show();
		$('#underlineText').show();
		$('#keyboard').show();
		playerButton.css('z-index', '-1');
};

function createSearchWordButton(){
	var rows = 1; //here's your number of rows and columns
      var cols = searchWords.length;
      var table = $('<table><tbody>');
      for(var r = 0; r < rows; r++){
        var tr = $('<tr>');
        for (var c = 0; c < cols; c++)
          $('<td></td>').appendTo(tr); //fill in your cells with something meaningful here
        tr.appendTo(table);
      }

      table.appendTo('.searchScreen section');
      $('.searchScreen td').each(function(index){
        $(this).append('<img src="'+searchWords[index].image+'"></img>')
        $(this).data('search-word', searchWords[index].name);
      })
      $('table').addClass('medium-12 columns');
      $('td').addClass('button');
      $('tr').addClass('medium-12 medium-centered');
      $('tbody').css('text-align','center');
      $('td').css('margin','5px').css('font-size','50px');
      // add click event for selected word
      searchWordClick();
};

function searchWordClick(){
	$('table td').on('click', function(){
		searchFor = toQueryString($(this).data("search-word"));
		$('.searchScreen table').remove();
		searchForVideos();
	});
}

function relatedVideos(listOfVideos){
	$.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId='+listOfVideos[Math.floor(Math.random()*25)+1].videoId+'&safeSearch=strict&type=video&relevanceLanguage=en&maxResults=50&videoDuration=short&key=AIzaSyDw_LwtiRuFZSpqSMDRn7Oo9K0Ch2SIVnI',
    dataType: "json",
    success:  function(data) {
      var youtubeJsonList = data.items
      youtubeJsonList.forEach(function(data){
       videos.push({videoId:data.id.videoId, thumbnail:data.snippet.thumbnails.default.url});
    	})

    	videos = shuffle(videos);
    	// function for creating a row and column
    var rows = 12; //here's your number of rows and columns
    var cols = 5;
    var table = $('<table><tbody>');
    for(var r = 0; r < rows; r++){
      var tr = $('<tr>');
      for (var c = 0; c < cols; c++)
        $('<td></td>').appendTo(tr); //fill in your cells with something meaningful here
      tr.appendTo(table);
    }

    table.appendTo('section.player');
    $('.player td').each(function(index){
      // $(this).append('<a href="#"></a><div id="videoPlayer'+index+'"></div>')
      $(this).append('<img class="video-image" src='+videos[index].thumbnail+' data-id='+videos[index].videoId+'>')
    })
    
    // onYouTubeIframeAPIReady();
    $('.gameScreen').hide();
    chosenVideoToPlay();
    }
  });
};

function searchForVideos(){
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet%20&q='+searchFor+'%20&type=video&videoDuration=short&relevanceLanguage=en&maxResults=50&safeSearch=strict&key=AIzaSyDw_LwtiRuFZSpqSMDRn7Oo9K0Ch2SIVnI',
    dataType: "json",
    success:  function(data) {
      var youtubeJsonList = data.items
      youtubeJsonList.forEach(function(data, i){
       videos.push({videoId:data.id.videoId, thumbnail:data.snippet.thumbnails.default.url});
    	})

    	videos = shuffle(videos);

    	relatedVideos(videos, searchFor)
    }
  });
};

function toQueryString(str){
	string = str.replace(/\s+/g, '+').toLowerCase();
	return string
};

function fullscreen(){
	var el = document.documentElement, 
	rfs = el.webkitRequestFullScreen;
    rfs.call(el);
}

$('.sound-play').on('click', function(){
	// fullscreen();
	$('.sound-play').hide()
	document.getElementById('whole-word-sound').play();
	document.getElementById('whole-word-sound').play();
	setTimeout(function(){
		$('#currentWord').show()
	},500);
});

function displayWordChosen(){
	$('#currentWord p').empty();
	$('#matchFullWord li a').empty()
	$('#underlineText p').empty();
	chosenWord = listOfWords[wordIndex].toUpperCase()
			for(i=0; i<chosenWord.length; i++){
				$('#currentWord p').append(chosenWord[i]);
				$('#underlineText p').append("_ ");
			};
			var chosenWordLowercase = chosenWord.toLowerCase();
			$('#whole-word-sound').attr('src', 'audio/'+chosenWordLowercase+'.mp4');
			
};
displayWordChosen();
var matchingLetter = 0,
	wrongLetter = 0

$('#keyboard li').on('click', function(e){
	e.preventDefault();
	var button = $(this).text()
	$('#inputText p').append(button)
	if(button === chosenWord[matchingLetter]){
		matchingLetter = ++matchingLetter
		wrongLetter = 0
	}else{
		setTimeout(function(){
			var correctLetters = $('#inputText p').text().slice(0,-1)
			    $('#inputText p').remove()
			    $('#inputText').append('<p>'+correctLetters+'</p>')
		},500);
		if(level === 3){
			document.getElementById('whole-word-sound').play();
			wrongLetter = ++wrongLetter
			console.log('wrong letter '+wrongLetter)
			if (wrongLetter === 4){
				$('#currentWord').css('visibility','visible');
				level = 0
				wrongLetter = 0
			}
		}
	}
		console.log('original= '+chosenWord)
	if(matchingLetter === chosenWord.length){
		setTimeout(function(){
			$('#inputText p').remove()
			$('#inputText').append('<p></p>')
			$('#currentWord').hide();
			$('#underlineText').hide();
			matchingLetter = 0
			if(level === 3){
				createSearchWordButton();
				$('#gameScreen').show();
				$('.player').show();
				$('#keyboard').hide();
				setTimeout(function(){
					displayWordChosen();
				},3000);
				$('#currentWord p').hide();
				$('#matchFullWord').hide();
				$( "#matchFullWord li" ).unbind( "click");
				level = 0
				wordIndex = ++wordIndex;
				$('#currentWord').css('visibility','visible');
			}else{
				level = 2
				level2()
			}
		},1000);
		if(wordIndex === (listOfWords.length-1)){
			wordIndex = 0
		};
	};
})

function level2(){
	console.log(listOfWords)
	console.log(wordIndex)
    var	l2ListOfWords = [],
    	wordIndexPlus = wordIndex+4
    	console.log(wordIndexPlus)
	for(i = wordIndex; i < wordIndexPlus; i++){
		l2ListOfWords.push(listOfWords[i])
	};
	console.log(l2ListOfWords)
	shuffle(l2ListOfWords);
	$('#matchFullWord li:nth-child(1) a').append(l2ListOfWords[0])
	$('#matchFullWord li:nth-child(2) a').append(l2ListOfWords[1])
	$('#matchFullWord li:nth-child(3) a').append(l2ListOfWords[2])
	$('#matchFullWord li:nth-child(4) a').append(l2ListOfWords[3])
	$('#matchFullWord').show();
	$('#keyboard').hide();
	setTimeout(function(){
		document.getElementById('whole-word-sound').play();
	}, 500)
	$( "#matchFullWord li" ).bind( "click");
	$('#matchFullWord li').on('click', function(){ 
		var word = $(this).children().text().toUpperCase();
			if(word === chosenWord){
				level = 3
				level3();
			}else{
				shuffle(l2ListOfWords);
				console.log("wrong = "+l2ListOfWords)
				$('#keyboard').show();
				$('#matchFullWord').hide()
				$('#currentWord').show();
				$('#underlineText').show();
				$('#matchFullWord li a').empty();
				document.getElementById('whole-word-sound').play();
				$( "#matchFullWord li" ).unbind( "click");
			};
		});
};

function level3(){
	console.log('level3')
	$('#keyboard').show();
	$('#underlineText').show()
	$('#currentWord p').show()
	$('#matchFullWord').hide();
	$('#matchFullWord li a').empty()
	$( "#matchFullWord li" ).unbind( "click");
	document.getElementById('whole-word-sound').play();
	$('#currentWord').css('visibility', 'hidden').show();
}

//shuffle function for shuffling the words
function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


audio = new Audio('audio/big.mp4')
