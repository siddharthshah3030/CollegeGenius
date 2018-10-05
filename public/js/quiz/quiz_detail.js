let questions = document.querySelector("#questions")
let title = document.querySelector("#title")

fetch('/quiz/list/').then(d => d.json()).then(d => {
    d = d.filter((item,i) => i==location.href.split('/').pop())[0]
    title.innerHTML = d.name
    fill_questions(d)
})

fill_questions= (d) => {
    console.log(JSON.stringify(d,null,2))
    d.questions.forEach((q,i)=> {
        questions.innerHTML+=`
            <h3>${i+1}. ${q.name}</h3>
            <div class=options>
                <input type=radio name=${i}>a)<span> ${q.c1}</span><br>
                <input type=radio name=${i}>b)<span> ${q.c2}</span><br>
                <input type=radio name=${i}>c)<span> ${q.c3}</span><br>
                <input type=radio name=${i}>d)<span> ${q.c4}</span><br>
            </div>
        `
    })
}
