jBlock

.match('tabs', function()
{
    this.js()
},
{
    bindToElem: {
        item: {
            click: function (e) {
                var item = $(e.currentTarget)
                if (this.hasMod(item, 'state', 'release')) {
                    this.setMod(this.elem('item', 'state', 'check'), 'state', 'release')
                    this.setMod(item, 'state', 'check')
                }
            }
        }
    }
})

.match('tabs__item', function()
{
    this.defMod({
            state:'release',
            button:false
        })
})

.match('tabs__icon', function()
{
    this.append()
        .css({'background-image':this.text()})
})

// BEM.DOM.decl('tabs', {
//     onSetMod: {
//       js: {
//         inited: function () {
//           this.$tabs       = this.findElem('item');
//           this.$arrowLeft  = this.findElem('arrow-left');
//           this.$arrowRight = this.findElem('arrow-right');

//           var $checkedTabs = this.findElem('item', 'state', 'check');

//           if ($checkedTabs.length > 1) {
//             throw new Error('More than 1 checked item');
//           } else if ($checkedTabs.length === 0) {
//             // set default checked tab
//             this.check($(this.$tabs[0]), false);
//           } else {
//             this._highlightItem($checkedTabs, false);
//           }

//           this.$tabs.on('click', function(event) {
//             this.check($(event.target), true);
//           }.bind(this));

//           this.$tabgroup.on('scroll.renderArrows', function() {
//             this._renderArrows();
//           }.bind(this));

//           this.$tabgroup.on('scroll.highlight', function() {
//             this._highlightItem(this.elem('item', 'state', 'check'));
//           }.bind(this));

//           this._renderArrows();

//           this.elem('arrow-left').on('click', function() {
//             this.$tabgroup.animate({
//               scrollLeft: Math.max(this.$tabgroup.scrollLeft() - this.$tabgroup.outerWidth() / 2, 0)
//             }, 1000, 'easeOutExpo');
//           }.bind(this));

//           this.elem('arrow-right').on('click', function() {
//             this.$tabgroup.animate({
//               scrollLeft: Math.min(this.$tabgroup.scrollLeft() + this.$tabgroup.outerWidth() / 2, this.$tabgroup.outerWidth())
//             }, 1000, 'easeOutExpo');
//           }.bind(this));
//         }
//       }
//     },

//     check: function($target) {
//       var index = $target.data('index');
//       var $currentChecked = this.findElem('item', 'state', 'check');

//       this.setMod($currentChecked, 'state', '');
//       this.setMod($target, 'state', 'check');

//       this.setMod(this.findElem('screen', 'state', 'active'), 'state', '');
//       this.setMod(this.findElem('screen').filter('[data-index="' + index + '"]'), 'state', 'active');

//       var targetLeft = $target.position().left;
//       var targetWidth = $target.outerWidth();
//       var scrollLeft = this.$tabgroup.scrollLeft();
//       var viewportWidth = this.$tabgroup.outerWidth();
//       var groupWidth = this.$tabgroup[0].scrollWidth;

//       var isLastItem = scrollLeft + targetLeft + targetWidth === groupWidth;
//       var isFirstItem = targetLeft + scrollLeft === 0;

//       var newPos, newScroll;

//       if (isFirstItem) {
//         newScroll = 0;
//         newPos = 0 + parseInt($target.css('padding-left'));
//       } else if (isLastItem) {
//         newScroll = targetLeft;
//         newPos = viewportWidth - targetWidth + parseInt($target.css('padding-left'));
//       } else if (targetLeft <= 50) {
//         newScroll = scrollLeft + (targetLeft - 50);
//         newPos = 50 + parseInt($target.css('padding-left'));
//       } else if (targetLeft + targetWidth + 50 > viewportWidth) {
//         var deltaPos = targetLeft - (viewportWidth - (targetWidth + 50));
//         newScroll = scrollLeft + deltaPos;
//         newPos = viewportWidth - (targetWidth + 50) + parseInt($target.css('padding-left'));
//       } else {
//         newPos = targetLeft + parseInt($target.css('padding-left'));
//       }

//       if (newScroll !== void 0) {
//         this._moveHighlightAnimated(newPos, $target.width());
//         this.$tabgroup.off('scroll.highlight');
//         this._scrollTabgroup(newScroll, function() {
//           this.$tabgroup.on('scroll.highlight', function() {
//             this._highlightItem(this.elem('item', 'state', 'check'));
//           }.bind(this));
//         }.bind(this));
//       } else {
//         this._highlightItemAnimated($target);
//       }
//     },

//     _scrollTabgroup: function(left, callback) {
//       var currentLeft = this.$tabgroup.scrollLeft();
//       var speed = 1000; // px/s
//       var duration = Math.abs((left - currentLeft) / (speed / 1000));

//       this.$tabgroup.animate({
//         scrollLeft: left
//       }, duration, 'easeOutExpo', callback);
//     },

//     _highlightTarget: function(moveFn, $target, callback) {
//       var left = $target.position().left + parseInt($target.css('padding-left'));
//       var width = $target.width();

//       moveFn.call(this, left, width, callback);
//     },

//     _highlightItem: function($target) {
//       this._highlightTarget(this._moveHighlight, $target);
//     },

//     _highlightItemAnimated: function($target, callback) {
//       this._highlightTarget(this._moveHighlightAnimated, $target, callback);
//     },

//     _moveHighlight: function(left, width) {
//       this.$highlight.css({
//         left: left,
//         width: width
//       });
//     },

//     _moveHighlightAnimated: function(left, width, callback) {
//       var currentLeft = this.$highlight.position().left;
//       var speed = 1000; // px/s
//       var duration = Math.abs((left - currentLeft) / (speed / 1000));

//       this.$highlight.animate({
//         left: left,
//         width: width
//       }, duration, 'easeOutExpo', callback);
//     },

//     _renderArrows: function() {
//       var scrollLeft = this.$tabgroup.scrollLeft();
//       var width = this.$tabgroup.outerWidth();
//       var contentWidth = this.$tabgroup[0].scrollWidth;

//       if (scrollLeft > 0) {
//         this.$arrowLeft.show();
//       } else {
//         this.$arrowLeft.hide();
//       }

//       if (scrollLeft === contentWidth - width) {
//         this.$arrowRight.hide();
//       } else {
//         this.$arrowRight.show();
//       }
//     }

//   });

// })(window);
