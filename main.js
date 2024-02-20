const API_KEY  = `f7a97cd3e5d84bf69e1ae769f155b88c`;
let news = []
const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
        const data = await response.json();
        news = data.articles;
        console.log("ddd",news);


}

getLatestNews ( ) ;


// <panding >이라고 뜸 아직 데이터가 안왔다는 뜻 
// URL을 인스턴스라고 부르는데 URL 관련 많은 작업들을 할 수 있다.
// 객체로 변환되어 링크, 쿼리, 앤드라인 ,사이즈 등을 볼 수 있다  
// https://developer.mozilla.org/en-US/docs/Web/API/URL URL 정보 

// async 비동기 함수를 만들 수 있다. 
// await 기다려줘 이 자료를 받을 때까지 기다려줘 뒤에꺼 실행하지말구 
// json 타입 객체처럼생김 객체형식으로 주고받기편해서 많이 쓰인다 