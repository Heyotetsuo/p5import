var P5LIST={},DLIMIT=0,TOSCAN;
function alreadyFound(query, o){
	for ( var p in o ){
		if ( query === p ){
			return true;
		} else {
			return alreadyFound( query, o.prototype[p] );
		}
	}
}
function clearInput(){
	document.querySelector("#input").value = "";
}
function getCode( o, p ){
	rgx = new RegExp( "\\b"+p+"\\b" );
	if ( TOSCAN.value.match(rgx) ){
		res += p + ' = ' + o.prototype[p] + ';\n';
		FOUND.push(p);
	}
}
function auditScript(){
	var TOSCAN = document.querySelector( "#input" ),rgx,res="";
	getProps( p5, getCode );
	document.querySelector( "#output" ).value = res;
}
function getProps(o, callback){
	DLIMIT++;
	if ( DLIMIT > 10 ) return false;
	var p,q=null;
	for (p in o.prototype){
		if ( alreadyFound(p) ) continue;
		q={};
		if ( o.hasOwnProperty(p) ){
			q[p] = getProps( o[p], callback );
		} else {
			q[p] = o.prototype[p];
			if (callback) callback( o, p );
		}
	}
	DLIMIT--;
	return q;
}
function mergeObj(a,b){
	var c={},p;
	for (p in a){
		c[p] = a[p];
	}
	for (p in b){
		a[p] = b[p];
	}
	return c;
}
function main(){
	P5LIST = getProps( p5 );
}
main();
