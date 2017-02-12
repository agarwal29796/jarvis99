    function json(response){  
     return response.json()  
     }

   function stopPlaying(){
   document.querySelector('#simillarSongBox').style.visibility  = 'hidden' ; 
   document.querySelector('#relatedSongBox').style.visibility  = 'hidden' ; 
   var simillarSongElement = document.querySelector('#simillarSong') ; 
   var relatedSongElement = document.querySelector('#relatedSong') ; 
   while (simillarSongElement.hasChildNodes()){
    simillarSongElement.removeChild(simillarSongElement.lastChild);
   }
    while (relatedSongElement.hasChildNodes()){
    relatedSongElement.removeChild(relatedSongElement.lastChild);
   }
   var playbar = document.getElementById('playbar');
   //console.log(playbar) ;  
   playbar.removeChild(playbar.lastChild) ; 
   //document.getElementById('playbarCancel').style.visibility = 'hidden';
   playbar.available = false ; 	
   console.log(playbar) ;
   }

   function playFetch(query){
   var dataPlay = new FormData() ; 
   dataPlay.append("json" , JSON.stringify(query)) ; 
    //document.getElementById('result_to_speak').innerHTML = "REQUESTING TO SERVER , SIR";
    fetch('/play', {  
    method: 'post',  
   headers: {
   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
   },
   body: dataPlay })
   .then(json)  
   .then(function(data){
    	console.log(data); 
    	if(document.querySelector('#playbar').available){
    	stopPlaying() ;
    	document.querySelector('#playbar').available = false ;  	
    	}
    	    //document.getElementById('output').innerHTML = data.data;
    	    embedRelatedSong(data) ; 
    	    embedSimilarSong(data) ; 
      	    var embedUrl = 'https://www.youtube.com/embed/' + data.result.split('v=')[1]+ '?&autoplay=1' ; 
            embedVideo(embedUrl) ; 
   });
  }
  function prePlayFetch(query){
   speak('fetching your query ,sir') ; 
   playFetch(query) ; 
  }
  function embedSimilarSong(data){
  	       var simillarSongElement = document.querySelector('#simillarSong') ; 
            for(let i = 0  ; i < data.simillar.length ; i++)
            {
            var ele = document.createElement('li') ;
            //ele.setAttribute('href' , 'void(0)') ;  
            ele.innerHTML =  data.simillar[i].title;
            ele.setAttribute('onclick', 'prePlayFetch(this.innerHTML)') ;
            ele.style.cursor = 'pointer' ;  
             simillarSong.appendChild(ele) ; 
            }
            document.querySelector('#simillarSongBox').style.visibility = 'visible' ;
  }
  function embedRelatedSong(data){
  	       var relatedSongElement = document.querySelector('#relatedSong') ; 
  	       for(let i = 0 ; i < data.relatedSongs.length ; i++){
  		   var ele = document.createElement('li') ; 
            ele.innerHTML =  data.relatedSongs[i].title ;
            ele.setAttribute('onclick', 'prePlayFetch(this.innerHTML)') ;
            ele.style.cursor = 'pointer' ;  
  		   relatedSongElement.appendChild(ele) ; 
  	}
  		   document.querySelector('#relatedSongBox').style.visibility = 'visible'  ;
  }

  function embedVideo(embedUrl){
   	var parent  = document.getElementById('playbar') ; 
   	parent.available = true ;	
   	var ele = document.createElement('iframe') ; 
   	ele.setAttribute("width" , "560") ; 
   	ele.setAttribute("height" , "315") ; 
   	ele.setAttribute("frameborder" , "0") ; 
   	ele.setAttribute("allowfullscreen" , '') ; 
   	ele.setAttribute("id" , "youtubebar") ; 
   	ele.setAttribute("src" ,  embedUrl)  ;
   	parent.appendChild(ele) ; 
   	//document.getElementById('playbarCancel').style.visibility = 'visible'  ;
   	//globalStorage.songs.push(embedUrl); 
   
}