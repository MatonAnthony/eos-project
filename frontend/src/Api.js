/**
 * Store the URL to send data to
 */
class Api {


    /**
     * Get the URL to reach the API
     * @return {String} URL to reach the API
     */
    static getUrl() {
        return 'http://localhost:9999/api';
    }

    static authenticate(auth_token) {
        localStorage.setItem('auth_token', auth_token);
    }

    static deauthenticate(){
        localStorage.removeItem('auth_token');
    }

    static isAuthenticated(){
        return localStorage.getItem('auth_token');
    }

    static identifyStudent(identifier) {
        localStorage.setItem('student_identifier', identifier);
    }

    static isStudentIdentified(){
        return localStorage.getItem('student_identifier');
    }
}

export default Api;
