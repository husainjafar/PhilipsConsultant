document.addEventListener('DOMContentLoaded', async function() {
    async function loadClient() {
        return new Promise((resolve, reject) => {
            gapi.load('client', resolve);
        });
    }

    async function init() {
        try {
            await gapi.client.init({
                'apiKey': 'AIzaSyC5kcL65DzLqwstR84oHalPLHqKhciBHiM',
                'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            });
            attachFormListener();
        } catch (error) {
            console.error("Error in initialization:", error);
        }
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

    async function writeData() {
        try {
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
            
            const response = await gapi.client.sheets.spreadsheets.values.append({
                'spreadsheetId': '1EJRkYBLShn6nPwk1G2yekgNnTFjblMWwxuz7AYaYtzU',
                'range': 'Sheet1!A1',
                'valueInputOption': 'RAW',
                'values': data,
            });
            
            alert('Data written to Google Sheet');
        } catch (error) {
            console.error("Error writing data:", error);
        }
    }
    
    loadClient().then(init).catch(error => console.error("Error loading client:", error));
});


    gapi.load('client', init);
});
