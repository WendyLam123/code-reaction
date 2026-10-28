import Variable3 from "./miniGame/variable_3";

const activityComponents = {
  8: Variable3,
};

export default function Activity({ page }) {
  const ActivityComponent = activityComponents[page.id];

  return (
    <>
      <div
        className="activityText"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />

      {ActivityComponent && <ActivityComponent />}
    </>
  );
}