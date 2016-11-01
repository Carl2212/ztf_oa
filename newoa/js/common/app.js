jQuery(window.applicationCache).bind('updateready', function()
{
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY)
    {
    	console.log('update........');
        window.applicationCache.swapCache();
        window.location.reload();
    }
});   