# A Makefile for running tasks
#


# default task: get the scrape result
all: scrape

# clean up
clean:
	rm -r downloads/
	rm -r output/

# get the scrapeable file
download downloads/child_2019.html:
	mkdir -p downloads/
	wget -O downloads/child_2019.html https://s3.amazonaws.com/currentbucket-762391/local-that-works/child_2019.html

# Using the commands in sed.txt, insert our JS into the scraped page
injected output/child_2019-injected.html: downloads/child_2019.html
	mkdir -p output/
	sed -f sed.sed downloads/child_2019.html > output/child_2019-injected.html

# scrape the downloaded files
scrape: output/child_2019-injected.html
	open ./output/child_2019-injected.html
