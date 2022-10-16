$(document).ready(function(){

const app = {};

// function that will give us a random number to insert to the API page we're searching to give us an artist
        function getRandomNum(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const randomInt = getRandomNum(1, 10000)
        const galleryBaseURL = `https://api.artic.edu/api/v1/artists?page=${randomInt}&limit=1`

// fetching data from the API
        app.artFetch = () => {
            const artRandomizer = $.ajax({
                url: `${galleryBaseURL}`,
                method: "get",
                datatype: "json",
            }).then(function(data){ 
// grab artist ID
                const getArtistID = data;
                console.log(data);
                // console.log(getArtistID);  
// have a random function to pick from an array of their available art work 
                let randomNumID = Math.floor(Math.random() * getArtistID.data[0].artwork_ids.length)
                const modURL = `https://api.artic.edu/api/v1/artworks/${getArtistID.data[0].artwork_ids[randomNumID]}`;
                // console.log(modURL);
                $.ajax({
                url: `${modURL}`,
                method: 'get',
                dataType: 'json'
            }).then(function(info){
// verifying the info log
                // console.log(info);
// variables to store the data we need
                let artWork = info.data.image_id ;
                let artWorkTitle = info.data.title;
                let artWorkArtist = info.data.artist_title;
                let artWorkDate = info.data.date_end;
                let artWorkCountry = info.data.place_of_origin;
                let artWorkMedium = info.data.medium_display;
                let artWorkAlt = info.data.alt_text;
// input the image_id from the info into their image API
                document.getElementById("work").src = `https://www.artic.edu/iiif/2/${artWork}/full/843,/0/default.jpg`;
                console.log(`https://www.artic.edu/iiif/2/${artWork}/full/843,/0/default.jpg`)
                document.getElementById("work").alt = artWorkAlt;
// some ids return null or are not available due to real life availability. run an if statement to let the page refresh if we don't recieve an image
                if (info.data.image_id == null){
// console.log-ing an error in loading the page
                    // console.log(`thanks, you broke it`)
                    location.reload();
// if an image is returned load the text info
                } else {
                    document.getElementById("artTitle").innerHTML = `${artWorkTitle} — ${artWorkDate}`;
                    document.getElementById("artist").innerHTML = `${artWorkArtist}, ${artWorkCountry}`;
                    document.getElementById("medium").innerHTML = `${artWorkMedium}`;
// console.log-ing a success
                    // console.log('we gucci 😎')
                }
            })
// allow the user to refresh the page with the refresh button in the window
            const refreshButton = document.querySelector('#reloadPage')
            document.querySelector('#reloadPage').addEventListener('click', () => {
            window.location.reload(true);
                });
        });
    }

// loading animation to fade out once an image has been found
    // $(window).on("load",function(){
    //     $(".loader-wrapper").fadeOut("slow");
    // })
    
// app initialize
        app.init = () => {
            app.artFetch()
        }

        

 $(function () {
            app.init();
})
});