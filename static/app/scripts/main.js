$(document).ready(function () {
    var counter = 0;

    // Clear the companies container
    $('#companies').empty();

    // Randomize the company order
    companies = shuffle(companies);

    // Fill it with companies from the JSON file
    for (var i = 0; i < companies.length; i++) {
        var HTML = compileCompanyHTML(companies[i], i);
        $('#companies').append(HTML);
    };

    // Initialize iCheck for each of the check selectors
    $('input[type=checkbox]').each(function () {
        var self = $(this),
			label = self.next(),
			label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-green',
            radioClass: 'iradio_line-green',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });

    // Checked handler
    $('input').on('ifChecked', function (event) {

        // Grab the ID of the checked field
        var id = event.target.id;

        // Grab the company ID from the div ID
        var index = parseInt(id.substring(id.length - 2, id.length).replace('-', ''));
        companies[index].selected = true;

        // Clear selected companies out of the modal
        $('#modal-companies').empty();

        // Refill the modal with any companies that have been selected
        var companiesString = '';
        for (var i = 0; i < companies.length; i++) {
            if (companies[i].selected) {
                companiesString += companies[i].name + ', ';
            }
        };
        companiesString = companiesString.substring(0, companiesString.length - 2);
        $('#modal-companies').append(companiesString);

        $('#id_investor_companies').val(companiesString);

        // Iterate the amount of companies selected
        counter++;

        // Empty and refill the counter on the header bar
        $('#counter').empty();
        if (counter === 1) {
            $('#counter').append('I am interested in ' + counter + ' company.');
        } else {
            $('#counter').append('I am interested in ' + counter + ' companies.');
        }

        // Show the nav bar
        showNav();
    });


    // Unchecked handler
    $('input').on('ifUnchecked', function (event) {

        // Grab the ID of the unchecked field
        var id = event.target.id;

        // Grab the company ID from the div ID
        var index = parseInt(id.substring(id.length - 1, id.length));
        companies[index].selected = false;

        // Clear selected companies out of the modal
        $('#modal-companies').empty();

        // Refill the modal with any companies are still selected
        var companiesString = '';
        for (var i = companies.length - 1; i >= 0; i--) {
            if (companies[i].selected) {
                companiesString += companies[i].name + ', ';
            }
        };
        companiesString = companiesString.substring(0, companiesString.length - 2);
        $('#modal-companies').append(companiesString);

        // Take one away for the company unselected
        counter--;

        // Empty and refill the counter on the header bar. If no companies are
        // selected, hide the nav bar
        $('#counter').empty();
        if (counter === 1) {
            $('#counter').append('I am interested in ' + counter + ' company.');
        } else if (counter === 0) {
            hideNav();
        } else {
            $('#counter').append('I am interested in ' + counter + ' companies.');
        }
    });

  
    // Magical hide on scroll down, show on scroll up function
    var previousScroll = 0;
    $(window).scroll(function () {

        var currentScroll = $(this).scrollTop();

        // If the current scroll position is greater than 0 (the top) AND the current scroll position is less than the document height minus the window height (the bottom) run the navigation if/else statement.
        if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()) {


            // If the current scroll is greater than the previous scroll (i.e we're scrolling down the page), hide the nav.
            if ($(window).width() < 600) {
                if (currentScroll > previousScroll) {
                    window.setTimeout(hideNav, 300);

                    // Else we are scrolling up (i.e the previous scroll is greater than the current scroll), so show the nav.
                } else {
                    window.setTimeout(showNav, 300);
                }
            }

            // Set the previous scroll value equal to the current scroll.
            previousScroll = currentScroll;
        }
    });

    function hideNav() {
        $("[data-nav-status='toggle']").removeClass("is-visible").addClass("is-hidden");
    }

    function showNav() {
        if (counter > 0) {
            $("[data-nav-status='toggle']").removeClass("is-hidden").addClass("is-visible");
        }
    }

});


// Compile company HTML for injection helper
function compileCompanyHTML(company, iteration) {
    var HTMLstring = '<div class="profile clearfix">';
    HTMLstring += '<div class="col-sm-3 col-md-3">';
    HTMLstring += '<a href="' + company.link + '" class="profile-photo" target="_blank"><img src="' + company.logo + '"></a>';
    HTMLstring += '</div>';
    HTMLstring += '<div class="profile-body col-sm-9 col-md-9">';
    HTMLstring += '<h2><a href="' + company.link + '" target="_blank">' + company.name + '</a></h2>';
    HTMLstring += '<p>' + company.desc + '</p>';
    HTMLstring += '<ul class="unstyled avatar-group founders clearfix">';
    for (var i = 0; i < company.founders.length; i++) {
        HTMLstring += '<li class="clearfix">';
        HTMLstring += '<img alt="' + company.founders[i].name + '" class="avatar" src="' + company.founders[i].image + '">';
        HTMLstring += '<p><span class="name">' + company.founders[i].name + '</span>';
        HTMLstring += '<span class="title">' + company.founders[i].title + '</span></p>';
        HTMLstring += '</li>';
    };
    HTMLstring += '</ul></div>';
    HTMLstring += '<input id="company-' + iteration + '" type="checkbox">';
    HTMLstring += '<label for="company-' + iteration + '" class="checkbox-label">I am interested in ' + company.name + '</label>';
    HTMLstring += '</div>';
    return HTMLstring;
}

// Validate email helper
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Array shuffler
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}