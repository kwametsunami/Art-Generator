const app = {};

app.getArt = () => {
    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomInt = randomNum(1, 10000)
    const galleryUrl = `https://api.artic.edu/api/v1/artists?page=${randomInt}&limit=1`
    fetch(galleryUrl)
        .then(result => result.json())
            .then(info => {
                app.displayArt(info)
            });
}

app.displayArt = (info) => {
    let grab = info.data[0].id
    const modUrl = `https://api.artic.edu/api/v1/artworks/${grab}`
    console.log(modUrl)
    fetch(modUrl)
        .then(infoData => infoData.json())
            .then(infoReturn => {
                let artWork = infoReturn.data.image_id;
                let artWorkTitle = infoReturn.data.title;
                let artWorkArtist = infoReturn.data.artist_title;
                let artWorkDate = infoReturn.data.date_end;
                let artWorkCountry = infoReturn.data.place_of_origin;
                let artWorkMedium = infoReturn.data.medium_display;
                let artWorkAlt = infoReturn.data.alt_text;
                document.getElementById("work").src = `https://www.artic.edu/iiif/2/${artWork}/full/843,/0/default.jpg`;
                console.log(`https://www.artic.edu/iiif/2/${artWork}/full/843,/0/default.jpg`)
                document.getElementById("work").alt = artWorkAlt;
                if (infoReturn.data.image_id == null) {
                    location.reload();
                } else {
                    document.getElementById("artTitle").innerHTML = `${artWorkTitle === null ? "Unknown" : artWorkTitle} — ${artWorkDate === null ? "Unknown" : artWorkDate}`;
                    document.getElementById("artist").innerHTML = `${artWorkArtist === null ? "Unknown" : artWorkArtist}, ${artWorkCountry === null ? "Unknown" : artWorkCountry}`;
                    document.getElementById("medium").innerHTML = `${artWorkMedium === null ? "Unknown" : artWorkMedium}`;
                    const work = document.getElementById("work")
                    work.style.display = "inline";
                    const loader = document.querySelector(".loader")
                    loader.style.display = "none";
                }               
            })
            .catch(() => {
                app.getArt()
            })
        }

app.refreshButton = () => {
    const refresh = document.querySelector('#reloadPage')
    refresh.addEventListener('click', () => {
        // window.location.reload(true);
        const work = document.getElementById("work")
        work.style.display = "none";
        const loader = document.querySelector(".loader")
        loader.style.display = "inline-block";
        app.getArt();
    });
}

app.init = () => {
    app.getArt();
    app.refreshButton();
}

app.init()