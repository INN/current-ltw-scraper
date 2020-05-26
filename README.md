# Current Local That Works database scraper

This aims to scrape [this page](https://s3.amazonaws.com/currentbucket-762391/local-that-works/child_2019.html) ([embedded here](https://current.org/2020/01/get-inspired-with-our-huge-list-of-local-content-and-engagement-projects/)) to turn it into a CSV.

## Issues and time-tracking

- Write the scraper: https://github.com/INN/umbrella-currentorg/issues/135
- Conversion task (old): https://github.com/INN/umbrella-currentorg/issues/121
- Final scrape: https://github.com/INN/umbrella-currentorg/issues/136

## Running this

1. Clone this repo as a site in Valet, at `current-ltw-scraper` with a domain of `.test`
	- visit https://current-ltw-scraper.test to make sure that worked
2. Run `make`

### Assumptions

- you have [Laravel valet](https://laravel.com/docs/7.x/valet) installed
	- The install instructions assume this, but any similar setup will work if it lets you serve the contents of this repo at the URL mentioned in the instructions
- you're on a Mac with all the Homebrew dependencies, including `make` and `open`
	- Linux users may be able to `alias open=xdg-open`
