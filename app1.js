var express = require('express') ; 
var app = express(); 
var request = require('request') ; 
var cheerio = require('cheerio') ; 
var q = require('q') ; 
var fs = require('fs') ; 
var path = require('path'); 
var bodyParser = require('body-parser') ; 
var searchData = 'default' ; 
var working = false ; 
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('jarvis'));
var i = 1 ; 
var port = process.env.PORT || 8080;

//app.use(require('./controllers')); 

app.get('/' , function(req , res){
	//console.log('hello'); 
	res.sendFile(path.resolve('jarvis/proff/jarvis.html'));
}); 
app.post('/query' , function(req , res){
var body = JSON.stringify(req.body) ; 
var localVar = body.split('\"')[6].split('\\')[0];
         var urlPart = encodeURIComponent(localVar + ' quora') ;
         var url = 'https://www.google.co.in/search?q='+urlPart+'&ie=utf-8&oe=utf-8&gws_rd=cr&ei=dFY3WKDlOoeOvQSaua3wDQ' ;
          //working = true ; 

         request(url , function(error , response , body){
          if(error){
            console.log('Error '+ error) ; 
          }
          if(!response){
            res.send('No result found') ; 
          }
          else if(response.statusCode === 200)
          {

          	   res.setHeader('Content-Type', 'application/json');
               var $ = cheerio.load(body) ; 
               collectInternalLink($ , 'https://www.quora' , '.com' , false).
               then(function(result){
               var al = result.links[0] ;
                        request(al , function(err1 , res1 , body1){ 
                       var results = [] ;                      
                       var $1 = cheerio.load(body1) ; 
                       //var localDatas = $1('body').text() ;
                      // console.log(localDatas);
                       //var localData = $1('body .rendered_qtext').text() ;
                       //console.log($1('.AnswerHeader').nextAll('.AnswerHeader').html()) ; 
                       //var $2 = cheerio.load($1('body .AnswerPagedlist').html()) ; 
                       $1('.AnswerHeader').each(function(i , elem){
                       	results.push({by : $1(this).text() , answer : ''}) ; 
                       }); 
                       $1('.ExpandedAnswer').each(function(i , elem){
                        results[i].answer = $(this).text() ; 
                        }) ; 
                       //console.log($1('body .pagelist_item').text()) ;
                       // var localData = $1('body .AnswerHeader').text().split('ago')[0] ;
                       //console.log(localData) ;  
                       // var localData1 = $1('body .ExpandedAnswer').text().split('View Upvotes')[0] ; 
                       //console.log(localData1) ;
                       res.send({result : results , links : result.links}) ;
                       //var localData1 = localData.split('PromptsList{margin-bottom:32px}')[1] ;
                       //console.log(localData);
                       //console.log(localData.split('<div class="answer_count">')[1].split('<span class="writing_now_section">')[0]) ; 
                      //}
                     }) ; 
  
               }) ; 
            
          }
         }); 

}); 

app.post('/play' , function(req , res){
var body = JSON.stringify(req.body) ; 
var localVar = body.split('\"')[6].split('\\')[0];
//console.log(localVar) ; 
var urlPart = encodeURIComponent(localVar) ;
var url = "https://www.youtube.com/results?search_query="+urlPart.replace(/%20/gi , '+')+"" ; 
//console.log(url) ;  
request(url , function(error , response , body){
if(error) console.log('Error '+ error) ; 
if(!response) res.send('No result found') ; 
else if(res.statusCode === 200) {
var $  = cheerio.load(body) ; 
var link = $('li .yt-lockup-content h3 a');
var simillarSong = [] ; 
var relatedSongs = [] ; 
var i = 0; 
while(simillarSong.length !== 5){ 
  if(link[i].attribs['href'].match(/watch/g) !== null){
  if(link[i].attribs['href'].match(/list=/g) !== null){
  simillarSong.push({title : link[i].attribs['title'] , href : link[i].attribs['href'].split('&list')[0]}) ; 
   }else 
 {
    simillarSong.push({title : link[i].attribs['title'] , href : link[i].attribs['href']}) ; 
  }
  }
  i++ ; 
  }
//console.log(simillarSong); 
var dataUrl = 'https://www.youtube.com' + simillarSong[0].href  ; 
var dataUrlTitle = simillarSong[0].title; 
//33333333333333333333333333333333333333333333333333

request(dataUrl , function(error , resLocal , body){
if(error)console.log('error in data url' + error) ; 
if(!resLocal) console.log('no data response found') ; 
else if(resLocal.statusCode === 200){
var $ = cheerio.load(body) ; 
var data = $('#watch-description').text() ;
var localVar = $('.content-wrapper a') ;
for(let i = 0 ; i < localVar.length ; i++)
{
  relatedSongs.push({title : localVar[i].attribs['title'] , href : localVar[i].attribs['href']}) ; 
}
//console.log(relatedSongs) ;   
//console.log({result : link[0].attribs['href'] , data : data , title : dataUrlTitle , simillar : simillarSong}) ;
res.send({result : simillarSong[0].href , data : data ,relatedSongs : relatedSongs , title : dataUrlTitle , simillar : simillarSong});  
}
});
//33333333333333333333333333333333333333333333333333 


}
}); 
}); 
app.post('/googSearch' , function(req , res){
	      i = 1 ; 
         var body = JSON.stringify(req.body) ; 
         var localVar = body.split('\"')[6].split('\\')[0];
         //=============================SEARCH URL=================================
         var localWiki ='https://www.google.co.in/search?q='+ encodeURIComponent(localVar + ' wikipedia')+'&ie=utf-8&oe=utf-8&gws_rd=cr&ei=dFY3WKDlOoeOvQSaua3wDQ' ; 
         var localQuora ='https://www.google.co.in/search?q='+ encodeURIComponent(localVar + ' quora')+'&ie=utf-8&oe=utf-8&gws_rd=cr&ei=dFY3WKDlOoeOvQSaua3wDQ' ; 
         //========================================================================
         //queryTheQuora(localQuora , res) ; 
         request(localWiki , function(error , response , body){
         	if(error){
         		console.log('Error '+ error) ; 
         	}
         	if(!response){
         		res.send('No result found') ; 
         	}
         	else if(response.statusCode === 200)
         	{
         		var $ = cheerio.load(body); 
         		collectInternalLink($,  'https://en.wikipedia' , '.org' , true).then(function(result){
                res.send(result) ; 
                 
         		}) ; 
         	}
         }); 
}) ; 




function collectInternalLink($ , uri , splitter , more){
	var defered = q.defer() ; 
	var allAbsoluteLinks = [] ; 
	var al = $('div #ires a') ; 
	al.each(function(){
  var available = false ;
	var temp = $(this).attr('href').split('q=')[1].split('&')[0] ; 
	var temp1 = temp.split(splitter)[0] ; 
	if(temp1 == uri){
		temp = decodeURIComponent(temp) ;
    if(allAbsoluteLinks.length === 0) allAbsoluteLinks.push(temp) ;    
    for(i = 0 ; i < allAbsoluteLinks.length ; i++)
    {  if(temp == allAbsoluteLinks[i]){
     available = true ;
     break; 
	  }
    }
    if(!available) allAbsoluteLinks.push(temp) ;   	
  }
	}) ;
    //console.log(allAbsoluteLinks);
    if(more){
    if(allAbsoluteLinks.length > 1){
		getData(allAbsoluteLinks[0]).then(function(result){
        defered.resolve({result : result, links : allAbsoluteLinks }) ;  
		}) ; 
	 } else{
     defered.resolve({result : 'no data found', links : allAbsoluteLinks}) ; 
	}
    }
    else{
    defered.resolve({links : allAbsoluteLinks}) ;      	
    }
	return defered.promise ; 
}

function getData(link){
	var defered = q.defer()  ;
	//console.log('in get Data section') ; 
	request(link , function(error , response , body){
		if(error){console.log("Error " + error) ; }
		if(!response){console.log('no response') ; }
		else {
			//console.log('hey' + link) ;
			var $ = cheerio.load(body) ; 
           // var str = $('html body p ').contents().map(function() {
            //return (this.type === 'text') ? $(this).text()+' ' : '';
            //}).get().join('');
			var str = $('html body p').text() ;
      str = stringFinalization(str) ; 
			defered.resolve(str); 

		}
	}); 



	return defered.promise ;

}

function stringFinalization(str){
var lineArr = str.split('.') ; 
var cons = 400 ; 
var string  = '' ;
var localArr = [] ;   
for(i = 0 ; i < lineArr.length ; i++)
{
if(string.length < cons){
localArr.push(lineArr[i]) ;   
string = string + lineArr[i] + '.' ;   
}
else break ; 
}
var post = string.length - cons; 
var pre = cons - (string.length - lineArr[i-1].length);
if(post <= (pre+post)*.4){
string = string ; 
}
else{
localArr.pop() ;  
string = localArr.join('. ') ; 
}
console.log(string) ; 
return JSON.stringify(string) ;  
}

    app.listen(port, function(){
	console.log('listening on port 3000'); 
}) ; 		
