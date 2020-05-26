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

	$.each( $( '#projects > .list li' ), function( index, value ) {
		var row = {};

		// items here are ordered by the order in https://docs.google.com/spreadsheets/d/1eHTJV1OKOWfOrZAaPosovc96dfhn1A_-SdRyMWge8Ts/edit#gid=0

		// project submitter email (postmeta)
		// project submitter (postmeta)

		// project org (postmeta)
		try {
			row.project_org = $( value ).find( 'p.org' ).text();
		} catch ( error ) {
			console.error( 'error processing project org', error, value );
		}

		// project city (postmeta project-city)
		// project state (postmeta project-state)

		// project org type (term project-org-type)
		try {
			var raw_org_type = $( value ).find( 'p.orgtype' ).text();
			// @todo strip preface text from this
			row.project_org_type = raw_org_type.replace( 'Type of organization: ', '' );
		} catch ( error ) {
			console.error( 'error processing project org type', error, value );
		}

		// project contact name (postmeta project-contact-name)
		// project contact email (postmeta project-contact-email)
		try {
			var raw_contact = $( value ).find( 'p.contact' ).text();
			// @todo remove preface text, split this into email and name
			row.project_contact_email = raw_contact;
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
		// @todo figure out how we want to present these inside the CSV

		// project photo (post_thumbnail)
		// project video (postmeta project-video)
		// project status (term project-status)

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
