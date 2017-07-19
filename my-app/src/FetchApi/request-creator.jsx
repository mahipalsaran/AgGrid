module.exports = {
    /*
        createNewRequest function creates a fetch api based request.
        Paramaters accepted by the function are as following :
        _url -> url for the service endpoint
        _method -> POST/GET
        _payload -> accepts payload to be passed to the request
    */
    createNewRequest: (_url, _method, _payload) => {
        let _requestBody = {
            method: _method.toUpperCase(),
            credentials: 'include'
        };
        if (window.location.host.indexOf('.corp.apple.com') > -1) {
            _requestBody["headers"] = new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            });
        } else {
            _requestBody["headers"] = new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache": "no-cache"
            });
        }
        if (_method.toUpperCase() === 'POST') {
            _requestBody["body"] = JSON.stringify(_payload);
        }
        return (
            fetch(new Request(_url, _requestBody)).then((response) => {
                if (response.ok) {
                    return response.json().then((json) => {
                        return json.result;
                    });
                } else {
                    console.error('Error status: ', response.status);
                    console.error('Error statusText: ', response.statusText);
                    throw Error('While fetching ' + _url);
                }
            })
        )
    }
}
