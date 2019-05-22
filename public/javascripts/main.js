// fetchAPI to fetch tags
const fetchAPI =(cb)=>{
    fetch('http://localhost:3000/api/v1/quiz').then(res => res.json()).then(data => {
        cb(data)
    })
} 

export default fetchAPI;