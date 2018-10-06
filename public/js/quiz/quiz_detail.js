let quiz_div = document.querySelector("#quiz")
let questions = document.querySelector("#questions")
let title = document.querySelector("#title")
let submit_btn = document.querySelector('#submit')
let quiz
let result=``

fetch('/quiz/list/').then(d => d.json()).then(d => {
    d = d.filter((item,i) => i==location.href.split('/').pop())[0]
    title.innerHTML = d.name
    
    fill_questions(d)
    quiz=d
})
var myTimer;
   function clock() {
     myTimer = setInterval(myClock, 1000);
     var c = 0;

     function myClock() {
       document.getElementById("demo").innerHTML = c++;
       if (c == -1) {
         clearInterval(myTimer);
         alert("Reached zero");
       }
     }
   }
   setTimeout( e=>{
    clock()
},500)
  
fill_questions= (d) => {
    console.log(JSON.stringify(d,null,2))
    d.questions.forEach((q,i)=> {
        questions.innerHTML+=`
            <h3>${i+1}. ${q.name}</h3>
            <div class=options>
                <input type=radio name=${i} class=c${i} value=${q.c1}>a)<span> ${q.c1}</span><br>
                <input type=radio name=${i} class=c${i} value=${q.c2}>b)<span> ${q.c2}</span><br>
                <input type=radio name=${i} class=c${i} value=${q.c3}>c)<span> ${q.c3}</span><br>
                <input type=radio name=${i} class=c${i} value=${q.c4}>d)<span> ${q.c4}</span><br>
            </div>
        `
    })
}

// submit action
submit_btn.addEventListener('click', e=>submit_action(e))

submit_action = (e) => {
    e.preventDefault()
    console.log('quiz ended')

    const len=quiz.questions.length
    correct = 0


    // calculate the correct questions
    for(let i=0;i<len;i++){
        var question = document.querySelectorAll(`.c${i}`)
        question.forEach(item => {
            if(item.checked){
                console.log('triggered')
                if(item.value==quiz.questions[i].ans){
                    correct += 1
                    result+=`
                    <div class='row'>
                        <div class='col-sm-1 bg-default'>${i+1}</div>
                        <div class='col-sm-5 bg-success'>${item.value}</div>
                        <div class='col-sm-5 bg-primary'>${quiz.questions[i].ans}</div>
                    </div>
                    `
                }else {
                    result+=`
                    <div class='row'>
                        <div class='col-sm-1 bg-default'>${i+1}</div>
                        <div class='col-sm-5 bg-danger'>${item.value}</div>
                        <div class='col-sm-5 bg-primary'>${quiz.questions[i].ans}</div>
                    </div>
                    `
                }
                console.log(item.value,quiz.questions[i].ans)
            }
        })
    }

    result+=`
        <h1 class='my-5 display-4 text-center bg-default'>
            score = ${correct}/${len}
        </h1>
    `
    quiz_div.innerHTML = result
}