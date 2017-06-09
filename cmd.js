// start mongo shell without db
mongo --nodb

printjson(x)

db.products.find({}).limit(2)

db.products.find({}).limit(4).skip(2)

db.products.find({},{_id:0,name:1,type:1})

// another pretty printing
db.products.find({},{limits:1}).toArray()

db.products.findOne({ "_id" : ObjectId("507d95d5719dbef170f15c01")})

db.products.find( {price:200} , {name:1,price:1})

db.products.find( {price:{$gte:200}} , {name:1,price:1})

db.products.find( {price:{$gte:200},available:true} , {name:1,price:1,available:1})

// return where "for" field exists
db.products.find( {for:{$exists:true}} , {name:1,price:1,for:1})

db.products.find( {for:'ac3'} , {name:1,price:1,for:1})

//desc sort
db.products.find({},{name:1,price:1}).sort({price:-1})

//asc sort
db.products.find({},{name:1,price:1}).sort({price:-1})


for (var i = 0; i < 20000; i++) { db.test.insert({x:i,y:'hi'}); }
db.test.count()

db.test.find().skip(2).limit(3)
//is same as
db.test.find().limit(3).skip(2)

db.test.find().sort({x:-1}).limit(3).skip(2)

// help on returned cursor object
db.test.find().help()

var cursor = db.test.find();
cursor.hasNext()
cursor.next()

// small script
{
.. var cursor = db.test.find().limit(50);
.. while(cursor.hasNext()){
.. 	print ("x:" + cursor.next().x);
.. }
}

// to know max object size supported currently 16777216
db.isMaster().maxBsonObjectSize

> x = {'name':'Bluetooth Headset 509',type:['accessory','headset'],price:30};
{
        "name" : "Bluetooth Headset 509",
        "type" : [
                "accessory",
                "headset"
        ],
        "price" : 30
}
> db.products.insert(x);

> db.getLastError()
null

> db.getLastError
function (w, wtimeout) {
    var res = this.getLastErrorObj(w, wtimeout);
    if (!res.ok) {
        throw "getlasterror failed: " + tojson(res);
    }
    return res.err;
}

> db.getLastErrorObj()
{ "n" : 0, "connectionId" : 1, "err" : null, "ok" : 1 }

db.products.find({},{_id:1})

> db.products.getIndexes();
[
        {
                "v" : 1,
                "key" : {
                        "_id" : 1
                },
                "ns" : "pcat.products",
                "name" : "_id_"
        }
]

> db.products.insert({_id:'ac3'})
E11000 duplicate key error index: pcat.products.$_id_  dup key: { : "ac3" }
> db.getLastError()
null
> db.products.insert({_id:'ac3'})
E11000 duplicate key error index: pcat.products.$_id_  dup key: { : "ac3" }
> db.getLastError()
E11000 duplicate key error index: pcat.products.$_id_  dup key: { : "ac3" }
> db.getLastError()
E11000 duplicate key error index: pcat.products.$_id_  dup key: { : "ac3" }
> db.getLastErrorObj()
{ "n" : 0, "connectionId" : 1, "err" : null, "ok" : 1 }
> db.getLastErrorObj()
{ "n" : 0, "connectionId" : 1, "err" : null, "ok" : 1 }
> db.products.insert({_id:'ac3'})
E11000 duplicate key error index: pcat.products.$_id_  dup key: { : "ac3" }
> db.getLastErrorObj()
{
        "err" : "E11000 duplicate key error index: pcat.products.$_id_  dup key: { : \"ac3\" }",
        "code" : 11000,
        "n" : 0,
        "connectionId" : 1,
        "ok" : 1
}
> db.getLastErrorObj
function (w, wtimeout) {
    var cmd = {getlasterror:1};
    if (w) {
        cmd.w = w;
        if (wtimeout) {
            cmd.wtimeout = wtimeout;
        }
    }
    var res = this.runCommand(cmd);
    if (!res.ok) {
        throw "getlasterror failed: " + tojson(res);
    }
    return res;
}

> t=db.test
pcat.test
> t.insert({x:"hello"})
> t.insert({x:"hello"})
> t.insert({x:"hello"})
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello" }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
> t.insert({_id:100, x:'hello'})
> t.insert({_id:101, x:'hello'})
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello" }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 100, "x" : "hello" }
{ "_id" : 101, "x" : "hello" }

> t.update({_id:100},{_id:100,x:"hello world", y:123})
> t.update({_id:100},{_id:199,x:"hello world", y:123})
cannot change _id of a document old:{ _id: 100.0, x: "hello world", y: 123.0 } new:{ _id: 199.0, x:
 "hello world", y: 123.0 }

 > myobj = t.findOne()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello" }
> myobj
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello" }
> myobj.y=123
123
> myobj
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 123 }
> t.update({_id:myobj.id},myobj)
> t.find()

> myobj
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 123 }
> myobj.y=400
400
> myobj
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
> t.save(myobj)
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 101, "x" : "hello" }
{ "_id" : 100, "x" : "hello world", "y" : 123 }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }

> t.save
function (obj) {
    if (obj == null || typeof obj == "undefined") {
        throw "can't save a null";
    }
    if (typeof obj == "number" || typeof obj == "string") {
        throw "can't save a number or string";
    }
    if (typeof obj._id == "undefined") {
        obj._id = new ObjectId;
        return this.insert(obj);
    } else {
        return this.update({_id:obj._id}, obj, true);
    }
}

> t.update({_id:101},{$set:{y:100}})
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 100, "x" : "hello world", "y" : 123 }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "x" : "hello", "y" : 100 }
> mydoc = {$set:{y:100}}
{ "$set" : { "y" : 100 } }
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 100, "x" : "hello world", "y" : 123 }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "x" : "hello", "y" : 100 }
> t.update({_id:101},{$inc:{y:1}})
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 100, "x" : "hello world", "y" : 123 }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "x" : "hello", "y" : 101 }
> t.update({_id:101},{$push:{arr:"hi"}})
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 100, "x" : "hello world", "y" : 123 }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "arr" : [ "hi" ], "x" : "hello", "y" : 101 }
> t.update({_id:101},{$push:{arr:"hi"}})
> t.update({_id:101},{$push:{arr:"hi"}})
> t.update({_id:101},{$push:{arr:"hi"}})
> t.update({_id:101},{$push:{arr:"hi"}})
> t.update({_id:101},{$push:{arr:"hi"}})
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 100, "x" : "hello world", "y" : 123 }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "arr" : [ "hi", "hi", "hi", "hi", "hi", "hi" ], "x" : "hello", "y" : 101 }
> t.update({_id:101},{$addToSet:{arr:"bye"}})
> t.update({_id:101},{$addToSet:{arr:"bye"}})
> t.update({_id:101},{$addToSet:{arr:"bye"}})
> t.update({_id:101},{$addToSet:{arr:"bye"}})
> t.update({_id:101},{$addToSet:{arr:"bye"}})
> t.update({_id:101},{$addToSet:{arr:"bye"}})
> t.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : 100, "x" : "hello world", "y" : 123 }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "arr" : [ "hi", "hi", "hi", "hi", "hi", "hi", "bye" ], "x" : "hello", "y" : 101 }

> db.test.find({_id:100})
{ "_id" : 100, "x" : "hello world", "y" : 123 }
> db.test.find({_id:100}).count()
1
> db.test.remove({_id:100})
> db.test.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "arr" : [ "hi", "hi", "hi", "hi", "hi", "hi", "bye" ], "x" : "hello", "y" : 101 }
> db.test.remove({})
> db.test.find()

> db.test2.find()
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f28"), "x" : "hello" }
{ "_id" : ObjectId("510fc0ea5e5c9a60b0fc8f29"), "x" : "hello" }
{ "_id" : ObjectId("510fc0e95e5c9a60b0fc8f27"), "x" : "hello", "y" : 400 }
{ "_id" : 101, "arr" : [ "hi", "hi", "hi", "hi", "hi", "hi", "bye" ], "x" : "hello", "y" : 101 }
> db.test2.remove({x:/ello/})
> db.getLastErrorObj()
{ "n" : 0, "connectionId" : 4, "err" : null, "ok" : 1 }
> db.test2.find()

> t = db.pageviews
pcat.pageviews
> t.find()
> t.update({_id: '/sports/footbal'},{$inc: {views:1}},true)
> t.find()
{ "_id" : "/sports/footbal", "views" : 1 }
> t.update({_id: '/sports/footbal'},{$inc: {views:1}},true)
> t.update({_id: '/sports/footbal'},{$inc: {views:1}},true)
> t.update({_id: '/sports/footbal'},{$inc: {views:1}},true)
> t.update({_id: '/sports/footbal'},{$inc: {views:1}},true)
> t.find()
{ "_id" : "/sports/footbal", "views" : 5 }
> t = db.pageviews
pcat.pageviews
> t.find()
> t.update({_id: '/sports/football'},{$inc: {views:1}},true)
> t.find()
{ "_id" : "/sports/footbal", "views" : 1 }
> t.update({_id: '/sports/football'},{$inc: {views:1}},true)
> t.update({_id: '/sports/football'},{$inc: {views:1}},true)
> t.update({_id: '/sports/footbal'},{$inc: {views:1}},true)
> t.update({_id: '/sports/football'},{$inc: {views:1}},true)
> t.find()
{ "_id" : "/sports/footbal", "views" : 5 }

> t.update({_id: '/sports/tennis'},{$inc: {clicks:1}},true)
> t.find()
{ "_id" : "/sports/footbal", "views" : 5 }
{ "_id" : "/sports/tennis", "clicks" : 1, "views" : 2 }

> db.runCommand({getLastError:1})
{ "n" : 0, "connectionId" : 4, "err" : null, "ok" : 1 }

> db.runCommand( {isMaster:1} )
{
        "ismaster" : true,
        "maxBsonObjectSize" : 16777216,
        "localTime" : ISODate("2013-02-04T15:32:52.471Z"),
        "ok" : 1
}
> db.runCommand("isMaster")
{
        "ismaster" : true,
        "maxBsonObjectSize" : 16777216,
        "localTime" : ISODate("2013-02-04T15:33:23.021Z"),
        "ok" : 1
}
> db.isMaster()
{
        "ismaster" : true,
        "maxBsonObjectSize" : 16777216,
        "localTime" : ISODate("2013-02-04T15:33:30.691Z"),
        "ok" : 1
}
> db.isMaster
function () {
    return this.runCommand("isMaster");
}
>

> db.serverStatus
function () {
    return this._adminCommand("serverStatus");
}

> db.serverStatus()

// whats running on the server currently right now
> db.currentOp()
{ "inprog" : [ ] }
>

> db.killOp
function (op) {
    if (!op) {
        throw "no opNum to kill specified";
    }
    return this.$cmd.sys.killop.findOne({op:op});
}

> db.products.ensureIndex( {name:1} )
> db.products.find({name:'AC3 Case Red'})
{ "_id" : ObjectId("507d95d5719dbef170f15bfd"), "name" : "AC3 Case Red", "type" : [ "accessory", "c
ase" ], "color" : "red", "price" : 12, "warranty_years" : 0.25, "available" : true, "for" : "ac3" }

> db.products.find({name:'AC3 Case Red'}).explain()
{
        "cursor" : "BtreeCursor name_1",
        "isMultiKey" : false,
        "n" : 1,
        "nscannedObjects" : 1,
        "nscanned" : 1,
        "nscannedObjectsAllPlans" : 1,
        "nscannedAllPlans" : 1,
        "scanAndOrder" : false,
        "indexOnly" : false,
        "nYields" : 0,
        "nChunkSkips" : 0,
        "millis" : 0,
        "indexBounds" : {
                "name" : [
                        [
                                "AC3 Case Red",
                                "AC3 Case Red"
                        ]
                ]
        },
        "server" : "majid-TLaptop:27017"
}

> db.products.getIndexes()
[
        {
                "v" : 1,
                "key" : {
                        "_id" : 1
                },
                "ns" : "pcat.products",
                "name" : "_id_"
        },
        {
                "v" : 1,
                "key" : {
                        "name" : 1
                },
                "ns" : "pcat.products",
                "name" : "name_1"
        }
]
>

> db.system.indexes.find()
{ "v" : 1, "key" : { "_id" : 1 }, "ns" : "pcat.products", "name" : "_id_" }
{ "v" : 1, "key" : { "_id" : 1 }, "ns" : "pcat.test", "name" : "_id_" }
{ "v" : 1, "key" : { "_id" : 1 }, "ns" : "pcat.test2", "name" : "_id_" }
{ "v" : 1, "key" : { "_id" : 1 }, "ns" : "pcat.pageviews", "name" : "_id_" }
{ "v" : 1, "key" : { "name" : 1 }, "ns" : "pcat.products", "name" : "name_1" }

> db.products.dropIndex({name:1})
{ "nIndexesWas" : 2, "ok" : 1 }
> db.products.getIndexes()
[
        {
                "v" : 1,
                "key" : {
                        "_id" : 1
                },
                "ns" : "pcat.products",
                "name" : "_id_"
        }
]
>

> db.test.stats()
{
        "ns" : "pcat.test",
        "count" : 0,
        "size" : 0,
        "storageSize" : 4096,
        "numExtents" : 1,
        "nindexes" : 1,
        "lastExtentSize" : 4096,
        "paddingFactor" : 1.0090000000000003,
        "systemFlags" : 1,
        "userFlags" : 0,
        "totalIndexSize" : 8176,
        "indexSizes" : {
                "_id_" : 8176
        },
        "ok" : 1
}

> db.system.namespaces.find()
{ "name" : "pcat.products" }
{ "name" : "pcat.system.indexes" }
{ "name" : "pcat.products.$_id_" }
{ "name" : "pcat.test.$_id_" }
{ "name" : "pcat.test" }
{ "name" : "pcat.test2.$_id_" }
{ "name" : "pcat.test2" }
{ "name" : "pcat.pageviews.$_id_" }
{ "name" : "pcat.pageviews" }

> show dbs
blog    0.0625GB
local   (empty)
m101    0.0625GB
pcat    0.0625GB
pcat1   0.0625GB
reddit  0.0625GB
school  0.0625GB
students        0.0625GB
test    0.0625GB
> db.runCommand({listDatabases:1})
{ "errmsg" : "access denied; use admin db", "ok" : 0 }
> use admin
switched to db admin
> db.runCommand({listDatabases:1})
{
        "databases" : [
                {
                        "name" : "blog",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "m101",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "pcat",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "pcat1",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "reddit",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "school",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "students",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "test",
                        "sizeOnDisk" : 67108864,
                        "empty" : false
                },
                {
                        "name" : "local",
                        "sizeOnDisk" : 1,
                        "empty" : true
                }
        ],
        "totalSize" : 536870912,
        "ok" : 1
}
>

db.users.insert({_id:"joe","joined":ISODate("2012-02-03-T00:00:00Z"), "likes" :["tennis","golf"]})
db.users.insert({_id:"jane","joined":ISODate("2012-02-09-T00:00:00Z"), "likes" :["tennis","golf"]})
db.users.insert({_id:"rames","joined":ISODate("2012-05-05-T00:00:00Z"), "likes" :["basketball"]})
db.users.insert({_id:"john","joined":ISODate("2012-03-05-T00:00:00Z"), "likes" :[]})
db.users.insert({_id:"mary","joined":ISODate("2012-03-22-T00:00:00Z"), "likes" :["golf","sailing"]})
db.users.insert({_id:"ann","joined":ISODate("2012-01-22-T00:00:00Z"), "likes" :["golf","basketball"]})
db.users.insert({_id:"jim","joined":ISODate("2012-11-01-T00:00:00Z"), "likes" :["tennis","fishing","golf","snowboard","football"]})

t=db.users

t.aggregate( [ 
    { $project:{_id:1} } 
    ] 
)

t.aggregate( [ { $project:{name:{$toUpper:"$_id"}, _id:0} } ] )

t.aggregate( [ 
    { $project:{name:{$toUpper:"$_id"}, _id:0} },
    { $sort:{name:1} } 
    ] )

t.aggregate( [   { $project:{month_joined:{$month: "$joined"} } }] )
t.aggregate( [   { $project:{joined:1,month_joined:{$month: "$joined"} } }] )

t.aggregate( [   { $project:{joined:1,month_joined:{$month: "$joined"} } },
    {$sort:{month_joined:1}}] )

t.aggregate( [   { $project:{joined:1,month_joined:{$month: "$joined"} } },{$s
ort:{month_joined:1}},{$limit:4}] )

t.aggregate( [   { $project:{joined:1,month_joined:{$month: "$joined"}, name:"$_id", _id:0 } },{$sort:{month_joined:1}}] )

t.aggregate( [   { $project:{month_joined:{$month: "$joined"} } },{$group:{_id:"$month_joined",n:{$sum:1}}},{$sort:{n:-1}}] )
t.aggregate( [   { $project:{month_joined:{$month: "$joined"} } },{$group:{_id:{month_joined:"$month_joined"},n:{$sum:1}}},{$sort:{n:-1}}] )
t.aggregate( [   { $project:{month_joined:{$month: "$joined"} } },{$group:{_id:{month_joined:"$month_joined"},n:{$sum:1}}},{$sort:{n:-1}},{$limit:5}] )

t.aggregate([{$unwind:"$likes"}])

t.aggregate([
    {$unwind:"$likes"},
    {$group:{_id:"$likes", n:{$sum:1}}},
    {$sort:{n:-1}},
    {$limit:5}
])

db.users.find( {_id:{$in:["john","joe"]}} )

db.users.find( {_id:{$nin:["john","joe"]}} )

db.users.find({likes: 'golf'})
db.users.find({likes: {$in:['golf','tennis']}})

db.users.find({$and:{$likes: "tennis"},{$likes:"golf"}})

db.users.find({$and:[{"likes": "tennis"},{"likes":"golf"}]})

db.users.find({likes: {$all :["golf","tennis"]}})

// first like is tennis
db.users.find({"likes.0": 'tennis'})

t = db.my_queue
test.my_queue

t.insert({ts:new Date(), job : "a", notes: "just a test of findandmodify"})
t.insert({ts:new Date(), job : "b"})
t.insert({ts:new Date(), job : "c"})
t.insert({ts:new Date(), job : "d"})
t.insert({ts:new Date(), job : "e"})

t.find().sort({ts:1})

t.findAndModify({ sort: {ts: 1}, remove: true})

t.findAndModify({ query: {status: null}, update: {$set: {status:'inprogress'}}, sort:{ts:1}})
t.findAndModify({ query: {status: null}, update: {$set: {status:'inprogress'}}, sort:{ts:1}})

t.update({"job":"b"},{$set:{status:"complete"}})

t.ensureIndex( {status:1, ts:1} )

// https://gist.github.com/anonymous/947786

// for Map Reduce
db.things.insert( {_id:1, tags:['dog', 'cat'] })
db.things.insert( {_id:2, tags:['cat'] })
db.things.insert( {_id:3, tags:['mouse','cat','dog'] })
db.things.insert( {_id:4, tags:[] })

// Map function
m = function() {
    this.tags.forEach(
        function(z) {
            emit(z, {count:1});
        }
    );
};

function emit(k,v) {
    print("emit");
    print(" k:" + k + " v:" + tojson(v));
}

x = db.things.findOne()
m.apply(x)

// Reduce Function
r = function(key, values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i].count;
    }
    return {count: total};

};

r ("dog",  [ {count:1},{count:1}, {count:3}] )

res = db.things.mapReduce(m, r, {out:{inline:1}})

// www.mongodb.org/display/DOCS/MapReduce

//homework 3.1
db.zips.aggregate( [  {$group:{_id:{state:"$state"},     n:{$sum:1}}} ,   {$sort:{n:-1}} ,   {$limit:4} ]  )

//homework 3.2
db.zips.aggregate( 
...   [
...     { $project : { _id : { $substr : ["$_id",0,1] } } } , 
...     { $group : { _id : "$_id", n : {$sum:1} } }
...   ]
... )

//TODO homework 3.4

// To connect to a database from mongo shell and ran some query
(new Mongo('localhost:27001')).getDB('test').foo.count()

db.oplog.rs.find().limit(4)

// Replication Test/Activities
rs.help()

rs.initiate(cfg)
rs.status()
rs.conf()
db.system.replset.find().pretty()
// on primary
db
db.foo.find()
db.foo.insert({str:"Hi there"})
db.foo.insert({str:"Hi", x:3})
db.foo.find()

// on slave
mongo --port 27002
db.foo.find()
rs.slaveOk()

//on master
db.foo.insert({x:99})
db.foo.update({x:3},{$set:{y:2}})
db.foo.remove({str:/there/})
db.foo.find()

// on slave
db.foo.find()
for (i=0; i<5000; i++) {
    db.foo.insert({_id:i}); sleep(1);
}

//on slave
db.foo.count()

//on both
db.foo.find().sort({_id:-1})

// Failover Test
kill primary-process-id
// dont use kill -9
// but for testing
kill -9 process-id

// Homework 4
mkdir 1
mkdir 2
mkdir 3

mongod --dbpath 1 --port 27001 --smallfiles --oplogSize 50

// start with replica set
//mongod --replSet abc --dbpath 1 --port 27001 --oplogSize 50 --logpath log.1 --logappend --fork
mongod --dbpath 1 --port 27001 --smallfiles --oplogSize 50 --replSet hw4
rs.initiate()

mongod --dbpath 2 --port 27002 --smallfiles --oplogSize 50 --replSet hw4
mongod --dbpath 3 --port 27003 --smallfiles --oplogSize 50 --replSet hw4

cfg=
{
        "_id" : "hw4",
        "members" : [
                {
                        "_id" : 0,
                        "host" : "majid-HPLaptop:27001"
                },
                {
                        "_id" : 1,
                        "host" : "majid-HPLaptop:27002"
                },
                {
                        "_id" : 2,
                        "host" : "majid-HPLaptop:27003"
                }
        ]
}
rs.reconfig(cfg)

db.isMaster()

rs.help()
rs.stepDown(300)
cfg = rs.conf()
// removes the fist member
cfg.members.shift()
rs.reconfig(cfg)

mongo --port 27003
use local
hw4:SECONDARY> db.oplog.rs.find()
hw4:SECONDARY> db.oplog.rs.stats()

// force table scan
hint({$natural:1})


mongos> sh.help()

// add a shard
mongos>sh.addShard("a/10gen.local.27000")
mongos>sh.status()

// use admin db. users are per database
use admin 
db.addUser("the_admin","testpassword")
db.auth("the_admin","testpassword")

db.system.users.find()

use test
db.addUser("joe","abc")
db.addUser("jane","efg")

db.system.users.find().pretty()

db.getSisterDB("admin").users.find().pretty()
db.getSisterDB("admin").system.users.find().pretty()

db.addUser("jane","efg")

//readonly account
db.addUser("fred","xyz",true)

db.system.users.find()

touch keyfile
chmod 600 keyfile
// key file need to have base64 chracters

openssl rand -base64 60 >> keyfile

mongod --dbpath data --auth --replSet z --keyFile keyfile

db.places.ensureIndex({"loc":"2d"})
// returns results from near to far in distance
db.places.find({"loc":{$near:[20,42], $maxDistance:5}}).limit(20)
//geoNear Command
//$within:{$center | $box | $polygon}

/* FINAL */

//Q1 - Done
//Q2 - Done
//Q3 - Done
//Q4 - Done
//Q5 - Done
//Q6 - Done
//Q7 - Done

//Q8 - Done
mongod --dbpath /data/config --configsvr --smallfiles
start mongod --replSet s1 --dbpath /data/s1/1 --port 27501 --shardsvr --smallfiles
start mongod --replSet s1 --dbpath /data/s1/2 --port 27502 --shardsvr --smallfiles
start mongod --replSet s1 --dbpath /data/s1/3 --port 27503 --shardsvr --smallfiles

config = { _id: "s1", members:[
          { _id : 0, host : "localhost:27501" },
          { _id : 1, host : "localhost:27502" },
          { _id : 2, host : "localhost:27503" }]};
rs.initiate(config)

start mongod --replSet s2 --dbpath /data/s2/1 --port 27601 --shardsvr --smallfiles
start mongod --replSet s2 --dbpath /data/s2/2 --port 27602 --shardsvr --smallfiles
start mongod --replSet s2 --dbpath /data/s2/3 --port 27603 --shardsvr --smallfiles

config = { _id: "s2", members:[
          { _id : 0, host : "localhost:27601" },
          { _id : 1, host : "localhost:27602" },
          { _id : 2, host : "localhost:27603" }]};
rs.initiate(config)

mongos --configdb localhost:27019

//Q9 - Done
//Q10 - Done

//Q11
db.problem11.aggregate([
    {"$group":{"_id":{'N2':"$N2","mutant":"$mutant"},count:{$sum:1}}},
    {"$project":{_id:0,'N2':'$_id.N2','mutant':'$_id.mutant',count:1}}
    ])