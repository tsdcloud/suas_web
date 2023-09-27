const notifications =(title, body, icon = "path/to/logo.png", websiteUrl, redirectUrl)=>{
    
    // Check if the browser supports push notifications
    if ("Notification" in window) {
        // Request permission for push notifications
        Notification.requestPermission()
        .then(function (permission) {
            if (permission === "granted") {
            // Create a new notification
            var options = {
                body: body,
                icon: icon,
            };
    
            var notification = new Notification(title, options);
    
            // Customize the notification onclick behavior if needed
            notification.onclick = function () {
                // Handle notification click event
                // console.log("Notification clicked");
                if (window.location.href.indexOf(websiteUrl) > -1) {
                    // Redirect within the same tab
                    window.location.href = redirectUrl;
                  } else {
                    // Open the website in a new tab
                    window.open(websiteUrl, '_blank');
                  }
            };
            }
        })
        .catch(function (error) {
            console.error("Error occurred while requesting permission:", error);
        });
    } else {
        alert("Error occurred while requesting permission")
    }
    
}


export default notifications;