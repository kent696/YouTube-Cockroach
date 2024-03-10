window.onload = function () {
    var linksToMonitor = document.querySelectorAll('.YT-button, .DC-button, .CH-button, .container a');
    //, .ME-button
    
    // 監聽每個連結的點擊事件
    linksToMonitor.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // 取得連結的 href 屬性
            var targetFilePath = event.target.getAttribute('href');

            // 建立一個 XMLHttpRequest 物件
            var xhr = new XMLHttpRequest();

            // 設定當請求完成時的處理函式
            xhr.onreadystatechange = function () {
                console.log('狀態變化:', xhr.readyState);

                if (xhr.readyState == 4) {
                    // 记录状态和响应以进行调试
                    console.log('最终状态:', xhr.status);
                    console.log('响应:', xhr.responseText);

                    // 如果 HTTP 狀態碼為 404，表示檔案不存在
                    if (xhr.status == 404) {
                        // 導向到指定的 HTML 檔案
                        window.location.href = '404.html';
                    } else {
                        // 檔案存在，導向目標 HTML 檔案
                        window.location.href = targetFilePath;
                    }
                }
            };

            // 發送 HTTP GET 請求
            xhr.open('GET', targetFilePath, true);
            xhr.send();

            // 取消默認行為，防止點擊連結後頁面跳轉
            event.preventDefault();
        });
    });
};
