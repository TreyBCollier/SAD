import AsyncStorage from '@react-native-async-storage/async-storage';

const sleep = function(ms){
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}


const readData = async function(ticker){
    
    

   
    try {
        const value = await AsyncStorage.getItem('./AAPL_test.txt')
        if(value == null) {
        //   var data = await JSON.parse(value)
        return 3

        }
        return value
    } 
    catch(e) {
        return 4
    }
    await sleep(750)
    return "test fail"
}



export default readData;





