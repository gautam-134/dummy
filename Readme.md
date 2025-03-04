# PHP Database Connection Script

## Introduction
This script demonstrates how to connect to a MySQL database, create a new database, and create a table within the database using PHP.

## Code Implementation

### Connecting to the Database
php
<?php
    echo "Welcome to the stage where we are ready to get connected to a database <br>";
    
    // Database credentials
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "dbharry";
    
    // Create a connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    
    // Check connection
    if (!$conn){
        die("Sorry, we failed to connect: " . mysqli_connect_error());
    } else {
        echo "Connection was successful";
    }
?>


### Creating a Database
php
    // Create a new database
    $sql = "CREATE DATABASE dbHarry2";
    $result = mysqli_query($conn, $sql);
    
    // Check for database creation success
    if($result){
        echo "The database was created successfully!<br>";
    } else {
        echo "The database was not created successfully because of this error ---> " . mysqli_error($conn);
    }


### Creating a Table
php
    // Create a table in the database (Table Name: phptrip)
    $sql = "CREATE TABLE `phptrip` (
        `sno` INT(6) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(12) NOT NULL,
        `dest` VARCHAR(6) NOT NULL,
        PRIMARY KEY (`sno`)
    )";
    
    $result = mysqli_query($conn, $sql);
    
    // Check for table creation success
    if($result){
        echo "The table was created successfully!<br>";
    } else {
        echo "The table was not created successfully because of this error ---> " . mysqli_error($conn);
    }
?>


## Conclusion
This script successfully connects to a MySQL database, creates a new database, and adds a table within it. Ensure your MySQL server is running and credentials are correct before executing the script.








<?php
    echo "Welcome to the stage where we are ready to get connected to a database <br>";
    
    // Database credentials
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "dbharry";
    
    // Create a connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    
    // Check connection
    if (!$conn){
        die("Sorry, we failed to connect: " . mysqli_connect_error());
    } else {
        echo "Connection was successful";
    }
?>




  // Create a new database
    $sql = "CREATE DATABASE dbHarry2";
    $result = mysqli_query($conn, $sql);
    
    // Check for database creation success
    if($result){
        echo "The database was created successfully!<br>";
    } else {
        echo "The database was not created successfully because of this error ---> " . mysqli_error($conn);
    }




     // Create a table in the database (Table Name: phptrip)
    $sql = "CREATE TABLE `phptrip` (
        `sno` INT(6) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(12) NOT NULL,
        `dest` VARCHAR(6) NOT NULL,
        PRIMARY KEY (`sno`)
    )";
    
    $result = mysqli_query($conn, $sql);
    
    // Check for table creation success
    if($result){
        echo "The table was created successfully!<br>";
    } else {
        echo "The table was not created successfully because of this error ---> " . mysqli_error($conn);
    }
?>




https://chatgpt.com/canvas/shared/67c7329669008191bd4a7b6a2bf226ba