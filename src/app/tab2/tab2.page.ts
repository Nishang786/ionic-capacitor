import { OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import {NavController} from '@ionic/angular'
import { Geolocation} from '@capacitor/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';


declare var google: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
 map: any;
 marker:any;
 @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
infoWindows: any=[];
  
 

  constructor(public platform:Platform ,public navCtrl: NavController) {
     this.platform.ready().then(async()=>{
     var mapOptions= await{  
       center:{lat:21.1458,lng:79.0882},
         zoom:7,
         mapTypeId: google.maps.MapTypeId.ROADMAP
     }

        this.map = new google.maps.Map(document.getElementById ("map"),mapOptions);
        this.location();
        this.startNavigating();
  
  
  
})}
  ngOnInit() {
    
     fetch("./assets/vertopal.com_Ionic_locationjson.json").then(res => res.json()).then(data => {
       console.log("consoledata",data.MarkerLocation);
      
    console.log('tab');
      
       for(let marks of data.MarkerLocation)
       {
         const i = 0;
         let loc = new google.maps.LatLng(marks.Lat, marks.Long);
         let mar = new google.maps.Marker({
           position : loc,
           map : this.map,
         title: marks.LocationName })
         
         }
        
        
         })
     
        }
        
  location()
  {

     var ref = this;
     let watch = Geolocation.getCurrentPosition();
    console.log(watch);
     watch.then((positions)=>{
       var gps = new google.maps.LatLng (positions.coords.latitude,positions.coords.longitude);
        if(ref.marker == null)
        {
          ref.marker = new google.maps.Marker({
            position:gps,
            map:ref.map,
            title:'my position',
            enableHighAccuracy: true
          })
        }
        else{
          ref.marker.setPosition(gps);

        }
        ref.map.panTo(gps)
       })
      }
      startNavigating(){

        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
            origin:{ lat:31.1043,lng:77.1759} ,
            destination: {lat: 31.1012,lng: 77.1840},
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {

            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }

        });

    }

    }
     
