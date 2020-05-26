$( function() {
	var rows = [];

	console.log( 'running' );

	/**
	 * Create the CSV link
	 *
	 * https://stackoverflow.com/questions/17836273/export-javascript-data-to-csv-file-without-server-interaction/17836529#17836529
	 */
	function createCsvLink( string ) {
		// create string
		// append to DOM
		// click the link
	}

	/**
	 * given an index, check the previous index to see if that index is a string and not empty. if it's an empty string, call with that index.
	 *
	 * @param Number  index within array
	 * @param Array   the array so indexed
	 * @return Number the index that matches the condition of not being empty and being prior to the index argument
	 */
	function item_previous( index, array ) {
		var new_index = index - 1;
		if ( ! array[new_index] || array[new_index] == undefined || array[new_index] == "" || array[new_index].length == 0 ) {
			return item_previous( new_index, array );
		} else {
			return new_index;
		}
	}

	$.each( $( '#projects > .list li' ), function( index, value ) {
		var row = {};

		// items here are ordered by the order in https://docs.google.com/spreadsheets/d/1eHTJV1OKOWfOrZAaPosovc96dfhn1A_-SdRyMWge8Ts/edit#gid=0

		// Not included in scraped file
		// project submitter email (postmeta)
		// project submitter (postmeta)

		// project org (postmeta)
		try {
			row.project_org = $( value ).find( 'p.org' ).text();
		} catch ( error ) {
			console.error( 'error processing project org', error, value );
		}

		// not included in scraped file
		// project city (postmeta project-city)
		// project state (postmeta project-state)

		// project org type (term project-org-type)
		try {
			var raw_org_type = $( value ).find( 'p.orgtype' ).text();
			// @todo strip preface text from this
			row.project_org_type = raw_org_type.replace( 'Type of organization:', '' ).trim();
		} catch ( error ) {
			console.error( 'error processing project org type', error, value );
		}

		// project contact name (postmeta project-contact-name)
		// project contact email (postmeta project-contact-email)
		// Splitting this is not possible without a ton of work
		// the format on the page is inconsistent: https://github.com/INN/current-ltw-scraper/issues/4
		try {
			var raw_contact = $( value ).find( 'p.contact' ).text().replace( 'Contact:' , '' ).trim();
			row.project_contact_email = '';
			row.project_contact_name = raw_contact;
		} catch ( error ) {
			console.error( 'error processing project contact', error, value );
		}

		// title (post_title)
		try {
			row.post_title = $( value ).find( 'h1' ).text();
		} catch ( error ) {
			console.error( 'error processing title', error, value );
		}

		// two-sentence summary (post_excerpt)
		try {
			row.post_excerpt = $( value ).find( 'p.description' ).text();
		} catch ( error ) {
			console.error( 'error processing project summary for post_excerpt', error, value );
		}

		// Tell your story (post_content)
		try {
			row.post_content = $( value ).find( 'p.description' ).text();
		} catch ( error ) {
			console.error( 'error processing project long description for post_content', error, value );
		}

		// project revenue statement (postmeta @todo)
		// project specific impact statement (postmeta @todo)

		// project primary URL (postmeta project-link)
		try {
			row.project_link = $( value ).find( 'h1 a' ).attr( 'href' );
		} catch ( error ) {
			console.error( 'error processing project primary link', error, value );
		}

		// project supplementary link 1 (postmeta @todo)
		// project supplementary link 2 (postmeta @todo)
		// project supplementary link 3 (postmeta @todo)
		// project supplementary link 4 (postmeta @todo)
		// project supplementary link 5 (postmeta @todo)

		// project tags (term project-category)
		try {
			raw_project_category = $( value ).find( 'p.contenttype' ).text();
			// remove preface
			raw_project_category = raw_project_category.replace( 'Type of content:', '' ).trim();
			// the categories are separated by spaces, and each starts with an uppercase letter
			array_project_categories = raw_project_category.split( ' ' );
			// now all words are separate; let's rejoin the words within the organization types
			array_project_categories.forEach( function( item, index, array ) {


				if ( item.charAt(0) === item.charAt(0).toUpperCase() ) {
					// do nothing
				} else {
					// add this item to the end of the previous item
					var new_index = item_previous( index, array );
					array[new_index].concat( ' ', item );

					// and then empty this item
					array[index] = '';
				}
			});


			// now join them
			row.project_category = array_project_categories.filter( item => item.length > 0 ).join( ',' );
		} catch ( error ) {
			console.error( 'error processing project primary link', error, value );
		}


		// project photo (post_thumbnail)
		// project video (postmeta project-video)

		// project status (term project-status)
		try {
			row.project_status = $( value ).attr( 'class' );
		} catch ( error ) {
			console.error( 'error processing project year', error, value );
		}

		// year submitted (post_date)
		// @todo remove preface text
		try {
			row.post_date = $( value ).find( 'p.year' ).text();
		} catch ( error ) {
			console.error( 'error processing project year', error, value );
		}

		rows.push( row );
	});

	const json2csvParser = new json2csv.Parser();
	const csv = json2csvParser.parse( rows );
	console.log( csv );
});
