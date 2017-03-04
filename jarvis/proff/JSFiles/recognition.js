
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var serviceAvailable = false ; 
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
var mic = document.querySelector('#mic') ;
var listener = document.querySelector('#listener') ;

recognition.onresult = function(event) {
  listener.style.opacity = '.5' ;
  var last = event.results.length - 1;
  var color = event.results[last][0].transcript.toUpperCase();
  diagnostic.textContent =  color ;


if(event.results[0].isFinal)
{   listener.style.opacity = '1'; 
   if(serviceAvailable){
    console.log('service is available') ; 
 //=============================================SHUTDOWN QUERY
    var reOff = /(SHUTDOWN)|(SHUT\sDOWN)|(SWITCHOF(F)?)|(SWITCH\sOF(F)?)/g ; 
    var disable = /DISABLE\sYOURSELF\s?/g ; 
    var shutDown = color.match(reOff) ; 
    var disableInput = color.match(disable) ; 
    if(shutDown !== null){ 
    speak('ok sir , i will not entertain further query from now') ; 
    listener.style.border = 'none';  
    serviceAvailable = false ;
    mic.src = '/proff/micoff.gif';
 //========================================================== 
    }
    else if(disableInput !== null)
    {
    listener.style.border = 'none';  
    serviceAvailable = false ;
    mic.src = '/proff/micoff.gif';
    }
    else{ 
   inputQueryFilter(color) ; 
   }
   }
   else 
  {
 //==============================================START QUERY   
    console.log('service is not available') ;
    var reStart = /(HOW\sARE\sYOU)|(WHAT\sARE\sYOU\sDOING)|(SWITCH\sON)|(SWITCHON)/g ; 
    var enable = /ENABLE\sYOURSELF\s?/g ; 
    var startInput = color.match(reStart) ; 
    var enableInput = color.match(enable) ; 
    if(startInput !== null)
    {
      speak('i am doing well sir, i will answer your any query') ;
    listener.style.borderTop = '3px  solid #5DADE2';  
    mic.src = '/proff/micon.gif' ;
    serviceAvailable = true ;
    }
    if(enableInput !== null){
     listener.style.borderTop = '3px  solid #5DADE2';  
    mic.src = '/proff/micon.gif' ;
    serviceAvailable = true ; 
    } 
//==========================================================

}
} 
}


recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
//  mic.src = '/proff/micoff.gif' ;
}
recognition.onend = function(event){
recognition.start();
} 

window.onload = function(){
      console.log('Ready to receive a color command.');
      recognition.start() ;  
}