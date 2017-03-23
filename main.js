(function(){
function LocalDB(name){

	this.name = name;
	this.data = {};
};

LocalDB.prototype.save = function(key,value){

	if (key && value){
		var full_key = this.name + "." + key;
		this.data[full_key] = JSON.stringify(value);
		this.saveToLocalStorage(full_key, this.data[full_key]);
	}
};

LocalDB.prototype.saveToLocalStorage = function(key,value){

};

LocalDB.prototype.get = function(key){

	if (key){
		return JSON.parse(this.data[this.name + "." + key]);
	}
};
// Tworzona jest nowa instancja,
// w której należy zapamiętać nazwę "DB1"

if ("localStorage" in window){

	var DB1 = new LocalDB("DB1");

// Jakiś obiekt do zapisania
	var janek = {
    	firstName: "Jan",
    	lastName: "Kowalski",
    	age: 32
	};

// Na prototypie LocalDB znajdować się
// musi metoda save, która przyjmuje
// parę klucz-wartość, a wartość powinna
// być przed zapisaniem przepuszczona
// przez JSON.stringify
	DB1.save("janek", janek);

// Prototyp LocalDB powinien również
// posiadać metodę get, która odczyta
// podany klucz, przepuszczając wartość
// przez JSON.parse
	DB1.get("janek");

// Porada. Aby móżna było tworzyć bazy danych
// o różnych nazwach, przy zapisywaniu poszczególnych
// danych, do klucza dodawaj nazwę bazy danych,
// np. "DB1.janek"
}
})();