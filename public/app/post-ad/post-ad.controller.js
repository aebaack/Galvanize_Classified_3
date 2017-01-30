(function() {
  'use strict';

  angular.module('classifieds')
    .component('newAd', {
      controller: NewAdController,
      templateUrl: 'app/post-ad/post-ad.template.html'
    });

  NewAdController.$inject = ['adService'];

  function NewAdController(adService) {
    const vm = this;
    vm.newAd = {};
    vm.newPostIsVisible = false;

    vm.toggleNewPostVisibility = function() {
      vm.newPostIsVisible = !vm.newPostIsVisible;
    };

    vm.submitNewAd = function(event) {
      event.preventDefault();
      adService.postAd(vm.newAd)
        .then(() => {
          delete vm.newAd;
          vm.newPostIsVisible = false;
        });
    };
  }
}());