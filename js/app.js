const reviews = [

{
    id:"REV001",
    ecommerce:"Amazon",
    name:"John Smith",
    date:"12 Mar 2025",
    rating:"★★★★★",
    review:"Amazing quality and super fast delivery."
},

{
    id:"REV002",
    ecommerce:"Flipkart",
    name:"Sarah",
    date:"15 Mar 2025",
    rating:"★☆☆☆☆",
    review:"Product stopped working after two days."
},

{
    id:"REV003",
    ecommerce:"Myntra",
    name:"Mike",
    date:"18 Mar 2025",
    rating:"★★★★★",
    review:"Packaging and quality both excellent."
}

];
function filterPlatform(platform){

const list =
document.getElementById(
"platformReviewList"
);

list.innerHTML="";

const filtered=
reviews.filter(
r=>r.ecommerce===platform
);

    filtered.forEach(review=>{

        const card=document.createElement("div");

        card.className="p-[15px] bg-white/5 mt-[15px] rounded-[15px] border border-white/8 cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-350 ease-in-out hover:-translate-y-[6px] hover:shadow-[0_16px_30px_rgba(2,6,23,0.22)] hover:bg-white/7 backdrop-blur-[16px]";

        card.innerHTML=`
            <strong class="font-semibold text-slate-50">${review.name}</strong>
            <p class="text-slate-300 mt-1">${review.review}</p>
        `;

        card.onclick=()=>openModal(review);

        list.appendChild(card);

    });

}

let sliderIndex = 0;

const sliderText =
document.getElementById("slider-review");

setInterval(()=>{

    sliderText.style.opacity = 0;

    setTimeout(()=>{

        sliderIndex++;

        sliderIndex %= reviews.length;

        sliderText.innerText =
        reviews[sliderIndex].review;

        sliderText.style.opacity = 1;

    },500);

},4000);

const positiveContainer =
document.getElementById("positiveReviews");

const negativeContainer =
document.getElementById("negativeReviews");

reviews.forEach(review=>{

    const card = document.createElement("div");

    card.className = "p-[15px] bg-white/5 mt-[15px] rounded-[15px] border border-white/8 cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-350 ease-in-out hover:-translate-y-[6px] hover:shadow-[0_16px_30px_rgba(2,6,23,0.22)] hover:bg-white/7 backdrop-blur-[16px]";

    if(review.rating.includes("★★★★★"))
        card.className += " border-l-[5px] border-l-green-500";
    else
        card.className += " border-l-[5px] border-l-red-500";

    card.innerHTML = `
        <strong class="font-semibold text-slate-50">${review.name}</strong>
        <p class="text-slate-300 mt-1">${review.review}</p>
    `;

    card.onclick = ()=>openModal(review);

    if(review.rating.includes("★★★★★"))
        positiveContainer.appendChild(card);
    else
        negativeContainer.appendChild(card);

});

function openModal(review){

    document.getElementById("reviewModal")
    .style.display="flex";

    document.getElementById("modalEcommerce")
    .innerText = review.ecommerce;

    document.getElementById("modalName")
    .innerText = review.name;

    document.getElementById("modalDate")
    .innerText = review.date;

    document.getElementById("modalId")
    .innerText = "_id : " + review.id;

    document.getElementById("modalRating")
    .innerText = review.rating;

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

            importantReviews.push(review);

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