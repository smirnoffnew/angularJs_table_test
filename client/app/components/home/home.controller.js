'use strict';
class HomeController {
    /*@ngInject*/
    constructor(DataService) {
        this.name = 'home';
        this.dataObject = {};
        this.tableIterableobject = [];
        this.keys=[];
        
        DataService.getData()
        .then(
            (response) => {
                this.dataObject = response.data;
                this.generateIterableObject( this.dataObject  );
                this.getKeys( this.dataObject );
                this.setRowspan(this.tableIterableobject);
            },
            
            (data) => {
                console.log('error', data);
            }
        );
    
    }

    getKeys(data){
        this.keys.push( Object.keys(data.records[0])[0]  );
        this.keys.push( Object.keys(data.records[0][Object.keys(data.records[0])[1]][0])[0]  );
        this.keys.push( Object.keys(data.records[0][Object.keys(data.records[0])[1]][0])[1]   );
    }


    generateIterableObject(inputData) {

        inputData[ Object.keys(inputData)[0] ].forEach( (clientsData ) => {
            this.tableIterableobject.push({type:Object.keys(clientsData)[0], value:clientsData[Object.keys(clientsData)[0]] , rowspan:false});

            clientsData[Object.keys(clientsData)[1]].forEach( (creditCardData) => {
                this.tableIterableobject.push({type:Object.keys(creditCardData)[0], value:creditCardData[Object.keys(creditCardData)[0] ], rowspan:false});

                    for (let monthDataProp in creditCardData[Object.keys(creditCardData)[1]]) {
                        this.tableIterableobject.push({type:Object.keys(creditCardData)[1], value:HomeController.monthDateFormatter(monthDataProp), rowspan:false});

                        creditCardData[Object.keys(creditCardData)[1]][monthDataProp].rows.forEach( (rowData)=>{
                            let rows = [];
                            rows.push({type:'row', value:HomeController.timeFormatter(rowData.timeStamp), rowspan:1});
                            rows.push({type:'row', value:rowData.type, rowspan:1});
                            rows.push({type:'row', value:rowData.amount, rowspan:1});
                            this.tableIterableobject.push({type:'row', value:rows, rowspan:1});
                         });
                    }
            });
        });
    }

    setRowspan(inputData){
        let clientCounter, creditCardCounter, monthCounter = 0;
        let indexClient, indexCreditCard, indexMonth = false;

        inputData.forEach( (item, index, array) => {
            clientCounter++;
            creditCardCounter++;
            monthCounter++;

            // monthsData
            if (item.type === this.keys[2]) {
                this.saveData(indexMonth, monthCounter-1);
                indexMonth = index;
                monthCounter = 1;
            }

            // id
            if (item.type === this.keys[1]) {
                this.saveData(indexMonth, monthCounter-1);
                this.saveData(indexCreditCard, creditCardCounter-1);
                indexCreditCard = index;
                creditCardCounter = 1;
            }

            // clientId
            if (item.type === this.keys[0]) {
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


    static timeFormatter(date){
        return new Date(  Date.parse(date)  ).toUTCString().toString();
    }


    static monthDateFormatter(month) {
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
}

export default HomeController;
