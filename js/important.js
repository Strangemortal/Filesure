const importantReviews =
JSON.parse(
localStorage.getItem(
"importantReviews"
)
) || [];

const container =
document.getElementById(
"importantContainer"
);

if(!importantReviews.length){

container.innerHTML=`
<div class="text-center p-[100px] text-slate-300">
<h2 class="text-2xl font-bold tracking-tight text-slate-400">No Important Reviews</h2>
</div>
`;

}

importantReviews.forEach(review=>{

const card=document.createElement("div");

card.className="p-[15px] bg-white/5 mt-[15px] rounded-[15px] border border-white/8 cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-350 ease-in-out hover:-translate-y-[6px] hover:shadow-[0_16px_30px_rgba(2,6,23,0.22)] hover:bg-white/7 backdrop-blur-[16px]";

card.innerHTML=`

<h3 class="font-semibold text-lg text-slate-50">${review.ecommerce}</h3>

<p class="text-slate-300 mt-1">${review.review}</p>

<small class="text-slate-400 block mt-2 font-medium">${review.name}</small>

`;

card.onclick=()=>{

document.getElementById(
"reviewModal"
).style.display="flex";

document.getElementById(
"modalEcommerce"
).innerText=review.ecommerce;

document.getElementById(
"modalName"
).innerText=review.name;

document.getElementById(
"modalDate"
).innerText=review.date;

document.getElementById(
"modalId"
).innerText=review.id;

const ratingStars = typeof review.rating === 'number' ? "★".repeat(review.rating) + "☆".repeat(5 - review.rating) : review.rating;
document.getElementById(
"modalRating"
).innerText=ratingStars;

document.getElementById(
"modalReview"
).innerText=review.review;

};

container.appendChild(card);

});

function closeModal(){

document.getElementById(
"reviewModal"
).style.display="none";

}