'use strict';

var chalk = require( 'chalk' );

var array1 = [],
    array2 = [],
    i;

for ( i=0; i < 200; i++ ) {
  array1.push({ id: i, name: 'Array1 ( '+ i +' )' });
  array2.push({ id: i, name: 'Array2 ( '+ i +' )' });
}

function asyncLoop ( array, cb, done ) {
  var length = array.length,
      i = 0,
      loop,
      err;
  
  function itemDone ( err ) {
    if ( err ) {
      clearTimeout( loop );
      return done( err );
    }
  };

  loop = setInterval( function () {
    
    if ( i === length ) {
      clearTimeout( loop );
      return done();
    }

    cb( array[ i ], itemDone );
    i++;
  }, 0 );
}

asyncLoop( array1, function ( item, done ) {
  console.log( chalk.bgRed( item.name ) );
  done();
  i++;
}, function ( err ) {
  
  if ( err ) return console.log( 'ERROR: ', err );

  console.log( chalk.bgRed( 'array1 Done!' ) );
});

asyncLoop( array2, function ( item, done ) {
  console.log( chalk.bgBlue( item.name ) );
  done();
}, function ( err ) {
  
  if ( err ) return console.log( 'ERROR: ', err );

  console.log( chalk.bgBlue( 'array2 Done!' ) );
});