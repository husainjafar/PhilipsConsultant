document.addEventListener('DOMContentLoaded', function() {
    async function init() {
        await gapi.client.init({
            'apiKey': 'AIzaSyC5kcL65DzLqwstR84oHalPLHqKhciBHiM',
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        });
        attachFormListener();
    }

    function attachFormListener() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                writeData();
            });
        }
    }

    function writeData() {
        const data = [
            [
                document.querySelector('input[name="Name"]').value,
                document.querySelector('input[name="Contact"]').value,
                document.querySelector('input[name="Email"]').value,
                document.querySelector('input[name="City"]').value,
                document.querySelector('select[name="State"]').value,
                document.querySelector('input[name="Zip"]').value,
                document.querySelector('textarea[name="Message"]').value,
                document.querySelector('input[name="flexCheckChecked"]').checked ? 'Yes' : 'No'
            ]
        ];

        gapi.client.sheets.spreadsheets.values.append({
            'spreadsheetId': '1EJRkYBLShn6nPwk1G2yekgNnTFjblMWwxuz7AYaYtzU',
            'range': 'Sheet1!A1',
            'valueInputOption': 'RAW',
            'values': data,
        }).then(function(response) {
            alert('Data written to Google Sheet');
        });
    }

    gapi.load('client', init);
});
