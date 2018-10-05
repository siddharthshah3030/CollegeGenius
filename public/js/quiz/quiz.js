let quizes = document.querySelector("#quiz")

fetch('/quiz/list/').then(d => d.json()).then(d => fill_questions(d))

fill_questions = (d) => {
    console.log(d)
    
    d.forEach((item,i)=>{
        quizes.innerHTML+=`
            <div class="quiz bg-light border border-dark">
                <h3><a href=/quiz/${i}>${item.name}</a></h3>
                <p>
                <span class='branch badge'>${item.Sem}</span>
                    <span class='semester badge'>${item.Branch}</span>
                </p>
                <hr>
            </div>
        `
    })
}