import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {

    isRecording = false;
    permission: boolean;
    matches: String[];
    error: any = "____" ;
    

    selected_language: string = "";
    is_language_selected: boolean =  false;

    constructor(private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, private tts: TextToSpeech) {
        

    }

    stopListening() {
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;
        });
    }

    getPermission() {
        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission();
                }
            });
    }

    startListening() {
       if(this.is_language_selected){
        this.getPermission();
        let options = {
            language: this.selected_language
        }
        this.speechRecognition.startListening(options).subscribe(matches => {
            this.matches = matches;
            this.cd.detectChanges();
            if (this.matches.includes("Забронировать столик в ресторане")) {
                this.tts.speak({
                    text: 'Желаете забронировать столик в ресторане?',
                    locale: 'ru-RU',
                    rate: 1.5
                    })
                    .then(() => console.log('Success'))
                    .catch((reason: any) => console.log(reason));
                console.log("RENT TABLE WORK");        
            } 
        });
        this.isRecording = true;	
	}
	else{
	   alert("Сначала выберите язык");
	}
    }

    set_Language($event){
	switch($event.target.value) { 
  	      case "RU": { 
 		this.selected_language = "ru-RU";
		console.log(this.selected_language);
		this.is_language_selected = true;
      	      break; 
   	      }
   	      case "US": { 
      	        this.selected_language = "en-US"; 
		console.log(this.selected_language);
		this.is_language_selected = true;
                break; 

              } 
              case "UA":{
		this.selected_language = "uk-UA"; 
		console.log(this.selected_language);
		this.is_language_selected = true;
                break; 
              }
              default: { 
                console.log("Selected language::: " + this.selected_language) 
                break; 
              } 
         } 			
    }

    compare(arr1, arr2) {

    if (!arr1 || !arr2) return

    let result;

    arr1.forEach((e1, i) => arr2.forEach(e2 => {

        if (e1.length > 1 && e2.length) {
            result = this.compare(e1, e2);
        } else if (e1 !== e2) {
            result = false
        } else {
            result = true
        }
    })
    )

    return result

}


    /*startRec() {
        if (this.permission) {
            this.speechRecognition.isRecognitionAvailable()
                .then((available: boolean) => console.log(available))

            // Start the recognition process
            this.speechRecognition.startListening()
                .subscribe(
                    (matches: string[]) => this.matches = matches,
                    (onerror) => this.error = onerror
                )
        }
         
     }

    
         
    stopRec() {
        this.speechRecognition.stopListening()
    }
    */

   

}
