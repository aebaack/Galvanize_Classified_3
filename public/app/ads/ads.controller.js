(function() {
  'use strict';

  angular.module('classifieds')
    .component('listAds', {
      controller: AdsController,
      templateUrl: 'app/ads/ads.template.html'
    });

    AdsController.$inject = ['adService'];

    function AdsController(adService) {
      const vm = this;
      vm.orderBy = '-created_at';
      vm.reverse = false;

      vm.$onInit = function() {
        adService.getAds()
          .then(() => vm.ads = adService.ads);
      };

      vm.changeOrder = function(orderBy) {
        vm.orderBy = orderBy;
      };

      vm.reverseOrder = function(isReverse) {
        vm.reverse = isReverse;
      };
    }
}());