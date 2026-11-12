// 🚦 THE SWITCH 🚦
var MAINTENANCE_MODE = true; 

// Secret bypass
if (window.location.search.includes('admin=true')) {
    MAINTENANCE_MODE = false; 
}

if (MAINTENANCE_MODE) {
    // 🛑 CHANGED HERE: Point to the new folder path
    if (!window.location.pathname.includes('/maintenance/')) {
        window.location.href = "/maintenance/";
    }
}
