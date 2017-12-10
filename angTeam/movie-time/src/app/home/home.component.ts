import { Component, OnInit } from '@angular/core';
import { movieOriginal } from "./movieReel";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countryCount: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  totalLA: number[] = [0,0,0,0];
  sortBy: string;
  tableHeaders = (Object.keys(movieOriginal[0]));
  movieOriginal:any[];
  canvasLine: any;
  constructor() { }

  ngOnInit() {
    this.getCounts();
    this.tableHeaders = (Object.keys(movieOriginal[0]));
    this.movieOriginal = movieOriginal;
    this.canvasLine = document.querySelector('#lineChart');
    console.log(typeof(this.movieOriginal[0].Year));
    
  }
  //filteredData = this.movieOriginal;
  getCounts(){
    for(let x = 0 ; x < movieOriginal.length ; x++){
       switch (movieOriginal[x].Country){
          case "USA":
             this.countryCount[0]+=1;
             break;
          case "UK":
          this.countryCount[1]++;
             break;
          case "Soviet Union":
          this.countryCount[2]++;
             break;
          case "Germany":
          this.countryCount[3]++;
             break;
          case "Sweden":
          this.countryCount[4]++;
             break;
          case "Japan":
          this.countryCount[5]++;
             break;
          case "France":
          this.countryCount[6]++;
             break;
          case "Korea":
          this.countryCount[7]++;
             break;
          case "New Zealand":
          this.countryCount[8]++;
             break;
          case "Spain":
          this.countryCount[9]++;
             break;
          case "Italy":
          this.countryCount[10]++;
             break;
          case "India":
          this.countryCount[11]++;
             break;
          case "Denmark":
          this.countryCount[12]++;
             break;
          case "Brazil":
          this.countryCount[13]++;
             break;
          case "Taiwan":
          this.countryCount[14]++;
             break;
          case "Hong Kong":
          this.countryCount[15]++;
             break;
       }
       if(movieOriginal[x]["Leading actors"].length < 3){
          this.totalLA[0] += 1;
       }else if(movieOriginal[x]["Leading actors"].length == 3){
        this.totalLA[1] += 1;
       }else if(movieOriginal[x]["Leading actors"].length == 4){
        this.totalLA[2] += 1;
       }else if(movieOriginal[x]["Leading actors"].length >= 5){
        this.totalLA[3] += 1;
       }
    };
 };
 
  tableRepeat = function(x,y){
    //Arrays must be formatted before they are displayed
    if(Array.isArray(x[y])){
      return x[y].join(", ");
    }else{
      return x[y];
    }
  }
  setSortValue = function($event){
    if($event.currentTarget.dataset.sorted == "false"){
      this.sortBy = $event.currentTarget.name;
      $event.currentTarget.dataset.sorted = "true";
    }
    else{
      this.sortBy =  $event.currentTarget.name;
      $event.currentTarget.dataset.sorted = "false";
    }
    this.movieOriginal = this.quick_Sort(this.movieOriginal, this.sortBy, $event.currentTarget.dataset.sorted);
  }
  quick_Sort = function(origArray, sortBy, sorted) {
    if (origArray.length < 1) { 
      return origArray;
    } else {
  
      var left = [];
      var right = [];
      var newArray = [];
      var pivot = origArray.pop();
      var length = origArray.length;
      
      if (sorted=="true") {
        for (var i = 0; i < length; i++) {
          if (origArray[i][sortBy] <= pivot[sortBy]) {
            left.push(origArray[i]);
          } else {
            right.push(origArray[i]);
          }
        }
      }
      else{
        for (var i = 0; i < length; i++) {
          if (origArray[i][sortBy] >= pivot[sortBy]) {
            left.push(origArray[i]);
          } else {
            right.push(origArray[i]);
          }
        }
      }
      return newArray.concat(this.quick_Sort(left,sortBy, sorted), pivot, this.quick_Sort(right,sortBy, sorted));
    }
  }
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: this.countryCount }
  ];

  chartLabels = ["USA", "UK", "Soviet Union", "Germany", "Sweden", "Japan", "France", "Korea", "New Zealand", "Spain", "Italy", "India", "Denmark", "Brazil", "Taiwan", "Hong Kong"];

  onChartClick(event) {
    console.log(event);
  }
  
  pieChartOptions = {
    responsive: true
  };

  pieChartData = [
    { data: this.totalLA }
  ];

  pieChartLabels = ["<2", "3", "4", ">5"];

  pieOnChartClick(event) {
    console.log(event);
  }

  
  findMatches = function(wordMatch: any){
    console.log(wordMatch);
    if (!wordMatch){
      this.movieOriginal = movieOriginal;
    }
    this.movieOriginal = movieOriginal.filter(movie => {
          const regex = new RegExp(wordMatch, 'gi');
          for(var x in this.tableHeaders){
             //check for a match in columns containing string data
             if((typeof(movie[this.tableHeaders[x]]) == "string") && movie[this.tableHeaders[x]].match(regex)){
               console.log("yes")
                return true;
             }
             //check for a match in columns containing arrays
             else if(typeof(movie[this.tableHeaders[x]]) == "object"){
                for(var y in movie[this.tableHeaders[x]]){
                   if(movie[this.tableHeaders[x]][y].match(regex)){
                      return true;
                   }
                }
             }
          } 
       }
    );
  }
}
