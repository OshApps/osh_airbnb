module.exports = {
    get,
    post
}


function post(url, data){

    return fetchJsonData(url, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
      
}

function get(...urls){

    if(urls.length === 0)
        {
        throw new Error("Missing required parameters: You must pass at least one url.")
        }

    let init={
            method: "GET",
            credentials: 'include'
        }

    if(urls.length > 1)
        {
        return Promise.all( urls.map( (url)=> fetchJsonData(url, init) ) )  
        }
    
    return fetchJsonData(urls[0], init)   
}


function fetchJsonData(url, init){
    return fetch(url, init)
        .then( response => {

            if(response.ok) 
                {
                return response.json();
                }

            throw new Error('Network response was not ok.');
            })
}

