

const sleep = function(ms){
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}


const  fetchPrice = async function(ticker){
    var price = 0;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    var url = "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark?symbols=" + ticker + "&range=2y&interval=1d"
    xhr.open('get', url, true);
    xhr.setRequestHeader("x-rapidapi-key", "de60c04d78msh37566ebd95793e5p1ae017jsnd330a739399f");
    xhr.setRequestHeader("x-rapidapi-host", "yahoo-finance-low-latency.p.rapidapi.com");
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState == 4) {
          var result = JSON.parse(this.responseText);
          var tempArray = result[ticker]['close'];
          price = tempArray[tempArray.length-1]
        
        }
    });
    await sleep(750)
    return price;
}



export default fetchPrice;





