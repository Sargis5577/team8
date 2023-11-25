let requsetUrl = "https://gist.githubusercontent.com/Urdzik/de477f8e3d7baf4366c9d797cfe63531/raw/38c6afa2937ef222323392cc34c8c8c77e02fc40/Movie.json";
const section = document.querySelector(".main-section");
const p = section.querySelectorAll("p");
const img = section.querySelectorAll("img");
const button = section.querySelectorAll("button");

let arrMovies = fetch(requsetUrl)
.then((response)=> response.json())

arrMovies.then(function (response){
    for(let i = 0; i < p.length; i++) {
        p[i].textContent = response[i].Title;
        img[i].src = response[i].Poster;
    }
})


button.forEach((item)=>{
    item.addEventListener("click",f1);
})
img.forEach((item)=>{
    item.addEventListener("click",f1);
})

function f1(evt) {
    if(document.querySelector(".internal-div")) {
        let filmName = evt.target.parentElement.firstElementChild.textContent;
        let div = document.querySelector(".internal-div");
        let title = document.querySelector(".title");
        let descripionText = div.querySelector(".descripion");
        arrMovies.then(function (resolve){
            for(let i = 0; i < resolve.length;i++) {
                if(resolve[i].Title === filmName) {
                    title.textContent = resolve[i].Title;
                    let img = div.querySelector("img");
                    img.src = resolve[i].Poster;
                    descripionText.textContent = resolve[i].Plot;
                }
            }
        })

    } else {
        let div = document.createElement("div");
        let filmName = evt.target.parentElement.firstElementChild.textContent;
        arrMovies.then(function (resolve){
            for(let i = 0; i < resolve.length; i++) {
                if(resolve[i].Title === filmName) {
                    div.classList = "internal-div"
                    let title = document.createElement("p");
                    title.textContent = resolve[i].Title;
                    title.classList = "title";
                    let image = document.createElement("img");
                    image.src = resolve[i].Poster;
                    let descripionText = document.createElement("p");
                    descripionText.classList = "descripion";
                    descripionText.textContent = resolve[i].Plot;
                    div.append(title,image,descripionText);
                    section.append(div);
                }
            }
        })
    }
}




