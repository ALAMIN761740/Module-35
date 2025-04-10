

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

const loadCategoriesVideos = (id) => {
    const url =`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    console.log(url);


    fetch(url)
        .then((res)=> res.json())
        .then((data)=> displayVideos(data.category));
};





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
        <button onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

        // append the element
        categoryContainer.appendChild(categoryDiv);
    }

    
}



// loadVideo-------------
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("Video-Container");

    videoContainer.innerHTML ="";

    videos.forEach((video) => {
        // console.log(video);

        const videoCard =document.createElement("div");
        videoCard.innerHTML = `
        
        <div class="card bg-base-300 p-5   ">
            <figure class="relative">
                <img class="rounded-lg w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" /> <span class="absolute bottom-2 right-2 text-sm rounded-lg text-white bg-black px-2">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>

                <div class="intro">
                    <h2 class="text-lg font-semibold">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}<img class="w-6 " src="https://img.icons8.com/?size=32&id=AOpCOemSYvTO&format=png" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
        </div>

        `;

        videoContainer.append(videoCard);
    });
}



loadCategories();
