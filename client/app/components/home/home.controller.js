'use strict';
class HomeController {
  /*@ngInject*/
  constructor(DataService) {
    this.name = 'home';
      DataService.getData()
        .then(
          (data, status, headers, config) => {
            console.log('success', data);
          },
          (data, status, headers, config) => {
              console.log('error', data);
          }
      );
  }
}

export default HomeController;
