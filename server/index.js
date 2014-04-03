/**
 * Created by kylereden on 4/2/14.
 */

var server              = require('./server')
    , router            = require('./router')
    , requestHandlers   = require('./requestHandlers')
    , handle            = [];

handle['/']         = requestHandlers.start;
handle['/start']    = requestHandlers.start;
handle['/upload']   = requestHandlers.upload;
handle['/show']     = requestHandlers.show;

server.start(router.route, handle);