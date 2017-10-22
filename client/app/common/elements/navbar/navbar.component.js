import template from './navbar.html';
import './navbar.scss';

class NavbarController {
    /*@ngInject*/
    constructor() {
        this.title = 'Super table application';
    }
}

let navbarComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller: NavbarController
};

export default navbarComponent;
