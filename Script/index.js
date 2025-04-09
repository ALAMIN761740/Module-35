

// button -----------------fetch
function loadCategories() {
    // 1- fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2- convert promise to json
    .then((res)=> res.json())
    // 3- send data to display
    .then((data)=> displayCategories(data.categories));
}




// video -----------fetch
function loadVideos (){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res)=>res.json())
    .then((data)=>displayVideos(data.videos) );
}







// button-----------
function displayCategories (categories){
    // get the container 
    const categoryContainer = document.getElementById("category-Container");

    // Loop operation on Array of object
    for (let cat of categories){
        // console.log(cat)
          
        // create Element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML=`
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

        // append the element
        categoryContainer.appendChild(categoryDiv);
    }

    
}



// loadVideo-------------
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("Video-Container");


    videos.forEach((video) => {
        // console.log(video);

        const videoCard =document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-300 p-5  shadow-lg ">
        <figure>
            <img class="rounded-lg"
            src="${video.thumbnail}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${video.title}</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary hover:bg-[#FF1F3D]">Play</button>
            </div>
        </div>
        </div>

        `;

        videoContainer.append(videoCard);
    });
}



loadCategories();
loadVideos();