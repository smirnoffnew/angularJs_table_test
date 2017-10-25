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
                this.generateIterableObject( this.dataObject  );
                this.setRowspan(this.tableIterableobject);
            },
            
            (data) => {
                console.log('error', data);
            }
        );
    
    }


    generateIterableObject(inputData) {
    
        inputData.records.forEach( (clientsData ) => {
            this.tableIterableobject.push({type:'client', value:clientsData.clientId, rowspan:false});
    
            clientsData.creditCards.forEach( (creditCardData) => {
                this.tableIterableobject.push({type:'creditCard', value:creditCardData.id, rowspan:false});

                    for (let monthDataProp in creditCardData.monthsData) {
                        this.tableIterableobject.push({type:'month', value:this.monthDateFormatter(monthDataProp), rowspan:false});

                        creditCardData.monthsData[monthDataProp].rows.forEach( (rowData)=>{
                            let rows = [];
                            rows.push({type:'row', value:this.timeFormatter(rowData.timeStamp), rowspan:1});
                            rows.push({type:'row', value:rowData.type, rowspan:1});
                            rows.push({type:'row', value:rowData.amount, rowspan:1});
                            this.tableIterableobject.push({type:'row', value:rows, rowspan:1});
                         });
                    }
            });
        });
    }

    timeFormatter(date){
        return new Date(  Date.parse(date)  ).toUTCString().toString();
    }

    monthDateFormatter(month) {
        switch (month) {
            case '1':
                return 'January';
                break;
            case '2':
                return 'February';
                break;
            case '3':
                return 'March';
                break;
            case '4':
                return 'April';
                break;
            case '5':
                return 'May';
                break;
            case '6':
                return 'June';
                break;
            case '7':
                return 'July';
                break;
            case '8':
                return 'August';
                break;
            case '9':
                return 'September';
                break;
            case '10':
                return 'October';
                break;
            case '11':
                return 'November';
                break;
            case '12':
                return 'December';
                break;
            default:
                return 'unknownMonthFormat'
        }
    }


    setRowspan(inputData){
        let clientCounter, creditCardCounter, monthCounter = 0;
        let indexClient, indexCreditCard, indexMonth = false;

        inputData.forEach( (item, index, array) => {
            clientCounter++;
            creditCardCounter++;
            monthCounter++;

            if (item.type === 'month') {
                this.saveData(indexMonth, monthCounter-1);
                indexMonth = index;
                monthCounter = 1;
            }

            if (item.type === 'creditCard') {
                this.saveData(indexMonth, monthCounter-1);
                this.saveData(indexCreditCard, creditCardCounter-1);
                indexCreditCard = index;
                creditCardCounter = 1;
            }

            if (item.type === 'client') {
                this.saveData(indexMonth, monthCounter-1);
                this.saveData(indexCreditCard, creditCardCounter-1);
                this.saveData(indexClient, clientCounter-1);
                indexClient = index;
                clientCounter = 1;
            }

            //if its last element
            if ( index + 1 === array.length ){
                this.saveData(indexClient, clientCounter);
                this.saveData(indexCreditCard, creditCardCounter);
                this.saveData(indexMonth, monthCounter);
            }

        });

    }


    saveData(index, rowspan){
        typeof index === 'number' ?  this.tableIterableobject[index].rowspan = rowspan : false;
    }
}

export default HomeController;
