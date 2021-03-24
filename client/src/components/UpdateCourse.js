import React from 'react';

function UpdateCourse() {

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value="Course Title" />

              <label for="courseAuthor">Course Author</label>
              <input id="courseAuthor" name="courseAuthor" type="text" value="Course Author" />

              <label for="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription">Course Description will go here!</textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value="Certainly a few hours" />

              <label for="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded">Materials will go here</textarea>
            </div>
          </div>
          <button class="button" type="submit">Update Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
      </form>    
    </div>    
  )

}

export default UpdateCourse;