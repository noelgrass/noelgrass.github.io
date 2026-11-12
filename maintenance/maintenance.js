var MAINTENANCE_MODE = false; 

if (window.location.search.includes('admin=true')) {
    MAINTENANCE_MODE = false; 
}

if (MAINTENANCE_MODE) {
    if (!window.location.pathname.includes('/maintenance/')) {
        window.location.href = "/maintenance/";
    }
}
