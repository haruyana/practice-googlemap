/**
 * main.js
 */

(function($){

  // GoogleMapAPI
    var latlng = new google.maps.LatLng(35.624650, 139.429159);
    var myOptions = {
      zoom: 6, // 拡大比率
      center: latlng, // マップの中心位置
      mapTypeId: google.maps.MapTypeId.ROADMAP // 表示タイプの指定（衛生写真等に変えられる）
    };
    var map = new google.maps.Map(document.getElementById('map'), myOptions);

  // アイコンを設定
    var map;
    var marker = [];
    var infoWindow = [];
    $.getJSON("/scripts/data.json", function(json){
      for (var i = 0; i <= json.length-1; i++) {
        data.push(
            {
              'name': json[i].name,
              'lat': json[i].lat,
              'lng': json[i].lng
            }
          );
        };
        for (var i = 0; i < markerData.length; i++) {
          markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
          marker[i] = new google.maps.Marker({ // マーカーの追加
          position: markerLatLng, // マーカーを立てる位置を指定
          map: map // マーカーを立てる地図を指定
        });

        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
           content: '<div class="map">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
        });
        markerEvent(i); // マーカーにクリックイベントを追加
       }
    });


     // マーカーにクリックイベントを追加
     function markerEvent(i) {
         marker[i].addListener('click', function() { // マーカーをクリックしたとき
           infoWindow[i].open(map, marker[i]); // 吹き出しの表示
       });
     }
})(jQuery);
