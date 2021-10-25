 let sudoko1 = [
    [1,2,3,4],
    [3,4,1,2],
    [2,1,4,3],
    [4,3,2,1]    
 ];  
 
let sudoko2 = [
    [1,-2,3,4],
    [4,2,3,4],
    [1,2,3,4],
    [1,2,3,4],   
];  

let sudoko3 = [
    [2,3,4,1],
    [1,2,3,4],
    [3,4,1,2],
    [4,1,2,3],   
];  

let sudoko = [
    [2,3,4,1],
    [1,2,3,4],
    [3,4,1,2],
    [4,1,2,3],   
];  
 
let n = 4;
let valid = true;
/* for(var i=0; i<n; i++ ) {
  for(var j=0; j<n; j++) {  	      
    for(var k=j+1; k<=n; k++) {    
      if(sudoko[i][j] > n) {
        valid = false;
      }
      if(sudoko[i][j] == sudoko[i][k]) {
        valid = false;
      }
 
    }
  }
} */

/* for(var i=0; i<n; i++ ) {
  for(var j=0; j<n; j++) {  	      
    for(var k=i+1; k<=n; k++) {    
      if(sudoko[j][i] > n) {
        valid = false;
      }
      if(sudoko[j][i] == sudoko[i][k]) {
        console.log(i+""+j+" "+i+""+k)
        console.log("col"+ i + "row"+ j+ "pointer"+k)
        valid = false;
      }
 
    }
  }
} */


/* for(var i=0; i<n; i++ ) {
  for(var j=0; j<n; j++) {  	
    for(var k=j+1; k<n; k++) {    
      if(sudoko[j][i] > n) {
        valid = false;
      }
      console.log(i+""+j+" "+k+""+i)
      if(sudoko[i][j] == sudoko[k][i] && k) {
        console.log(i+""+j+" "+k+""+i)
        console.log("col"+ i + "row"+ j+ "pointer"+k)
        valid = false;
      }
    }
  }
} */


/* login */
/* let i = 0;
let j = 0;

for(var c=0; c<n; c++) {
  for(var k=c+1; k<n; k++) {
      console.log(i+""+j+" "+i+""+k)
      console.log(i+""+j+" "+k+""+i)
  }
  i++;
  j++;
}
 */
 
let i = 0;
let j = 0;

loop1: for(var c=0; c<n; c++) {
	for(var k=c+1; k<n; k++) {
  		if(sudoko[i][j] == sudoko[i][k]) {
  			console.log("Matched: "+i+""+j+" and "+i+""+k);
      	valid = false;
        break loop1;
      }      
      if(sudoko[i][j] > n || sudoko[i][j] <= 0) {
      	console.log("invalid")
      	valid = false;
        break loop1;
      }
      if(sudoko[i][j] == sudoko[k][i]) {
      	console.log("Matched: "+i+""+j+" and "+k+""+i);
      	valid = false;
        break loop1;
      }
      if(sudoko[i][j] == sudoko[i+1][j+1]) {
      	console.log("Inner squares matched "+i+""+j+" and "+(j+1)+""+(i+1))
        valid = false;
        break loop1;
      }
  }
  i++;
  j++;
}

console.log(valid)

let sudoko9 = [
    [6,3,9,5,7,4,1,8,2],
    [5,4,1,8,2,9,3,7,6],
    [7,8,2,6,1,3,9,5,4],
    [1,9,8,4,6,7,5,2,3],   
    [3,6,5,9,8,2,4,1,7],
    [4,2,7,1,3,5,8,6,9],
    [9,5,6,7,4,8,2,3,1],
    [8,1,3,2,9,6,7,4,5],
    [2,7,4,3,5,1,6,9,8]
];  
n=9
i = 0;
j = 0;
valid=true;
loop1: for(var c=0; c<n; c++) {
	for(var k=c+1; k<n; k++) {
  		if(sudoko9[i][j] == sudoko9[i][k]) {
  			console.log("Matched: "+i+""+j+" and "+i+""+k);
      	valid = false;
        break loop1;
      }      
      if(sudoko9[i][j] > n || sudoko9[i][j] <= 0) {
      	console.log("invalid")
      	valid = false;
        break loop1;
      }
      if(sudoko9[i][j] == sudoko9[k][i]) {
      	console.log("Matched: "+i+""+j+" and "+k+""+i);
      	valid = false;
        break loop1;
      }
     /*  if(sudoko[i][j] == sudoko[i+1][j+1]) {
        console.log("Inner squares matched "+i+""+j+" and "+(j+1)+""+(i+1))
        valid = false;
        break loop1;
      } */
  }
  i++;
  j++;
}

console.log(valid)
 
