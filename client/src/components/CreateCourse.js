import React from 'react';

function CreateCourse(props) {

  function handleCancel(event) {
    event.preventDefault();
    props.history.push('/');
  }

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {/* <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Please provide a value for "title"</li>
          <li>Please provide a value for "description"</li>
        </ul>
      </div> */}
      <form>
        <div className="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" />

              <label for="courseAuthor">Course Author</label>
              <input id="courseAuthor" name="courseAuthor" type="text" />

              <label for="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription"></textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" />

              <label for="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
            </div>
          </div>
          <button class="button" type="submit">Update Course</button><button class="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>    
    </div>    
  )

}

export default CreateCourse;