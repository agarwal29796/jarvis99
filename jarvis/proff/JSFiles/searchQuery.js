function speakSearchFetch(query){
 speak('processing your query ,sir') ; 
 searchFetch(query) ; 
}


function searchFetch(query){
googQuery(query) ; 
quoQuery(query) ; 
}

function googQuery(query){
var data = new FormData() ; 
data.append("json" , JSON.stringify(query)) ; 
fetch('/googSearch' , {
	method : 'post',  
	headers : {
		'Accept' : 'application/json, application/xml, text/plain , text/html  , *.*',  
		'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
	}, 
	body : data})
.then(function(response){
return response.json() ;
})
.then(function(data){
  changeNotionQtoI() ; 
 speak(data.result) ;
 embedgoogData(data) ;  
});  
}

function quoQuery(query){
var data = new FormData() ; 
data.append("json" , JSON.stringify(query)) ; 
    fetch('/query', {  
    method: 'post',  
   headers: {
   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
   },
   body: data })
   .then(function(response){
   return response.json() ; 
   })  
   .then(function(data){
    	embedquoData(data) ;  
   });
}

function embedgoogData(data){
var element = document.querySelector('#searchResult'); 
var iframe  = document.querySelector('iframe') ;
document.querySelector('#midPanel>#viewI>#webBar').style.visibility = 'visible' ;
iframe.src = data.links[0] ; 
element.style.visibility = 'visible'; 
element.style.display = 'block' ;  
var viewI = document.querySelector('#rightPanel>#viewI') ; 
removeChildren(viewI) ; 
for(let i = 0 ; i < data.links.length ; i++)
{
var element  = document.createElement('li') ; 
element.innerHTML = data.links[i].split('.org\/')[1] ;
element.setAttribute('onclick', 'speakSearchFetch(this.innerHTML)') ;
viewI.appendChild(element) ;    
}
}

function embedquoData(data){
var viewQ = document.querySelector('#rightPanel>#viewQ') ;
var midViewQ = document.querySelector('#midPanel>#viewQ') ; 
removeChildren(viewQ) ;
removeChildren(midViewQ) ; 
for(let i = 0 ; i < data.links.length ; i++)
{
var element  = document.createElement('li') ; 
element.innerHTML = data.links[i].split('.com\/')[1] ;
element.setAttribute('onclick' , 'speakSearchFetch(this.innerHTML)') ; 
viewQ.appendChild(element) ;  	
}
var ele = document.createElement('h3') ;
ele.innerHTML = data.links[0].split('.com\/')[1]  ; 
midViewQ.appendChild(ele) ;
for(let i = 0 ; i < data.result.length ; i++)
{
var element  = document.createElement('li') ; 
element.innerHTML = '<b>By :</b> '+data.result[i].by +'</br>' + '<p>'+data.result[i].answer+'</p>' ; 
midViewQ.appendChild(element) ;    
}
}

function removeChildren(element){
while(element.hasChildNodes()){
element.removeChild(element.lastChild) ; 
}	
}

function clearSearchResult(){
 var element = document.querySelector('#searchResult') ; 
 element.style.visibility = 'hidden' ; 
 element.style.display = 'none' ; 
}