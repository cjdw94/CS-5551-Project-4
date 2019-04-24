import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Http: HttpClient) { }
/*
  food;
  result;
  result2;
  FirstName;
  LastName;
*/
//url = 'https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.jpg';


  // fileDisplay;
  file;
  result = 'd';

  getFiles(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
      this.file = reader.result;
      this.predict();
      };
    }
    }
  ngOnInit() {
  }
  predict() {
    this.Http.post('http://localhost:64001/predict', this.file)
      .subscribe((data) => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }
  /*
  getNutrition() {
    if ((this.food != null)) {
      this.GetHttp.get('https://api.nutritionix.com/v1_1/search/' +
        this.food + '?results=0:1&fields=*&appId=1c1ccd2c&appKey=cc82e01a3d45d384c04f28511568c367')
        .subscribe((result) => {
          this.result = result;
          console.log(this.result);
          this.result2 = 'http://api.voicerss.org/?key=386cda37d86f4ea3a22ad8ad860a4165&hl=en-us&src=' + this.food;
        });
    }
  }*/
}
