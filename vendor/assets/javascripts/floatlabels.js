/**
 * FloatLabels
 * URL: http://clubdesign.github.io/floatlabels.js/
 * Author: Marcus Pohorely ( http://www.clubdesign.at )
 * Copyright: Copyright 2013 / 2014 http://www.clubdesign.at
 *
 * Adapted for bootstrap projects by Michael Levin 2/20/14
 *
 * Slightly modified and gemified by Matt Cameron 15-Mar-2016
 */

;(function ( $, window, document, undefined ) {
  var defaults = {
    type               : 'inside',
    slideInput         : true,
    labelHiddenTop     : '5px',
    labelShownTop      : '0px',
    paddingOffset      : '10px',
    transitionDuration : 0.1,
    transitionEasing   : 'ease-in-out',
    labelClass         : '',
    typeMatches        : /text|password|email|number|search|url|tel/,
    focusColor         : '#2996cc',
    blurColor          : '#9D9D9D',
    fontWeight         : 'bold',
    fontSize           : '9px'
  };

  function FloatLabel ( element, options ) {
    this.$element = $(element);
    this.settings = configureSettings(options);
    this.init();
  }

  function configureSettings(options) {
    settings = $.extend( {}, defaults, options );

    // Overwrite some settings for easy switch to labels above input
    if (settings.type ==='outside') {
      settings.slideInput    = false;
      settings.labelShownTop = '-20px';
      settings.paddingOffset = '0px';
    }

    return settings;
  }
  
  FloatLabel.prototype = {
    init: function () {
      var self          = this,
          settings      = this.settings,
          thisElement   = this.$element,
          transDuration = settings.transitionDuration,
          transEasing   = settings.transitionEasing,
          transFull     = 'all ' + transDuration + 's ' + transEasing,
          animationCss  = {
            '-webkit-transition': transFull,
            '-moz-transition'   : transFull,
            '-o-transition'     : transFull,
            '-ms-transition'    : transFull,
            'transition'        : transFull
          };

      // Only proceed if element is either an input or textatrea
      if( thisElement.prop('tagName').toUpperCase() != 'INPUT' &&
          thisElement.prop('tagName').toUpperCase() != 'TEXTAREA') { return; }

      // Make sure the type is allowed (in options) 
      if( thisElement.prop('tagName').toUpperCase() === 'INPUT' && !settings.typeMatches.test( thisElement.attr('type') ) ) { return; }

      // Get element ID or randomly create one (for label) 
      var elementID = thisElement.attr('id');
      if( !elementID ) {
        elementID = Math.floor( Math.random() * 100 ) + 1;
        thisElement.attr('id', elementID);
      }

      var placeholderText = thisElement.attr('placeholder'),
          floatingText    = thisElement.data('label'),
          extraClasses    = thisElement.data('class');

      if( !extraClasses ) { extraClasses = ''; }

      // Friendly reminder
      if( !placeholderText || placeholderText === '' ) { placeholderText = "You forgot to add placeholder attribute!"; }

      // Use the data attribute if it has been set, otherwise use placeholder
      if( !floatingText || floatingText === '' ) { floatingText = placeholderText; }
      
      thisElement.wrap('<div class="floatlabel-wrapper" style="position:relative"></div>');
      thisElement.before('<label for="' + elementID + '" class="label-floatlabel ' + settings.labelClass + ' ' + extraClasses + '">' + floatingText + '</label>');
      this.$label = thisElement.prev('label');
      this.$label.css({
        'position'       : 'absolute',
        'top'            : settings.labelHiddenTop,
        'left'           : '8px',
        'display'        : 'none',
        '-moz-opacity'   : '0',
        '-khtml-opacity' : '0',
        '-webkit-opacity': '0',
        'opacity'        : '0',
        'font-size'      : self.settings.fontSize,
        'font-weight'    : self.settings.fontWeight,
        'color'          : self.settings.blurColor
      });

      this.inputPaddingTop = parseFloat( thisElement.css('padding-top') ) + parseFloat(settings.paddingOffset);

      if( !settings.slideInput ) {                    
        thisElement.css('padding-top', this.inputPaddingTop);
      }

      // Event Handlers
      thisElement.on('keyup blur change', function( e ) {
        self.checkValue( e );
      });
      thisElement.on('blur', function() { thisElement.prev('label').css({ 'color' : self.settings.blurColor }); });
      thisElement.on('focus', function() { thisElement.prev('label').css({ 'color' : self.settings.focusColor }); });

      window.setTimeout( function() {
        self.$label.css( animationCss );
        self.$element.css( animationCss );
      }, 100);
      this.checkValue();
    },
    checkValue: function( e ) {
      if( e ) {
        var keyCode = e.keyCode || e.which;
        if( keyCode === 9 ) { return; }                
      }
      var thisElement  = this.$element, 
          currentFlout = thisElement.data('flout');
      if( thisElement.val() !== "" ) { thisElement.data('flout', '1'); }
      if( thisElement.val() === "" ) { thisElement.data('flout', '0'); }
      if( thisElement.data('flout') === '1' && currentFlout !== '1' ) {
        this.showLabel();
      }
      if( thisElement.data('flout') === '0' && currentFlout !== '0' ) {
        this.hideLabel();
      }
    },
    showLabel: function() {
      var self = this;
      self.$label.css({ 'display' : 'block' });
      window.setTimeout(function() {
        self.$label.css({
          'top'            : self.settings.labelShownTop,
          '-moz-opacity'   : '1',
          '-khtml-opacity' : '1',
          '-webkit-opacity': '1',
          'opacity'        : '1'
        });
        if( self.settings.slideInput ) {
          self.$element.css({ 'padding-top' : self.inputPaddingTop });
        }
        self.$element.addClass('active-floatlabel');
      }, 50);
    },
    hideLabel: function() {
      var self = this;
      self.$label.css({
        'top'            : self.settings.labelHiddenTop,
        '-moz-opacity'   : '0',
        '-khtml-opacity' : '0',
        '-webkit-opacity': '0',
        'opacity'        : '0'
      });
      if( self.settings.slideInput ) {
        var paddingTop = parseFloat( self.inputPaddingTop ) - parseFloat(this.settings.paddingOffset);
        self.$element.css({ 'padding-top' : paddingTop });
      }
      self.$element.removeClass('active-floatlabel');
      window.setTimeout(function() {
        self.$label.css({ 'display' : 'none' });
      }, self.settings.transitionDuration * 1000);
    }
  };

  $.fn.floatlabel = function ( options ) {
    return this.each(function() {
      if ( !$.data( this, "plugin_floatlabel" ) ) {
        $.data( this, "plugin_floatlabel", new FloatLabel( this, options ) );
      }
    });
  };
})( jQuery, window, document );