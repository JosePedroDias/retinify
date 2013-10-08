This small utility outputs CSS,
mapping background-position rules using a multiplier argument.

This is useful for custom retina stylesheets and other devices with different resolutions.



# Example

Example file sprites.css:

    .sprite1 {
        background-position: -40px -60px;
    }

By running `retinify sprites.css 2 > sprites-hd.css` you get

    .sprite1 {
        background-position: -80px -120px;
    }



# Syntax

    retinify <file.css> [<multiplier>]

If the multiplier argument is ommitted, defaults to 2.



## Installation

    [sudo] npm install -g retinify
