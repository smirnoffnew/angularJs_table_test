import template from './monthData.html';

class MonthDataController {
    /*@ngInject*/
    constructor() {
        console.log('aaaaaaaaaaaaaaa', this.inputData);
    }
}

let monthDataComponent = {
    restrict: 'E',
    bindings: {
        inputData: '<?'
    },
    template,
    controller: MonthDataController
};

export default monthDataComponent;
