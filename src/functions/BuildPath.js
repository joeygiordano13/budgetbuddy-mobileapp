export function buildPath(route)
{
    const app_name = 'budgetbuddiesapp';
    if (process.env.NODE_ENV === 'production')
    {
        //console.log("route" + route);
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {
        //console.log("route: " + route);
        return 'http://localhost:5000/' + route;
    }
}