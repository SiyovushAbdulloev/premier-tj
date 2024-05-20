export function getCookie(cookieName: string): string {
    // Split the cookies string into an array of individual cookies
    var cookies: any = document.cookie.split(';');
    cookies = cookies.filter((cookie: string) => cookie.includes(cookieName))
    cookies = [cookies[cookies.length - 1]]
    // Loop through each cookie to find the one with the specified name
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // Remove any leading or trailing spaces

        // Check if this cookie has the name we're looking for
        if(cookie.startsWith(cookieName + '=')) {
            // If it does, return the value of the cookie
            return cookie.substring(cookieName.length + 1); // Add 1 to exclude the '=' character
        }
    }

    // If the cookie with the specified name is not found, return null
    return '';
}
