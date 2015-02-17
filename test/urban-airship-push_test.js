'use strict';

var UrbanAirshipPush = require('../lib/urban-airship-push.js');
var testConfig = require('./testConfig');
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

var isConfigValid = function() {
    return !!testConfig.key && !!testConfig.secret && !!testConfig.masterSecret;
};


exports.testChannelsDeviceListing = function(test) {
    if (!isConfigValid())
        return console.error('Please provide a test configuration');
    
    test.expect(2);
    
    urbanAirshipPush.channels.device_listing(null, function(err, data) {
        test.strictEqual(err, null);
        test.ok(data.ok);

        test.done();
    });  
};

exports.testChannelsDeviceLookup = function(test) {
    if (!isConfigValid())
        return console.error('Please provide a test configuration');

    test.expect(2);

    urbanAirshipPush.channels.device_listing(null, function(err, data) {
        var channels = data.channels;
        if (!channels || (channels && channels.length == 0))
            return console.error("Couldn't find a single channel to test device_lookup with.");

        var channel_id = channels[0].channel_id;

        urbanAirshipPush.channels.device_lookup(channel_id, function(err, data) {
            test.strictEqual(err, null);
            test.ok(data.ok);

            test.done();
        });
    });
};

exports.testPushValidate = function (test) {
    if (!isConfigValid()) {
        console.error('Please provide a test configuration');
        return;
    }

    test.expect(2);

    var data = {
        device_types: 'all',
        audience: 'all',
        notification: {
            alert: 'Blubb blub bla'
        }
    };

    urbanAirshipPush.push.validate(data, function (err, data) {
        test.strictEqual(err, null);
        test.ok(data.ok);

        test.done();
    });
};

exports.testPushSend = function (test) {
    if (!isConfigValid()) {
        console.error('Please provide a test configuration');
        return;
    }

    test.expect(2);

    var data = {
        device_types: 'all',
        audience: 'all',
        notification: {
            alert: 'Blubb blub bla'
        }
    };

    urbanAirshipPush.push.send(data, function (err, data) {
        test.strictEqual(err, null);
        test.ok(data.ok);

        test.done();
    });
};

exports.testSchedulePush = function (test) {
    if (!isConfigValid()) {
        console.error('Please provide a test configuration');
        return;
    }

    test.expect(2);

    var scheduleData = {
        "schedule" : {
            "local_scheduled_time" : "2015-04-01T12:00:00"
        },
        "push" : {
            "audience" : "all",
            "notification" : { "alert" : "OH HAI FUTURE PEOPLEZ" },
            "device_types" : "all"
        }
    };

    urbanAirshipPush.schedule.push(scheduleData, function (err, data) {
        test.strictEqual(err, null);
        test.ok(data.ok);

        test.done();
    });
};
