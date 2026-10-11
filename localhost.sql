-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 23, 2026 at 05:13 AM
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
  `course_id` int(11) DEFAULT NULL,
  `page_type` varchar(50) NOT NULL DEFAULT 'lesson'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `levelPages`
--

INSERT INTO `levelPages` (`id`, `content`, `page_order`, `course_id`, `page_type`) VALUES
(1, '<h2>What is javascript (JS)?</h2><p>JS is lightweight and cross-platform, making it compatible with many platforms, such as Chrome and Safari. JavaScript is a translated language. The JavaScript Translator (embedded in the browser) is responsible for translating the JavaScript code for the web browser. Because of this, it is beginner-friendly, even though its writing rules are not as straightforward as those of other languages, such as C++.         </p>        <p>JS is a programming language commonly used to create dynamic and interactive website content. It allows developers to update content, make content changes based on certain logic, update and change both HTML and CSS, and much more.         </p>', 1, 1, 'lesson'),
(2, '<h2>What are HTML and CSS?</h2><p>3 languages are required for web development: HTML, a programming language (JS), and CSS. To create a webpage, we use HTML to input content, such as text, input, buttons, etc. We use CSS to design the webpage, such as adding background color, changing the text size, and putting buttons in different locations. We use programming languages to make content dynamic, like expanding the hidden content after a click. \n        </p>', 2, 1, 'lesson'),
(3, '<h2>Summary:</h2><p>When we create a website, we use:</p>\n    <ol>\n        <li>HTML to define the content of web pages</li>\n        <li>CSS to specify the layout of web pages</li>\n        <li>JavaScript to program the behavior of web pages</li>\n    </ol>\n    <br>\n    <p>In this game, you will learn about basic concepts in JS, such as arrays and data storage. You will also learn how to use p5play, a Javascript library, to make animations and interactive elements.</p>', 3, 1, 'lesson'),
(4, '<h2>Using console.log() to See What\'s Happening in Your Code</h2><p>You will also see <code>console.log()</code> throughout the lesson. <br>But what is <code>console.log</code>?</p><p><strong>Example:</strong></p><pre><code>let welcomeMessage;\nwelcomeMessage = \"Welcome to CodeReaction!\";\nconsole.log(welcomeMessage); // → shows the text in the console</code></pre><p><code>console.log()</code> is a JavaScript function used to display information or values in the console.</p><p>A console is a tool that is used to debug and check the execution of functions and data in a program.</p><div class=\"consoleOutput\"><div class=\"consoleTitle\"><p>Console</p></div><div class=\"consoleContent\"><p><code>&nbsp;Welcome to CodeReaction!</code></p></div></div>\n', 4, 1, 'lesson'),
(6, '<h2>Variables:</h2>\n    <p>Variables are used to help the computer remember information that can be displayed or changed. It\'s like a storage game: you organize your storage boxes by labeling them. For example, you might add a label for where the T-shirt belongs — the \"clothing\" box. In this case, the variable is <code>clothing</code>, and the content inside is the value. It looks like this:</p>\n    <code>let clothing = \"T-shirt\";</code>', 1, 2, 'lesson'),
(7, '<p>To create a variable, we use <code>let</code>, <code>const</code>, or <code>var</code>.</p>\r\n    <code>let ball;</code>\r\n    <p>We use the assignment operator <code>=</code> to put data into the variable we just created.</p>\r\n    <code>ball = \'basketball\';</code>\r\n\r\n    <div class=\"additionInformation\">\r\n        <p><strong>Important:</strong></p>\r\n        <p>We use semicolons (<code>;</code>) to end a statement. Remember to add a semicolon at the end of each statement!</p>\r\n    </div>\r\n\r\n    <p>The string is now saved into the memory area associated with the variable. We can access it by the variable name:</p>\r\n    <p><code>console.log(ball);</code></p>\r\n\r\n    <div class=\"consoleOutput\">\r\n        <div class=\"consoleTitle\"><p>Console</p></div>\r\n        <div class=\"consoleContent\"><p><code>basketball</code></p></div>\r\n    </div>', 2, 2, 'lesson'),
(8, '<div class=\"boxActivity\">\n        <div id=\"box\">\n            <div class=\"response\">\n                <p id=\"callBox\"></p>\n                <p id=\"callValue\"></p>\n            </div>\n\n            <div id=\"variableText\">\n                <p>Make a variable call box!</p>\n\n                <input class=\"inputBoxes\" type=\"text\" id=\"inputBox\" placeholder=\"Enter code\">\n                <button class=\"submitBoxes\" id=\"submitBoxName\">Submit</button>\n\n                <br><br>\n\n                <button type=\"button\" class=\"collapsible\">\n                    <i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here\n                </button>\n\n                <div class=\"collapsibleContent\">\n                    <br>\n                    <code>let box;</code>\n                </div>\n\n                <p>Choose a value name and put it into box!</p>\n                <ul>\n                    <li>wood_white</li>\n                    <li>wood_brown</li>\n                    <li>wood_green</li>\n                </ul>\n\n                <input class=\"inputBoxes\" type=\"text\" id=\"inputVariable\" placeholder=\"Enter code\">\n                <button class=\"submitBoxes\" id=\"submitVariableName\">Submit</button>\n\n                <br><br>\n\n                <button type=\"button\" class=\"collapsible\">\n                    <i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here\n                </button>\n\n                <div class=\"collapsibleContent\">\n                    <br>\n                    <code>box = \'wood_white\';</code>\n                </div>\n            </div>\n        </div>\n    </div>', 3, 2, 'activity'),
(9, '<p>We can also declare multiple variables in one line:</p><pre><code>let ball = \'basketball\', amount = 25, color = \'orange\';</code></pre><p>But it is better to use the multi-line variant:</p><pre><code>let ball = \'basketball\';\r\nlet amount = 25;\r\nlet color = \'orange\';</code></pre><p>It may look cumbersome, but you will thank yourself later because it is much easier to read when you have a lot of variables!</p>', 4, 2, 'lesson'),
(10, '<h2>Never declare a variable twice:</h2><p>A variable can only be declared once. Make sure to choose a variable name that is easy to remember and unique. But you can change the value inside the variable anytime by doing this:</p><pre><code>let ball = \'basketball\'; // declare ball\r\nball = \'softball\'; // change value</code></pre><div class=\"additionInformation\"><p><strong>Important:</strong></p><p>We use <code>//</code> in JS to write comments. It\'s important to add comments to make the code easy to understand during later analysis or debugging.</p></div><p>In the example above, the variable <code>ball</code> is declared once, and its value is later changed from \'basketball\' to \'softball\'. You can change the value of a variable as many times as you need, but the declaration should only happen once.</p><h3>We can also declare two variables and copy data from one into the other:</h3><pre><code>let stoneCount = 2; // declare stoneCount\r\nconsole.log(stoneCount);\r\n\r\nlet stoneAdded = 4; // declare stoneAdded\r\nconsole.log(stoneAdded);\r\n\r\nstoneCount = stoneCount + stoneAdded; // update stoneCount\r\nconsole.log(stoneCount);</code></pre><div class=\"consoleOutput\"><div class=\"consoleTitle\"><p>Console</p></div><div class=\"consoleContent\"><div class=\"consoleContentItems\"><p><code>2</code></p></div><div class=\"consoleContentItems\"><p><code>4</code></p></div><div class=\"consoleContentItems\"><p><code>6</code></p></div></div></div>', 5, 2, 'lesson'),
(11, '<h2>Different Ways to Declare Variables:</h2><h3>const vs. let vs. var:</h3><p>There are multiple ways to declare variables. Other than <code>let</code>, which we\'ve talked about, there are also <code>const</code> and <code>var</code>.</p><h4>var:</h4><p><code>var</code> is very similar to <code>let</code> (you can change the value inside the declared variable). <code>var</code> is the older way of declaring variables in JS.</p><h4>const:</h4><p>By using <code>const</code>, you can\'t change the value of the declared variable.</p><pre><code>const arrow = \"Go to the right\";\narrow = \"Go to the left\"; // You will get an error.</code></pre><div class=\"consoleOutput\"><div class=\"consoleTitle\"><p>Console</p></div><div class=\"consoleContent\"><p><code>Error</code></p></div></div>', 6, 2, 'lesson'),
(12, '<p>You can think of <code>let</code> as a \"snap-on battery box\" because you can easily open it and change the battery (the value of the variable).</p>\r\n\r\n    <p>On the other hand, <code>const</code> is like a \"screw-down battery box,\" which requires a tool (finding the line where the constant is declared and substituting the old value with the new value) to open and replace the battery inside.</p>\r\n\r\n    <p>The process of finding the right tool refers to needing to find the line where the variable is declared, unlike <code>let</code>, where the value can be reassigned easily.</p>', 7, 2, 'lesson'),
(13, '<h2>Variable Naming:</h2><p>There are two main limitations on variable names in JavaScript:</p><ul><li>The name can only contain letters, digits, or the symbols <code>$</code> and <code>_</code>.</li><li>The first character must not be a digit.</li></ul><p><strong>Examples of valid names:</strong></p><ul><li><code>let day1;</code></li><li><code>let _;</code></li></ul><p><strong>Examples of invalid names:</strong></p><ul><li><code>let zoneGravity#;</code> — invalid because it includes #</li><li><code>let 5C;</code> — invalid because it starts with a digit</li></ul><p>Every variable needs a name. Variable names need to be written on a single line and without space in between. When there are multiple words in a variable, we capitalize the first letter of each word after the first word, like this: <code>lessGravityArea</code>.</p>', 8, 2, 'lesson'),
(14, '<h2>Tips:</h2><ul><li>The dollar sign <code>$</code> and underscore <code>_</code> can also be used in variable names.</li><li><strong>AAA</strong> and <strong>aaa</strong> are different variables — lowercase and uppercase letters matter!</li><li>There is a list of reserved words that you cannot use as variable names because they are used by the language itself.</li></ul><p>For example:</p><ul><li><code>let</code></li><li><code>const</code></li><li><code>class</code></li><li><code>function</code></li><li><code>return</code></li></ul>', 9, 2, 'lesson'),
(15, '<h2>Let Practice!</h2><p>Declare a ufo variable using different methods! And choose an alien to put into the ufo!</p><p>Declare a let variable called ufo</p><input class=\"inputBoxes\" type=\"text\" id=\"inputUFO\" placeholder=\"Enter code\"><button class=\"submitBoxes\" id=\"submitUFOName\">Submit</button><p>Choose an alien and put it into ufo!</p><ul><li>alien_Yellow</li><li>alien_Beige</li><li>alien_Green</li></ul><input class=\"inputBoxes\" type=\"text\" id=\"inputAlien\" placeholder=\"Enter code\"><button class=\"submitBoxes\" id=\"submitAlien\">Submit</button><p id=\"callUFO\"></p><p id=\"callAlien\"></p><button type=\"button\" class=\"collapsible\"><i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here</button><div class=\"collapsibleContent\"><br><pre><code>let ufo;\r\nufo = \'alien_Yellow\';</code></pre></div><h3>const</h3><p>Declare a const variable called ufo</p><input class=\"inputBoxes\" type=\"text\" id=\"inputUFO2\" placeholder=\"Enter code\"><button class=\"submitBoxes\" id=\"submitUFOName2\">Submit</button><p>Choose an alien and put it into ufo!</p><ul><li>alien_Yellow</li><li>alien_Beige</li><li>alien_Green</li></ul><p id=\"callUFO2\"></p><button type=\"button\" class=\"collapsible\"><i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here</button><div class=\"collapsibleContent\"><br><pre><code>const ufo = \'alien_Yellow\';</code></pre></div><h3>var</h3><p>Declare a var variable called ufo</p><input class=\"inputBoxes\" type=\"text\" id=\"inputUFO3\" placeholder=\"Enter code\"><button class=\"submitBoxes\" id=\"submitUFOName3\">Submit</button><p>Choose an alien and put it into ufo!</p><ul><li>alien_Yellow</li><li>alien_Biege</li><li>alien_Green</li></ul><input class=\"inputBoxes\" type=\"text\" id=\"inputAlien3\" placeholder=\"Enter code\"><button class=\"submitBoxes\" id=\"submitAlien3\">Submit</button><p id=\"callUFO3\"></p><p id=\"callAlien3\"></p><button type=\"button\" class=\"collapsible\"><i class=\"fa-solid fa-lightbulb\"></i> Need a hint? Click here</button><div class=\"collapsibleContent\"><br><pre><code>var ufo;\r\nufo = \'alien_Yellow\';</code></pre></div>', 10, 2, 'activity'),
(16, NULL, 11, 2, 'quiz'),
(17, '<p class=\"questionTitle\"><strong>What should you do if you want to change the value stored in a variable?</strong></p>\r\n\r\n    <div class=\"choices\">\r\n        <button class=\"choicesButton\"><code>Use const</code></button>\r\n        <button class=\"choicesButton\"><code>Use let and type \'let variable = newValue\'</code></button>\r\n        <button class=\"choicesButton\"><code>Type \'let variable = newValue;\'</code></button>\r\n        <p class=\"answer\"></p>\r\n    </div>', 12, 2, 'quiz'),
(18, '<p class=\"questionTitle\"><strong>Type the elements in the correct sequence to form a variable:</strong></p>\r\n\r\n    <p class=\"questionTitle\"><code>let | door | = | \" | open | \";</code></p>\r\n\r\n    <div class=\"inputContainer\">\r\n        <input class=\"inputBoxes\" type=\"text\" id=\"variableInput\" placeholder=\"Type your answer here\">\r\n        <button class=\"submitBoxes\" id=\"submitButton\">Submit</button>\r\n    </div>\r\n\r\n    <div class=\"choices\">\r\n        <p class=\"answer\"></p>\r\n    </div>', 13, 2, 'quiz'),
(19, '<p class=\"questionTitle\"><strong>Examine the following code:</strong></p>\r\n\r\n    <p class=\"questionTitle\"><code>let burgerBun# = 5;</code></p>\r\n    <p class=\"questionTitle\"><code>let cheese = 9;</code></p>\r\n    <p class=\"questionTitle\"><code>let purchaseList = burgerBun + cheese;</code></p>\r\n\r\n    <p class=\"questionTitle\"><strong>How can you fix this code?</strong></p>\r\n\r\n    <div class=\"choices\">\r\n        <button class=\"choicesButton\"><code>Delete #</code></button>\r\n        <button class=\"choicesButton\"><code>Use const</code></button>\r\n        <button class=\"choicesButton\"><code>Use var</code></button>\r\n        <p class=\"answer\"></p>\r\n    </div>', 14, 2, 'quiz'),
(20, '<h2>p5play Time! Let\'s Learn More About p5play!</h2>\r\n\r\n    <p>Now that you\'ve learned some basic JavaScript, let\'s use p5play to create movable elements!</p>\r\n\r\n    <p>As you have learned, p5play is a JavaScript library for creating animations and interactive elements. It\'s simple to use and great for beginners to practice with!</p>\r\n\r\n    <p>In this exercise, you will learn about sprites (a way to call objects in a game) and how to position them using coordinates.</p>\r\n\r\n    <h2><code>setup()</code>: Runs when the program starts.</h2>\r\n\r\n    <h2>Create a canvas in <code>setup()</code> using <code>new Canvas()</code>:</h2>\r\n\r\n    <pre><code>function setup() {\r\n  new Canvas(300, 200);\r\n}</code></pre>\r\n\r\n    <div id=\"canvas\"></div>\r\n\r\n    <h2>Creates a sprite.</h2>\r\n\r\n    <p>A sprite is an object in a game. It represents anything on the canvas. For example, if you draw a circle, it is a sprite. If you insert an image of a UFO onto the canvas, that is also a sprite.</p>\r\n\r\n    <p>You can move sprites and make them collide with each other.</p>\r\n\r\n    <p>Use <code>new Sprite()</code> to create a sprite:</p>\r\n\r\n    <p><code>let square;</code></p>\r\n\r\n    <div class=\"additionInformation\">\r\n        <p>Always declare variables outside of functions. This allows you to access those elements later in <code>update()</code> or <code>draw()</code>.</p>\r\n\r\n        <p>For example, you might want to make a sprite jump when it reaches a certain x-range.</p>\r\n    </div>\r\n\r\n    <pre><code>square = new Sprite(100,100,100,100);\r\n// new Sprite(x-position, y-position, width, height)</code></pre>\r\n\r\n    <div id=\"sprite\"></div>\r\n\r\n    <h2><code>update()</code>: Runs 60 times per second by default.</h2>\r\n\r\n    <p>Always use <code>clear()</code> or <code>background(\'color\')</code> to remove anything from previous frames!</p>\r\n\r\n    <pre><code>function update() {\r\n  background(\'#594157\');\r\n}</code></pre>\r\n\r\n    <div id=\"update1\"></div>', 15, 2, 'lesson'),
(21, '<p><strong>Mission:</strong> An alien is trapped! It needs your help!</p><p>Follow the instructions below to rescue the alien.</p><h2>How to Play</h2><ol><li>Follow the instructions.</li><li>Drag the code blocks from the toolbox into the coding area in the correct sequence.</li><li>Click the <strong>Run</strong> button to submit your code.</li><li>Scroll down in the toolbox to see more code blocks.</li></ol><h2>Instructions</h2><ol><li>Create a <code>block</code> variable.</li><li>Create a <code>setup</code> function.</li><li>Create a canvas with a height of <code>865</code> and a width of <code>750</code>.</li><li>Create a sprite using the variable <code>block</code>.</li><li>Create an <code>update</code> function.</li><li>Assign the background color <code>#dbb691ff</code> to the canvas.</li><li>Run your code!</li></ol><button type=\"button\" class=\"collapsible\">Click Here To See the Code!</button><div class=\"collapsibleContent\"><pre><code>let block;\r\n\r\nfunction setup() {\r\n    new Canvas(865, 750);\r\n    block = new Sprite(100, 270, 50, 50);\r\n}\r\n\r\nfunction update() {\r\n    background(\'#dbb691ff\');\r\n}</code></pre></div>', 16, 2, 'game');

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `level_page_id` int(11) DEFAULT NULL,
  `level_order` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `course_id`, `title`, `level_page_id`, `level_order`) VALUES
(1, 1, 'What is javascript (JS)?', 1, 1),
(2, 1, 'What is HTML and CSS?', 2, 1),
(3, 1, 'Summary:', 3, 1),
(4, 2, 'Variables Introduction', 6, 2),
(8, 2, 'Create a variable & Add a value to the variable', 7, 2),
(9, 2, 'Quiz', 16, 3),
(10, 2, 'Variable Game', 21, 4);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `last_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `body`, `last_modified`, `user_id`) VALUES
(8, 'test1', 'test1_content', '2026-09-16 04:24:53', 5),
(10, 'test3', 'test3_content', '2026-09-16 04:22:09', 5),
(11, 'test', 'test', '2026-09-16 04:24:49', 5);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int(11) NOT NULL,
  `levelPages_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `question_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `levelPages_id`, `question`, `question_type`) VALUES
(1, 16, 'Which of the following declares a variable correctly?', 'multiple_choice'),
(2, 17, 'What should you do if you want to change the value stored in a variable?', 'multiple_choice'),
(3, 18, '<p>Type the elements in the correct sequence to form a variable:\r\n\r\n<code>let | door | = | \' | open | \';</code></p>', 'input'),
(4, 19, '<p>Examine the following code:</p><pre><code>let burgerBun# = 5; \nlet cheese = 9; \nlet purchaseList = burgerBun + cheese;</code></pre><p>How can you fix this code?</p>', 'multiple_choice');

-- --------------------------------------------------------

--
-- Table structure for table `quizAnswers`
--

CREATE TABLE `quizAnswers` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `answer` text DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizAnswers`
--

INSERT INTO `quizAnswers` (`id`, `quiz_id`, `answer`, `is_correct`) VALUES
(1, 1, 'let cat = feed;', 0),
(2, 1, 'let cat = \'feed\';', 1),
(3, 1, 'Let cat = \'feed\';', 0),
(4, 2, 'Use const', 0),
(5, 2, 'Use let and type \'let variable = newValue\'', 0),
(6, 2, 'Type \'let variable = newValue;\'', 1),
(7, 3, 'letdoor=\'open\';', 0),
(8, 4, 'Delete #', 1),
(9, 4, 'Use const', 0),
(10, 4, 'Use var', 0);

-- --------------------------------------------------------

--
-- Table structure for table `quizStatistics`
--

CREATE TABLE `quizStatistics` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizStatistics`
--

INSERT INTO `quizStatistics` (`id`, `user_id`, `quiz_id`, `attempts`, `completed`) VALUES
(1, 5, 1, 6, 1),
(11, 5, 2, 1, 1),
(13, 5, 3, 8, 1),
(23, 5, 4, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userProgress`
--

CREATE TABLE `userProgress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `quiz_score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'testtest', 'test@gmail.com', '$2b$10$mrWk8IFafb9MTUdonsnt4uPOXZ8T14EZefB65pH/lIA0Vp4yN0Rsa'),
(2, '2testtest', 't2est@gmail.com', '$2b$10$WfjsOQMSvPz3.fRD7OB5ZONnTsDsjqSEZ61cJNsFafQlMTXzZQK7.'),
(3, '1testtest', '1est@gmail.com', '$2b$10$iw6.Z9tefiHFBS6hEGLjbO8Ds/P0VeXXIxs4Yjf/H/vX7Uv/7LPWm'),
(4, '123', '123@gmail.com', '$2b$10$/1fTNi0QLQAioDZn0oyqpObhkppnBXOgqWaB7FIxWskrw30xpyZoW'),
(5, '1234', '1234@gmail.com', '$2b$10$uMsirUe0bpb5bNw6bv89hORn1rq3RwmwFqWT3VwxZ5iSHY/.W.5Ku'),
(6, '12345', '12345@gmail.com', '$2b$10$bDe7JJOsJc1WSFzP1AVokOuHgZA6KJqcSJFHIANA8tz26hQ0vFif6');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notes_user` (`user_id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `levelPages_id` (`levelPages_id`);

--
-- Indexes for table `quizAnswers`
--
ALTER TABLE `quizAnswers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `quizStatistics`
--
ALTER TABLE `quizStatistics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`quiz_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `userProgress`
--
ALTER TABLE `userProgress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`level_id`),
  ADD KEY `level_id` (`level_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `quizAnswers`
--
ALTER TABLE `quizAnswers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `quizStatistics`
--
ALTER TABLE `quizStatistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `userProgress`
--
ALTER TABLE `userProgress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_notes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`levelPages_id`) REFERENCES `levelPages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quizAnswers`
--
ALTER TABLE `quizAnswers`
  ADD CONSTRAINT `quizanswers_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quizStatistics`
--
ALTER TABLE `quizStatistics`
  ADD CONSTRAINT `quizstatistics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quizstatistics_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userProgress`
--
ALTER TABLE `userProgress`
  ADD CONSTRAINT `userprogress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userprogress_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
