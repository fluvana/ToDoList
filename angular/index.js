/**
 * @author Vadim Morgun
 */
 
const CIPHERED_MESSAGE = "FngpOn87OjwwOzo7fyYwKi1/PDYvNzotfz4zLTo+"+
	"OyZzfyg3Oi06fzYsfzImfzUwPWBgf2Ubfx4rfzM6PiwrfxZ/"+
	"PD4xfzk2J38mMCotfzI+NjM2MTh/MzYsK394PD4qLDp/Fngp"+
	"On8tOjw6Nik6O38mMCotfzI+NjN/Kyg2PDo=";
	
console.log(bicipher(CIPHERED_MESSAGE));

function bicipher(msg, encoding = false) {	
	msg = !encoding ? atob(msg) : msg;
	
	msg = Array.from(msg)
		.map((c) => c.codePointAt(0))
		.map((i) => i ^ 0x5f) // yeah, really top secret
		.map((i) => String.fromCodePoint(i))
		.join("");
		
	msg = encoding ? btoa(msg) : msg;
	
	return msg;
}
