'use strict';

var HTTP_RESPONSE_CODES = require('./../http-response-codes');
var REST_ENDPOINTS = {
	DEVICE_LISTING: '/api/channels'
};

var urbanAirshipConnection = require('./../urban-airship-connection');

/**
 * Create a ChannelsApi object that abstracts from the Urban Airship Channels
 * API V3.
 *
 * See http://docs.urbanairship.com/api/ua.html#device-listing
 * for more information.
 *
 * @param accessConfiguration An object containing key, secret and masterSecret
 * properties, where these properties define the authorization information
 * of your account.
 * @constructor
 */
var ChannelsApi = function (accessConfiguration) {
    this.accessConfiguration = accessConfiguration;
};

/**
 * Retrieve a list of channels.
 *
 * See http://docs.urbanairship.com/api/ua.html#device-listing
 * for more information.
 *
 * @param pagination An (optional) object that includes start and limit options
 * @param callback A callback function that is called after the request
 * has been made. It will receive as first parameter an error object in
 * case of an error, or null if everything worked out well. The second
 * parameter will be the answer returned by the Urban Airship API.
 */

ChannelsApi.prototype.device_listing = function (pagination, callback) {
    var options = {
        path: REST_ENDPOINTS.DEVICE_LISTING,
        method: 'GET',
        expectedStatusCode: HTTP_RESPONSE_CODES.ACCEPTED.OK,
        useMasterAuth: true,
        auth: this.accessConfiguration
    };
    urbanAirshipConnection.sendRequest(options, pagination, callback);
};

/**
 * Individual channel lookup.
 *
 * See http://docs.urbanairship.com/api/ua.html#individual-device-lookup
 * for more information.
 *
 * @param channel_id The channel ID in which you'd like to reterieve the information for.
 * @param callback A callback function that is called after the request
 * has been made. It will receive as first parameter an error object in
 * case of an error, or null if everything worked out well. The second
 * parameter will be the answer returned by the Urban Airship API.
 */


ChannelsApi.prototype.device_lookup = function(channel_id, callback) {
    var options = {
        path: REST_ENDPOINTS.DEVICE_LISTING + "/" + channel_id,
        method: 'GET',
        expectedStatusCode: HTTP_RESPONSE_CODES.ACCEPTED.OK,
        useMasterAuth: true,
        auth: this.accessConfiguration
    };
    urbanAirshipConnection.sendRequest(options, null, callback);
};

module.exports = ChannelsApi;
