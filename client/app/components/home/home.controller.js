'use strict';
class HomeController {
  /*@ngInject*/
  constructor(DataService) {
    this.name = 'home';
    this.dataObject = {};
    this.tableIterableobject = [];


      DataService.getData()
        .then(
          (response, status, headers, config) => {

              this.dataObject = response.data;
              console.log('success', this.dataObject);
              console.log('success', this.getClientsRow(this.dataObject) );
          },
          (data, status, headers, config) => {
              console.log('error', data);
          }
      );

  }

  getClientsRow(dataObject){ debugger;
      return dataObject.hasOwnProperty('records') ? dataObject.records.map( (item) => item.clientId ) : false;
  }
}

export default HomeController;
