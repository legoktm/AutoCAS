// CONFIGURATION.
// Only replace the none values with the *exact* value. Leave ' marks intact.
// If you don't fill this in, you will be prompted for it the first time you
// access the website.
var config = {
	'Site': 'none',
	'Setting at site': 'none',
	'Default age of patient': 'none',
	'Preceptor': 'none',
};
// Don't touch below this.


// ==UserScript==
// @description Autmatically fill in values in the patient log for Case med students
// @include https://casemed.case.edu/CAS/*
// @name AutoCASfiller
// @version 0.2
// @author Kunal Mehta (legoktm@gmail.com)
// @license MIT License <http://opensource.org/licenses/MIT>
// ==/UserScript==

function update_config(keyname, value) {
	if (value != 'none') {
		GM_setValue(keyname, value);
	}
}

update_config('sitelist', config['Site']);
update_config('setlist', config['Setting at site']);
update_config('agelist', config['Default age of patient']);
update_config('preceptor', config['Preceptor'])


function get_human(keyname) {
	var help = {
		'sitelist': 'Site: (Ex: "UH")',
		'setlist': 'Setting at site: (Ex: Operating room)',
		'agelist': 'Age: (Ex: 5-12)',
		'preceptor': 'Preceptor:'
	};
	//GM_log('Got human for ' + keyname);
	return help[keyname];
}

function super_getValue(keyname) {
	var stored = GM_getValue(keyname, false);
	if (stored === false) {
		var value = window.prompt(get_human(keyname));
		GM_setValue(keyname, value);
		return value;
	}
	return stored;
}


// case med thingy

function select_option(keyname) {
	// Sets the index value for that element
	var thing = document.getElementById(keyname);
	//GM_log(keyname);
	if (thing == null) {
		//GM_log('is null');
		return;
	}
	var value = super_getValue(keyname);
	GM_log(value);
	for (var i=0; i<thing.length; i++) {
		//GM_log(thing.options[i]);
		//GM_log(thing.options[i].firstChild.data);
		if (thing.options[i].firstChild.data == value) {
			thing.options.selectedIndex = i;
			return;
		}
	}
}

function set_text(keyname) {
	// Sets the text for that element
	var thing = document.getElementById(keyname);
	if (thing == null) {
		return;
	}
	var value = super_getValue(keyname);
	if (value !=== null && value !=== '') {
		thing.value = super_getValue(keyname);
	}
	thing.focus();
}

function select_random(keyname) {
	// TODO: This is broken.
	// Randomly selects one option for the element
	var thing = document.getElementById(keyname);
	if (thing == null) {
		return;
	}
	GM_log(thing);
	GM_log(thing.options);
	if (thing.options == null) {
		return;
	}
	thing.options.selectedIndex = rand(thing.options);
}

function click_checkbox(keyname) {
	// Clicks the checkbox with this id
	var thing = document.getElementById(keyname);
	if (thing == null) {
		return;
	}
	if (!thing.checked) {
		GM_log('Clicked checkbox');
		thing.click();
	}
}

function rand(item) {
	// Returns a random index value within the number of values "item" has.
	// from http://stackoverflow.com/questions/5081103/automatically-pick-random-select-choices-in-web-form
	return Math.floor(Math.random() * (item.length - 1));
}

select_option('sitelist'); // encounter.html; value is "UH"
select_option('setlist'); // encounter.html; value is "Operating room"
select_option('agelist'); // patient.html; value is "5-12"
//select_random('sex'); // patient.html; radio button for gender
//select_random('race_0'); // patient.html; radio button for race
click_checkbox('lobj_0'); // patient.html
click_checkbox('lobj_1'); // patient.html
click_checkbox('lobj_2'); // patient.html
set_text('preceptor'); // preceptor.html
