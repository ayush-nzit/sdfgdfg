
// // var parentSwiper = new Swiper('.mySwiper', {
// //   direction: 'horizontal',
// //   slidesPerView: 'auto',
// //   spaceBetween: 20,
// //   observer: true,
// //   observeParents: true,
// //   navigation: {
// //     nextEl: '.parent-swiper-next',
// //     prevEl: '.parent-swiper-prev',
// //   },
// //   autoplay: {
// //     delay: 2500,
// //     disableOnInteraction: false,
// //   },

// //   pagination: {
// //     el: '.swiper-pagination',
// //     clickable: true,
// //   },
// // });

// // parentSwiper.on('slideChange', function () {
// //   // Get the active child swiper instance
// //   var childSwiper = this.slides[this.activeIndex].querySelector(
// //     '.child-swiper .swiper-container'
// //   ).swiper;

// //   // Update the child swiper layout and slide to the first slide
// //   childSwiper.update();
// //   childSwiper.slideTo(0);
// // });

// // var childSwipers = document.querySelectorAll('.mySwiper2');
// // var swipers = [];

// // for (var i = 0; i < childSwipers.length; i++) {
// //   swipers[i] = new Swiper(childSwipers[i], {
// //     autoplay: {
// //       delay: 2500,
// //       disableOnInteraction: false,
// //       stopOnLastSlide: true,
// //     },
// //     effect: '',
// //     pagination: {
// //       el: '.swiper-pagination',
// //       clickable: true,
// //     },
// //     on: {
// //       slideChange() {
// //         // check if the active slide is the last slide in the slider
// //         if (this.isEnd) {
// //           // stop the autoplay feature of the Swiper JS slider
// //           swipers[i].autoplay.stop();
// //         }
// //       },
// //     },
// //     slidesPerView: 'auto',
// //     spaceBetween: 20,
// //     observer: true,
// //     observeParents: true,
// //     navigation: {
// //       nextEl: '.child-swiper-next',
// //       prevEl: '.child-swiper-prev',
// //     },
// //   });
// // }

// // viewYrStatus.addEventListener('click', (e) => {
// //   console.log('click');
// //   allStatusDiv.style.display = 'none';
// //   selfStatusView.style.display = 'initial';

// //   for (var i = 0; i < swipers.length; i++) {
// //     swipers[i].slideTo(0);
// //     swipers[i].autoplay.start();
// //   }
// // });

// // crossS.forEach((e) => {
// //   e.addEventListener('click', () => {
// //     selfstatusDiv.style.display = 'none';
// //     allStatusDiv.style.display = 'none';
// //   });
// // });

// // function showAllStatus(index) {
// //   console.log('click');
// //   allStatusDiv.style.display = 'initial';
// //   selfStatusView.style.display = 'none';

// //   parentSwiper.slideTo(index);
// //   parentSwiper.autoplay.start();
// // }




// var parentSwiper = new Swiper('.mySwiper', {
//   direction: 'horizontal',
//   slidesPerView: 'auto',
//   spaceBetween: 20,
//   observer: true,
//   observeParents: true,
//   navigation: {
//     nextEl: '.parent-swiper-next',
//     prevEl: '.parent-swiper-prev',
//   },
//   autoplay: {
//     delay: 10000,
//     disableOnInteraction: false,
//   },

//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
// });


//  var swiper = new Swiper('.mySwiper', {
//    spaceBetween: 50,
   
//  });
//  var swiper2 = new Swiper('.mySwiper2', {
//    direction: 'horizontal',
//    spaceBetween: 50,
//    pagination: {
//      el: '.swiper-pagination',
//      clickable: true,
//    },
//    navigation: {
//      nextEl: '.swiper-button-next',
//      prevEl: '.swiper-button-prev',
//    },
//  });






// var childSwipers = document.querySelectorAll('.mySwiper2');
// var swipers = [];

// for (var i = 0; i < childSwipers.length; i++) {
//   swipers[i] = new Swiper(childSwipers[i], {
//     autoplay: {
//       delay: 3000,
//       disableOnInteraction: false,
//       stopOnLastSlide: true,
//     },
//     effect: '',
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//     // on: {
//     //   slideChange() {
//     //     // check if the active slide is the last slide in the slider
//     //     if (this.isEnd) {
//     //       // stop the autoplay feature of the Swiper JS slider
//     //       this.autoplay.stop();
//     //     }
//     //   },
//     // },

//     // on: {
//     //   slideChange() {
//     //     // check if the active slide is the last slide in the slider
//     //     if (this.isEnd) {
//     //       // stop the autoplay feature of the Swiper JS slider
//     //       this.autoplay.stop();

//     //       // get the index of the parent swiper's active slide
//     //       var parentSlideIndex = parentSwiper.activeIndex;

//     //       // check if the parent slide is not the last slide in the slider
//     //       if (parentSlideIndex < parentSwiper.slides.length - 1) {
//     //         // change the parent swiper to the next slide
//     //         parentSwiper.slideNext();
//     //       }
//     //     }
//     //   },
//     // },
//     slidesPerView: 'auto',
//     spaceBetween: 20,
//     observer: true,
//     observeParents: true,
//     navigation: {
//       nextEl: '.child-swiper-next',
//       prevEl: '.child-swiper-prev',
//     },
//   });
// }

// // viewYrStatus.addEventListener('click', (e) => {
// //   console.log('click');
// //   allStatusDiv.style.display = 'none';
// //   selfStatusView.style.display = 'initial';

// //   for (var i = 0; i < swipers.length; i++) {
// //     swipers[i].slideTo(0);
// //     swipers[i].autoplay.start();
// //   }
// // });

// // crossS.forEach((e) => {
// //   e.addEventListener('click', () => {
// //     selfstatusDiv.style.display = 'none';
// //     allStatusDiv.style.display = 'none';
// //   });
// // });

// // function showAllStatus(index) {
// //   console.log('click');
// //   allStatusDiv.style.display = 'initial';
// //   selfStatusView.style.display = 'none';

// //   parentSwiper.slideTo(index);
// //   parentSwiper.autoplay.start();
// // }
