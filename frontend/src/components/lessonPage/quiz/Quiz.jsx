import Input from "./Input";
import MultipleChoice from "./MultipleChoice";

function Quiz({ page }) {
    //lessonPage's type: if it's quiz, has 2 cases
    //1: multi-choice
    //2: input answer
    //use dangerouslySetInnerHTML temporary, need to use a more secure way later

    switch (page.quiz.question_type) {
        case "multiple_choice":
            return (
                <MultipleChoice page={page}/>
            );

        case "input":
            return (
                <Input page={page}/>
            );

        default:
            return <p>Unknown question type</p>;
    }
}

export default Quiz;