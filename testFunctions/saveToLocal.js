import AsyncStorage from '@react-native-async-storage/async-storage';


const sleep = function(ms){
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}


const  saveData = async function(data, ticker){
    var fileName = '../files/'+ticker+'_test.txt'

    try {
        
        const jsonValueTable = JSON.stringify(data)
        await AsyncStorage.setItem('./AAPL_test.txt', data)
    } 
    catch (e) {
    }
}



export default saveData;





