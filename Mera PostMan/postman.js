//Shayad Faltu ka function hai
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addedParamsCount = 0;


//hide params box initially
let paramsbox = document.getElementById("parameterBox");
paramsbox.style.display = "none";

//click on params box and hide the json box
let paramsradio = document.getElementById("paramsradio");
paramsradio.addEventListener("click", () => {
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parameterBox').style.display = "block";
})
//click on json and hide params
let jsonradio = document.getElementById("jsonradio");
jsonradio.addEventListener("click", () => {
    document.getElementById('parameterBox').style.display = "none";
    document.getElementById("params").style.display = "none";
    document.getElementById('requestJsonBox').style.display = "block";
})
// + button ka khel
let addparams = document.getElementById("addParam");
addparams.addEventListener("click", () => {
    let params = document.getE
    
    lementById('params');
    let string = `      <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterkey${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parametervalue${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Value">
                        </div>
                        <button type="button"  class="btn btn-primary deleteParam">-</button>
                        </div>`;

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // - button ka khel
    let deleteparam = document.getElementsByClassName('deleteParam');
    for (item of deleteparam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamsCount++;

});
//Submit Button ka khel
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    document.getElementById("responseJsonText").value = "Please Wait";
    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    //When Params Select
    if (contentType == "params") {
        data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1) != undefined)) {
                let key = document.getElementById('paramsKey' + (i + 1)).value;
                let value = document.getElementById('parametersvalue' + (i + 1));
                data[key] = value;
            }
            data = JSON.stringify(data);

        }

    }
    //whwn Json Select
    else {
        data = document.getElementById("requestJsonText").value;
        // console.log(data);
    }
    //request Type=Get
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.text())
            .then((text) => {
                // console.log(text);
                // console.log(data);
                document.getElementById('responseJsonText').value = text;
            });
    }
    //if requestType=Post
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }

});