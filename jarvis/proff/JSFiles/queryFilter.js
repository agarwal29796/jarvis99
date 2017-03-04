var occupied = false ; 
var currentProcess = '' ; 
var speakingMode = 'c' ; 
function inputQueryFilter(string){
//=========================================================SHUT UP THE JARVIS=======
var shutUP = /(SHUT)(\s)?UP\s(\w){2}RVICE/g ; 
var shutMatch = string.match(shutUP) ; 
if(shutMatch!== null){
synth.cancel() ;
}
//==================================================================================
//========================================================PLAY QUERY================
if(!occupied || (currentProcess === 'play')){	
var rePlay = /(PLAY)/g ; 
var rePlayStop = /((S)?TOP)|(REMOVE)|(CLEAR\s?(ALL|IT)?)/g ; 
var match = string.match(rePlay) ;
var matchToStop = string.match(rePlayStop) ;  
if(match !== null)
{
var query = string.split('PLAY')[1] ;
occupied = true ; 
currentProcess = 'play' ; 
speak('fetching your query sir') ; 
playFetch(query) ;  
}
if(matchToStop !== null)
{
if(document.querySelector('#playbar').available)	
speak('current video is stopped');
occupied = false;
currentProcess = '' ;  	
stopPlaying() ; 	
}
}
//=================================================================================
//===================================================SEARCH QUERY==================
if(!occupied ||(currentProcess === 'search')){
var reSearch = /((WHERE)|(HOW)|(WHY)|(WHOM)|(WHAT)|(WHO)|(WHEN)|(WHICH))/ ; 
var reSearchStop = /(CLEAR(\s)?(ALL)?(IT)?)|((REMOVE))/g ; 
var info = /(INFORMATIVE)|(INFORMATIC)|(INFO(S)?(\s)?)/g;
var conver = /(CONVERS(ATIVE)?)|(CONVERSATION)/g;  
var fullScreen  = /(FULL|WIDE)\s?/g; 
var smallScrren = /(SMALL|LITTLE|NARROW)\s?(DOWN)?/g ; 
var shutUP = /((SHUT)\s?(UP)?)|(SILENT)/g ;
var speakUp = /SPEAK\sUP/g ;  
var match1 =  string.match(reSearch) ; 
var match1ToStop = string.match(reSearchStop) ;
var match1ToInfo = string.match(info) ; 
var match1ToConver = string.match(conver) ; 
var match1TofullScreen = string.match(fullScreen)  ;
var match1TosmallScreen = string.match(smallScrren) ;
var match1ToShutUp = string.match(shutUP) ;
var match1ToSpeakUp = string.match(speakUp) ;
if(match1ToSpeakUp !== null){
if(speakingMode === 'c')
{
speak('sorry, sir you have not allowed me to go further') ;
}
else if(speakingMode === 'q')
{
var data = document.querySelector('#midPanel>#viewQ').innerHTML ; 
speak(data) ; 
}	
}

if(match1 !== null)
{
var localStr = match1[0] +' '+ string.split(match1[0])[1] ;	
occupied = true ; 
currentProcess = 'search' ; 	
console.log(localStr) ;
speakSearchFetch(localStr); 
}
else if(match1ToStop!== null) {
occupied = false ; 
currentProcess = '' ; 
speak('all data cleared') ; 
clearSearchResult() ; 	
}
else if(match1ToInfo !== null){	
//speakingMode = 'c' ; inside the function 	
changeNotionQtoI() ;
}
else if(match1ToConver !== null){
//speakingMode = 'q' ; 	inside the function
changeNotionItoQ() ; 
}
else if(match1TofullScreen !== null){
screenFrame() ; 
}
else if(match1TosmallScreen !== null){
screenFrame() ;
}
else if(match1ToShutUp !== null){
synth.cancel() ; 	
}
}
//=================================================================================
//===============================================SETTINGS==========================
if(!occupied ||(currentProcess === 'setting'))
{	
var reSetting = /(SETTING(S)?)/g ; 
var match2 = string.match(reSetting) ; 
if(match2!== null)
{
occupied = !occupied ; 
currentProcess = 'setting' ; 	
speak('processing your request ,sir') ; 
setting() ; 	
}
}
//=================================================================================
//===============================================INSTRUCTIONS======================
if(!occupied ||(currentProcess === 'instruction'))
{	
var reSetting = /(INSTRUCTION(S)?)/g ; 
var match3 = string.match(reSetting) ; 
if(match3!== null)
{
occupied = !occupied ; 
currentProcess = 'instruction' ; 	
speak('processing your request ,sir') ; 
instruction() ; 	
}
}
//=================================================================================

}