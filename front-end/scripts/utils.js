export function hasUserToken(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        return false;
    } else {
        return true;
    }
}