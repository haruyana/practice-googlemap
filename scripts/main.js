/**
 * main.js
 */

(function($){

    var array = [
        ['1-施設名', '1-住所', '1-緯度', '1-経度', 'マーカー画像パス'],
        ['2-施設名', '2-住所', '2-緯度', '2-経度', 'マーカー画像パス'],
        ['3-施設名', '3-住所', '3-緯度', '3-経度', 'マーカー画像パス'],
        ['4-施設名', '4-住所', '4-緯度', '4-経度', 'マーカー画像パス']
    ];

    console.log(array[1].length);

  // GoogleMapAPI
    var latlng = new google.maps.LatLng(35.624650, 139.429159);
    var myOptions = {
      zoom: 18, // 拡大比率
      center: latlng, // マップの中心位置
      mapTypeId: google.maps.MapTypeId.ROADMAP // 表示タイプの指定（衛生写真等に変えられる）
    };
    var map = new google.maps.Map(document.getElementById('map'), myOptions);

  // オリジナルのアイコンを設定
     var icon = new google.maps.MarkerImage('/images/map_icon.png',
     new google.maps.Size(50,59), // アイコンサイズ
     new google.maps.Point(0,0),  // (origin)アイコン画像表示の起点
     new google.maps.Point(25,60) // (anchor)アイコン画像のどの座標を指定した緯度経度にあてるか　
     );
    var markerOptions = {
     position: latlng,
     map: map,
     icon: icon,
     title: 'サンリオピューロランド'
    };
    var marker = new google.maps.Marker(markerOptions);

    var markerData = [ // マーカーを立てる場所名・緯度・経度
      {
           name: 'サンリオピューロランド',
           lat: 35.624662,
            lng: 139.429170
     }, {
            name: 'ハーモニーランド',
         lat: 33.400167,
            lng: 131.546822
     }, {
            name: 'サンリオショップ名古屋ゲートタワーモール店',
         lat: 35.172233,
          lng: 136.882388,
          icon: 'tam.png' // マーカーの画像を変更
        }
    ];
    

   // 吹き出しを作成
     var contentString = '<h3 class="map_title">サンリオピューロランド</h3>' +
                         '<p class="map_comment">〒206-8588 東京都多摩市落合1丁目31</p>';
     var infowindow = new google.maps.InfoWindow({
         content: contentString  // 吹き出し内コメント
      });

    //アイコンをクリックしたら吹き出しが表示
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
      });

})(jQuery);
