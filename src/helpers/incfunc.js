export const addZero = (val) =>{
   return val < 10 ? `0${val}` : `${val}`
}

export const converDate = (d) =>{
   let date = new Date(d)
   return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/ ${date.getFullYear()}`
}