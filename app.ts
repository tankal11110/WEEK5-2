class EventEmitter{
    events;

    constructor(){
        this.events = {};
    }
    on(type : string, fn){
        if (!type || !fn) {
            return;
        }
        this.events[type] = this.events[type] || [];
        this.events[type].push(fn);
    }
    emit(type: string, data ?:string){
        var fns = this.events[type];
        if (!fns || !fns.length) return;

        for (let i = 0; i < fns.length; i++){
            fns[i](data);
        }
    }
}

class Database extends EventEmitter{
    url:string;

    constructor(url:string){
        super();
        this.url = url;
    }
    connect(){
      
        this.emit("connect", this.url);
    }
    disconnect(){
        this.emit("disconnect", this.url);
    }
}

// // Użycie EventEmittera
 var ev: EventEmitter = new EventEmitter();

 ev.on("hello", function(message) {
     console.log("Witaj " + message + "!");
 });

ev.on("hello", function(message) {
    console.log("Siema " + message + ".");
});

ev.on("goodbye", function() {
    console.log("Do widzenia!");
});

ev.emit("hello", "Marek");
ev.emit("goodbye");
ev.emit("custom"); 


var db: Database = new Database("db://localhost:3000"); // fikcyjny adres

db.on("connect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało ustanowione.");
});

db.on("disconnect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało zakończone.");
});

db.connect();

// po 5 sekundach rozłączamy się
setTimeout(function() {
    db.disconnect();
}, 5000);