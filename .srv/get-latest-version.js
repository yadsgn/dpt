var _ = require('underscore');

function getCurrentVersion(versionsList) {
    var verReg = /(\d+)\.(\d+)\.(\d+)(\w{0,2})/; // -a and -tr versions allowed
    var compareVersions = function(a, b){
        var a = a.match(verReg);
        var b = b.match(verReg);
        if (a[4] && !b[4]) {
            return 1;
        } else if (!a[4] && b[4]) {
            return -1;
        }
        for (var i=1; i<=3; i++) {
            if (b[i]*1 - a[i]*1 != 0) {
                return b[i]*1 - a[i]*1
            }
        }
    }
    var onlyDigital = versionsList.map(function(el){
        if (!verReg.test(el)) {
            return false;
        } else {
            return el;
        }
    })
    onlyDigital = _.compact(onlyDigital);
    onlyDigital = onlyDigital.sort(compareVersions);
    return onlyDigital[0];
}

module.exports = getCurrentVersion;
