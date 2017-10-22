'use strict';
class HomeController {
  /*@ngInject*/
  constructor(DataService) {
    this.name = 'home';
      // DataService.getData().success(
      //     (data, status, headers, config) => {
      //       console.log('success', data);
      // }).
      // error( (data, status, headers, config) => {
      //     console.log('error', data);
      // });
  }
}

export default HomeController;
