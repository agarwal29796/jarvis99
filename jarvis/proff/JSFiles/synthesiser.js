var synth = window.speechSynthesis;
var voiceSelect = document.querySelector('select') ; 
var utterance = new SpeechSynthesisUtterance() ; 
var pitch = document.querySelector('#pitch');
var rate = document.querySelector('#rate');
var voices = [];
var recognizing = true ;
function populateVoiceList() { 
  voices = synth.getVoices();
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


function speak(text , flag){
var utterance = new SpeechSynthesisUtterance(text);
var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name') ;  
for( i = 0 ; i < voices.length ; i++)
{
	if(voices[i].name === selectedOption)
	{
		utterance.voice = voices[i] ; 
	}
}
utterance.pitch  = pitch.value ; 
utterance.rate = rate.value ; 	
//if(flag === 'immediate')
synth.cancel() ;	
synth.speak(utterance); 
}

function stop(){
synth.cancel()  ;	
}

function pause(){
synth.pause() ; 	
}

function resume(){
if(synth.paused === true)
synth.resume() ; 
else
window.alert('already paused') ; 	
}