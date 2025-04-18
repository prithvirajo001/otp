// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, get, onValue, set, update, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATp9Ssg6Gxz34jsszDjwUNHFrnXfF2diU",
  authDomain: "project-pk-4fd11.firebaseapp.com",
  databaseURL: "https://project-pk-4fd11-default-rtdb.firebaseio.com",
  projectId: "project-pk-4fd11",
  storageBucket: "project-pk-4fd11.firebasestorage.app",
  messagingSenderId: "853180135396",
  appId: "1:853180135396:web:8addc5ceaf9616ae0179f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


    
document.getElementById("newcrtaccbtn").addEventListener("click",(e)=>{
    e.preventDefault();
let newlusername=document.getElementById("newlusername").value;
let newluserpass1=document.getElementById("newluserpass1").value;
let newluserpass2=document.getElementById("newluserpass2").value;
if(newlusername !="" && newluserpass1 !="" && newluserpass2 !="" )
{
if(newluserpass1 == newluserpass2 ){

console.log("ready to store in db");
push(ref(db,'login_details_of_attendence/'),{
username:newlusername,
password:newluserpass1
})
alert(`HI ${newlusername},YOUR ACCOUNT CREATED SUCCESSFULLY`)
    document.getElementById("card").setAttribute("style","display:block;")
    document.getElementById("card2").setAttribute("style","display:none;")
    document.getElementById("card3").setAttribute("style","display:none;")


}
else{
    alert("CHECK YOUR PASSWORDS !")
}
}
else{
    alert("FILL ALL THE FIELDS")
}
});

let nok=false;
let pok=false;
let lusername="";

document.getElementById("loginbtn").addEventListener("click",()=>{

 lusername=document.getElementById("lusername").value;
 let luserpass=document.getElementById("luserpass").value;

onValue(ref(db,'login_details_of_attendence/'),(snapshot)=>{
let data=snapshot.val()
for(let key in data){
let item=data[key];
console.log("in database:",item.username,"in field:",lusername)
console.log("in database:",item.password,"in field:",luserpass)
if(lusername == item.username){
nok=true;
if(luserpass == item.password){
pok=true;
break
}
}
}
if(nok){
    if(pok){
 secondPage();
    }
    else{
        alert("wrong password ")
    }
    }
    else{
        alert("wrong  username")
    }
    
    });



});//onValue



//-----------------------------------------entered the app---------------------------------------//








function secondPage(){
  document.getElementById("card").setAttribute("style","display:none;")
  document.getElementById("card2").setAttribute("style","display:none;")
  document.getElementById("card3").setAttribute("style","display:none;")
  document.getElementById("h").setAttribute("style","display:none;")
  document.getElementById("body1").setAttribute("style","backround:black;")
  let med="";
  let hr="";
  document.getElementById("maindivapp").setAttribute("style","display:block;") 
  document.getElementById("divtoshnm").innerHTML=`<h2 id="weluser" class="weluser">HELLO__ ${lusername}___ REGISTER YOUR ATTENDANCE HERE!</h2>
  `;
  let fulltime="";
  let tdate="";
  function updatetime(){
      const now=new Date();
      tdate=now;
       hr=now.getHours();
       med= hr<12 ? "AM" :"PM";
      let newhr=Number(hr)-12;
      const min=now.getMinutes();
      const sec=now.getSeconds();
      fulltime=newhr+":"+min+":"+sec+med;
      let today=String(tdate.getDate()) +" "+ String(tdate.getMonth())+" "+String(tdate.getFullYear());
      document.getElementById("time").innerHTML=`<h1 id="tim">TIME:&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;${newhr}&nbsp;&nbsp;${min}&nbsp;&nbsp;${sec}&nbsp;&nbsp;${med}&nbsp;&nbsp;&nbsp;&nbsp;DATE:&nbsp;&nbsp;${today}</h1>`;    
  }
  updatetime();
  setInterval(updatetime,1000)
  
  
  let mkat=document.getElementById("mkat");
  mkat.addEventListener("click",()=>{
      
      let clicktime=fulltime;
      let meridian=med;
      console.log(clicktime);
      
  document.getElementById("pacetoatt").setAttribute("style","display:block;")
  
  let session=document.getElementById("session");
  if(meridian == "AM"){
      session.innerText="MORNING SESSION";
  }
  else{
      session.innerText="EVENING SESSION";
  
  }
  mkat.style.display="none";
  });
  document.getElementById("usrnm").innerText=lusername;
  
  
  //check location and mark attendance 
  
  
    const allowedDistance = 100; // in meters
  
    // Haversine formula to calculate distance between 2 GPS points
    function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Radius of earth in meters
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }
  
    document.getElementById("mkattntb").addEventListener("click", () => {
     
      let txlat=document.getElementById("txlat").value;
      let txlog=document.getElementById("txlog").value;
      
      let adjlat=Number(txlat);
      let adjlog=Number(txlog);
        // Office Location (example: company lat/lng)
        const homeLat = adjlat;
        const homeLng = adjlog;
     
     
     
     
     
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const distance = getDistanceFromLatLonInMeters(userLat, userLng, homeLat, homeLng);
  
          if (distance <= allowedDistance) {
             alert(`Attendance marked. You are ${Math.round(distance)} meters from office.`)
             
            // You can call Firebase function here to store data
          } else {
           alert(`You are too far (${Math.round(distance)} m). Attendance not allowed.`)
          }
          console.log("user loc:",userLat,userLng);
          console.log("home loc:",homeLat,homeLng);
          console.log("distance:",distance);
  
  
  
      })
    }
  });


};

