
const API_KEY = `f7a97cd3e5d84bf69e1ae769f155b88c`;
let newsList = [];
const menus = document.querySelectorAll(".menus button") //menus 안에 있는 버튼 
// 여러개를 한번에 가져오는 것 getElementById 이 아니라 query 를 씀 
// 이 menus 는 arr 타입이다 이 arr 안에있는 button 하나하나에 클릭이벤트를 줘야한다.

menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
// foreach 배열함수 
console.log("ggg", menus)

let url = new URL(
    `https://apissss.netlify.app/v2/top-headlines?country=kr&apiKey=${API_KEY}`)

let totalResults = 0
let page = 1
const pageSize = 10 // 페이지사이즈랑 그룹사이즈는 어차피 바꾸지않을거니까 const로 부여 
const groupSize = 5


const getNews = async() => {
    try {
        url.searchParams.set("page",page) //페이지라는 파라미터를 뒤에 붙여준다 그 값은  page 다  >> &page=page 로 볼 수 있음
        url.searchParams.set("pageSize",pageSize)  //url 호출하기전에 붙인후에 url 호출해야한다.
        const response = await fetch(url); //url에 페이지가 어딘지 &page 로 하나하나 값주면 힘드니 새롭게 url page함수 만들기
        const data = await response.json();
        console.log("ddd", data);
        if( response.status=== 200){
                if(data.articles.length===0){ //기사 길이가 0이니 아무것도 안 뜬 것 
                        throw new Error("No result for this search")
                }
            newsList = data.articles;
            totalResults = data.totalResults
            render();
            paginationRender(); //페이지는 뉴스 다 나오고나서 나와야하니까 여기에다 호출 
        } else {
            throw new Error(data.message);
        }
        
        //error 를 일으켜본다 ex) api키 입력 잘못하기 
        // console.log("rrr", response) 해서 error 코드 뭐나오는지확인 401 나옴
        // error 일때 data는 어떻게 나오는지 console.log("ddd", data) 해서 라이브 서버에서 메시지보기
        // your API key is invaild or incorrect 라고 뜬다/

        //만약 api가 이상해서 작동이 안된거라면 error 뜬게 맞다 근데 검색 아무렇게나해서 뉴스 결과가 
        // 없음을 나타낼땐 error 가뜬게 아니다. 그럴 때는 어떻게 해야할까?


    } catch(error){
        errorRender(error.message)
    }

}


// 사이드메뉴 만들기
const openNav =() => {
    document.getElementById("mySidenav").style.width = "250px"
}

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px"
}



const getLatestNews = async () => {
    url = new URL(
        `https://apissss.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
    
    );

    getNews()
    // 우리가 보여줄 건 뉴스리스트  뉴스리스트가 확정되어야지 랜더해야한다. 그래서 newsList 뒤에 랜더

    
}   


const getNewsByCategory= async (event)=>{
    // 유저가 무슨 카테고리를 눌렀는지 알기위해 만드는 것 밑에 줄 
    const category = event.target.textContent.toLowerCase(); //클릭이벤트시 카테고리를 소문자로 만들어줌 컴퓨터는 소문자 대문자 구별 꼭 해야해서 직접 바꾸기보단 클릭 후 바로 바뀌게 이 함수 쓴다. 
   
    url = new URL(`https://apissss.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    );

   getNews();

     //여기서 랜더는 위에 만들어준 뉴스리스트를 보여주는것 
    // 그래서 위에 카테고리 눌렀을 때 뉴스를 보여주려면 newslist를 새롭게 정의해야한다.

}

const getNewsByKeyword = async (event)=> {
    const keyword = document.getElementById("search-input").value;
    url = new URL (`https://apissss.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
    getNews();

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


//erroro 메시지 보여주는 render 
const errorRender = (errorMessage) => {
   const errorHTML =  `<div class="alert alert-danger" role="alert">
 ${errorMessage}
</div>`

    document.getElementById("news-board").innerHTML = errorHTML;
}





const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };
openSearchBox()




//페이지네이션만드는 함수
const paginationRender = () => {
    //totalresults
    //page
    //pageSize
    //groupsize
    //totalpages
    const totalPages = Math.ceil(totalResults/pageSize)
    //pagegroup
    const pageGroup = Math.ceil(page/groupSize); // Math.ceil 은 나머지 숫자 올림해주느 것

    //lastPage
    let lastPage = pageGroup * groupSize;
    //마지막 페이지 그룹이 그룹사이즈보다 작다? 4개 페이지만 보여줘야지. lastpage = totalpage
    //firstPage
    
    if(lastPage>totalPages){
        lastPage = totalPages;
    }
    let firstPage = lastPage-(groupSize-1) <=0 ? 1 : lastPage-(groupSize-1)  // <=0보다 작거느나 같으면 1로 출력 그게 아니면 그대로 출력 
        
    

    let paginationHTML=`<li class="page-item" onclick="moveToPage(${firstPage})"><a class="page-link" > << </a></li>
    `;
    
    paginationHTML+=`<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" > < </a></li>
    `;
    for(let i =firstPage; i<= lastPage; i++ ){
        paginationHTML+=`<li class="page-item ${
            i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }    //i가 내가 지금보고있는페이지다? 그럼 active로 표시 아니면 말고 "" 빈칸 
// 1부터 끝까지 page를 만드는거지 배열을 만드는것이 아니다 그래서 배열함수 못쓴다 for문을 써준다
    paginationHTML += `<li class="page-item" onclick=  "moveToPage(${page+1})"><a class="page-link" > > </a></li>`
    paginationHTML += `<li class="page-item" onclick="moveToPage(${lastPage})"><a class="page-link" > >> </a></li>
    `;
    
    document.querySelector(".pagination").innerHTML = paginationHTML;
    // <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //       <li class="page-item"><a class="page-link" href="#">1</a></li>
    //       <li class="page-item"><a class="page-link" href="#">2</a></li>
    //       <li class="page-item"><a class="page-link" href="#">3</a></li>
    //       <li class="page-item"><a class="page-link" href="#">Next</a></li>
    

}

const moveToPage=(pageNum) =>{
    // console.log("movetopage",pageNum) 몇 번째 페에지 클릭했는 지 확인하는 것 
    page=pageNum //위에서 페이지 1페이지로 let 해놨는데 여기선 이제 유동적으로 원하는 페이지를 로드해야함
    getNews();

   
    

}
getLatestNews();


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

