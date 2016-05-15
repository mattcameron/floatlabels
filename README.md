# Floatlabels

Sick of boring old labels that take up space and clog up your beautiful websites?

Floatlabels uses floated labels to make your forms look cleaner and smarter. Once a user begins typing, your placeholders automagically turn into labels so the user still has context.

![Demo](demo.gif)

## Installation

Add floatlabels to your application's Gemfile:

    gem 'jquery-rails' # requires jQuery
    gem 'floatlabels'

Require floatlabels inside your application.js file, after jQuery.

    //= require jquery
    //= require floatlabels


And then execute:

    $ bundle


## Usage

Add the class to the inputs you want to float the labels on

    <%= f.text_field :example, placeholder: 'Example Label', class: 'floatlabel' %>

Initialise floatlabels

    $('.floatlabel').floatlabel();

and hey presto, you've got floated labels!

### Options

You can override any of the following default options on initialisation:

    $('.floatlabel').floatlabel({
      type               : 'inside',   // ('inside' or 'outside')
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
    });


You can also use `data-label="Example Label"` to set the label text.

    <%= f.text_field :pirate_name, data: {label: 'Pirate Name'}, class: 'floatlabel form-control' %>


#### Types

 I added a quick option to switch between labels inside your text input, and labels above the input.

Using `type: 'outside'` automatically sets the following:

    slideInput    : false,
    labelShownTop : '-20px',
    paddingOffset : '0px'

This will overwrite any custom options you have set for these values with the above.

#### More info
*More documentation can be found at [http://clubdesign.github.io/floatlabels.js](http://clubdesign.github.io/floatlabels.js).*

## Credit
All credit goes to Marcus Poherely. This is simply a gemified version of his code with some slightly different defaults.

 - URL: http://clubdesign.github.io/floatlabels.js/
 - Author: Marcus Pohorely ( http://www.clubdesign.at )
 - Copyright: Copyright 2013 / 2014 http://www.clubdesign.at
 - Adapted for bootstrap projects by Michael Levin 2/20/14
 - Slightly modified and gemified by Matt Cameron 15-Mar-2016
 

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
