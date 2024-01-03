import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'OpenAiAppFe';

  searchTxtVal: string = '';
  showOutput: boolean = false;
  output: any;
  isLoading: boolean = false;

  messages = [
    {role: "system", content: "You are a helpful assistant."}
  ];

  constructor(private http: HttpClient){
  }


  handleGetResultButton(){

    let url = "https://api.openai.com/v1/chat/completions";

    let httpHeaders = new HttpHeaders()
    .set("Authorization","Bearer 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")

    this.messages.push({
      role: "user", content: this.searchTxtVal
    })

    let payload = {
        model: "gpt-3.5-turbo",
        messages: this.messages

    }

    this.isLoading = true;

    this.http.post(url, payload, {headers: httpHeaders})
    .subscribe({
      next: (resp) =>{
        this.output = resp;
        this.showOutput = true;
        this.isLoading = false;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

}
