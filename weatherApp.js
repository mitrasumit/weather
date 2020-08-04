window.addEventListener('load', ()=>
{
    let long;
    let lat;
    let tempDesc=document.querySelector(".temp-desc");
    let tempDegree=document.querySelector(".temp-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let weatherIcon=document.getElementById('icons');
    let tempSection=document.querySelector(".temp");
    let tempSpan=document.querySelector(".temp span");
    let actualData=document.getElementsByClassName("actual-data");
    let showMessage=document.getElementsByClassName("show-message");

    if(navigator.geolocation)
    {

        navigator.geolocation.getCurrentPosition(position=>
            {
                showMessage[0].style.display="none";
                actualData[0].style.display="contents";

                long = position.coords.longitude;
                lat=position.coords.latitude;

                const proxy = "https://cors-anywhere.herokuapp.com/";
                const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=50d9315255db48a969c948b2dda0f8d2&units=metric`;

                fetch(api).then(response =>{
                    return response.json();
                })
                .then(data=>
                    {
                        const {temp} = data.main;
                        const {description}=data.weather[0];
                        const {icon} = data.weather[0];
                        
                        //Set DOM Elements from API

                        tempDegree.textContent=temp;
                        tempDesc.textContent=description.toUpperCase();
                        locationTimezone.textContent=data.name;
                        
                        //Set ICON 

                        var iconsUrl=`http://openweathermap.org/img/wn/${icon}.png`;
                        weatherIcon.src = iconsUrl;

                        let faren=((temp*9)/5)+32;

                        //Change F to C and vice versa

                        tempSection.addEventListener("click",()=>
                        {
                           if (tempSpan.textContent=="F") 
                            {
                               tempSpan.textContent="C";
                               tempDegree.textContent=temp;
                            }
                            else
                            {
                                tempSpan.textContent="F";
                                tempDegree.textContent=Math.floor(faren);
                            } 
                        })
                    });
            });

    }

    else
    {   
        document.querySelector(".message").textContent="This browser does not support this application."
    }

});
