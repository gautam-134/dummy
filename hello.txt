<!-- Single View -->

<?php

$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "comp";


$conn = new mysqli($serverName, $userName, $password, $dbName);

if ($conn->connect_error)
     die("Connect Failed:" . $conn->connect_error);
else
     echo ("Connection made succesfully");

// Assuming you're already connected to the database
// Check if 'id' is passed in the URL
if (isset($_GET['id'])) {
     $id = $_GET['id'];
     echo "ID: " . $id . "<br>";  // Display the ID (optional for debugging)

     // Prepare the query
     $query = "SELECT * FROM courses WHERE id = ?";

     // Prepare and execute the statement
     if ($stmt = $conn->prepare($query)) {
          // Bind the parameter (i for integer)
          $stmt->bind_param("i", $id);

          // Execute the statement
          $stmt->execute();

          // Get the result
          $result = $stmt->get_result();

          // Check if any rows are returned
          if ($result->num_rows > 0) {
               // Fetch the first row as an associative array
               $row = $result->fetch_assoc();

               // Access the data from the $row array
               echo "Course ID: " . $row['id'] . "<br>";
               echo "Course Name: " . $row['name'] . "<br>";
               echo "Course Description: " . $row['description'] . "<br>";
               // Add other fields from the 'courses' table as needed
          } else {
               echo "No course found with the provided ID.";
          }

          // Close the statement
          $stmt->close();
     } else {
          echo "Error preparing the query.";
     }
} else {
     echo "ID parameter missing.";
}






<!-- Multi view -->








<?php
// Assuming you're already connected to the database
// Database connection (replace with your database credentials)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "comp";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the 'courses' table
$query = "SELECT * FROM courses";
$result = $conn->query($query);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course List</title>
    <link rel="stylesheet" href="styles.css">  <!-- Link to external CSS file -->
</head>
<body>
    <header>
        <h1>Course List</h1>
    </header>

    <section class="course-list">
        <?php
        // Check if any rows are returned
        if ($result->num_rows > 0) {
            // Loop through all the rows and display them
            while ($row = $result->fetch_assoc()) {
                echo "<div class='course-container'>";
                  echo "<div class='course-container'>";

                echo "<h2>" . $row['name'] . "</h2>";  // Course name in h2
                                echo "<img src='" . $row['image'] . "' alt='Course Image' class='course-image' />";  // Display the image

                echo "<p><strong>Description:</strong> " . $row['description'] . "</p>";  // Course description
                echo "<p><strong>Course ID:</strong> " . $row['id'] . "</p>";  // Course ID
                echo "</div>";  // End course container
            }
        } else {
            echo "<p>No courses available.</p>";
        }

        // Close the database connection
        $conn->close();
        ?>
    </section>

    <footer>
        <p>&copy; 2025 Course List. All rights reserved.</p>
    </footer>

</body>
</html>

/_ Basic Reset _/

- {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

/_ Body Styling _/
body {
font-family: Arial, sans-serif;
background-color: #f4f4f4;
color: #333;
padding: 20px;
}

/_ Header Styling _/
header {
background-color: #4CAF50;
color: white;
padding: 20px;
text-align: center;
}

header h1 {
font-size: 36px;
}

/_ Course List Styling _/
.course-list {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin-top: 20px;
}

.course-container {
background-color: white;
border: 1px solid #ddd;
border-radius: 8px;
padding: 20px;
width: 30%;
margin-bottom: 20px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-container h2 {
font-size: 24px;
color: #333;
}

.course-container p {
font-size: 16px;
margin: 10px 0;
}

footer {
text-align: center;
margin-top: 30px;
font-size: 14px;
color: #777;
}

/_ Responsive design _/
@media (max-width: 768px) {
.course-container {
width: 100%;
}
}













<?php
session_start();  // Start the session

// Database connection
$servername = "localhost";
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "user_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Register new user
if (isset($_POST['register'])) {
    $reg_username = $_POST['register_username'];
    $reg_password = $_POST['register_password'];

    // Check if the username already exists
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $reg_username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<script>alert('Username already exists!');</script>";
    } else {
        // Hash password for security
        $hashed_password = password_hash($reg_password, PASSWORD_DEFAULT);

        // Insert new user into the database
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $reg_username, $hashed_password);
        $stmt->execute();

        echo "<script>alert('Registration successful! Please login.');</script>";
    }
}

// Login user
if (isset($_POST['login'])) {
    $login_username = $_POST['login_username'];
    $login_password = $_POST['login_password'];

    // Check if the username exists
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $login_username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verify the password
        if (password_verify($login_password, $row['password'])) {
            $_SESSION['isLoggedIn'] = true;
            $_SESSION['username'] = $login_username;
            header('Location: dashboard.php');
            exit();
        } else {
            echo "<script>alert('Incorrect password!');</script>";
        }
    } else {
        echo "<script>alert('User not found!');</script>";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Register</title>
</head>
<body>

<h1>Login and Registration System</h1>

<!-- Login Form -->
<h2>Login</h2>
<form method="POST" action="">
    <label for="login_username">Username:</label>
    <input type="text" name="login_username" required>
    <br>
    <label for="login_password">Password:</label>
    <input type="password" name="login_password" required>
    <br>
    <button type="submit" name="login">Login</button>
</form>

<!-- Register Form -->
<h2>Register</h2>
<form method="POST" action="">
    <label for="register_username">Username:</label>
    <input type="text" name="register_username" required>
    <br>
    <label for="register_password">Password:</label>
    <input type="password" name="register_password" required>
    <br>
    <button type="submit" name="register">Register</button>
</form>

</body>
</html>

<?php
$conn->close(); // Close the connection
?>
