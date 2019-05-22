const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){
    db.run("CREATE TABLE Instructor (ID NUMBER, Name TEXT, Dept_name TEXT, Salary NUMBER)");
    db.run("INSERT INTO Instructor Values(10101, 'Sirivisan', 'comp. Sci.' ,65000)");
    db.run("INSERT INTO Instructor Values(12121, 'wu' , 'Finance' ,90000)");
    db.run("INSERT INTO Instructor Values(15151, 'Mozrat' , 'Music' ,90000)");
    db.run("INSERT INTO Instructor Values(22222, 'Einstein' , 'Physics' ,95000)");
    db.run("INSERT INTO Instructor Values(32343, 'El Said ' , 'History',62000)");
    db.run("INSERT INTO Instructor Values(3456, 'Gold' , 'Physics' ,87000)");
    db.run("INSERT INTO Instructor Values(45565, 'Katz' ,'Comp. Sci.' ,75000)");
    db.run("INSERT INTO Instructor Values(58583, 'Califieri ' , 'History',62000)");
    db.run("INSERT INTO Instructor Values(76543, 'singh' , 'Finance',80000)");
    db.run("INSERT INTO Instructor Values(76766, 'Crick' ,'Biology' ,72000)");
    db.run("INSERT INTO Instructor Values(83821, 'Brandt' , 'Comp. Sci.',92000)");
    db.run("INSERT INTO Instructor Values(98345, 'Kim ' , 'Elec.Eng.',80000)");

    db.each("SELECT * FROM Instructor", function(err, row){
        if(err)
            console.log(err);
        console.log(row);
    });

    db.each("SELECT name FROM Instructor",function(err, row){
        console.log(row);
    });

    db.each("SELECT DISTINCT Dept_name FROM Instructor", function(err, row){
        console.log(row.Dept_name);
    });
    let results = new Array();
    db.each("SELECT name FROM Instructor WHERE dept_name = 'Comp. Sci.' AND Salary > 70000",
        //console.log(row);
        function(err,row){
            results.push(row.Name);
        },
        function(err,count){
            let resultString = "";
            for(let i=0;i != results.length; ++i){
                if(i != count-1){
                    resultString += results[i] + ","
                }
                else
                    resultString += results[i];

            }
            console.log(resultString + " have a high salary");

        });
        //Instructor1, Instructor2 have a high salary.

        //Print the department names and the total salary spend for each department 
        //History: 1000000 yearly

        let depts = {};
        db.each("SELECT Dept_name, Salary FROM Instructor", function(err,row){
            //console.log(row);
            if(depts[row.Dept_name] === undefined)
                depts[row.Dept_name] = 0;
            depts[row.Dept_name] += row.Salary;
        
        },
        function(err,count){
            //console.log("History" + ":" +depts["History"] +"yearly");
            let keys = Object.keys(depts);

            for(let i=0; i != keys.length; i++){
                console.log(keys[i] + ";" +depts[keys[i]] + " yearly");
            }
        });

    });

