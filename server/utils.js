"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchItems = exports.fetchFeedInfo = void 0;
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const parseString = require('xml2js').parseString;
const httpGet = (theUrl) => {
    let req = new XMLHttpRequest();
    let ret;
    req.open('GET', theUrl, false);
    req.send(null);
    parseString(req.responseText, function (err, result) {
        ret = result;
    });
    return ret;
};
// Parse xml for object containing feed information
const fetchFeed = (link) => {
    const data = httpGet(link);
    let feed;
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
// Extract basic info about rss feed (title, source, description, image, and last update)
const fetchFeedInfo = (link) => {
    const feed = fetchFeed(link);
    let image;
    if (feed) {
        if (feed.icon) {
            image = feed.icon[0];
        }
        else if (feed.image) {
            image = feed.image[0].url[0];
        }
        const feedInfo = {
            title: feed.title[0],
            link: link,
            description: feed.description ? feed.description[0] : null,
            lastBuildDate: feed.lastBuildDate ? feed.lastBuildDate[0] : null,
            image: image,
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
                description: item.description[0],
                image: null,
                link: Array.isArray(item.link) ? item.link[0] : item.link,
                pubDate: item.pubDate[0],
                'content:encoded': item['content:encoded']
                    ? item['content:encoded'][0]
                    : null,
            };
        });
        return items;
    }
    return null;
};
exports.fetchItems = fetchItems;
