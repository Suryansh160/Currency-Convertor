const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const drpdwn = document.querySelectorAll(".drpdwn");
const btn=document.querySelector(".convert-button");
const fromCurr=document.querySelector(".from");
const toCurr=document.querySelector(".to");
const msg=document.querySelector(".hah input");

for(slct of drpdwn){
    for ( code in countryList){
        let newOpt=document.createElement("option");
        newOpt.innerText=code;
        newOpt.value=code;
        if(slct.name==="from"&&code==="USD"){
            newOpt.selected="selected";
        }
       else if(slct.name==="to"&&code==="INR"){
            newOpt.selected="selected";
        }
        slct.append(newOpt);
    }

    slct.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let curCode=element.value;
    let countCode=countryList[curCode];
    let newSrc = `https://flagsapi.com/${countCode}/flat/64.png`;
 let img =   element.parentElement.querySelector("img");
 img.src=newSrc;

}


btn.addEventListener("click",async (evt)=>{
evt.preventDefault();
let amt=document.querySelector(".currency-row input");
let amtVal=amt.value;
if(amtVal===""||amtVal<=0)
{
    amtVal=1;
    amt.value=1;
}

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response= await fetch(URL);
let data=await response.json();
let rate = toCurr.value.toLowerCase();
let rt=data[fromCurr.value.toLowerCase()][rate]
let finalAmt=rt*amtVal;
msg.placeholder = `${finalAmt}`;
console.log(finalAmt);
});