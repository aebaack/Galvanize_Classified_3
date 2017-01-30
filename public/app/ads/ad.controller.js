(function() {
  'use strict';

  angular.module('classifieds')
    .component('ad', {
      bindings: {
        'adData': '<'
      },
      controller: AdController,
      templateUrl: 'app/ads/ad.template.html'
    });

  AdController.$inject = ['adService'];

  function AdController(adService) {
    const vm = this;
    vm.showEdit = false;

    vm.$onInit = function() {
      vm.adEdits = {
        title: vm.adData.title,
        price: vm.adData.price,
        description: vm.adData.description,
        item_image: vm.adData.item_image,
      };
    };

    vm.showEditForm = function() {
      vm.showEdit = !vm.showEdit;
    };

    vm.editAd = function(event) {
      event.preventDefault();
      adService.editAd(vm.adData.id, vm.adEdits);
    };

    vm.deleteAd = function() {
      adService.deleteAd(vm.adData.id);
    };
  }
}());