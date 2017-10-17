/**
 * main.js
 */

(function($){
  // GoogleMapAPI
    var map;
    var latlng = new google.maps.LatLng(35.917852, 137.982018);

    map = new google.maps.Map(document.getElementById('map'),{
      zoom: 6, // 拡大比率
      center: latlng, // マップの中心位置
      mapTypeId: google.maps.MapTypeId.ROADMAP // 表示タイプの指定（衛生写真等に変えられる）
    });
  // jsonを読込
    var marker = [];
    var data = [];
    var icon = [];
    var infoWindow = [];
    var type = [];
    var infoWindow = [];
    var currentInfoWindow = null;

    $.getJSON("scripts/data.json", function(json){
      for (var i = 0; i <= json.length-1; i++) {
        data.push(
            {
              'name': json[i].name,
              'lat': json[i].lat,
              'lng': json[i].lng,
              'icon': json[i].icon,
              'type': json[i].type
            }
          );
        };
        for (var i = 0; i < data.length; i++) {
          markerLatLng = new google.maps.LatLng({lat: json[i]['lat'], lng: json[i]['lng']}); // 緯度経度のデータ作成
          marker[i] = new google.maps.Marker({ // マーカーの追加
          position: markerLatLng, // マーカーを立てる位置を指定
          map: map, // マーカーを立てる地図を指定
          icon: {
            url: json[i]['icon']// マーカーの画像を変更
         }
        });

        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
           content: '<div class="ballon_content">' + json[i]['content'] + '</div>' // 吹き出しに表示する内容
        });
        markerEvent(i); // マーカーにクリックイベントを追加

       }
    });
     function markerEvent(i) {
         marker[i].addListener('click', function() { // マーカーをクリックしたとき
           if (currentInfoWindow) {
             currentInfoWindow.close(); // 他の情報ウィンドウが開いていたら閉じる
           }
           infoWindow[i].open(map, marker[i]); // 吹き出しの表示
           currentInfoWindow = infoWindow[i];
       });
     }

     // ジオコーディング
     var getMap = (function() {
       function codeAddress(address) {
         // google.maps.Geocoder()コンストラクタのインスタンスを生成
         var geocoder = new google.maps.Geocoder();
         map = new google.maps.Map(document.getElementById('map'),{
           zoom: 16, // 拡大比率
           center: latlng, // マップの中心位置
           mapTypeId: google.maps.MapTypeId.ROADMAP // 表示タイプの指定（衛生写真等に変えられる）
         });

         $.getJSON("scripts/data.json", function(json){
           for (var i = 0; i <= json.length-1; i++) {
             data.push(
                 {
                   'name': json[i].name,
                   'lat': json[i].lat,
                   'lng': json[i].lng,
                   'icon': json[i].icon,
                   'type': json[i].type
                 }
               );
             };
             for (var i = 0; i < data.length; i++) {
               markerLatLng = new google.maps.LatLng({lat: json[i]['lat'], lng: json[i]['lng']}); // 緯度経度のデータ作成
               marker[i] = new google.maps.Marker({ // マーカーの追加
               position: markerLatLng, // マーカーを立てる位置を指定
               map: map, // マーカーを立てる地図を指定
               icon: {
                 url: json[i]['icon']// マーカーの画像を変更
              }
             });

             infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                content: '<div class="ballon_content">' + json[i]['content'] + '</div>' // 吹き出しに表示する内容
             });
             markerEvent(i); // マーカーにクリックイベントを追加

            }
         });

         // geocoder.geocode()メソッドを実行
         geocoder.geocode( { 'address': address}, function(results, status) {

           if (status == google.maps.GeocoderStatus.OK) { // ジオコーディングが成功した場合
            // google.maps.Map()コンストラクタに定義されているsetCenter()メソッドで変換した緯度・経度情報を地図の中心に表示
            map.setCenter(results[0].geometry.location);
           } else { // ジオコーディングが成功しなかった場合
             console.log('Geocode was not successful for the following reason: ' + status);
           }
         });
       }
       return {
         getAddress: function() {
           // ボタンに指定したid要素を取得
           var button = document.getElementById("button");
           // ボタンが押された時の処理
           button.onclick = function() {
             // フォームに入力された住所情報を取得
             var address = document.getElementById("address").value;
             // 取得した住所を引数に指定してcodeAddress()関数を実行
             codeAddress(address);
           }
         }
       };
     })();
     getMap.getAddress();
})(jQuery);
