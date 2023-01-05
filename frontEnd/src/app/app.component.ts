import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calcualtor';
  toshow = '0';
  current = '';
  mysign = '';
  mynum1 = '';
  mysignindx = 0;
  mynum2 = '';
  
  issign(sign: string){
    if (sign == '+' || sign == '-' || sign == 'x' || sign == '/' || sign == '%' || sign == '=') {
      return true;
    }
    return false;
  }

  isoperation(op: string){
    if(op == "root" || op == "sqrt" || op == "1/x" || op == "-ve"){
      return true;
    }
    return false;
  }

  ans: any;
  constructor(private http:HttpClient) { }

  getreq(s: string, t:string) {
    const myUrl = "http://localhost:8082/";
    if (!this.issign(s)) {
      if(this.mysign != '') {
        this.getreq(this.mysign, s);
      }else{
        this.mynum2 = 'no';
        this.mynum1 = this.toshow;
      }
      
    } 
    else
    {
      this.mynum1 = this.toshow.substring(0,this.mysignindx);
      this.mynum2 = this.toshow.substring(this.mysignindx+1,this.toshow.length);
    }
    this.http.get(
      myUrl,  
      {
        responseType: 'text',
        params:{num1:this.mynum1,sign:s, num2:this.mynum2},
        observe:'response',
      }
    ).subscribe(
    (response) => { this.ans = response.body; 
      if(t=="no")
      {
        this.current = String(this.ans);
        this.current += this.mysign;
        this.toshow = this.current;
        this.mysignindx = this.toshow.length-1;
      }
      else{
        this.current = String(this.ans);
        this.toshow = this.current;
        this.mysign ='';
        this.mysignindx = 0;
        this.getreq(t,'no');
      }
      
    },
    (error) => { console.log(error); });    
    
  }
  
  write(value:string){
    if(this.mysign == '' && value == '=')
    {
      this.ans = this.toshow;
      return;
    }
    if(this.toshow[0] == 'e')
    {
      this.clear();
    }
    if (this.issign(value)) {
      if (this.mysign != '') {
        let s = this.mysign;
        if(value != '='){
          this.mysign = value;
        }else{
          this.mysign = '';
        }
        this.getreq(s,'no');
      }
      else if(!this.isoperation(value))
      {
        this.mysign = value;
        this.mysignindx = this.toshow.length;
      }
      
    }
    if(value == '-ve'){
      this.current += '-';
    }else{
      this.current += value;
    }
    
    this.toshow = this.current;
    
  }

  del(){
    let l = this.toshow.length;
    if (l == 1) {
      this.current = '';
      this.toshow = '0';
    }
    else{
      this.current = this.toshow.substring(0,l-1) ;
      this.toshow = this.current;
    }
  }
  clear(){
    this.current ='';
    this.toshow = '0';
    this.ans = '';
    this.mysign = '';
    this.mysignindx = 0;
  }
}




