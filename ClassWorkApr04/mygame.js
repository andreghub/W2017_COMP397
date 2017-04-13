// Protytpe class declaration
function mygame(nr_rows, nr_cols){
    this.nr_rows = nr_rows;
    this.nr_cols = nr_cols;
}

mygame.prototype.m1 = function(){
    console.log('in mygame.m1(): nr_rows= ' + this.nr_rows + ', nr_cols= ' + this.nr_cols);
}

mygame.prototype.m2 = function(){
    console.log('in mygame.m2(): nr_rows= ' + this.nr_rows + ', nr_cols= ' + this.nr_cols);
}

// ES6 class declaration
class mygame2{
    constructor(nr_rows, nr_cols){
        this.nr_rows = nr_rows;
        this.nr_cols = nr_cols;
    }

    m1(){
        console.log('in class mygame2.m1(): nr_rows= ' + this.nr_rows + ', nr_cols= ' + this.nr_cols);
    }

    m2(){
        console.log('in class mygame2.m2(): nr_rows= ' + this.nr_rows + ', nr_cols= ' + this.nr_cols);
    }
}