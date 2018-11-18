/*---------------------------------------------
 * Template.js
 * Abstract email template class
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

/**
 * Abstract email template
 * @type {module.Template}
 */
module.exports = class Template {
    /**
     * Create new template with parameters
     * @param params
     */
    constructor(params = {}) {
        this.params = params;
    }

    /**
     * Get email subject
     * @returns {string}
     */
    getSubject() {
        return "";
    }

    /**
     * Get HTML format
     * @returns {string}
     */
    getHTML() {
        return "";
    }

    /**
     * Get text format
     * @returns {string}
     */
    getText() {
        return "";
    }
};
