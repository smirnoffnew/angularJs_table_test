import angular from 'angular';
import NavBarComponent from './elements/navbar/navbar.component';
import MonthDataComponent from './elements/monthData/monthData.component';
import DataService from './services/data.service';

let commonModule = angular.module('app.common', [])
.service('DataService', DataService)

.component('navbar', NavBarComponent)
.component('monthDataComponent', MonthDataComponent)

.name;

export default commonModule;
