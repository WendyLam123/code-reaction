import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "../styles/Level.css";

import Nav from "../components/Nav";
import Game from "../components/lessonPage/game/Game";
import Quiz from "../components/lessonPage/quiz/Quiz";
import MiniGame from "../components/lessonPage/miniGame/MiniGame";
import Variable_3 from "../components/lessonPage/miniGame/variable_3";
import Variable_10 from "../components/lessonPage/miniGame/variable_10";
import { API_URL } from "../api";

const miniGameTable = {
  "2-3": Variable_3,
  "2-10": Variable_10,
};

function Level() {
  const { courseId, pageOrder } = useParams();
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gameKey = `${courseId}-${pageOrder}`;
  const miniGame = miniGameTable[gameKey];

  //manage next/previous page within course
  const currentOrder = Number(pageOrder);

  // get current page
  const currentPage =
    pages.find((page) => Number(page.page_order) === currentOrder) ?? null;

  //find next page index within current course pages
  const nextPage = pages.find(
    (page) => Number(page.page_order) === currentOrder + 1,
  );

  const previousPage = pages.find(
    (page) => Number(page.page_order) === currentOrder - 1,
  );

  // Get all pages belonging to this course
  useEffect(() => {
    const getPages = async () => {
      //reset loading / error / pages after go to a next page. so no remaining error
      setLoading(true);
      setError(null);
      setPages([]);

      try {
        const res = await fetch(`${API_URL}/api/courses/${courseId}`);

        if (!res.ok) {
          throw new Error("Page data not loaded");
        }

        const data = await res.json();
        setPages(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getPages();
  }, [courseId]);

  //reached the end of the courses and no next course
  //if no page (no request error), finish loading (Please wait...), navigate to learn page
  useEffect(() => {
    if (!loading && !error && !currentPage) {
      //replace the invalid page URL with /Learn so the user won't return to it by pressing the browser's Back button
      navigate("/Learn", { replace: true });
    }
  }, [loading, error, currentPage, navigate]);

  //go to next page within the same course
  function changePage(direction) {
    if (direction === "next") {
      // Same course, next page
      navigate(`/Learn/${courseId}/${nextPage.page_order}`);
    } else if (direction === "previous") {
      navigate(`/Learn/${courseId}/${previousPage.page_order}`);
    } else {
      // No more pages in this course
      // TODO: later replace with actual next course ID
      navigate(`/Learn/${Number(courseId) + 1}/1`);
    }
  }

  //go to next course
  function goToNextCourse() {
    navigate(`/Learn/${Number(courseId) + 1}/1`);
  }

  if (loading) {
    return <p>Please wait, page is loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!currentPage) {
    return <p>Page not found. Redirecting...</p>;
  }

  //Render Game Page
  if (currentPage.page_type === "game") {
    return (
      <div className="gamePage">
        <Nav />
        <Game
          page={currentPage}
          changePage={changePage}
          goToNextCourse={goToNextCourse}
        />
      </div>
    );
  }

  //Render Lesson Page
  return (
    <main className="level_main">
      <div className="lesson">
        <div className="levelPage_header">
          <h1>{currentPage.course_title}</h1>
          <Nav />
          <button className="nextCourseButton" onClick={goToNextCourse}>
            Next
          </button>
        </div>

        <div className="lessonMiddle">
          {(currentPage.page_type === "lesson" ||
            currentPage.page_type === "activity") && (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentPage.content,
                }}
              />

              {miniGame && <MiniGame />}
            </>
          )}

          {currentPage.page_type === "quiz" && <Quiz page={currentPage} />}
        </div>

        <div className="nextButtonContainer">
          {previousPage && (
            <button
              className="nextButton"
              onClick={() => changePage("previous")}
            >
              Previous Page
            </button>
          )}

          {nextPage && (
            <button className="nextButton" onClick={() => changePage("next")}>
              Next Page
            </button>
          )}
        </div>
        {/* Page navigation buttons */}
        <div className="buttonRow">
          {pages.map((page, index) => {
            //if %3 = 0 --> biege (0, 3, 6)
            //if %3 = 2 --> brown (2, 5, 8)
            //if %3 = 1 --> orange (1, 4, 7)

            let color = "";
            switch (index % 3) {
              case 0:
                color = "biegeButton";
                break;
              case 1:
                color = "orangeButton";
                break;
              case 2:
                color = "brownButton";
                break;
              default:
                color = "";
            }
            return (
              <button
                className={`${color} lessonButton ${
                  currentPage.id === page.id ? "active-button" : ""
                }`}
                key={page.id}
                onClick={() =>
                  navigate(`/Learn/${courseId}/${page.page_order}`)
                }
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Level;
