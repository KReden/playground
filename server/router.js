/**
 * Created by kylereden on 4/2/14.
 */

function route(handle, pathname, response, request){
    console.log("Routing request for " + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, request);
    }else{
        console.log('Nothing found for ' + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write('404 Not Found');
        response.end();
    }
}

exports.route = route;