
export function testT (){
    if(localStorage.getItem("token").length <= 140){
        window.location.href = "/login"
      }
}