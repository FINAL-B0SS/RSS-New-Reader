"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchItems = exports.fetchFeedInfo = void 0;
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const parseString = require('xml2js').parseString;
const httpGet = (theUrl) => {
    let req = new XMLHttpRequest();
    let ret;
    req.open('GET', theUrl, false);
    req.send();
    parseString(req.responseText, (err, result) => {
        ret = result;
    });
    return ret;
};
// Parse xml for object containing feed information
const fetchFeed = (link) => {
    const data = httpGet(link);
    let feed = null;
    if (data.feed) {
        feed = data.feed;
    }
    else if (data.rss.channel[0]) {
        feed = data.rss.channel;
    }
    if (Array.isArray(feed)) {
        feed = feed[0];
    }
    return feed;
};
const fetchDescription = (feed) => {
    if (feed.description) {
        return feed.description[0];
    }
    else if (feed.subtitle) {
        return feed.subtitle[0];
    }
    else if (feed['media:group']) {
        return feed['media:group'][0]['media:description'][0];
    }
    return null;
};
const fetchImage = (item) => {
    if (item.icon) {
        return item.icon[0];
    }
    else if (item.image) {
        return item.image[0].url[0];
    }
    else if (item['media:group']) {
        return item['media:group'][0]['media:thumbnail'][0]['$'].url;
    }
    return null;
};
// Extract basic info about rss feed (title, source, description, image, and last update)
const fetchFeedInfo = (link) => {
    const feed = fetchFeed(link);
    if (feed) {
        const feedInfo = {
            title: feed.title[0],
            link: link,
            description: fetchDescription(feed),
            lastBuildDate: feed.lastBuildDate ? feed.lastBuildDate[0] : null,
            image: fetchImage(feed),
        };
        return feedInfo;
    }
    return null;
};
exports.fetchFeedInfo = fetchFeedInfo;
const parseItems = (feed) => {
    if (feed.item) {
        return feed.item;
    }
    else if (feed.entry) {
        return feed.entry;
    }
    return null;
};
const fetchContent = (item) => {
    if (item['content:encoded']) {
        return item['content:encoded'][0];
    }
    else if (item['media:group']) {
        return item['media:group'][0]['media:description'][0];
    }
    return null;
};
// Fetch each item from given rss feed link
const fetchItems = (link) => {
    const feed = fetchFeed(link);
    const feedItems = parseItems(feed);
    if (feedItems) {
        const items = feedItems.map((item) => {
            return {
                title: item.title[0],
                description: fetchDescription(item),
                image: fetchImage(item),
                link: Array.isArray(item.link) ? item.link[0] : item.link,
                pubDate: item.pubDate ? item.pubDate[0] : null,
                content: fetchContent(item),
            };
        });
        return items;
    }
    return null;
};
exports.fetchItems = fetchItems;
