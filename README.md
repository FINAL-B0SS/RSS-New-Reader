
## Usage
My News Reader is a simple react app where you can read news articles that you provide from RSS formatted xml links. Not every link will work due to some using slightly different formatting. here are a few great feeds to test with.
http://feeds.feedburner.com/psblog
https://blog.roblox.com/feed/
https://www.pcgamer.com/rss/
https://www.buzzfeed.com/world.xml
https://www.theguardian.com/world/rss
https://www.cnbc.com/id/100727362/device/rss/rss.html

![enter image description here](https://media0.giphy.com/media/1Yr0G20W3gPexYoWex/giphy.gif)
## Setup
To start the client:
```
cd client
npm install # or `yarn`
npm start # or `yarn start`
```

The client will run on http://localhost:3000

To start the server:
```
cd server
npm install # or `yarn`
npm start # or `yarn start`
```

The server will run on http://localhost:8080

Before writing any code the app had to be designed. Below is the first mockup I made for My News Reader
![enter image description here](https://i.imgur.com/lYQN1EX.png)

This structure of this app follows the MVC format. 
![enter image description here](https://i.imgur.com/1PCmbQS.png)

## API Guide
The backend server has two endpoint. One for getting feed information the other for getting all the articles in a feed.

**api/fetchFeed?link=${link}**
**Purpose** - Fetch the general information about an RSS feed.
**Input** - Link: A string that points to the xml sheet for the rss feed you wish to get information for
**Output** - An object that describes the feed provided. 

example Input: http://feeds.feedburner.com/psblog

example output: {
	title: 'PlayStation.Blog',
	link: 'http://feeds.feedburner.com/psblog',
	description: 'Follow this official PlayStation Blog for news and video updates on PS4, PS3, PSN, PS Vita and PSP,
	image: 'https://blog.playstation.com/tachyon/2019/03/cropped-pslogo.png?fit=32,32',
	lastBuildDate: ' 12 Jan 2021 17:00:08 +0000'
}

**api/fetchItems?link=${link}**
**Purpose** - Fetch every article from a given feed
**Input** - Link: A string that points to the xml sheet for the rss feed you wish to get information for
**Output** - An array of objects representing each article from a given feed

example Input: http://rssfeedexample.xml

example output:
[ {
	title: 'Article 1,
	link: 'http://rssfeedexample.xml',
	description: 'A short summary of article 1',
	content: 'The complete story for article 1',
	pubDate: 'dd month yyyy hh:mm:ss +timezone'
},
{
	title: 'Article 2,
	link: 'http://rssfeedexample.xml',
	description: 'A short summary of article 2',
	content: 'The complete story for article 2',
	pubDate: 'dd month yyyy hh:mm:ss +timezone'
},
{
	title: 'Article 3,
	link: 'http://rssfeedexample.xml',
	description: 'A short summary of article 3',
	content: 'The complete story for article 13',
	pubDate: 'dd month yyyy hh:mm:ss +timezone'
},]

## Future plans
### - Save feeds in localStorage so they don't have to be re-added after refreshing the page.
### - Add support for podcast and video feeds
### - Allow users to manually remove feeds after adding them
### - A dark theme toggle
### - Error messages for the user if a provided link does not work
