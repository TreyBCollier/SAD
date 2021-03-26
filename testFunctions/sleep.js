import AsyncStorage from '@react-native-async-storage/async-storage';


const sleep = function(ms){
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}






export default sleep;





