import quotes from "../assets/quotes.json"

export const randomQuotegenerator=()=>{
let x=Math.floor(Math.random()*95)
return quotes[x]
}