/**
 * Deribit API
 * #Overview  Deribit provides three different interfaces to access the API:  * [JSON-RPC over Websocket](#json-rpc) * [JSON-RPC over HTTP](#json-rpc) * [FIX](#fix-api) (Financial Information eXchange)  With the API Console you can use and test the JSON-RPC API, both via HTTP and  via Websocket. To visit the API console, go to __Account > API tab >  API Console tab.__   ##Naming Deribit tradeable assets or instruments use the following system of naming:  |Kind|Examples|Template|Comments| |----|--------|--------|--------| |Future|<code>BTC-25MAR16</code>, <code>BTC-5AUG16</code>|<code>BTC-DMMMYY</code>|<code>BTC</code> is currency, <code>DMMMYY</code> is expiration date, <code>D</code> stands for day of month (1 or 2 digits), <code>MMM</code> - month (3 first letters in English), <code>YY</code> stands for year.| |Perpetual|<code>BTC-PERPETUAL</code>                        ||Perpetual contract for currency <code>BTC</code>.| |Option|<code>BTC-25MAR16-420-C</code>, <code>BTC-5AUG16-580-P</code>|<code>BTC-DMMMYY-STRIKE-K</code>|<code>STRIKE</code> is option strike price in USD. Template <code>K</code> is option kind: <code>C</code> for call options or <code>P</code> for put options.|   # JSON-RPC JSON-RPC is a light-weight remote procedure call (RPC) protocol. The  [JSON-RPC specification](https://www.jsonrpc.org/specification) defines the data structures that are used for the messages that are exchanged between client and server, as well as the rules around their processing. JSON-RPC uses JSON (RFC 4627) as data format.  JSON-RPC is transport agnostic: it does not specify which transport mechanism must be used. The Deribit API supports both Websocket (preferred) and HTTP (with limitations: subscriptions are not supported over HTTP).  ## Request messages > An example of a request message:  ```json {     \"jsonrpc\": \"2.0\",     \"id\": 8066,     \"method\": \"public/ticker\",     \"params\": {         \"instrument\": \"BTC-24AUG18-6500-P\"     } } ```  According to the JSON-RPC sepcification the requests must be JSON objects with the following fields.  |Name|Type|Description| |----|----|-----------| |jsonrpc|string|The version of the JSON-RPC spec: \"2.0\"| |id|integer or string|An identifier of the request. If it is included, then the response will contain the same identifier| |method|string|The method to be invoked| |params|object|The parameters values for the method. The field names must match with the expected parameter names. The parameters that are expected are described in the documentation for the methods, below.|  <aside class=\"warning\"> The JSON-RPC specification describes two features that are currently not supported by the API:  <ul> <li>Specification of parameter values by position</li> <li>Batch requests</li> </ul>  </aside>   ## Response messages > An example of a response message:  ```json {     \"jsonrpc\": \"2.0\",     \"id\": 5239,     \"testnet\": false,     \"result\": [         {             \"currency\": \"BTC\",             \"currencyLong\": \"Bitcoin\",             \"minConfirmation\": 2,             \"txFee\": 0.0006,             \"isActive\": true,             \"coinType\": \"BITCOIN\",             \"baseAddress\": null         }     ],     \"usIn\": 1535043730126248,     \"usOut\": 1535043730126250,     \"usDiff\": 2 } ```  The JSON-RPC API always responds with a JSON object with the following fields.   |Name|Type|Description| |----|----|-----------| |id|integer|This is the same id that was sent in the request.| |result|any|If successful, the result of the API call. The format for the result is described with each method.| |error|error object|Only present if there was an error invoking the method. The error object is described below.| |testnet|boolean|Indicates whether the API in use is actually the test API.  <code>false</code> for production server, <code>true</code> for test server.| |usIn|integer|The timestamp when the requests was received (microseconds since the Unix epoch)| |usOut|integer|The timestamp when the response was sent (microseconds since the Unix epoch)| |usDiff|integer|The number of microseconds that was spent handling the request|  <aside class=\"notice\"> The fields <code>testnet</code>, <code>usIn</code>, <code>usOut</code> and <code>usDiff</code> are not part of the JSON-RPC standard.  <p>In order not to clutter the examples they will generally be omitted from the example code.</p> </aside>  > An example of a response with an error:  ```json {     \"jsonrpc\": \"2.0\",     \"id\": 8163,     \"error\": {         \"code\": 11050,         \"message\": \"bad_request\"     },     \"testnet\": false,     \"usIn\": 1535037392434763,     \"usOut\": 1535037392448119,     \"usDiff\": 13356 } ``` In case of an error the response message will contain the error field, with as value an object with the following with the following fields:  |Name|Type|Description |----|----|-----------| |code|integer|A number that indicates the kind of error.| |message|string|A short description that indicates the kind of error.| |data|any|Additional data about the error. This field may be omitted.|  ## Notifications  > An example of a notification:  ```json {     \"jsonrpc\": \"2.0\",     \"method\": \"subscription\",     \"params\": {         \"channel\": \"deribit_price_index.btc_usd\",         \"data\": {             \"timestamp\": 1535098298227,             \"price\": 6521.17,             \"index_name\": \"btc_usd\"         }     } } ```  API users can subscribe to certain types of notifications. This means that they will receive JSON-RPC notification-messages from the server when certain events occur, such as changes to the index price or changes to the order book for a certain instrument.   The API methods [public/subscribe](#public-subscribe) and [private/subscribe](#private-subscribe) are used to set up a subscription. Since HTTP does not support the sending of messages from server to client, these methods are only availble when using the Websocket transport mechanism.  At the moment of subscription a \"channel\" must be specified. The channel determines the type of events that will be received.  See [Subscriptions](#subscriptions) for more details about the channels.  In accordance with the JSON-RPC specification, the format of a notification  is that of a request message without an <code>id</code> field. The value of the <code>method</code> field will always be <code>\"subscription\"</code>. The <code>params</code> field will always be an object with 2 members: <code>channel</code> and <code>data</code>. The value of the <code>channel</code> member is the name of the channel (a string). The value of the <code>data</code> member is an object that contains data  that is specific for the channel.   ## Authentication  > An example of a JSON request with token:  ```json {     \"id\": 5647,     \"method\": \"private/get_subaccounts\",     \"params\": {         \"access_token\": \"67SVutDoVZSzkUStHSuk51WntMNBJ5mh5DYZhwzpiqDF\"     } } ```  The API consists of `public` and `private` methods. The public methods do not require authentication. The private methods use OAuth 2.0 authentication. This means that a valid OAuth access token must be included in the request, which can get achived by calling method [public/auth](#public-auth).  When the token was assigned to the user, it should be passed along, with other request parameters, back to the server:  |Connection type|Access token placement |----|-----------| |**Websocket**|Inside request JSON parameters, as an `access_token` field| |**HTTP (REST)**|Header `Authorization: bearer ```Token``` ` value|  ### Additional authorization method - basic user credentials  <span style=\"color:red\"><b> ! Not recommended - however, it could be useful for quick testing API</b></span></br>  Every `private` method could be accessed by providing, inside HTTP `Authorization: Basic XXX` header, values with user `ClientId` and assigned `ClientSecret` (both values can be found on the API page on the Deribit website) encoded with `Base64`:  <code>Authorization: Basic BASE64(`ClientId` + `:` + `ClientSecret`)</code>   ### Additional authorization method - Deribit signature credentials  The Derbit service provides dedicated authorization method, which harness user generated signature to increase security level for passing request data. Generated value is passed inside `Authorization` header, coded as:  <code>Authorization: deri-hmac-sha256 id=```ClientId```,ts=```Timestamp```,sig=```Signature```,nonce=```Nonce```</code>  where:  |Deribit credential|Description |----|-----------| |*ClientId*|Can be found on the API page on the Deribit website| |*Timestamp*|Time when the request was generated - given as **miliseconds**. It\'s valid for **60 seconds** since generation, after that time any request with an old timestamp will be rejected.| |*Signature*|Value for signature calculated as described below | |*Nonce*|Single usage, user generated initialization vector for the server token|  The signature is generated by the following formula:  <code> Signature = HEX_STRING( HMAC-SHA256( ClientSecret, StringToSign ) );</code></br>  <code> StringToSign =  Timestamp + \"\\n\" + Nonce + \"\\n\" + RequestData;</code></br>  <code> RequestData =  UPPERCASE(HTTP_METHOD())  + \"\\n\" + URI() + \"\\n\" + RequestBody + \"\\n\";</code></br>   e.g. (using shell with ```openssl``` tool):  <code>&nbsp;&nbsp;&nbsp;&nbsp;ClientId=AAAAAAAAAAA</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;ClientSecret=ABCD</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Timestamp=$( date +%s000 )</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Nonce=$( cat /dev/urandom | tr -dc \'a-z0-9\' | head -c8 )</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;URI=\"/api/v2/private/get_account_summary?currency=BTC\"</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;HttpMethod=GET</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Body=\"\"</code></br></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Signature=$( echo -ne \"${Timestamp}\\n${Nonce}\\n${HttpMethod}\\n${URI}\\n${Body}\\n\" | openssl sha256 -r -hmac \"$ClientSecret\" | cut -f1 -d\' \' )</code></br></br> <code>&nbsp;&nbsp;&nbsp;&nbsp;echo $Signature</code></br></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;shell output> ea40d5e5e4fae235ab22b61da98121fbf4acdc06db03d632e23c66bcccb90d2c  (**WARNING**: Exact value depends on current timestamp and client credentials</code></br></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;curl -s -X ${HttpMethod} -H \"Authorization: deri-hmac-sha256 id=${ClientId},ts=${Timestamp},nonce=${Nonce},sig=${Signature}\" \"https://www.deribit.com${URI}\"</code></br></br>    ### Additional authorization method - signature credentials (WebSocket API)  When connecting through Websocket, user can request for authorization using ```client_credential``` method, which requires providing following parameters (as a part of JSON request):  |JSON parameter|Description |----|-----------| |*grant_type*|Must be **client_signature**| |*client_id*|Can be found on the API page on the Deribit website| |*timestamp*|Time when the request was generated - given as **miliseconds**. It\'s valid for **60 seconds** since generation, after that time any request with an old timestamp will be rejected.| |*signature*|Value for signature calculated as described below | |*nonce*|Single usage, user generated initialization vector for the server token| |*data*|**Optional** field, which contains any user specific value|  The signature is generated by the following formula:  <code> StringToSign =  Timestamp + \"\\n\" + Nonce + \"\\n\" + Data;</code></br>  <code> Signature = HEX_STRING( HMAC-SHA256( ClientSecret, StringToSign ) );</code></br>   e.g. (using shell with ```openssl``` tool):  <code>&nbsp;&nbsp;&nbsp;&nbsp;ClientId=AAAAAAAAAAA</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;ClientSecret=ABCD</code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Timestamp=$( date +%s000 ) # e.g. 1554883365000 </code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Nonce=$( cat /dev/urandom | tr -dc \'a-z0-9\' | head -c8 ) # e.g. fdbmmz79 </code></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Data=\"\"</code></br></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;Signature=$( echo -ne \"${Timestamp}\\n${Nonce}\\n${Data}\\n\" | openssl sha256 -r -hmac \"$ClientSecret\" | cut -f1 -d\' \' )</code></br></br> <code>&nbsp;&nbsp;&nbsp;&nbsp;echo $Signature</code></br></br>  <code>&nbsp;&nbsp;&nbsp;&nbsp;shell output> e20c9cd5639d41f8bbc88f4d699c4baf94a4f0ee320e9a116b72743c449eb994  (**WARNING**: Exact value depends on current timestamp and client credentials</code></br></br>   You can also check the signature value using some online tools like, e.g: [https://codebeautify.org/hmac-generator](https://codebeautify.org/hmac-generator) (but don\'t forget about adding *newline* after each part of the hashed text and remember that you **should use** it only with your **test credentials**).   Here\'s a sample JSON request created using the values from the example above:  <code> {                            </br> &nbsp;&nbsp;\"jsonrpc\" : \"2.0\",         </br> &nbsp;&nbsp;\"id\" : 9929,               </br> &nbsp;&nbsp;\"method\" : \"public/auth\",  </br> &nbsp;&nbsp;\"params\" :                 </br> &nbsp;&nbsp;{                        </br> &nbsp;&nbsp;&nbsp;&nbsp;\"grant_type\" : \"client_signature\",   </br> &nbsp;&nbsp;&nbsp;&nbsp;\"client_id\" : \"AAAAAAAAAAA\",         </br> &nbsp;&nbsp;&nbsp;&nbsp;\"timestamp\": \"1554883365000\",        </br> &nbsp;&nbsp;&nbsp;&nbsp;\"nonce\": \"fdbmmz79\",                 </br> &nbsp;&nbsp;&nbsp;&nbsp;\"data\": \"\",                          </br> &nbsp;&nbsp;&nbsp;&nbsp;\"signature\" : \"e20c9cd5639d41f8bbc88f4d699c4baf94a4f0ee320e9a116b72743c449eb994\"  </br> &nbsp;&nbsp;}                        </br> }                            </br> </code>   ### Access scope  When asking for `access token` user can provide the required access level (called `scope`) which defines what type of functionality he/she wants to use, and whether requests are only going to check for some data or also to update them.  Scopes are required and checked for `private` methods, so if you plan to use only `public` information you can stay with values assigned by default.  |Scope|Description |----|-----------| |*account:read*|Access to **account** methods - read only data| |*account:read_write*|Access to **account** methods - allows to manage account settings, add subaccounts, etc.| |*trade:read*|Access to **trade** methods - read only data| |*trade:read_write*|Access to **trade** methods - required to create and modify orders| |*wallet:read*|Access to **wallet** methods - read only data| |*wallet:read_write*|Access to **wallet** methods - allows to withdraw, generate new deposit address, etc.| |*wallet:none*, *account:none*, *trade:none*|Blocked access to specified functionality|    <span style=\"color:red\">**NOTICE:**</span> Depending on choosing an authentication method (```grant type```) some scopes could be narrowed by the server. e.g. when ```grant_type = client_credentials``` and ```scope = wallet:read_write``` it\'s modified by the server as ```scope = wallet:read```\"   ## JSON-RPC over websocket Websocket is the prefered transport mechanism for the JSON-RPC API, because it is faster and because it can support [subscriptions](#subscriptions) and [cancel on disconnect](#private-enable_cancel_on_disconnect). The code examples that can be found next to each of the methods show how websockets can be used from Python or Javascript/node.js.  ## JSON-RPC over HTTP Besides websockets it is also possible to use the API via HTTP. The code examples for \'shell\' show how this can be done using curl. Note that subscriptions and cancel on disconnect are not supported via HTTP.  #Methods
 *
 * The version of the OpenAPI document: 2.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/// <reference types="node" />
import http = require('http');
import { Authentication } from '../model/models';
import { HttpBasicAuth } from '../model/models';
export declare enum TradingApiApiKeys {
}
export declare class TradingApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        default: Authentication;
        bearerAuth: HttpBasicAuth;
    };
    constructor(basePath?: string);
    constructor(username: string, password: string, basePath?: string);
    set useQuerystring(value: boolean);
    set basePath(basePath: string);
    get basePath(): string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: TradingApiApiKeys, value: string): void;
    set username(username: string);
    set password(password: string);
    /**
     *
     * @summary Places a buy order for an instrument.
     * @param instrumentName Instrument name
     * @param amount It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
     * @param type The order type, default: &#x60;\&quot;limit\&quot;&#x60;
     * @param label user defined label for the order (maximum 32 characters)
     * @param price &lt;p&gt;The order price in base currency (Only for limit and stop_limit orders)&lt;/p&gt; &lt;p&gt;When adding order with advanced&#x3D;usd, the field price should be the option price value in USD.&lt;/p&gt; &lt;p&gt;When adding order with advanced&#x3D;implv, the field price should be a value of implied volatility in percentages. For example,  price&#x3D;100, means implied volatility of 100%&lt;/p&gt;
     * @param timeInForce &lt;p&gt;Specifies how long the order remains in effect. Default &#x60;\&quot;good_til_cancelled\&quot;&#x60;&lt;/p&gt; &lt;ul&gt; &lt;li&gt;&#x60;\&quot;good_til_cancelled\&quot;&#x60; - unfilled order remains in order book until cancelled&lt;/li&gt; &lt;li&gt;&#x60;\&quot;fill_or_kill\&quot;&#x60; - execute a transaction immediately and completely or not at all&lt;/li&gt; &lt;li&gt;&#x60;\&quot;immediate_or_cancel\&quot;&#x60; - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled&lt;/li&gt; &lt;/ul&gt;
     * @param maxShow Maximum amount within an order to be shown to other customers, &#x60;0&#x60; for invisible order
     * @param postOnly &lt;p&gt;If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the bid.&lt;/p&gt; &lt;p&gt;Only valid in combination with time_in_force&#x3D;&#x60;\&quot;good_til_cancelled\&quot;&#x60;&lt;/p&gt;
     * @param reduceOnly If &#x60;true&#x60;, the order is considered reduce-only which is intended to only reduce a current position
     * @param stopPrice Stop price, required for stop limit orders (Only for stop orders)
     * @param trigger Defines trigger type, required for &#x60;\&quot;stop_limit\&quot;&#x60; order type
     * @param advanced Advanced option order type. (Only for options)
     */
    privateBuyGet(instrumentName: string, amount: number, type?: 'limit' | 'stop_limit' | 'market' | 'stop_market', label?: string, price?: number, timeInForce?: 'good_til_cancelled' | 'fill_or_kill' | 'immediate_or_cancel', maxShow?: number, postOnly?: boolean, reduceOnly?: boolean, stopPrice?: number, trigger?: 'index_price' | 'mark_price' | 'last_price', advanced?: 'usd' | 'implv', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Cancels all orders by currency, optionally filtered by instrument kind and/or order type.
     * @param currency The currency symbol
     * @param kind Instrument kind, if not provided instruments of all kinds are considered
     * @param type Order type - limit, stop or all, default - &#x60;all&#x60;
     */
    privateCancelAllByCurrencyGet(currency: 'BTC' | 'ETH', kind?: 'future' | 'option', type?: 'all' | 'limit' | 'stop', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Cancels all orders by instrument, optionally filtered by order type.
     * @param instrumentName Instrument name
     * @param type Order type - limit, stop or all, default - &#x60;all&#x60;
     */
    privateCancelAllByInstrumentGet(instrumentName: string, type?: 'all' | 'limit' | 'stop', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary This method cancels all users orders and stop orders within all currencies and instrument kinds.
     */
    privateCancelAllGet(options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Cancel an order, specified by order id
     * @param orderId The order id
     */
    privateCancelGet(orderId: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Makes closing position reduce only order .
     * @param instrumentName Instrument name
     * @param type The order type
     * @param price Optional price for limit order.
     */
    privateClosePositionGet(instrumentName: string, type: 'limit' | 'market', price?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Change price, amount and/or other properties of an order.
     * @param orderId The order id
     * @param amount It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
     * @param price &lt;p&gt;The order price in base currency.&lt;/p&gt; &lt;p&gt;When editing an option order with advanced&#x3D;usd, the field price should be the option price value in USD.&lt;/p&gt; &lt;p&gt;When editing an option order with advanced&#x3D;implv, the field price should be a value of implied volatility in percentages. For example,  price&#x3D;100, means implied volatility of 100%&lt;/p&gt;
     * @param postOnly &lt;p&gt;If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the bid.&lt;/p&gt; &lt;p&gt;Only valid in combination with time_in_force&#x3D;&#x60;\&quot;good_til_cancelled\&quot;&#x60;&lt;/p&gt;
     * @param advanced Advanced option order type. If you have posted an advanced option order, it is necessary to re-supply this parameter when editing it (Only for options)
     * @param stopPrice Stop price, required for stop limit orders (Only for stop orders)
     */
    privateEditGet(orderId: string, amount: number, price: number, postOnly?: boolean, advanced?: 'usd' | 'implv', stopPrice?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Get margins for given instrument, amount and price.
     * @param instrumentName Instrument name
     * @param amount Amount, integer for future, float for option. For perpetual and futures the amount is in USD units, for options it is amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
     * @param price Price
     */
    privateGetMarginsGet(instrumentName: string, amount: number, price: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieves list of user\'s open orders.
     * @param currency The currency symbol
     * @param kind Instrument kind, if not provided instruments of all kinds are considered
     * @param type Order type, default - &#x60;all&#x60;
     */
    privateGetOpenOrdersByCurrencyGet(currency: 'BTC' | 'ETH', kind?: 'future' | 'option', type?: 'all' | 'limit' | 'stop_all' | 'stop_limit' | 'stop_market', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieves list of user\'s open orders within given Instrument.
     * @param instrumentName Instrument name
     * @param type Order type, default - &#x60;all&#x60;
     */
    privateGetOpenOrdersByInstrumentGet(instrumentName: string, type?: 'all' | 'limit' | 'stop_all' | 'stop_limit' | 'stop_market', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieves history of orders that have been partially or fully filled.
     * @param currency The currency symbol
     * @param kind Instrument kind, if not provided instruments of all kinds are considered
     * @param count Number of requested items, default - &#x60;20&#x60;
     * @param offset The offset for pagination, default - &#x60;0&#x60;
     * @param includeOld Include in result orders older than 2 days, default - &#x60;false&#x60;
     * @param includeUnfilled Include in result fully unfilled closed orders, default - &#x60;false&#x60;
     */
    privateGetOrderHistoryByCurrencyGet(currency: 'BTC' | 'ETH', kind?: 'future' | 'option', count?: number, offset?: number, includeOld?: boolean, includeUnfilled?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieves history of orders that have been partially or fully filled.
     * @param instrumentName Instrument name
     * @param count Number of requested items, default - &#x60;20&#x60;
     * @param offset The offset for pagination, default - &#x60;0&#x60;
     * @param includeOld Include in result orders older than 2 days, default - &#x60;false&#x60;
     * @param includeUnfilled Include in result fully unfilled closed orders, default - &#x60;false&#x60;
     */
    privateGetOrderHistoryByInstrumentGet(instrumentName: string, count?: number, offset?: number, includeOld?: boolean, includeUnfilled?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieves initial margins of given orders
     * @param ids Ids of orders
     */
    privateGetOrderMarginByIdsGet(ids: Array<string>, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieve the current state of an order.
     * @param orderId The order id
     */
    privateGetOrderStateGet(orderId: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieves settlement, delivery and bankruptcy events that have affected your account.
     * @param currency The currency symbol
     * @param type Settlement type
     * @param count Number of requested items, default - &#x60;20&#x60;
     */
    privateGetSettlementHistoryByCurrencyGet(currency: 'BTC' | 'ETH', type?: 'settlement' | 'delivery' | 'bankruptcy', count?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieves public settlement, delivery and bankruptcy events filtered by instrument name
     * @param instrumentName Instrument name
     * @param type Settlement type
     * @param count Number of requested items, default - &#x60;20&#x60;
     */
    privateGetSettlementHistoryByInstrumentGet(instrumentName: string, type?: 'settlement' | 'delivery' | 'bankruptcy', count?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieve the latest user trades that have occurred for instruments in a specific currency symbol and within given time range.
     * @param currency The currency symbol
     * @param startTimestamp The earliest timestamp to return result for
     * @param endTimestamp The most recent timestamp to return result for
     * @param kind Instrument kind, if not provided instruments of all kinds are considered
     * @param count Number of requested items, default - &#x60;10&#x60;
     * @param includeOld Include trades older than 7 days, default - &#x60;false&#x60;
     * @param sorting Direction of results sorting (&#x60;default&#x60; value means no sorting, results will be returned in order in which they left the database)
     */
    privateGetUserTradesByCurrencyAndTimeGet(currency: 'BTC' | 'ETH', startTimestamp: number, endTimestamp: number, kind?: 'future' | 'option', count?: number, includeOld?: boolean, sorting?: 'asc' | 'desc' | 'default', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieve the latest user trades that have occurred for instruments in a specific currency symbol.
     * @param currency The currency symbol
     * @param kind Instrument kind, if not provided instruments of all kinds are considered
     * @param startId The ID number of the first trade to be returned
     * @param endId The ID number of the last trade to be returned
     * @param count Number of requested items, default - &#x60;10&#x60;
     * @param includeOld Include trades older than 7 days, default - &#x60;false&#x60;
     * @param sorting Direction of results sorting (&#x60;default&#x60; value means no sorting, results will be returned in order in which they left the database)
     */
    privateGetUserTradesByCurrencyGet(currency: 'BTC' | 'ETH', kind?: 'future' | 'option', startId?: string, endId?: string, count?: number, includeOld?: boolean, sorting?: 'asc' | 'desc' | 'default', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieve the latest user trades that have occurred for a specific instrument and within given time range.
     * @param instrumentName Instrument name
     * @param startTimestamp The earliest timestamp to return result for
     * @param endTimestamp The most recent timestamp to return result for
     * @param count Number of requested items, default - &#x60;10&#x60;
     * @param includeOld Include trades older than 7 days, default - &#x60;false&#x60;
     * @param sorting Direction of results sorting (&#x60;default&#x60; value means no sorting, results will be returned in order in which they left the database)
     */
    privateGetUserTradesByInstrumentAndTimeGet(instrumentName: string, startTimestamp: number, endTimestamp: number, count?: number, includeOld?: boolean, sorting?: 'asc' | 'desc' | 'default', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieve the latest user trades that have occurred for a specific instrument.
     * @param instrumentName Instrument name
     * @param startSeq The sequence number of the first trade to be returned
     * @param endSeq The sequence number of the last trade to be returned
     * @param count Number of requested items, default - &#x60;10&#x60;
     * @param includeOld Include trades older than 7 days, default - &#x60;false&#x60;
     * @param sorting Direction of results sorting (&#x60;default&#x60; value means no sorting, results will be returned in order in which they left the database)
     */
    privateGetUserTradesByInstrumentGet(instrumentName: string, startSeq?: number, endSeq?: number, count?: number, includeOld?: boolean, sorting?: 'asc' | 'desc' | 'default', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Retrieve the list of user trades that was created for given order
     * @param orderId The order id
     * @param sorting Direction of results sorting (&#x60;default&#x60; value means no sorting, results will be returned in order in which they left the database)
     */
    privateGetUserTradesByOrderGet(orderId: string, sorting?: 'asc' | 'desc' | 'default', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    /**
     *
     * @summary Places a sell order for an instrument.
     * @param instrumentName Instrument name
     * @param amount It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
     * @param type The order type, default: &#x60;\&quot;limit\&quot;&#x60;
     * @param label user defined label for the order (maximum 32 characters)
     * @param price &lt;p&gt;The order price in base currency (Only for limit and stop_limit orders)&lt;/p&gt; &lt;p&gt;When adding order with advanced&#x3D;usd, the field price should be the option price value in USD.&lt;/p&gt; &lt;p&gt;When adding order with advanced&#x3D;implv, the field price should be a value of implied volatility in percentages. For example,  price&#x3D;100, means implied volatility of 100%&lt;/p&gt;
     * @param timeInForce &lt;p&gt;Specifies how long the order remains in effect. Default &#x60;\&quot;good_til_cancelled\&quot;&#x60;&lt;/p&gt; &lt;ul&gt; &lt;li&gt;&#x60;\&quot;good_til_cancelled\&quot;&#x60; - unfilled order remains in order book until cancelled&lt;/li&gt; &lt;li&gt;&#x60;\&quot;fill_or_kill\&quot;&#x60; - execute a transaction immediately and completely or not at all&lt;/li&gt; &lt;li&gt;&#x60;\&quot;immediate_or_cancel\&quot;&#x60; - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled&lt;/li&gt; &lt;/ul&gt;
     * @param maxShow Maximum amount within an order to be shown to other customers, &#x60;0&#x60; for invisible order
     * @param postOnly &lt;p&gt;If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the bid.&lt;/p&gt; &lt;p&gt;Only valid in combination with time_in_force&#x3D;&#x60;\&quot;good_til_cancelled\&quot;&#x60;&lt;/p&gt;
     * @param reduceOnly If &#x60;true&#x60;, the order is considered reduce-only which is intended to only reduce a current position
     * @param stopPrice Stop price, required for stop limit orders (Only for stop orders)
     * @param trigger Defines trigger type, required for &#x60;\&quot;stop_limit\&quot;&#x60; order type
     * @param advanced Advanced option order type. (Only for options)
     */
    privateSellGet(instrumentName: string, amount: number, type?: 'limit' | 'stop_limit' | 'market' | 'stop_market', label?: string, price?: number, timeInForce?: 'good_til_cancelled' | 'fill_or_kill' | 'immediate_or_cancel', maxShow?: number, postOnly?: boolean, reduceOnly?: boolean, stopPrice?: number, trigger?: 'index_price' | 'mark_price' | 'last_price', advanced?: 'usd' | 'implv', options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
}
//# sourceMappingURL=tradingApi.d.ts.map