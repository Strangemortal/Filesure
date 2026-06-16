const reviews = [
{
id:"REV001",
name:"John",
ecommerce:"Amazon",
rating:5,
type:"Quality",
review:"Excellent quality product.",
date:"12 Mar 2025"
},
{
id:"REV002",
name:"Sarah",
ecommerce:"Flipkart",
rating:1,
type:"Delivery",
review:"Late delivery.",
date:"15 Mar 2025"
},
{
id:"REV003",
name:"Mike",
ecommerce:"Myntra",
rating:5,
type:"Packaging",
review:"Packaging was perfect.",
date:"18 Mar 2025"
},
{
id:"REV004",
name:"Emma",
ecommerce:"Amazon",
rating:2,
type:"Service",
review:"Support team was slow.",
date:"20 Mar 2025"
}
];

let currentRating = "all";
let currentPlatform = "all";
let currentType = "all";

const container =
document.getElementById("categoryReviews");

function filterReviews(){

    let filtered = reviews;

    if(currentRating !== "all"){
        filtered = filtered.filter(
            r => r.rating == currentRating
        );
    }

    if(currentPlatform !== "all"){
        filtered = filtered.filter(
            r => r.ecommerce === currentPlatform
        );
    }

    if(currentType !== "all"){
        filtered = filtered.filter(
            r => r.type === currentType
        );
    }

    renderReviews(filtered);
}

function renderReviews(data){

    container.innerHTML = "";

    data.forEach(review=>{

        const card = document.createElement("div");
        card.className = "p-[15px] bg-white/5 mt-[15px] rounded-[15px] border border-white/8 cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-350 ease-in-out hover:-translate-y-[6px] hover:shadow-[0_16px_30px_rgba(2,6,23,0.22)] hover:bg-white/7 backdrop-blur-[16px]";

        card.innerHTML = `
            <h4 class="font-semibold text-lg text-slate-50">${review.name}</h4>
            <p class="text-slate-300 mt-1">${review.review}</p>
            <small class="text-slate-400 block mt-2 font-medium">
                ${review.ecommerce} • ${review.type}
            </small>
        `;

        card.onclick = () => openModal(review);

        container.appendChild(card);
    });

}

function openModal(review){

    document.getElementById("reviewModal")
    .style.display="flex";

    document.getElementById("modalEcommerce")
    .innerText = review.ecommerce;

    document.getElementById("modalName")
    .innerText = review.name;

    document.getElementById("modalDate")
    .innerText = review.date || "";

    document.getElementById("modalId")
    .innerText = "_id : " + review.id;

    // Convert numeric rating to stars
    const ratingStars = typeof review.rating === 'number' ? "★".repeat(review.rating) + "☆".repeat(5 - review.rating) : review.rating;
    document.getElementById("modalRating")
    .innerText = ratingStars;

    document.getElementById("modalReview")
    .innerText = review.review;

    const importantBtn =
    document.getElementById("importantBtn");

    let importantReviews =
    JSON.parse(localStorage.getItem("importantReviews"))
    || [];

    const exists =
    importantReviews.some(r=>r.id===review.id);

    importantBtn.innerText =
    exists ? "★ Important" :
    "☆ Mark Important";

    importantBtn.onclick = ()=>{

        let importantReviews =
        JSON.parse(localStorage.getItem("importantReviews"))
        || [];

        const exists =
        importantReviews.some(r=>r.id===review.id);

        if(exists){

            importantReviews =
            importantReviews.filter(
                r=>r.id!==review.id
            );

            importantBtn.innerText =
            "☆ Mark Important";

        }else{

            const reviewToSave = { ...review, rating: ratingStars };
            importantReviews.push(reviewToSave);

            importantBtn.innerText =
            "★ Important";
        }

        localStorage.setItem(
            "importantReviews",
            JSON.stringify(importantReviews)
        );
    };
}

function closeModal(){

    document.getElementById("reviewModal")
    .style.display="none";
}

renderReviews(reviews);

document.querySelectorAll(".filter-btn")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        currentRating =
        btn.dataset.rating;

        filterReviews();

    });

});

document.querySelectorAll(".platform-btn")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        currentPlatform =
        btn.dataset.platform;

        filterReviews();

    });

});

document.querySelectorAll(".type-btn")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        currentType =
        btn.dataset.type;

        filterReviews();

    });

});