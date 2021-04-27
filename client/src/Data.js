//Separating out these helper functions is at the suggestion of the Treehouse courses
//This class exists to provide helper functions that handle the various API calls in the app

export default class Data {

  //This method constructs the req.body, API call path, and credentials for an API call
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:5000/api' + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    //Check if auth is required
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  //getUser sends a GET request to the /users API route. Should return a verified user from the database
  //or notification that no such user exists
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  //createUser sends a POST request to /users API route. Should add a new user to database, if req.body is correct
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //createCourse sends a POST request to the /courses API route. If req.body correct, should add new course to database
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password})
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //updateCourse sends a PUT request to the /courses route. 
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api('/courses/'+id, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      console.log('Course updated')
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //deleteCourse sends a DELETE request to the /courses route.
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api('/courses/'+id, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      console.log('Course deleted')
    }
    else {
      throw new Error();
    }
  }

}