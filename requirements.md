
# Submission Requirements
## Project Description

My News Reader is a simple react app where you can read news articles that you provide from RSS formatted xml links.

![enter image description here](https://i.imgur.com/1PCmbQS.png)

At the home screen the title of the app, current time/day, weather info, and search box for adding feeds are displayed at the top. And the feeds users add are listed below and paginated by five

![enter image description here](https://i.imgur.com/CmWwo5e.png)

When a user clicks on one of the feeds listed on the home page, a list of items from that feed will be displayed. The items are paginated in groups of 5

![enter image description here](https://i.imgur.com/GWhaZiq.png)


## Project Requirements
Please list examples of how your project meets the following requirements below:
- [x] Use a modern JS Library/Framework like React, Angular, etc. We suggest using React.js.
-   This app was built using React.js, Node.js, and TypeScript.
- [x] Create an application that can be interacted with in a minimum of three different ways by the user.
-   Users can add feeds, browse feeds, browse articles in those feed, read complete news articles, see the time, and see the weather.
- [x] Use of at least one Service (REST API).
-   Weather information is pulled using the OpenWeather REST API. See the Weather component in the diagram provided.
- [x] The usage of a specified architectural pattern (MVC, MVP, MVVM,  etc.)
- This was organized using the MVC architectural pattern. See the diagram above
- [x] Usage of at least 5 UI components from the [material-ui/@core](https://material-ui.com/) library (if you are not using React, a comparable UI library is acceptable)

The following Material UI Components were used extensively through out  this project.

-   Button
-   TextField
-   Typography
-   Grid, Box
-   Card, CardContent
    
-   Dialog, DialogTitle, DialogContent, DialogContentText
- [x] An example of a reusable UI component that you have created and used in the app. This should be different than the 5 UI components from the vendor library.
- The most frequently reused UI component is the ItemInfoCard. An instance of this card is created for every article in a given feed. This component displays a summary of a feed item (title, description, date published) and upon clicking this component a dialog component displaying the complete article is display**
