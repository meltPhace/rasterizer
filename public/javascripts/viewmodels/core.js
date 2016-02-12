//core.js
require(['./javascripts/knockout-3.2.0.debug.js', './javascripts/paper-full.min.js', './javascripts/ajaxhelpers/ajaxGet.js', './javascripts/domready.js'], function (ko, paper, ajaxGet) {

	//global variables
	imagesFromServer = [];

	//------------------------main viewmodel---------------------------//
	var ViewModel = function () {
		//observables
		this.getImagesFromServer();
		this.images = ko.observableArray();
		this.currentImage = ko.observable();
		this.lastSavedImages = ko.observable();

		//Bindings
		this.getImagesFromServer = this.getImagesFromServer.bind(this);
		this.saveImagesToJson = this.saveImagesToJson.bind(this);
		this.onUpload = this.onUpload.bind(this);
	}

	//----------------------------prototypes---------------------------//
	ViewModel.prototype.onUpload = function() {
		this.getImagesFromServer();
	};

	ViewModel.prototype.getImagesFromServer = function() {
        var thus = this;
        ajaxGet('/getimages').then(function (res) {
            imagesFromServer = JSON.parse(res);
            /*var mapped = ko.utils.arrayMap(imagesFromServer, function (item) {
                return new Image(item);
            });*/
            thus.images(imagesFromServer);
        }, function (error) {
            console.error(error);
        });
    };
    
    ViewModel.prototype.saveImagesToJson = function() {
        this.lastSavedImages(ko.toJSON(this.images(), null, 2));
    };

	var vm = new ViewModel();
	ko.applyBindings(vm);
});