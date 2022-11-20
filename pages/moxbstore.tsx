import { makeAutoObservable } from "mobx";
class moxbStore {
  data:any = []
  poolData:any = []
  constructor() {
    makeAutoObservable(this)
  }
  addAsset(row){
    this.data.push(row[0]);
  }
  updateAsset(id){
    let newArr:any = [];
    this.data.forEach((v:any) => {
      let obj:any = {};
      obj = v;
      if(v.id===id){
        obj.token1.name = "newname";
        obj.apr = "100";
        obj.myBoundedAmount = "0";
        obj.poolLiquidity = "0";
        obj.myLiquidity = "0"
      }
      newArr.push(obj);
    });
    
    this.data = newArr;
  }
  removeAsset(id) {
    let newData = this.data.filter(
      (v:any) => v.id != id
    );
    this.data = newData;
  }
  initData(data) {
    this.data = [...data];
  }
  addPool(data){
    this.poolData = [...data];
  }
}

export default moxbStore