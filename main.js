const API_KEY = `f7a97cd3e5d84bf69e1ae769f155b88c`;
let newsList = [];
const menus = document.querySelectorAll(".menus button") //menus 안에 있는 버튼 
// 여러개를 한번에 가져오는 것 getElementById 이 아니라 query 를 씀 
// 이 menus 는 arr 타입이다 이 arr 안에있는 button 하나하나에 클릭이벤트를 줘야한다.

menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
// foreach 배열함수 
console.log("ggg", menus)

// 사이드메뉴 만들기
const openNav =() => {
    document.getElementById("mySidenav").style.width = "250px"
}

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px"
}



const getLatestNews = async () => {
    const url = new URL(
        ` https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render ();
    // 우리가 보여줄 건 뉴스리스트  뉴스리스트가 확정되어야지 랜더해야한다. 그래서 newsList 뒤에 랜더
    
    console.log("ddd", newsList);
    
}   
getLatestNews();

const getNewsByCategory= async (event)=>{
    // 유저가 무슨 카테고리를 눌렀는지 알기위해 만드는 것 밑에 줄 
    const category = event.target.textContent.toLowerCase(); //클릭이벤트시 카테고리를 소문자로 만들어줌 컴퓨터는 소문자 대문자 구별 꼭 해야해서 직접 바꾸기보단 클릭 후 바로 바뀌게 이 함수 쓴다. 
    console.log("category",category);
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    );
    const response = await fetch(url)
    const data = await response.json()
    console.log("Data", data)
    newsList = data.articles;

    render() ; //여기서 랜더는 위에 만들어준 뉴스리스트를 보여주는것 
    // 그래서 위에 카테고리 눌렀을 때 뉴스를 보여주려면 newslist를 새롭게 정의해야한다.

}

const getNewsByKeyword = async (event)=> {
    const keyword = document.getElementById("search-input").value;
    console.log("key word", keyword)
    const url = new URL (`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles

    render();
}




// 첫번째로 할 일 여기서 발전
// const getNewsByKeyword = ()=> {
//     const keyword = document.getElementById("search-input").value;
//     console.log("key word", keyword)
// }




const render = () => {
    const newsHTML = newsList
    .map(
        (news) => ` <div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size"
            src="${news.urlToImage}"/>
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
    ).join("");
    // join("") 그러면 arr 문자열에 포함된 " "를 빼준다 
        console.log("html",newsHTML)


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
      inputArea.style.display = "inline";
    }
  };
openSearchBox()


// none 과 inline 바뀌도 ok 
//  근데 홈페이지랑 다르게 새로고침하면 검색창이 떠있는게 기본값...
// getLatestNews ( ) ;

// let PushGlassButton = document.getElementById("glass-button")

// PushGlassButton.addEventListener("click",addSearchLine)

// function addSearchLine () {

// }
// 이렇기 하지말고 간단하게 html 에 버튼에 onclick 주기 
// <panding >이라고 뜸 아직 데이터가 안왔다는 뜻 
// URL을 인스턴스라고 부르는데 URL 관련 많은 작업들을 할 수 있다.
// 객체로 변환되어 링크, 쿼리, 앤드라인 ,사이즈 등을 볼 수 있다  
// https://developer.mozilla.org/en-US/docs/Web/API/URL URL 정보 

// async 비동기 함수를 만들 수 있다. 
// await 기다려줘 이 자료를 받을 때까지 기다려줘 뒤에꺼 실행하지말구 
// json 타입 객체처럼생김 객체형식으로 주고받기편해서 많이 쓰인다 


//1. 버튼들에 클릭이벤트 주기 
// 2. 카테고리별 뉴스 가져오기 
// 3. 그 뉴스를 보여주기

