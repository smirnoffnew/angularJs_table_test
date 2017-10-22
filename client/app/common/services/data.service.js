/**
 * Created by smirnoff on 22.10.17.
 */
export default class DataService {
    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        this.apiKey = '2Fb1P3cHghMMXYx45QOqZ6zy7bfkE6jkQCVKY5AVlDTWtdZKaYq0hWeQmldSng';
    }

    getData() {
        return this.$http({
            url: '77.93.34.166:8088/api/demoReport',
            method: "GET",
            params: {apiKey: this.apiKey}
        });
    }

}
