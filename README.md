# Current Local That Works database scraper

This aims to scrape [this page](https://s3.amazonaws.com/currentbucket-762391/local-that-works/child_2019.html) ([embedded here](https://current.org/2020/01/get-inspired-with-our-huge-list-of-local-content-and-engagement-projects/)) to turn it into a CSV.

## Issues and time-tracking

- Write the scraper: https://github.com/INN/umbrella-currentorg/issues/135
- Conversion task (old): https://github.com/INN/umbrella-currentorg/issues/121
- Final scrape: https://github.com/INN/umbrella-currentorg/issues/136

## Running this

1. Clone this repo
2. Run `make`

### Assumptions

- you're on a Mac with all the Homebrew dependencies, including `make` and `open`
	- Linux users may be able to `alias open=xdg-open`
