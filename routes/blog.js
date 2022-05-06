let express = require('express');
let router = express.Router();
const keys = require('../config/keys');
const { google } = require('googleapis');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString} = require('graphql');
const { graphqlHTTP } = require('express-graphql')

const API_KEY = process.env.GOOGLE_API_KEY;
const BLOG_ID = process.env.BLOG_ID;
const hashnode_token = process.env.HASHNODE_TOKEN;

const blogger = google.blogger({
    version: 'v3',
    auth: API_KEY
});

const params = {
    blogId: BLOG_ID,
    maxResults: 100,
};

function getPathFromUrl(url) {
    return url.split("?")[0];
}

function formattedDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newMonth = months[oldDate.getMonth()];
    let newDate = oldDate.getDate() + ',';
    let newYear = oldDate.getFullYear();
    return [newMonth, newDate, newYear].join(' ');
}
function capitalizeFirstLetter(string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

router.get('/', addLocals, async (req, res) => {
    let posts = await blogger.posts.list(params);
    getSlugofPost(posts);
    res.render('blog/index', {
        posts : posts.data.items,
        title: 'Blog | Vishwas Acharya',
    });
});

// const PostType = new GraphQLObjectType({
//     name: 'Post',
//     fields: () => ({
//         id: { type: GraphQLInt },
//         title: { type: GraphQLString },
//         content: { type: GraphQLString },
//         published: { type: GraphQLString },
//         url: { type: GraphQLString },
//         slug: { type: GraphQLString },
//         tags: { type: GraphQLString },
//         image: { type: GraphQLString },
//     })
// });
// const rootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         post: {
//             type: PostType,
//             args: {
//                 id: { type: GraphQLString }
//             },
//             resolve(parentValue, args) {
//                 return getPost(args.id);
//             }
//         }
//     }
// });

// const mutation = 'query';

// const schema = new graphql.GraphQLSchema({
//     query : rootQuery,
//     mutation : mutation
// });
// router.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true,
// }));

// router.get('/tech', addLocals, async (req, res) => {
//     res.render('blog/tech', {
//         title: 'Tech',
//     });
// });

router.get('/:postName', addLocals, async (req, res) => {
    let posts = await blogger.posts.list(params);
    getSlugofPost(posts);
    res.render('blog/posts', {
        posts: posts.data.items,
        postName: req.params.postName,
        title: capitalizeFirstLetter(req.params.postName.split('-').join(' ')) + ' | Vishwas Acharya',
        
    });
});

function getSlugofPost(postData) {
    for (let i=0; i<postData.data.items.length; i++) {
        let post = postData.data.items[i];
        postData.data.items[i].url = post.url.split("/")[5].split(".")[0];
        post.content = post.content.replace(/style=".*?"|<img.*?>|<object.*?<\/object>|<p><\/p>|<p>&nbsp;<\/p>|<p>\s*<\/p>|<br>|<div class="separator">.*?<\/div>/g, '');
    }
}

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    res.locals.formattedDate= formattedDate;
    return next();
}

module.exports = router;