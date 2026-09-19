-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 11, 2026 at 05:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `code_reaction`
--
CREATE DATABASE IF NOT EXISTS `code_reaction` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `code_reaction`;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`) VALUES
(1, 'Level 1: Introduction of JavaScript'),
(2, 'Level 2: Variables');

-- --------------------------------------------------------

--
-- Table structure for table `levelPages`
--

CREATE TABLE `levelPages` (
  `id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `page_order` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `levelPages`
--

INSERT INTO `levelPages` (`id`, `content`, `page_order`, `course_id`) VALUES
(1, '<h2>What is javascript (JS)?</h2><p>JS is lightweight and cross-platform, making it compatible with many platforms, such as Chrome and Safari. JavaScript is a translated language. The JavaScript Translator (embedded in the browser) is responsible for translating the JavaScript code for the web browser. Because of this, it is beginner-friendly, even though its writing rules are not as straightforward as those of other languages, such as C++.         </p>        <p>JS is a programming language commonly used to create dynamic and interactive website content. It allows developers to update content, make content changes based on certain logic, update and change both HTML and CSS, and much more.         </p>', 1, 1),
(2, '<h2>What are HTML and CSS?</h2><p>3 languages are required for web development: HTML, a programming language (JS), and CSS. To create a webpage, we use HTML to input content, such as text, input, buttons, etc. We use CSS to design the webpage, such as adding background color, changing the text size, and putting buttons in different locations. We use programming languages to make content dynamic, like expanding the hidden content after a click. \n        </p>', 2, 1),
(3, '<h2>Summary:</h2><p>When we create a website, we use:</p>\n    <ol>\n        <li>HTML to define the content of web pages</li>\n        <li>CSS to specify the layout of web pages</li>\n        <li>JavaScript to program the behavior of web pages</li>\n    </ol>\n    <br>\n    <p>In this game, you will learn about basic concepts in JS, such as arrays and data storage. You will also learn how to use p5play, a Javascript library, to make animations and interactive elements.</p>', 3, 1),
(4, '<h2>Using console.log() to See What\'s Happening in Your Code</h2><p>You will also see <code>console.log()</code> throughout the lesson. <br>\n    But what is <code>console.log</code>?</p>\n\n    <p><strong>Example:</strong></p>\n\n    <p><code>let welcomeMessage;</code></p>\n\n    <p><code>welcomeMessage = \"Welcome to CodeReaction!\";</code></p>\n\n    <p><code>console.log(welcomeMessage); // → shows the text in the console</code></p>\n\n    <p><code>console.log()</code> is a JavaScript function used to display information or values in the console.</p>\n\n    <p>A console is a tool that is used to debug and check the execution of functions and data in a program.</p>\n\n    <div class=\"consoleOutput\">\n        <div class=\"consoleTitle\">\n            <p>Console</p>\n        </div>\n\n        <div class=\"consoleContent\">\n            <p><code>&nbsp;Welcome to CodeReaction!</code></p>\n        </div>\n    </div>', 4, 1),
(5, '<p>Variables are used to help the computer remember information that can be displayed or changed. It\'s like a storage game: you organize your storage boxes by labeling them. For example, you might add a label for where the T-shirt belongs — the \'clothing\' box. In this case, the variable is <code>clothing</code>, and the content inside is the value. It looks like this:</p>\r\n    <pre><code>let clothing = \'T-shirt\';</code></pre>', 5, 2),
(6, '<h2>Variables:</h2>\r\n    <p>Variables are used to help the computer remember information that can be displayed or changed. It\'s like a storage game: you organize your storage boxes by labeling them. For example, you might add a label for where the T-shirt belongs — the \"clothing\" box. In this case, the variable is <code>clothing</code>, and the content inside is the value. It looks like this:</p>\r\n    <code>let clothing = \"T-shirt\";</code>', 1, 2),
(7, '<p>To create a variable, we use <code>let</code>, <code>const</code>, or <code>var</code>.</p>\r\n    <code>let ball;</code>\r\n    <p>We use the assignment operator <code>=</code> to put data into the variable we just created.</p>\r\n    <code>ball = \'basketball\';</code>\r\n\r\n    <div class=\"additionInformation\">\r\n        <p><strong>Important:</strong></p>\r\n        <p>We use semicolons (<code>;</code>) to end a statement. Remember to add a semicolon at the end of each statement!</p>\r\n    </div>\r\n\r\n    <p>The string is now saved into the memory area associated with the variable. We can access it by the variable name:</p>\r\n    <p><code>console.log(ball);</code></p>\r\n\r\n    <div class=\"consoleOutput\">\r\n        <div class=\"consoleTitle\"><p>Console</p></div>\r\n        <div class=\"consoleContent\"><p><code>basketball</code></p></div>\r\n    </div>', 2, 2),
(8, '<div class=\"boxActivity\">\r\n        <div id=\"box\">\r\n            <div class=\"response\">\r\n                <p id=\"callBox\"></p>\r\n                <p id=\"callValue\"></p>\r\n            </div>\r\n\r\n            <div id=\"variableText\">\r\n                <p>Make a variable call box!</p>\r\n\r\n                <input class=\"inputBoxes\" type=\"text\" id=\"inputBox\" placeholder=\"Enter code\">\r\n                <button class=\"submitBoxes\" id=\"submitBoxName\">Submit</button>\r\n\r\n                <br><br>\r\n\r\n                <button type=\"button\" class=\"collapsible\">\r\n                    <i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here\r\n                </button>\r\n\r\n                <div class=\"collapsibleContent\">\r\n                    <br>\r\n                    <code>let box;</code>\r\n                </div>\r\n\r\n                <p>Choose a value name and put it into box!</p>\r\n                <ul>\r\n                    <li>wood_white</li>\r\n                    <li>wood_brown</li>\r\n                    <li>wood_green</li>\r\n                </ul>\r\n\r\n                <input class=\"inputBoxes\" type=\"text\" id=\"inputVariable\" placeholder=\"Enter code\">\r\n                <button class=\"submitBoxes\" id=\"submitVariableName\">Submit</button>\r\n\r\n                <br><br>\r\n\r\n                <button type=\"button\" class=\"collapsible\">\r\n                    <i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here\r\n                </button>\r\n\r\n                <div class=\"collapsibleContent\">\r\n                    <br>\r\n                    <code>box = \'wood_white\';</code>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>', 3, 2),
(9, '<p>We can also declare multiple variables in one line:</p>\r\n    <p><code>let ball = \'basketball\', amount = 25, color = \'orange\';</code></p>\r\n\r\n    <p>But it is better to use the multi-line variant:</p>\r\n\r\n    <p><code>let ball = \'basketball\';</code></p>\r\n    <p><code>let amount = 25;</code></p>\r\n    <p><code>let color = \'orange\';</code></p>\r\n\r\n    <p>It may look cumbersome, but you will thank yourself later because it is much easier to read when you have a lot of variables!</p>', 4, 2),
(10, '<h2>Never declare a variable twice:</h2>\r\n\r\n    <p>A variable can only be declared once. Make sure to choose a variable name that is easy to remember and unique. But you can change the value inside the variable anytime by doing this:</p>\r\n\r\n    <p><code>let ball = \'basketball\'; // declare ball</code></p>\r\n    <p><code>ball = \'softball\'; // change value</code></p>\r\n\r\n    <div class=\"additionInformation\">\r\n        <p><strong>Important:</strong></p>\r\n        <p>We use <code>//</code> in JS to write comments. It\'s important to add comments to make the code easy to understand during later analysis or debugging.</p>\r\n    </div>\r\n\r\n    <p>In the example above, the variable <code>ball</code> is declared once, and its value is later changed from \'basketball\' to \'softball\'. You can change the value of a variable as many times as you need, but the declaration should only happen once.</p>\r\n\r\n    <h2>We can also declare two variables and copy data from one into the other:</h2>\r\n\r\n    <p><code>let stoneCount = 2; // declare stoneCount</code></p>\r\n    <p><code>console.log(stoneCount);</code></p>\r\n\r\n    <p><code>let stoneAdded = 4; // declare stoneAdded</code></p>\r\n    <p><code>console.log(stoneAdded);</code></p>\r\n\r\n    <p><code>stoneCount = stoneCount + stoneAdded; // update stoneCount</code></p>\r\n    <p><code>console.log(stoneCount);</code></p>\r\n\r\n    <div class=\"consoleOutput\">\r\n        <div class=\"consoleTitle\"><p>Console</p></div>\r\n        <div class=\"consoleContent\">\r\n            <div class=\"consoleContentItems\"><p><code>2</code></p></div>\r\n            <div class=\"consoleContentItems\"><p><code>4</code></p></div>\r\n            <div class=\"consoleContentItems\"><p><code>6</code></p></div>\r\n        </div>\r\n    </div>', 5, 2),
(11, '<h2>Different Ways to Declare Variables:</h2>\r\n    <h3>const vs. let vs. var:</h3>\r\n\r\n    <p>There are multiple ways to declare variables. Other than <code>let</code>, which we\'ve talked about, there are also <code>const</code> and <code>var</code>.</p>\r\n\r\n    <h4>var:</h4>\r\n    <p><code>var</code> is very similar to <code>let</code> (you can change the value inside the declared variable). <code>var</code> is the older way of declaring variables in JS.</p>\r\n\r\n    <h4>const:</h4>\r\n    <p>By using <code>const</code>, you can\'t change the value of the declared variable.</p>\r\n\r\n    <p><code>const arrow = \"Go to the right\";</code></p>\r\n    <p><code>arrow = \"Go to the left\"; // You will get an error.</code></p>\r\n\r\n    <div class=\"consoleOutput\">\r\n        <div class=\"consoleTitle\"><p>Console</p></div>\r\n        <div class=\"consoleContent\"><p><code>Error</code></p></div>\r\n    </div>', 6, 2),
(12, '<p>You can think of <code>let</code> as a \"snap-on battery box\" because you can easily open it and change the battery (the value of the variable).</p>\r\n\r\n    <p>On the other hand, <code>const</code> is like a \"screw-down battery box,\" which requires a tool (finding the line where the constant is declared and substituting the old value with the new value) to open and replace the battery inside.</p>\r\n\r\n    <p>The process of finding the right tool refers to needing to find the line where the variable is declared, unlike <code>let</code>, where the value can be reassigned easily.</p>', 7, 2),
(13, '<h2>Variable Naming:</h2>\r\n\r\n    <p>There are two main limitations on variable names in JavaScript:</p>\r\n\r\n    <ul>\r\n        <li>The name can only contain letters, digits, or the symbols <code>$</code> and <code>_</code>.</li>\r\n        <li>The first character must not be a digit.</li>\r\n    </ul>\r\n\r\n    <p><strong>Examples of valid names:</strong></p>\r\n    <ul>\r\n        <li><code>let day1;</code></li>\r\n        <li><code>let _;</code></li>\r\n    </ul>\r\n\r\n    <p><strong>Examples of invalid names:</strong></p>\r\n    <ul>\r\n        <li><code>let zoneGravity#;</code> — invalid because it includes #</li>\r\n        <li><code>let 5C;</code> — invalid because it starts with a digit</li>\r\n    </ul>\r\n\r\n    <p>Every variable needs a name. Variable names need to be written on a single line and without space in between. When there are multiple words in a variable, we capitalize the first letter of each word after the first word, like this: <code>lessGravityArea</code>.</p>', 8, 2),
(14, '<h2>Tips:</h2>\r\n\r\n    <ul>\r\n        <li>The dollar sign <code>$</code> and underscore <code>_</code> can also be used in variable names.</li>\r\n        <li><strong>AAA</strong> and <strong>aaa</strong> are different variables — lowercase and uppercase letters matter!</li>\r\n        <li>There is a list of reserved words that you cannot use as variable names because they are used by the language itself.</li>\r\n    </ul>\r\n\r\n    <p>For example:</p>\r\n    <ul>\r\n        <li><code>let</code></li>\r\n        <li><code>const</code></li>\r\n        <li><code>class</code></li>\r\n        <li><code>function</code></li>\r\n        <li><code>return</code></li>\r\n    </ul>', 9, 2),
(15, '<h2>Let Practice!</h2>\r\n\r\n    <p>Declare a ufo variable using different methods! And choose an alien to put into the ufo!</p>\r\n\r\n    <p>Declare a let variable called ufo</p>\r\n\r\n    <input class=\"inputBoxes\" type=\"text\" id=\"inputUFO\" placeholder=\"Enter code\">\r\n    <button class=\"submitBoxes\" id=\"submitUFOName\">Submit</button>\r\n\r\n    <p>Choose an alien and put it into ufo!</p>\r\n\r\n    <ul>\r\n        <li>alien_Yellow</li>\r\n        <li>alien_Beige</li>\r\n        <li>alien_Green</li>\r\n    </ul>\r\n\r\n    <input class=\"inputBoxes\" type=\"text\" id=\"inputAlien\" placeholder=\"Enter code\">\r\n    <button class=\"submitBoxes\" id=\"submitAlien\">Submit</button>\r\n\r\n    <p id=\"callUFO\"></p>\r\n    <p id=\"callAlien\"></p>\r\n\r\n    <button type=\"button\" class=\"collapsible\">\r\n        <i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here\r\n    </button>\r\n\r\n    <div class=\"collapsibleContent\">\r\n        <br>\r\n        <code>let ufo;<br>ufo = \'alien_Yellow\';</code>\r\n    </div>\r\n\r\n    <h3>const</h3>\r\n\r\n    <p>Declare a const variable called ufo</p>\r\n\r\n    <input class=\"inputBoxes\" type=\"text\" id=\"inputUFO2\" placeholder=\"Enter code\">\r\n    <button class=\"submitBoxes\" id=\"submitUFOName2\">Submit</button>\r\n\r\n    <p>Choose an alien and put it into ufo!</p>\r\n\r\n    <ul>\r\n        <li>alien_Yellow</li>\r\n        <li>alien_Beige</li>\r\n        <li>alien_Green</li>\r\n    </ul>\r\n\r\n    <p id=\"callUFO2\"></p>\r\n\r\n    <button type=\"button\" class=\"collapsible\">\r\n        <i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here\r\n    </button>\r\n\r\n    <div class=\"collapsibleContent\">\r\n        <br>\r\n        <code>const ufo = \'alien_Yellow\';</code>\r\n    </div>\r\n\r\n    <h3>var</h3>\r\n\r\n    <p>Declare a var variable called ufo</p>\r\n\r\n    <input class=\"inputBoxes\" type=\"text\" id=\"inputUFO3\" placeholder=\"Enter code\">\r\n    <button class=\"submitBoxes\" id=\"submitUFOName3\">Submit</button>\r\n\r\n    <p>Choose an alien and put it into ufo!</p>\r\n\r\n    <ul>\r\n        <li>alien_Yellow</li>\r\n        <li>alien_Biege</li>\r\n        <li>alien_Green</li>\r\n    </ul>\r\n\r\n    <input class=\"inputBoxes\" type=\"text\" id=\"inputAlien3\" placeholder=\"Enter code\">\r\n    <button class=\"submitBoxes\" id=\"submitAlien3\">Submit</button>\r\n\r\n    <p id=\"callUFO3\"></p>\r\n    <p id=\"callAlien3\"></p>\r\n\r\n    <button type=\"button\" class=\"collapsible\">\r\n        <i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here\r\n    </button>\r\n\r\n    <div class=\"collapsibleContent\">\r\n        <br>\r\n        <code>var ufo;<br>ufo = \'alien_Yellow\';</code>\r\n    </div>', 10, 2),
(16, '<p class=\"questionTitle\">Which of the following declares a variable correctly?</p>\r\n\r\n    <div class=\"choices\">\r\n        <button class=\"choicesButton\"><code>let cat = \'feed\'</code></button>\r\n        <button class=\"choicesButton\"><code>Let dog = sleeping;</code></button>\r\n        <button class=\"choicesButton\"><code>let frog = \'eating flies\';</code></button>\r\n        <p class=\"answer\"></p>\r\n    </div>', 11, 2),
(17, '<p class=\"questionTitle\"><strong>What should you do if you want to change the value stored in a variable?</strong></p>\r\n\r\n    <div class=\"choices\">\r\n        <button class=\"choicesButton\"><code>Use const</code></button>\r\n        <button class=\"choicesButton\"><code>Use let and type \'let variable = newValue\'</code></button>\r\n        <button class=\"choicesButton\"><code>Type \'let variable = newValue;\'</code></button>\r\n        <p class=\"answer\"></p>\r\n    </div>', 12, 2),
(18, '<p class=\"questionTitle\"><strong>Type the elements in the correct sequence to form a variable:</strong></p>\r\n\r\n    <p class=\"questionTitle\"><code>let | door | = | \" | open | \";</code></p>\r\n\r\n    <div class=\"inputContainer\">\r\n        <input class=\"inputBoxes\" type=\"text\" id=\"variableInput\" placeholder=\"Type your answer here\">\r\n        <button class=\"submitBoxes\" id=\"submitButton\">Submit</button>\r\n    </div>\r\n\r\n    <div class=\"choices\">\r\n        <p class=\"answer\"></p>\r\n    </div>', 13, 2),
(19, '<p class=\"questionTitle\"><strong>Examine the following code:</strong></p>\r\n\r\n    <p class=\"questionTitle\"><code>let burgerBun# = 5;</code></p>\r\n    <p class=\"questionTitle\"><code>let cheese = 9;</code></p>\r\n    <p class=\"questionTitle\"><code>let purchaseList = burgerBun + cheese;</code></p>\r\n\r\n    <p class=\"questionTitle\"><strong>How can you fix this code?</strong></p>\r\n\r\n    <div class=\"choices\">\r\n        <button class=\"choicesButton\"><code>Delete #</code></button>\r\n        <button class=\"choicesButton\"><code>Use const</code></button>\r\n        <button class=\"choicesButton\"><code>Use var</code></button>\r\n        <p class=\"answer\"></p>\r\n    </div>', 14, 2),
(20, '<h2>p5play Time! Let\'s Learn More About p5play!</h2>\r\n\r\n    <p>Now that you\'ve learned some basic JavaScript, let\'s use p5play to create movable elements!</p>\r\n\r\n    <p>As you have learned, p5play is a JavaScript library for creating animations and interactive elements. It\'s simple to use and great for beginners to practice with!</p>\r\n\r\n    <p>In this exercise, you will learn about sprites (a way to call objects in a game) and how to position them using coordinates.</p>\r\n\r\n    <h2><code>setup()</code>: Runs when the program starts.</h2>\r\n\r\n    <h2>Create a canvas in <code>setup()</code> using <code>new Canvas()</code>:</h2>\r\n\r\n    <pre><code>function setup() {\r\n  new Canvas(300, 200);\r\n}</code></pre>\r\n\r\n    <div id=\"canvas\"></div>\r\n\r\n    <h2>Creates a sprite.</h2>\r\n\r\n    <p>A sprite is an object in a game. It represents anything on the canvas. For example, if you draw a circle, it is a sprite. If you insert an image of a UFO onto the canvas, that is also a sprite.</p>\r\n\r\n    <p>You can move sprites and make them collide with each other.</p>\r\n\r\n    <p>Use <code>new Sprite()</code> to create a sprite:</p>\r\n\r\n    <p><code>let square;</code></p>\r\n\r\n    <div class=\"additionInformation\">\r\n        <p>Always declare variables outside of functions. This allows you to access those elements later in <code>update()</code> or <code>draw()</code>.</p>\r\n\r\n        <p>For example, you might want to make a sprite jump when it reaches a certain x-range.</p>\r\n    </div>\r\n\r\n    <pre><code>square = new Sprite(100,100,100,100);\r\n// new Sprite(x-position, y-position, width, height)</code></pre>\r\n\r\n    <div id=\"sprite\"></div>\r\n\r\n    <h2><code>update()</code>: Runs 60 times per second by default.</h2>\r\n\r\n    <p>Always use <code>clear()</code> or <code>background(\'color\')</code> to remove anything from previous frames!</p>\r\n\r\n    <pre><code>function update() {\r\n  background(\'#594157\');\r\n}</code></pre>\r\n\r\n    <div id=\"update1\"></div>', 15, 2);

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `level_page_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `course_id`, `title`, `level_page_id`) VALUES
(1, 1, 'What is javascript (JS)?', 1),
(2, 1, 'What is HTML and CSS?', 2),
(3, 1, 'Summary:', 3),
(4, 2, 'Variables Introduction', 5);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `last_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `body`, `last_modified`) VALUES
(1, 'My First Note', 'This is my first Code Reaction note.', '2026-09-09 20:33:49'),
(5, 'Untitled Notefewfw', 'fwefwe', '2026-09-10 01:32:21'),
(7, 'Untitled Note', 'weiojdoewjdoiqw', '2026-09-10 07:13:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `levelPages`
--
ALTER TABLE `levelPages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_levelPages_course` (`course_id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_level_page` (`level_page_id`),
  ADD KEY `fk_levels_course` (`course_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `levelPages`
--
ALTER TABLE `levelPages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `levelPages`
--
ALTER TABLE `levelPages`
  ADD CONSTRAINT `fk_levelPages_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `levels`
--
ALTER TABLE `levels`
  ADD CONSTRAINT `fk_levels_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `fk_levels_levelPage` FOREIGN KEY (`level_page_id`) REFERENCES `levelPages` (`id`),
  ADD CONSTRAINT `levels_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(11) NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"code_reaction\",\"table\":\"levelPages\"},{\"db\":\"code_reaction\",\"table\":\"levels\"},{\"db\":\"code_reaction\",\"table\":\"courses\"},{\"db\":\"code_reaction\",\"table\":\"notes\"},{\"db\":\"code_reaction\",\"table\":\"pages\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Dumping data for table `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'code_reaction', 'levelPages', '{\"sorted_col\":\"`levelPages`.`id` ASC\",\"CREATE_TIME\":\"2026-09-10 01:34:52\"}', '2026-09-10 06:03:35');

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2026-09-11 03:28:18', '{\"Console\\/Mode\":\"show\",\"Console\\/Height\":140.98637500000000954969436861574649810791015625,\"NavigationWidth\":0}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
