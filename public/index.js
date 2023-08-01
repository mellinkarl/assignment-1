var blog_post = document.getElementById("post_blog" )
var post_text = document.getElementById("post_text" )
var url_photo = document.getElementById("photo_url" )

blog_post.addEventListener( "click" , function( event ) {

        if( url_photo != "" && post_text.value != "" ) {

        fetch("/post" , {

            method : "POST" ,

            headers: {
                'Content-Type': 'application/json'
            } ,

            body : JSON.stringify( {

                    photoURL : url_photo.value ,
                    postText : post_text.value

                }

            )

        } )

        post_text.value = ""
        url_photo.value = ""

    }

} )

var like_ints = document.getElementById("id_liking" )
var like_send = document.getElementById("like_some" )

like_send.addEventListener( "click" , function( event ) {

    if( like_ints.value != "" ) {

        fetch("/like" , {

            method : "POST" ,

            headers: {
                'Content-Type': 'application/json'
            } ,

            body : JSON.stringify( {

                    id : like_ints.value

                }
            )
        } )

        like_ints.value = ""

    }

} )

var number_trash = document.getElementById("id_delete" )
var do_trash = document.getElementById("delete_post" )

do_trash.addEventListener( "click" , function( event ) {

    if( number_trash.value != "" ) {

        fetch("/trash" , {

            method : "POST" ,

            headers: {
                'Content-Type': 'application/json'
            } ,

            body : JSON.stringify( {

                    id : number_trash.value

                }
            )
        } )

        number_trash.value = ""

    }

} )

var comment_double = document.getElementById("comment_id" )
var paragraphs_comment = document.getElementById("paragraphs_comment" )

var comment_do = document.getElementById("commenting" )

comment_do.addEventListener( "click" , function( event ) {

    if ( comment_double.value != "" && paragraphs_comment.value != ""  ) {

        fetch("/do_comment" , {

            method : "POST" ,

            headers: {
                'Content-Type': 'application/json'
            } ,

            body : JSON.stringify( {

                comment_id : comment_double.value ,
                comment_post : paragraphs_comment.value

                }
            )

        } )

        comment_double.value = ""
        paragraphs_comment.value = ""

    }

} )

var sign_log = document.getElementById("log_sign" )
var logging = document.getElementById("logging" )

logging.addEventListener( "click" , function( event ) {

    if ( sign_log.value != "" ) {

        fetch("/logging" , {

            method : "POST" ,

            headers: {
                'Content-Type': 'application/json'
            } ,

            body : JSON.stringify( {

                    sign_log : sign_log.value

                }

            )

        } )

        sign_log.value = ""

    }

} )

