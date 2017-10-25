'use strict';
class HomeController {
  /*@ngInject*/
  constructor(DataService) {
    this.name = 'home';
    this.dataObject = {};

    this.tableIterableobject = [];

      DataService.getData()
        .then(
          (response) => {
              this.dataObject = response.data;
              this.iter( this.dataObject  );
          },

          (data) => {
              console.log('error', data);
          }
      );

  }

    saveData(index, rowspan){
        typeof index === 'number' ?  this.tableIterableobject[index].rowspan = rowspan : false;
        return false;
    }


    iter(inputData) {

        inputData.records.forEach( (clientsIter)=>{
            this.tableIterableobject.push({type:'client', value:clientsIter.clientId, rowspan:false});

            clientsIter.creditCards.forEach( (creditCardIter)=>{
                this.tableIterableobject.push({type:'creditCard', value:creditCardIter.id, rowspan:false});

                    for (var monthIterProp in creditCardIter.monthsData) {
                        this.tableIterableobject.push({type:'month', value:monthIterProp, rowspan:false});


                        creditCardIter.monthsData[monthIterProp].rows.forEach( (rowIter)=>{
                            var rows = [];
                            rows.push({type:'row', value:rowIter.timeStamp, rowspan:1});
                            rows.push({type:'row', value:rowIter.type, rowspan:1});
                            rows.push({type:'row', value:rowIter.amount, rowspan:1});
                            this.tableIterableobject.push({type:'row', value:rows, rowspan:1});
                         });


                    };
            });
        });

        this.setRowspan(this.tableIterableobject);

    }



  setRowspan(inputData){

      var _this = this;

      var clientCounter = 0;
      var indexClient = false;

      var creditCardCounter = 0;
      var indexCreditCard = false;

      var monthCounter = 0;
      var indexMonth = false;

      inputData.forEach(function callback(item, index, array) {
          clientCounter++;
          creditCardCounter++;
          monthCounter++;

          if (item.type === 'month') {
              _this.saveData(indexMonth, monthCounter-1);

              indexMonth = index;
              monthCounter = 1;
          }


          if (item.type === 'creditCard') {
              _this.saveData(indexMonth, monthCounter-1);
              _this.saveData(indexCreditCard, creditCardCounter-1);

              indexCreditCard = index;
              creditCardCounter = 1;
          }


          if (item.type === 'client') {

              _this.saveData(indexMonth, monthCounter-1);
              _this.saveData(indexCreditCard, creditCardCounter-1);
              _this.saveData(indexClient, clientCounter-1);

              indexClient = index;
              clientCounter = 1;
          }

          //if its last element
          if ( index + 1 === array.length ){
              _this.saveData(indexClient, clientCounter);
              _this.saveData(indexCreditCard, creditCardCounter);
              _this.saveData(indexMonth, monthCounter);
          }

      });


      console.log(' this.tableIterableobject', this.tableIterableobject);
  }
}

export default HomeController;
