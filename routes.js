// because next does not handle routes with dynamic content we need to use this kind of approach.
// hence this file will hold all the dynamic routes we have. 
// Important! The default route handling is still at play too. So all routes not handled here will be handled by the default router. -_- :0 



const routes = require("next-routes")() // absolutely critical to use the second "()" since this returns a function! 
routes.add("/campaigns/new", "/campaigns/new")
routes.add("/campaigns/:address", "/campaigns/show")
routes.add("/campaigns/:address/requests", "/campaigns/requests/index")
routes.add("/campaigns/:address/requests/new", "/campaigns/requests/new")


module.exports = routes

