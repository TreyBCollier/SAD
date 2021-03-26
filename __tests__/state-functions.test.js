
import fetchPrice  from "../testFunctions/getPrice";
import saveData  from "../testFunctions/saveToLocal";
import readData  from "../testFunctions/readFromLocal";
import sleep from "../testFunctions/sleep"



test("fetchPrice returns a number greater than 0", async () => {
    var ticker =  "AAPL";
    var finPrice = await fetchPrice(ticker);

    
    expect(finPrice).toBeGreaterThan(0 | 0)

  });

//   test("data is saved and read from local storage", async () => {
//     var data =  "test data";
//     var ticker = "AAPL"
//     saveData(data, ticker)
//     sleep(750)
//     const localData = await readData(ticker)
//     // console.log(localData)
//     expect(localData).toEqual(data)

//   });
  