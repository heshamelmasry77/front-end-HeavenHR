## Usage

```
yarn install
yarn start
open http://localhost:3000
```

## Server Usage
A RESTful API for friends is provided with the challenge, to run the server use this below command

```
 yarn start-server
```
you can find friends list here: http://localhost:3020/friends. 

#### You should replace the static reducer data with the server data

#### Use cases

#### The user shall be able to:

- Add a new friend in a separated page via navigation (should persist when the page is reloaded)
- See friends in pages of 5 items per page.
- Search by friend name.
- Filter by gender and stared flag.
- Sort by name and id.
- Update the friend name (should persist when the page is reloaded)
- Toggle staring when I click on star button (should persist when the page is reloaded)


## Evaluation criteria

#### Technology requirements
__React__ and __JavaScript__ and __Redux__ are mandatory requirements.
you can use any libraries.
ES6 is highly encouraged.


## Must Have
- The application must start
- The application must be a single-page application (SPA)
- The application must be divided into components
- The list and details page must cover all use cases
- The application must include meaningful tests (Tests that do not validate logic or component behavior, e.g. snapshot tests, are not counted)

## Nice to Have
- Using styled-component library
- The application follows good naming convention
- The application is responsive
- Styles are shipped separately

## Negative Points
- No componentization
- Inline styles
- No control over re-rendering (e.g. not using id for a list)
- Bad naming
- Direct DOM manipulation

