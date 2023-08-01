var express = require('express');
var exphbs = require('express-handlebars')

var app = express();
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine({
    defaultLayout: "main"
}))

var port = process.env.PORT || 3000;
app.set('view engine', 'handlebars')

function newest(a, b) {

    if ( a.id < b.id ) {
        return  1 ;
    }

    else {
        return - 1 ;
    }

}

function oldest(a, b) {

    if ( a.id < b.id ) {
        return - 1 ;
    }

    else {
        return 1 ;
    }

}

function not_so_liked(a, b) {

    if ( a.likes < b.likes ) {
        return 1 ;
    }

    else {
        return - 1 ;
    }

}

function not_not_so_liked(a, b) {

    if ( a.likes < b.likes ) {
        return - 1 ;
    }

    else {
        return 1 ;
    }

}

var some_user = "not_provided"

var list_post = require( "./tweets_data.json" )

app.get( "/" , function (req, res) {

    some_user = "not_provided"

    res.status(200).send( "public/index.html" )

} ) ;


app.get( "/newest" , function (req, res, next) {

    list_post = require( "./tweets_data.json" )
    list_post.sort( newest )

    var new_array = []

    for ( i = 0 ; i < list_post.length ; i = 1 + i ) {

        if ( list_post[ i ].hidden !== true ) {

            new_array.push( list_post[ i ] )

        }

    }

    list_post = new_array

    res.status(200 ).render("page_post" , { posts : list_post } )

} ) ;

app.get( "/oldest" , function (req, res, next) {

    list_post = require( "./tweets_data.json" )
    list_post.sort( oldest )

    var new_array = []

    for ( i = 0 ; i < list_post.length ; i = 1 + i ) {

        if ( list_post[ i ].hidden !== true ) {

            new_array.push( list_post[ i ] )

        }

    }

    list_post = new_array

    res.status(200 ).render("page_post" , { posts : list_post } )

    //

} ) ;

app.get( "/not_so_liked" , function (req, res, next) {

    var list_post = require( "./tweets_data.json" )
    list_post.sort( not_so_liked )

    var new_array = []

    for ( i = 0 ; i < list_post.length ; i = 1 + i ) {

        if ( list_post[ i ].hidden !== true ) {

            new_array.push( list_post[ i ] )

        }

    }

    list_post = new_array

    res.status(200 ).render("page_post" , { posts : list_post } )

} ) ;

app.get( "/not_not_so_liked" , function (req, res, next) {

    var list_post = require( "./tweets_data.json" )
    list_post.sort( not_not_so_liked )

    var new_array = []

    for ( i = 0 ; i < list_post.length ; i = 1 + i ) {

        if ( list_post[ i ].hidden !== true ) {

            new_array.push( list_post[ i ] )

        }

    }

    list_post = new_array

    res.status(200 ).render("page_post" , { posts : list_post } )

} ) ;

var none_int = require( "./int_counter.json" )
const fs = require('fs')

var tweets_data = []
var data = ""

app.post( "/post" , function (req, res, next) {

    // get tweets

    tweets_data = require( "./tweets_data.json" )
    none_int = require( "./int_counter.json" )

    // get new id

    none_int.int_counter = 1 + none_int.int_counter
    number = JSON.stringify( none_int )
    fs.writeFile( "./int_counter.json" , number , function ( err ) {

        //

    } )

    // new post

    var save = {

        photoURL : req.body.photoURL ,
        postText : req.body.postText ,
        username : some_user ,
        likes : 0 ,
        id : none_int.int_counter ,
        hidden : false ,
        comments : []

    }

    tweets_data.push( save )
    data = JSON.stringify( tweets_data )

    fs.writeFile( "./tweets_data.json" , data , function ( err ) {

        //

    } )

    res.status(200 )
    res.send()

} ) ;

app.post( "/trash" , function (req, res, next) {

    list_post = require( "./tweets_data.json" )
    list_post.sort( oldest )

    list_post[ req.body.id - 1 ].hidden = true
    list_post = JSON.stringify( list_post )

    fs.writeFile( "./tweets_data.json" , list_post , function ( err ) {

        //

    } )

    res.status(200 )
    res.send()

} ) ;

app.post( "/do_comment" , function (req, res, next) {

    // PLEASE

    tweets_data = require( "./tweets_data.json" )
    list_post.sort( oldest )

    var comment_some = {

        comment_post : req.body.comment_post ,
        comment_name : some_user

    }

    tweets_data[ req.body.comment_id - 1 ].comments.push( comment_some )
    data = JSON.stringify( tweets_data )

    fs.writeFile( "./tweets_data.json" , data , function ( err ) {

        //

    } )

    res.status(200 )
    res.send()

} ) ;

app.post( "/like" , function (req, res, next) {

    list_post = require( "./tweets_data.json" )
    list_post.sort( oldest )
    list_post[ req.body.id - 1 ].likes = 1 + list_post[ req.body.id - 1 ].likes

    list_post = JSON.stringify( list_post )

    fs.writeFile( "./tweets_data.json" , list_post , function ( err ) {

        //

    } )

    res.status(200 )
    res.send()

} ) ;

app.post( "/logging" , function (req, res, next) {

    // more like

    some_user = req.body.sign_log

    res.status(200 )
    res.send()

} ) ;

app.listen( port , function () {

    console.log( "== Server is listening on port" , port ) ;

} ) ;
//404 Page
app.get( "*" , function (req, res, next) {

    res.status(404).render( "404" )

} ) ;
