//core.js
require(['./javascripts/knockout-3.2.0.debug.js', './javascripts/paper-full.min.js', './javascripts/ajaxhelpers/ajaxGet.js', './javascripts/ajaxhelpers/ajaxPost.js', './javascripts/domready.js'], function (ko, paper, ajaxGet, ajaxPost) {

	//global variables
	imagesFromServer = [];

	//------------------------main viewmodel---------------------------//
	var ViewModel = function () {
		//observables
		this.getImagesFromServer();
		this.images = ko.observableArray();
		this.currentImage = ko.observable('');
		this.lastSavedImages = ko.observable();

		//computed observables
		this.pathToCurrentImage = ko.computed(function() {
			if(this.currentImage()) {
				var escaped = escape(this.currentImage());
				var begin = escaped.lastIndexOf('%5C') + 3;//'%5C' => '\'
				return './uploads/' + escaped.slice(begin);
			}
			return '';
		}, this);

		//bindings
		this.getImagesFromServer = this.getImagesFromServer.bind(this);
		this.saveImagesToJson = this.saveImagesToJson.bind(this);
		this.onUpload = this.onUpload.bind(this);
	}

	//----------------------------prototypes---------------------------//
	ViewModel.prototype.onUpload = function(item) {
		this.getImagesFromServer();
		this.saveImagesToJson();
		console.log(this.currentImage());
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
    	var thus = this;
        this.lastSavedImages(ko.toJSON(this.images(), null, 2));
        var params = 'path="./uploads/"&data="' + thus.currentImage() + '"';
    	ajaxPost('/writeImage', params).then(function(res) {
    		// body...
		},function (error) {
            console.error(error);
    	});
    };

	var vm = new ViewModel();
	ko.applyBindings(vm);
});