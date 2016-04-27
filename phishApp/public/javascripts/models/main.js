
var phishYearModel = Backbone.Model.extend({

    defaults : {

        data : ''

    },

    search : function(year) {
        var self = this;

        $.ajax({
                url: "http://phish.in/api/v1/years/"+ year +"",
                beforeSend: function( xhr ) {
                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                }
            })
            .done(function( phishData ) {
                var phishDataParsed = JSON.parse(phishData);
                //phishDataParsed.data.forEach(function(e,i){
                //    self.set('data', e.location);
                //});
                var phishPlaceList=[];
                console.log('data',phishDataParsed);
                self.set('data',phishDataParsed.data[0].location );
                for (var i=0; i<phishDataParsed.data.length ; i++ ){
                    phishPlaceList.push(phishDataParsed.data[i].location);
                    //self.map(phishDataParsed.data[i].location);
                    if(phishPlaceList.length > 10) {
                        return self.lats(phishPlaceList)
                    }
                }

            });
    },

    lats : function(city){
        var self = this;
        console.log('city', city);
        var latArr = [];
        for(var i=0; i<city.length; i++) {
            console.log('here');
            $.ajax({
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + city[i] + "&key=AIzaSyAWVdwwYaifvHtZSbG6AKI1IF5HwLPzeHw",
                    beforeSend: function (xhr) {
                        xhr.overrideMimeType("text/plain; charset=x-user-defined");
                    }
                })
                .done(function (phishCor) {
                    var phishCorParsed = JSON.parse(phishCor),
                        lat = phishCorParsed.results[0].geometry.location.lat,
                        lng = phishCorParsed.results[0].geometry.location.lng;
                    var latObj = {latt: lat, lngs: lng};
                    latArr.push(latObj);
                    if(latArr.length>9){
                        return self.map(latArr);
                    }
                })

        }
    },

    //map : function(coordinates){
    //    console.log('coors', coordinates);
    //    for(var i=0; i<coordinates.length; i++){
    //        $.ajax({
    //                url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ coordinates[i] +"&key=AIzaSyAWVdwwYaifvHtZSbG6AKI1IF5HwLPzeHw",
    //                beforeSend: function( xhr ) {
    //                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
    //                }
    //            })
    //            .done(function(phishCor){
    //                console.log('newPhishData', JSON.parse(phishCor));
    //                var phishCorParsed = JSON.parse(phishCor),
    //                    lat = phishCorParsed.results[0].geometry.location.lat,
    //                    lng = phishCorParsed.results[0].geometry.location.lng,
    //                    map = new google.maps.Map(document.getElementById('map'), {
    //                    zoom: 4,
    //                    center: {lat: lat, lng: lng}
    //                });
    //
    //                var marker = new google.maps.Marker({
    //                    position: new google.maps.LatLng({lat: lat, lng: lng}),
    //                    map: map,
    //                    title: 'Hello World!'
    //                });
    //            });
    //    }
    //
    //}
    map : function(coordinates){

        var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 4,
                            center: {lat: coordinates[0].latt, lng: coordinates[0].lngs}
                        });
        var marker, i;
        for (i=0; i<coordinates.length; i++){
            marker = new google.maps.Marker({
                position: new google.maps.LatLng({lat: coordinates[i].latt,lng: coordinates[i].lngs}),
                map: map,
                title: 'Hello World!'
            });
        }

    }

});

var phishYear = new phishYearModel({});
