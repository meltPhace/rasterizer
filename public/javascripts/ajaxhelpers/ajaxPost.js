define ([], function () {

   var ajaxPost = function (url, params) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);

            xhr.onload = function () {
                if(xhr.status == 200){
                    resolve(xhr.responseText);
                }
                else reject(Error(xhr.statusText));
            };
            xhr.send(params);
        });
    }

    return ajaxPost;
});