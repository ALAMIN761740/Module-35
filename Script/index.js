

function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");

    for (let btn of activeButtons){
        btn.classList.remove("active");
    }
    console.log(activeButtons);
}


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
function loadVideos ( searchText = ""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementById("btn-All").classList.add("active");
        displayVideos(data.videos)
    } );
}



const loadCategoriesVideos = (id) => {
    const url =`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    console.log(url);


    fetch(url)
        .then((res)=> res.json())
        .then((data)=> { 
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add("active");
            displayVideos(data.category);
            
        });
};



// -----------------------------------------------
const loadVideoDetails =(videoId)=>{
const url = `
https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
`;
fetch(url)
.then(res=>res.json())
.then((data)=> displayVideosDetails (data.video));
};

const displayVideosDetails=(video)=>{
    document.getElementById("Video_Details").showModal();
    const detailsContainer = document.getElementById("details_container");

    detailsContainer.innerHTML=`
    <div class="card bg-base-100 image-full  shadow-sm">
        <figure>
            <img
            src="${video.thumbnail}"
            alt="Shoes" />
        </figure>
    <div class="card-body">
        <h2 class="text-2xl">${video.title}</h2>
        <p>${video.authors[0].profile_name}</p>
        <p>${video.description}</p>
        <div class="card-actions justify-end">
        
        </div>
    </div>
    </div>

    
    `;
};



// -----------------------------------


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
        <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

        // append the element
        categoryContainer.appendChild(categoryDiv);
    }

    
}



// loadVideo-------------
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("Video-Container");

    videoContainer.innerHTML ="";

    if(videos.length==0){
        videoContainer.innerHTML =`
        <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
            <img class="w-[120px]" src="Assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
    }

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
                    <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}
                    
                    ${video.authors[0].verified == true ? `<img class="w-6  " src="https://img.icons8.com/?size=32&id=AOpCOemSYvTO&format=png" alt="">` : `` }
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
            <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-block hover:bg-[#FF1F3D] hover:text-white">Show Details</button>
        </div>

        `;

        videoContainer.append(videoCard);
    });
}


document.getElementById("search-input").addEventListener("keyup",(e)=>{
    const input = e.target.value;
    loadVideos(input);
});



loadCategories();
