let body = JSON.stringify({
    "order_id": "8cf27b55-53e8-6aba-9fb4-7c692e56ddee",
    "status": "checkout_incomplete",
    "purchase_country": "gb",
    "purchase_currency": "GBP",
    "locale": "en-GB",
    "billing_address": {
        "country": "gb"
    },
    "customer": {},
    "shipping_address": {
        "country": "gb"
    },
    "order_amount": 50000,
    "order_tax_amount": 4545,
    "order_lines": [{
        "type": "physical",
        "reference": "19-402-USA",
        "name": "Red T-Shirt",
        "quantity": 5,
        "quantity_unit": "pcs",
        "unit_price": 10000,
        "tax_rate": 1000,
        "total_amount": 50000,
        "total_discount_amount": 0,
        "total_tax_amount": 4545
    }],
    "merchant_urls": {
        "terms": "https://www.example.com/terms.html",
        "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
        "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
        "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
    },
    "html_snippet": "<div id=\"klarna-checkout-container\".................",
    "started_at": "2020-03-05T10:41:58Z",
    "last_modified_at": "2020-03-05T10:41:58Z",
    "options": {
        "allow_separate_shipping_address": false,
        "date_of_birth_mandatory": false,
        "require_validate_callback_success": false
    },
    "external_payment_methods": [],
    "external_checkouts": []
})


window.onload = function() {

    fetch('http://api.playground.klarna.com/checkout/v3/orders', {
                mode: 'no-cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + `********`,
                },
                body: body
            }

        )
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {

                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

        })
        .catch(error => {

            console.error('There was an error!', error);
        });
}
