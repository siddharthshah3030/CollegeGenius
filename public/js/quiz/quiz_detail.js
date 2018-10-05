let quizes = document.querySelector("#quiz")

fetch('/quiz/list/').then(d => d.json()).then(d => {
    q = q.filter((item,i) => i==location.href.split('/').pop())
    fill_questions(d)
})

fill_questions= (d) => {

}
