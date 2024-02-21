const API_KEY = `f7a97cd3e5d84bf69e1ae769f155b88c`;
let newsList = [];
const getLatestNews = async () => {
    const url = new URL(
        ` https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render ();
    // 우리가 보여줄 건 뉴스리스트  뉴스리스트가 확정되어야지 랜더해야한다. 그래서 newsList 뒤에 랜더
    
    console.log("ddd", newsList);


}

const render = () => {
    const newsHTML = newsList.map(
        (news) => ` <div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size"
            src=${news.urlToImage}/>
    </div>
    <div class="col-lg-8">
        <h2> ${news.title} </h2>
        <p>
            ${news.description}
        </p>
        <div>
           ${news.source.name} * ${news.publishedAt} 
        </div>s
    </div>
</div>`
    );

//     // const render()=> { const newsHTML =`
//     //  newsHTML = newList.map(news=>` <div class="row news">
//     <div class="col-lg-4">
//         <img class="news-img-size"
//             src=${news.urlToImage}/>
//     </div>
//     <div class="col-lg-8">
//         <h2> ${news.title} </h2>
//         <p>
//             ${news.description}
//         </p>
//         <div>
//            ${news.source.name} * ${news.publishedAt} 
//         </div>s
//     </div>
// </div>`)`
    // document.getElementById("news-board").innerHTML = newsHTML
    // }

    
    // es6 문법 map 하나씩 들고와서 진행해주는 것 


    document.getElementById("news-board").innerHTML = newsHTML
};






const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline"
    };
};



// none 과 inline 바뀌도 ok 
//  근데 홈페이지랑 다르게 새로고침하면 검색창이 떠있는게 기본값...
// getLatestNews ( ) ;

// let PushGlassButton = document.getElementById("glass-button")

// PushGlassButton.addEventListener("click",addSearchLine)

// function addSearchLine () {

// }
// 이렇기 하지말고 간단하게 hrml 에 버튼에 onclick 주기 
// <panding >이라고 뜸 아직 데이터가 안왔다는 뜻 
// URL을 인스턴스라고 부르는데 URL 관련 많은 작업들을 할 수 있다.
// 객체로 변환되어 링크, 쿼리, 앤드라인 ,사이즈 등을 볼 수 있다  
// https://developer.mozilla.org/en-US/docs/Web/API/URL URL 정보 

// async 비동기 함수를 만들 수 있다. 
// await 기다려줘 이 자료를 받을 때까지 기다려줘 뒤에꺼 실행하지말구 
// json 타입 객체처럼생김 객체형식으로 주고받기편해서 많이 쓰인다 