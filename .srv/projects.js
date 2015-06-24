'use strict';

var path = require('path');
var R = require('ramda');

var fl = require('./file-list.js');

function Projects (root) {
    fl.setRoot(root);

    function list () {
        return R.chain(function (author) {
            return fl.getDirList(path.join('projects', author))
                .filter(function (project) {
                    return R.contains('project.yaml',
                            fl.getFileList(path.join('projects', author, project)));
                })
                .map(function (project) {
                    return {
                        name: project,
                        author: author
                    };
                });
        }, fl.getDirList('projects'));
    }

    return {
        list: list
    };
}

module.exports = Projects;
