'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'kendo.directives'])
myApp.
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/home', {
  	templateUrl : "templates/home.html"
  })
  .when('/dateParser', {
  	templateUrl : "dateParser.html",
  	controller: "dateParserCtrl"
  }).when('/kendoHome', {
  	templateUrl : "templates/kendo/kendoHome.html",
  	controller: "kendoHomeCtrl"
  }).when('/datePicker', {
  	templateUrl : "templates/datePickerPop.html",
  	controller: "dateParserCtrl"
  }).when('/aggregate', {
    templateUrl : "templates/kendo/dataSource/aggregate.html",
    controller: "aggregateCtrl"
  }).when('/kendoFilter', {
    templateUrl : "templates/kendo/dataSource/filter.html",
    controller: "filterCtrl"
  }).when('/kendoPagination', {
    templateUrl : "templates/kendo/dataSource/pagination.html",
    controller: "paginationCtrl"
  }).when('/kendoQuery', {
    templateUrl : "templates/kendo/dataSource/query.html",
    controller: "queryCtrl"
  }).when('/kendoObservable', {
    templateUrl : "templates/kendo/observable/observable.html",
    controller: "observableCtrl"
  }).when('/kendoLayout', {
    templateUrl : "templates/kendo/layout/layout.html",
    controller: "layoutCtrl"
  }).when('/kendoValidator', {
    templateUrl : "templates/kendo/validator/validator.html",
    controller: "validatorCtrl"
  }).when('/kendoDialog', {
    templateUrl : "templates/kendo/dialog/dialog.html",
    controller: "dialogCtrl"
  }).when('/kendoNotification', {
    templateUrl : "templates/kendo/notification/notification.html",
    controller: "notificationCtrl"
  }).when('/kendoListview', {
    templateUrl : "templates/kendo/listView/listView.html",
    controller: "listViewCtrl"
  }).when('/kendoPdfExport', {
    templateUrl : "templates/kendo/pdfExport/pdfExport.html",
    controller: "pdfExportCtrl"
  }).when('/kendoPdfExportPlain', {
    templateUrl : "templates/kendo/pdfExport/pdfExportPlain.html",
    controller: "pdfExportPlainCtrl"
  }).when('/kendoMasked', {
    templateUrl : "templates/kendo/Masked/Masked.html",
    controller: "MaskedCtrl"
  }).when('/kendoTouchEvent', {
    templateUrl : "templates/kendo/touchEvent/touchEvent.html",
    controller: "touchEventCtrl"
  }).when('/kendoWindow', {
    templateUrl : "templates/kendo/window/window.html",
    controller: "windowCtrl"
  }).when('/kendoPieChart', {
    templateUrl : "templates/kendo/pieChart/pieChart.html",
    controller: "pieChartCtrl"
  });
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
