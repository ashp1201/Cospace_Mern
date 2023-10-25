//image onto base 64*/
function convertToBase64(file){
    return new Promise((resolve,reject) => {
        const fileReader =new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload=()=>{
            resolve(fileReader.result.replace("data:", "")
            .replace(/^.+,/, ""))
        }

        fileReader.onerror =(error)=>{
            reject(error)
        }
    })

}

export default convertToBase64;