myApp.controller('dateParserCtrl', function($scope){
	$scope.format = 'yyyy/MM/dd';
  	$scope.date = new Date();
});



myApp.controller('datePickerPopCtrl', function($scope){
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});

myApp.controller('kendoHomeCtrl', function($scope){
	$scope.menuOrientation = "Vertical";
	$scope.change = function() {
		console.log($scope.menuOrientation, $scope.width, $scope.height)
	}
	$scope.width = 0;
	$scope.height = 0;
	console.log($scope.menuOrientation, $scope.width, $scope.height);

	$scope.getType = function(x) {
		return typeof  x;
	}
}); 


myApp.controller('aggregateCtrl', function($scope) {
    /*$scope.gridData = [ { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }];*/
        $scope.gridData = {
          dataSource: new kendo.data.DataSource({
            data: [ { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }],
            aggregate: [
              {field: 'age', aggregate: 'sum'},
              {field: 'age', aggregate: 'min'},
              {field: 'age', aggregate: 'max'}
            ]

          }),
          
        }
         $scope.gridData.dataSource.fetch(function(){
            $scope.result = $scope.gridData.dataSource.aggregates().age;
            $scope.showAggregateSum =  $scope.result.sum;
            $scope.showAggregateMin =  $scope.result.min;
            $scope.showAggregateMax =  $scope.result.max;
            $scope.$apply();
          })
});


myApp.controller('filterCtrl', function($scope) {
      $scope.gridData = {
        sortable: true,
        dataSource: new kendo.data.DataSource({
          data: [ { name: "Jane Doe", age: 30 },
                  { name: "John Doe", age: 33 },
                  { name: "marry Doe", age: 35 },
                  { name: "komDoe", age: 34 },
                  { name: "with bansal", age: 38 },
                  { name: "akhsy Doe", age: 35 }
                ]

        }),
        
      }
        $scope.gridFilterData = {
          dataSource: new kendo.data.DataSource({
            data: [ { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 },
              { name: "marry kom", age: 35 },
              { name: "kom Doe", age: 34 },
              { name: "with bansal", age: 38 },
              { name: "akhsy Doe", age: 35 }],
            filter: {field: 'name', operator: 'endsWith', value: 'Doe'}

          }),
        }
        $scope.gridFilterData.dataSource.fetch(function(){
            $scope.view = $scope.gridFilterData.dataSource.view();
            $scope.filterData = $scope.view[0].name;
            $scope.$apply();
        });
});

myApp.controller('paginationCtrl', function($scope) {
  $scope.gridData = {
    sortable: true,
    pageable: {
       refresh: true,
       pageSizes: true,
       buttonCount: 5
   },
        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                },
            },
            pageSize: 5,
            //page: 2 // set the second page as the current page
        }),
        
  }
  

});


myApp.controller('queryCtrl', function($scope) {
    $scope.gridData = {
      dataSource: new kendo.data.DataSource({
          data: [{ name: "Pork", category: "Food", subcategory: "Meat" },
                { name: "Pepper", category: "Food", subcategory: "Vegetables" },
                { name: "Beef", category: "Food", subcategory: "Meat" }]
      }),      
    }

    $scope.gridData.dataSource.fetch(function(){
      $scope.data = $scope.gridData.dataSource.data();
      console.log($scope.data)
    });
    console.log($scope.gridData.dataSource._data)
    var query = kendo.data.Query.process($scope.gridData.dataSource._data, {
          filter: {
              field: "subcategory",
              value: "Meat",
              operator: "eq"
            }
        });

    $scope.queryResult = query.data;

});


myApp.controller('observableCtrl', function($scope) {
    $scope.numberOfCalls = 0;
    var obj = new kendo.Observable();
    obj.bind("myevent", function(e) {
        $scope.numberOfCalls++
    });
    $scope.clickMe = function() {
        obj.trigger("myevent"); // causes the handler to be executed    
    }
    

});


myApp.controller('layoutCtrl', function($scope) {

    var view = new kendo.View("<span>Foo</span>");

    var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

    layout.render($("#app"));

    layout.showIn("#content", view);

});


myApp.controller('validatorCtrl', function($scope) {
        $scope.data = [
            "12 Angry Men",
            "Il buono, il brutto, il cattivo.",
            "Inception",
            "One Flew Over the Cuckoo's Nest",
            "Pulp Fiction",
            "Schindler's List",
            "The Dark Knight",
            "The Godfather",
            "The Godfather: Part II",
            "The Shawshank Redemption"
        ];
        $scope.validate = function(event) {
        event.preventDefault();
        console.log($scope.validator.validate());
        if ($scope.validator.validate()) {
            $scope.validationMessage = "Hooray! Your tickets has been booked!";
            $scope.validationClass = "valid";
        } else {
            $scope.validationMessage = "Oops! There is invalid data in the form.";
            $scope.validationClass = "invalid";
        }
    }

});


myApp.controller('dialogCtrl', function($scope) {
        
    $scope.actions = [
        { text: 'Skip this version' },
        { text: 'Remind me later' },
        { text: 'Install update', primary: true }
    ];

});

myApp.controller('notificationCtrl', function($scope) {
        
    $scope.notf1Options = {
         templates: [{
             type: "ngTemplate",
             template: $("#notificationTemplate").html()
         }]
     };

     $scope.ngValue = "Angular scope value";

     $scope.showPopup = function () {
         var date = new Date();
         date = kendo.toString(date, "HH:MM:ss.") + kendo.toString(date.getMilliseconds(), "000");

         $scope.notf1.show({
           kValue: date
         }, "ngTemplate");
     }

     $scope.showInContainer = function() {
         var date = new Date();
         date = kendo.toString(date, "HH:MM:ss.") + kendo.toString(date.getMilliseconds(), "000");
         $scope.notf2.show(date, "info");
     };
     $scope.dismissAll = function() {
         $scope.notf1.hide();
         $scope.notf2.hide();
     };

});

myApp.controller('pdfExportCtrl', function($scope) {


    var stats = [
                          { value: 30, date: "2011-12-20 00:00:00" },
                        { value: 50, date: "2011-12-21 00:00:00" },
                        { value: 45, date: "2011-12-22 00:00:00" },
                        { value: 40, date: "2011-12-23 00:00:00" },
                        { value: 35, date: "2011-12-24 00:00:00" },
                        { value: 40, date: "2011-12-25 00:00:00" },
                        { value: 42, date: "2011-12-26 00:00:00" },
                        { value: 40, date: "2011-12-27 00:00:00" },
                        { value: 35, date: "2011-12-28 00:00:00" },
                        { value: 43, date: "2011-12-29 00:00:00" },
                        { value: 38, date: "2011-12-30 00:00:00" },
                        { value: 30, date: "2011-12-31 00:00:00" },
                        { value: 48, date: "2012-01-01 00:00:00" },
                        { value: 50, date: "2012-01-02 00:00:00" },
                        { value: 55, date: "2012-01-03 00:00:00" },
                        { value: 35, date: "2012-01-04 00:00:00" },
                        { value: 30, date: "2012-01-05 00:00:00" }
                    ];
            
            $scope.exportChart = function(){
              var chart = $("#chart").getKendoChart();
              console.log(chart);
                chart.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function(data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.pdf"   ,
                        proxyURL: "http//demos.telerik.com/kendo-ui/service/export"
                    });
                });
            }
            
            $scope.chartOptions = {
               title: {
                        text: "Closing stock prices"
                    },
                    
                    seriesDefaults: {
                        type: "scatterLine",
                        markers: {
                            size: 6
                        }
                    },
                    series: [{
                        xField: "date",
                        yField: "value",
                      data: stats
                    }],
                   xAxis :{
                     type: "date",
                     min: "2011-12-20 00:00:00"                 
                     
                   },
                    yAxis: {
                        labels: {
                            format: "${0}",
                            skip: 1
                        }
                    },
                    tooltip: {
                        visible: true
                       
                    }
            }


});

myApp.controller('pdfExportPlainCtrl', function($scope) {

    $scope.getPDF = function(selector) {

        kendo.pdf.defineFont({
                    "DejaVu Sans"             : "http://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans.ttf",
                    "DejaVu Sans|Bold"        : "http://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
                    "DejaVu Sans|Bold|Italic" : "http://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
                    "DejaVu Sans|Italic"      : "http://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
                });
        kendo.drawing.drawDOM($(selector)).then(function(group){
          kendo.drawing.pdf.saveAs(group, "Invoice.pdf");
        });
    }


    $scope.change = function() {
        var option = $('#paper').find(":selected").text();
        $(".pdf-page").removeClass("size-a4").removeClass("size-letter").removeClass("size-executive").addClass(option);
    }
});

myApp.controller('MaskedCtrl', function($scope) {

    $scope.phone = "555 123 4567";
      $scope.cc = "1234 1234 1234 1234"
      $scope.ssn = "003-12-3456";
      $scope.post = "W1N 1AC";

});

myApp.controller('touchEventCtrl', function($scope) {

    $scope.myTouch = {
        touchstart: function(e) { kendoConsole.log("touch start"); },
        swipe: function(e) { kendoConsole.log("swipe " + e.direction); },
        tap: function(e) { kendoConsole.log("tap"); },
        doubletap: function(e) { kendoConsole.log("double tap"); },
        hold: function(e) { kendoConsole.log("hold"); }
    }

});

myApp.controller('windowCtrl', function($scope) {

    $scope.hello = "Hello from Controller!";

});

myApp.controller('pieChartCtrl', function($scope) {

    $scope.onSeriesHover = function(e) {
        kendoConsole.log(kendo.format("event :: seriesHover ({0} : {1})", e.category, e.value));
    };

    $scope.screenResolution = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/content/dataviz/js/screen_resolution.json",
                dataType: "jsonp"
            }
        },
        filter: {
            field: "year",
            operator: "eq",
            value: 2009
        }
    });

});

myApp.controller('tooltipCtrl', function($scope,$timeout) {

    function updateTime() {
        $scope.time = kendo.toString(new Date(), "H:mm:ss.fff tt");
        $timeout(updateTime, 78);
    };
    $scope.theContent = "The <b>tooltip</b><br />Time is: {{time}}";
    updateTime();

});

myApp.controller('listViewCtrl', function($scope) {
        var products = [{
            ProductID : 1,
            ProductName : "Chai",
            SupplierID : 1,
            CategoryID : 1,
            QuantityPerUnit : "10 boxes x 20 bags",
            UnitPrice : 18.0000,
            UnitsInStock : 39,
            UnitsOnOrder : 0,
            ReorderLevel : 10,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 2,
            ProductName : "Chang",
            SupplierID : 1,
            CategoryID : 1,
            QuantityPerUnit : "24 - 12 oz bottles",
            UnitPrice : 19.0000,
            UnitsInStock : 17,
            UnitsOnOrder : 40,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 3,
            ProductName : "Aniseed Syrup",
            SupplierID : 1,
            CategoryID : 2,
            QuantityPerUnit : "12 - 550 ml bottles",
            UnitPrice : 10.0000,
            UnitsInStock : 13,
            UnitsOnOrder : 70,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 4,
            ProductName : "Chef Anton's Cajun Seasoning",
            SupplierID : 2,
            CategoryID : 2,
            QuantityPerUnit : "48 - 6 oz jars",
            UnitPrice : 22.0000,
            UnitsInStock : 53,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 5,
            ProductName : "Chef Anton's Gumbo Mix",
            SupplierID : 2,
            CategoryID : 2,
            QuantityPerUnit : "36 boxes",
            UnitPrice : 21.3500,
            UnitsInStock : 0,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 6,
            ProductName : "Grandma's Boysenberry Spread",
            SupplierID : 3,
            CategoryID : 2,
            QuantityPerUnit : "12 - 8 oz jars",
            UnitPrice : 25.0000,
            UnitsInStock : 120,
            UnitsOnOrder : 0,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 7,
            ProductName : "Uncle Bob's Organic Dried Pears",
            SupplierID : 3,
            CategoryID : 7,
            QuantityPerUnit : "12 - 1 lb pkgs.",
            UnitPrice : 30.0000,
            UnitsInStock : 15,
            UnitsOnOrder : 0,
            ReorderLevel : 10,
            Discontinued : false,
            Category : {
                CategoryID : 7,
                CategoryName : "Produce",
                Description : "Dried fruit and bean curd"
            }
        }, {
            ProductID : 8,
            ProductName : "Northwoods Cranberry Sauce",
            SupplierID : 3,
            CategoryID : 2,
            QuantityPerUnit : "12 - 12 oz jars",
            UnitPrice : 40.0000,
            UnitsInStock : 6,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 9,
            ProductName : "Mishi Kobe Niku",
            SupplierID : 4,
            CategoryID : 6,
            QuantityPerUnit : "18 - 500 g pkgs.",
            UnitPrice : 97.0000,
            UnitsInStock : 29,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 6,
                CategoryName : "Meat/Poultry",
                Description : "Prepared meats"
            }
        }, {
            ProductID : 10,
            ProductName : "Ikura",
            SupplierID : 4,
            CategoryID : 8,
            QuantityPerUnit : "12 - 200 ml jars",
            UnitPrice : 31.0000,
            UnitsInStock : 31,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 11,
            ProductName : "Queso Cabrales",
            SupplierID : 5,
            CategoryID : 4,
            QuantityPerUnit : "1 kg pkg.",
            UnitPrice : 21.0000,
            UnitsInStock : 22,
            UnitsOnOrder : 30,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 12,
            ProductName : "Queso Manchego La Pastora",
            SupplierID : 5,
            CategoryID : 4,
            QuantityPerUnit : "10 - 500 g pkgs.",
            UnitPrice : 38.0000,
            UnitsInStock : 86,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 13,
            ProductName : "Konbu",
            SupplierID : 6,
            CategoryID : 8,
            QuantityPerUnit : "2 kg box",
            UnitPrice : 6.0000,
            UnitsInStock : 24,
            UnitsOnOrder : 0,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 14,
            ProductName : "Tofu",
            SupplierID : 6,
            CategoryID : 7,
            QuantityPerUnit : "40 - 100 g pkgs.",
            UnitPrice : 23.2500,
            UnitsInStock : 35,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 7,
                CategoryName : "Produce",
                Description : "Dried fruit and bean curd"
            }
        }, {
            ProductID : 15,
            ProductName : "Genen Shouyu",
            SupplierID : 6,
            CategoryID : 2,
            QuantityPerUnit : "24 - 250 ml bottles",
            UnitPrice : 15.5000,
            UnitsInStock : 39,
            UnitsOnOrder : 0,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 16,
            ProductName : "Pavlova",
            SupplierID : 7,
            CategoryID : 3,
            QuantityPerUnit : "32 - 500 g boxes",
            UnitPrice : 17.4500,
            UnitsInStock : 29,
            UnitsOnOrder : 0,
            ReorderLevel : 10,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 17,
            ProductName : "Alice Mutton",
            SupplierID : 7,
            CategoryID : 6,
            QuantityPerUnit : "20 - 1 kg tins",
            UnitPrice : 39.0000,
            UnitsInStock : 0,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 6,
                CategoryName : "Meat/Poultry",
                Description : "Prepared meats"
            }
        }, {
            ProductID : 18,
            ProductName : "Carnarvon Tigers",
            SupplierID : 7,
            CategoryID : 8,
            QuantityPerUnit : "16 kg pkg.",
            UnitPrice : 62.5000,
            UnitsInStock : 42,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 19,
            ProductName : "Teatime Chocolate Biscuits",
            SupplierID : 8,
            CategoryID : 3,
            QuantityPerUnit : "10 boxes x 12 pieces",
            UnitPrice : 9.2000,
            UnitsInStock : 25,
            UnitsOnOrder : 0,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 20,
            ProductName : "Sir Rodney's Marmalade",
            SupplierID : 8,
            CategoryID : 3,
            QuantityPerUnit : "30 gift boxes",
            UnitPrice : 81.0000,
            UnitsInStock : 40,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 21,
            ProductName : "Sir Rodney's Scones",
            SupplierID : 8,
            CategoryID : 3,
            QuantityPerUnit : "24 pkgs. x 4 pieces",
            UnitPrice : 10.0000,
            UnitsInStock : 3,
            UnitsOnOrder : 40,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 22,
            ProductName : "Gustaf's Knäckebröd",
            SupplierID : 9,
            CategoryID : 5,
            QuantityPerUnit : "24 - 500 g pkgs.",
            UnitPrice : 21.0000,
            UnitsInStock : 104,
            UnitsOnOrder : 0,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 5,
                CategoryName : "Grains/Cereals",
                Description : "Breads, crackers, pasta, and cereal"
            }
        }, {
            ProductID : 23,
            ProductName : "Tunnbröd",
            SupplierID : 9,
            CategoryID : 5,
            QuantityPerUnit : "12 - 250 g pkgs.",
            UnitPrice : 9.0000,
            UnitsInStock : 61,
            UnitsOnOrder : 0,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 5,
                CategoryName : "Grains/Cereals",
                Description : "Breads, crackers, pasta, and cereal"
            }
        }, {
            ProductID : 24,
            ProductName : "Guaraná Fantástica",
            SupplierID : 10,
            CategoryID : 1,
            QuantityPerUnit : "12 - 355 ml cans",
            UnitPrice : 4.5000,
            UnitsInStock : 20,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 25,
            ProductName : "NuNuCa Nuß-Nougat-Creme",
            SupplierID : 11,
            CategoryID : 3,
            QuantityPerUnit : "20 - 450 g glasses",
            UnitPrice : 14.0000,
            UnitsInStock : 76,
            UnitsOnOrder : 0,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 26,
            ProductName : "Gumbär Gummibärchen",
            SupplierID : 11,
            CategoryID : 3,
            QuantityPerUnit : "100 - 250 g bags",
            UnitPrice : 31.2300,
            UnitsInStock : 15,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 27,
            ProductName : "Schoggi Schokolade",
            SupplierID : 11,
            CategoryID : 3,
            QuantityPerUnit : "100 - 100 g pieces",
            UnitPrice : 43.9000,
            UnitsInStock : 49,
            UnitsOnOrder : 0,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 28,
            ProductName : "Rössle Sauerkraut",
            SupplierID : 12,
            CategoryID : 7,
            QuantityPerUnit : "25 - 825 g cans",
            UnitPrice : 45.6000,
            UnitsInStock : 26,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 7,
                CategoryName : "Produce",
                Description : "Dried fruit and bean curd"
            }
        }, {
            ProductID : 29,
            ProductName : "Thüringer Rostbratwurst",
            SupplierID : 12,
            CategoryID : 6,
            QuantityPerUnit : "50 bags x 30 sausgs.",
            UnitPrice : 123.7900,
            UnitsInStock : 0,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 6,
                CategoryName : "Meat/Poultry",
                Description : "Prepared meats"
            }
        }, {
            ProductID : 30,
            ProductName : "Nord-Ost Matjeshering",
            SupplierID : 13,
            CategoryID : 8,
            QuantityPerUnit : "10 - 200 g glasses",
            UnitPrice : 25.8900,
            UnitsInStock : 10,
            UnitsOnOrder : 0,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 31,
            ProductName : "Gorgonzola Telino",
            SupplierID : 14,
            CategoryID : 4,
            QuantityPerUnit : "12 - 100 g pkgs",
            UnitPrice : 12.5000,
            UnitsInStock : 0,
            UnitsOnOrder : 70,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 32,
            ProductName : "Mascarpone Fabioli",
            SupplierID : 14,
            CategoryID : 4,
            QuantityPerUnit : "24 - 200 g pkgs.",
            UnitPrice : 32.0000,
            UnitsInStock : 9,
            UnitsOnOrder : 40,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 33,
            ProductName : "Geitost",
            SupplierID : 15,
            CategoryID : 4,
            QuantityPerUnit : "500 g",
            UnitPrice : 2.5000,
            UnitsInStock : 112,
            UnitsOnOrder : 0,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 34,
            ProductName : "Sasquatch Ale",
            SupplierID : 16,
            CategoryID : 1,
            QuantityPerUnit : "24 - 12 oz bottles",
            UnitPrice : 14.0000,
            UnitsInStock : 111,
            UnitsOnOrder : 0,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 35,
            ProductName : "Steeleye Stout",
            SupplierID : 16,
            CategoryID : 1,
            QuantityPerUnit : "24 - 12 oz bottles",
            UnitPrice : 18.0000,
            UnitsInStock : 20,
            UnitsOnOrder : 0,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 36,
            ProductName : "Inlagd Sill",
            SupplierID : 17,
            CategoryID : 8,
            QuantityPerUnit : "24 - 250 g  jars",
            UnitPrice : 19.0000,
            UnitsInStock : 112,
            UnitsOnOrder : 0,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 37,
            ProductName : "Gravad lax",
            SupplierID : 17,
            CategoryID : 8,
            QuantityPerUnit : "12 - 500 g pkgs.",
            UnitPrice : 26.0000,
            UnitsInStock : 11,
            UnitsOnOrder : 50,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 38,
            ProductName : "Côte de Blaye",
            SupplierID : 18,
            CategoryID : 1,
            QuantityPerUnit : "12 - 75 cl bottles",
            UnitPrice : 263.5000,
            UnitsInStock : 17,
            UnitsOnOrder : 0,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 39,
            ProductName : "Chartreuse verte",
            SupplierID : 18,
            CategoryID : 1,
            QuantityPerUnit : "750 cc per bottle",
            UnitPrice : 18.0000,
            UnitsInStock : 69,
            UnitsOnOrder : 0,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 40,
            ProductName : "Boston Crab Meat",
            SupplierID : 19,
            CategoryID : 8,
            QuantityPerUnit : "24 - 4 oz tins",
            UnitPrice : 18.4000,
            UnitsInStock : 123,
            UnitsOnOrder : 0,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 41,
            ProductName : "Jack's New England Clam Chowder",
            SupplierID : 19,
            CategoryID : 8,
            QuantityPerUnit : "12 - 12 oz cans",
            UnitPrice : 9.6500,
            UnitsInStock : 85,
            UnitsOnOrder : 0,
            ReorderLevel : 10,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 42,
            ProductName : "Singaporean Hokkien Fried Mee",
            SupplierID : 20,
            CategoryID : 5,
            QuantityPerUnit : "32 - 1 kg pkgs.",
            UnitPrice : 14.0000,
            UnitsInStock : 26,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 5,
                CategoryName : "Grains/Cereals",
                Description : "Breads, crackers, pasta, and cereal"
            }
        }, {
            ProductID : 43,
            ProductName : "Ipoh Coffee",
            SupplierID : 20,
            CategoryID : 1,
            QuantityPerUnit : "16 - 500 g tins",
            UnitPrice : 46.0000,
            UnitsInStock : 17,
            UnitsOnOrder : 10,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 44,
            ProductName : "Gula Malacca",
            SupplierID : 20,
            CategoryID : 2,
            QuantityPerUnit : "20 - 2 kg bags",
            UnitPrice : 19.4500,
            UnitsInStock : 27,
            UnitsOnOrder : 0,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 45,
            ProductName : "Rogede sild",
            SupplierID : 21,
            CategoryID : 8,
            QuantityPerUnit : "1k pkg.",
            UnitPrice : 9.5000,
            UnitsInStock : 5,
            UnitsOnOrder : 70,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 46,
            ProductName : "Spegesild",
            SupplierID : 21,
            CategoryID : 8,
            QuantityPerUnit : "4 - 450 g glasses",
            UnitPrice : 12.0000,
            UnitsInStock : 95,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 47,
            ProductName : "Zaanse koeken",
            SupplierID : 22,
            CategoryID : 3,
            QuantityPerUnit : "10 - 4 oz boxes",
            UnitPrice : 9.5000,
            UnitsInStock : 36,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 48,
            ProductName : "Chocolade",
            SupplierID : 22,
            CategoryID : 3,
            QuantityPerUnit : "10 pkgs.",
            UnitPrice : 12.7500,
            UnitsInStock : 15,
            UnitsOnOrder : 70,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 49,
            ProductName : "Maxilaku",
            SupplierID : 23,
            CategoryID : 3,
            QuantityPerUnit : "24 - 50 g pkgs.",
            UnitPrice : 20.0000,
            UnitsInStock : 10,
            UnitsOnOrder : 60,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 50,
            ProductName : "Valkoinen suklaa",
            SupplierID : 23,
            CategoryID : 3,
            QuantityPerUnit : "12 - 100 g bars",
            UnitPrice : 16.2500,
            UnitsInStock : 65,
            UnitsOnOrder : 0,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 51,
            ProductName : "Manjimup Dried Apples",
            SupplierID : 24,
            CategoryID : 7,
            QuantityPerUnit : "50 - 300 g pkgs.",
            UnitPrice : 53.0000,
            UnitsInStock : 20,
            UnitsOnOrder : 0,
            ReorderLevel : 10,
            Discontinued : false,
            Category : {
                CategoryID : 7,
                CategoryName : "Produce",
                Description : "Dried fruit and bean curd"
            }
        }, {
            ProductID : 52,
            ProductName : "Filo Mix",
            SupplierID : 24,
            CategoryID : 5,
            QuantityPerUnit : "16 - 2 kg boxes",
            UnitPrice : 7.0000,
            UnitsInStock : 38,
            UnitsOnOrder : 0,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 5,
                CategoryName : "Grains/Cereals",
                Description : "Breads, crackers, pasta, and cereal"
            }
        }, {
            ProductID : 53,
            ProductName : "Perth Pasties",
            SupplierID : 24,
            CategoryID : 6,
            QuantityPerUnit : "48 pieces",
            UnitPrice : 32.8000,
            UnitsInStock : 0,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : true,
            Category : {
                CategoryID : 6,
                CategoryName : "Meat/Poultry",
                Description : "Prepared meats"
            }
        }, {
            ProductID : 54,
            ProductName : "Tourtière",
            SupplierID : 25,
            CategoryID : 6,
            QuantityPerUnit : "16 pies",
            UnitPrice : 7.4500,
            UnitsInStock : 21,
            UnitsOnOrder : 0,
            ReorderLevel : 10,
            Discontinued : false,
            Category : {
                CategoryID : 6,
                CategoryName : "Meat/Poultry",
                Description : "Prepared meats"
            }
        }, {
            ProductID : 55,
            ProductName : "Pâté chinois",
            SupplierID : 25,
            CategoryID : 6,
            QuantityPerUnit : "24 boxes x 2 pies",
            UnitPrice : 24.0000,
            UnitsInStock : 115,
            UnitsOnOrder : 0,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 6,
                CategoryName : "Meat/Poultry",
                Description : "Prepared meats"
            }
        }, {
            ProductID : 56,
            ProductName : "Gnocchi di nonna Alice",
            SupplierID : 26,
            CategoryID : 5,
            QuantityPerUnit : "24 - 250 g pkgs.",
            UnitPrice : 38.0000,
            UnitsInStock : 21,
            UnitsOnOrder : 10,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 5,
                CategoryName : "Grains/Cereals",
                Description : "Breads, crackers, pasta, and cereal"
            }
        }, {
            ProductID : 57,
            ProductName : "Ravioli Angelo",
            SupplierID : 26,
            CategoryID : 5,
            QuantityPerUnit : "24 - 250 g pkgs.",
            UnitPrice : 19.5000,
            UnitsInStock : 36,
            UnitsOnOrder : 0,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 5,
                CategoryName : "Grains/Cereals",
                Description : "Breads, crackers, pasta, and cereal"
            }
        }, {
            ProductID : 58,
            ProductName : "Escargots de Bourgogne",
            SupplierID : 27,
            CategoryID : 8,
            QuantityPerUnit : "24 pieces",
            UnitPrice : 13.2500,
            UnitsInStock : 62,
            UnitsOnOrder : 0,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 59,
            ProductName : "Raclette Courdavault",
            SupplierID : 28,
            CategoryID : 4,
            QuantityPerUnit : "5 kg pkg.",
            UnitPrice : 55.0000,
            UnitsInStock : 79,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 60,
            ProductName : "Camembert Pierrot",
            SupplierID : 28,
            CategoryID : 4,
            QuantityPerUnit : "15 - 300 g rounds",
            UnitPrice : 34.0000,
            UnitsInStock : 19,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 61,
            ProductName : "Sirop d'érable",
            SupplierID : 29,
            CategoryID : 2,
            QuantityPerUnit : "24 - 500 ml bottles",
            UnitPrice : 28.5000,
            UnitsInStock : 113,
            UnitsOnOrder : 0,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 62,
            ProductName : "Tarte au sucre",
            SupplierID : 29,
            CategoryID : 3,
            QuantityPerUnit : "48 pies",
            UnitPrice : 49.3000,
            UnitsInStock : 17,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 63,
            ProductName : "Vegie-spread",
            SupplierID : 7,
            CategoryID : 2,
            QuantityPerUnit : "15 - 625 g jars",
            UnitPrice : 43.9000,
            UnitsInStock : 24,
            UnitsOnOrder : 0,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 64,
            ProductName : "Wimmers gute Semmelknödel",
            SupplierID : 12,
            CategoryID : 5,
            QuantityPerUnit : "20 bags x 4 pieces",
            UnitPrice : 33.2500,
            UnitsInStock : 22,
            UnitsOnOrder : 80,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 5,
                CategoryName : "Grains/Cereals",
                Description : "Breads, crackers, pasta, and cereal"
            }
        }, {
            ProductID : 65,
            ProductName : "Louisiana Fiery Hot Pepper Sauce",
            SupplierID : 2,
            CategoryID : 2,
            QuantityPerUnit : "32 - 8 oz bottles",
            UnitPrice : 21.0500,
            UnitsInStock : 76,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 66,
            ProductName : "Louisiana Hot Spiced Okra",
            SupplierID : 2,
            CategoryID : 2,
            QuantityPerUnit : "24 - 8 oz jars",
            UnitPrice : 17.0000,
            UnitsInStock : 4,
            UnitsOnOrder : 100,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }, {
            ProductID : 67,
            ProductName : "Laughing Lumberjack Lager",
            SupplierID : 16,
            CategoryID : 1,
            QuantityPerUnit : "24 - 12 oz bottles",
            UnitPrice : 14.0000,
            UnitsInStock : 52,
            UnitsOnOrder : 0,
            ReorderLevel : 10,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 68,
            ProductName : "Scottish Longbreads",
            SupplierID : 8,
            CategoryID : 3,
            QuantityPerUnit : "10 boxes x 8 pieces",
            UnitPrice : 12.5000,
            UnitsInStock : 6,
            UnitsOnOrder : 10,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 3,
                CategoryName : "Confections",
                Description : "Desserts, candies, and sweet breads"
            }
        }, {
            ProductID : 69,
            ProductName : "Gudbrandsdalsost",
            SupplierID : 15,
            CategoryID : 4,
            QuantityPerUnit : "10 kg pkg.",
            UnitPrice : 36.0000,
            UnitsInStock : 26,
            UnitsOnOrder : 0,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 70,
            ProductName : "Outback Lager",
            SupplierID : 7,
            CategoryID : 1,
            QuantityPerUnit : "24 - 355 ml bottles",
            UnitPrice : 15.0000,
            UnitsInStock : 15,
            UnitsOnOrder : 10,
            ReorderLevel : 30,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 71,
            ProductName : "Flotemysost",
            SupplierID : 15,
            CategoryID : 4,
            QuantityPerUnit : "10 - 500 g pkgs.",
            UnitPrice : 21.5000,
            UnitsInStock : 26,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 72,
            ProductName : "Mozzarella di Giovanni",
            SupplierID : 14,
            CategoryID : 4,
            QuantityPerUnit : "24 - 200 g pkgs.",
            UnitPrice : 34.8000,
            UnitsInStock : 14,
            UnitsOnOrder : 0,
            ReorderLevel : 0,
            Discontinued : false,
            Category : {
                CategoryID : 4,
                CategoryName : "Dairy Products",
                Description : "Cheeses"
            }
        }, {
            ProductID : 73,
            ProductName : "Röd Kaviar",
            SupplierID : 17,
            CategoryID : 8,
            QuantityPerUnit : "24 - 150 g jars",
            UnitPrice : 15.0000,
            UnitsInStock : 101,
            UnitsOnOrder : 0,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 8,
                CategoryName : "Seafood",
                Description : "Seaweed and fish"
            }
        }, {
            ProductID : 74,
            ProductName : "Longlife Tofu",
            SupplierID : 4,
            CategoryID : 7,
            QuantityPerUnit : "5 kg pkg.",
            UnitPrice : 10.0000,
            UnitsInStock : 4,
            UnitsOnOrder : 20,
            ReorderLevel : 5,
            Discontinued : false,
            Category : {
                CategoryID : 7,
                CategoryName : "Produce",
                Description : "Dried fruit and bean curd"
            }
        }, {
            ProductID : 75,
            ProductName : "Rhönbräu Klosterbier",
            SupplierID : 12,
            CategoryID : 1,
            QuantityPerUnit : "24 - 0.5 l bottles",
            UnitPrice : 7.7500,
            UnitsInStock : 125,
            UnitsOnOrder : 0,
            ReorderLevel : 25,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 76,
            ProductName : "Lakkalikööri",
            SupplierID : 23,
            CategoryID : 1,
            QuantityPerUnit : "500 ml",
            UnitPrice : 18.0000,
            UnitsInStock : 57,
            UnitsOnOrder : 0,
            ReorderLevel : 20,
            Discontinued : false,
            Category : {
                CategoryID : 1,
                CategoryName : "Beverages",
                Description : "Soft drinks, coffees, teas, beers, and ales"
            }
        }, {
            ProductID : 77,
            ProductName : "Original Frankfurter grüne Soße",
            SupplierID : 12,
            CategoryID : 2,
            QuantityPerUnit : "12 boxes",
            UnitPrice : 13.0000,
            UnitsInStock : 32,
            UnitsOnOrder : 0,
            ReorderLevel : 15,
            Discontinued : false,
            Category : {
                CategoryID : 2,
                CategoryName : "Condiments",
                Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
            }
        }];
    $scope.source = new kendo.data.DataSource({
        data: products,
        pageSize: 18    
    });
});