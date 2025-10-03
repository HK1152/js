//variable is container or box used to store some value

//variable rules: 
// 1)case sensitive  (A!=a)
// Name name

// 2)don't allow special characters (#$%@!*&^()-/) (only _ allowed)

// 3)name must be always start with alpha
// 4)name must be meaning full
// 5)space comma not allowed between variable name


// sytax
// a=15;

// console.log(a);

//way to create vbariable in JS
// 1)automatic var
// 2)let
// 3)var
// 4)const

//datatypes depends on the value which we stored inside varibale
// 1)primitive
    // 1)number
         age=50;
        console.log(age);
    // 2)string "" '' ``
     name=`janvi`
        console.log(name);
        console.log(typeof(name));
    //old
        console.log("my name is ",name," my age is ",age);
    //latest template literal
        console.log(`my name is ${name} and my age is ${age}`);
    // 3)boolean :true false
        isAdult=false
    // isAdult=true
        console.log(isAdult);
        console.log(typeof(isAdult));
    //4)undefined
       let x;
        console.log(x);
        console.log(typeof(x));
    //  5)null   
        b=null;
        console.log(b);
        console.log(typeof(b)); //object

    // 6)bigint syntax
    no=BigInt(100000000000) 
        console.log(no);
     
     // 7)symbol syntax
     j=Symbol(122)
     console.log(typeof(j));
      age=10
     console.log(age);
     
     
// 2)non-primitive
    // 1)object literal
    //     i)object
    obj={
        name:"hk",
        age:11,
    }
    console.log(obj.name);
    
    //     ii)Array
    aa=["a","b","c","d"]
    bb=[1,2,3,4,5]
    console.log(aa);
    console.log(typeof(aa));
    console.log(bb);
    
    
    //     iii)function
    hy()
    function hy(){
        console.log("hello");
        
    }
 console.log(typeof(hy));
 

    function sum(a,b){
        console.log(a*b);
        
    } 
    sum(32,36);
    

    let a = 20;
    var kk = 30;
    {
        a = 40
    }
    {
        kk = 50;
    }

    console.log("this a ",a);
    console.log("this kk",kk);
    
    