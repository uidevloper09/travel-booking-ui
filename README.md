# Wayfarer Travel Booking UI

A responsive travel booking homepage for exploring destinations, comparing travel offers, and starting a flight or hotel search. Built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.

## Preview

Open `index.html` in a browser, or start a local web server from the project directory:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Features

- Responsive navigation and mobile-friendly layouts.
- Flight and hotel search forms with required-field and date-range validation.
- Flight route swapping and date input minimums.
- Live trip summary for valid search details.
- Destination cards with interactive save buttons.
- Travel offer cards and newsletter signup demo feedback.
- Accessible form labels, tab states, live feedback, and image descriptions.

## Notes

This is a front-end UI prototype. Flight/hotel searches do not connect to booking inventory or create reservations, and the newsletter form does not submit or store email addresses. Bootstrap, Bootstrap Icons, Google Fonts, and destination photography load from external CDNs/services and require an internet connection.

## Testing

Check the JavaScript for syntax errors with:

```bash
node --check script.js
```

For a manual smoke test, open the page and verify the responsive navigation, switch between Flights and Stays, submit valid and invalid search details, swap flight routes, save a destination, and submit an email address in the newsletter field.
