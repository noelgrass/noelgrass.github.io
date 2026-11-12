// 🚦 THE SWITCH 🚦
var MAINTENANCE_MODE = false; 

// Secret bypass
if (window.location.search.includes('admin=true')) {
    MAINTENANCE_MODE = false; 
}

if (MAINTENANCE_MODE) {
    // 🛑 Pointing to the folder now
    if (!window.location.pathname.includes('/maintenance/')) {
        window.location.href = "/maintenance/";
    }
}
