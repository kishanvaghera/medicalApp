export async function RequiredFieldCommon(requiredList,setRequired,stateVal) {
    let tempData=requiredList;
    const filterCheckData=await Object.keys(requiredList).filter((curKey,index)=>{
        let checkData=1;
        if(stateVal[curKey]){
            if(typeof stateVal[curKey] == "object"){
                if(stateVal[curKey]['value']){
                    if(stateVal[curKey]['value']>0){
                        tempData[curKey]={status:true}
                        checkData=1;
                    }else{
                        tempData[curKey]={status:false}
                        checkData=0;
                    }
                }else{
                    tempData[curKey]={status:true}
                    checkData=1;
                }
            }else if(stateVal[curKey]==0 || stateVal[curKey]==""){
                tempData[curKey]={status:false}
                checkData=0;
            }else{
                tempData[curKey]={status:true}
                checkData=1;
            }
        }
        return checkData===0;
    })
    
    setRequired(tempData);

    return filterCheckData.length==0
}
