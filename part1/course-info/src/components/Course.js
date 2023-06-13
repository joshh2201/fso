const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };
  const Part = (props) => {
    return (
      <>
        <p>
          {props.name} {props.exercises}
        </p>
      </>
    );
  };
  
  const Content = (props) => {
    const parts = [...props.parts];
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };
  
  const Total = (props) => {
    const total = props.parts.reduce((sum, curr) => sum + curr.exercises, 0);
    return (
      <>
        <p>
          <b>Number of exercises {total}</b>
        </p>
      </>
    );
  };
  
  const Course = (props) => {
    const { course } = props;
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };

export default Course;